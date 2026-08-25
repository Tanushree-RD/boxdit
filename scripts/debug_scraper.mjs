async function testFetch(title, url, options = {}) {
  console.log(`\n==================================================`);
  console.log(`TEST: ${title}`);
  console.log(`URL: ${url}`);
  console.log(`Options:`, JSON.stringify(options, null, 2));
  console.log(`--------------------------------------------------`);
  try {
    const res = await fetch(url, options);
    console.log(`Status Code: ${res.status} ${res.statusText}`);
    console.log(`Response Headers:`);
    for (const [key, value] of res.headers.entries()) {
      console.log(`  ${key}: ${value}`);
    }
    const text = await res.text();
    console.log(`HTML Length: ${text.length}`);
    console.log(`First 500 characters of HTML:`);
    console.log(text.slice(0, 500));
    console.log(`--------------------------------------------------`);
    return { status: res.status, headers: Object.fromEntries(res.headers.entries()), text };
  } catch (err) {
    console.error(`Fetch error:`, err);
    return null;
  }
}

async function run() {
  const targetUsername = "davidehrlich"; // popular active profile or test username

  // Test 1: Plain fetch (no headers)
  await testFetch("1. Plain Fetch (No custom headers)", `https://letterboxd.com/${targetUsername}/`);

  // Test 2: Fetch with standard scraper headers from scraper.ts
  await testFetch(
    "2. Fetch with scraper.ts headers",
    `https://letterboxd.com/${targetUsername}/`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    }
  );

  // Test 3: Realistic full browser headers (including Referer, sec-ch-ua, etc.)
  await testFetch(
    "3. Full Realistic Browser Headers (Sec-Fetch, Referer, sec-ch-ua, etc.)",
    `https://letterboxd.com/${targetUsername}/`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.google.com/",
        "Sec-Ch-Ua": '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
      },
    }
  );

  // Test 4: Letterboxd RSS Feed
  await testFetch(
    "4. Letterboxd RSS Feed",
    `https://letterboxd.com/${targetUsername}/rss/`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    }
  );
}

run();
