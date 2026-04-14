"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { FadeUp } from "@/components/animations/FadeUp";
import { experiences } from "@/data/experience";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!lineRef.current || !containerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Timeline line draws on scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        }
      );

      // Cards reveal as timeline progresses
      const cards = containerRef.current.querySelectorAll(".timeline-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: i % 2 === 0 ? -30 : 30,
          y: 40,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <SectionWrapper id="experience" background="#EDE4D4">
      <FadeUp>
        <SectionHeading heading="Experience" label="Career Path" />
      </FadeUp>

      <div ref={containerRef} className="relative">
        {/* Copper timeline line */}
        <div
          ref={lineRef}
          className="absolute left-[11px] top-0 h-full w-[2px] origin-top bg-copper/30 sm:left-[15px] lg:left-[25px]"
        />

        {/* Role cards */}
        <div className="flex flex-col gap-10 sm:gap-14 lg:gap-20">
          {experiences.map((exp) => {
            // Extract abbreviated start year: "Jan 2026" → "'26"
            const yearMatch = exp.startDate.match(/\d{4}/);
            const yearLabel = yearMatch ? `'${yearMatch[0].slice(2)}` : "";

            return (
            <div
              key={exp.company}
              className="timeline-card relative pl-10 sm:pl-12 lg:pl-16"
            >
              {/* Year circle on timeline */}
              <div className="absolute left-0 top-0.5 flex size-6 items-center justify-center rounded-full border-[1.5px] border-copper bg-dusk-experience sm:left-0.5 sm:size-7 lg:left-2.5 lg:size-8">
                <span className="font-[family-name:var(--font-mono)] text-[9px] font-medium tracking-tight text-copper sm:text-[10px]">
                  {yearLabel}
                </span>
              </div>

              {/* Card content */}
              <div className="rounded-lg border border-charcoal/[0.06] bg-surface-light p-4 shadow-[0_2px_16px_rgba(26,23,20,0.04)] sm:p-6 lg:p-8">
                <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="typ-h2 text-charcoal">{exp.company}</h3>
                  <span className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-slate">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>

                <p className="mb-3 font-[family-name:var(--font-mono)] text-xs font-medium tracking-wide text-copper">
                  {exp.role}
                </p>

                <p className="typ-body text-charcoal/70 mb-4">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <Tag key={t} variant="light">{t}</Tag>
                  ))}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
