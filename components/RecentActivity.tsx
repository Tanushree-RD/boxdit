"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RSSEntry } from "@/lib/scraper";

interface RecentActivityProps {
  entries: RSSEntry[];
}

function renderStars(rating: number | null): string {
  if (rating === null || rating === undefined) return "";
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return "★".repeat(fullStars) + (hasHalf ? "½" : "");
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return dateStr;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

const FALLBACK_POSTER =
  "https://s.ltrbxd.com/static/img/empty-poster-70-BSf-Pjrh.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
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

export function RecentActivity({ entries }: RecentActivityProps) {
  const latestFive = entries.slice(0, 5);

  if (latestFive.length === 0) {
    return (
      <section className="rounded-[32px] border border-white/[0.06] bg-white/[0.02] p-10 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFC857]/60">
          Recent Activity
        </p>
        <p className="mt-4 text-[14px] text-zinc-500">
          No recent logged activity or diary entries found.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-1"
      >
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFC857]/70">
            Recent Diary & Reviews
          </h2>
          <p className="mt-1.5 text-[13px] text-zinc-500">
            Latest 5 logged film entries with your personal ratings
          </p>
        </div>
        <span className="hidden sm:inline-flex rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 py-1 text-[11px] text-zinc-500">
          {latestFive.length} entries
        </span>
      </motion.div>

      <div className="space-y-3">
        {latestFive.map((entry, idx) => {
          const stars = renderStars(entry.rating);
          const formattedWatchedDate = formatDate(
            entry.watchedDate || entry.pubDate
          );

          return (
            <motion.div
              key={`${entry.link}-${idx}`}
              variants={fadeUp}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -2, transition: { duration: 0.3 } }}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 overflow-hidden rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 transition-all duration-500 hover:border-white/[0.1] hover:bg-white/[0.04] hover:shadow-[0_16px_50px_rgba(0,0,0,0.3)]"
            >
              {/* Poster */}
              <div className="relative h-28 w-[72px] sm:h-32 sm:w-[84px] shrink-0 overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900">
                <Image
                  src={entry.posterUrl || FALLBACK_POSTER}
                  alt={entry.filmTitle || entry.title}
                  fill
                  sizes="(max-width: 640px) 72px, 84px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 space-y-2 w-full">
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-bold text-white group-hover:text-[#FFC857] transition-colors duration-300 truncate"
                  >
                    {entry.filmTitle || entry.title}
                  </a>

                  {entry.filmYear && (
                    <span className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-2 py-0.5 text-[12px] text-zinc-500 font-mono">
                      {entry.filmYear}
                    </span>
                  )}

                  {entry.rewatch && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-purple-400/15 bg-purple-400/[0.06] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-purple-300/70">
                      🔄 Rewatch
                    </span>
                  )}
                </div>

                {/* Rating & Date */}
                <div className="flex flex-wrap items-center gap-3 text-[13px]">
                  {stars ? (
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1 text-[12px] font-semibold text-emerald-400/80">
                      <span className="tracking-wider">{stars}</span>
                      <span className="text-[11px] text-emerald-400/50">({entry.rating}/5)</span>
                    </div>
                  ) : (
                    <span className="text-[12px] text-zinc-600 italic">No rating cast</span>
                  )}

                  {formattedWatchedDate && (
                    <div className="flex items-center gap-1.5 text-[12px] text-zinc-500">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      <span className="font-medium text-zinc-400">
                        {formattedWatchedDate}
                      </span>
                    </div>
                  )}
                </div>

                {/* Review Excerpt */}
                {entry.reviewText && (
                  <p className="line-clamp-2 text-[12px] leading-relaxed text-zinc-500/80 pt-1 italic border-l-2 border-[#F5B000]/15 pl-3">
                    &ldquo;{entry.reviewText}&rdquo;
                  </p>
                )}
              </div>

              {/* Review button */}
              <div className="self-end sm:self-center shrink-0 pt-2 sm:pt-0">
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-[12px] font-medium text-zinc-400 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white"
                >
                  <span>Review</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
