"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Dossier Specimen", href: "#showcase" },
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
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.08] bg-[#090B0E]/85 backdrop-blur-xl py-3.5 shadow-xl"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] text-[11px] font-mono font-bold tracking-widest text-white transition-all duration-200 group-hover:border-[#FF8000]/60 group-hover:text-[#FF8000]">
            B
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold tracking-[0.25em] text-white uppercase">
              BOXDIT
            </span>
            <span className="h-1 w-1 rounded-full bg-[#00E054]" />
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden items-center gap-8 text-[13px] font-normal text-zinc-400 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-colors duration-200 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Pill CTA */}
        <a
          href="#launch"
          className="btn-base btn-filled gap-1.5 text-xs font-semibold px-4 h-9 shadow-md hover:brightness-110 active:scale-95 transition-all"
        >
          <span>Launch Dossier</span>
          <span className="text-xs">→</span>
        </a>
      </div>
    </motion.header>
  );
}
