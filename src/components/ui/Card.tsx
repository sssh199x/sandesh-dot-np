"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export function Card({ children, dark = false, className }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "rounded-lg p-6",
        dark
          ? "bg-surface-dark border border-white/[0.06]"
          : "bg-surface-light border border-charcoal/[0.06] shadow-[0_2px_20px_rgba(26,23,20,0.06)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
