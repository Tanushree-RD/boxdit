import {
  calculateRatingStats,
  calculateDecadeAndYearStats,
  calculateActorStats,
  calculateGenreStats,
  calculateRuntimeStats,
  calculateTimeframeActivity,
  generateDeepDiveCards,
  analyzeProfile,
  analyzeProfileAsync,
} from "../lib/analytics.ts";
import { getLetterboxdProfile } from "../lib/scraper.ts";

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

async function runTests() {
  console.log("\n=======================================================");
  console.log("UNIT TESTS: Real Analytics & Tie-Breaking Engine");
  console.log("=======================================================\n");

  // 1. Test calculateRatingStats with Tie-Breaking (most recently watched)
  const tiedEntries = [
    {
      title: "Film Old High",
      filmTitle: "Old 5 Star",
      rating: 5.0,
      filmYear: 2020,
      pubDate: "2026-01-01T00:00:00Z",
      watchedDate: "2026-01-01",
      rewatch: false,
      link: "https://letterboxd.com/user/film/old-5-star/",
      reviewText: null,
      posterUrl: "https://poster.old",
    },
    {
      title: "Film New High",
      filmTitle: "New 5 Star",
      rating: 5.0,
      filmYear: 2024,
      pubDate: "2026-08-15T00:00:00Z",
      watchedDate: "2026-08-15",
      rewatch: false,
      link: "https://letterboxd.com/user/film/new-5-star/",
      reviewText: null,
      posterUrl: "https://poster.new",
    },
    {
      title: "Film Mid High",
      filmTitle: "Mid 5 Star",
      rating: 5.0,
      filmYear: 2022,
      pubDate: "2026-05-01T00:00:00Z",
      watchedDate: "2026-05-01",
      rewatch: false,
      link: "https://letterboxd.com/user/film/mid-5-star/",
      reviewText: null,
      posterUrl: "https://poster.mid",
    },
    {
      title: "Film Old Low",
      filmTitle: "Old 1 Star",
      rating: 1.0,
      filmYear: 2018,
      pubDate: "2026-02-01T00:00:00Z",
      watchedDate: "2026-02-01",
      rewatch: false,
      link: "https://letterboxd.com/user/film/old-1-star/",
      reviewText: null,
      posterUrl: null,
    },
    {
      title: "Film New Low",
      filmTitle: "New 1 Star",
      rating: 1.0,
      filmYear: 2023,
      pubDate: "2026-07-20T00:00:00Z",
      watchedDate: "2026-07-20",
      rewatch: false,
      link: "https://letterboxd.com/user/film/new-1-star/",
      reviewText: null,
      posterUrl: null,
    },
    {
      title: "Film Mid",
      filmTitle: "Mid 3 Star",
      rating: 3.0,
      filmYear: 2021,
      pubDate: "2026-03-01T00:00:00Z",
      watchedDate: "2026-03-01",
      rewatch: false,
      link: "https://letterboxd.com/user/film/mid-3-star/",
      reviewText: null,
      posterUrl: null,
    },
  ];

  const ratingResult = calculateRatingStats(tiedEntries);
  assert(ratingResult.totalRated === 6, "Total rated count should be 6");
  assert(
    ratingResult.highestRatedMovie?.filmTitle === "New 5 Star",
    `Highest rated film should be 'New 5 Star' due to recent watch date (got ${ratingResult.highestRatedMovie?.filmTitle})`
  );
  assert(
    ratingResult.lowestRatedMovie?.filmTitle === "New 1 Star",
    `Lowest rated film should be 'New 1 Star' due to recent watch date (got ${ratingResult.lowestRatedMovie?.filmTitle})`
  );
  assert(
    ratingResult.averageRating === 3.33,
    `Average rating should be 3.33 (got ${ratingResult.averageRating})`
  );

  // 2. Test calculateActorStats
  const mockMovieDetails = [
    {
      slug: "film-1",
      title: "Film 1",
      releaseYear: 2023,
      directors: ["Director A"],
      genres: ["Sci-Fi", "Drama"],
      cast: ["Leonardo DiCaprio", "Cillian Murphy", "Tom Hardy"],
      runtime: 148,
      countries: ["USA"],
      languages: ["English"],
      studios: ["Warner Bros"],
      rating: 4.2,
      posterUrl: null,
      backdropUrl: null,
    },
    {
      slug: "film-2",
      title: "Film 2",
      releaseYear: 2020,
      directors: ["Director B"],
      genres: ["Drama", "Thriller"],
      cast: ["Cillian Murphy", "Emily Blunt", "Florence Pugh"],
      runtime: 180,
      countries: ["USA"],
      languages: ["English"],
      studios: ["Universal"],
      rating: 4.4,
      posterUrl: null,
      backdropUrl: null,
    },
    {
      slug: "film-3",
      title: "Film 3",
      releaseYear: 2017,
      directors: ["Director C"],
      genres: ["War", "Drama"],
      cast: ["Cillian Murphy", "Tom Hardy", "Mark Rylance"],
      runtime: 106,
      countries: ["UK"],
      languages: ["English"],
      studios: ["Syncopy"],
      rating: 4.1,
      posterUrl: null,
      backdropUrl: null,
    },
  ];

  const actorResult = calculateActorStats(mockMovieDetails);
  assert(
    actorResult.favoriteActor === "Cillian Murphy",
    `Favorite actor should be 'Cillian Murphy' (got ${actorResult.favoriteActor})`
  );
  assert(
    actorResult.appearanceCount === 3,
    `Cillian Murphy appearance count should be 3 (got ${actorResult.appearanceCount})`
  );

  // Test empty actor stats
  const emptyActorResult = calculateActorStats([]);
  assert(
    emptyActorResult.favoriteActor === null,
    "Empty movie list yields null favoriteActor"
  );
  assert(
    emptyActorResult.appearanceCount === 0,
    "Empty movie list yields 0 appearance count"
  );

  // 3. Test calculateGenreStats
  const genreResult = calculateGenreStats(mockMovieDetails);
  assert(
    genreResult.favoriteGenre === "Drama",
    `Favorite genre should be 'Drama' (got ${genreResult.favoriteGenre})`
  );
  assert(
    genreResult.genreCount === 3,
    `Drama count should be 3 (got ${genreResult.genreCount})`
  );

  // 4. Test calculateRuntimeStats
  const runtimeResult = calculateRuntimeStats(mockMovieDetails);
  // (148 + 180 + 106) / 3 = 434 / 3 = 144.66 => 145 mins
  assert(
    runtimeResult.averageRuntimeMinutes === 145,
    `Average runtime should be 145 mins (got ${runtimeResult.averageRuntimeMinutes})`
  );
  assert(
    runtimeResult.formattedRuntime === "145 mins",
    `Formatted runtime should be '145 mins' (got ${runtimeResult.formattedRuntime})`
  );
  assert(
    runtimeResult.totalMoviesWithRuntime === 3,
    `Total movies with runtime should be 3 (got ${runtimeResult.totalMoviesWithRuntime})`
  );

  // 5. Test calculateTimeframeActivity
  const refDate = new Date("2026-08-25T00:00:00Z");
  const timeframeResult = calculateTimeframeActivity(tiedEntries, refDate);
  assert(
    timeframeResult.thisYear === 6,
    `Movies this year should be 6 (got ${timeframeResult.thisYear})`
  );

  // 6. Test generateDeepDiveCards
  const deepDiveCards = generateDeepDiveCards(
    ratingResult,
    timeframeResult,
    runtimeResult,
    refDate
  );
  assert(deepDiveCards.length === 4, `Deep dive cards count should be 4 (got ${deepDiveCards.length})`);
  assert(
    deepDiveCards[0].id === "highest-rated" && deepDiveCards[0].value === "New 5 Star",
    `Card 1 should be Highest Rated Film 'New 5 Star' (got ${deepDiveCards[0].value})`
  );
  assert(
    deepDiveCards[1].id === "lowest-rated" && deepDiveCards[1].value === "New 1 Star",
    `Card 2 should be Lowest Rated Film 'New 1 Star' (got ${deepDiveCards[1].value})`
  );
  assert(
    deepDiveCards[2].id === "this-year" && deepDiveCards[2].value === "6 films",
    `Card 3 should be Movies Watched This Year '6 films' (got ${deepDiveCards[2].value})`
  );
  assert(
    deepDiveCards[3].id === "runtime" && deepDiveCards[3].value === "145 mins",
    `Card 4 should be Average Runtime '145 mins' (got ${deepDiveCards[3].value})`
  );

  console.log("\n=======================================================");
  console.log("INTEGRATION TEST: End-to-End Real Profile Analytics");
  console.log("=======================================================\n");

  const username = "davidehrlich";
  console.log(`Fetching Letterboxd profile for @${username}...`);
  const profile = await getLetterboxdProfile(username);
  console.log(`Profile loaded: ${profile.films.length} films, ${profile.recentActivity.length} recent activity entries.`);

  console.log("Running analyzeProfileAsync with real movie details enrichment...");
  const analytics = await analyzeProfileAsync(profile, refDate);

  console.log("\n--- COMPUTED HERO STATS METRICS ---");
  console.log(`1. Movies Watched: ${analytics.totalMoviesWatched}`);
  console.log(`2. Average Rating: ${analytics.ratings.averageRating} ★ (${analytics.ratings.totalRated} rated)`);
  console.log(`3. Favorite Genre: ${analytics.genreStats.favoriteGenre} (${analytics.genreStats.genreCount} films)`);
  console.log(`4. Favorite Decade: ${analytics.releaseYears.favoriteDecade?.decade} (${analytics.releaseYears.favoriteDecade?.percentage}%)`);
  console.log(`5. Film Nerd Score: ${analytics.nerdScore.score}/100 (${analytics.nerdScore.label})`);
  console.log(`6. Favorite Actor: ${analytics.actorStats.favoriteActor} (${analytics.actorStats.appearanceCount} appearances)`);

  console.log("\n--- COMPUTED DEEP DIVE CARDS ---");
  for (const card of analytics.insights) {
    console.log(`- [${card.title}] => ${card.value} (${card.subtitle})`);
  }

  assert(analytics.totalMoviesWatched > 0, "totalMoviesWatched > 0");
  assert(analytics.insights.length === 4, "Deep dive insights length is 4");
  assert(
    analytics.insights.every((c) => c.value && !c.value.includes("Denis Villeneuve")),
    "No hardcoded dummy placeholders in deep dive cards"
  );

  console.log("\n✨ ALL TESTS PASSED SUCCESSFULLY! ✨\n");
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
