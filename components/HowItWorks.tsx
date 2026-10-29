"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    phase: "INGESTION",
    title: "Public Letterboxd Handle",
    description:
      "Enter your public Letterboxd username. No passwords, credentials, or third-party OAuth permissions required.",
  },
  {
    number: "02",
    phase: "RECONSTRUCTION",
    title: "Chronological Ledger",
    description:
      "Our parser ingests your complete ratings spectrum, release year distributions, diary timestamps, and auteur affiliations.",
  },
  {
    number: "03",
    phase: "ACCREDITATION",
    title: "Curated Festival Dossier",
    description:
      "Explore your diagnosed archetype, star histogram, and export high-resolution cinematic passes formatted for social sharing.",
  },
];

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

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative mx-auto max-w-6xl px-6 py-28 sm:px-8 sm:py-36">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mb-16 sm:mb-20"
      >
        <motion.div variants={fadeUp} custom={0} className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#40BCF4]" />
          <span className="text-[11px] font-mono tracking-[0.24em] text-[#40BCF4] uppercase">
            03 // THE APPARATUS
          </span>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white"
        >
          How your year in film is{" "}
          <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#40BCF4] via-[#00E054] to-white">
            reconstructed.
          </span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-3 text-sm sm:text-base text-zinc-400 font-light max-w-xl"
        >
          Three transparent stages transforming unstructured Letterboxd logs into an authoritative cinematic dossier.
        </motion.p>
      </motion.div>

      {/* Steps Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            custom={i + 3}
            className="group relative flex flex-col justify-between rounded-3xl cinema-panel cinema-panel-hover p-7 sm:p-8"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <span className="font-mono text-xs text-[#40BCF4] font-semibold tracking-wider">
                  STAGE {step.number}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {step.phase}
                </span>
              </div>

              <h3 className="mt-8 text-xl sm:text-2xl font-bold text-white tracking-tight">
                {step.title}
              </h3>

              <p className="mt-3 text-xs sm:text-[13px] font-light leading-relaxed text-zinc-400">
                {step.description}
              </p>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-white/[0.05] pt-4 font-mono text-[10px] text-zinc-500">
              <span className="uppercase tracking-widest">AUTHENTICATION</span>
              <span className="text-zinc-400">0{i + 1} / 03</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
