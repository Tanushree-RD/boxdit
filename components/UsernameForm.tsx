"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function UsernameForm() {
  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = username.trim();
    if (!trimmed || isLoading) return;
    setIsLoading(true);
    router.push(`/report/${encodeURIComponent(trimmed)}`);
  };

  const handleQuickFill = (name: string) => {
    setUsername(name);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      <form id="launch" onSubmit={handleSubmit} className="relative w-full group">
        {/* Glow ambient halo */}
        <div
          className={`pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#FF9F1C]/20 via-[#3B82F6]/20 to-[#22C55E]/20 blur-xl transition-opacity duration-500 ${
            isFocused ? "opacity-100" : "opacity-30 group-hover:opacity-60"
          }`}
        />

        <div
          className={`relative flex flex-col gap-2 rounded-2xl border bg-[#0e1017]/85 p-2 backdrop-blur-2xl transition-all duration-300 sm:flex-row sm:items-center ${
            isFocused
              ? "border-[#3B82F6]/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
              : "border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-white/[0.14]"
          }`}
        >
          {/* Input field with icon */}
          <div className="flex flex-1 items-center pl-4">
            <span className="text-zinc-500 text-sm select-none mr-2 font-mono">
              letterboxd.com/
            </span>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="username"
              disabled={isLoading}
              aria-label="Letterboxd username"
              className="h-12 w-full border-0 bg-transparent text-[15px] font-medium text-white placeholder:text-zinc-600 focus:outline-none disabled:opacity-50"
            />
          </div>

          {/* Animated Analyze Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!username.trim() || isLoading}
            className="relative inline-flex h-12 min-w-[160px] items-center justify-center overflow-hidden rounded-xl font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9F1C] via-[#3B82F6] to-[#22C55E] animate-gradient-shift" />
            <div className="absolute inset-[1px] rounded-[11px] bg-[#0c0e14]/40 backdrop-blur-sm transition-opacity duration-300 hover:bg-transparent" />

            <span className="relative z-10 flex items-center gap-2 text-[14px] font-bold tracking-wide">
              {isLoading ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Decoding...</span>
                </>
              ) : (
                <>
                  <span>Analyze Wrap</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.2}
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </>
              )}
            </span>
          </motion.button>
        </div>
      </form>

      {/* Suggested profiles / hints */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[12px] text-zinc-500">
        <span>Try sample profile:</span>
        {["davidehrlich", "letterboxd", "karsten"].map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => handleQuickFill(name)}
            className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-zinc-400 transition-colors duration-150 hover:border-[#3B82F6]/40 hover:text-zinc-200"
          >
            @{name}
          </button>
        ))}
      </div>
    </div>
  );
}
