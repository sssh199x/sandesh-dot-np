"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { skillCategories } from "@/data/skills";

export function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = gridRef.current.querySelectorAll(".skill-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        // Stagger skills inside each card
        const skills = card.querySelectorAll(".skill-item");
        gsap.from(skills, {
          opacity: 0,
          x: -10,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.03,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: gridRef }
  );

  return (
    <SectionWrapper id="skills" background="#1E1B19">
      <FadeUp>
        <SectionHeading heading="Skills" label="Tech Stack" dark />
      </FadeUp>

      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillCategories.map((cat) => (
          <div
            key={cat.category}
            className="skill-card rounded-lg border border-white/[0.06] bg-surface-dark p-6"
          >
            <h3 className="typ-h2 mb-4 text-cream">{cat.category}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="skill-item inline-block rounded-pill bg-ghost px-3 py-1 font-[family-name:var(--font-mono)] text-xs tracking-wide text-copper"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
