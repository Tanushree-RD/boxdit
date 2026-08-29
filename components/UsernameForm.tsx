"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function UsernameForm() {
  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedUsername = username.trim();
    if (!trimmedUsername) return;
    router.push(`/report/${encodeURIComponent(trimmedUsername)}`);
  };

  return (
    <form id="launch" onSubmit={handleSubmit} className="w-full">
      <div
        className={`relative flex flex-col gap-3 rounded-2xl border bg-white/[0.02] p-2 transition-all duration-500 sm:flex-row sm:items-center sm:justify-between ${
          isFocused
            ? "border-[#F5B000]/25 shadow-[0_0_40px_rgba(245,176,0,0.08)]"
            : "border-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
        }`}
      >
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter your Letterboxd username"
          aria-label="Letterboxd username"
          className="h-14 flex-1 border-0 bg-transparent px-5 text-[15px] text-white placeholder:text-zinc-500 focus:outline-none"
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!username.trim()}
          className="inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-[#F5B000] to-[#FFC857] px-8 text-sm font-bold text-[#070707] shadow-[0_4px_20px_rgba(245,176,0,0.25)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(245,176,0,0.35)] disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none"
        >
          Analyze Profile
        </motion.button>
      </div>
    </form>
  );
}
