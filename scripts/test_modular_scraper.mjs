import * as cheerio from "cheerio";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

export function normalizeText(value) {
  return (
    value
      ?.replace(/[\u200E\u200F\u202A-\u202E\uFEFF]/g, "")
      .replace(/\s+/g, " ")
      .trim() ?? ""
  );
}

export function normalizeUsername(username) {
  return normalizeText(username)
    .replace(/^@/, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .toLowerCase();
}

export function parseCount(value) {
  const raw = normalizeText(value).replace(/,/g, "");
  const match = raw.match(/\d+(?:\.\d+)?/);
  if (!match) return 0;
  return Number.parseInt(match[0], 10) || 0;
}

export function cleanDisplayName(value, fallback) {
  if (!value) return fallback;
  const cleaned = normalizeText(value)
    .replace(/[★☆½\u2605\u2606\u00BD]+/g, "")
    .replace(/^Letterboxd\s*-\s*/i, "")
    .replace(/[’']s\s+films\s*•?\s*Letterboxd.*$/i, "")
    .replace(/[’']s\s+films.*$/i, "")
    .replace(/[’']s\s+profile.*$/i, "")
    .replace(/\s*•\s*Letterboxd.*$/i, "")
    .trim();
  return cleaned && cleaned.toLowerCase() !== "letterboxd" ? cleaned : fallback;
}

export function extractDisplayName($, safeUser) {
  const avatarAlt = $(
    "#header .avatar img, .profile-avatar img, a.avatar img, .avatar img"
  )
    .first()
    .attr("alt");
  if (avatarAlt) {
    const clean = cleanDisplayName(avatarAlt, "");
    if (clean) return clean;
  }

  const headerName = $(
    "#header .title-1, section#person-summary h1, .person-summary h1, .profile-name, .context h1"
  )
    .first()
    .text();
  if (headerName) {
    const clean = cleanDisplayName(headerName, "");
    if (clean) return clean;
  }

  const ogTitle = $('meta[property="og:title"]').attr("content");
  if (ogTitle) {
    const clean = cleanDisplayName(ogTitle, "");
    if (clean) return clean;
  }

  return safeUser;
}

export function parseFilmsFromHtml($) {
  const films = [];
  $(".react-component[data-component-class='LazyPoster'], div[data-item-name]").each(
    (_, el) => {
      const $el = $(el);
      const name =
        $el.attr("data-item-name") ||
        $el.attr("data-item-full-display-name") ||
        $el.find("img").attr("alt") ||
        "";
      const slug = $el.attr("data-item-slug") || "";
      const link =
        $el.attr("data-item-link") ||
        $el.attr("data-target-link") ||
        (slug ? `/film/${slug}/` : "");

      const yearMatch = name.match(/\((\d{4})\)/);
      const year = yearMatch ? Number.parseInt(yearMatch[1], 10) : null;
      const cleanName = name.replace(/\s*\(\d{4}\)$/, "").trim();

      let posterUrl = null;
      const resolvablePath = $el.attr("data-resolvable-poster-path");
      if (resolvablePath) {
        try {
          const parsed = JSON.parse(resolvablePath);
          const uid = parsed?.postered?.uid;
          const key = parsed?.cacheBustingKey;
          if (uid && slug) {
            const idStr = uid.replace(/\D/g, "");
            if (idStr) {
              const parts = idStr.split("").join("/");
              const v = key ? `?v=${key}` : "";
              posterUrl = `https://a.ltrbxd.com/resized/film-poster/${parts}/${idStr}-${slug}-0-230-0-345-crop.jpg${v}`;
            }
          }
        } catch {}
      }

      if (!posterUrl) {
        const rawImgSrc = $el.find("img").attr("src");
        if (rawImgSrc && !rawImgSrc.includes("empty-poster")) {
          posterUrl = rawImgSrc;
        }
      }

      if (cleanName || slug) {
        films.push({
          name: cleanName || slug,
          slug,
          link,
          year,
          posterUrl,
        });
      }
    }
  );
  return films;
}

export function dedupeFilms(films) {
  const seen = new Set();
  const result = [];
  for (const film of films) {
    const key = film.slug || film.name.toLowerCase();
    if (key && !seen.has(key)) {
      seen.add(key);
      result.push(film);
    }
  }
  return result;
}

async function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function scrapeFilms(page, username) {
  const safeUser = normalizeUsername(username);
  const startUrl = `https://letterboxd.com/${encodeURIComponent(safeUser)}/films/`;

  const res = await page.goto(startUrl, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });

  if (res && (res.status() === 404 || res.status() === 410)) {
    throw new Error(`User @${safeUser} not found`);
  }

  let currentHtml = await page.content();
  let $ = cheerio.load(currentHtml);

  const displayName = extractDisplayName($, safeUser);
  const avatar =
    $("#header .avatar img, .profile-avatar img, a.avatar img, .avatar img")
      .first()
      .attr("src") || null;

  const allFilms = [];
  let pageNum = 1;

  // Process Page 1
  const page1Films = parseFilmsFromHtml($);
  allFilms.push(...page1Films);
  console.log(`Page ${pageNum}\n${page1Films.length} movies\n`);

  // Detect next "Older" link
  let nextRelHref = $("a.next, .paginate-nextprev a.next, .paginate-pages a.next").attr("href");

  while (nextRelHref && pageNum < 500) {
    pageNum++;
    const nextUrl = nextRelHref.startsWith("http")
      ? nextRelHref
      : `https://letterboxd.com${nextRelHref}`;

    let pageHtml = null;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const fetchResult = await page.evaluate(async (url) => {
          const response = await fetch(url, {
            headers: {
              Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            },
          });
          if (!response.ok) {
            return { status: response.status, text: "" };
          }
          const text = await response.text();
          return { status: response.status, text };
        }, nextUrl);

        if (fetchResult.status === 200 && fetchResult.text) {
          pageHtml = fetchResult.text;
          break;
        } else if (attempt < 3) {
          await delay(500 * attempt);
        }
      } catch {
        if (attempt < 3) await delay(500 * attempt);
      }
    }

    if (!pageHtml) {
      // Fallback: use page.goto directly
      try {
        await page.goto(nextUrl, { waitUntil: "domcontentloaded", timeout: 20000 });
        pageHtml = await page.content();
      } catch (err) {
        console.warn(`Could not load page ${pageNum}, stopping.`);
        break;
      }
    }

    $ = cheerio.load(pageHtml);
    const pageFilms = parseFilmsFromHtml($);

    if (pageFilms.length === 0) {
      break;
    }

    allFilms.push(...pageFilms);
    console.log(`Page ${pageNum}\n${pageFilms.length} movies\n`);

    // Check if there is another "Older" button on this new page
    nextRelHref = $("a.next, .paginate-nextprev a.next, .paginate-pages a.next").attr("href");
    await delay(150);
  }

  const dedupedFilms = dedupeFilms(allFilms);
  console.log(`Finished\n${dedupedFilms.length} movies collected.\n`);

  return {
    username: safeUser,
    displayName,
    avatar,
    totalFilmsCount: dedupedFilms.length,
    films: dedupedFilms,
  };
}

async function test() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  try {
    const page = await browser.newPage();
    const result = await scrapeFilms(page, "karsten");
    console.log("Films scraping result summary:", {
      username: result.username,
      displayName: result.displayName,
      totalFilmsCount: result.totalFilmsCount,
      sampleFilm: result.films[0],
      totalLength: result.films.length,
    });
  } finally {
    await browser.close();
  }
}

test().catch(console.error);
