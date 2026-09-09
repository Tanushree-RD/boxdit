"use client";

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
      delay: i * 0.12,
    },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] w-full flex-col justify-between items-center px-6 pt-32 pb-10 text-center sm:px-8">
      {/* Spacer to push content into optical center */}
      <div className="hidden sm:block" />

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
        {/* Small Label */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF8000]" />
            <span>Letterboxd Taste Intelligence</span>
          </div>
        </motion.div>

        {/* Huge Statement */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-balance text-5xl font-extralight tracking-[-0.04em] text-white sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.98]"
        >
          Your Letterboxd,
          <br />
          <span className="font-light text-zinc-300">
            beautifully understood.
          </span>
        </motion.h1>

        {/* Short Description */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto mt-7 max-w-xl text-balance text-base font-light leading-relaxed text-zinc-400 sm:text-lg"
        >
          Real statistics. Thoughtful insights. No fake AI fluff.
        </motion.p>

        {/* Search Bar Input */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 w-full"
        >
          <UsernameForm />
        </motion.div>
      </div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="relative z-10 pt-10"
      >
        <a
          href="#features"
          className="group flex flex-col items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase transition-colors hover:text-zinc-300"
        >
          <span>Index</span>
          <div className="relative h-7 w-px overflow-hidden bg-white/[0.12]">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="h-full w-full bg-zinc-300"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
