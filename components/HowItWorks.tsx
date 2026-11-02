"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    phase: "Ingestion",
    title: "Public Letterboxd Handle",
    description:
      "Enter your public Letterboxd username. No passwords, credentials, or third-party OAuth permissions required.",
  },
  {
    number: "02",
    phase: "Reconstruction",
    title: "Chronological Ledger",
    description:
      "Our parser ingests your complete ratings spectrum, release year distributions, diary timestamps, and auteur affiliations.",
  },
  {
    number: "03",
    phase: "Accreditation",
    title: "Curated Festival Dossier",
    description:
      "Explore your diagnosed archetype, star histogram, and export high-resolution cinematic passes formatted for social sharing or print.",
  },
];

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

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative mx-auto max-w-6xl px-6 py-36 sm:px-12 sm:py-48">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mb-20 sm:mb-28 border-b border-white/[0.08] pb-10"
      >
        <motion.div variants={fadeUp} custom={0}>
          <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-neutral-500 block mb-4 font-normal">
            03 / METHODOLOGY
          </span>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="text-4xl sm:text-6xl md:text-7xl font-display font-light tracking-tight text-white leading-[0.98]"
        >
          How your year in film is{" "}
          <span className="font-display italic font-light text-neutral-300">
            reconstructed.
          </span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-6 max-w-lg text-sm sm:text-base font-sans font-normal text-neutral-400 leading-relaxed"
        >
          Three transparent stages transforming unstructured Letterboxd logs into an authoritative cinematic dossier.
        </motion.p>
      </motion.div>

      {/* Architectural 3-Column Typographic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] border-b border-white/[0.08]">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            custom={i + 3}
            className="py-10 md:py-0 md:px-10 first:pl-0 last:pr-0 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 block mb-6 font-normal">
                PHASE {step.number} / {step.phase}
              </span>

              <h3 className="font-display font-normal text-2xl sm:text-3xl text-white tracking-tight">
                {step.title}
              </h3>
              <p className="mt-4 font-sans font-normal text-xs sm:text-[13px] leading-relaxed text-neutral-400">
                {step.description}
              </p>
            </div>

            <div className="mt-12 pt-4 flex items-center justify-between font-mono text-[9px] text-neutral-500 uppercase tracking-[0.24em]">
              <span>Status</span>
              <span className="text-neutral-300">Automated</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
