"use client";

import { motion } from "framer-motion";

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

export function FeatureCards() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-6 py-36 sm:px-12 sm:py-48">
      {/* Section Header: Pure Typographic Pacing */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mb-20 sm:mb-28 border-b border-white/[0.06] pb-10"
      >
        <motion.div variants={fadeUp} custom={0}>
          <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-white/55 block mb-4 font-normal">
            01 / CAPABILITIES
          </span>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="text-4xl sm:text-6xl md:text-7xl font-display font-light tracking-tight text-[#F5F5F5] leading-[0.98]"
        >
          A quiet, rigorous lens on{" "}
          <span className="font-display italic font-light text-white/70">
            taste.
          </span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-6 max-w-lg text-sm sm:text-base font-sans font-normal text-white/55 leading-relaxed"
        >
          No superficial summaries or generic template cards. Boxdit extracts real statistical rigor from your Letterboxd archive.
        </motion.p>
      </motion.div>

      {/* 3-Column Typographic Grid Separated by Hairlines */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06] border-b border-white/[0.06]">
        {/* Column 1 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          custom={3}
          className="py-10 md:py-0 md:px-10 first:pl-0 last:pr-0 flex flex-col justify-between group transition-transform duration-400 ease-out hover:-translate-y-0.5"
        >
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/55 block mb-6 font-normal">
              PLATE 01 / SPECTRUM
            </span>

            <h3 className="font-display font-normal text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight">
              The Critical Curve
            </h3>
            <p className="mt-4 font-sans font-normal text-xs sm:text-[13px] leading-relaxed text-white/55">
              An unvarnished look at your rating tendencies. Discover whether you skew toward generous 4-star adulation or austere critical skepticism.
            </p>

            {/* Micro Chart with Staggered Bars */}
            <div className="mt-10 border-t border-b border-white/[0.06] py-5">
              <div className="flex h-14 items-end justify-between gap-1">
                {[12, 24, 38, 62, 85, 100, 72, 45, 22, 10].map((h, idx) => {
                  const isPeak = idx === 5;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2 + idx * 0.025,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`flex-1 transition-colors duration-200 ${
                        isPeak ? "bg-[#F5F5F5]" : "bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  );
                })}
              </div>
              <div className="mt-3 flex justify-between font-mono text-[8px] text-white/40 uppercase tracking-widest">
                <span>½★</span>
                <span className="text-white/70">Peak 3.5★</span>
                <span>5★</span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-4 flex items-center justify-between font-mono text-[9px] text-white/55 uppercase tracking-[0.24em]">
            <span>Metric</span>
            <span className="text-white/70">True Distribution</span>
          </div>
        </motion.div>

        {/* Column 2 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          custom={4}
          className="py-10 md:py-0 md:px-10 flex flex-col justify-between group transition-transform duration-400 ease-out hover:-translate-y-0.5"
        >
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/55 block mb-6 font-normal">
              PLATE 02 / DIAGNOSIS
            </span>

            <h3 className="font-display font-normal text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight">
              Taste Archetypes
            </h3>
            <p className="mt-4 font-sans font-normal text-xs sm:text-[13px] leading-relaxed text-white/55">
              A literary diagnosis of your cinephilic psyche, narrative themes, and recurring directorial allegiances across cinema history.
            </p>

            {/* Specimen Callout */}
            <div className="mt-10 border-t border-b border-white/[0.06] py-5 space-y-2">
              <span className="font-display italic font-light text-xl text-[#F5F5F5] block">
                &ldquo;The Auteur Loyalist&rdquo;
              </span>
              <p className="font-sans font-normal text-xs text-white/55 leading-relaxed">
                Dominant Allegiances: Denis Villeneuve, Christopher Nolan, David Fincher
              </p>
            </div>
          </div>

          <div className="mt-10 pt-4 flex items-center justify-between font-mono text-[9px] text-white/55 uppercase tracking-[0.24em]">
            <span>Diagnosis</span>
            <span className="text-white/70">Literary Synthesis</span>
          </div>
        </motion.div>

        {/* Column 3 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          custom={5}
          className="py-10 md:py-0 md:px-10 last:pr-0 flex flex-col justify-between group transition-transform duration-400 ease-out hover:-translate-y-0.5"
        >
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/55 block mb-6 font-normal">
              PLATE 03 / EXPORT
            </span>

            <h3 className="font-display font-normal text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight">
              Festival Credentials
            </h3>
            <p className="mt-4 font-sans font-normal text-xs sm:text-[13px] leading-relaxed text-white/55">
              High-resolution, typography-first summary passes designed with restraint for digital sharing or print preservation.
            </p>

            {/* Specimen Box */}
            <div className="mt-10 border-t border-b border-white/[0.06] py-5 text-center">
              <span className="font-mono text-[9px] text-white/55 uppercase tracking-widest block font-normal">
                Accreditation Specimen
              </span>
              <div className="mt-2 font-display italic font-light text-base text-[#F5F5F5]">
                Cinephile Credential
              </div>
              <div className="mt-3 flex justify-center gap-4 font-mono text-[10px] text-white/55">
                <span>405 Films</span>
                <span>·</span>
                <span>3.68★ Avg</span>
                <span>·</span>
                <span>99/100</span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-4 flex items-center justify-between font-mono text-[9px] text-white/55 uppercase tracking-[0.24em]">
            <span>Format</span>
            <span className="text-white/70">Monograph Export</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
