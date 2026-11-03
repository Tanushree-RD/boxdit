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
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.07,
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
        className="mb-20 sm:mb-28 border-b border-white/[0.06] pb-10"
      >
        <motion.div variants={fadeUp} custom={0}>
          <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-white/55 block mb-4 font-normal">
            03 / METHODOLOGY
          </span>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="text-4xl sm:text-6xl md:text-7xl font-display font-light tracking-tight text-[#F5F5F5] leading-[0.98]"
        >
          How your year in film is{" "}
          <span className="font-display italic font-light text-white/70">
            reconstructed.
          </span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-6 max-w-lg text-sm sm:text-base font-sans font-normal text-white/55 leading-relaxed"
        >
          Three transparent stages transforming unstructured Letterboxd logs into an authoritative cinematic dossier.
        </motion.p>
      </motion.div>

      {/* Architectural 3-Column Typographic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06] border-b border-white/[0.06]">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            custom={i + 3}
            className="py-10 md:py-0 md:px-10 first:pl-0 last:pr-0 flex flex-col justify-between group transition-transform duration-400 ease-out hover:-translate-y-1"
          >
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/55 block mb-6 font-normal">
                PHASE {step.number} / {step.phase}
              </span>

              <h3 className="font-display font-normal text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight">
                {step.title}
              </h3>
              <p className="mt-4 font-sans font-normal text-xs sm:text-[13px] leading-relaxed text-white/55">
                {step.description}
              </p>
            </div>

            <div className="mt-12 pt-4 flex items-center justify-between font-mono text-[9px] text-white/55 uppercase tracking-[0.24em]">
              <span>Status</span>
              <span className="text-white/70">Automated</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
