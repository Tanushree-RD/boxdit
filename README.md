# Boxdit

Boxdit turns your Letterboxd profile into a clean, shareable report inspired by yearly "wrapped" experiences.

Enter a Letterboxd username and Boxdit analyzes your public profile to generate statistics, viewing habits, recent diary activity, and personalized insights.

Unlike screenshots or manual summaries, Boxdit automatically gathers your public Letterboxd data and presents it in a modern, minimal interface.

## Features

- Public Letterboxd profile lookup
- Movies watched
- Followers & following
- Personalized viewing insights
- Genre and actor analysis
- Recent diary entries
- Responsive dark interface
- Shareable report page

## How it works

Letterboxd does not provide a public API for profile analytics.

Boxdit uses a multi-endpoint scraper that collects publicly available data from:

- Films
- Followers
- Following
- RSS feed

The collected data is merged into a unified profile before generating statistics and visualizations.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- React
- Cheerio
- Framer Motion

## Running locally

```bash
git clone https://github.com/<your-username>/boxdit.git

cd boxdit

npm install

npm run dev
```

Visit:

```
http://localhost:3000
```

## Roadmap

- [x] Public profile lookup
- [x] Real-time analytics
- [x] Recent diary section
- [x] Responsive UI
- [x] Shareable wrapped cards
- [ ] Year-specific reports
- [ ] Movie recommendations
- [ ] Compare two Letterboxd profiles

## Disclaimer

Boxdit is an independent project and is not affiliated with or endorsed by Letterboxd. All data shown is sourced from publicly available user pages.

## License

MIT
