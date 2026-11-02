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
    <section className="relative border-t border-white/[0.08] pt-20 sm:pt-28">
      {/* 12-Column Editorial Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column (5 cols): Curatorial Commentary & Verdict */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 block mb-4 font-normal">
              EXHIBIT 01 // CRITICAL SPECTRUM
            </span>
            <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[0.98]">
              The Critical Curve
            </h2>
            <p className="mt-4 font-sans font-normal text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              A continuous frequency distribution of critical judgment. Evaluates whether viewing habits lean toward celebratory affection or severe discrimination.
            </p>
          </div>

          <div className="pt-6 border-t border-white/[0.06] space-y-6">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-neutral-500 block font-normal">
                Diagnosed Skew
              </span>
              <p className="font-display italic font-light text-2xl sm:text-3xl text-white mt-1">
                &ldquo;{critiqueArchetype}&rdquo;
              </p>
            </div>

            <div className="flex items-baseline gap-10">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-neutral-500 block font-normal">
                  Mean Score
                </span>
                <p className="font-display font-light text-4xl sm:text-5xl text-white mt-1">
                  {avg ? `${avg.toFixed(2)}` : "—"}
                  <span className="text-xl text-neutral-500 font-light ml-1">★</span>
                </p>
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-neutral-500 block font-normal">
                  Peak Mode
                </span>
                <p className="font-display font-light text-4xl sm:text-5xl text-white mt-1">
                  {peakKey}
                  <span className="text-xl text-neutral-500 font-light ml-1">★</span>
                </p>
              </div>
            </div>

            <p className="font-mono text-[10px] text-neutral-600 font-normal">
              Derived from {totalRated.toLocaleString()} logged ratings across catalogue
            </p>
          </div>
        </div>

        {/* Right Column (7 cols): The Architectural Histogram */}
        <div className="lg:col-span-7 flex flex-col justify-end pt-4 lg:pt-0">
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-neutral-500 pb-4 border-b border-white/[0.06] mb-8 font-normal">
            <span>FREQUENCY SPECTRUM // 10 BINS</span>
            <span>HIGH WATER: {peakCount} FILMS</span>
          </div>

          {/* Bar Chart Area with Generous Height */}
          <div className="h-64 sm:h-72 flex items-end justify-between gap-2 sm:gap-4 px-1">
            {RATING_KEYS.map((key) => {
              const count = distribution[key] || 0;
              const heightPercent = totalRated > 0 ? Math.max((count / effectiveMax) * 100, 3) : 3;
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
                    className={`pointer-events-none absolute -top-12 z-20 flex flex-col items-center border border-white/[0.12] bg-[#121214] px-2.5 py-1.5 transition-all duration-150 ${
                      isHovered
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 translate-y-1"
                    }`}
                  >
                    <span className="font-mono text-[9px] text-white whitespace-nowrap font-normal">
                      {RATING_LABELS[key]}: {count} ({percentage}%)
                    </span>
                  </div>

                  {/* Count above bar */}
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

                  {/* Bar Track & Fill */}
                  <div className="relative w-full h-48 sm:h-56 flex items-end bg-white/[0.02]">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${heightPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-full transition-colors duration-200 ${
                        isPeak
                          ? "bg-white"
                          : isHovered
                          ? "bg-neutral-200"
                          : "bg-neutral-600/70 group-hover:bg-neutral-400"
                      }`}
                    />
                  </div>

                  {/* Rating Label Below Baseline */}
                  <span
                    className={`mt-3 font-mono text-[10px] tracking-tight transition-colors duration-150 font-normal ${
                      isPeak
                        ? "text-white font-medium"
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

          <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-neutral-600 font-normal">
            <span>LOW DISCRIMINATION (0.5★)</span>
            <span>HIGH ACCLAIM (5.0★)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
