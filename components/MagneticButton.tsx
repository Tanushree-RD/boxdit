"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const scale = useTransform(
    [springX, springY],
    ([latestX, latestY]) => {
      const distance = Math.sqrt(
        (latestX as number) ** 2 + (latestY as number) ** 2
      );
      return 1 + distance * 0.002;
    }
  );

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  const Tag = href ? "a" : "button";
  const extraProps = href ? { href } : { onClick };

  return (
    <motion.div
      style={{ x: springX, y: springY, scale }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Tag
        ref={ref as never}
        className={`inline-flex items-center justify-center cursor-pointer transition-shadow duration-300 ${className} ${isHovered ? "shadow-[0_0_40px_rgba(245,176,0,0.3)]" : ""}`}
        {...extraProps}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
