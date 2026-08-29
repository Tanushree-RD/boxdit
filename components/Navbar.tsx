"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "How it works", href: "#how-it-works" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#070707]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#F5B000]/20 bg-[#F5B000]/8 text-[11px] font-bold tracking-widest text-[#FFC857] transition-all duration-300 group-hover:border-[#F5B000]/40 group-hover:bg-[#F5B000]/15 group-hover:shadow-[0_0_20px_rgba(245,176,0,0.15)]">
            B
          </div>
          <span className="text-sm font-semibold tracking-[0.28em] text-zinc-200 transition-colors duration-200 group-hover:text-white">
            BOXDIT
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-[13px] text-zinc-400 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative transition-colors duration-200 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#F5B000]/50 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#launch"
          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2 text-[13px] font-medium text-zinc-300 transition-all duration-300 hover:border-[#F5B000]/30 hover:bg-[#F5B000]/8 hover:text-[#FFC857] hover:shadow-[0_0_20px_rgba(245,176,0,0.1)]"
        >
          Start now
        </a>
      </div>
    </motion.header>
  );
}
