"use client";

import { motion } from "framer-motion";
import { InteractiveTitle } from "./InteractiveTitle";
import { UsernameForm } from "./UsernameForm";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] w-full flex-col items-center justify-center px-5 pt-28 pb-16 text-center sm:px-8 lg:px-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex w-full max-w-5xl flex-col items-center"
      >
        {/* Cinematic Badge */}
        <motion.div variants={itemVariants}>
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-[11px] font-semibold tracking-[0.28em] text-zinc-300 uppercase backdrop-blur-xl shadow-[0_0_20px_rgba(255,159,28,0.08)]">
            <span className="h-2 w-2 rounded-full bg-[#FF9F1C] animate-pulse" />
            Movie taste, decoded
          </div>
        </motion.div>

        {/* Large Interactive BOXDIT Title with particle emitter */}
        <motion.div variants={itemVariants} className="w-full">
          <InteractiveTitle />
        </motion.div>

        {/* Subtitle / Pitch */}
        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-2xl text-lg font-normal leading-relaxed text-zinc-300 sm:text-xl md:text-2xl mt-2"
        >
          Turn your Letterboxd profile into a{" "}
          <span className="font-semibold text-brand-gradient">
            cinematic wrap
          </span>{" "}
          powered by real data and AI.
        </motion.p>

        {/* Search / Username Input Component */}
        <motion.div variants={itemVariants} className="mt-10 w-full">
          <UsernameForm />
        </motion.div>
      </motion.div>

      {/* Bouncing Scroll Cue */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <a href="#features" className="flex flex-col items-center gap-1.5 group">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500 group-hover:text-zinc-300 transition-colors">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02]"
          >
            <svg
              className="h-3.5 w-3.5 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
