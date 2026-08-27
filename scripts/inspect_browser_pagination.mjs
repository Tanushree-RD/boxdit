import puppeteerExtra from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import * as cheerio from "cheerio";

puppeteerExtra.use(stealthPlugin());

async function inspectWithBrowser() {
  console.log("Launching stealth browser to inspect Letterboxd pagination & network traffic...");
  const browser = await puppeteerExtra.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  try {
    const page = await browser.newPage();
    
    // Log all network requests
    const networkRequests = [];
    page.on("request", (req) => {
      if (req.resourceType() === "document" || req.resourceType() === "xhr" || req.resourceType() === "fetch") {
        networkRequests.push({
          url: req.url(),
          method: req.method(),
          headers: req.headers(),
        });
      }
    });

    page.on("response", async (res) => {
      const url = res.url();
      if (url.includes("/films")) {
        console.log(`[Browser Network Response] ${res.status()} ${url}`);
      }
    });

    console.log("\nNavigating to https://letterboxd.com/davidehrlich/films/ ...");
    await page.goto("https://letterboxd.com/davidehrlich/films/", { waitUntil: "networkidle2" });

    const html1 = await page.content();
    const $1 = cheerio.load(html1);

    console.log("\n--- Inspecting Pagination Links on Page 1 DOM ---");
    const paginateLinks = [];
    $1(".paginate-pages a, .pagination a, a.next, a.paginate-next").each((_, el) => {
      paginateLinks.push({
        text: $1(el).text().trim(),
        href: $1(el).attr("href"),
        class: $1(el).attr("class"),
      });
    });
    console.log("Pagination links found in DOM:", JSON.stringify(paginateLinks, null, 2));

    const nextLink = $1("a.next, .paginate-nextprev a.next").attr("href");
    console.log("Next page href from DOM:", nextLink);

    console.log("\n--- Checking Cookies acquired by browser on Page 1 ---");
    const cookies = await page.cookies();
    console.log("Browser Cookies on Page 1:", cookies.map(c => ({ name: c.name, domain: c.domain, httpOnly: c.httpOnly, secure: c.secure })));

    console.log("\n--- Attempting browser navigation to Page 2 (/davidehrlich/films/page/2/) ---");
    const page2Res = await page.goto("https://letterboxd.com/davidehrlich/films/page/2/", { waitUntil: "networkidle2" });
    console.log(`Page 2 Navigation Response Status: ${page2Res?.status()}`);
    
    const page2Content = await page.content();
    const $2 = cheerio.load(page2Content);
    const page2Title = $2("title").text();
    const page2FilmsCount = $2(".react-component[data-component-class='LazyPoster'], div[data-item-name]").length;
    console.log(`Page 2 Title: ${page2Title}`);
    console.log(`Page 2 Film Posters found: ${page2FilmsCount}`);

    console.log("\n--- Testing in-page fetch() from within browser session vs external fetch ---");
    const inPageFetchResult = await page.evaluate(async () => {
      const res = await fetch("/davidehrlich/films/page/3/");
      const text = await res.text();
      return {
        status: res.status,
        textSample: text.slice(0, 200),
        ok: res.ok,
      };
    });
    console.log("In-page evaluate fetch(/films/page/3/) result:", inPageFetchResult);

  } finally {
    await browser.close();
  }
}

inspectWithBrowser().catch(console.error);
