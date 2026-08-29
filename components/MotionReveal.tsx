"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface MotionRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}

function getHiddenStyle(dir: Direction, dist: number) {
  switch (dir) {
    case "up": return { opacity: 0, y: dist };
    case "down": return { opacity: 0, y: -dist };
    case "left": return { opacity: 0, x: dist };
    case "right": return { opacity: 0, x: -dist };
    case "none": return { opacity: 0 };
    default: return { opacity: 0, y: dist };
  }
}

const VISIBLE_STYLE = { opacity: 1, y: 0, x: 0 };

export function MotionReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 40,
  once = true,
  className = "",
  as = "div",
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const hidden = getHiddenStyle(direction, distance);

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      ref={ref}
      initial={hidden}
      animate={isInView ? VISIBLE_STYLE : hidden}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
