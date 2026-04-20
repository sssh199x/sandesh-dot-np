"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn, smoothScrollTo } from "@/lib/utils";
import { useLenis } from "@/components/layout/SmoothScroll";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { playSound, playHoverSound } from "@/lib/sound";

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
  const reducedMotion = useReducedMotion();

  // On touch devices, skip magnetic hover + motion wrappers entirely
  const isTouchDevice = useIsTouchDevice();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  // Magnetic hover — button gently follows cursor (disabled for touch/reduced motion)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  const handleMouseEnter = () => {
    playHoverSound();
  };

  const handleClick = () => {
    playSound("click");
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || isTouchDevice) return;
    const el = buttonRef.current ?? anchorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    rawX.set(dx * MAGNETIC_FACTOR);
    rawY.set(dy * MAGNETIC_FACTOR);
  };

  const handleMouseLeave = () => {
    if (reducedMotion || isTouchDevice) return;
    rawX.set(0);
    rawY.set(0);
  };

  const baseStyles = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden",
    "rounded-pill px-5 py-2.5 sm:px-7 sm:py-3 min-h-11",
    "font-[family-name:var(--font-mono)] text-[0.75rem] sm:text-[0.8125rem] font-medium tracking-[0.04em] uppercase",
    "cursor-pointer",
    "focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none",
    isTouchDevice && "active:scale-[0.97]",
    "transition-transform",
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

  const handleHashClick = () => {
    if (!isHash) return;
    if (lenis) {
      lenis.scrollTo(href!, { duration: 1.6, easing: scrollEasing, offset: 0 });
    } else {
      smoothScrollTo(href!);
    }
  };

  // Touch devices: plain elements — no motion wrappers, no springs
  if (isTouchDevice) {
    if (isHash) {
      return (
        <button type="button" onClick={() => { handleClick(); handleHashClick(); }} className={baseStyles}>
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        </button>
      );
    }
    if (href) {
      return (
        <a href={href} onClick={handleClick} className={baseStyles}>
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        </a>
      );
    }
    return (
      <button type={type} onClick={() => { handleClick(); onClick?.(); }} className={baseStyles}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }

  // Desktop: motion wrappers with magnetic hover
  const sharedMotionProps = {
    style: reducedMotion ? undefined : { x, y },
    whileTap: reducedMotion ? undefined : { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (isHash) {
    return (
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => { handleClick(); handleHashClick(); }}
        className={baseStyles}
        {...sharedMotionProps}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }

  if (href) {
    return (
      <motion.a
        ref={anchorRef}
        href={href}
        onClick={handleClick}
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
      onClick={() => { handleClick(); onClick?.(); }}
      className={baseStyles}
      {...sharedMotionProps}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
