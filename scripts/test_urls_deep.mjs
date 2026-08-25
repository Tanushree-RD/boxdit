import * as cheerio from "cheerio";

async function checkUrl(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });
  console.log(`\nURL: ${url}`);
  console.log(`Status: ${res.status}`);
  const text = await res.text();
  console.log(`Length: ${text.length}`);
  const $ = cheerio.load(text);
  console.log(`Title tag:`, $("title").text());
  console.log(`og:title:`, $('meta[property="og:title"]').attr("content"));
  console.log(`og:image:`, $('meta[property="og:image"]').attr("content"));
  console.log(`Avatar img src:`, $(".avatar img, .profile-avatar img").attr("src"));
  console.log(`Bio text:`, $(".bio, .person-summary__bio, [data-testid='profile-bio']").text().trim());
  console.log(`Followers link text:`, $('a[href*="/followers/"]').text().trim());
  console.log(`Following link text:`, $('a[href*="/following/"]').text().trim());
}

async function run() {
  const users = ["davidehrlich", "matthew", "karsten"];
  for (const u of users) {
    await checkUrl(`https://letterboxd.com/${u}/`);
    await checkUrl(`https://letterboxd.com/${u}/films/`);
  }
}

run();
