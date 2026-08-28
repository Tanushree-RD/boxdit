import * as cheerio from "cheerio";

// --- Types ---

export interface MovieDetails {
  slug: string;
  title: string;
  releaseYear: number | null;
  directors: string[];
  genres: string[];
  cast: string[];
  runtime: number | null; // runtime in minutes
  countries: string[];
  languages: string[];
  studios: string[];
  rating: number | null; // average Letterboxd rating (out of 5)
  posterUrl: string | null;
  backdropUrl: string | null;
}

// --- Custom Errors ---

export class MovieFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MovieFetchError";
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

export function normalizeSlug(slug: string): string {
  return normalizeText(slug)
    .replace(/^https?:\/\/letterboxd\.com\/film\//i, "")
    .replace(/^\/?film\//i, "")
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase();
}

function parseDuration(durationStr: string | null | undefined): number | null {
  if (!durationStr) return null;
  // Standard ISO 8601 duration format: PT139M or PT2H19M
  const isoMatch = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?/i);
  if (isoMatch && (isoMatch[1] || isoMatch[2])) {
    const hours = isoMatch[1] ? parseInt(isoMatch[1], 10) : 0;
    const minutes = isoMatch[2] ? parseInt(isoMatch[2], 10) : 0;
    return hours * 60 + minutes;
  }
  const minMatch = durationStr.match(/(\d+)\s*(?:mins?|minutes?)/i);
  if (minMatch) {
    return parseInt(minMatch[1], 10);
  }
  return null;
}

function dedupe(items: (string | null | undefined)[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const item of items) {
    const clean = normalizeText(item);
    if (clean && !seen.has(clean.toLowerCase())) {
      seen.add(clean.toLowerCase());
      result.push(clean);
    }
  }
  return result;
}

interface JsonLdEntity {
  name?: string;
  [key: string]: unknown;
}

interface JsonLdMovie {
  name?: string;
  dateCreated?: string;
  datePublished?: string;
  duration?: string;
  director?: JsonLdEntity | JsonLdEntity[];
  actor?: JsonLdEntity | JsonLdEntity[];
  genre?: string | string[];
  countryOfOrigin?: JsonLdEntity | JsonLdEntity[];
  inLanguage?: JsonLdEntity | JsonLdEntity[] | string | string[];
  productionCompany?: JsonLdEntity | JsonLdEntity[];
  aggregateRating?: {
    ratingValue?: number;
  };
  image?: string;
  [key: string]: unknown;
}

function extractJsonLd($: cheerio.CheerioAPI): JsonLdMovie | null {
  let result: JsonLdMovie | null = null;
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const raw = $(el)
        .html()
        ?.replace(/\/\* <!\[CDATA\[ \*\//g, "")
        .replace(/\/\* \]\]> \*\//g, "")
        .trim();
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && (parsed["@type"] === "Movie" || parsed["@type"] === "Film")) {
        result = parsed as JsonLdMovie;
      }
    } catch {
      // ignore JSON parse error in non-matching script tags
    }
  });
  return result;
}

// In-memory global cache for movie details across requests
const movieDetailsCache = new Map<string, MovieDetails>();

// --- Main Movie Scraper ---

/**
 * Retrieves rich movie metadata for a given Letterboxd movie slug.
 * Visits https://letterboxd.com/film/{slug}/
 * Returns strongly typed MovieDetails, or null if the movie does not exist (404).
 */
export async function getMovieDetails(
  slug: string
): Promise<MovieDetails | null> {
  const safeSlug = normalizeSlug(slug);
  if (!safeSlug) {
    throw new Error("A valid Letterboxd film slug is required.");
  }

  if (movieDetailsCache.has(safeSlug)) {
    return movieDetailsCache.get(safeSlug)!;
  }

  const url = `https://letterboxd.com/film/${encodeURIComponent(safeSlug)}/`;
  let response: Response;

  try {
    response = await fetch(url, {
      headers: REQUEST_HEADERS,
      redirect: "follow",
      cache: "no-store",
    });
  } catch (err) {
    throw new MovieFetchError(
      `Network error fetching ${url}: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  if (response.status === 404 || response.status === 410) {
    return null;
  }

  if (!response.ok) {
    throw new MovieFetchError(
      `Letterboxd returned status ${response.status} for film "${safeSlug}" (${url})`
    );
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // 1. Extract JSON-LD structured metadata if available
  const jsonLd = extractJsonLd($);

  // 2. Extract Title
  const domTitle = normalizeText(
    $("h1.filmtitle, h1.headline-1, .film-header-lockup h1, section#featured-film-header h1")
      .first()
      .text()
  );
  const metaTitle = normalizeText(
    $('meta[property="og:title"]').attr("content")?.replace(/\s*\(\d{4}\)$/, "")
  );
  const title = jsonLd?.name || domTitle || metaTitle || safeSlug;

  // 3. Extract Release Year
  const domYearText = normalizeText(
    $(".film-header-lockup a[href*='/films/year/'], .releaseyear a, .releaseyear, .number[href*='/films/year/']")
      .first()
      .text()
  );
  let releaseYear: number | null = null;
  if (domYearText) {
    const yearNum = parseInt(domYearText, 10);
    if (!isNaN(yearNum) && yearNum > 1800 && yearNum < 2200) {
      releaseYear = yearNum;
    }
  }
  if (!releaseYear && jsonLd?.dateCreated) {
    const yearMatch = jsonLd.dateCreated.match(/\b(18|19|20)\d{2}\b/);
    if (yearMatch) releaseYear = parseInt(yearMatch[0], 10);
  }
  if (!releaseYear && jsonLd?.datePublished) {
    const yearMatch = jsonLd.datePublished.match(/\b(18|19|20)\d{2}\b/);
    if (yearMatch) releaseYear = parseInt(yearMatch[0], 10);
  }
  if (!releaseYear) {
    const titleYearMatch = $("title").text().match(/\((\d{4})\)/);
    if (titleYearMatch) releaseYear = parseInt(titleYearMatch[1], 10);
  }

  // 4. Extract Directors
  const domDirectors = $("a[href^='/director/'], #tab-crew a[href^='/director/']")
    .map((_, el) => $(el).text())
    .get();
  const jsonDirectors: string[] = [];
  if (jsonLd?.director) {
    const dirList = Array.isArray(jsonLd.director)
      ? jsonLd.director
      : [jsonLd.director];
    for (const d of dirList) {
      if (d && typeof d === "object" && d.name) {
        jsonDirectors.push(d.name);
      }
    }
  }
  const directors = dedupe([...domDirectors, ...jsonDirectors]);

  // 5. Extract Genres
  const domGenres = $(
    "#tab-genres a[href*='/films/genre/'], .text-sluglist a[href*='/films/genre/'], a[href*='/films/genre/']"
  )
    .map((_, el) => $(el).text())
    .get();
  const jsonGenres = jsonLd?.genre
    ? Array.isArray(jsonLd.genre)
      ? jsonLd.genre
      : [jsonLd.genre]
    : [];
  const genres = domGenres.length > 0 ? dedupe(domGenres) : dedupe(jsonGenres);

  // 6. Extract Cast
  const domCast = $(
    "#tab-cast a[href^='/actor/'], .cast-list a[href^='/actor/'], a[href^='/actor/']"
  )
    .map((_, el) => $(el).text())
    .get();
  const jsonCast: string[] = [];
  if (jsonLd?.actor) {
    const actorList = Array.isArray(jsonLd.actor)
      ? jsonLd.actor
      : [jsonLd.actor];
    for (const a of actorList) {
      if (a && typeof a === "object" && a.name) {
        jsonCast.push(a.name);
      }
    }
  }
  const cast = domCast.length > 0 ? dedupe(domCast) : dedupe(jsonCast);

  // 7. Extract Runtime (in minutes)
  let runtime: number | null = null;
  if (jsonLd?.duration) {
    runtime = parseDuration(jsonLd.duration);
  }
  if (!runtime) {
    const domRuntimeText = $(".text-footer, #tab-details, p.text-link").text();
    runtime = parseDuration(domRuntimeText);
  }

  // 8. Extract Countries
  const domCountries = $(
    "#tab-details a[href*='/films/country/'], a[href*='/films/country/']"
  )
    .map((_, el) => $(el).text())
    .get();
  const jsonCountries: string[] = [];
  if (jsonLd?.countryOfOrigin) {
    const cList = Array.isArray(jsonLd.countryOfOrigin)
      ? jsonLd.countryOfOrigin
      : [jsonLd.countryOfOrigin];
    for (const c of cList) {
      if (c && typeof c === "object" && c.name) {
        jsonCountries.push(c.name);
      }
    }
  }
  const countries =
    domCountries.length > 0 ? dedupe(domCountries) : dedupe(jsonCountries);

  // 9. Extract Languages
  const domLanguages = $(
    "#tab-details a[href*='/films/language/'], a[href*='/films/language/']"
  )
    .map((_, el) => $(el).text())
    .get();
  const jsonLanguages: string[] = [];
  if (jsonLd?.inLanguage) {
    const langList = Array.isArray(jsonLd.inLanguage)
      ? jsonLd.inLanguage
      : [jsonLd.inLanguage];
    for (const l of langList) {
      if (typeof l === "string") {
        jsonLanguages.push(l);
      } else if (l && typeof l === "object" && l.name) {
        jsonLanguages.push(l.name);
      }
    }
  }
  const languages =
    domLanguages.length > 0 ? dedupe(domLanguages) : dedupe(jsonLanguages);

  // 10. Extract Studios
  const domStudios = $(
    "#tab-details a[href*='/studio/'], #tab-details a[href*='/films/studio/'], a[href*='/studio/'], a[href*='/films/studio/']"
  )
    .map((_, el) => $(el).text())
    .get();
  const jsonStudios: string[] = [];
  if (jsonLd?.productionCompany) {
    const studioList = Array.isArray(jsonLd.productionCompany)
      ? jsonLd.productionCompany
      : [jsonLd.productionCompany];
    for (const s of studioList) {
      if (s && typeof s === "object" && s.name) {
        jsonStudios.push(s.name);
      }
    }
  }
  const studios =
    domStudios.length > 0 ? dedupe(domStudios) : dedupe(jsonStudios);

  // 11. Extract Rating (average Letterboxd rating out of 5)
  let rating: number | null = null;
  if (
    jsonLd?.aggregateRating?.ratingValue !== undefined &&
    jsonLd.aggregateRating.ratingValue !== null
  ) {
    const val = Number(jsonLd.aggregateRating.ratingValue);
    if (!isNaN(val)) rating = val;
  }
  if (rating === null) {
    const twitterData = $('meta[name="twitter:data2"]').attr("content");
    if (twitterData) {
      const match = twitterData.match(/([\d.]+)/);
      if (match) {
        const val = parseFloat(match[1]);
        if (!isNaN(val)) rating = val;
      }
    }
  }
  if (rating === null) {
    const domRatingText = $("span.average-rating a, section.ratings-histogram-chart span.average-rating").text();
    const match = domRatingText.match(/([\d.]+)/);
    if (match) {
      const val = parseFloat(match[1]);
      if (!isNaN(val)) rating = val;
    }
  }

  // 12. Extract Poster URL
  let posterUrl: string | null = null;
  const resolvablePath = $("div[data-component-class='LazyPoster']").attr(
    "data-resolvable-poster-path"
  );
  if (resolvablePath) {
    try {
      const parsed = JSON.parse(resolvablePath);
      const uid = parsed?.postered?.uid;
      const key = parsed?.cacheBustingKey;
      if (uid && safeSlug) {
        const idStr = uid.replace(/\D/g, "");
        if (idStr) {
          const parts = idStr.split("").join("/");
          const v = key ? `?v=${key}` : "";
          posterUrl = `https://a.ltrbxd.com/resized/film-poster/${parts}/${idStr}-${safeSlug}-0-500-0-750-crop.jpg${v}`;
        }
      }
    } catch {
      // fallback
    }
  }
  if (!posterUrl && jsonLd?.image) {
    posterUrl = jsonLd.image;
  }
  if (!posterUrl) {
    const metaImg = $('meta[property="og:image"]').attr("content");
    if (metaImg && !metaImg.includes("empty-poster")) {
      posterUrl = metaImg;
    }
  }

  // 13. Extract Backdrop URL
  let backdropUrl: string | null =
    $("#backdrop").attr("data-backdrop2x") ||
    $("#backdrop").attr("data-backdrop") ||
    null;

  if (!backdropUrl) {
    const backdropStyle = $("#backdrop").attr("style");
    if (backdropStyle) {
      const bgMatch = backdropStyle.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (bgMatch) {
        backdropUrl = bgMatch[1];
      }
    }
  }

  const result: MovieDetails = {
    slug: safeSlug,
    title,
    releaseYear,
    directors,
    genres,
    cast,
    runtime,
    countries,
    languages,
    studios,
    rating,
    posterUrl,
    backdropUrl,
  };

  movieDetailsCache.set(safeSlug, result);
  return result;
}

/**
 * Batch retrieves MovieDetails for a list of slugs with controlled concurrency.
 * Uses in-memory caching to avoid redundant network calls.
 */
export async function getBatchMovieDetails(
  slugs: string[],
  concurrency = 12,
  maxFetch = 60
): Promise<Map<string, MovieDetails>> {
  const result = new Map<string, MovieDetails>();
  const uniqueSlugs = Array.from(
    new Set(slugs.map((s) => normalizeSlug(s)).filter(Boolean))
  );

  const toFetch: string[] = [];
  for (const slug of uniqueSlugs) {
    if (movieDetailsCache.has(slug)) {
      result.set(slug, movieDetailsCache.get(slug)!);
    } else {
      toFetch.push(slug);
    }
  }

  const limitedFetch = toFetch.slice(0, Math.max(0, maxFetch - result.size));

  for (let i = 0; i < limitedFetch.length; i += concurrency) {
    const chunk = limitedFetch.slice(i, i + concurrency);
    const chunkResults = await Promise.allSettled(
      chunk.map((slug) => getMovieDetails(slug))
    );

    for (let j = 0; j < chunk.length; j++) {
      const res = chunkResults[j];
      const slug = chunk[j];
      if (res.status === "fulfilled" && res.value) {
        result.set(slug, res.value);
      }
    }
  }

  return result;
}

