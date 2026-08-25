import { getLetterboxdProfile } from "../lib/scraper.js";

async function testMultiple() {
  for (const user of ["matthew", "karsten"]) {
    console.log(`\nTesting @${user}...`);
    const prof = await getLetterboxdProfile(user);
    console.log(`Success for @${user}:`, {
      displayName: prof.displayName,
      avatar: prof.avatar ? prof.avatar.slice(0, 45) + "..." : null,
      filmsCount: prof.filmsCount,
      recentActivityCount: prof.recentActivity.length,
      followersCount: prof.followers.length,
      followingCount: prof.following.length,
    });
  }
}

testMultiple();
