import { getFilms, getRSS } from "../lib/scraper.js";

async function testImages() {
  const films = await getFilms("davidehrlich");
  console.log("Films poster sample:", films.films.slice(0, 3));
  const rss = await getRSS("davidehrlich");
  console.log("RSS poster sample:", rss.entries.slice(0, 3).map(e => ({ title: e.filmTitle, poster: e.posterUrl })));
}

testImages();
