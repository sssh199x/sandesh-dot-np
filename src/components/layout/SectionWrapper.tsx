"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/types";

interface SectionWrapperProps {
  id: SectionId;
  children: React.ReactNode;
  className?: string;
  background?: string;
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ id, children, className, background }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        style={background ? { backgroundColor: background } : undefined}
        className={cn(
          "relative w-full",
          "px-[var(--spacing-container-px)]",
          "py-[var(--spacing-section-inner)]",
          className
        )}
      >
        <div className="mx-auto w-full max-w-[1280px]">{children}</div>
      </section>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";
