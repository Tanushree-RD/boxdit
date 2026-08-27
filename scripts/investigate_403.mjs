import * as cheerio from "cheerio";

const targetUsername = "davidehrlich";

const standardHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

const fullBrowserHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: `https://letterboxd.com/${targetUsername}/films/`,
  "Sec-Ch-Ua": '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"Windows"',
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "same-origin",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
};

async function testUrl(label, url, headers) {
  console.log(`\n==================================================`);
  console.log(`TEST: ${label}`);
  console.log(`URL: ${url}`);
  console.log(`--------------------------------------------------`);
  try {
    const res = await fetch(url, { headers, redirect: "follow" });
    console.log(`Status Code: ${res.status} ${res.statusText}`);
    console.log(`Response Headers:`);
    for (const [key, value] of res.headers.entries()) {
      console.log(`  ${key}: ${value}`);
    }
    const text = await res.text();
    console.log(`HTML Length: ${text.length}`);
    console.log(`First 300 characters of HTML:\n${text.slice(0, 300)}`);
    
    // Check if Cloudflare markers are present
    const isCloudflare = res.headers.get("server")?.toLowerCase().includes("cloudflare") || 
                         res.headers.has("cf-ray") || 
                         text.includes("Just a moment...") || 
                         text.includes("Cloudflare");
    console.log(`Cloudflare Detected: ${isCloudflare}`);
    return { status: res.status, headers: Object.fromEntries(res.headers.entries()), text };
  } catch (err) {
    console.error(`Fetch error:`, err);
    return null;
  }
}

async function run() {
  // Test 1: Page 1 with standard scraper headers
  await testUrl(
    "1. Page 1 (/films/) - Standard Scraper Headers",
    `https://letterboxd.com/${targetUsername}/films/`,
    standardHeaders
  );

  // Test 2: Page 2 with standard scraper headers
  await testUrl(
    "2. Page 2 (/films/page/2/) - Standard Scraper Headers",
    `https://letterboxd.com/${targetUsername}/films/page/2/`,
    standardHeaders
  );

  // Test 3: Page 2 with full realistic browser headers & Referer
  await testUrl(
    "3. Page 2 (/films/page/2/) - Full Browser Headers & Referer",
    `https://letterboxd.com/${targetUsername}/films/page/2/`,
    fullBrowserHeaders
  );

  // Test 4: Check if URL without trailing slash or different pattern behaves differently
  await testUrl(
    "4. Page 2 (/films/page/2) - No Trailing Slash",
    `https://letterboxd.com/${targetUsername}/films/page/2`,
    fullBrowserHeaders
  );

  // Test 5: Check session cookies by fetching page 1 first and reusing Set-Cookie on page 2
  console.log(`\n==================================================`);
  console.log(`TEST: 5. Page 1 -> Cookie Jar -> Page 2`);
  console.log(`--------------------------------------------------`);
  const p1Res = await fetch(`https://letterboxd.com/${targetUsername}/films/`, { headers: standardHeaders });
  const rawSetCookie = p1Res.headers.get("set-cookie") || "";
  console.log(`Page 1 Set-Cookie:`, rawSetCookie);
  
  const p2WithCookieRes = await fetch(`https://letterboxd.com/${targetUsername}/films/page/2/`, {
    headers: {
      ...standardHeaders,
      Cookie: rawSetCookie,
      Referer: `https://letterboxd.com/${targetUsername}/films/`,
    },
  });
  console.log(`Page 2 with Page 1 Cookie Status: ${p2WithCookieRes.status} ${p2WithCookieRes.statusText}`);
  const p2Text = await p2WithCookieRes.text();
  console.log(`Page 2 with Cookie first 300 chars:\n${p2Text.slice(0, 300)}`);
}

run();
