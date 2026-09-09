"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  fadeSpeed: number;
}

export function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Minimal particle density: 16-24 particles max
    const particleCount = Math.min(22, Math.max(12, Math.floor((width * height) / 60000)));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const maxOp = Math.random() * 0.05 + 0.05; // 5% to 10% opacity strictly
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -(Math.random() * 0.18 + 0.06), // slow upward drift
        opacity: Math.random() * maxOp,
        maxOpacity: maxOp,
        fadeSpeed: (Math.random() * 0.0015 + 0.0008) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.fadeSpeed;

        if (p.opacity > p.maxOpacity || p.opacity < 0.03) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Wrap edges seamlessly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Neutral warm white particle
        ctx.fillStyle = `rgba(240, 240, 245, ${Math.max(0.04, Math.min(0.1, p.opacity))})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Very subtle animated film grain */}
      <div className="film-grain absolute inset-0 opacity-[0.03] pointer-events-none" />

      {/* Very faint radial spotlight behind hero */}
      <div
        className="absolute top-[18%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[1100px] max-w-full rounded-full opacity-70 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.04) 0%, rgba(255, 128, 0, 0.015) 35%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Canvas for occasional floating particles at 5-10% opacity */}
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
