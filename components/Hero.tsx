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
      delay: i * 0.08,
    },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-[95vh] w-full flex-col justify-between items-center px-6 pt-44 pb-36 text-center sm:px-12 sm:pt-52 sm:pb-44">
      {/* Main Hero Header */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        {/* Curated Volume Notation */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-neutral-500 block mb-8 font-normal">
            01 / ARCHIVAL DOSSIER — VOLUME 2026
          </span>
        </motion.div>

        {/* Hero Title: Thin, Elegant Display Serif */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-balance text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] font-display font-light tracking-tight text-white leading-[0.92]"
        >
          Your Letterboxd,
          <br />
          <span className="font-display italic font-light text-neutral-300">
            distilled into print.
          </span>
        </motion.h1>

        {/* Editorial Subtitle: Neutral Sans Body */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto mt-10 max-w-xl text-balance text-sm sm:text-base font-sans font-normal leading-relaxed text-neutral-400"
        >
          A quiet, rigorous lens on cinematic taste. Authentic Letterboxd rating distributions, era journeys, auteur allegiances, and exhibition-grade dossiers.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-14 w-full"
        >
          <UsernameForm />
        </motion.div>

        {/* Specimen Plate: Communicates via Typography */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-28 w-full max-w-4xl"
        >
          <div className="relative mx-auto border-t border-b border-white/[0.08] py-10 sm:py-14 text-left">
            {/* Specimen Header */}
            <div className="flex flex-wrap items-baseline justify-between gap-4 pb-8 border-b border-white/[0.06]">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 font-normal">
                  SPECIMEN // 01
                </span>
                <span className="font-mono text-sm font-normal text-white">
                  @karsten
                </span>
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest hidden sm:inline">
                  405 Films Catalogued · 3.68 ★ Mean
                </span>
              </div>

              <div>
                <Link
                  href="/report/karsten"
                  className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
                >
                  Inspect Dossier →
                </Link>
              </div>
            </div>

            {/* Specimen Body */}
            <div className="mt-8 grid gap-10 md:grid-cols-12 items-baseline">
              {/* Left Column: Archetype as Magazine Headline */}
              <div className="md:col-span-6 space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 block font-normal">
                  Diagnosed Archetype
                </span>
                <h3 className="font-display italic font-light text-3xl sm:text-4xl text-white leading-tight">
                  &ldquo;The Thoughtful Cinephile&rdquo;
                </h3>
                <p className="font-sans font-normal text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md">
                  Predilection for emotional resonance, visual poetry, and character-driven pacing. High affinity for independent releases and existential literature.
                </p>

                <div className="pt-2 flex flex-wrap gap-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                  <span>Atmospheric</span>
                  <span>/</span>
                  <span>Visual Poetry</span>
                  <span>/</span>
                  <span>Modern Indie</span>
                </div>
              </div>

              {/* Right Column: Monochromatic 10-Bar Distribution Curve */}
              <div className="md:col-span-6 border-l border-white/[0.06] pl-0 md:pl-10">
                <div className="flex items-baseline justify-between font-mono text-xs text-neutral-400 mb-6">
                  <span className="text-[9px] uppercase tracking-[0.28em] text-neutral-500">
                    Rating Curve
                  </span>
                  <span className="text-[10px] text-neutral-400">Peak at 4.0 ★</span>
                </div>

                {/* 10 Architectural Bars */}
                <div className="flex h-28 items-end justify-between gap-2 px-1">
                  {[8, 14, 22, 38, 52, 78, 96, 120, 82, 48].map((val, idx) => {
                    const isPeak = idx === 7;
                    const labels = ["½", "1", "1½", "2", "2½", "3", "3½", "4", "4½", "5"];
                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center justify-end h-full"
                      >
                        <div
                          className={`w-full transition-colors duration-200 ${
                            isPeak
                              ? "bg-white"
                              : "bg-neutral-600 hover:bg-neutral-400"
                          }`}
                          style={{ height: `${(val / 120) * 100}%` }}
                        />
                        <span className="mt-3 font-mono text-[8px] text-neutral-500">
                          {labels[idx]}★
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

      {/* Subtle Scroll Down Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="relative z-10 pt-20"
      >
        <a
          href="#features"
          className="group flex flex-col items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          <span>Scroll to Explore</span>
          <div className="h-8 w-px bg-white/[0.12]" />
        </a>
      </motion.div>
    </section>
  );
}
