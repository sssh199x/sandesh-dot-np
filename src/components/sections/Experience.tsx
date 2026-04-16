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
  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Animate all timeline lines (mobile + desktop)
      const lines = containerRef.current.querySelectorAll(".timeline-line");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
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
      });

      const entries = containerRef.current.querySelectorAll(".timeline-entry");
      entries.forEach((entry) => {
        gsap.from(entry, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: entry,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        const children = entry.querySelectorAll(".reveal-child");
        gsap.from(children, {
          opacity: 0,
          y: 15,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: entry,
            start: "top 80%",
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
        {/* ===== MOBILE/TABLET: single-column with left timeline ===== */}
        <div className="lg:hidden relative">
          {/* Scroll-drawn line */}
          <div
            className="timeline-line absolute left-[7px] sm:left-[9px] top-0 h-full w-[1.5px] origin-top bg-copper/25"
          />

          <div className="flex flex-col gap-14 sm:gap-16">
            {experiences.map((exp) => {
              const isActive = exp.endDate === "Present";

              return (
                <div key={exp.company} className="timeline-entry relative pl-8 sm:pl-10">
                  {/* Timeline node */}
                  <div
                    className={`absolute left-0 top-1 size-[15px] rounded-full border-2 sm:left-[1px] sm:size-[17px] ${
                      isActive
                        ? "border-copper bg-copper shadow-[0_0_0_4px_rgba(184,115,51,0.12)]"
                        : "border-copper/40 bg-dusk-experience"
                    }`}
                  />

                  <div className="reveal-child mb-2 flex items-center gap-2">
                    {isActive && (
                      <span className="size-1.5 rounded-full bg-copper animate-pulse-live" />
                    )}
                    <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-widest text-slate uppercase">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>

                  <h3 className="reveal-child typ-h2 text-charcoal leading-tight">
                    {exp.company}
                  </h3>

                  <p className="reveal-child mt-1 font-[family-name:var(--font-mono)] text-[0.6875rem] font-medium tracking-wide text-copper">
                    {exp.role}
                  </p>

                  <p className="reveal-child typ-body mt-3 text-charcoal/60 leading-[1.75]">
                    {exp.description}
                  </p>

                  {exp.highlights.length > 0 && (
                    <div className="reveal-child mt-3 flex flex-wrap gap-x-4 gap-y-1">
                      {exp.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[0.625rem] font-medium tracking-wide text-copper-dark"
                        >
                          <span className="size-1 rounded-full bg-copper/40" />
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="reveal-child mt-4 flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <Tag key={t} variant="light">{t}</Tag>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== DESKTOP: 3-column grid — year | timeline | content ===== */}
        <div className="hidden lg:block">
          {/* The timeline line spans the full height of this wrapper */}
          <div className="relative">
            {/* Scroll-drawn line — positioned over the middle column */}
            <div
              className="timeline-line absolute left-[203px] top-0 h-full w-[1.5px] origin-top bg-copper/25"
            />

            <div className="flex flex-col gap-20">
              {experiences.map((exp) => {
                const isActive = exp.endDate === "Present";
                const yearMatch = exp.startDate.match(/\d{4}/);
                const yearFull = yearMatch ? yearMatch[0] : "";
                const yearShort = yearMatch ? `'${yearMatch[0].slice(2)}` : "";

                return (
                  <div
                    key={exp.company}
                    className="timeline-entry grid grid-cols-[180px_46px_1fr] items-start"
                  >
                    {/* COL 1 — Year + metadata (right-aligned) */}
                    <div className="text-right pt-1">
                      <span className="reveal-child block font-[family-name:var(--font-heading)] text-[3.25rem] font-semibold leading-none tracking-tight text-copper/[0.18]">
                        {yearFull}
                      </span>

                      <div className="reveal-child mt-2 flex items-center justify-end gap-2">
                        {isActive && (
                          <span className="size-1.5 rounded-full bg-copper animate-pulse-live" />
                        )}
                        <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-widest text-slate uppercase">
                          {yearShort} — {isActive ? "Now" : `'${exp.endDate.match(/\d{4}/)?.[0]?.slice(2) ?? exp.endDate}`}
                        </span>
                      </div>

                      <p className="reveal-child mt-1 font-[family-name:var(--font-mono)] text-[0.625rem] font-medium tracking-wide text-copper/70">
                        {exp.role}
                      </p>
                    </div>

                    {/* COL 2 — Timeline node (centered in 46px column) */}
                    <div className="flex justify-center pt-3">
                      <div
                        className={`size-[13px] rounded-full border-2 ${
                          isActive
                            ? "border-copper bg-copper shadow-[0_0_0_4px_rgba(184,115,51,0.12)]"
                            : "border-copper/40 bg-dusk-experience"
                        }`}
                      />
                    </div>

                    {/* COL 3 — Company + content */}
                    <div className="relative">
                      {isActive && (
                        <div className="absolute -inset-5 -z-10 rounded-xl bg-copper/[0.04]" />
                      )}

                      <h3 className="reveal-child typ-h1 text-charcoal leading-[1.15] tracking-[-0.01em]">
                        {exp.company}
                      </h3>

                      <div className="reveal-child my-4 h-px w-10 bg-copper/25" />

                      <p className="reveal-child typ-body max-w-[580px] text-charcoal/60 leading-[1.8]">
                        {exp.description}
                      </p>

                      {exp.highlights.length > 0 && (
                        <div className="reveal-child mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                          {exp.highlights.map((h) => (
                            <span
                              key={h}
                              className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[0.6875rem] font-medium tracking-wide text-copper-dark"
                            >
                              <span className="size-1 rounded-full bg-copper/40" />
                              {h}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="reveal-child mt-5 flex flex-wrap gap-1.5">
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
        </div>
      </div>
    </SectionWrapper>
  );
}
