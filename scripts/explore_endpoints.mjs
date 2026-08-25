import * as cheerio from "cheerio";

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

async function testAll(username) {
  // 1. Films
  const filmsRes = await fetch(`https://letterboxd.com/${username}/films/`, { headers });
  const filmsHtml = await filmsRes.text();
  const $f = cheerio.load(filmsHtml);

  console.log("=== FILMS ENDPOINT ===");
  console.log("Title:", $f("title").text());
  console.log("Display Name candidate 1:", $f(".contextual-title, h1.title-1").text().trim());
  console.log("Poster items count:", $f(".poster-list .poster-container, ul.poster-list li, .film-poster").length);
  const samplePoster = $f(".film-poster").first();
  console.log("Sample poster attributes:", samplePoster.attr());
  console.log("Sample poster img:", samplePoster.find("img").attr());

  // 2. Followers
  const followersRes = await fetch(`https://letterboxd.com/${username}/followers/`, { headers });
  const followersHtml = await followersRes.text();
  const $fol = cheerio.load(followersHtml);
  console.log("\n=== FOLLOWERS ENDPOINT ===");
  console.log("Followers count links:", $fol('a[href*="/followers/"]').map((i, el) => $fol(el).text().trim()).get().slice(0, 5));
  console.log("Followers person table rows count:", $fol(".person-table tbody tr, .person-summary, table.person-table tr").length);
  const sampleFollowerRow = $fol("table.person-table tr, .person-table tr").first();
  console.log("Sample follower row text:", sampleFollowerRow.text().replace(/\s+/g, " ").trim());
  console.log("Sample follower name/link:", sampleFollowerRow.find("a.name, .name a, a").map((i, el) => `${$fol(el).attr('href')}: ${$fol(el).text().trim()}`).get().slice(0, 4));

  // 3. Following
  const followingRes = await fetch(`https://letterboxd.com/${username}/following/`, { headers });
  const followingHtml = await followingRes.text();
  const $fing = cheerio.load(followingHtml);
  console.log("\n=== FOLLOWING ENDPOINT ===");
  console.log("Following count links:", $fing('a[href*="/following/"]').map((i, el) => $fing(el).text().trim()).get().slice(0, 5));
  console.log("Following rows count:", $fing(".person-table tr, table.person-table tr").length);
}

testAll("davidehrlich");
