"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(255, 159, 28, 0.15)"
  borderColor?: string; // e.g. "group-hover:border-[#FF9F1C]/30"
  maxTilt?: number;
}

export function TiltCard({
  children,
  className = "",
  glowColor = "rgba(59, 130, 246, 0.15)",
  borderColor = "hover:border-white/20",
  maxTilt = 8,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`group relative h-full w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0e14]/75 p-7 backdrop-blur-2xl transition-colors duration-300 ${borderColor} ${className}`}
      >
        {/* Dynamic Specular Sheen Glare */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(450px circle at ${smoothMouseX.get() * 100}% ${
              smoothMouseY.get() * 100
            }%, ${glowColor}, transparent 70%)`,
          }}
        />

        {/* Ambient Corner Light */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40"
          style={{ backgroundColor: glowColor }}
        />

        {/* Inner Content with slight 3D elevation */}
        <div style={{ transform: "translateZ(20px)" }} className="relative z-10 h-full flex flex-col justify-between">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
