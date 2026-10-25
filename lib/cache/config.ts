import type { CacheStore } from "./types";
import { getGlobalMemoryStore } from "./memoryStore";

const HOUR_MS = 60 * 60 * 1000;

function readPositiveNumber(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

/**
 * Central cache configuration. TTLs can be overridden via environment
 * variables without touching code:
 *
 * - `PROFILE_CACHE_TTL_HOURS` (default: 24)
 * - `MOVIE_CACHE_TTL_HOURS`   (default: 720 = 30 days)
 */
export const CACHE_CONFIG = {
  profileTtlMs:
    readPositiveNumber(process.env.PROFILE_CACHE_TTL_HOURS, 24) * HOUR_MS,
  movieTtlMs:
    readPositiveNumber(process.env.MOVIE_CACHE_TTL_HOURS, 24 * 30) * HOUR_MS,
  /** Upper bound on in-memory entries to keep memory usage predictable. */
  maxProfileEntries: 500,
  maxMovieEntries: 50_000,
} as const;

/**
 * Store factory. This is the single place to change when moving to Redis or
 * a database: return a different `CacheStore` implementation here.
 */
export function createCacheStore<T>(
  namespace: string,
  maxEntries?: number
): CacheStore<T> {
  return getGlobalMemoryStore<T>(namespace, maxEntries);
}

export const isDevelopment = process.env.NODE_ENV !== "production";

/** Logs cache activity in development only. */
export function cacheLog(message: string): void {
  if (isDevelopment) {
    console.log(message);
  }
}
