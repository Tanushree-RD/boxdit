"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RSSEntry } from "@/lib/scraper";

interface RecentActivityProps {
  entries: RSSEntry[];
  username?: string;
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

export function RecentActivity({ entries, username }: RecentActivityProps) {
  const latestFive = entries.slice(0, 5);

  const diaryUrl = username
    ? `https://letterboxd.com/${encodeURIComponent(username)}/films/diary/`
    : entries[0]?.link || "https://letterboxd.com";

  if (latestFive.length === 0) {
    return (
      <section className="py-8">
        <div className="border-b border-white/[0.08] pb-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
            Recent Diary &amp; Reviews
          </h2>
        </div>
        <p className="mt-8 text-sm text-zinc-500">
          No recent logged activity or diary entries found.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-baseline justify-between border-b border-white/[0.08] pb-4"
      >
        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
          Recent Diary &amp; Reviews
        </h2>
        <span className="text-[11px] uppercase tracking-wider text-zinc-600 font-mono">
          Latest Entries
        </span>
      </motion.div>

      {/* Editorial Reading List */}
      <div className="divide-y divide-white/[0.06]">
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
              className="py-7 sm:py-8"
            >
              <a
                href={entry.link}
                target="_blank"
                rel="noreferrer"
                className="group -mx-3 sm:-mx-4 flex items-start gap-4 sm:gap-6 rounded-xl p-3 sm:p-4 transition-all duration-200 hover:bg-white/[0.025] hover:translate-x-1 cursor-pointer block"
              >
                {/* Poster */}
                <div className="relative w-[56px] sm:w-[64px] shrink-0 aspect-[2/3] overflow-hidden rounded-md border border-white/[0.06] bg-zinc-900">
                  <Image
                    src={entry.posterUrl || FALLBACK_POSTER}
                    alt={entry.filmTitle || entry.title}
                    fill
                    sizes="(max-width: 640px) 56px, 64px"
                    className="object-cover transition-opacity duration-200 group-hover:opacity-90"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug group-hover:text-white transition-colors">
                    {entry.filmTitle || entry.title}
                  </h3>

                  {/* Metadata */}
                  <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-400">
                    {entry.filmYear && (
                      <span className="font-normal">{entry.filmYear}</span>
                    )}

                    {entry.filmYear && stars && (
                      <span className="text-zinc-600 select-none">•</span>
                    )}

                    {stars && (
                      <span className="text-[#00e054] tracking-wider font-normal">
                        {stars}
                      </span>
                    )}

                    {(entry.filmYear || stars) && formattedWatchedDate && (
                      <span className="text-zinc-600 select-none">•</span>
                    )}

                    {formattedWatchedDate && (
                      <span className="text-zinc-400 font-normal">
                        {formattedWatchedDate}
                      </span>
                    )}

                    {entry.rewatch && (
                      <>
                        <span className="text-zinc-600 select-none">•</span>
                        <span className="text-zinc-500 text-[11px] inline-flex items-center gap-1 font-normal">
                          <span className="text-[10px]">↺</span> rewatch
                        </span>
                      </>
                    )}
                  </div>

                  {/* Review Excerpt */}
                  {entry.reviewText && (
                    <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-zinc-400 line-clamp-3 font-normal">
                      &ldquo;{entry.reviewText}&rdquo;
                    </p>
                  )}
                </div>
              </a>
            </motion.div>
          );
        })}
      </div>

      {/* Subtle Footer Link */}
      <div className="pt-8 border-t border-white/[0.06]">
        <a
          href={diaryUrl}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-normal text-zinc-500 transition-colors duration-200 hover:text-white"
        >
          <span>View complete diary on Letterboxd</span>
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-zinc-500 group-hover:text-white">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
