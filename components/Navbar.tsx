"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { label: "Capabilities", href: "#features" },
  { label: "Specimen", href: "#showcase" },
  { label: "Methodology", href: "#how-it-works" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#050505]/95 py-5"
          : "border-b border-transparent bg-transparent py-7"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 sm:px-12">
        {/* Brand Wordmark: Quiet, Archival */}
        <Link href="/" className="group flex items-baseline gap-3">
          <span className="font-mono text-[11px] font-normal tracking-[0.32em] text-[#F5F5F5] uppercase transition-colors group-hover:text-white">
            BOXDIT
          </span>
          <span className="hidden sm:inline font-mono text-[9px] tracking-[0.24em] text-white/55 uppercase">
            Ed. 2026
          </span>
        </Link>

        {/* Center Nav Links: Small Uppercase Tracked */}
        <nav className="hidden items-center gap-10 font-mono text-[10px] uppercase tracking-[0.24em] text-white/55 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-colors duration-200 hover:text-[#F5F5F5] font-normal"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#launch"
            className="btn-editorial btn-editorial-ghost font-mono text-[9px] tracking-[0.2em] px-3.5 h-8 uppercase font-normal"
          >
            <span>Dossier Index</span>
            <span className="text-white/40">→</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
