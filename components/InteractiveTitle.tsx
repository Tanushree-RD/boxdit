"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

type LetterConfig = {
  char: string;
  color: string;
  glowColor: string;
  types: ("reel" | "popcorn" | "star" | "spark" | "pixel" | "dot" | "frame" | "ticket" | "clapper" | "camera" | "square")[];
};

const LETTERS: LetterConfig[] = [
  {
    char: "B",
    color: "#FF9F1C",
    glowColor: "rgba(255, 159, 28, 0.4)",
    types: ["reel", "popcorn", "star", "spark"],
  },
  {
    char: "O",
    color: "#FFA834",
    glowColor: "rgba(255, 168, 52, 0.4)",
    types: ["reel", "popcorn", "star", "spark"],
  },
  {
    char: "X",
    color: "#60A5FA",
    glowColor: "rgba(96, 165, 250, 0.4)",
    types: ["pixel", "dot", "frame", "spark"],
  },
  {
    char: "D",
    color: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.4)",
    types: ["pixel", "dot", "frame", "star"],
  },
  {
    char: "I",
    color: "#34D399",
    glowColor: "rgba(52, 211, 153, 0.4)",
    types: ["ticket", "clapper", "camera", "square"],
  },
  {
    char: "T",
    color: "#22C55E",
    glowColor: "rgba(34, 197, 94, 0.4)",
    types: ["ticket", "clapper", "camera", "square"],
  },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  size: number;
  color: string;
  type: string;
  life: number;
  maxLife: number;
}

export function InteractiveTitle() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);

  // Resize canvas to match container
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvasRef.current.width = rect.width * dpr;
      canvasRef.current.height = rect.height * dpr;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Particle physics and rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // very gentle downward drag after upward rise
        p.vx *= 0.985;
        p.rotation += p.rotSpeed;
        p.life++;

        const progress = p.life / p.maxLife;
        const opacity = Math.sin(progress * Math.PI) * 0.9;

        if (progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x * dpr, p.y * dpr);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.5;

        drawParticleShape(ctx, p.type, p.size * dpr, p.color);

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Helper to draw geometric/symbolic icons on 60fps canvas
  const drawParticleShape = (
    ctx: CanvasRenderingContext2D,
    type: string,
    s: number,
    color: string
  ) => {
    switch (type) {
      case "reel": {
        // Film reel circle with holes
        ctx.beginPath();
        ctx.arc(0, 0, s, 0, Math.PI * 2);
        ctx.stroke();
        // Spokes
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2;
          ctx.beginPath();
          ctx.arc(Math.cos(angle) * s * 0.5, Math.sin(angle) * s * 0.5, s * 0.22, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "popcorn": {
        // Soft cloud-like kernel
        ctx.beginPath();
        ctx.arc(-s * 0.35, -s * 0.2, s * 0.45, 0, Math.PI * 2);
        ctx.arc(s * 0.35, -s * 0.2, s * 0.45, 0, Math.PI * 2);
        ctx.arc(0, s * 0.3, s * 0.5, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "star": {
        // 4-point sparkle
        ctx.beginPath();
        ctx.moveTo(0, -s * 1.3);
        ctx.quadraticCurveTo(0, 0, s * 1.3, 0);
        ctx.quadraticCurveTo(0, 0, 0, s * 1.3);
        ctx.quadraticCurveTo(0, 0, -s * 1.3, 0);
        ctx.quadraticCurveTo(0, 0, 0, -s * 1.3);
        ctx.fill();
        break;
      }
      case "spark": {
        // Tiny angled spark line
        ctx.beginPath();
        ctx.moveTo(-s * 0.7, -s * 0.7);
        ctx.lineTo(s * 0.7, s * 0.7);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.25, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "pixel":
      case "square": {
        ctx.fillRect(-s * 0.6, -s * 0.6, s * 1.2, s * 1.2);
        break;
      }
      case "dot": {
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.6, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "frame": {
        // Mini film frame rectangle with sprocket notches
        ctx.strokeRect(-s * 0.9, -s * 0.6, s * 1.8, s * 1.2);
        ctx.fillRect(-s * 0.7, -s * 0.7, s * 0.3, s * 0.15);
        ctx.fillRect(s * 0.4, -s * 0.7, s * 0.3, s * 0.15);
        ctx.fillRect(-s * 0.7, s * 0.55, s * 0.3, s * 0.15);
        ctx.fillRect(s * 0.4, s * 0.55, s * 0.3, s * 0.15);
        break;
      }
      case "ticket": {
        // Notched ticket
        ctx.beginPath();
        ctx.rect(-s * 0.9, -s * 0.55, s * 1.8, s * 1.1);
        ctx.stroke();
        // Notch indicator
        ctx.beginPath();
        ctx.arc(-s * 0.9, 0, s * 0.25, -Math.PI / 2, Math.PI / 2);
        ctx.arc(s * 0.9, 0, s * 0.25, Math.PI / 2, -Math.PI / 2);
        ctx.fill();
        break;
      }
      case "clapper": {
        // Clapperboard body + chevron bars
        ctx.strokeRect(-s * 0.8, -s * 0.4, s * 1.6, s * 1.1);
        ctx.fillRect(-s * 0.8, -s * 0.75, s * 1.6, s * 0.35);
        break;
      }
      case "camera": {
        // Camera body and lens
        ctx.strokeRect(-s * 0.7, -s * 0.45, s * 1.4, s * 0.9);
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.28, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(s * 0.7, -s * 0.2);
        ctx.lineTo(s * 1.1, -s * 0.4);
        ctx.lineTo(s * 1.1, s * 0.4);
        ctx.lineTo(s * 0.7, s * 0.2);
        ctx.fill();
        break;
      }
      default: {
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const spawnParticlesForLetter = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>, config: LetterConfig) => {
      const now = Date.now();
      if (now - lastSpawnRef.current < 45) return; // Throttle to maintain elegance & 60fps
      lastSpawnRef.current = now;

      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const targetRect = (e.currentTarget as HTMLElement).getBoundingClientRect();

      // Spawn at cursor or center of target letter relative to container
      const originX = (e.clientX || targetRect.left + targetRect.width / 2) - containerRect.left;
      const originY = (e.clientY || targetRect.top + targetRect.height / 2) - containerRect.top;

      // Spawn 2-4 smooth particles per tick
      const count = Math.floor(Math.random() * 2) + 2;

      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.4; // Upward cone
        const speed = Math.random() * 2.2 + 1.2;
        const randomType = config.types[Math.floor(Math.random() * config.types.length)];

        particlesRef.current.push({
          x: originX + (Math.random() - 0.5) * 20,
          y: originY + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.08,
          size: Math.random() * 4 + 4,
          color: config.color,
          type: randomType,
          life: 0,
          maxLife: Math.floor(Math.random() * 35 + 40), // 40-75 frames (~0.7 - 1.2s)
        });
      }

      // Limit particle array to prevent memory bloat
      if (particlesRef.current.length > 80) {
        particlesRef.current = particlesRef.current.slice(-80);
      }
    },
    []
  );

  return (
    <div
      ref={containerRef}
      className="relative mx-auto inline-flex select-none items-center justify-center px-4 py-8"
    >
      {/* Particle Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-30 h-full w-full overflow-visible"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Atmospheric Multi-Glow Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[140px] w-[260px] -translate-x-[25%] rounded-full bg-[#FF9F1C]/15 blur-[80px]" />
        <div className="h-[140px] w-[260px] rounded-full bg-[#3B82F6]/15 blur-[80px]" />
        <div className="h-[140px] w-[260px] translate-x-[25%] rounded-full bg-[#22C55E]/15 blur-[80px]" />
      </div>

      {/* Letters */}
      <h1 className="relative z-20 flex items-center text-[76px] font-black tracking-[0.14em] sm:text-[110px] md:text-[140px] lg:text-[160px] leading-[0.88]">
        {LETTERS.map((item, index) => (
          <motion.span
            key={item.char}
            onMouseMove={(e) => spawnParticlesForLetter(e, item)}
            onMouseEnter={(e) => spawnParticlesForLetter(e, item)}
            whileHover={{
              y: -4,
              scale: 1.04,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            style={{
              color: item.color,
              textShadow: `0 0 45px ${item.glowColor}, 0 0 15px ${item.glowColor}`,
            }}
            className="inline-block cursor-pointer transition-colors duration-200"
          >
            {item.char}
          </motion.span>
        ))}
      </h1>
    </div>
  );
}
