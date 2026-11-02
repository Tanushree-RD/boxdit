"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { InsightCardData } from "@/lib/analytics";

interface InsightsSectionProps {
  insights: InsightCardData[];
}

const FALLBACK_POSTER =
  "https://s.ltrbxd.com/static/img/empty-poster-70-BSf-Pjrh.png";

export function InsightsSection({ insights }: InsightsSectionProps) {
  if (!insights || insights.length === 0) return null;

  return (
    <section className="relative border-t border-white/[0.06] pt-20 sm:pt-28">
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-16 sm:mb-20 border-b border-white/[0.06] font-mono text-[9px] uppercase tracking-[0.3em] text-white/55 font-normal">
        <span>EXHIBIT 06 // CURATORIAL SUPERLATIVES</span>
        <span>Dispatches 01—0{insights.length}</span>
      </div>

      <div className="mb-14 max-w-xl">
        <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#F5F5F5] tracking-tight leading-[0.98]">
          Editorial Superlatives
        </h2>
        <p className="mt-4 font-sans font-normal text-xs sm:text-sm text-white/55 leading-relaxed">
          Curious polarities, outlying obsessions, and definitive milestones uncovered within your historical viewing pattern.
        </p>
      </div>

      {/* Asymmetric Portfolio Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16 sm:gap-y-24 items-start">
        {insights.map((item, i) => {
          let colSpan = "lg:col-span-6";
          if (insights.length === 4) {
            if (i === 0) colSpan = "lg:col-span-7";
            else if (i === 1) colSpan = "lg:col-span-5";
            else if (i === 2) colSpan = "lg:col-span-5";
            else colSpan = "lg:col-span-7";
          } else if (insights.length === 3) {
            if (i === 0) colSpan = "lg:col-span-7";
            else if (i === 1) colSpan = "lg:col-span-5";
            else colSpan = "lg:col-span-12";
          } else if (insights.length === 2) {
            colSpan = "lg:col-span-6";
          }

          const isLargeFeature = (insights.length === 4 && (i === 0 || i === 3)) || (insights.length === 3 && (i === 0 || i === 2));

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`${colSpan} group`}
            >
              {/* Dispatch Meta */}
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-white/55 pb-3 border-b border-white/[0.06] mb-6 font-normal">
                <span>DISPATCH 0{i + 1} {"//"} {item.title}</span>
                <span>Verified</span>
              </div>

              {/* Main Content Layout */}
              {isLargeFeature ? (
                /* Feature Layout: Side-by-Side on sm+ */
                <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                  {item.posterUrl && (
                    <div className="relative w-28 sm:w-36 aspect-[2/3] shrink-0 overflow-hidden border border-white/[0.06] bg-[#0D0D0D]">
                      <Image
                        src={item.posterUrl || FALLBACK_POSTER}
                        alt={item.value}
                        fill
                        sizes="(max-width: 640px) 112px, 144px"
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0 space-y-3">
                    <h3 className="font-display italic font-light text-3xl sm:text-4xl text-[#F5F5F5] tracking-tight leading-[1.05]">
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline underline-offset-4 decoration-white/20"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </h3>
                    <p className="font-sans font-normal text-xs sm:text-sm text-white/55 leading-relaxed">
                      {item.subtitle}
                    </p>

                    {item.link && (
                      <div className="pt-2">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55 hover:text-[#F5F5F5] transition-colors font-normal inline-block"
                        >
                          View Film on Letterboxd ↗
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Companion Layout: Vertical Flow */
                <div className="space-y-4">
                  {item.posterUrl && (
                    <div className="relative w-24 sm:w-28 aspect-[2/3] overflow-hidden border border-white/[0.06] bg-[#0D0D0D]">
                      <Image
                        src={item.posterUrl || FALLBACK_POSTER}
                        alt={item.value}
                        fill
                        sizes="112px"
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                  )}

                  <h3 className="font-display italic font-light text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight leading-[1.08]">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline underline-offset-4 decoration-white/20"
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </h3>

                  <p className="font-sans font-normal text-xs text-white/55 leading-relaxed max-w-md">
                    {item.subtitle}
                  </p>

                  {item.link && (
                    <div className="pt-1">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55 hover:text-[#F5F5F5] transition-colors font-normal inline-block"
                      >
                        View Film on Letterboxd ↗
                      </a>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
