import * as cheerio from "cheerio";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import type { Browser, Page } from "puppeteer";

puppeteer.use(StealthPlugin());

// --- Types ---

export interface FilmItem {
  name: string;
  slug: string;
  link: string;
  year: number | null;
  posterUrl: string | null;
}

export interface FilmsData {
  username: string;
  displayName: string;
  avatar: string | null;
  totalFilmsCount: number;
  films: FilmItem[];
}

export interface UserSummary {
  username: string;
  displayName: string;
  avatar: string | null;
  followersCount?: number;
  followingCount?: number;
}

export interface FollowersData {
  username: string;
  totalFollowers: number;
  followers: UserSummary[];
}

export interface FollowingData {
  username: string;
  totalFollowing: number;
  following: UserSummary[];
}

export interface RSSEntry {
  title: string;
  link: string;
  pubDate: string;
  watchedDate: string | null;
  filmTitle: string | null;
  filmYear: number | null;
  rating: number | null;
  rewatch: boolean;
  reviewText: string | null;
  posterUrl: string | null;
}

export interface RSSData {
  username: string;
  title: string;
  description: string;
  link: string;
  entries: RSSEntry[];
}

export interface LetterboxdProfile {
  username: string;
  displayName: string;
  avatar: string | null;
  bio: string | null;
  followersCount: number;
  followingCount: number;
  filmsCount: number;
  recentActivity: RSSEntry[];
  films: FilmItem[];
  followers: UserSummary[];
  following: UserSummary[];
}

// Backward-compatible ProfileData for existing UI
export type ProfileData = {
  displayName: string;
  username: string;
  avatar: string | null;
  bio: string | null;
  followers: number;
  following: number;
};

// --- Custom Errors ---

export class ProfileNotFoundError extends Error {
  constructor(username: string) {
    super(`Letterboxd profile for "${username}" was not found.`);
    this.name = "ProfileNotFoundError";
  }
}

export class ProfileFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProfileFetchError";
  }
}

export class ProfileParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProfileParseError";
  }
}

// --- Helpers ---

/** Hard cap on the number of pages to crawl, to prevent infinite loops. */
const MAX_PAGES = 500;

const REQUEST_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

export function normalizeText(value: string | null | undefined): string {
  return (
    value
      ?.replace(/[\u200E\u200F\u202A-\u202E\uFEFF]/g, "")
      .replace(/\s+/g, " ")
      .trim() ?? ""
  );
}

export function normalizeUsername(username: string): string {
  return normalizeText(username)
    .replace(/^@/, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .toLowerCase();
}

export function parseCount(value: string | null | undefined): number {
  const raw = normalizeText(value).replace(/,/g, "");
  const match = raw.match(/\d+(?:\.\d+)?/);
  if (!match) return 0;
  return Number.parseInt(match[0], 10) || 0;
}

export function cleanDisplayName(
  value: string | null | undefined,
  fallback: string
): string {
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

export function extractDisplayName(
  $: cheerio.CheerioAPI,
  safeUser: string
): string {
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

export function parseFilmsFromHtml($: cheerio.CheerioAPI): FilmItem[] {
  const films: FilmItem[] = [];
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

      let posterUrl: string | null = null;
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
        } catch {
          // fallback
        }
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

export function dedupeFilms(films: FilmItem[]): FilmItem[] {
  const seen = new Set<string>();
  const result: FilmItem[] = [];
  for (const film of films) {
    const key = film.slug || film.name.toLowerCase();
    if (key && !seen.has(key)) {
      seen.add(key);
      result.push(film);
    }
  }
  return result;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- Browser Session Management ---

export async function createBrowser(): Promise<Browser> {
  return await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });
}

export async function withBrowserSession<T>(
  fn: (context: { browser: Browser; page: Page }) => Promise<T>
): Promise<T> {
  const browser = await createBrowser();
  try {
    const page = await browser.newPage();
    return await fn({ browser, page });
  } finally {
    await browser.close();
  }
}

// --- Modular Scrapers (Reusing Browser Session) ---

/**
 * Scrapes all pages of a user's film library using the active browser session.
 * Automatically paginates until there is no "Older" button.
 */
export async function scrapeFilms(
  page: Page,
  username: string
): Promise<FilmsData> {
  const safeUser = normalizeUsername(username);
  if (!safeUser) throw new Error("A valid Letterboxd username is required.");

  const startUrl = `https://letterboxd.com/${encodeURIComponent(safeUser)}/films/`;

  let page1Loaded = false;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await page.goto(startUrl, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      if (res && (res.status() === 404 || res.status() === 410)) {
        throw new ProfileNotFoundError(safeUser);
      }

      page1Loaded = true;
      break;
    } catch (err) {
      if (err instanceof ProfileNotFoundError) throw err;
      if (attempt < 3) {
        await delay(1000 * attempt);
      } else {
        throw new ProfileFetchError(
          `Failed to load films page 1 for "${safeUser}": ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }
  }

  if (!page1Loaded) {
    throw new ProfileFetchError(`Could not fetch films page 1 for "${safeUser}".`);
  }

  const page1Html = await page.content();
  let $ = cheerio.load(page1Html);

  const displayName = extractDisplayName($, safeUser);
  const avatar =
    $("#header .avatar img, .profile-avatar img, a.avatar img, .avatar img")
      .first()
      .attr("src") || null;

  const allFilms: FilmItem[] = [];
  let pageNum = 1;

  // Process Page 1
  const page1Films = parseFilmsFromHtml($);
  allFilms.push(...page1Films);
  console.log(`Page ${pageNum}\n${page1Films.length} movies\n`);

  // Detect initial "Older" pagination link
  let nextRelHref = $(
    "a.next, .paginate-nextprev a.next, .paginate-pages a.next"
  ).attr("href");

  // Automatically paginate until there is no "Older" button
  while (nextRelHref && pageNum < MAX_PAGES) {
    pageNum++;
    const nextUrl = nextRelHref.startsWith("http")
      ? nextRelHref
      : `https://letterboxd.com${nextRelHref}`;

    let pageHtml: string | null = null;

    // Use in-page evaluate fetch (inheriting cf_clearance session) with retry
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const fetchResult = await page.evaluate(async (url: string) => {
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

    // Direct page.goto fallback if in-page evaluate failed
    if (!pageHtml) {
      try {
        await page.goto(nextUrl, {
          waitUntil: "domcontentloaded",
          timeout: 20000,
        });
        pageHtml = await page.content();
      } catch (err) {
        console.warn(
          `Could not load page ${pageNum}, stopping pagination. (${err instanceof Error ? err.message : String(err)})`
        );
        break;
      }
    }

    $ = cheerio.load(pageHtml);
    const pageFilms = parseFilmsFromHtml($);

    if (pageFilms.length === 0) {
      // No more movies found — stop pagination cleanly
      break;
    }

    allFilms.push(...pageFilms);
    console.log(`Page ${pageNum}\n${pageFilms.length} movies\n`);

    // Check if there is another "Older" button on the new page
    nextRelHref = $(
      "a.next, .paginate-nextprev a.next, .paginate-pages a.next"
    ).attr("href");

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

/**
 * Scrapes followers using the browser session.
 */
export async function scrapeFollowers(
  page: Page,
  username: string
): Promise<FollowersData> {
  const safeUser = normalizeUsername(username);
  const url = `https://letterboxd.com/${encodeURIComponent(safeUser)}/followers/`;

  let html = "";
  try {
    const fetchResult = await page.evaluate(async (endpoint: string) => {
      const res = await fetch(endpoint);
      return { status: res.status, text: await res.text() };
    }, url);
    if (fetchResult.status === 200) {
      html = fetchResult.text;
    }
  } catch {
    // fallback to page.goto
  }

  if (!html) {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
    html = await page.content();
  }

  const $ = cheerio.load(html);
  const followers: UserSummary[] = [];

  $(".person-summary, table.person-table tr").each((_, el) => {
    const $el = $(el);
    const userLink = $el.find("a.name, h3 a, a.avatar").first().attr("href");
    if (!userLink) return;

    const followerUsername = normalizeUsername(userLink);
    const displayName =
      normalizeText($el.find("a.name, h3 a").first().text()) || followerUsername;
    const avatar = $el.find("img").attr("src") || null;

    const metaText = $el.find(".metadata").text();
    const followersMatch = metaText.match(/([\d,]+)\s*followers/i);
    const followingMatch = metaText.match(/following\s*([\d,]+)/i);

    followers.push({
      username: followerUsername,
      displayName,
      avatar,
      followersCount: followersMatch ? parseCount(followersMatch[1]) : undefined,
      followingCount: followingMatch ? parseCount(followingMatch[1]) : undefined,
    });
  });

  const totalFollowers =
    parseCount($('a[href*="/followers/"]').first().text()) || followers.length;

  return {
    username: safeUser,
    totalFollowers,
    followers,
  };
}

/**
 * Scrapes following using the browser session.
 */
export async function scrapeFollowing(
  page: Page,
  username: string
): Promise<FollowingData> {
  const safeUser = normalizeUsername(username);
  const url = `https://letterboxd.com/${encodeURIComponent(safeUser)}/following/`;

  let html = "";
  try {
    const fetchResult = await page.evaluate(async (endpoint: string) => {
      const res = await fetch(endpoint);
      return { status: res.status, text: await res.text() };
    }, url);
    if (fetchResult.status === 200) {
      html = fetchResult.text;
    }
  } catch {
    // fallback to page.goto
  }

  if (!html) {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
    html = await page.content();
  }

  const $ = cheerio.load(html);
  const following: UserSummary[] = [];

  $(".person-summary, table.person-table tr").each((_, el) => {
    const $el = $(el);
    const userLink = $el.find("a.name, h3 a, a.avatar").first().attr("href");
    if (!userLink) return;

    const followingUsername = normalizeUsername(userLink);
    const displayName =
      normalizeText($el.find("a.name, h3 a").first().text()) || followingUsername;
    const avatar = $el.find("img").attr("src") || null;

    const metaText = $el.find(".metadata").text();
    const followersMatch = metaText.match(/([\d,]+)\s*followers/i);
    const followingMatch = metaText.match(/following\s*([\d,]+)/i);

    following.push({
      username: followingUsername,
      displayName,
      avatar,
      followersCount: followersMatch ? parseCount(followersMatch[1]) : undefined,
      followingCount: followingMatch ? parseCount(followingMatch[1]) : undefined,
    });
  });

  const totalFollowing =
    parseCount($('a[href*="/following/"]').first().text()) || following.length;

  return {
    username: safeUser,
    totalFollowing,
    following,
  };
}

/**
 * Parses /rss/ endpoint: extracts activity, reviews, ratings, and film metadata.
 */
export async function scrapeRSS(username: string): Promise<RSSData> {
  const safeUser = normalizeUsername(username);
  if (!safeUser) throw new Error("A valid Letterboxd username is required.");

  const url = `https://letterboxd.com/${encodeURIComponent(safeUser)}/rss/`;
  let xml = "";

  try {
    const res = await fetch(url, {
      headers: REQUEST_HEADERS,
      redirect: "follow",
      cache: "no-store",
    });

    if (res.status === 404 || res.status === 410) {
      throw new ProfileNotFoundError(safeUser);
    }
    if (!res.ok) {
      throw new ProfileFetchError(`Letterboxd RSS returned status ${res.status}`);
    }
    xml = await res.text();
  } catch (err) {
    if (err instanceof ProfileNotFoundError) throw err;
    throw new ProfileFetchError(
      `Failed to fetch RSS for "${safeUser}": ${err instanceof Error ? err.message : String(err)}`
    );
  }

  const $ = cheerio.load(xml, { xmlMode: true });

  const channelTitle = $("channel > title").text();
  const description = $("channel > description").text();
  const link = $("channel > link").text();

  const entries: RSSEntry[] = [];

  $("item").each((_, el) => {
    const $el = $(el);
    const rawTitle = $el.find("title").text();
    const itemLink = $el.find("link").text();
    const pubDate = $el.find("pubDate").text();
    const watchedDate =
      $el.find("letterboxd\\:watchedDate, watchedDate").text() || null;
    const filmTitle =
      $el.find("letterboxd\\:filmTitle, filmTitle").text() || null;
    const filmYearStr =
      $el.find("letterboxd\\:filmYear, filmYear").text() || null;
    const filmYear = filmYearStr ? Number.parseInt(filmYearStr, 10) : null;
    const ratingStr =
      $el.find("letterboxd\\:memberRating, memberRating").text() || null;
    const rating = ratingStr ? Number.parseFloat(ratingStr) : null;
    const rewatchStr =
      $el.find("letterboxd\\:rewatch, rewatch").text() || "";
    const rewatch = rewatchStr.toLowerCase() === "yes";

    const rawDescription = $el.find("description").text();
    let reviewText: string | null = null;
    let posterUrl: string | null = null;

    if (rawDescription) {
      const $desc = cheerio.load(rawDescription);
      posterUrl = $desc("img").attr("src") || null;
      $desc("img").remove();
      const text = normalizeText($desc.text());
      if (text) reviewText = text;
    }

    entries.push({
      title: rawTitle,
      link: itemLink,
      pubDate,
      watchedDate,
      filmTitle,
      filmYear,
      rating,
      rewatch,
      reviewText,
      posterUrl,
    });
  });

  return {
    username: safeUser,
    title: channelTitle,
    description,
    link,
    entries,
  };
}

// --- Future Endpoint Helpers (Ready for lists, diary, likes, watchlist) ---

export async function scrapeWatchlist(
  page: Page,
  username: string
): Promise<FilmItem[]> {
  const safeUser = normalizeUsername(username);
  const url = `https://letterboxd.com/${encodeURIComponent(safeUser)}/watchlist/`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
  const html = await page.content();
  return dedupeFilms(parseFilmsFromHtml(cheerio.load(html)));
}

export async function scrapeLikes(
  page: Page,
  username: string
): Promise<FilmItem[]> {
  const safeUser = normalizeUsername(username);
  const url = `https://letterboxd.com/${encodeURIComponent(safeUser)}/likes/films/`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
  const html = await page.content();
  return dedupeFilms(parseFilmsFromHtml(cheerio.load(html)));
}

// --- Standalone & Backward-Compatible Functions ---

export async function getFilms(username: string): Promise<FilmsData> {
  return await withBrowserSession(({ page }) => scrapeFilms(page, username));
}

export const getAllFilms = getFilms;

export async function getFollowers(username: string): Promise<FollowersData> {
  return await withBrowserSession(({ page }) => scrapeFollowers(page, username));
}

export async function getFollowing(username: string): Promise<FollowingData> {
  return await withBrowserSession(({ page }) => scrapeFollowing(page, username));
}

export async function getRSS(username: string): Promise<RSSData> {
  return await scrapeRSS(username);
}

// --- Unified Profile Aggregator (Single Browser Session) ---

/**
 * Combines all profile data into a single unified LetterboxdProfile object
 * using a single, cleanly closed browser session.
 */
export async function getLetterboxdProfile(
  username: string
): Promise<LetterboxdProfile> {
  const safeUser = normalizeUsername(username);
  if (!safeUser) throw new Error("A valid Letterboxd username is required.");

  return await withBrowserSession(async ({ page }) => {
    // 1. Scrape Films & Profile Info (page 1 + all pagination)
    const filmsData = await scrapeFilms(page, safeUser);

    // 2. Concurrently scrape followers, following, and RSS
    const [followersResult, followingResult, rssResult] =
      await Promise.allSettled([
        scrapeFollowers(page, safeUser),
        scrapeFollowing(page, safeUser),
        scrapeRSS(safeUser),
      ]);

    const followersData =
      followersResult.status === "fulfilled" ? followersResult.value : null;
    const followingData =
      followingResult.status === "fulfilled" ? followingResult.value : null;
    const rssData = rssResult.status === "fulfilled" ? rssResult.value : null;

    const rssDisplayName = rssData?.title
      ? cleanDisplayName(rssData.title, "")
      : "";

    const filmsDisplayName = filmsData?.displayName
      ? cleanDisplayName(filmsData.displayName, "")
      : "";

    const displayName =
      rssDisplayName ||
      filmsDisplayName ||
      safeUser;

    const avatar =
      filmsData?.avatar ||
      (followersData?.followers[0]?.avatar ?? null);

    const followersCount =
      followersData?.totalFollowers || followersData?.followers.length || 0;
    const followingCount =
      followingData?.totalFollowing || followingData?.following.length || 0;
    const filmsCount =
      filmsData?.totalFilmsCount || filmsData?.films.length || 0;

    return {
      username: safeUser,
      displayName,
      avatar,
      bio: null,
      followersCount,
      followingCount,
      filmsCount,
      recentActivity: rssData?.entries ?? [],
      films: filmsData?.films ?? [],
      followers: followersData?.followers ?? [],
      following: followingData?.following ?? [],
    };
  });
}

/**
 * Backward compatible helper for existing application UI
 */
export async function getProfile(username: string): Promise<ProfileData> {
  const profile = await getLetterboxdProfile(username);
  return {
    displayName: profile.displayName,
    username: profile.username,
    avatar: profile.avatar,
    bio: profile.bio,
    followers: profile.followersCount,
    following: profile.followingCount,
  };
}
