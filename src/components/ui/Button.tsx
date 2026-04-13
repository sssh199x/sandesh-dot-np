"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

export function Button({
  children,
  variant = "solid",
  href,
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2",
    "rounded-pill px-7 py-3",
    "font-[family-name:var(--font-mono)] text-[0.8125rem] font-medium tracking-[0.04em] uppercase",
    "transition-colors duration-200",
    "cursor-pointer",
    variant === "solid" && [
      "bg-copper text-cream",
      "hover:bg-copper-dark",
    ],
    variant === "ghost" && [
      "border border-copper/40 text-copper",
      "hover:bg-ghost-strong hover:border-copper",
    ],
    className
  );

  const motionProps = {
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
  };

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
