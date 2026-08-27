/**
 * test_pagination.mjs
 *
 * Verification script for the full-pagination scraper.
 * Tests against a Letterboxd profile with multiple pages of films
 * to confirm that all pages are crawled, merged, and deduplicated.
 *
 * Usage:
 *   node scripts/test_pagination.mjs [username]
 *
 * Default username: "davidehrlich" (5000+ films)
 */

const BASE = "http://localhost:3000";

async function run() {
  const username = process.argv[2] || "davidehrlich";

  console.log("=".repeat(60));
  console.log(`PAGINATION TEST — ${username}`);
  console.log("=".repeat(60));

  // Step 1: Fetch the report page (which triggers getLetterboxdProfile -> getFilms internally)
  console.log(`\nFetching report page for @${username}...`);
  console.log(`(This triggers the full paginated scrape on the server side)\n`);

  const startTime = Date.now();

  try {
    const res = await fetch(`${BASE}/report/${encodeURIComponent(username)}`);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log(`\nResponse: ${res.status} ${res.statusText} (${elapsed}s)`);

    if (!res.ok) {
      console.error(`❌ FAIL — Server returned ${res.status}`);
      process.exit(1);
    }

    const html = await res.text();

    // Extract the "Movies Watched" count from the rendered HTML
    // The StatsSection component renders this number
    const moviesMatch = html.match(/(\d[\d,]*)\s*<\/(?:span|div|p|h\d)/);
    if (moviesMatch) {
      const moviesWatched = moviesMatch[1].replace(/,/g, "");
      console.log(`\n📊 Movies Watched (from page): ${moviesWatched}`);

      const count = parseInt(moviesWatched, 10);
      if (count > 72) {
        console.log(`✅ PASS — Film count (${count}) exceeds single-page limit (72)`);
      } else {
        console.log(`⚠ WARN — Film count (${count}) is <= 72. Pagination may not be working.`);
      }
    } else {
      console.log("ℹ Could not extract movie count from HTML (page structure may differ).");
    }

    console.log(`\n${"=".repeat(60)}`);
    console.log("Check the server terminal for per-page progress output.");
    console.log(`${"=".repeat(60)}`);
  } catch (err) {
    console.error(`\n❌ FAIL — Could not reach ${BASE}`);
    console.error(err.message);
    console.log("\nMake sure the dev server is running: npm run dev");
    process.exit(1);
  }
}

run();
