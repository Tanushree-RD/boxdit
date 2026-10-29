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
      <section className="rounded-2xl cinema-panel p-8 text-center">
        <h2 className="text-xl font-bold text-white">Recent Diary &amp; Reviews</h2>
        <p className="mt-2 text-sm text-zinc-500">
          No public diary logs found for this account.
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
        className="mb-6 sm:mb-8 px-1 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#40BCF4]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#40BCF4]">
              Screening Journal
            </span>
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Recent Diary &amp; Dispatches
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Latest logged screenings, critical ratings, and excerpts direct from Letterboxd
          </p>
        </div>

        <a
          href={diaryUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-mono text-[#00E054] hover:underline transition-colors flex items-center gap-1"
        >
          <span>Complete Diary Index</span>
          <span>↗</span>
        </a>
      </motion.div>

      {/* Critic Journal Entries */}
      <div className="space-y-4">
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
              viewport={{ once: true }}
              className="group rounded-2xl cinema-panel cinema-panel-hover p-5 sm:p-6 transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                {/* Poster */}
                <div className="relative w-16 sm:w-20 shrink-0 aspect-[2/3] overflow-hidden rounded-lg border border-white/[0.1] bg-[#14181C] shadow-lg group-hover:border-white/[0.25] transition-colors">
                  <Image
                    src={entry.posterUrl || FALLBACK_POSTER}
                    alt={entry.filmTitle || entry.title}
                    fill
                    sizes="(max-width: 640px) 64px, 80px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#FF8000] transition-colors">
                      <a href={entry.link} target="_blank" rel="noreferrer">
                        {entry.filmTitle || entry.title}
                      </a>
                    </h3>

                    {/* Screening Date */}
                    {formattedWatchedDate && (
                      <span className="text-xs font-mono text-zinc-500">
                        {formattedWatchedDate}
                      </span>
                    )}
                  </div>

                  {/* Metadata Chips: Year, Rating Stars, Rewatch */}
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                    {entry.filmYear && (
                      <span className="font-mono text-zinc-400">
                        {entry.filmYear}
                      </span>
                    )}

                    {stars && (
                      <>
                        <span className="text-zinc-600 select-none">•</span>
                        <span className="text-[#00E054] font-medium tracking-wider">
                          {stars}
                        </span>
                      </>
                    )}

                    {entry.rewatch && (
                      <>
                        <span className="text-zinc-600 select-none">•</span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                          <span>↺</span> rewatch
                        </span>
                      </>
                    )}
                  </div>

                  {/* Critic Review Excerpt */}
                  {entry.reviewText && (
                    <div className="mt-3.5 pl-3.5 border-l-2 border-[#FF8000]/40">
                      <p className="font-serif italic text-sm sm:text-[15px] text-zinc-300 leading-relaxed font-light">
                        &ldquo;{entry.reviewText}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Footer Action */}
                  <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-zinc-600">
                      DIARY DISPATCH #{idx + 1}
                    </span>
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-400 group-hover:text-white transition-colors inline-flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span>Read on Letterboxd</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
