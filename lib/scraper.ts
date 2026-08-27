import * as cheerio from "cheerio";

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
  // Do NOT parse <title> tag as it may contain rating stars or bio text.
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

async function fetchEndpoint(url: string, username: string): Promise<string> {
  let response: Response;
  try {
    response = await fetch(url, {
      headers: REQUEST_HEADERS,
      redirect: "follow",
      cache: "no-store",
    });
  } catch (err) {
    throw new ProfileFetchError(
      `Network error fetching ${url}: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  if (response.status === 404 || response.status === 410) {
    throw new ProfileNotFoundError(username);
  }

  if (!response.ok) {
    throw new ProfileFetchError(
      `Letterboxd endpoint returned status ${response.status} for "${username}" (${url})`
    );
  }

  return response.text();
}

/**
 * Fetches a URL with automatic retry and exponential backoff.
 * Retries up to `maxRetries` times on transient failures (network errors, 5xx).
 * Throws on 404/410 (not retryable) immediately.
 */
async function fetchWithRetry(
  url: string,
  username: string,
  maxRetries = 3
): Promise<string> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchEndpoint(url, username);
    } catch (err) {
      // Don't retry on "not found" — it's permanent
      if (err instanceof ProfileNotFoundError) throw err;

      if (attempt < maxRetries) {
        const backoffMs = 1000 * Math.pow(2, attempt - 1); // 1s, 2s, 4s
        console.warn(
          `  ⚠ Attempt ${attempt}/${maxRetries} failed for ${url}, retrying in ${backoffMs}ms...`
        );
        await delay(backoffMs);
      } else {
        throw err;
      }
    }
  }
  // Unreachable, but satisfies TypeScript
  throw new ProfileFetchError(`fetchWithRetry exhausted all retries for ${url}`);
}

// --- Individual Parsers ---

/**
 * Extracts FilmItem[] from a cheerio-loaded Letterboxd films page HTML.
 */
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

/**
 * Extracts the total number of pages from a Letterboxd films page.
 */
export function parseTotalPages($: cheerio.CheerioAPI): number {
  const lastPageText = normalizeText(
    $(".paginate-pages li:last-child a, .paginate-pages a").last().text()
  );
  const lastPageNum = parseCount(lastPageText);
  return lastPageNum > 0 ? lastPageNum : 1;
}

/**
 * Deduplicates films by slug, keeping the first occurrence.
 */
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

/**
 * Delay helper for retry/pacing.
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Crawls the complete Letterboxd film catalogue for a given user.
 * 1. Starts at /{username}/films/
 * 2. Detects pagination automatically
 * 3. Continues requesting /films/page/2/, /films/page/3/, etc. until no more pages
 * 4. Merges every movie into a single array
 * 5. Removes duplicates
 * 6. Shows progress in the terminal
 * 7. Adds retry logic with exponential backoff for transient failures
 * 8. Returns strongly typed FilmsData
 */
export async function getFilms(username: string): Promise<FilmsData> {
  const safeUser = normalizeUsername(username);
  if (!safeUser) throw new Error("A valid Letterboxd username is required.");

  // Dynamically load puppeteer-extra with stealth plugin
  let puppeteer: typeof import("puppeteer-extra").default | null = null;
  try {
    const pExtra = await import("puppeteer-extra");
    const stealth = (await import("puppeteer-extra-plugin-stealth")).default;
    puppeteer = pExtra.default;
    puppeteer.use(stealth());
  } catch {
    puppeteer = null;
  }

  // If puppeteer is unavailable, fallback to paginated fetch
  if (!puppeteer) {
    console.log("Fetching page 1...");

    const page1Url = `https://letterboxd.com/${encodeURIComponent(safeUser)}/films/`;
    const page1Html = await fetchWithRetry(page1Url, safeUser);
    const $1 = cheerio.load(page1Html);

    const displayName = extractDisplayName($1, safeUser);

    const avatar =
      $1("#header .avatar img, .profile-avatar img, a.avatar img, .avatar img")
        .first()
        .attr("src") || null;

    // Parse page 1 films and detect total pages
    const allFilms: FilmItem[] = [...parseFilmsFromHtml($1)];
    const totalPages = Math.min(parseTotalPages($1), MAX_PAGES);
    console.log(`Found ${allFilms.length} movies.`);

    // Crawl subsequent pages
    if (totalPages > 1) {
      for (let pageNum = 2; pageNum <= totalPages; pageNum++) {
        console.log(`\nFetching page ${pageNum}...`);

        try {
          const pageUrl = `https://letterboxd.com/${encodeURIComponent(safeUser)}/films/page/${pageNum}/`;
          const pageHtml = await fetchWithRetry(pageUrl, safeUser);
          const $page = cheerio.load(pageHtml);
          const pageFilms = parseFilmsFromHtml($page);

          if (pageFilms.length === 0) {
            // No more movies found — pagination may have changed; stop gracefully
            console.log("No movies found on this page. Stopping pagination.");
            break;
          }

          allFilms.push(...pageFilms);
          console.log(`Found ${pageFilms.length} movies.`);
        } catch (err) {
          // If a single page fails after retries, stop gracefully instead of crashing
          console.warn(
            `  ⚠ Could not fetch page ${pageNum} after retries. Stopping pagination. (${err instanceof Error ? err.message : String(err)})`
          );
          break;
        }

        // Polite delay between requests
        if (pageNum < totalPages) {
          await delay(200);
        }
      }
    }

    // Deduplicate and return
    const dedupedFilms = dedupeFilms(allFilms);
    console.log(`\nFinished.\nTotal movies collected: ${dedupedFilms.length}.`);

    return {
      username: safeUser,
      displayName,
      avatar,
      totalFilmsCount: dedupedFilms.length,
      films: dedupedFilms,
    };
  }

  // --- Puppeteer path (with stealth plugin) ---
  console.log("Fetching page 1...");

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  try {
    const page = await browser.newPage();
    const startUrl = `https://letterboxd.com/${encodeURIComponent(safeUser)}/films/`;

    let page1Html = "";
    let page1Loaded = false;

    // Retry logic for initial page load
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await page.goto(startUrl, {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        });

        if (res && (res.status() === 404 || res.status() === 410)) {
          throw new ProfileNotFoundError(safeUser);
        }

        page1Html = await page.content();
        page1Loaded = true;
        break;
      } catch (err) {
        if (err instanceof ProfileNotFoundError) throw err;
        if (attempt < 3) {
          await delay(1000 * attempt);
        } else {
          throw new ProfileFetchError(
            `Failed to load page 1 for "${safeUser}": ${err instanceof Error ? err.message : String(err)}`
          );
        }
      }
    }

    if (!page1Loaded) {
      throw new ProfileFetchError(`Could not fetch page 1 for "${safeUser}".`);
    }

    const $1 = cheerio.load(page1Html);

    // Extract Display Name without parsing <title>
    const displayName = extractDisplayName($1, safeUser);

    // Extract Avatar
    const avatar =
      $1("#header .avatar img, .profile-avatar img, a.avatar img, .avatar img")
        .first()
        .attr("src") || null;

    // Parse Page 1 Films
    const allFilms: FilmItem[] = [...parseFilmsFromHtml($1)];
    const totalPages = parseTotalPages($1);

    console.log(`Found ${allFilms.length} movies.`);

    // Crawl subsequent pages if pagination exists
    const cappedPages = Math.min(totalPages, MAX_PAGES);
    if (cappedPages > 1) {
      for (let pageNum = 2; pageNum <= cappedPages; pageNum++) {
        console.log(`\nFetching page ${pageNum}...`);

        let pageHtml: string | null = null;

        // In-browser fetch with retry logic for transient request failures
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            const fetchResult = await page.evaluate(
              async (pNum: number, user: string) => {
                const response = await fetch(`/${user}/films/page/${pNum}/`, {
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
              },
              pageNum,
              safeUser
            );

            if (fetchResult.status === 200 && fetchResult.text) {
              pageHtml = fetchResult.text;
              break;
            } else if (attempt < 3) {
              await delay(800 * attempt);
            }
          } catch (err) {
            if (attempt < 3) {
              await delay(800 * attempt);
            }
          }
        }

        if (pageHtml) {
          const $page = cheerio.load(pageHtml);
          const pageFilms = parseFilmsFromHtml($page);

          if (pageFilms.length === 0) {
            // No more movies found on this page
            break;
          }

          allFilms.push(...pageFilms);
          console.log(`Found ${pageFilms.length} movies.`);
        } else {
          // If page fetch failed after retries, stop pagination gracefully
          break;
        }

        // Polite delay between rapid requests
        if (pageNum < totalPages) {
          await delay(200);
        }
      }
    }

    // Deduplicate all collected films
    const dedupedFilms = dedupeFilms(allFilms);
    console.log(`\nFinished.\nTotal movies collected: ${dedupedFilms.length}.`);

    return {
      username: safeUser,
      displayName,
      avatar,
      totalFilmsCount: dedupedFilms.length,
      films: dedupedFilms,
    };
  } finally {
    await browser.close();
  }
}

/**
 * Backward-compatible alias for getFilms
 */
export const getAllFilms = getFilms;

/**
 * Parses /followers/ endpoint: extracts follower users and target user stats.
 */
export async function getFollowers(username: string): Promise<FollowersData> {
  const safeUser = normalizeUsername(username);
  if (!safeUser) throw new Error("A valid Letterboxd username is required.");

  const url = `https://letterboxd.com/${encodeURIComponent(safeUser)}/followers/`;
  const html = await fetchEndpoint(url, safeUser);
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

  // Target user total followers count
  const totalFollowers = parseCount(
    $('a[href*="/followers/"]').first().text()
  ) || followers.length;

  return {
    username: safeUser,
    totalFollowers,
    followers,
  };
}

/**
 * Parses /following/ endpoint: extracts followed users and stats.
 */
export async function getFollowing(username: string): Promise<FollowingData> {
  const safeUser = normalizeUsername(username);
  if (!safeUser) throw new Error("A valid Letterboxd username is required.");

  const url = `https://letterboxd.com/${encodeURIComponent(safeUser)}/following/`;
  const html = await fetchEndpoint(url, safeUser);
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

  const totalFollowing = parseCount(
    $('a[href*="/following/"]').first().text()
  ) || following.length;

  return {
    username: safeUser,
    totalFollowing,
    following,
  };
}

/**
 * Parses /rss/ endpoint: extracts activity, reviews, ratings, and film metadata.
 */
export async function getRSS(username: string): Promise<RSSData> {
  const safeUser = normalizeUsername(username);
  if (!safeUser) throw new Error("A valid Letterboxd username is required.");

  const url = `https://letterboxd.com/${encodeURIComponent(safeUser)}/rss/`;
  const xml = await fetchEndpoint(url, safeUser);
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

// --- Unified Profile Aggregator ---

/**
 * Combines all allowed 200 OK endpoints (/films/, /followers/, /following/, /rss/)
 * into a single unified LetterboxdProfile object without touching the blocked root URL.
 */
export async function getLetterboxdProfile(
  username: string
): Promise<LetterboxdProfile> {
  const safeUser = normalizeUsername(username);
  if (!safeUser) throw new Error("A valid Letterboxd username is required.");

  // Fetch all allowed endpoints concurrently
  const [filmsResult, followersResult, followingResult, rssResult] =
    await Promise.allSettled([
      getFilms(safeUser),
      getFollowers(safeUser),
      getFollowing(safeUser),
      getRSS(safeUser),
    ]);

  // If the user does not exist, getFilms or getRSS will reject with ProfileNotFoundError
  if (
    filmsResult.status === "rejected" &&
    filmsResult.reason instanceof ProfileNotFoundError
  ) {
    throw filmsResult.reason;
  }
  if (
    rssResult.status === "rejected" &&
    rssResult.reason instanceof ProfileNotFoundError
  ) {
    throw rssResult.reason;
  }

  // If all failed, throw error
  if (
    filmsResult.status === "rejected" &&
    rssResult.status === "rejected" &&
    followersResult.status === "rejected" &&
    followingResult.status === "rejected"
  ) {
    throw new ProfileFetchError(
      `Could not retrieve Letterboxd profile for "${safeUser}".`
    );
  }

  const filmsData =
    filmsResult.status === "fulfilled" ? filmsResult.value : null;
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
    bio: null, // Note: bio is only present on the blocked root page
    followersCount,
    followingCount,
    filmsCount,
    recentActivity: rssData?.entries ?? [],
    films: filmsData?.films ?? [],
    followers: followersData?.followers ?? [],
    following: followingData?.following ?? [],
  };
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
