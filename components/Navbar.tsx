"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#how-it-works" },
  { label: "How It Works", href: "#how-it-works" },
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
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.08] bg-[#060709]/80 backdrop-blur-2xl py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-white/[0.12] bg-gradient-to-br from-[#FF9F1C]/20 via-[#3B82F6]/20 to-[#22C55E]/20 text-xs font-black text-white transition-all duration-300 group-hover:border-white/[0.3] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <span>B</span>
          </div>
          <span className="text-sm font-bold tracking-[0.22em] text-zinc-200 transition-colors duration-200 group-hover:text-white">
            BOXDIT
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden items-center gap-8 text-[13px] font-medium text-zinc-400 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative transition-colors duration-200 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-[#FF9F1C] after:to-[#3B82F6] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <a
          href="#launch"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/[0.12] bg-white/[0.04] px-5 py-2 text-[13px] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-[#3B82F6]/40 hover:bg-[#3B82F6]/10 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          <span>Launch Wrap</span>
        </a>
      </div>
    </motion.header>
  );
}
