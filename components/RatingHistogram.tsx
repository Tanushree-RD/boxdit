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
    <div className="relative overflow-hidden rounded-2xl cinema-panel p-6 sm:p-8">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00E054]/[0.05] blur-3xl" />

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.06] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00E054] shadow-[0_0_8px_#00E054]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#00E054]">
              Signature Letterboxd Curve
            </span>
          </div>
          <h3 className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-white">
            The Rating Spectrum
          </h3>
          <p className="mt-0.5 text-xs text-zinc-400">
            Critical curve calculated across {totalRated.toLocaleString()} logged ratings
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 text-right">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              Critical Skew
            </span>
            <span className="text-sm font-semibold text-zinc-200">
              {critiqueArchetype}
            </span>
          </div>
          <div className="rounded-xl border border-[#00E054]/20 bg-[#00E054]/[0.06] px-3.5 py-2 text-right">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-[#00E054]/75">
              Mean Rating
            </span>
            <span className="text-base font-bold text-white font-mono">
              {avg ? `${avg.toFixed(2)} ★` : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* The 10-Bar Chart */}
      <div className="pt-8 pb-4">
        <div className="flex h-44 sm:h-52 items-end justify-between gap-2 sm:gap-3 px-1 sm:px-3">
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
                {/* Floating Tooltip Pill */}
                <div
                  className={`pointer-events-none absolute -top-11 z-20 flex flex-col items-center rounded-lg border border-white/[0.14] bg-[#12161A] px-2 py-1 shadow-xl transition-all duration-150 ${
                    isHovered
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 translate-y-1"
                  }`}
                >
                  <span className="text-[11px] font-mono font-bold text-white whitespace-nowrap">
                    {count} {count === 1 ? "film" : "films"}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 whitespace-nowrap">
                    {percentage}% of rated
                  </span>
                </div>

                {/* Star Count Count label above bar (visible for peak or hovered) */}
                <span
                  className={`mb-2 text-[11px] font-mono tabular-nums transition-colors duration-150 ${
                    isPeak
                      ? "font-bold text-[#00E054]"
                      : isHovered
                      ? "text-white"
                      : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                >
                  {count > 0 ? count : ""}
                </span>

                {/* The Bar Track */}
                <div className="relative w-full h-32 sm:h-36 flex items-end overflow-hidden rounded-t-[6px] bg-white/[0.04]">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${heightPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full rounded-t-[6px] transition-all duration-200 ${
                      isPeak
                        ? "bg-gradient-to-t from-[#00b042] to-[#00ff60] shadow-[0_0_16px_rgba(0,224,84,0.35)]"
                        : isHovered
                        ? "bg-[#00E054] shadow-[0_0_12px_rgba(0,224,84,0.25)]"
                        : "bg-[#00E054]/80 group-hover:bg-[#00E054]"
                    }`}
                  />
                </div>

                {/* Rating Label (½★ to 5★) */}
                <span
                  className={`mt-3 text-[10px] sm:text-xs font-mono tracking-tight transition-colors duration-150 ${
                    isPeak
                      ? "font-bold text-[#00E054]"
                      : isHovered
                      ? "text-white"
                      : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                >
                  {RATING_LABELS[key]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer details */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.05] pt-4 text-[12px] text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="font-mono text-zinc-500">Most Awarded Rating:</span>
          <span className="font-semibold text-white">
            {RATING_LABELS[peakKey]} ({peakCount.toLocaleString()} {peakCount === 1 ? "film" : "films"})
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          {ratings.highestRatedMovie && (
            <span className="text-zinc-400">
              Highest: <strong className="text-white font-medium">{ratings.highestRatedMovie.filmTitle}</strong>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
