import { FilmItem, LetterboxdProfile, RSSEntry } from "./scraper";

// --- Types ---

export interface MovieRatingSummary {
  filmTitle: string;
  rating: number;
  filmYear: number | null;
  watchedDate: string | null;
  posterUrl: string | null;
  link: string;
}

export type RatingKey =
  | "0.5"
  | "1.0"
  | "1.5"
  | "2.0"
  | "2.5"
  | "3.0"
  | "3.5"
  | "4.0"
  | "4.5"
  | "5.0";

export type RatingDistribution = Record<RatingKey, number>;

export interface DecadeStat {
  decade: string;
  count: number;
  percentage: number;
}

export interface YearStat {
  year: number;
  count: number;
}

export interface RatingStatsResult {
  totalRated: number;
  averageRating: number | null;
  highestRatedMovie: MovieRatingSummary | null;
  lowestRatedMovie: MovieRatingSummary | null;
  distribution: RatingDistribution;
}

export interface ReleaseYearStatsResult {
  favoriteDecade: DecadeStat | null;
  mostWatchedYear: YearStat | null;
  averageReleaseYear: number | null;
  decadeBreakdown: DecadeStat[];
}

export interface RewatchStatsResult {
  totalRewatches: number;
  rewatchPercentage: number;
  loggedWatchCount: number;
}

export interface TimeframeActivityStatsResult {
  thisYear: number;
  thisMonth: number;
  thisWeek: number;
}

export interface ProfileAnalytics {
  username: string;
  displayName: string;
  totalMoviesWatched: number;
  ratings: RatingStatsResult;
  releaseYears: ReleaseYearStatsResult;
  rewatches: RewatchStatsResult;
  timeframeActivity: TimeframeActivityStatsResult;
  analyzedAt: string;
}

// --- Helper Functions ---

export const VALID_RATING_KEYS: RatingKey[] = [
  "0.5",
  "1.0",
  "1.5",
  "2.0",
  "2.5",
  "3.0",
  "3.5",
  "4.0",
  "4.5",
  "5.0",
];

export function createEmptyDistribution(): RatingDistribution {
  return {
    "0.5": 0,
    "1.0": 0,
    "1.5": 0,
    "2.0": 0,
    "2.5": 0,
    "3.0": 0,
    "3.5": 0,
    "4.0": 0,
    "4.5": 0,
    "5.0": 0,
  };
}

export function parseEntryDate(entry: RSSEntry): Date | null {
  if (entry.watchedDate) {
    const d = new Date(entry.watchedDate + "T00:00:00Z");
    if (!isNaN(d.getTime())) return d;
  }
  if (entry.pubDate) {
    const d = new Date(entry.pubDate);
    if (!isNaN(d.getTime())) return d;
  }
  return null;
}

/**
 * Calculates rating stats including average, highest/lowest rated films, and 0.5-5.0 distribution.
 */
export function calculateRatingStats(entries: RSSEntry[]): RatingStatsResult {
  const distribution = createEmptyDistribution();
  const ratedEntries = entries.filter(
    (e) => typeof e.rating === "number" && e.rating >= 0.5 && e.rating <= 5.0
  );

  if (ratedEntries.length === 0) {
    return {
      totalRated: 0,
      averageRating: null,
      highestRatedMovie: null,
      lowestRatedMovie: null,
      distribution,
    };
  }

  let ratingSum = 0;
  let highest: MovieRatingSummary | null = null;
  let lowest: MovieRatingSummary | null = null;

  for (const entry of ratedEntries) {
    const r = entry.rating!;
    ratingSum += r;

    // Normalizing rating key (e.g. 4 -> "4.0", 3.5 -> "3.5")
    const key = (Math.round(r * 2) / 2).toFixed(1) as RatingKey;
    if (key in distribution) {
      distribution[key] = (distribution[key] || 0) + 1;
    }

    const summary: MovieRatingSummary = {
      filmTitle: entry.filmTitle || entry.title,
      rating: r,
      filmYear: entry.filmYear,
      watchedDate: entry.watchedDate || entry.pubDate || null,
      posterUrl: entry.posterUrl,
      link: entry.link,
    };

    if (!highest || r > highest.rating) {
      highest = summary;
    }
    if (!lowest || r < lowest.rating) {
      lowest = summary;
    }
  }

  const averageRating = Number((ratingSum / ratedEntries.length).toFixed(2));

  return {
    totalRated: ratedEntries.length,
    averageRating,
    highestRatedMovie: highest,
    lowestRatedMovie: lowest,
    distribution,
  };
}

/**
 * Aggregates release year statistics (favorite decade, most watched year, average year, decade breakdown).
 */
export function calculateDecadeAndYearStats(
  films: FilmItem[],
  entries: RSSEntry[]
): ReleaseYearStatsResult {
  const allYears: number[] = [];
  const seenFilms = new Set<string>();

  // Collect from film library
  for (const film of films) {
    if (film.year && film.year > 1880 && film.year <= 2100) {
      const key = `${film.slug || film.name}-${film.year}`;
      if (!seenFilms.has(key)) {
        seenFilms.add(key);
        allYears.push(film.year);
      }
    }
  }

  // Collect from diary entries if not already collected
  for (const entry of entries) {
    if (entry.filmYear && entry.filmYear > 1880 && entry.filmYear <= 2100) {
      const key = `${entry.filmTitle || entry.title}-${entry.filmYear}`;
      if (!seenFilms.has(key)) {
        seenFilms.add(key);
        allYears.push(entry.filmYear);
      }
    }
  }

  if (allYears.length === 0) {
    return {
      favoriteDecade: null,
      mostWatchedYear: null,
      averageReleaseYear: null,
      decadeBreakdown: [],
    };
  }

  // Calculate average release year
  const totalYearsSum = allYears.reduce((sum, y) => sum + y, 0);
  const averageReleaseYear = Math.round(totalYearsSum / allYears.length);

  // Frequency by year
  const yearCounts: Record<number, number> = {};
  for (const year of allYears) {
    yearCounts[year] = (yearCounts[year] || 0) + 1;
  }

  let mostWatchedYear: YearStat | null = null;
  for (const [yearStr, count] of Object.entries(yearCounts)) {
    const year = Number(yearStr);
    if (!mostWatchedYear || count > mostWatchedYear.count) {
      mostWatchedYear = { year, count };
    }
  }

  // Frequency by decade
  const decadeCounts: Record<string, number> = {};
  for (const year of allYears) {
    const decadeStart = Math.floor(year / 10) * 10;
    const decadeKey = `${decadeStart}s`;
    decadeCounts[decadeKey] = (decadeCounts[decadeKey] || 0) + 1;
  }

  const decadeBreakdown: DecadeStat[] = Object.entries(decadeCounts)
    .map(([decade, count]) => ({
      decade,
      count,
      percentage: Number(((count / allYears.length) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.count - a.count);

  const favoriteDecade = decadeBreakdown.length > 0 ? decadeBreakdown[0] : null;

  return {
    favoriteDecade,
    mostWatchedYear,
    averageReleaseYear,
    decadeBreakdown,
  };
}

/**
 * Calculates total rewatches and rewatch percentage.
 */
export function calculateRewatchStats(entries: RSSEntry[]): RewatchStatsResult {
  const loggedWatchCount = entries.length;
  if (loggedWatchCount === 0) {
    return {
      totalRewatches: 0,
      rewatchPercentage: 0,
      loggedWatchCount: 0,
    };
  }

  const totalRewatches = entries.filter((e) => e.rewatch === true).length;
  const rewatchPercentage = Number(
    ((totalRewatches / loggedWatchCount) * 100).toFixed(1)
  );

  return {
    totalRewatches,
    rewatchPercentage,
    loggedWatchCount,
  };
}

/**
 * Calculates watch activity for this year, this month, and this week.
 */
export function calculateTimeframeActivity(
  entries: RSSEntry[],
  referenceDate: Date = new Date()
): TimeframeActivityStatsResult {
  let thisYear = 0;
  let thisMonth = 0;
  let thisWeek = 0;

  const targetYear = referenceDate.getFullYear();
  const targetMonth = referenceDate.getMonth();

  // Calculate 7-day rolling window for "this week"
  const oneWeekAgo = new Date(referenceDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  for (const entry of entries) {
    const entryDate = parseEntryDate(entry);
    if (!entryDate) continue;

    const eYear = entryDate.getFullYear();
    const eMonth = entryDate.getMonth();

    if (eYear === targetYear) {
      thisYear++;
      if (eMonth === targetMonth) {
        thisMonth++;
      }
    }

    if (entryDate >= oneWeekAgo && entryDate <= referenceDate) {
      thisWeek++;
    }
  }

  return {
    thisYear,
    thisMonth,
    thisWeek,
  };
}

/**
 * Main analytics engine: calculates all stats for a Letterboxd profile.
 */
export function analyzeProfile(
  profile: LetterboxdProfile,
  referenceDate: Date = new Date()
): ProfileAnalytics {
  const totalMoviesWatched =
    profile.filmsCount > 0
      ? profile.filmsCount
      : Math.max(profile.films.length, profile.recentActivity.length);

  const ratings = calculateRatingStats(profile.recentActivity);
  const releaseYears = calculateDecadeAndYearStats(
    profile.films,
    profile.recentActivity
  );
  const rewatches = calculateRewatchStats(profile.recentActivity);
  const timeframeActivity = calculateTimeframeActivity(
    profile.recentActivity,
    referenceDate
  );

  return {
    username: profile.username,
    displayName: profile.displayName,
    totalMoviesWatched,
    ratings,
    releaseYears,
    rewatches,
    timeframeActivity,
    analyzedAt: referenceDate.toISOString(),
  };
}
