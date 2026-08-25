import * as cheerio from "cheerio";

async function checkSubpathHtml(subpath) {
  const url = `https://letterboxd.com/davidehrlich/${subpath}/`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    }
  });
  console.log(`\n=== Subpath: /${subpath}/ (Status: ${res.status}) ===`);
  const html = await res.text();
  const $ = cheerio.load(html);
  console.log("Title:", $("title").text());
  console.log("H1 / Header text:", $("h1").text().trim());
  console.log("Profile stats / counts:", $(".profile-stats, .stats, .person-summary, .navigation, .navitems, .sub-nav").text().replace(/\s+/g, " ").trim().slice(0, 300));
  console.log("Follower count / links:", $('a[href*="/followers/"]').map((i, el) => $(el).text().trim()).get());
  console.log("Following count / links:", $('a[href*="/following/"]').map((i, el) => $(el).text().trim()).get());
  console.log("Avatar:", $("img.avatar, .avatar img, .profile-avatar img, meta[property='og:image']").map((i, el) => $(el).attr("src") || $(el).attr("content")).get());
}

async function run() {
  await checkSubpathHtml("followers");
  await checkSubpathHtml("following");
}

run();
