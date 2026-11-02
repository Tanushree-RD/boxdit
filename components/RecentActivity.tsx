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

export function RecentActivity({ entries, username }: RecentActivityProps) {
  const latestFive = entries.slice(0, 5);

  const diaryUrl = username
    ? `https://letterboxd.com/${encodeURIComponent(username)}/films/diary/`
    : entries[0]?.link || "https://letterboxd.com";

  if (latestFive.length === 0) {
    return (
      <section className="border-t border-white/[0.08] pt-20 sm:pt-28 text-center">
        <h2 className="font-display italic font-light text-2xl text-white">Recent Diary Logs</h2>
        <p className="mt-3 font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-normal">
          No public diary logs recorded for this account.
        </p>
      </section>
    );
  }

  const [leadEntry, ...remainingEntries] = latestFive;
  const leadStars = renderStars(leadEntry.rating);
  const leadDate = formatDate(leadEntry.watchedDate || leadEntry.pubDate);

  return (
    <section className="relative border-t border-white/[0.08] pt-20 sm:pt-28">
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-16 sm:mb-20 border-b border-white/[0.06] font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-normal">
        <span>EXHIBIT 07 // SCREENING JOURNAL</span>
        <a
          href={diaryUrl}
          target="_blank"
          rel="noreferrer"
          className="text-neutral-400 hover:text-white transition-colors tracking-[0.2em]"
        >
          Letterboxd Diary Index ↗
        </a>
      </div>

      <div className="mb-14 max-w-xl">
        <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[0.98]">
          Recent Diary &amp; Reviews
        </h2>
        <p className="mt-4 font-sans font-normal text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Chronological record of recent theatrical screenings, critical verdicts, and review commentary.
        </p>
      </div>

      {/* LEAD FEATURE DISPATCH: Most Recent Screening */}
      {leadEntry && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pb-16 sm:pb-20 border-b border-white/[0.08]"
        >
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-neutral-500 pb-3 border-b border-white/[0.06] mb-8 font-normal">
            <span>LEAD DISPATCH 01 // LATEST LOGGED SCREENING</span>
            <span>{leadDate || "Recent"}</span>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-12">
            {/* Large Lead Poster */}
            <div className="relative w-36 sm:w-44 aspect-[2/3] shrink-0 overflow-hidden border border-white/[0.12] bg-[#121214]">
              <Image
                src={leadEntry.posterUrl || FALLBACK_POSTER}
                alt={leadEntry.filmTitle || leadEntry.title}
                fill
                sizes="(max-width: 640px) 144px, 176px"
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Lead Content */}
            <div className="flex-1 min-w-0 space-y-6">
              <div className="flex flex-wrap items-baseline gap-3 font-mono text-xs">
                {leadEntry.filmYear && (
                  <span className="text-neutral-400">{leadEntry.filmYear}</span>
                )}
                {leadStars && (
                  <>
                    <span className="text-neutral-700">·</span>
                    <span className="text-white tracking-widest">{leadStars}</span>
                  </>
                )}
                {leadEntry.rewatch && (
                  <>
                    <span className="text-neutral-700">·</span>
                    <span className="text-neutral-500 uppercase text-[9px] tracking-wider">
                      ↺ Rewatch
                    </span>
                  </>
                )}
              </div>

              <h3 className="font-display italic font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.02]">
                <a
                  href={leadEntry.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline underline-offset-4 decoration-white/20 transition-all"
                >
                  {leadEntry.filmTitle || leadEntry.title}
                </a>
              </h3>

              {leadEntry.reviewText && (
                <div className="pt-2 pl-6 border-l border-white/[0.2]">
                  <p className="font-display italic font-light text-lg sm:text-xl text-neutral-200 leading-relaxed">
                    &ldquo;{leadEntry.reviewText}&rdquo;
                  </p>
                </div>
              )}

              <div className="pt-2">
                <a
                  href={leadEntry.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors font-normal inline-block"
                >
                  Read Review Dispatch on Letterboxd ↗
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* CHRONOLOGICAL SCREENING ARCHIVE (Items 02—05) */}
      {remainingEntries.length > 0 && (
        <div className="divide-y divide-white/[0.06]">
          {remainingEntries.map((entry, idx) => {
            const stars = renderStars(entry.rating);
            const formattedDate = formatDate(entry.watchedDate || entry.pubDate);

            return (
              <motion.div
                key={`${entry.link}-${idx}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="py-10 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start group"
              >
                {/* Meta Column (3 cols) */}
                <div className="md:col-span-3 font-mono text-xs space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.24em] text-neutral-500 block font-normal">
                    DISPATCH 0{idx + 2}
                  </span>
                  <span className="text-neutral-400 block">{formattedDate || "—"}</span>
                </div>

                {/* Content Column (7 cols) */}
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-baseline gap-3 font-mono text-xs text-neutral-400">
                    {entry.filmYear && <span>{entry.filmYear}</span>}
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

                  <h4 className="font-display italic font-light text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-[1.08]">
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline underline-offset-4 decoration-white/20 transition-all"
                    >
                      {entry.filmTitle || entry.title}
                    </a>
                  </h4>

                  {entry.reviewText && (
                    <p className="font-sans font-normal text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg">
                      &ldquo;{entry.reviewText}&rdquo;
                    </p>
                  )}
                </div>

                {/* Thumbnail Column (2 cols) */}
                <div className="md:col-span-2 flex md:justify-end">
                  <div className="relative w-16 sm:w-20 aspect-[2/3] overflow-hidden border border-white/[0.08] bg-[#121214] shrink-0">
                    <Image
                      src={entry.posterUrl || FALLBACK_POSTER}
                      alt={entry.filmTitle || entry.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
