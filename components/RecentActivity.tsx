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

const smoothEase = [0.16, 1, 0.3, 1] as const;

export function RecentActivity({ entries, username }: RecentActivityProps) {
  const latestFive = entries.slice(0, 5);

  const diaryUrl = username
    ? `https://letterboxd.com/${encodeURIComponent(username)}/films/diary/`
    : entries[0]?.link || "https://letterboxd.com";

  if (latestFive.length === 0) {
    return (
      <section className="border-t border-white/[0.06] pt-20 sm:pt-28 text-center">
        <h2 className="font-display italic font-light text-2xl text-[#F5F5F5]">Recent Diary Logs</h2>
        <p className="mt-3 font-mono text-[9px] text-white/55 uppercase tracking-widest font-normal">
          No public diary logs recorded for this account.
        </p>
      </section>
    );
  }

  const [leadEntry, ...remainingEntries] = latestFive;
  const leadStars = renderStars(leadEntry.rating);
  const leadDate = formatDate(leadEntry.watchedDate || leadEntry.pubDate);

  return (
    <section className="relative border-t border-white/[0.06] pt-20 sm:pt-28">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: smoothEase }}
        className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-16 sm:mb-20 border-b border-white/[0.06] font-mono text-[9px] uppercase tracking-[0.3em] text-white/55 font-normal"
      >
        <span>EXHIBIT 07 // SCREENING JOURNAL</span>
        <a
          href={diaryUrl}
          target="_blank"
          rel="noreferrer"
          className="text-white/55 hover:text-[#F5F5F5] transition-colors duration-300 tracking-[0.2em]"
        >
          Letterboxd Diary Index ↗
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: smoothEase }}
        className="mb-14 max-w-xl"
      >
        <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#F5F5F5] tracking-tight leading-[0.98]">
          Recent Diary &amp; Reviews
        </h2>
        <p className="mt-4 font-sans font-normal text-xs sm:text-sm text-white/55 leading-relaxed">
          Chronological record of recent theatrical screenings, critical verdicts, and review commentary.
        </p>
      </motion.div>

      {/* LEAD FEATURE DISPATCH: Most Recent Screening */}
      {leadEntry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: smoothEase }}
          className="pb-16 sm:pb-20 border-b border-white/[0.06] group"
        >
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-white/55 pb-3 border-b border-white/[0.06] mb-8 font-normal">
            <span>LEAD DISPATCH 01 // LATEST LOGGED SCREENING</span>
            <span>{leadDate || "Recent"}</span>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-12">
            {/* Large Lead Poster with Soft Scaling & Gentle Elevation */}
            <div className="relative w-36 sm:w-44 aspect-[2/3] shrink-0 overflow-hidden border border-white/[0.06] bg-[#0D0D0D] transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
              <Image
                src={leadEntry.posterUrl || FALLBACK_POSTER}
                alt={leadEntry.filmTitle || leadEntry.title}
                fill
                sizes="(max-width: 640px) 144px, 176px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                unoptimized
              />
            </div>

            {/* Lead Content */}
            <div className="flex-1 min-w-0 space-y-6">
              <div className="flex flex-wrap items-baseline gap-3 font-mono text-xs">
                {leadEntry.filmYear && (
                  <span className="text-white/55">{leadEntry.filmYear}</span>
                )}
                {leadStars && (
                  <>
                    <span className="text-white/20">·</span>
                    <span className="text-[#F5F5F5] tracking-widest">{leadStars}</span>
                  </>
                )}
                {leadEntry.rewatch && (
                  <>
                    <span className="text-white/20">·</span>
                    <span className="text-white/55 uppercase text-[9px] tracking-wider">
                      ↺ Rewatch
                    </span>
                  </>
                )}
              </div>

              <h3 className="font-display italic font-light text-4xl sm:text-5xl lg:text-6xl text-[#F5F5F5] tracking-tight leading-[1.02]">
                <a
                  href={leadEntry.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline underline-offset-4 decoration-white/20 transition-all duration-300"
                >
                  {leadEntry.filmTitle || leadEntry.title}
                </a>
              </h3>

              {leadEntry.reviewText && (
                <div className="pt-2 pl-6 border-l border-white/[0.06]">
                  <p className="font-display italic font-light text-lg sm:text-xl text-[#F5F5F5] leading-relaxed">
                    &ldquo;{leadEntry.reviewText}&rdquo;
                  </p>
                </div>
              )}

              <div className="pt-2">
                <a
                  href={leadEntry.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55 hover:text-[#F5F5F5] transition-colors duration-300 font-normal inline-block"
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
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: smoothEase }}
                className="py-10 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start group"
              >
                {/* Meta Column (3 cols) */}
                <div className="md:col-span-3 font-mono text-xs space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.24em] text-white/55 block font-normal">
                    DISPATCH 0{idx + 2}
                  </span>
                  <span className="text-white/55 block">{formattedDate || "—"}</span>
                </div>

                {/* Content Column (7 cols) */}
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-baseline gap-3 font-mono text-xs text-white/55">
                    {entry.filmYear && <span>{entry.filmYear}</span>}
                    {stars && (
                      <>
                        <span className="text-white/20">·</span>
                        <span className="text-[#F5F5F5] tracking-widest">{stars}</span>
                      </>
                    )}
                    {entry.rewatch && (
                      <>
                        <span className="text-white/20">·</span>
                        <span className="text-white/55 uppercase text-[9px] tracking-wider">
                          ↺ Rewatch
                        </span>
                      </>
                    )}
                  </div>

                  <h4 className="font-display italic font-light text-2xl sm:text-3xl lg:text-4xl text-[#F5F5F5] tracking-tight leading-[1.08]">
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline underline-offset-4 decoration-white/20 transition-all duration-300"
                    >
                      {entry.filmTitle || entry.title}
                    </a>
                  </h4>

                  {entry.reviewText && (
                    <p className="font-sans font-normal text-xs sm:text-sm text-white/55 leading-relaxed max-w-lg">
                      &ldquo;{entry.reviewText}&rdquo;
                    </p>
                  )}
                </div>

                {/* Thumbnail Column (2 cols) with Soft Scale */}
                <div className="md:col-span-2 flex md:justify-end">
                  <div className="relative w-16 sm:w-20 aspect-[2/3] overflow-hidden border border-white/[0.06] bg-[#0D0D0D] shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
                    <Image
                      src={entry.posterUrl || FALLBACK_POSTER}
                      alt={entry.filmTitle || entry.title}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
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
