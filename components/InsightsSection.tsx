"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { InsightCardData } from "@/lib/analytics";

interface InsightsSectionProps {
  insights: InsightCardData[];
}

const FALLBACK_POSTER =
  "https://s.ltrbxd.com/static/img/empty-poster-70-BSf-Pjrh.png";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
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

export function InsightsSection({ insights }: InsightsSectionProps) {
  if (!insights || insights.length === 0) return null;

  return (
    <section>
      {/* Section Headline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14 flex flex-wrap items-baseline justify-between gap-4 border-b border-white/[0.08] pb-8"
      >
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 block mb-2 font-normal">
            CURATORIAL DISPATCHES // SUPERLATIVES
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-light tracking-tight text-white">
            Editorial Superlatives
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-sans font-normal">
            Curious patterns, polarities, and milestones uncovered in your logging behavior
          </p>
        </div>

        <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest hidden sm:inline-block font-normal">
          Dispatches
        </span>
      </motion.div>

      {/* Grid of Curatorial Artifacts with Magazine Headline Titles */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {insights.map((item, i) => {
          return (
            <motion.div
              key={item.id}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border-t border-b border-white/[0.08] py-8 flex flex-col justify-between"
            >
              <div>
                {/* Category Label */}
                <div className="flex items-baseline justify-between border-b border-white/[0.06] pb-4 font-mono text-[9px] uppercase tracking-[0.24em] text-neutral-500 font-normal">
                  <span>{item.title}</span>
                  <span>[ 0{i + 1} ]</span>
                </div>

                {/* Content: Poster + Magazine Headline Title */}
                <div className="my-6 space-y-4">
                  {item.posterUrl ? (
                    <div className="relative h-44 w-28 overflow-hidden border border-white/[0.1] bg-[#121214]">
                      <Image
                        src={item.posterUrl || FALLBACK_POSTER}
                        alt={item.value}
                        fill
                        sizes="112px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : null}

                  <div>
                    <h3
                      title={item.value}
                      className="font-display italic font-normal text-2xl sm:text-3xl text-white leading-tight tracking-tight"
                    >
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
                    <p
                      title={item.subtitle}
                      className="mt-2 font-sans font-normal text-xs text-neutral-400 leading-relaxed"
                    >
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-[9px] text-neutral-500 uppercase tracking-[0.2em] font-normal">
                <span>Verified</span>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    Letterboxd ↗
                  </a>
                ) : (
                  <span>Canonical</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
