"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/layout/SmoothScroll";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

/** Expo ease-out for buttery long-distance scrolls */
const scrollEasing = (t: number) => 1 - Math.pow(1 - t, 4);

const MAGNETIC_FACTOR = 0.25;
const SPRING_CONFIG = { stiffness: 180, damping: 14, mass: 0.5 };

export function Button({
  children,
  variant = "solid",
  href,
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  const lenis = useLenis();
  const isHash = href?.startsWith("#");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  // Magnetic hover — button gently follows cursor
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = buttonRef.current ?? anchorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    rawX.set(dx * MAGNETIC_FACTOR);
    rawY.set(dy * MAGNETIC_FACTOR);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const baseStyles = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden",
    "rounded-pill px-7 py-3",
    "font-[family-name:var(--font-mono)] text-[0.8125rem] font-medium tracking-[0.04em] uppercase",
    "cursor-pointer",
    "focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none",
    variant === "solid" && [
      "bg-copper-btn text-cream",
      "hover:bg-copper-dark",
    ],
    variant === "ghost" && [
      "border border-copper/30 text-copper-btn",
      "btn-liquid-fill",
    ],
    className
  );

  const sharedMotionProps = {
    style: { x, y },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  // Hash links → Lenis smooth scroll instead of native jump
  if (isHash) {
    const handleHashClick = () => {
      if (lenis) {
        lenis.scrollTo(href!, { duration: 1.6, easing: scrollEasing, offset: 0 });
      } else {
        const el = document.querySelector(href!);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };

    return (
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={handleHashClick}
        className={baseStyles}
        {...sharedMotionProps}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }

  // External / non-hash links → regular <a>
  if (href) {
    return (
      <motion.a
        ref={anchorRef}
        href={href}
        className={baseStyles}
        {...sharedMotionProps}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      className={baseStyles}
      {...sharedMotionProps}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
