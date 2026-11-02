"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RatingDistribution, RatingKey, RatingStatsResult } from "@/lib/analytics";

interface RatingHistogramProps {
  ratings: RatingStatsResult;
}

const RATING_KEYS: RatingKey[] = [
  "0.5",
  "1.0",
  "1.5",
  "2.0",
  "2.5",
  "3.0",
  "3.5",
  "4.0",
  "4.5",
  "5.0",
];

const RATING_LABELS: Record<RatingKey, string> = {
  "0.5": "½★",
  "1.0": "1★",
  "1.5": "1½★",
  "2.0": "2★",
  "2.5": "2½★",
  "3.0": "3★",
  "3.5": "3½★",
  "4.0": "4★",
  "4.5": "4½★",
  "5.0": "5★",
};

export function RatingHistogram({ ratings }: RatingHistogramProps) {
  const [hoveredKey, setHoveredKey] = useState<RatingKey | null>(null);

  const distribution = ratings.distribution || ({} as RatingDistribution);
  const totalRated = ratings.totalRated || 0;

  // Find max count for bar scaling
  let maxCount = 0;
  for (const k of RATING_KEYS) {
    const c = distribution[k] || 0;
    if (c > maxCount) maxCount = c;
  }
  const effectiveMax = maxCount > 0 ? maxCount : 1;

  // Find peak rating
  let peakKey: RatingKey = "4.0";
  let peakCount = 0;
  for (const k of RATING_KEYS) {
    if ((distribution[k] || 0) > peakCount) {
      peakCount = distribution[k] || 0;
      peakKey = k;
    }
  }

  const avg = ratings.averageRating;
  const critiqueArchetype =
    avg === null
      ? "Uncharted"
      : avg >= 3.8
      ? "Generous Celebrator"
      : avg >= 3.3
      ? "Balanced Connoisseur"
      : avg >= 2.8
      ? "Exacting Skeptic"
      : "Severe Realist";

  return (
    <div className="relative border-t border-b border-white/[0.08] py-12 sm:py-16">
      {/* Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-6 border-b border-white/[0.06] pb-8">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 block mb-2 font-normal">
            SPECTRUM // 10-BAR DISTRIBUTION
          </span>
          <h3 className="font-display font-light text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            The Critical Curve
          </h3>
          <p className="mt-2 font-sans font-normal text-xs sm:text-sm text-neutral-400">
            Calculated across {totalRated.toLocaleString()} logged ratings
          </p>
        </div>

        <div className="flex items-baseline gap-8 font-mono text-xs">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.24em] text-neutral-500 font-normal">
              Critical Skew
            </span>
            <span className="font-display italic text-lg text-white font-normal mt-0.5 block">
              {critiqueArchetype}
            </span>
          </div>
          <div>
            <span className="block text-[9px] uppercase tracking-[0.24em] text-neutral-500 font-normal">
              Mean Score
            </span>
            <span className="font-display text-xl text-white font-light mt-0.5 block">
              {avg ? `${avg.toFixed(2)} ★` : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* The 10-Bar Architectural Chart */}
      <div className="pt-12 pb-6">
        <div className="flex h-52 sm:h-64 items-end justify-between gap-2 sm:gap-6 px-2">
          {RATING_KEYS.map((key) => {
            const count = distribution[key] || 0;
            const heightPercent = totalRated > 0 ? Math.max((count / effectiveMax) * 100, 4) : 4;
            const isPeak = key === peakKey && count > 0;
            const isHovered = hoveredKey === key;
            const percentage = totalRated > 0 ? ((count / totalRated) * 100).toFixed(1) : "0";

            return (
              <div
                key={key}
                onMouseEnter={() => setHoveredKey(key)}
                onMouseLeave={() => setHoveredKey(null)}
                className="group relative flex flex-1 flex-col items-center h-full justify-end cursor-pointer"
              >
                {/* Floating Tooltip */}
                <div
                  className={`pointer-events-none absolute -top-10 z-20 flex flex-col items-center border border-white/[0.12] bg-[#121214] px-2.5 py-1 transition-all duration-150 ${
                    isHovered
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 translate-y-1"
                  }`}
                >
                  <span className="font-mono text-[9px] text-white whitespace-nowrap font-normal">
                    {count} {count === 1 ? "film" : "films"} ({percentage}%)
                  </span>
                </div>

                {/* Count label above bar */}
                <span
                  className={`mb-2 font-mono text-[9px] tabular-nums transition-colors duration-150 font-normal ${
                    isPeak
                      ? "text-white"
                      : isHovered
                      ? "text-white"
                      : "text-neutral-500 group-hover:text-neutral-300"
                  }`}
                >
                  {count > 0 ? count : ""}
                </span>

                {/* The Bar Track */}
                <div className="relative w-full h-40 sm:h-48 flex items-end bg-white/[0.02]">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${heightPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full transition-colors duration-200 ${
                      isPeak
                        ? "bg-neutral-200"
                        : isHovered
                        ? "bg-white"
                        : "bg-neutral-600 group-hover:bg-neutral-400"
                    }`}
                  />
                </div>

                {/* Rating Label (½★ to 5★) */}
                <span
                  className={`mt-4 font-mono text-[9px] tracking-tight transition-colors duration-150 font-normal ${
                    isPeak
                      ? "text-white"
                      : isHovered
                      ? "text-white"
                      : "text-neutral-500 group-hover:text-neutral-300"
                  }`}
                >
                  {RATING_LABELS[key]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer details: Movie titles feel like magazine headlines */}
      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-6 border-t border-white/[0.06] pt-6 font-mono text-xs">
        <div className="flex items-baseline gap-2">
          <span className="text-neutral-500 uppercase text-[9px] tracking-[0.24em] font-normal">Most Awarded:</span>
          <span className="text-white font-normal">
            {RATING_LABELS[peakKey]} ({peakCount.toLocaleString()} {peakCount === 1 ? "film" : "films"})
          </span>
        </div>
        <div>
          {ratings.highestRatedMovie && (
            <div className="flex items-baseline gap-3">
              <span className="text-neutral-500 uppercase text-[9px] tracking-[0.24em] font-normal">Pinnacle Rating:</span>
              <span className="font-display italic font-normal text-xl sm:text-2xl text-white tracking-tight">
                {ratings.highestRatedMovie.filmTitle}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
