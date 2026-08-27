import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import type { Browser, Page } from "puppeteer";

puppeteer.use(StealthPlugin());

async function testLaunch() {
  const browser: Browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });
  console.log("Browser launched successfully!");
  const page: Page = await browser.newPage();
  await page.goto("https://example.com");
  console.log("Page title:", await page.title());
  await browser.close();
}

testLaunch().catch(console.error);
