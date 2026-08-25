async function testLocalRoute() {
  try {
    const res = await fetch("http://localhost:3000/report/davidehrlich");
    console.log(`Local route status: ${res.status}`);
    const html = await res.text();
    console.log(`HTML length: ${html.length}`);
    console.log(`Contains davidehrlich:`, html.includes("davidehrlich"));
    console.log(`Contains Movies Watched:`, html.includes("Movies Watched"));
    console.log(`Contains Recent Films:`, html.includes("Recent Films"));
    console.log(`Contains Recent Diary:`, html.includes("Recent Diary"));
    console.log(`Contains Follower count / stat:`, html.includes("Followers"));
  } catch (err) {
    console.error("Local route error:", err.message);
  }
}

testLocalRoute();
