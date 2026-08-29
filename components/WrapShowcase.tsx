"use client";

import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
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
    <section className="relative mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:px-12">
      {/* Ambient background light behind showcase */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.12),_transparent_70%)] blur-[120px]" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-12 text-center"
      >
        <motion.div
          variants={fadeUp}
          custom={0}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5 text-[11px] font-semibold tracking-[0.25em] text-[#3B82F6] uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
          The Final Artifact
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          A wrap that feels like an art piece
        </motion.h2>
      </motion.div>

      {/* Interactive 3D Showcase Card */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
        custom={2}
        className="mx-auto max-w-3xl"
      >
        <TiltCard
          maxTilt={6}
          glowColor="rgba(59, 130, 246, 0.25)"
          borderColor="border-white/[0.12] hover:border-[#3B82F6]/50"
          className="p-8 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.6)]"
        >
          {/* Header of Preview Wrap */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.1] bg-gradient-to-tr from-[#FF9F1C]/20 via-[#3B82F6]/20 to-[#22C55E]/20 text-white font-black text-sm">
                🎬
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">@alex_cinema</h4>
                  <span className="rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 px-2 py-0.5 text-[10px] font-mono text-[#22C55E]">
                    PRO VERIFIED
                  </span>
                </div>
                <p className="text-[12px] text-zinc-400 font-mono">2024 - 2025 Cinematic Ledger</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-mono text-zinc-500 uppercase">Total Logged</span>
              <div className="text-xl font-black text-brand-gradient">248 Films</div>
            </div>
          </div>

          {/* Core Wrap Content Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {/* Left: Persona & Director */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/[0.06] bg-black/40 p-5">
                <span className="text-[10px] font-mono tracking-widest text-[#FF9F1C] uppercase font-bold">
                  Cinematic Persona
                </span>
                <h5 className="mt-1 text-lg font-extrabold text-white">
                  The Sci-Fi Visionary
                </h5>
                <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">
                  Top 2% in speculative fiction, cerebral world-building, and existential runtime devotion.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-black/40 p-5">
                <span className="text-[10px] font-mono tracking-widest text-[#3B82F6] uppercase font-bold">
                  Top Director Chemistry
                </span>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[15px] font-bold text-white">Denis Villeneuve</span>
                  <span className="font-mono text-xs text-[#3B82F6] font-semibold">9.8/10 Synergy</span>
                </div>
                <div className="mt-1 text-[12px] text-zinc-400">
                  Watched 7 films · Avg 4.6★
                </div>
              </div>
            </div>

            {/* Right: Four Favorite Movies Showcase */}
            <div className="rounded-2xl border border-white/[0.06] bg-black/40 p-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#22C55E] uppercase font-bold">
                  Hall of Fame (4 Favorites)
                </span>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[
                    { title: "Blade Runner 2049", year: "2017", bg: "from-amber-700/60 to-orange-950/80" },
                    { title: "Arrival", year: "2016", bg: "from-blue-700/60 to-slate-950/80" },
                    { title: "Interstellar", year: "2014", bg: "from-cyan-700/60 to-indigo-950/80" },
                    { title: "Dune: Part Two", year: "2024", bg: "from-emerald-700/60 to-green-950/80" },
                  ].map((film) => (
                    <div
                      key={film.title}
                      className={`group/film relative aspect-[2/3] overflow-hidden rounded-xl border border-white/[0.1] bg-gradient-to-b ${film.bg} p-2 flex flex-col justify-end transition-transform duration-200 hover:scale-105`}
                    >
                      <div className="text-[10px] font-bold text-white line-clamp-2 leading-tight">
                        {film.title}
                      </div>
                      <span className="text-[9px] font-mono text-zinc-400">{film.year}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 text-[11px] text-zinc-400 font-mono">
                <span>VIBE: MELANCHOLIC & CEREBRAL</span>
                <span className="text-[#22C55E] font-bold">MATCH: 98%</span>
              </div>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </section>
  );
}
