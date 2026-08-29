"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  hue: number;
  fadeSpeed: number;
}

export function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isHovered) setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered]);

  // Ambient Star Dust Particles
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

    const particleCount = Math.min(45, Math.floor((width * height) / 30000));
    const particles: Particle[] = [];

    // Hue palettes: Orange (30-40), Blue (210-220), Green (140-150)
    const hues = [35, 215, 145];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.6,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25 - 0.1, // slight upward float
        opacity: Math.random() * 0.4,
        maxOpacity: Math.random() * 0.35 + 0.15,
        hue: hues[Math.floor(Math.random() * hues.length)],
        fadeSpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.fadeSpeed;

        if (p.opacity > p.maxOpacity || p.opacity < 0.05) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${p.opacity})`;
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 65%, ${p.opacity * 0.8})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Noise overlay */}
      <div className="film-grain absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-screen" />

      {/* Cinematic ambient glowing blobs */}
      <div className="absolute -top-[20%] -left-[10%] h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,159,28,0.12),_transparent_70%)] blur-[120px] animate-pulse-glow" />
      <div className="absolute top-[35%] -right-[15%] h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.10),_transparent_70%)] blur-[140px] animate-pulse-glow" style={{ animationDelay: "-2.5s" }} />
      <div className="absolute bottom-[5%] left-[20%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.08),_transparent_70%)] blur-[130px] animate-pulse-glow" style={{ animationDelay: "-5s" }} />

      {/* Interactive Flashlight Glow following mouse */}
      <div
        className="absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.04),_rgba(59,130,246,0.03)_40%,_transparent_70%)] blur-3xl transition-opacity duration-700 ease-out"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Canvas for ambient stardust */}
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full opacity-75" />
    </div>
  );
}
