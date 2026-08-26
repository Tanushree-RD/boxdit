import { getFilms } from "../lib/scraper.ts";

async function main() {
  const username = process.argv[2] || "davidehrlich";
  console.log(`\n========================================`);
  console.log(`  Testing Full Catalogue Scraper for @${username}`);
  console.log(`========================================\n`);

  const startTime = Date.now();
  const result = await getFilms(username);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`\n========================================`);
  console.log(`  Scraper Finished Successfully!`);
  console.log(`========================================`);
  console.log(`  User:            @${result.username} (${result.displayName})`);
  console.log(`  Total Unique:    ${result.films.length} films`);
  console.log(`  Time Elapsed:    ${elapsed}s`);
  console.log(`  Avatar URL:      ${result.avatar ? result.avatar.slice(0, 60) + "..." : "none"}`);
  console.log();

  console.log("  First 3 films:");
  result.films.slice(0, 3).forEach((f, i) => {
    console.log(`    ${i + 1}. ${f.name} (${f.year ?? "??"}) [${f.slug}]`);
  });

  console.log();
  console.log("  Sample middle/last films:");
  result.films.slice(-3).forEach((f, i) => {
    console.log(`    ${result.films.length - 2 + i}. ${f.name} (${f.year ?? "??"}) [${f.slug}]`);
  });

  console.log(`\nFinal verified movie count: ${result.films.length}`);
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
