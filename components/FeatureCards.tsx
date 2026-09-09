"use client";

import { motion } from "framer-motion";

const features = [
  {
    number: "01",
    title: "Exacting Metrics",
    description:
      "Precision analysis of your logging cadence, release decade distribution, and rating tendencies without vanity fluff.",
  },
  {
    number: "02",
    title: "Taste Archetypes",
    description:
      "A quiet, literary diagnosis of your cinephilic habits, narrative motifs, and director allegiances.",
  },
  {
    number: "03",
    title: "Editorial Artifacts",
    description:
      "High-resolution, typography-first summary cards designed with timeless restraint for digital or print archives.",
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

export function FeatureCards() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-6 py-28 sm:px-8 sm:py-36">
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
          01 // Capabilities
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 text-3xl font-light tracking-[-0.03em] text-white sm:text-4xl md:text-5xl"
        >
          A quiet, rigorous lens on cinema.
        </motion.h2>
      </motion.div>

      {/* Monochrome Cards Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.number}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            custom={i + 2}
            className="group relative flex flex-col justify-between rounded-[22px] border border-white/[0.08] bg-[#0c0c0e]/70 p-8 sm:p-9 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.18] hover:bg-[#121214]/80 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
          >
            <div>
              {/* Number */}
              <span className="font-mono text-xs tracking-widest text-zinc-500 transition-colors duration-200 group-hover:text-zinc-300">
                {feature.number}
              </span>

              {/* Title */}
              <h3 className="mt-8 text-xl font-light tracking-tight text-white sm:text-2xl">
                {feature.title}
              </h3>

              {/* One Sentence */}
              <p className="mt-3 text-[14px] font-light leading-relaxed text-zinc-400">
                {feature.description}
              </p>
            </div>

            {/* Micro hairline corner detail */}
            <div className="mt-10 flex items-center justify-between border-t border-white/[0.05] pt-4 text-zinc-600 group-hover:text-zinc-400 transition-colors">
              <span className="text-[10px] font-mono tracking-widest uppercase">System</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
