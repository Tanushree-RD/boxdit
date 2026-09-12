"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Input handle",
    description:
      "Provide your public Letterboxd username. No passwords, credentials, or integrations required.",
  },
  {
    number: "02",
    title: "Parse chronology",
    description:
      "Our parser ingests ratings, release eras, genres, and diary timestamps into a unified ledger.",
  },
  {
    number: "03",
    title: "Review dossier",
    description:
      "Explore your taste breakdown on an interactive canvas and save high-resolution editorial cards.",
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
        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-[11px] font-mono tracking-[0.24em] text-zinc-500 uppercase"
        >
          03 // Methodology
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 text-3xl font-light tracking-[-0.03em] text-white sm:text-4xl md:text-5xl"
        >
          Three movements to synthesis.
        </motion.h2>
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
            custom={i + 2}
            className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#0c0c0e]/60 p-7 sm:p-8 backdrop-blur-sm transition-colors duration-200 hover:border-white/[0.12] hover:bg-[#121214]/60"
          >
            <div>
              <span className="font-mono text-xs tracking-widest text-zinc-500 transition-colors duration-200 group-hover:text-zinc-300">
                Phase {step.number}
              </span>

              <h3 className="mt-8 text-xl font-light tracking-tight text-white sm:text-2xl">
                {step.title}
              </h3>

              <p className="mt-3 text-[14px] font-light leading-relaxed text-zinc-400">
                {step.description}
              </p>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-white/[0.05] pt-4 font-mono text-[10px] text-zinc-600">
              <span className="uppercase tracking-widest">Protocol</span>
              <span>0{i + 1} / 03</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
