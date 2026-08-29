"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
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

const steps = [
  {
    number: "01",
    title: "Type your Letterboxd handle",
    description: "No passwords or integrations needed. Simply enter your public Letterboxd username.",
    color: "#FF9F1C",
    tag: "INSTANT INGESTION",
  },
  {
    number: "02",
    title: "Neural engine decodes your taste",
    description: "We scrape watch history, ratings, tags, and reviews to uncover hidden taste patterns.",
    color: "#3B82F6",
    tag: "AI SYNTHESIS",
  },
  {
    number: "03",
    title: "Receive your interactive wrap",
    description: "Explore your interactive profile and download high-resolution posters for social sharing.",
    color: "#22C55E",
    tag: "4K EXPORT",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative mx-auto max-w-[1200px] px-5 py-24 sm:px-8 lg:px-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-16 text-center"
      >
        <motion.div
          variants={fadeUp}
          custom={0}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5 text-[11px] font-semibold tracking-[0.25em] text-[#22C55E] uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          The Flow
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          Three steps to your cinema legacy
        </motion.h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative grid gap-6 md:grid-cols-3"
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            variants={fadeUp}
            custom={i + 2}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#0c0e14]/70 p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.2] hover:bg-[#12151f]/80"
          >
            {/* Corner glow */}
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-30"
              style={{ backgroundColor: step.color }}
            />

            <div>
              <div className="flex items-center justify-between">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border text-base font-black"
                  style={{
                    borderColor: `${step.color}40`,
                    backgroundColor: `${step.color}15`,
                    color: step.color,
                  }}
                >
                  {step.number}
                </span>
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider"
                  style={{
                    backgroundColor: `${step.color}15`,
                    color: step.color,
                  }}
                >
                  {step.tag}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-white group-hover:text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-zinc-400">
                {step.description}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[12px] font-mono text-zinc-500">
              <span>STEP {i + 1} OF 3</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
