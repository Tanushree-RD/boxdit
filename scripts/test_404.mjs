async function test404() {
  const badUser = "nonexistentuser_xyz_123987";
  const urls = [
    `https://letterboxd.com/${badUser}/`,
    `https://letterboxd.com/${badUser}/rss/`,
    `https://letterboxd.com/${badUser}/films/`,
  ];
  for (const url of urls) {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
      },
    });
    console.log(`URL: ${url} -> Status: ${res.status}`);
  }
}

test404();
