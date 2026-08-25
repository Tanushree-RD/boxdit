import * as cheerio from "cheerio";

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

async function testStructure() {
  const folRes = await fetch("https://letterboxd.com/davidehrlich/followers/", { headers });
  const folHtml = await folRes.text();
  const $fol = cheerio.load(folHtml);
  console.log("Follower table HTML sample:\n", $fol("table.person-table, .person-summary, .table-person").html()?.slice(0, 800));

  const filmsRes = await fetch("https://letterboxd.com/davidehrlich/films/", { headers });
  const filmsHtml = await filmsRes.text();
  const $f = cheerio.load(filmsHtml);
  console.log("\nFilm poster HTML sample:\n", $f(".poster-container, .film-poster").first().parent().html()?.slice(0, 800));

  console.log("\nNav section in films HTML:\n", $f("nav, .navitems, .profile-stats, .section-heading, .contextual-title, .title-1").map((i, el) => $f(el).text().replace(/\s+/g, " ").trim()).get().slice(0, 10));

  console.log("\nTotal films count header:", $f(".section-heading, .sub-heading, .title-3, .title-2, .ui-block-heading, .paginate-summary").map((i, el) => $f(el).text().replace(/\s+/g, " ").trim()).get());
}

testStructure();
