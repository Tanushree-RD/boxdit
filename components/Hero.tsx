"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { UsernameForm } from "./UsernameForm";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.1,
    },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-[96vh] w-full flex-col justify-between items-center px-6 pt-32 pb-16 text-center sm:px-8">
      {/* Film Strip Notch Watermark */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-4 opacity-20 pointer-events-none select-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-5 w-3 rounded-[2px] border border-white/50" />
        ))}
      </div>
      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-4 opacity-20 pointer-events-none select-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-5 w-3 rounded-[2px] border border-white/50" />
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        {/* Curated Brand Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF8000]/30 bg-[#FF8000]/[0.08] px-4 py-1.5 text-xs font-mono tracking-widest text-[#FF9526] uppercase shadow-lg">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF8000] animate-pulse" />
            <span>Cinematic Taste Intelligence // 2026</span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-balance text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-light tracking-tight text-white leading-[1.02]"
        >
          Your Letterboxd,
          <br />
          <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FF8000] via-[#FFA84D] to-[#EDEDED]">
            distilled into cinema.
          </span>
        </motion.h1>

        {/* Editorial Subtitle */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-balance text-base sm:text-lg font-light leading-relaxed text-zinc-300"
        >
          A quiet, rigorous lens on your cinematic year. Authentic Letterboxd rating curves, era journeys, auteur allegiances, and festival-grade artifacts.
        </motion.p>

        {/* Interactive Search Bar */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-9 w-full"
        >
          <UsernameForm />
        </motion.div>

        {/* Floating Live Dossier Preview (Centerpiece) */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-14 w-full max-w-4xl"
        >
          <div className="relative mx-auto rounded-3xl cinema-panel p-6 sm:p-8 text-left shadow-2xl transition-all duration-300 hover:border-white/[0.18]">
            {/* Ambient inner glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#FF8000]/[0.1] blur-3xl" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-[#00E054]/[0.08] blur-3xl" />

            {/* Dossier Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FF8000]/30 bg-[#FF8000]/[0.08] text-sm font-mono font-bold text-[#FF8000]">
                  ★
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">@karsten</span>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono text-zinc-400">
                      EXEMPLAR DOSSIER
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#00E054] mt-0.5">
                    405 Films Catalogued · 3.68 ★ Mean Rating
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/report/karsten"
                  className="btn-base btn-outlined text-xs py-1.5 h-8 gap-1.5 hover:border-[#FF8000]/40 transition-colors"
                >
                  <span>Inspect Live Dossier</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Dossier Body: Archetype + Live Letterboxd Histogram Teaser */}
            <div className="mt-6 grid gap-6 md:grid-cols-12 items-center">
              {/* Left Column: Archetype */}
              <div className="md:col-span-6 space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#FF8000]">
                  DIAGNOSED ARCHETYPE
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif italic text-white font-normal">
                  &ldquo;The Thoughtful Cinephile&rdquo;
                </h3>
                <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed">
                  Drawn to emotional resonance, visual poetry, and character-driven storytelling. Peak affinity for 2020s independent cinema and existential narratives.
                </p>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-mono text-zinc-400">
                    #Atmospheric Taste
                  </span>
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-mono text-zinc-400">
                    #Visual Poet
                  </span>
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-mono text-zinc-400">
                    #Narrative Empathy
                  </span>
                </div>
              </div>

              {/* Right Column: 10-Bar Histogram Mock */}
              <div className="md:col-span-6 rounded-2xl border border-white/[0.06] bg-[#0E1216]/80 p-4">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                  <span className="text-[10px] uppercase text-zinc-500 tracking-wider">
                    Rating Distribution Curve
                  </span>
                  <span className="text-[#00E054] font-bold">Peak at 4.0 ★</span>
                </div>

                {/* 10 Miniature Bars */}
                <div className="flex h-24 items-end justify-between gap-1.5 px-1">
                  {[8, 12, 18, 32, 45, 75, 95, 120, 80, 50].map((val, idx) => {
                    const isPeak = idx === 7;
                    const labels = ["½★", "1★", "1½", "2★", "2½", "3★", "3½", "4★", "4½", "5★"];
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                        <div
                          className={`w-full rounded-t-[3px] transition-all duration-300 ${
                            isPeak
                              ? "bg-gradient-to-t from-[#00b042] to-[#00ff60] shadow-[0_0_10px_rgba(0,224,84,0.4)]"
                              : "bg-[#00E054]/70 hover:bg-[#00E054]"
                          }`}
                          style={{ height: `${(val / 120) * 100}%` }}
                        />
                        <span className="mt-1.5 text-[8px] font-mono text-zinc-500">
                          {labels[idx]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Index Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="relative z-10 pt-12"
      >
        <a
          href="#features"
          className="group flex flex-col items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase transition-colors hover:text-white"
        >
          <span>Explore Architecture</span>
          <div className="relative h-6 w-px overflow-hidden bg-white/[0.15]">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="h-full w-full bg-[#FF8000]"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
