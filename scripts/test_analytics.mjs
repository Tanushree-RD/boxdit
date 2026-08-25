import { getLetterboxdProfile } from "../lib/scraper.js";
import {
  analyzeProfile,
  calculateRatingStats,
  calculateDecadeAndYearStats,
  calculateRewatchStats,
  calculateTimeframeActivity,
} from "../lib/analytics.js";

async function runTests() {
  console.log("==========================================================");
  console.log("UNIT TESTS: Individual Analytics Helper Functions");
  console.log("==========================================================");

  // 1. Test calculateRatingStats
  const mockEntries = [
    { title: "Film A", rating: 5.0, filmYear: 2024, pubDate: "2026-08-20T00:00:00Z", watchedDate: "2026-08-20", rewatch: false, link: "", reviewText: null, posterUrl: null, filmTitle: "Film A" },
    { title: "Film B", rating: 4.5, filmYear: 2024, pubDate: "2026-08-18T00:00:00Z", watchedDate: "2026-08-18", rewatch: true, link: "", reviewText: null, posterUrl: null, filmTitle: "Film B" },
    { title: "Film C", rating: 2.0, filmYear: 1999, pubDate: "2026-08-10T00:00:00Z", watchedDate: "2026-08-10", rewatch: false, link: "", reviewText: null, posterUrl: null, filmTitle: "Film C" },
    { title: "Film D", rating: null, filmYear: 2010, pubDate: "2026-07-01T00:00:00Z", watchedDate: "2026-07-01", rewatch: false, link: "", reviewText: null, posterUrl: null, filmTitle: "Film D" },
  ];

  const ratingStats = calculateRatingStats(mockEntries);
  console.log("\n1. calculateRatingStats test:");
  console.log(`   Total rated: ${ratingStats.totalRated} (Expected: 3)`);
  console.log(`   Average rating: ${ratingStats.averageRating} (Expected: 3.83)`);
  console.log(`   Highest: ${ratingStats.highestRatedMovie?.filmTitle} (${ratingStats.highestRatedMovie?.rating} stars)`);
  console.log(`   Lowest: ${ratingStats.lowestRatedMovie?.filmTitle} (${ratingStats.lowestRatedMovie?.rating} stars)`);

  // 2. Test calculateDecadeAndYearStats
  const mockFilms = [
    { name: "Film 1", slug: "film-1", year: 2026, link: "", posterUrl: null },
    { name: "Film 2", slug: "film-2", year: 2026, link: "", posterUrl: null },
    { name: "Film 3", slug: "film-3", year: 2024, link: "", posterUrl: null },
    { name: "Film 4", slug: "film-4", year: 1995, link: "", posterUrl: null },
    { name: "Film 5", slug: "film-5", year: 1994, link: "", posterUrl: null },
  ];

  const yearStats = calculateDecadeAndYearStats(mockFilms, mockEntries);
  console.log("\n2. calculateDecadeAndYearStats test:");
  console.log(`   Favorite decade: ${yearStats.favoriteDecade?.decade} (${yearStats.favoriteDecade?.count} films, ${yearStats.favoriteDecade?.percentage}%)`);
  console.log(`   Most watched year: ${yearStats.mostWatchedYear?.year} (${yearStats.mostWatchedYear?.count} films)`);
  console.log(`   Average release year: ${yearStats.averageReleaseYear}`);

  // 3. Test calculateRewatchStats
  const rewatchStats = calculateRewatchStats(mockEntries);
  console.log("\n3. calculateRewatchStats test:");
  console.log(`   Total rewatches: ${rewatchStats.totalRewatches} (Expected: 1)`);
  console.log(`   Rewatch %: ${rewatchStats.rewatchPercentage}% (Expected: 25.0%)`);

  // 4. Test calculateTimeframeActivity
  const refDate = new Date("2026-08-25T00:00:00Z");
  const timeframeStats = calculateTimeframeActivity(mockEntries, refDate);
  console.log("\n4. calculateTimeframeActivity test (Ref: 2026-08-25):");
  console.log(`   Watched this year: ${timeframeStats.thisYear} (Expected: 4)`);
  console.log(`   Watched this month: ${timeframeStats.thisMonth} (Expected: 3)`);
  console.log(`   Watched this week (last 7 days): ${timeframeStats.thisWeek} (Expected: 2)`);

  console.log("\n==========================================================");
  console.log("INTEGRATION TEST: Real Letterboxd Profile Analytics");
  console.log("==========================================================");

  const username = "davidehrlich";
  console.log(`Fetching profile for @${username}...`);
  const profile = await getLetterboxdProfile(username);
  
  console.log(`Calculating analytics...`);
  const analytics = analyzeProfile(profile, refDate);

  console.log("\n--- RESULTING ANALYTICS JSON ---");
  console.log(JSON.stringify(analytics, null, 2));
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
