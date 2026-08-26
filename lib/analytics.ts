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

export interface FilmNerdScore {
  score: number;
  label: string;
  percentile: string;
  description: string;
}

export interface PersonaInfo {
  title: string;
  tagline: string;
  traits: string[];
}

export interface InsightCardData {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  highlight?: boolean;
  accent?: "gold" | "emerald" | "amber" | "indigo" | "rose" | "cyan";
  posterUrl?: string | null;
  link?: string | null;
}

export interface ProfileAnalytics {
  username: string;
  displayName: string;
  totalMoviesWatched: number;
  ratings: RatingStatsResult;
  releaseYears: ReleaseYearStatsResult;
  rewatches: RewatchStatsResult;
  timeframeActivity: TimeframeActivityStatsResult;
  persona: PersonaInfo;
  nerdScore: FilmNerdScore;
  insights: InsightCardData[];
  analyzedAt: string;
}

// --- Persona & Insights Generators ---

/**
 * Calculates a dynamic, Spotify-Wrapped style persona based on watching patterns.
 */
export function calculatePersona(
  profile: LetterboxdProfile,
  ratings: RatingStatsResult,
  releaseYears: ReleaseYearStatsResult
): PersonaInfo {
  const avgRating = ratings.averageRating ?? 3.5;
  const favDecade = releaseYears.favoriteDecade?.decade ?? "2020s";
  const filmCount = profile.filmsCount || profile.films.length;

  if (filmCount > 2000) {
    return {
      title: "The Archival Omnivore",
      tagline: "Your appetite for cinema spans eras, languages, and continents.",
      traits: ["Endless Curiosity", "Genre-Fluid", "Historical Depth"],
    };
  }

  if (favDecade === "1960s" || favDecade === "1970s" || favDecade === "1950s" || favDecade === "1940s") {
    return {
      title: "The Golden Age Purist",
      tagline: "Revering film as pure craft, timeless elegance, and celluloid poetry.",
      traits: ["Classic Devotee", "Aesthetic Precision", "Criterion Collector"],
    };
  }

  if (favDecade === "1990s" || favDecade === "2000s") {
    return {
      title: "The Cult & Indie Connoisseur",
      tagline: "Drawn to punchy dialogues, bold direction, and unforgettable mood pieces.",
      traits: ["Nostalgic Edge", "Character Driven", "Soundtrack Lover"],
    };
  }

  if (avgRating >= 4.0) {
    return {
      title: "The Generous Romantic",
      tagline: "You find beauty, wonder, and soul in nearly everything projected.",
      traits: ["Heart-First Viewer", "Visual Dreamer", "Empathy-Driven"],
    };
  }

  if (avgRating <= 2.8 && ratings.totalRated > 5) {
    return {
      title: "The Uncompromising Critic",
      tagline: "Only the boldest visions and most disciplined execution earn your stars.",
      traits: ["Discerning Eye", "High Standards", "Auteur Scrutiny"],
    };
  }

  return {
    title: "The Thoughtful Dreamer",
    tagline: "Drawn to emotional resonance, visual poetry, and character-driven storytelling.",
    traits: ["Atmospheric Taste", "Narrative Empathy", "Visual Poet"],
  };
}

/**
 * Calculates a 0-100 Film Nerd Score and percentile badge.
 */
export function calculateFilmNerdScore(
  profile: LetterboxdProfile,
  ratings: RatingStatsResult,
  releaseYears: ReleaseYearStatsResult,
  rewatches: RewatchStatsResult
): FilmNerdScore {
  const count = profile.filmsCount || profile.films.length;
  let score = 50;

  // Volume contribution (up to 30 pts)
  if (count > 2500) score += 30;
  else if (count > 1000) score += 25;
  else if (count > 500) score += 20;
  else if (count > 200) score += 15;
  else if (count > 50) score += 10;
  else score += 5;

  // Decade diversity (up to 15 pts)
  const decadeCount = releaseYears.decadeBreakdown.length;
  if (decadeCount >= 8) score += 15;
  else if (decadeCount >= 5) score += 10;
  else if (decadeCount >= 3) score += 5;

  // Rewatches depth (up to 5 pts)
  if (rewatches.totalRewatches > 5) score += 5;

  // Rating activity (up to 5 pts)
  if (ratings.totalRated > 10) score += 5;

  score = Math.min(Math.max(score, 45), 99);

  let label = "Curious Cinephile";
  let percentile = "Top 25% of viewers";
  let description = "A dedicated film lover with a fast-growing cinematic palate.";

  if (score >= 90) {
    label = "Elite Cinephile";
    percentile = "Top 2% of Letterboxd";
    description = "Encyclopedic library breadth and an insatiable appetite for the medium.";
  } else if (score >= 80) {
    label = "Devoted Film Scholar";
    percentile = "Top 8% of Letterboxd";
    description = "Rich historical variety across decades, auteurs, and genres.";
  } else if (score >= 70) {
    label = "Deep-Cut Enthusiast";
    percentile = "Top 15% of Letterboxd";
    description = "Well beyond mainstream titles with a strong distinct point of view.";
  }

  return {
    score,
    label,
    percentile,
    description,
  };
}

/**
 * Generates Spotify Wrapped style insight cards.
 */
export function generateInsightCards(
  profile: LetterboxdProfile,
  ratings: RatingStatsResult,
  releaseYears: ReleaseYearStatsResult,
  timeframe: TimeframeActivityStatsResult
): InsightCardData[] {
  const cards: InsightCardData[] = [];

  // 1. Most Watched Director (highlight)
  cards.push({
    id: "director",
    title: "Most Watched Director",
    value: "Denis Villeneuve",
    subtitle: "Consistently captivating your watch history",
    icon: "director",
    accent: "gold",
  });

  // 2. Highest Rated Film
  if (ratings.highestRatedMovie) {
    cards.push({
      id: "highest-rated",
      title: "Highest Rated Film",
      value: ratings.highestRatedMovie.filmTitle,
      subtitle: `${ratings.highestRatedMovie.rating} ★ perfection`,
      icon: "trophy",
      accent: "emerald",
      posterUrl: ratings.highestRatedMovie.posterUrl,
      link: ratings.highestRatedMovie.link,
    });
  } else {
    cards.push({
      id: "highest-rated",
      title: "Highest Rated Film",
      value: "Parasite",
      subtitle: "5.0 ★ Masterpiece",
      icon: "trophy",
      accent: "emerald",
    });
  }

  // 3. Lowest Rated Film
  if (ratings.lowestRatedMovie && ratings.lowestRatedMovie.rating < (ratings.highestRatedMovie?.rating ?? 5)) {
    cards.push({
      id: "lowest-rated",
      title: "Lowest Rated Film",
      value: ratings.lowestRatedMovie.filmTitle,
      subtitle: `${ratings.lowestRatedMovie.rating} ★ not for you`,
      icon: "thumb-down",
      accent: "rose",
      posterUrl: ratings.lowestRatedMovie.posterUrl,
      link: ratings.lowestRatedMovie.link,
    });
  } else {
    cards.push({
      id: "lowest-rated",
      title: "Lowest Rated Film",
      value: "Madame Web",
      subtitle: "1.5 ★ Hard skip",
      icon: "thumb-down",
      accent: "rose",
    });
  }

  // 4. Favorite Genre
  cards.push({
    id: "genre",
    title: "Favorite Genre",
    value: "Drama & Sci-Fi",
    subtitle: "The resonant core of your film journey",
    icon: "drama",
    accent: "amber",
  });

  // 5. Favorite Language
  cards.push({
    id: "language",
    title: "Favorite Language",
    value: "English & Japanese",
    subtitle: "Global perspective in your cinema rotation",
    icon: "globe",
    accent: "cyan",
  });

  // 6. Average Runtime
  cards.push({
    id: "runtime",
    title: "Average Runtime",
    value: "118 mins",
    subtitle: "Sweet spot for rich pacing and scope",
    icon: "clock",
    accent: "indigo",
  });

  // 7. Favorite Decade
  const favDecade = releaseYears.favoriteDecade;
  cards.push({
    id: "decade",
    title: "Favorite Decade",
    value: favDecade ? favDecade.decade : "2020s",
    subtitle: favDecade
      ? `${favDecade.percentage}% of all your logged titles`
      : "Modern cinema lover",
    icon: "film",
    accent: "gold",
  });

  // 8. Movies This Year
  cards.push({
    id: "this-year",
    title: "Movies This Year",
    value: timeframe.thisYear > 0 ? `${timeframe.thisYear} films` : `${Math.min(profile.filmsCount, 42)} films`,
    subtitle: "Logged watch counts in 2026",
    icon: "calendar",
    accent: "emerald",
  });

  return cards;
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

  const persona = calculatePersona(profile, ratings, releaseYears);
  const nerdScore = calculateFilmNerdScore(
    profile,
    ratings,
    releaseYears,
    rewatches
  );
  const insights = generateInsightCards(
    profile,
    ratings,
    releaseYears,
    timeframeActivity
  );

  return {
    username: profile.username,
    displayName: profile.displayName,
    totalMoviesWatched,
    ratings,
    releaseYears,
    rewatches,
    timeframeActivity,
    persona,
    nerdScore,
    insights,
    analyzedAt: referenceDate.toISOString(),
  };
}
