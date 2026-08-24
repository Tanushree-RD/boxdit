import * as cheerio from "cheerio";

export type ProfileData = {
  displayName: string;
  username: string;
  avatar: string | null;
  bio: string | null;
  followers: number;
  following: number;
};

export class ProfileNotFoundError extends Error {
  constructor(username: string) {
    super(`Letterboxd profile for "${username}" was not found.`);
    this.name = "ProfileNotFoundError";
  }
}

export class ProfileFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProfileFetchError";
  }
}

export class ProfileParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProfileParseError";
  }
}

function normalizeText(value: string | null | undefined): string {
  return value?.replace(/\s+/g, " ").trim() ?? "";
}

function normalizeUsername(username: string): string {
  return normalizeText(username).replace(/^@/, "").replace(/\/+$/, "");
}

function parseCount(value: string | null | undefined): number {
  const raw = normalizeText(value).replace(/,/g, "");
  const match = raw.match(/\d+(?:\.\d+)?/);

  if (!match) {
    return 0;
  }

  return Number.parseInt(match[0], 10) || 0;
}

function safeGetFirstText($: cheerio.CheerioAPI, selectors: string[]): string {
  for (const selector of selectors) {
    const value = normalizeText($(selector).first().text());
    if (value) {
      return value;
    }
  }

  return "";
}

export async function getProfile(username: string): Promise<ProfileData> {
  const safeUsername = normalizeUsername(username);

  if (!safeUsername) {
    throw new Error("A valid Letterboxd username is required.");
  }

  const url = new URL(`https://letterboxd.com/${encodeURIComponent(safeUsername)}/`);

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
      cache: "no-store",
    });
  } catch {
    throw new ProfileFetchError(
      `Failed to fetch the Letterboxd profile for "${safeUsername}".`,
    );
  }

  if (response.status === 404 || response.status === 410) {
    throw new ProfileNotFoundError(safeUsername);
  }

  if (!response.ok) {
    throw new ProfileFetchError(
      `Letterboxd returned an unexpected status code (${response.status}) for "${safeUsername}".`,
    );
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  const textContent = normalizeText($("body").text());

  if (
    /this page doesn['’]t exist|page not found|we couldn['’]t find that page|profile not found/i.test(
      textContent,
    )
  ) {
    throw new ProfileNotFoundError(safeUsername);
  }

  const ogTitle = normalizeText($('meta[property="og:title"]').attr("content"));
  const displayName =
    normalizeText(
      ogTitle.replace(/\s*[-–]\s*Letterboxd\s*$/i, "") ||
        safeGetFirstText($, [
          "h1.person-summary__name",
          "h1",
          ".person-summary__name",
          ".profile-name",
          ".name",
        ]),
    ) || safeUsername;

  const profileUsername =
    normalizeUsername(
      $('meta[property="og:url"]').attr("content")?.split("/").filter(Boolean).at(-2) ??
        safeUsername,
    ) || safeUsername;

  const avatar =
    $('meta[property="og:image"]').attr("content") ||
    $('img').first().attr("src") ||
    null;

  const bio = (() => {
    const candidates = [
      ".person-summary__bio",
      ".profile-bio",
      ".bio",
      '[data-testid="profile-bio"]',
      ".person-summary__description",
    ];

    const bioText = safeGetFirstText($, candidates);
    if (bioText && !/uses Letterboxd to share film reviews and lists/i.test(bioText)) {
      return bioText;
    }

    return null;
  })();

  const followers = parseCount(
    $('a[href*="/followers/"]')
      .first()
      .text() ||
      $('a[href$="/followers/"]')
        .first()
        .text() ||
      $('a[href*="followers"]')
        .first()
        .text(),
  );

  const following = parseCount(
    $('a[href*="/following/"]')
      .first()
      .text() ||
      $('a[href$="/following/"]')
        .first()
        .text() ||
      $('a[href*="following"]')
        .first()
        .text(),
  );

  if (!displayName || !profileUsername) {
    throw new ProfileParseError(
      `Could not parse the Letterboxd profile for "${safeUsername}".`,
    );
  }

  return {
    displayName,
    username: profileUsername,
    avatar,
    bio,
    followers,
    following,
  };
}
