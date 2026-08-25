async function checkEndpoints(username) {
  const paths = [
    `/${username}/`,
    `/${username}`,
    `/${username}/films/`,
    `/${username}/bio/`,
    `/${username}/followers/`,
    `/${username}/following/`,
    `/${username}/rss/`,
    `/${username}/activity/`,
    `/${username}/diary/`,
    `/${username}/likes/`,
    `/${username}/lists/`,
  ];
  for (const path of paths) {
    const url = `https://letterboxd.com${path}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
      },
      redirect: "manual"
    });
    console.log(`${path.padEnd(25)} -> Status: ${res.status} Location: ${res.headers.get("location") || "none"}`);
  }
}

checkEndpoints("davidehrlich");
