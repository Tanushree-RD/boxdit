"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const SAMPLE_USERS = [
  {
    username: "karsten",
    name: "Karsten",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    archetype: "The Thoughtful Cinephile",
  },
  {
    username: "davidehrlich",
    name: "David Ehrlich",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    archetype: "The Auteur Loyalist",
  },
  {
    username: "letterboxd",
    name: "Letterboxd Official",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    archetype: "The Canonical Archivist",
  },
];

export function UsernameForm() {
  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = username.trim().replace(/^@/, "");
    if (!trimmed || isLoading) return;
    setIsLoading(true);
    router.push(`/report/${encodeURIComponent(trimmed)}`);
  };

  const handleQuickFill = (name: string) => {
    setUsername(name);
    setIsLoading(true);
    router.push(`/report/${encodeURIComponent(name)}`);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      {/* Search Input Box */}
      <form
        id="launch"
        onSubmit={handleSubmit}
        className={`relative w-full rounded-2xl border transition-all duration-300 ${
          isFocused
            ? "border-[#FF8000]/60 bg-[#12161B]/95 shadow-[0_0_40px_-5px_rgba(255,128,0,0.22)]"
            : "border-white/[0.12] bg-[#101418]/80 hover:border-white/[0.22]"
        } backdrop-blur-xl p-2 sm:p-2.5`}
      >
        <div className="flex items-center gap-3">
          {/* Letterboxd Icon Prefix */}
          <div className="flex items-center gap-2 pl-2 sm:pl-3 select-none text-zinc-400 font-mono text-xs">
            <svg
              className="h-4 w-4 text-[#FF8000]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <span className="hidden sm:inline text-zinc-400 font-mono text-[13px]">letterboxd.com/</span>
            <span className="sm:hidden text-zinc-400 font-mono text-[13px]">@</span>
          </div>

          {/* Input Field */}
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="username"
            disabled={isLoading}
            autoComplete="off"
            spellCheck="false"
            aria-label="Letterboxd username"
            className="h-11 flex-1 border-0 bg-transparent px-1 text-base font-normal tracking-tight text-white placeholder:text-zinc-500 focus:outline-none disabled:opacity-50"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!username.trim() || isLoading}
            className="btn-base btn-filled px-5 py-2.5 h-11 text-xs font-semibold shrink-0 cursor-pointer shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="h-3.5 w-3.5 animate-spin text-current"
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
                <span>Analyzing</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <span>Generate Dossier</span>
                <span className="text-xs">→</span>
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Curated Cinephile Fast-Picks */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-zinc-400 font-mono text-[11px] uppercase tracking-wider mr-1">
          Explore Examples:
        </span>
        {SAMPLE_USERS.map((sample) => (
          <button
            key={sample.username}
            type="button"
            onClick={() => handleQuickFill(sample.username)}
            disabled={isLoading}
            className="group flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-zinc-300 hover:border-[#FF8000]/40 hover:bg-[#FF8000]/[0.06] hover:text-white transition-all cursor-pointer"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#00E054] group-hover:scale-125 transition-transform" />
            <span className="font-mono text-xs">@{sample.username}</span>
            <span className="text-[10px] text-zinc-400 font-serif italic hidden md:inline">
              ({sample.archetype})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
