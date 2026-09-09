"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
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
          ? "border-b border-white/[0.06] bg-[#080808]/85 backdrop-blur-xl py-3.5"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-[11px] font-mono tracking-widest text-zinc-200 transition-colors duration-200 group-hover:border-white/[0.25] group-hover:text-white">
            B
          </span>
          <span className="text-xs font-medium tracking-[0.24em] text-zinc-300 uppercase transition-colors duration-200 group-hover:text-white">
            BOXDIT
          </span>
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
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-4 py-1.5 text-xs font-normal tracking-wide text-zinc-300 backdrop-blur-sm transition-all duration-200 hover:border-white/[0.28] hover:bg-white/[0.07] hover:text-white"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF8000]" />
          <span>Launch Wrap</span>
        </a>
      </div>
    </motion.header>
  );
}
