"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  /** Gate animation — waits until enabled is true (default: true) */
  enabled?: boolean;
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  y = 40,
  className,
  enabled = true,
}: FadeUpProps) {
  const reduced = useReducedMotion();
  const isTouchDevice = useIsTouchDevice();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  // Mobile: CSS transitions + IntersectionObserver — no Framer Motion overhead
  if (isTouchDevice) {
    return (
      <CSSFadeUp delay={delay} duration={duration} y={y} className={className} enabled={enabled}>
        {children}
      </CSSFadeUp>
    );
  }

  // Desktop: Framer Motion for richer animation control
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      {...(enabled
        ? { whileInView: { opacity: 1, y: 0 } }
        : {})}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/** Lightweight CSS-only fade-up using IntersectionObserver */
function CSSFadeUp({
  children,
  delay,
  duration,
  y,
  className,
  enabled,
}: {
  children: React.ReactNode;
  delay: number;
  duration: number;
  y: number;
  className?: string;
  enabled: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-50px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s`,
        willChange: visible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
