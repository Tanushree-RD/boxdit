"use client";

import { motion } from "framer-motion";
import {
  ActorStatsResult,
  FilmNerdScore,
  GenreStatsResult,
  RatingStatsResult,
  ReleaseYearStatsResult,
} from "@/lib/analytics";

interface StatsSectionProps {
  totalMovies: number;
  ratings: RatingStatsResult;
  releaseYears: ReleaseYearStatsResult;
  nerdScore: FilmNerdScore;
  genreStats?: GenreStatsResult;
  actorStats?: ActorStatsResult;
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

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.05,
    },
  }),
};

export function StatsSection({
  totalMovies,
  ratings,
  releaseYears,
  nerdScore,
  genreStats,
  actorStats,
}: StatsSectionProps) {
  const avgRatingText =
    ratings.averageRating !== null && ratings.totalRated > 0
      ? `${ratings.averageRating.toFixed(2)} ★`
      : "Not enough data";

  const favoriteDecadeText = releaseYears.favoriteDecade
    ? releaseYears.favoriteDecade.decade
    : "Not enough data";

  const decadePercentageText = releaseYears.favoriteDecade
    ? `${releaseYears.favoriteDecade.percentage}% of watched films`
    : "No release years recorded";

  const favoriteGenreText = genreStats?.favoriteGenre || "Not enough data";
  const genreSubtext = genreStats?.favoriteGenre
    ? `${genreStats.genreCount} films in library`
    : "No genre data available";

  const favoriteActorText = actorStats?.favoriteActor || "Not enough data";
  const actorSubtext = actorStats?.favoriteActor
    ? `${actorStats.appearanceCount} appearances in watched films`
    : "No cast data available";

  const cards = [
    {
      label: "Movies Watched",
      value: formatCount(totalMovies),
      subtext: "Total logged film library",
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
        </svg>
      ),
      textColor: "text-white",
    },
    {
      label: "Average Rating",
      value: avgRatingText,
      subtext:
        ratings.totalRated > 0
          ? `Across ${ratings.totalRated} rated films`
          : "No user ratings logged",
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
      textColor: "text-white",
    },
    {
      label: "Favorite Genre",
      value: favoriteGenreText,
      subtext: genreSubtext,
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      textColor: "text-white",
    },
    {
      label: "Favorite Decade",
      value: favoriteDecadeText,
      subtext: decadePercentageText,
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      textColor: "text-white",
    },
    {
      label: "Film Nerd Score",
      value: `${nerdScore.score}/100`,
      subtext: nerdScore.percentile,
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      textColor: "text-white",
      badge: nerdScore.label,
    },
    {
      label: "Favorite Actor",
      value: favoriteActorText,
      subtext: actorSubtext,
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      textColor: "text-white",
    },
  ];

  return (
    <section className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between px-1"
      >
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
            Cinematic Highlights
          </h2>
          <p className="mt-1 text-[13px] text-zinc-500">
            Core stats distilled from your Letterboxd archive
          </p>
        </div>
        <span className="hidden sm:inline-flex rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-0.5 text-[11px] text-zinc-500 font-mono">
          6 key metrics
        </span>
      </motion.div>

      <div className="grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            variants={fadeUp}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ y: -1, transition: { duration: 0.2 } }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5 sm:p-6 transition-colors duration-200 hover:border-white/[0.12] hover:bg-white/[0.025]"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                  {card.label}
                </span>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-1.5 text-zinc-500 transition-colors duration-200 group-hover:text-zinc-300">
                  {card.icon}
                </div>
              </div>

              <div className="mt-4">
                <p
                  title={card.value}
                  className={`text-2xl sm:text-3xl font-bold tracking-tight ${card.textColor} truncate`}
                >
                  {card.value}
                </p>
                <p
                  title={card.subtext}
                  className="mt-1.5 text-[12px] text-zinc-500 leading-relaxed truncate font-normal"
                >
                  {card.subtext}
                </p>
              </div>
            </div>

            {card.badge && (
              <div className="mt-4 pt-3 border-t border-white/[0.05]">
                <span className="inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-zinc-400">
                  {card.badge}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
