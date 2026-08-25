async function testPosterUrl() {
  const url = "https://letterboxd.com/film/dont-say-good-luck/image-150/";
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
    redirect: "manual"
  });
  console.log(`Poster URL status: ${res.status}, Location: ${res.headers.get("location")}`);
}

testPosterUrl();
