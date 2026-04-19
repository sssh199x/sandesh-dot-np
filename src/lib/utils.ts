import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Lightweight programmatic smooth scroll — fires on demand, zero idle cost.
 * Used as fallback when Lenis is disabled (mobile/touch devices).
 * Duration adapts to distance for a natural feel.
 */
export function smoothScrollTo(
  target: HTMLElement | string,
  { duration, offset = 0 }: { duration?: number; offset?: number } = {}
) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;

  const start = window.scrollY;
  const end = el.getBoundingClientRect().top + start + offset;
  const distance = Math.abs(end - start);

  // Adaptive duration: short hops feel snappy, long jumps feel cinematic
  const ms = duration ?? Math.min(1400, Math.max(600, distance * 0.35));
  const startTime = performance.now();

  // EaseOutQuart — fast departure, gentle arrival
  const ease = (t: number) => 1 - Math.pow(1 - t, 4);

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / ms, 1);
    window.scrollTo(0, start + (end - start) * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}
