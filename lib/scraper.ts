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

// --- Individual Parsers ---

/**
 * Parses /films/ endpoint: extracts film history, display name, avatar, and total pages.
 */
export async function getFilms(username: string): Promise<FilmsData> {
  const safeUser = normalizeUsername(username);
  if (!safeUser) throw new Error("A valid Letterboxd username is required.");

  const url = `https://letterboxd.com/${encodeURIComponent(safeUser)}/films/`;
  const html = await fetchEndpoint(url, safeUser);
  const $ = cheerio.load(html);

  // Extract Display Name from title or header
  const rawTitle = $("title").text();
  const displayName =
    normalizeText(
      rawTitle
        .replace(/’s films\s*•\s*Letterboxd$/i, "")
        .replace(/'s films\s*•\s*Letterboxd$/i, "")
        .replace(/\s*•\s*Letterboxd$/i, "")
    ) || safeUser;

  // Extract avatar
  const avatar =
    $("#header .avatar img, .profile-avatar img, a.avatar img, .avatar img")
      .first()
      .attr("src") || null;

  // Extract films from grid
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

  // Parse total pages / film count
  const lastPageNum = parseCount(
    $(".paginate-pages li:last-child a, .paginate-pages a").last().text()
  );
  const totalFilmsCount = lastPageNum > 0 ? lastPageNum * 72 : films.length;

  return {
    username: safeUser,
    displayName,
    avatar,
    totalFilmsCount,
    films,
  };
}

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

  const displayName =
    filmsData?.displayName ||
    (rssData?.title ? rssData.title.replace(/^Letterboxd\s*-\s*/i, "") : "") ||
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
