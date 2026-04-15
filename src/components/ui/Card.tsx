"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  variant?: "light" | "dark";
  className?: string;
}

export function Card({ children, variant = "light", className }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "rounded-lg p-6",
        variant === "dark"
          ? "bg-surface-dark border border-white/[0.06]"
          : "bg-surface-light border border-charcoal/[0.06] shadow-warm-md",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
