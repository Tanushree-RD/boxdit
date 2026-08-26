import { getMovieDetails } from "../lib/movie.ts";

async function main() {
  console.log("Fetching movie metadata for 'parasite-2019'...\n");
  const movie = await getMovieDetails("parasite-2019");
  console.log("Result:");
  console.log(JSON.stringify(movie, null, 2));

  console.log("\nTesting 404 handling with 'non-existent-movie-slug-xyz-12345'...");
  const notFound = await getMovieDetails("non-existent-movie-slug-xyz-12345");
  console.log("Result for 404:", notFound);
}

main().catch(console.error);
