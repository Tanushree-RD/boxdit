"use client";

import { motion } from "framer-motion";

interface FloatingGlowProps {
  className?: string;
  color?: string;
  blur?: number;
  delay?: number;
  duration?: number;
  children?: React.ReactNode;
}

export function FloatingGlow({
  className = "",
  color = "rgba(245, 176, 0, 0.05)",
  blur = 80,
  delay = 0,
  duration = 20,
  children,
}: FloatingGlowProps) {
  return (
    <motion.div
      className={`pointer-events-none rounded-full ${className}`}
      style={{
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: `blur(${blur}px)`,
      }}
      animate={{
        scale: [1, 1.08, 0.95, 1.04, 1],
        opacity: [0.6, 1, 0.7, 0.9, 0.6],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
