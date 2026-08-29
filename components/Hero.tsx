"use client";

import { motion } from "framer-motion";
import { UsernameForm } from "./UsernameForm";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function Hero() {
  return (
    <section className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center px-5 pt-20 pb-20 text-center sm:px-8 lg:px-12 lg:pt-32">
      {/* Cinematic background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(245,176,0,0.08),_transparent_70%)] blur-3xl" />
        <div className="absolute left-1/3 top-1/2 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,200,87,0.04),_transparent_70%)] blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-[11px] font-medium tracking-[0.24em] text-zinc-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5B000] animate-pulse" />
            Movie taste, decoded
          </div>
        </motion.div>

        {/* Main title */}
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-[200px] w-[400px] rounded-full bg-[#F5B000]/[0.06] blur-[100px]" />
          </div>
          <h1 className="text-[72px] font-black tracking-[0.18em] text-white sm:text-[96px] lg:text-[128px] leading-[0.9]">
            BOXDIT
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-xl font-light text-zinc-300 sm:text-2xl lg:text-3xl"
        >
          Your{" "}
          <span className="text-gold-gradient font-semibold">
            Letterboxd Wrapped
          </span>
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-500"
        >
          Discover your movie taste through beautiful statistics, AI insights,
          and shareable cards. Just enter your Letterboxd username to get
          started.
        </motion.p>

        {/* Search bar */}
        <motion.div variants={itemVariants} className="mt-12 w-full max-w-2xl">
          <UsernameForm />
        </motion.div>
      </motion.div>
    </section>
  );
}
