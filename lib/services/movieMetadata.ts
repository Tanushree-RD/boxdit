import { getBatchMovieDetails, normalizeSlug, type MovieDetails } from "../movie";
import { getCachedMovies, setCachedMovies } from "../cache/movieCache";
import { cacheLog } from "../cache/config";

/**
 * Cache-first batch movie metadata loader.
 *
 * 1. Normalize + dedupe slugs.
 * 2. Read every slug from the movie cache.
 * 3. Scrape only the misses (via the unchanged `getBatchMovieDetails`).
 * 4. Store newly scraped metadata so other users can reuse it.
 *
 * Returns the same `Map<slug, MovieDetails>` shape as `getBatchMovieDetails`,
 * so it is a drop-in replacement.
 */
export async function getBatchMovieDetailsCached(
  slugs: string[],
  concurrency = 20
): Promise<Map<string, MovieDetails>> {
  const uniqueSlugs = Array.from(
    new Set(slugs.map((s) => normalizeSlug(s)).filter(Boolean))
  );

  const cached = await getCachedMovies(uniqueSlugs);
  const missing = uniqueSlugs.filter((slug) => !cached.has(slug));

  cacheLog(
    `🎬 Movie cache: ${cached.size} hit${cached.size === 1 ? "" : "s"}, ${missing.length} miss${missing.length === 1 ? "" : "es"}`
  );

  if (missing.length === 0) {
    return cached;
  }

  const scraped = await getBatchMovieDetails(missing, concurrency);
  if (scraped.size > 0) {
    await setCachedMovies(scraped);
    cacheLog(`✓ Cached ${scraped.size} movie${scraped.size === 1 ? "" : "s"}`);
  }

  // Preserve the original slug order for deterministic analytics output.
  const result = new Map<string, MovieDetails>();
  for (const slug of uniqueSlugs) {
    const movie = cached.get(slug) ?? scraped.get(slug);
    if (movie) result.set(slug, movie);
  }
  return result;
}
