import * as cheerio from "cheerio";

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

async function testFilmItems() {
  const filmsRes = await fetch("https://letterboxd.com/davidehrlich/films/", { headers });
  const filmsHtml = await filmsRes.text();
  const $ = cheerio.load(filmsHtml);

  console.log("=== Film Items Inspection ===");
  $("ul.poster-list li, .poster-list .poster-container, li.poster-container").slice(0, 5).each((i, el) => {
    console.log(`\nItem ${i}:`);
    console.log("li html:", $(el).html()?.replace(/\s+/g, " ").trim());
    console.log("data-film-slug:", $(el).find("[data-film-slug]").attr("data-film-slug") || $(el).attr("data-film-slug"));
    console.log("data-film-name:", $(el).find("[data-film-name]").attr("data-film-name") || $(el).find("img").attr("alt"));
    console.log("data-film-release-year:", $(el).find("[data-film-release-year]").attr("data-film-release-year"));
    console.log("data-target-link:", $(el).find("[data-target-link]").attr("data-target-link") || $(el).find("a").attr("href"));
    console.log("rating / view details:", $(el).find(".rating, .poster-viewingdata").text().trim());
  });

  console.log("\nPagination & Total Counts:");
  console.log("paginate:", $(".paginate-pages, .pagination, .paginate-summary").text().replace(/\s+/g, " ").trim());
  console.log("ui-block-heading / title:", $(".ui-block-heading, .section-heading, h1, h2").map((i, el) => $(el).text().replace(/\s+/g, " ").trim()).get());
}

testFilmItems();
