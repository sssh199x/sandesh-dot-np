"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const sectionColors = [
  { id: "hero", color: "#FAF7F2" },
  { id: "about", color: "#F5F0E8" },
  { id: "experience", color: "#EDE4D4" },
  { id: "projects", color: "#2C2826" },
  { id: "skills", color: "#1E1B19" },
  { id: "teaching", color: "#F5F0E8" },
  { id: "contact", color: "#1A1714" },
];

export function DuskGradient() {
  useGSAP(() => {
    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    sectionColors.forEach(({ id, color }, i) => {
      const el = document.getElementById(id);
      if (!el) return;

      // Set each section's own background as fallback
      gsap.set(el, { backgroundColor: color });

      // Smooth body background transition between sections
      if (i < sectionColors.length - 1) {
        const nextColor = sectionColors[i + 1].color;

        const tween = gsap.to("body", {
          backgroundColor: nextColor,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "bottom 80%",
            end: "bottom 20%",
            scrub: true,
          },
        });

        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      }
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
    };
  });

  return null;
}
