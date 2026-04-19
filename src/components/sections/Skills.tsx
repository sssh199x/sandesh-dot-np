"use client";

import { useRef } from "react";
import { Monitor, Server, BarChart3, Database, Cloud, Smartphone } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { skillCategories } from "@/data/skills";

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Monitor className="size-5" />,
  Backend: <Server className="size-5" />,
  "Data Visualization": <BarChart3 className="size-5" />,
  "Database & ORM": <Database className="size-5" />,
  "Cloud & DevOps": <Cloud className="size-5" />,
  Mobile: <Smartphone className="size-5" />,
};

export function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      const cards = gridRef.current.querySelectorAll(".skill-card");

      if (isMobile) {
        // Mobile: single batch animation — 1 ScrollTrigger for all cards
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      } else {
        // Desktop: per-card triggers with skill item stagger
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
      }
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
            <div className="mb-4 flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-md bg-copper/[0.08] text-copper">
                {categoryIcons[cat.category]}
              </span>
              <h3 className="typ-h2 text-cream">{cat.category}</h3>
            </div>
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
