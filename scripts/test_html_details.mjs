import * as cheerio from "cheerio";

async function inspectHtmlContent(username) {
  const url = `https://letterboxd.com/${username}/films/`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    }
  });
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log("=== Inspected from /films/ HTML ===");
  console.log("Display Name in header / title:", $("h1.title-1, .contextual-title, title").map((i, el) => $(el).text().trim()).get());
  console.log("Person summary:", $(".person-summary").html() ? "Found" : "Not found");
  console.log("Nav stats / counts:", $(".profile-stats, .stats, .statistic, .navitem").map((i, el) => $(el).text().replace(/\s+/g, " ").trim()).get());
  console.log("All links with numbers or stats:", $('a').filter((i, el) => /\d/.test($(el).text())).map((i, el) => `${$(el).attr('href')} -> ${$(el).text().trim()}`).get().slice(0, 15));
  console.log("Meta tags:", $('meta').map((i, el) => `${$(el).attr('name') || $(el).attr('property')}: ${$(el).attr('content')}`).get().slice(0, 15));
}

inspectHtmlContent("davidehrlich");
