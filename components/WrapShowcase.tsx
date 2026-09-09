"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.1,
    },
  }),
};

export function WrapShowcase() {
  return (
    <section id="showcase" className="relative mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mb-14"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-[11px] font-mono tracking-[0.24em] text-zinc-500 uppercase"
        >
          02 // Artifact
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 text-3xl font-light tracking-[-0.03em] text-white sm:text-4xl md:text-5xl"
        >
          The cinematic ledger.
        </motion.h2>
      </motion.div>

      {/* Editorial Exhibition Specimen Card */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        custom={2}
        className="mx-auto overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#0c0c0e]/80 p-6 sm:p-10 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      >
        {/* Specimen Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] text-xs font-mono text-zinc-300">
              01
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">@alex_cinema</span>
                <span className="rounded-full border border-white/[0.1] bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                  ANNUAL DOSSIER
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-500 mt-0.5">2024 Viewing Index</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-zinc-500">Logged Volumes</span>
            <div className="text-xl font-light tracking-tight text-white">248 Films</div>
          </div>
        </div>

        {/* Specimen Content Columns */}
        <div className="mt-8 grid gap-6 md:grid-cols-12">
          {/* Persona & Archetype (5 cols) */}
          <div className="flex flex-col justify-between rounded-xl border border-white/[0.05] bg-[#111114]/50 p-6 md:col-span-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF8000]" />
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                  Archetype Identified
                </span>
              </div>
              <h4 className="mt-3 text-2xl font-light tracking-tight text-white">
                The Atmospheric Futurist
              </h4>
              <p className="mt-3 text-[13px] font-light leading-relaxed text-zinc-400">
                Heavy predilection for speculative fiction, high-contrast cinematography, and slow existential pacing. Top 2% in runtime commitment.
              </p>
            </div>

            <div className="mt-8 border-t border-white/[0.05] pt-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Key Allegiance</span>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="font-normal text-zinc-200">Denis Villeneuve</span>
                <span className="font-mono text-xs text-zinc-400">4.6★ avg</span>
              </div>
            </div>
          </div>

          {/* Film Four Favorites (7 cols) */}
          <div className="flex flex-col justify-between rounded-xl border border-white/[0.05] bg-[#111114]/50 p-6 md:col-span-7">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                  Pinnacle Four
                </span>
                <span className="text-[10px] font-mono text-zinc-500">CANONICAL SELECTION</span>
              </div>

              {/* Minimal Four Film Rectangles */}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { title: "Blade Runner 2049", year: "2017", dir: "Villeneuve" },
                  { title: "Arrival", year: "2016", dir: "Villeneuve" },
                  { title: "Interstellar", year: "2014", dir: "Nolan" },
                  { title: "Dune: Part Two", year: "2024", dir: "Villeneuve" },
                ].map((film) => (
                  <div
                    key={film.title}
                    className="group/film flex aspect-[2/3] flex-col justify-between rounded-lg border border-white/[0.08] bg-[#141418] p-3 transition-colors duration-200 hover:border-white/[0.2]"
                  >
                    <span className="font-mono text-[10px] text-zinc-600 group-hover/film:text-zinc-400">
                      {film.year}
                    </span>
                    <div>
                      <p className="text-xs font-normal leading-tight text-white line-clamp-2">
                        {film.title}
                      </p>
                      <p className="mt-1 text-[10px] font-mono text-zinc-500">
                        {film.dir}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/[0.05] pt-4 font-mono text-[11px] text-zinc-500">
              <span>GENRE CONGRUENCE</span>
              <span className="text-zinc-300">SCI-FI 44% · DRAMA 32%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
