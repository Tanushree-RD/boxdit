import { FilmNerdScore, RatingStatsResult, ReleaseYearStatsResult } from "@/lib/analytics";

interface StatsSectionProps {
  totalMovies: number;
  ratings: RatingStatsResult;
  releaseYears: ReleaseYearStatsResult;
  nerdScore: FilmNerdScore;
  favoriteGenre?: string;
  favoriteDirector?: string;
}

function formatCount(value: number): string {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (value >= 1_000) {
    return new Intl.NumberFormat("en-US").format(value);
  }
  return value.toString();
}

export function StatsSection({
  totalMovies,
  ratings,
  releaseYears,
  nerdScore,
  favoriteGenre = "Drama & Sci-Fi",
  favoriteDirector = "Denis Villeneuve",
}: StatsSectionProps) {
  const avgRatingText = ratings.averageRating
    ? `${ratings.averageRating.toFixed(2)} ★`
    : "3.85 ★";

  const favoriteDecadeText = releaseYears.favoriteDecade
    ? releaseYears.favoriteDecade.decade
    : "2020s";

  const decadePercentageText = releaseYears.favoriteDecade
    ? `${releaseYears.favoriteDecade.percentage}% of all watched`
    : "Core viewing era";

  const cards = [
    {
      label: "Movies Watched",
      value: formatCount(totalMovies),
      subtext: "Total logged film library",
      icon: "🎬",
      gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
      accentBorder: "group-hover:border-amber-500/40",
      accentText: "text-amber-300",
    },
    {
      label: "Average Rating",
      value: avgRatingText,
      subtext: ratings.totalRated > 0 ? `Across ${ratings.totalRated} rated films` : "Letterboxd weighted score",
      icon: "⭐",
      gradient: "from-amber-400/10 via-yellow-500/5 to-transparent",
      accentBorder: "group-hover:border-yellow-400/40",
      accentText: "text-yellow-300",
    },
    {
      label: "Favorite Decade",
      value: favoriteDecadeText,
      subtext: decadePercentageText,
      icon: "🎞",
      gradient: "from-indigo-500/10 via-purple-500/5 to-transparent",
      accentBorder: "group-hover:border-indigo-400/40",
      accentText: "text-indigo-300",
    },
    {
      label: "Favorite Genre",
      value: favoriteGenre,
      subtext: "Most recurring thematic focus",
      icon: "🎭",
      gradient: "from-rose-500/10 via-pink-500/5 to-transparent",
      accentBorder: "group-hover:border-rose-400/40",
      accentText: "text-rose-300",
    },
    {
      label: "Favorite Director",
      value: favoriteDirector,
      subtext: "Top recurring auteur signature",
      icon: "🍿",
      gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
      accentBorder: "group-hover:border-emerald-400/40",
      accentText: "text-emerald-300",
    },
    {
      label: "Film Nerd Score",
      value: `${nerdScore.score}/100`,
      subtext: nerdScore.percentile,
      icon: "📈",
      gradient: "from-amber-500/15 via-orange-500/5 to-transparent",
      accentBorder: "group-hover:border-amber-400/50",
      accentText: "text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100",
      badge: nerdScore.label,
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300/90">
            Cinematic Highlights
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Core stats distilled from your Letterboxd archive
          </p>
        </div>
        <span className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">
          6 key metrics
        </span>
      </div>

      <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b ${card.gradient} p-6 sm:p-7 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] ${card.accentBorder}`}
          >
            {/* Ambient inner glow */}
            <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/5 blur-xl group-hover:bg-white/10 transition-colors" />

            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                {card.label}
              </span>
              <span className="text-2xl">{card.icon}</span>
            </div>

            <div className="mt-4">
              <p className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${card.accentText} truncate`}>
                {card.value}
              </p>
              <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed truncate">
                {card.subtext}
              </p>
            </div>

            {card.badge && (
              <div className="mt-4 inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-[11px] font-semibold text-amber-300">
                {card.badge}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
