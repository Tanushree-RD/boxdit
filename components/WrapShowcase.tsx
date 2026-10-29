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
        <motion.div variants={fadeUp} custom={0} className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00E054]" />
          <span className="text-[11px] font-mono tracking-[0.24em] text-[#00E054] uppercase">
            02 // SPECIMEN ARTIFACT
          </span>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white"
        >
          The cinematic ledger,{" "}
          <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#00E054] via-[#40BCF4] to-white">
            revealed.
          </span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-2 text-sm sm:text-base text-zinc-400 font-light max-w-xl"
        >
          Anatomy of a Boxdit annual dossier — precision-crafted for critics, filmmakers, and obsessive viewers.
        </motion.p>
      </motion.div>

      {/* Editorial Exhibition Specimen Card */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        custom={3}
        className="mx-auto overflow-hidden rounded-3xl cinema-panel p-6 sm:p-10 shadow-2xl"
      >
        {/* Specimen Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.12] bg-[#14181C] text-xs font-mono font-bold text-[#FF8000]">
              01
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">@alex_cinema</span>
                <span className="rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono text-zinc-400">
                  ANNUAL DOSSIER // 2026
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                Cannes / Venice Press Accreditation Series
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
              CATALOGUED VOLUME
            </span>
            <div className="text-2xl font-bold font-mono tracking-tight text-white">
              248 Films Logged
            </div>
          </div>
        </div>

        {/* Specimen Content Columns */}
        <div className="mt-8 grid gap-6 md:grid-cols-12">
          {/* Persona & Archetype (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#12161A]/80 p-6 sm:p-7 md:col-span-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FF8000] shadow-[0_0_8px_#FF8000]" />
                <span className="text-[10px] font-mono tracking-widest text-[#FF9526] uppercase">
                  Diagnosed Archetype
                </span>
              </div>
              <h4 className="mt-3 text-2xl sm:text-3xl font-serif italic text-white font-normal">
                &ldquo;The Atmospheric Futurist&rdquo;
              </h4>
              <p className="mt-3 text-xs sm:text-[13px] font-light leading-relaxed text-zinc-400">
                Heavy predilection for speculative fiction, high-contrast cinematography, and slow existential pacing. Ranked in the top 2% of Letterboxd runtime commitment.
              </p>
            </div>

            <div className="mt-8 border-t border-white/[0.06] pt-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                Key Allegiance
              </span>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="font-semibold text-white">Denis Villeneuve</span>
                <span className="font-mono text-xs text-[#00E054] font-bold">4.6★ mean</span>
              </div>
            </div>
          </div>

          {/* Film Four Favorites (7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#12161A]/80 p-6 sm:p-7 md:col-span-7">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                  Pinnacle Four
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  CANONICAL PILLARS
                </span>
              </div>

              {/* Minimal Four Film Rectangles */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { title: "Blade Runner 2049", year: "2017", dir: "Villeneuve", rating: "5.0 ★" },
                  { title: "Arrival", year: "2016", dir: "Villeneuve", rating: "5.0 ★" },
                  { title: "Interstellar", year: "2014", dir: "Nolan", rating: "4.5 ★" },
                  { title: "Dune: Part Two", year: "2024", dir: "Villeneuve", rating: "5.0 ★" },
                ].map((film) => (
                  <div
                    key={film.title}
                    className="group/film flex aspect-[2/3] flex-col justify-between rounded-xl border border-white/[0.1] bg-[#181D23] p-3.5 transition-all duration-200 hover:border-[#FF8000]/50 hover:bg-[#1E242C] shadow-md"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[10px] text-zinc-500">
                        {film.year}
                      </span>
                      <span className="font-mono text-[9px] text-[#00E054] font-bold">
                        {film.rating}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold leading-tight text-white group-hover/film:text-[#FF8000] transition-colors line-clamp-2">
                        {film.title}
                      </p>
                      <p className="mt-1 text-[10px] font-mono text-zinc-400">
                        {film.dir}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between border-t border-white/[0.06] pt-4 font-mono text-[11px] text-zinc-500 gap-2">
              <span>GENRE CONGRUENCE</span>
              <span className="text-white font-semibold">
                SCI-FI 44% · DRAMA 32% · MYSTERY 16%
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
