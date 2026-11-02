"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.08,
    },
  }),
};

export function WrapShowcase() {
  return (
    <section id="showcase" className="relative mx-auto max-w-6xl px-6 py-36 sm:px-12 sm:py-48">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mb-20 sm:mb-28 border-b border-white/[0.06] pb-10"
      >
        <motion.div variants={fadeUp} custom={0}>
          <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-white/55 block mb-4 font-normal">
            02 / SPECIMEN ARTIFACT
          </span>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="text-4xl sm:text-6xl md:text-7xl font-display font-light tracking-tight text-[#F5F5F5] leading-[0.98]"
        >
          The cinematic ledger,{" "}
          <span className="font-display italic font-light text-white/70">
            revealed.
          </span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-6 max-w-lg text-sm sm:text-base font-sans font-normal text-white/55 leading-relaxed"
        >
          Anatomy of an archival dossier — precision-crafted for critics, filmmakers, and obsessive viewers.
        </motion.p>
      </motion.div>

      {/* Exhibition Specimen: Communicates via Typography */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        custom={3}
        className="border-t border-b border-white/[0.06] py-12 sm:py-16"
      >
        {/* Specimen Masthead */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-8 border-b border-white/[0.06]">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/55 font-normal">
              DOSSIER SPECIMEN // 02
            </span>
            <span className="font-mono text-sm font-normal text-[#F5F5F5]">
              @alex_cinema
            </span>
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest hidden sm:inline">
              Annual Dossier 2026 · Press Accreditation
            </span>
          </div>

          <div className="font-mono text-sm font-light text-[#F5F5F5]">
            248 Films Logged
          </div>
        </div>

        {/* Content Layout */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Archetype Headline */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/55 block mb-2 font-normal">
                Diagnosed Archetype
              </span>
              <h3 className="font-display italic font-light text-3xl sm:text-5xl text-[#F5F5F5] leading-tight">
                &ldquo;The Atmospheric Futurist&rdquo;
              </h3>
            </div>

            <p className="font-sans font-normal text-xs sm:text-sm text-white/55 leading-relaxed max-w-md">
              Heavy predilection for speculative fiction, high-contrast cinematography, and slow existential pacing. Ranked in the top 2% of Letterboxd runtime commitment.
            </p>

            <div className="pt-4 border-t border-white/[0.06] flex items-baseline justify-between font-mono text-xs">
              <span className="text-[10px] uppercase tracking-wider text-white/55">Key Allegiance</span>
              <span className="text-[#F5F5F5] font-normal">Denis Villeneuve (4.6★ mean)</span>
            </div>
          </div>

          {/* Right Column: Four Film Titles as Magazine Headlines */}
          <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-white/[0.06] pt-8 lg:pt-0 lg:pl-12">
            <div className="flex items-baseline justify-between pb-6 border-b border-white/[0.06]">
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/55 font-normal">
                Pinnacle Four / Canonical Pillars
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                Specimen Selection
              </span>
            </div>

            {/* List of Magazine Headline Films */}
            <div className="divide-y divide-white/[0.06]">
              {[
                { title: "Blade Runner 2049", year: "2017", dir: "Denis Villeneuve", rating: "5.0 ★" },
                { title: "Arrival", year: "2016", dir: "Denis Villeneuve", rating: "5.0 ★" },
                { title: "Interstellar", year: "2014", dir: "Christopher Nolan", rating: "4.5 ★" },
                { title: "Dune: Part Two", year: "2024", dir: "Denis Villeneuve", rating: "5.0 ★" },
              ].map((film, idx) => (
                <div key={film.title} className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] text-white/40">0{idx + 1}</span>
                    <h4 className="font-display italic font-light text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight leading-snug group-hover:underline underline-offset-4 decoration-white/20 transition-all">
                      {film.title}
                    </h4>
                  </div>

                  <div className="flex items-baseline gap-3 pl-8 sm:pl-0 font-mono text-xs text-white/55">
                    <span>{film.year}</span>
                    <span>·</span>
                    <span className="text-white/40">{film.dir}</span>
                    <span>·</span>
                    <span className="text-[#F5F5F5] font-normal">{film.rating}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-white/55 uppercase tracking-wider">
              <span>Genre Alignment</span>
              <span className="text-white/70 font-normal">
                Sci-Fi 44% · Drama 32% · Mystery 16%
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
