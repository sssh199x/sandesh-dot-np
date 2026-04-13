"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const numericMatch = value.match(/^(\d+)(.*)$/);
  const numericValue = numericMatch ? parseInt(numericMatch[1], 10) : null;
  const suffix = numericMatch ? numericMatch[2] : "";

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg bg-surface-light border border-charcoal/[0.06] p-6 text-center",
        className
      )}
    >
      <div className="typ-display text-copper">
        {numericValue !== null ? (
          <CountUpValue
            target={numericValue}
            suffix={suffix}
            animate={isInView}
          />
        ) : (
          <span>{value}</span>
        )}
      </div>
      <p className="typ-caption mt-2">{label}</p>
    </div>
  );
}

function CountUpValue({
  target,
  suffix,
  animate,
}: {
  target: number;
  suffix: string;
  animate: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!animate) return;

    const duration = 1200;
    const startTime = performance.now();

    let frameId: number;
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [animate, target]);

  return (
    <span>
      {current}
      {suffix}
    </span>
  );
}
