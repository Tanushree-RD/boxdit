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
        className="mb-6 sm:mb-8 px-1 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00E054]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#00E054]">
              Taste Anomalies &amp; Milestones
            </span>
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Editorial Superlatives
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Curious patterns, polarities, and milestones uncovered in your logging behavior
          </p>
        </div>

        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline-block">
          RECOGNIZED INSIGHTS
        </span>
      </motion.div>

      {/* Grid of Insight Artifacts */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {insights.map((item, i) => {
          return (
            <motion.div
              key={item.id}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative flex flex-col justify-between rounded-2xl cinema-panel cinema-panel-hover p-6 sm:p-7"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                    {item.title}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF8000]/60" />
                </div>

                {/* Content: Poster + Title */}
                <div className="my-5 flex items-start gap-3.5">
                  {item.posterUrl ? (
                    <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-md border border-white/[0.1] bg-[#14181C] shadow-md group-hover:border-white/[0.25] transition-colors">
                      <Image
                        src={item.posterUrl || FALLBACK_POSTER}
                        alt={item.value}
                        fill
                        sizes="56px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : null}

                  <div className="min-w-0 flex-1">
                    <h3
                      title={item.value}
                      className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug line-clamp-2 group-hover:text-[#FF8000] transition-colors"
                    >
                      {item.value}
                    </h3>
                    <p
                      title={item.subtitle}
                      className="mt-1.5 text-xs text-zinc-400 leading-relaxed line-clamp-2"
                    >
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3.5 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span className="uppercase tracking-wider">VERIFIED SNAPSHOT</span>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#00E054] hover:underline transition-colors"
                  >
                    <span>View Film</span>
                    <span className="text-[9px]">↗</span>
                  </a>
                ) : (
                  <span className="text-zinc-500">CANONICAL</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
