"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  splitType?: "chars" | "words" | "chars,words";
  stagger?: number;
  duration?: number;
  delay?: number;
  className?: string;
  /** When true, animation fires on scroll into view instead of on mount */
  scrollTriggered?: boolean;
  /** Gate animation — waits until enabled is true (default: true) */
  enabled?: boolean;
}

export function TextReveal({
  children,
  as: Tag = "h1",
  splitType = "chars,words",
  stagger = 0.03,
  duration = 0.8,
  delay = 0,
  className,
  scrollTriggered = false,
  enabled = true,
}: TextRevealProps) {
  const textRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!enabled) return;
      if (!textRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      // Mobile: skip SplitText overhead — simple fade-up on the whole element
      if (isMobile) {
        gsap.fromTo(textRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.6,
            delay,
            ease: "power3.out",
            ...(scrollTriggered && {
              scrollTrigger: {
                trigger: textRef.current,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }),
          }
        );
        return;
      }

      // Desktop: full SplitText char/word reveal
      const split = new SplitText(textRef.current, { type: splitType });

      const targets = splitType.includes("chars") ? split.chars : split.words;

      gsap.fromTo(targets,
        { y: 80, opacity: 0, rotateX: -90 },
        {
        y: 0, opacity: 1, rotateX: 0,
        stagger,
        duration,
        delay,
        ease: "back.out(1.7)",
        ...(scrollTriggered && {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }),
      });

      return () => {
        split.revert();
      };
    },
    { scope: textRef, dependencies: [enabled] }
  );

  return (
    <Tag
      ref={textRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={cn("overflow-hidden", className)}
      style={{ perspective: "500px" }}
    >
      {children}
    </Tag>
  );
}
