"use client";

export function CinematicBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Ultra-faint archival film grain */}
      <div className="film-grain absolute inset-0 opacity-[0.025]" />

      {/* Subtle top edge vignette to ground the page */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.015) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
