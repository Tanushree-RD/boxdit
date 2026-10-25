import type { LetterboxdProfile } from "../scraper";
import type { ProfileAnalytics } from "../analytics";
import type { CacheStore, CacheTimestamps } from "./types";
import { CACHE_CONFIG, cacheLog, createCacheStore } from "./config";

// --- Types ---

/** The complete generated report. Partial data is never cached. */
export interface CachedProfileReport extends CacheTimestamps {
  username: string;
  profile: LetterboxdProfile;
  analytics: ProfileAnalytics;
}

// --- Store ---

const PROFILE_NAMESPACE = "profile-report:v1";

const profileStore: CacheStore<CachedProfileReport> =
  createCacheStore<CachedProfileReport>(
    PROFILE_NAMESPACE,
    CACHE_CONFIG.maxProfileEntries
  );

/** Normalizes usernames so `@User`, `user/` and `user` share one cache key. */
export function profileCacheKey(username: string): string {
  return username.trim().replace(/^@/, "").replace(/^\/+|\/+$/g, "").toLowerCase();
}

// --- Public API ---

/**
 * Returns `true` if the cached entry is missing or past its `expiresAt`.
 */
export function isCacheExpired(
  entry: CacheTimestamps | null | undefined,
  now: Date = new Date()
): boolean {
  if (!entry) return true;
  const expiresAt = Date.parse(entry.expiresAt);
  return Number.isNaN(expiresAt) || now.getTime() >= expiresAt;
}

/**
 * Returns the cached report for a user if it exists and is still fresh.
 * Expired entries are treated as a miss.
 */
export async function getCachedProfile(
  username: string
): Promise<CachedProfileReport | null> {
  const key = profileCacheKey(username);
  if (!key) return null;

  const entry = await profileStore.get(key);
  if (!entry || isCacheExpired(entry)) return null;
  return entry;
}

/**
 * Stores a complete report and returns the cached object (with timestamps).
 */
export async function setCachedProfile(
  username: string,
  data: { profile: LetterboxdProfile; analytics: ProfileAnalytics },
  ttlMs: number = CACHE_CONFIG.profileTtlMs
): Promise<CachedProfileReport> {
  const key = profileCacheKey(username);
  const generatedAt = new Date();
  const expiresAt = new Date(generatedAt.getTime() + ttlMs);

  const entry: CachedProfileReport = {
    username: key,
    profile: data.profile,
    analytics: data.analytics,
    generatedAt: generatedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  await profileStore.set(key, entry, ttlMs);
  cacheLog(`✓ Cached successfully: ${key} (expires ${entry.expiresAt})`);
  return entry;
}

/** Removes a cached report (e.g. before a forced refresh). */
export async function invalidateCachedProfile(username: string): Promise<void> {
  await profileStore.delete(profileCacheKey(username));
}
