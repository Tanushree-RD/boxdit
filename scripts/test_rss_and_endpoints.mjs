import * as cheerio from "cheerio";

async function inspectRss(username) {
  const res = await fetch(`https://letterboxd.com/${username}/rss/`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  console.log(`RSS Status for ${username}: ${res.status}`);
  const xml = await res.text();
  const $ = cheerio.load(xml, { xmlMode: true });
  console.log(`Channel Title:`, $("channel > title").text());
  console.log(`Channel Link:`, $("channel > link").text());
  console.log(`Channel Description:`, $("channel > description").text());
  console.log(`Items count:`, $("item").length);
  const firstItem = $("item").first();
  if (firstItem.length) {
    console.log(`Sample item title:`, firstItem.find("title").text());
    console.log(`Sample item film title:`, firstItem.find("letterboxd\\:filmTitle, filmTitle").text());
    console.log(`Sample item rating:`, firstItem.find("letterboxd\\:memberRating, memberRating").text());
    console.log(`Sample item watched date:`, firstItem.find("letterboxd\\:watchedDate, watchedDate").text());
  }
}

async function testOtherEndpoints(username) {
  const endpoints = [
    `https://letterboxd.com/${username}/rss/`,
    `https://letterboxd.com/${username}/`,
    `https://letterboxd.com/${username}/films/`,
    `https://letterboxd.com/ajax/letterboxd-metadata/`,
    `https://api.letterboxd.com/`,
  ];
  for (const ep of endpoints) {
    try {
      const res = await fetch(ep, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
        }
      });
      console.log(`Endpoint: ${ep} -> Status: ${res.status} ${res.headers.get("content-type")}`);
    } catch (e) {
      console.log(`Endpoint: ${ep} -> Error: ${e.message}`);
    }
  }
}

async function run() {
  await inspectRss("davidehrlich");
  console.log("------------------------");
  await testOtherEndpoints("davidehrlich");
}

run();
