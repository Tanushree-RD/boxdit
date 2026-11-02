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
  const approxHours = Math.round((totalMovies * 105) / 60);
  const topGenres = genreStats?.breakdown?.slice(0, 4) || [];
  const topActors = actorStats?.topActors?.slice(0, 4) || [];
  const decades = releaseYears.decadeBreakdown?.slice(0, 5) || [];

  return (
    <section>
      {/* Section Headline */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-14 flex flex-wrap items-baseline justify-between gap-4 border-b border-white/[0.08] pb-8"
      >
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 block mb-2 font-normal">
            HIGHLIGHTS // ANALYTICAL PLATES
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-light tracking-tight text-white">
            Cinematic Highlights
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-sans font-normal">
            Distilled metrics and narrative footprints from the archive
          </p>
        </div>

        <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest hidden sm:inline-block font-normal">
          Plates 01-05
        </span>
      </motion.div>

      {/* Grid of Typographic Plates */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Plate 1: Era Odyssey (2 cols on lg) */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-2 border-t border-b border-white/[0.08] py-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-baseline justify-between font-mono text-[9px] text-neutral-500 uppercase tracking-[0.28em] pb-6 border-b border-white/[0.06] font-normal">
              <span>PLATE 01 / ERA ODYSSEY</span>
              <span>Mean Year: {releaseYears.averageReleaseYear || "—"}</span>
            </div>

            <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block font-normal">
                  Dominant Era
                </span>
                <span className="font-display font-light text-4xl sm:text-5xl text-white mt-1 block">
                  {releaseYears.favoriteDecade?.decade || "2020s"}
                </span>
              </div>
              <span className="font-mono text-xs text-neutral-400 font-normal">
                {releaseYears.favoriteDecade?.percentage || 0}% of watched cinema
              </span>
            </div>

            {/* Decades Visual Breakdown */}
            <div className="mt-10 space-y-4">
              {decades.map((dec) => (
                <div key={dec.decade} className="space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-xs font-normal">
                    <span className="text-neutral-300">{dec.decade}</span>
                    <span className="text-neutral-500">
                      {dec.count} films ({dec.percentage}%)
                    </span>
                  </div>
                  <div className="h-0.5 w-full bg-white/[0.06]">
                    <div
                      className="h-full bg-neutral-400 transition-all duration-500"
                      style={{ width: `${Math.min(dec.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-[9px] text-neutral-500 uppercase tracking-[0.24em] font-normal">
            <span>Peak Release Year</span>
            <span className="text-neutral-300">
              {releaseYears.mostWatchedYear ? `${releaseYears.mostWatchedYear.year} (${releaseYears.mostWatchedYear.count} films)` : "Recent years"}
            </span>
          </div>
        </motion.div>

        {/* Plate 2: Screen Time Volume */}
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-b border-white/[0.08] py-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-baseline justify-between font-mono text-[9px] text-neutral-500 uppercase tracking-[0.28em] pb-6 border-b border-white/[0.06] font-normal">
              <span>PLATE 02 / VOLUME</span>
              <span>Screen Time</span>
            </div>

            <div className="mt-8">
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block font-normal">
                Titles Catalogued
              </span>
              <p className="font-display font-light text-5xl sm:text-6xl text-white mt-1">
                {totalMovies.toLocaleString()}
              </p>
              <p className="mt-3 font-sans font-normal text-xs text-neutral-400 leading-relaxed">
                Across total library ({ratings.totalRated.toLocaleString()} with star ratings)
              </p>
            </div>

            <div className="mt-10 border-t border-b border-white/[0.06] py-5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 block font-normal">
                Immersion In The Dark
              </span>
              <p className="font-display font-light text-2xl text-white mt-1">
                ~{approxHours.toLocaleString()} Hours
              </p>
              <p className="font-mono text-[10px] text-neutral-500 mt-1 font-normal">
                Equivalent to {(approxHours / 24).toFixed(1)} full days of cinema
              </p>
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-white/[0.06] font-mono text-[9px] text-neutral-500 uppercase tracking-[0.24em] flex justify-between font-normal">
            <span>Ledger</span>
            <span className="text-neutral-300">Active</span>
          </div>
        </motion.div>

        {/* Plate 3: Genre Predilection */}
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-b border-white/[0.08] py-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-baseline justify-between font-mono text-[9px] text-neutral-500 uppercase tracking-[0.28em] pb-6 border-b border-white/[0.06] font-normal">
              <span>PLATE 03 / GENRES</span>
              <span>Matrix</span>
            </div>

            <div className="mt-8">
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block font-normal">
                Primary Predilection
              </span>
              <p className="font-display italic font-light text-3xl sm:text-4xl text-white mt-1">
                {genreStats?.favoriteGenre || "Cinema"}
              </p>
              <p className="mt-2 font-mono text-xs text-neutral-500 font-normal">
                {genreStats?.genreCount || totalMovies} titles categorized
              </p>
            </div>

            {/* Top Genre Rows */}
            <div className="mt-8 space-y-3">
              {topGenres.map((g, idx) => (
                <div key={g.genre} className="flex items-baseline justify-between font-mono text-xs pb-2 border-b border-white/[0.04] font-normal">
                  <span className="text-neutral-300">
                    <span className="text-neutral-600 mr-2">0{idx + 1}</span>
                    {g.genre}
                  </span>
                  <span className="text-neutral-500">
                    {g.count} films ({g.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-white/[0.06] flex justify-between font-mono text-[9px] text-neutral-500 uppercase tracking-[0.24em] font-normal">
            <span>Congruence</span>
            <span className="text-neutral-300">High Concentration</span>
          </div>
        </motion.div>

        {/* Plate 4: Screen Presence */}
        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-b border-white/[0.08] py-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-baseline justify-between font-mono text-[9px] text-neutral-500 uppercase tracking-[0.28em] pb-6 border-b border-white/[0.06] font-normal">
              <span>PLATE 04 / CAST</span>
              <span>Presence</span>
            </div>

            <div className="mt-8">
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block font-normal">
                Most Watched Performer
              </span>
              <p className="font-display italic font-light text-3xl sm:text-4xl text-white mt-1">
                {actorStats?.favoriteActor || "Ensemble Cast"}
              </p>
              <p className="mt-2 font-mono text-xs text-neutral-500 font-normal">
                {actorStats?.appearanceCount || 0} appearances across library
              </p>
            </div>

            {/* Recurring actors list */}
            <div className="mt-8 space-y-3">
              {topActors.map((actor, idx) => (
                <div key={actor.name} className="flex items-baseline justify-between font-mono text-xs pb-2 border-b border-white/[0.04] font-normal">
                  <span className="text-neutral-300">
                    <span className="text-neutral-600 mr-2">0{idx + 1}</span>
                    {actor.name}
                  </span>
                  <span className="text-neutral-500">
                    {actor.count} {actor.count === 1 ? "film" : "films"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-white/[0.06] flex justify-between font-mono text-[9px] text-neutral-500 uppercase tracking-[0.24em] font-normal">
            <span>Screen Presence</span>
            <span className="text-neutral-300">Recognized</span>
          </div>
        </motion.div>

        {/* Plate 5: Cinephile Quotient */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-b border-white/[0.08] py-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-baseline justify-between font-mono text-[9px] text-neutral-500 uppercase tracking-[0.28em] pb-6 border-b border-white/[0.06] font-normal">
              <span>PLATE 05 / INDEX</span>
              <span>0-100</span>
            </div>

            <div className="mt-8 flex items-baseline justify-between">
              <div>
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block font-normal">
                  Quotient Score
                </span>
                <p className="font-display font-light text-5xl sm:text-6xl text-white mt-1">
                  {nerdScore.score}
                  <span className="text-xl font-display text-neutral-500 font-light">/100</span>
                </p>
              </div>

              <span className="font-mono text-xs text-neutral-400 font-normal">
                {nerdScore.percentile || "Top 2%"}
              </span>
            </div>

            <div className="mt-10 border-t border-b border-white/[0.06] py-5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 block font-normal">
                Rank Designation
              </span>
              <p className="font-display italic font-light text-2xl text-white mt-1">
                {nerdScore.label}
              </p>
              <p className="font-sans font-normal text-xs text-neutral-400 mt-2 leading-relaxed">
                Calculated by logging volume, era diversity, critical distribution, and arthouse index.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-white/[0.06] flex justify-between font-mono text-[9px] text-neutral-500 uppercase tracking-[0.24em] font-normal">
            <span>Benchmark</span>
            <span className="text-neutral-300">Verified</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
