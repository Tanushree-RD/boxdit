import * as cheerio from "cheerio";

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

async function testFilmStructure() {
  const filmsRes = await fetch("https://letterboxd.com/davidehrlich/films/", { headers });
  const filmsHtml = await filmsRes.text();
  const $ = cheerio.load(filmsHtml);

  console.log("=== First 3 film poster elements ===");
  $(".film-poster").slice(0, 3).each((i, el) => {
    console.log(`Poster ${i}:`);
    console.log("Attributes:", $(el).attr());
    console.log("Parent tag & attrs:", $(el).parent().prop("tagName"), $(el).parent().attr());
    console.log("Children:", $(el).children().map((ci, cel) => `${$(cel).prop("tagName")} class="${$(cel).attr("class")}" alt="${$(cel).attr("alt")}" src="${$(cel).attr("src")}"`).get());
    console.log("Next siblings:", $(el).nextAll().map((si, sel) => `${$(sel).prop("tagName")} class="${$(sel).attr("class")}" text="${$(sel).text().trim()}"`).get());
  });

  console.log("\nProfile / User Header in /films/:");
  console.log("Header avatar img:", $("#header .avatar img, .profile-avatar img, a.avatar img").map((i, el) => $(el).attr("src")).get());
  console.log("Title tag:", $("title").text());
}

testFilmStructure();
