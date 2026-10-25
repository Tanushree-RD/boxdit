import type { MovieDetails } from "../movie";
import type { CacheStore, CacheTimestamps } from "./types";
import { CACHE_CONFIG, createCacheStore } from "./config";
import { isCacheExpired } from "./cache";

// --- Types ---

export interface CachedMovieMetadata extends CacheTimestamps {
  slug: string;
  movie: MovieDetails;
}

// --- Store ---

const MOVIE_NAMESPACE = "movie-metadata:v1";

const movieStore: CacheStore<CachedMovieMetadata> =
  createCacheStore<CachedMovieMetadata>(
    MOVIE_NAMESPACE,
    CACHE_CONFIG.maxMovieEntries
  );

// --- Public API ---

/** Returns fresh cached metadata for a single (normalized) slug. */
export async function getCachedMovie(slug: string): Promise<MovieDetails | null> {
  const entry = await movieStore.get(slug);
  if (!entry || isCacheExpired(entry)) return null;
  return entry.movie;
}

/** Returns fresh cached metadata for many (normalized) slugs. Misses are omitted. */
export async function getCachedMovies(
  slugs: string[]
): Promise<Map<string, MovieDetails>> {
  const entries = await movieStore.getMany(slugs);
  const result = new Map<string, MovieDetails>();
  for (const [slug, entry] of entries) {
    if (!isCacheExpired(entry)) result.set(slug, entry.movie);
  }
  return result;
}

function toEntry(
  slug: string,
  movie: MovieDetails,
  ttlMs: number
): CachedMovieMetadata {
  const generatedAt = new Date();
  return {
    slug,
    movie,
    generatedAt: generatedAt.toISOString(),
    expiresAt: new Date(generatedAt.getTime() + ttlMs).toISOString(),
  };
}

/** Caches metadata for a single slug. */
export async function setCachedMovie(
  slug: string,
  movie: MovieDetails,
  ttlMs: number = CACHE_CONFIG.movieTtlMs
): Promise<void> {
  await movieStore.set(slug, toEntry(slug, movie, ttlMs), ttlMs);
}

/** Caches metadata for many slugs at once. */
export async function setCachedMovies(
  movies: Map<string, MovieDetails>,
  ttlMs: number = CACHE_CONFIG.movieTtlMs
): Promise<void> {
  const entries: Array<[string, CachedMovieMetadata]> = [];
  for (const [slug, movie] of movies) {
    entries.push([slug, toEntry(slug, movie, ttlMs)]);
  }
  await movieStore.setMany(entries, ttlMs);
}
