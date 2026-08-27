import { getLetterboxdProfile } from "../lib/scraper";

async function test() {
  try {
    console.log("Testing getLetterboxdProfile('karsten')...");
    const profile = await getLetterboxdProfile("karsten");
    console.log("Profile received:", {
      username: profile.username,
      displayName: profile.displayName,
      filmsCount: profile.filmsCount,
      filmsLength: profile.films.length,
      followersCount: profile.followersCount,
      followingCount: profile.followingCount,
    });
  } catch (err) {
    console.error("Test error:", err);
  }
}

test();
