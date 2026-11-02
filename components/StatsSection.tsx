"use client";

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

export function StatsSection({
  totalMovies,
  ratings,
  releaseYears,
  nerdScore,
  genreStats,
  actorStats,
}: StatsSectionProps) {
  const approxHours = Math.round((totalMovies * 105) / 60);
  const topGenres = genreStats?.breakdown?.slice(0, 5) || [];
  const topActors = actorStats?.topActors?.slice(0, 5) || [];
  const decades = releaseYears.decadeBreakdown?.slice(0, 6) || [];

  return (
    <div className="space-y-32 sm:space-y-44">
      {/* ────────────────────────────────────────────────────────────
          MOVEMENT I: SCALE & IMMERSION (Monumental Typographic Spread)
          ──────────────────────────────────────────────────────────── */}
      <section className="relative border-t border-white/[0.08] pt-20 sm:pt-28">
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-16 border-b border-white/[0.06] font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-normal">
          <span>EXHIBIT 02 // SCALE &amp; IMMERSION</span>
          <span>Ledger: Continuous</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Section Kicker */}
          <div className="lg:col-span-4">
            <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[0.98]">
              The Weight of Cinema
            </h2>
            <p className="mt-4 font-sans font-normal text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              An accounting of hours surrendered to the silver screen. Reflects physical devotion to viewing, logging, and critical reflection.
            </p>
          </div>

          {/* Monumental Dual Numbers */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 pt-2 lg:pt-0">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 block font-normal">
                Titles Catalogued
              </span>
              <p className="font-display font-light text-6xl sm:text-7xl lg:text-8xl text-white leading-none mt-2">
                {totalMovies.toLocaleString()}
              </p>
              <p className="mt-4 font-sans font-normal text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Total titles archived in Letterboxd, including {ratings.totalRated.toLocaleString()} accompanied by star ratings.
              </p>
            </div>

            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 block font-normal">
                Projection Time
              </span>
              <p className="font-display font-light text-6xl sm:text-7xl lg:text-8xl text-white leading-none mt-2">
                ~{approxHours.toLocaleString()}
                <span className="text-xl sm:text-2xl text-neutral-500 font-light ml-2">hrs</span>
              </p>
              <p className="mt-4 font-sans font-normal text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Equivalent to {(approxHours / 24).toFixed(1)} consecutive days and nights immersed in projected narratives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          MOVEMENT II: CINEMATIC CHRONOLOGY (Asymmetric Era Odyssey)
          ──────────────────────────────────────────────────────────── */}
      <section className="relative border-t border-white/[0.08] pt-20 sm:pt-28">
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-16 border-b border-white/[0.06] font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-normal">
          <span>EXHIBIT 03 // CHRONOLOGY &amp; DECADES</span>
          <span>Temporal Horizon: 1920s—Present</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): Dominant Era Feature */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[0.98]">
                The Era Odyssey
              </h2>
              <p className="mt-4 font-sans font-normal text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
                A historical tracing of release dates across your screening history, highlighting your cinematic era of greatest affinity.
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.06] space-y-6">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 block font-normal">
                  Defining Era
                </span>
                <p className="font-display font-light text-6xl sm:text-7xl lg:text-8xl text-white leading-none mt-2">
                  {releaseYears.favoriteDecade?.decade || "2020s"}
                </p>
                <p className="mt-3 font-mono text-xs text-neutral-400 font-normal">
                  Accounts for {releaseYears.favoriteDecade?.percentage || 0}% of your total viewing volume.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/[0.04] font-mono text-xs">
                <div>
                  <span className="block text-[9px] uppercase tracking-[0.24em] text-neutral-500 font-normal">
                    Mean Year
                  </span>
                  <span className="font-display text-2xl text-white font-light mt-1 block">
                    {releaseYears.averageReleaseYear || "—"}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-[0.24em] text-neutral-500 font-normal">
                    Peak Release Year
                  </span>
                  <span className="font-display text-2xl text-white font-light mt-1 block">
                    {releaseYears.mostWatchedYear?.year || "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Ruled Decade Timeline Ledger */}
          <div className="lg:col-span-7 space-y-5 pt-2 lg:pt-0">
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-neutral-500 pb-3 border-b border-white/[0.06] font-normal">
              <span>DECADE</span>
              <span>VOLUME / PROPORTION</span>
            </div>

            <div className="space-y-4">
              {decades.map((dec) => (
                <div key={dec.decade} className="group py-2">
                  <div className="flex items-baseline justify-between font-mono text-xs font-normal mb-2">
                    <span className="text-white text-sm group-hover:text-neutral-200 transition-colors">
                      {dec.decade}
                    </span>
                    <span className="text-neutral-500 group-hover:text-neutral-300 transition-colors">
                      {dec.count} {dec.count === 1 ? "film" : "films"} ({dec.percentage}%)
                    </span>
                  </div>
                  <div className="h-0.5 w-full bg-white/[0.04]">
                    <div
                      className="h-full bg-neutral-400 group-hover:bg-white transition-all duration-500"
                      style={{ width: `${Math.min(dec.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          MOVEMENT III: THE CURATORIAL MATRIX (Genres & Dramatis Personae)
          ──────────────────────────────────────────────────────────── */}
      <section className="relative border-t border-white/[0.08] pt-20 sm:pt-28">
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-16 border-b border-white/[0.06] font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-normal">
          <span>EXHIBIT 04 // TASTE MATRIX &amp; DRAMATIS PERSONAE</span>
          <span>Index: Thematic &amp; Ensemble</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Column A (6 cols): Primary Predilections (Genres) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 block mb-3 font-normal">
                THEMATIC MATRIX
              </span>
              <h3 className="font-display font-light text-3xl sm:text-5xl text-white tracking-tight leading-[1.05]">
                Primary Predilections
              </h3>
              <p className="mt-2 font-sans font-normal text-xs sm:text-sm text-neutral-400">
                Most frequent narrative genres inhabiting the collection.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-neutral-500 block font-normal">
                Apex Predilection
              </span>
              <p className="font-display italic font-light text-3xl sm:text-4xl text-white mt-1">
                &ldquo;{genreStats?.favoriteGenre || "Cinema"}&rdquo;
              </p>
            </div>

            {/* Ruled Genre Index */}
            <div className="pt-4 space-y-3 border-t border-white/[0.04]">
              {topGenres.map((g, idx) => (
                <div
                  key={g.genre}
                  className="flex items-baseline justify-between font-mono text-xs pb-3 border-b border-white/[0.04] font-normal group"
                >
                  <span className="text-neutral-300 group-hover:text-white transition-colors">
                    <span className="text-neutral-600 mr-3">0{idx + 1}</span>
                    {g.genre}
                  </span>
                  <span className="text-neutral-500 group-hover:text-neutral-400 transition-colors">
                    {g.count} films ({g.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column B (6 cols): Dramatis Personae (Ensemble Cast) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 block mb-3 font-normal">
                DRAMATIS PERSONAE
              </span>
              <h3 className="font-display font-light text-3xl sm:text-5xl text-white tracking-tight leading-[1.05]">
                Screen Presence
              </h3>
              <p className="mt-2 font-sans font-normal text-xs sm:text-sm text-neutral-400">
                Actors appearing most recurrently across catalogued viewings.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-neutral-500 block font-normal">
                Most Frequent Collaborator
              </span>
              <p className="font-display italic font-light text-3xl sm:text-4xl text-white mt-1">
                &ldquo;{actorStats?.favoriteActor || "Ensemble Cast"}&rdquo;
              </p>
            </div>

            {/* Ruled Actor Index */}
            <div className="pt-4 space-y-3 border-t border-white/[0.04]">
              {topActors.map((actor, idx) => (
                <div
                  key={actor.name}
                  className="flex items-baseline justify-between font-mono text-xs pb-3 border-b border-white/[0.04] font-normal group"
                >
                  <span className="text-neutral-300 group-hover:text-white transition-colors">
                    <span className="text-neutral-600 mr-3">0{idx + 1}</span>
                    {actor.name}
                  </span>
                  <span className="text-neutral-500 group-hover:text-neutral-400 transition-colors">
                    {actor.count} {actor.count === 1 ? "appearance" : "appearances"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          MOVEMENT IV: THE CINEPHILE INDEX (Curatorial Appraisal)
          ──────────────────────────────────────────────────────────── */}
      <section className="relative border-t border-white/[0.08] pt-20 sm:pt-28">
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-16 border-b border-white/[0.06] font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-normal">
          <span>EXHIBIT 05 // CURATORIAL APPRAISAL</span>
          <span>Cohort Benchmark: Top Decile</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): Sculptural Score */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 block mb-3 font-normal">
                COMPOSITE QUOTIENT
              </span>
              <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[0.98]">
                The Cinephile Index
              </h2>
            </div>

            <div className="pt-6 border-t border-white/[0.06]">
              <div className="flex items-baseline">
                <span className="font-display font-light text-7xl sm:text-8xl lg:text-9xl text-white leading-none">
                  {nerdScore.score}
                </span>
                <span className="text-2xl sm:text-3xl text-neutral-500 font-display font-light ml-2">
                  /100
                </span>
              </div>

              <div className="mt-4 font-mono text-xs text-neutral-400 font-normal">
                Relative Standing: {nerdScore.percentile || "Top 2%"} of global Letterboxd users
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Rationale & Architectural Benchmarks */}
          <div className="lg:col-span-7 space-y-8 pt-2 lg:pt-0">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 block mb-3 font-normal">
                RANK DESIGNATION
              </span>
              <h3 className="font-display italic font-light text-3xl sm:text-5xl lg:text-6xl text-white leading-tight">
                &ldquo;{nerdScore.label}&rdquo;
              </h3>
              <p className="mt-5 font-sans font-normal text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl">
                A composite index synthesized from cataloguing commitment, era diversity across cinema history, rating discipline, and arthouse propensity.
              </p>
            </div>

            {/* Benchmarks Ledger */}
            <div className="pt-6 border-t border-white/[0.06] space-y-3 font-mono text-xs">
              <div className="flex items-baseline justify-between py-2 border-b border-white/[0.04]">
                <span className="text-neutral-400">Library Volume</span>
                <span className="text-white">{totalMovies.toLocaleString()} Films Recorded</span>
              </div>
              <div className="flex items-baseline justify-between py-2 border-b border-white/[0.04]">
                <span className="text-neutral-400">Chronological Span</span>
                <span className="text-white">{decades.length} Decades Represented</span>
              </div>
              <div className="flex items-baseline justify-between py-2 border-b border-white/[0.04]">
                <span className="text-neutral-400">Critical Discipline</span>
                <span className="text-white">{ratings.totalRated.toLocaleString()} Graded Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
