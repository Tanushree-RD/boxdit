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
      <section className="border-t border-b border-white/[0.08] py-14 text-center">
        <h2 className="font-display italic font-light text-2xl text-white">Recent Diary Logs</h2>
        <p className="mt-3 font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-normal">
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
        className="mb-14 flex flex-wrap items-baseline justify-between gap-4 border-b border-white/[0.08] pb-8"
      >
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 block mb-2 font-normal">
            SCREENING JOURNAL // DISPATCHES
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-light tracking-tight text-white">
            Recent Diary &amp; Reviews
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-sans font-normal">
            Latest logged screenings, critical ratings, and review dispatches direct from Letterboxd
          </p>
        </div>

        <a
          href={diaryUrl}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors font-normal"
        >
          [ Full Diary Index ↗ ]
        </a>
      </motion.div>

      {/* Critic Journal Entries: Magazine Headlines */}
      <div className="divide-y divide-white/[0.08] border-b border-white/[0.08]">
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
              className="py-10 sm:py-12 flex flex-col sm:flex-row items-start gap-8 group"
            >
              {/* Poster */}
              <div className="relative w-20 sm:w-24 shrink-0 aspect-[2/3] overflow-hidden border border-white/[0.1] bg-[#121214]">
                <Image
                  src={entry.posterUrl || FALLBACK_POSTER}
                  alt={entry.filmTitle || entry.title}
                  fill
                  sizes="(max-width: 640px) 80px, 96px"
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0 space-y-4">
                {/* Meta Bar */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-xs">
                  <div className="flex items-baseline gap-3 text-neutral-400 font-normal">
                    <span className="text-[10px] text-neutral-600">DISPATCH 0{idx + 1}</span>
                    {entry.filmYear && (
                      <>
                        <span className="text-neutral-700">·</span>
                        <span>{entry.filmYear}</span>
                      </>
                    )}
                    {stars && (
                      <>
                        <span className="text-neutral-700">·</span>
                        <span className="text-white tracking-widest">{stars}</span>
                      </>
                    )}
                    {entry.rewatch && (
                      <>
                        <span className="text-neutral-700">·</span>
                        <span className="text-neutral-500 uppercase text-[9px] tracking-wider">
                          ↺ Rewatch
                        </span>
                      </>
                    )}
                  </div>

                  {formattedWatchedDate && (
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider font-normal">
                      {formattedWatchedDate}
                    </span>
                  )}
                </div>

                {/* Film Title as Magazine Headline */}
                <h3 className="font-display italic font-normal text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.05]">
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline underline-offset-4 decoration-white/20 transition-all"
                  >
                    {entry.filmTitle || entry.title}
                  </a>
                </h3>

                {/* Review Excerpt */}
                {entry.reviewText && (
                  <div className="pt-2 pl-5 border-l border-white/[0.14]">
                    <p className="font-display italic font-light text-base sm:text-lg text-neutral-300 leading-relaxed">
                      &ldquo;{entry.reviewText}&rdquo;
                    </p>
                  </div>
                )}

                {/* Footer Link */}
                <div className="pt-2">
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors font-normal inline-block"
                  >
                    Read Entry on Letterboxd ↗
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
