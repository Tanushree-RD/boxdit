import { analyzeProfile, analyzeProfileAsync } from "../lib/analytics.ts";
import { getMovieDetails } from "../lib/movie.ts";

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

async function runComparisonTests() {
  console.log("\n=======================================================");
  console.log("TEST: Comparing Analytics Across Two Distinct User Libraries");
  console.log("=======================================================\n");

  // User 1: Sci-Fi / Nolan enthusiast
  const user1Films = [
    { name: "Inception", slug: "inception", link: "/film/inception/", year: 2010, posterUrl: null },
    { name: "Interstellar", slug: "interstellar", link: "/film/interstellar/", year: 2014, posterUrl: null },
    { name: "Oppenheimer", slug: "oppenheimer-2023", link: "/film/oppenheimer-2023/", year: 2023, posterUrl: null },
    { name: "The Prestige", slug: "the-prestige", link: "/film/the-prestige/", year: 2006, posterUrl: null },
    { name: "Tenet", slug: "tenet", link: "/film/tenet/", year: 2020, posterUrl: null },
  ];

  const profile1 = {
    username: "scifi_fan",
    displayName: "SciFi Fan",
    avatar: null,
    bio: null,
    followersCount: 10,
    followingCount: 10,
    filmsCount: 5,
    recentActivity: [
      {
        title: "Interstellar (2014)",
        link: "https://letterboxd.com/scifi_fan/film/interstellar/",
        pubDate: "2026-08-20T00:00:00Z",
        watchedDate: "2026-08-20",
        filmTitle: "Interstellar",
        filmYear: 2014,
        rating: 5.0,
        rewatch: false,
        reviewText: null,
        posterUrl: null,
      },
    ],
    films: user1Films,
    followers: [],
    following: [],
  };

  // User 2: Classic / Crime / Scorsese enthusiast
  const user2Films = [
    { name: "The Godfather", slug: "the-godfather", link: "/film/the-godfather/", year: 1972, posterUrl: null },
    { name: "The Godfather Part II", slug: "the-godfather-part-ii", link: "/film/the-godfather-part-ii/", year: 1974, posterUrl: null },
    { name: "GoodFellas", slug: "goodfellas", link: "/film/goodfellas/", year: 1990, posterUrl: null },
    { name: "Taxi Driver", slug: "taxi-driver", link: "/film/taxi-driver/", year: 1976, posterUrl: null },
    { name: "Raging Bull", slug: "raging-bull", link: "/film/raging-bull/", year: 1980, posterUrl: null },
    { name: "The Irishman", slug: "the-irishman-2019", link: "/film/the-irishman-2019/", year: 2019, posterUrl: null },
  ];

  const profile2 = {
    username: "crime_classic_fan",
    displayName: "Crime Fan",
    avatar: null,
    bio: null,
    followersCount: 20,
    followingCount: 15,
    filmsCount: 6,
    recentActivity: [
      {
        title: "The Godfather (1972)",
        link: "https://letterboxd.com/crime_classic_fan/film/the-godfather/",
        pubDate: "2026-08-18T00:00:00Z",
        watchedDate: "2026-08-18",
        filmTitle: "The Godfather",
        filmYear: 1972,
        rating: 5.0,
        rewatch: false,
        reviewText: null,
        posterUrl: null,
      },
    ],
    films: user2Films,
    followers: [],
    following: [],
  };

  console.log("Analyzing User 1 (Sci-Fi Fan)...");
  const analytics1 = await analyzeProfileAsync(profile1);

  console.log("Analyzing User 2 (Crime Classic Fan)...");
  const analytics2 = await analyzeProfileAsync(profile2);

  console.log("\n--- COMPARISON RESULTS ---");
  console.log(`User 1 (${analytics1.username}):`);
  console.log(`  Favorite Genre: ${analytics1.genreStats.favoriteGenre} (Top: ${analytics1.genreStats.breakdown.map(g => `${g.genre}:${g.count}`).join(", ")})`);
  console.log(`  Favorite Actor: ${analytics1.actorStats.favoriteActor} (Top: ${analytics1.actorStats.topActors.map(a => `${a.name}:${a.count}`).join(", ")})`);
  console.log(`  Favorite Decade: ${analytics1.releaseYears.favoriteDecade?.decade}`);

  console.log(`\nUser 2 (${analytics2.username}):`);
  console.log(`  Favorite Genre: ${analytics2.genreStats.favoriteGenre} (Top: ${analytics2.genreStats.breakdown.map(g => `${g.genre}:${g.count}`).join(", ")})`);
  console.log(`  Favorite Actor: ${analytics2.actorStats.favoriteActor} (Top: ${analytics2.actorStats.topActors.map(a => `${a.name}:${a.count}`).join(", ")})`);
  console.log(`  Favorite Decade: ${analytics2.releaseYears.favoriteDecade?.decade}`);

  // Assertions
  assert(
    analytics1.genreStats.favoriteGenre !== analytics2.genreStats.favoriteGenre ||
    analytics1.genreStats.genreCount !== analytics2.genreStats.genreCount,
    "Genre counts / distributions differ between User 1 and User 2"
  );

  assert(
    analytics1.actorStats.favoriteActor !== analytics2.actorStats.favoriteActor,
    `Favorite actors differ between User 1 (${analytics1.actorStats.favoriteActor}) and User 2 (${analytics2.actorStats.favoriteActor})`
  );

  // User 1 should have Michael Caine or Cillian Murphy or Leonardo DiCaprio
  assert(
    analytics1.actorStats.topActors.some(a => ["Michael Caine", "Cillian Murphy", "Leonardo DiCaprio", "Christian Bale"].includes(a.name)),
    "User 1's top actors correctly reflect Nolan film cast"
  );

  // User 2 should have Robert De Niro or Al Pacino
  assert(
    analytics2.actorStats.topActors.some(a => ["Robert De Niro", "Al Pacino", "Robert Duvall", "Joe Pesci"].includes(a.name)),
    "User 2's top actors correctly reflect Godfather / Scorsese film cast"
  );

  assert(
    analytics1.releaseYears.favoriteDecade?.decade !== analytics2.releaseYears.favoriteDecade?.decade,
    `Favorite decades differ between User 1 (${analytics1.releaseYears.favoriteDecade?.decade}) and User 2 (${analytics2.releaseYears.favoriteDecade?.decade})`
  );

  console.log("\n✨ MULTI-USER COMPARISON TEST PASSED! ✨\n");
}

runComparisonTests().catch((err) => {
  console.error("Comparison test failed:", err);
  process.exit(1);
});
