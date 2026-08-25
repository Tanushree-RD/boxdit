import {
  getFilms,
  getFollowers,
  getFollowing,
  getRSS,
  getLetterboxdProfile,
  ProfileNotFoundError,
} from "../lib/scraper.js";

async function testService() {
  const username = "davidehrlich";
  console.log(`\n======================================================`);
  console.log(`TESTING MULTI-ENDPOINT SCRAPER FOR: @${username}`);
  console.log(`======================================================\n`);

  console.log(`--- 1. Testing getFilms("${username}") ---`);
  const films = await getFilms(username);
  console.log(`Films count found on page: ${films.films.length}`);
  console.log(`Estimated total films: ${films.totalFilmsCount}`);
  console.log(`Sample film item:`, JSON.stringify(films.films[0], null, 2));

  console.log(`\n--- 2. Testing getFollowers("${username}") ---`);
  const followers = await getFollowers(username);
  console.log(`Followers found on page: ${followers.followers.length}`);
  console.log(`Sample follower:`, JSON.stringify(followers.followers[0], null, 2));

  console.log(`\n--- 3. Testing getFollowing("${username}") ---`);
  const following = await getFollowing(username);
  console.log(`Following found on page: ${following.following.length}`);
  console.log(`Sample following:`, JSON.stringify(following.following[0], null, 2));

  console.log(`\n--- 4. Testing getRSS("${username}") ---`);
  const rss = await getRSS(username);
  console.log(`RSS Channel: ${rss.title}`);
  console.log(`RSS Entries count: ${rss.entries.length}`);
  console.log(`Sample RSS entry:`, JSON.stringify(rss.entries[0], null, 2));

  console.log(`\n--- 5. Testing getLetterboxdProfile("${username}") ---`);
  const fullProfile = await getLetterboxdProfile(username);
  console.log(`\nFULL COLLECTED PROFILE JSON:`);
  console.log(
    JSON.stringify(
      {
        ...fullProfile,
        recentActivity: fullProfile.recentActivity.slice(0, 3), // truncate for preview
        films: fullProfile.films.slice(0, 3),
        followers: fullProfile.followers.slice(0, 3),
        following: fullProfile.following.slice(0, 3),
      },
      null,
      2
    )
  );

  console.log(`\n--- 6. Testing 404 Non-existent user handling ---`);
  try {
    await getLetterboxdProfile("nonexistent_user_xyz_987654");
    console.error("ERROR: Expected ProfileNotFoundError but succeeded!");
  } catch (err) {
    if (err instanceof ProfileNotFoundError) {
      console.log("SUCCESS: Correctly caught ProfileNotFoundError ->", err.message);
    } else {
      console.error("Unexpected error:", err);
    }
  }
}

testService().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
