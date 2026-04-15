"use client";

import { motion } from "framer-motion";
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

  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2",
    "rounded-pill px-7 py-3",
    "font-[family-name:var(--font-mono)] text-[0.8125rem] font-medium tracking-[0.04em] uppercase",
    "transition-colors duration-200",
    "cursor-pointer",
    "focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none",
    variant === "solid" && [
      "bg-copper-btn text-cream",
      "hover:bg-copper-dark",
    ],
    variant === "ghost" && [
      "border border-copper/40 text-copper-btn",
      "hover:bg-ghost-strong hover:border-copper hover:text-copper-dark",
    ],
    className
  );

  const motionProps = {
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
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
        type="button"
        onClick={handleHashClick}
        className={baseStyles}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }

  // External / non-hash links → regular <a>
  if (href) {
    return (
      <motion.a
        href={href}
        className={baseStyles}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={baseStyles}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
