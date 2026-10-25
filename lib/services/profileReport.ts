import { getLetterboxdProfile, normalizeUsername } from "../scraper";
import { analyzeProfileAsync } from "../analytics";
import {
  getCachedProfile,
  profileCacheKey,
  setCachedProfile,
  type CachedProfileReport,
} from "../cache/cache";
import { cacheLog } from "../cache/config";
import { getBatchMovieDetailsCached } from "./movieMetadata";

export interface GetProfileReportOptions {
  /** Ignore any cached report, scrape again and replace the cache entry. */
  forceRefresh?: boolean;
}

/**
 * In-flight generations keyed by username. Concurrent requests for the same
 * profile share a single scrape instead of launching several browsers.
 */
const inFlight = new Map<string, Promise<CachedProfileReport>>();

async function generateReport(username: string): Promise<CachedProfileReport> {
  cacheLog("Scraping Letterboxd...");
  const profile = await getLetterboxdProfile(username);
  const analytics = await analyzeProfileAsync(
    profile,
    new Date(),
    getBatchMovieDetailsCached
  );
  return setCachedProfile(username, { profile, analytics });
}

/**
 * Cache-first profile report pipeline:
 *
 *   Request → Cache → hit? → return
 *                   → miss → Scraper → Analytics → Store cache → return
 *
 * Scraper errors (ProfileNotFoundError, ProfileFetchError, ...) propagate
 * unchanged and are never cached.
 */
export async function getProfileReport(
  username: string,
  options: GetProfileReportOptions = {}
): Promise<CachedProfileReport> {
  // Use the scraper's normalization so cache keys match scraped usernames.
  const key = profileCacheKey(normalizeUsername(username));
  if (!key) throw new Error("A valid Letterboxd username is required.");

  if (options.forceRefresh) {
    cacheLog(`↻ Force refresh: ${key}`);
  } else {
    const cached = await getCachedProfile(key);
    if (cached) {
      cacheLog(`✓ Cache hit: ${key}`);
      return cached;
    }
    cacheLog(`↻ Cache miss: ${key}`);
  }

  const pending = inFlight.get(key);
  if (pending) {
    cacheLog(`… Awaiting in-progress generation: ${key}`);
    return pending;
  }

  const generation = generateReport(key).finally(() => {
    inFlight.delete(key);
  });
  inFlight.set(key, generation);
  return generation;
}
