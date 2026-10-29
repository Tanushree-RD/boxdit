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

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.08,
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
  // Estimated viewing time (avg 105 mins per film)
  const approxHours = Math.round((totalMovies * 105) / 60);

  // Top genres list
  const topGenres = genreStats?.breakdown?.slice(0, 4) || [];

  // Top actors list
  const topActors = actorStats?.topActors?.slice(0, 4) || [];

  // Decades breakdown
  const decades = releaseYears.decadeBreakdown?.slice(0, 5) || [];

  return (
    <section>
      {/* Section Headline */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-6 sm:mb-8 px-1 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF8000]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#FF8000]">
              Analytical Breakdown
            </span>
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Cinematic Highlights
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Distilled metrics and narrative footprints from your Letterboxd archive
          </p>
        </div>

        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline-block">
          ARCHIVE DOSSIER // 01-06
        </span>
      </motion.div>

      {/* Luxury Bento Grid */}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Chronological Era Odyssey (2 cols on lg) */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-2 rounded-2xl cinema-panel cinema-panel-hover p-7 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                  Era Odyssey
                </span>
                <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                  Release Eras
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                Mean Year: {releaseYears.averageReleaseYear || "—"}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-baseline gap-4">
              <div>
                <span className="text-xs text-zinc-500 font-mono block">Favorite Era</span>
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono">
                  {releaseYears.favoriteDecade?.decade || "2020s"}
                </span>
              </div>
              <span className="text-sm font-mono text-[#00E054] font-semibold">
                {releaseYears.favoriteDecade?.percentage || 0}% of watched cinema
              </span>
            </div>

            {/* Decades Visual Progress Breakdown */}
            <div className="mt-6 space-y-2.5">
              {decades.map((dec) => (
                <div key={dec.decade} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-300 font-medium">{dec.decade}</span>
                    <span className="text-zinc-500">
                      {dec.count} films ({dec.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#FF8000] to-[#FFB049] transition-all duration-500"
                      style={{ width: `${Math.min(dec.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>MOST WATCHED YEAR</span>
            <span className="text-zinc-300 font-semibold">
              {releaseYears.mostWatchedYear ? `${releaseYears.mostWatchedYear.year} (${releaseYears.mostWatchedYear.count} films)` : "Recent years"}
            </span>
          </div>
        </motion.div>

        {/* Card 2: Total Hours in the Dark */}
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-2xl cinema-panel cinema-panel-hover p-7 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                Screen Time Volume
              </span>
              <div className="h-6 w-6 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-zinc-400">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <div className="mt-6">
              <span className="text-xs text-zinc-500 font-mono block">Immersed in Cinema</span>
              <p className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight mt-1">
                {totalMovies.toLocaleString()}
              </p>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Total catalogued titles in archive ({ratings.totalRated.toLocaleString()} with star ratings)
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                Time in the Dark
              </span>
              <p className="text-lg font-bold text-white font-mono mt-0.5">
                ~{approxHours.toLocaleString()} Hours
              </p>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Equivalent to {(approxHours / 24).toFixed(1)} full days of cinema
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.05] text-[11px] font-mono text-zinc-500 flex justify-between">
            <span>ARCHIVE STATUS</span>
            <span className="text-[#00E054]">Active &amp; Growing</span>
          </div>
        </motion.div>

        {/* Card 3: Genre Affinity & Spectrum */}
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-2xl cinema-panel cinema-panel-hover p-7 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                Genre DNA
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                TOP CATEGORIES
              </span>
            </div>

            <div className="mt-6">
              <span className="text-xs text-zinc-500 font-mono block">Primary Predilection</span>
              <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                {genreStats?.favoriteGenre || "Cinema"}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {genreStats?.genreCount || totalMovies} titles categorized
              </p>
            </div>

            {/* Top Genre Pills */}
            <div className="mt-5 space-y-2">
              {topGenres.map((g, idx) => (
                <div key={g.genre} className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-medium">
                    <span className="font-mono text-zinc-600 mr-2">0{idx + 1}</span>
                    {g.genre}
                  </span>
                  <span className="font-mono text-zinc-400">
                    {g.count} films ({g.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.05] flex justify-between text-[11px] font-mono text-zinc-500">
            <span>TASTE ALIGNMENT</span>
            <span className="text-zinc-300">High Concentration</span>
          </div>
        </motion.div>

        {/* Card 4: Cast Affinity (Top Actors) */}
        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-2xl cinema-panel cinema-panel-hover p-7 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                Screen Presence
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                RECURRING CAST
              </span>
            </div>

            <div className="mt-6">
              <span className="text-xs text-zinc-500 font-mono block">Most Watched Performer</span>
              <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                {actorStats?.favoriteActor || "Ensemble Cast"}
              </p>
              <p className="mt-1 text-xs text-zinc-400 font-mono">
                {actorStats?.appearanceCount || 0} appearances across library
              </p>
            </div>

            {/* Recurring actors list */}
            <div className="mt-5 space-y-2">
              {topActors.map((actor, idx) => (
                <div key={actor.name} className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-medium">
                    <span className="font-mono text-zinc-600 mr-2">0{idx + 1}</span>
                    {actor.name}
                  </span>
                  <span className="font-mono text-zinc-400">
                    {actor.count} {actor.count === 1 ? "film" : "films"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.05] flex justify-between text-[11px] font-mono text-zinc-500">
            <span>CAST LOYALTY</span>
            <span className="text-zinc-300">Recognized Frequenters</span>
          </div>
        </motion.div>

        {/* Card 5: Film Nerd Quotient (Nerd Score) */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-2xl cinema-panel cinema-panel-hover p-7 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                Cinephile Quotient
              </span>
              <span className="text-[10px] font-mono text-[#FF8000] font-semibold">
                INDEX 0-100
              </span>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-500 font-mono block">Nerd Score</span>
                <p className="text-4xl sm:text-5xl font-extrabold text-[#FF8000] font-mono tracking-tight mt-1">
                  {nerdScore.score}
                  <span className="text-xl text-zinc-500 font-normal">/100</span>
                </p>
              </div>

              <div className="h-16 w-16 rounded-full border border-[#FF8000]/30 bg-[#FF8000]/[0.08] flex items-center justify-center font-mono font-bold text-sm text-[#FF8000]">
                {nerdScore.percentile || "Top 2%"}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                Rank Designation
              </span>
              <p className="text-base font-bold text-white mt-0.5">
                {nerdScore.label}
              </p>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Calculated by logging volume, era diversity, critical distribution, and arthouse index.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.05] flex justify-between text-[11px] font-mono text-zinc-500">
            <span>COMMUNITY BENCHMARK</span>
            <span className="text-[#FF8000]">Elite Tier</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
