"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const SAMPLE_USERS = [
  {
    username: "karsten",
    name: "Karsten",
    archetype: "The Thoughtful Cinephile",
  },
  {
    username: "davidehrlich",
    name: "David Ehrlich",
    archetype: "The Auteur Loyalist",
  },
  {
    username: "letterboxd",
    name: "Letterboxd Official",
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
        className={`relative w-full border transition-all duration-300 ${
          isFocused
            ? "border-white/[0.3] bg-[#0E0E10]"
            : "border-white/[0.1] bg-[#0A0A0B] hover:border-white/[0.18]"
        } p-2`}
      >
        <div className="flex items-center gap-2">
          {/* Prefix */}
          <div className="flex items-center pl-3 select-none text-neutral-500 font-mono text-xs font-normal">
            <span className="hidden sm:inline">letterboxd.com/</span>
            <span className="sm:hidden">@</span>
          </div>

          {/* Input Field */}
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="handle"
            disabled={isLoading}
            autoComplete="off"
            spellCheck="false"
            aria-label="Letterboxd username"
            className="h-10 flex-1 border-0 bg-transparent px-2 font-mono text-sm font-normal tracking-tight text-white placeholder:text-neutral-600 focus:outline-none disabled:opacity-40"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!username.trim() || isLoading}
            className="btn-editorial btn-editorial-primary px-4 h-10 text-[10px] tracking-[0.2em] font-medium shrink-0 cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2 font-normal">
                <svg
                  className="h-3 w-3 animate-spin text-current"
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
                    strokeWidth="3"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Accessing</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 font-normal">
                <span>Inspect</span>
                <span>→</span>
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Curated Exemplar Fast-Picks */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
        <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-[0.28em] font-normal">
          Specimens:
        </span>
        {SAMPLE_USERS.map((sample) => (
          <button
            key={sample.username}
            type="button"
            onClick={() => handleQuickFill(sample.username)}
            disabled={isLoading}
            className="group flex items-center gap-2 border border-white/[0.08] bg-transparent px-3 py-1 text-neutral-400 hover:border-white/[0.2] hover:text-white transition-all cursor-pointer font-mono text-[10px] tracking-[0.14em] font-normal"
          >
            <span>@{sample.username}</span>
            <span className="text-neutral-500 font-display italic font-light text-xs hidden md:inline">
              / {sample.archetype}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
