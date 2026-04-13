"use client";

import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "typ-tag inline-block rounded-pill bg-ghost px-3 py-1 text-copper",
        className
      )}
    >
      {children}
    </span>
  );
}
