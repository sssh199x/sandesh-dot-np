"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { FadeUp } from "@/components/animations/FadeUp";
import { experiences } from "@/data/experience";

const TIMELINE_ICON = "/images/signpost-3d.png";

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
        // Fade up the entry — fromTo for Strict Mode safety
        gsap.fromTo(
          entry,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: entry,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Stagger inner reveals — fromTo for Strict Mode safety
        const children = entry.querySelectorAll(".reveal-child");
        children.forEach((child, i) => {
          gsap.fromTo(
            child,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              delay: i * 0.08,
              scrollTrigger: {
                trigger: entry,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Icon pop — scale bounce when timeline reaches it
        const icon = entry.querySelector(".timeline-icon");
        if (icon) {
          gsap.fromTo(
            icon,
            { scale: 0, rotate: -15 },
            {
              scale: 1,
              rotate: 0,
              duration: 0.6,
              ease: "back.out(2.5)",
              scrollTrigger: {
                trigger: entry,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
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
        {/* ===== MOBILE/TABLET ===== */}
        <div className="lg:hidden relative">
          <div
            className="timeline-line absolute left-[16px] sm:left-[18px] top-0 h-full w-[1.5px] origin-top bg-copper/25"
          />

          <ol className="flex flex-col gap-14 sm:gap-16 list-none">
            {experiences.map((exp) => {
              const isActive = exp.endDate === "Present";

              return (
                <li key={exp.company} className="timeline-entry relative pl-12 sm:pl-14">
                  {/* Timeline icon */}
                  <div
                    className={`timeline-icon absolute left-0 top-0 z-10 size-8 sm:size-9 ${
                      isActive ? "opacity-100" : "opacity-65"
                    }`}
                  >
                    <Image
                      src={TIMELINE_ICON}
                      alt=""
                      width={36}
                      height={36}
                      sizes="36px"
                      className="size-full object-contain drop-shadow-sm"
                    />
                  </div>

                  {/* Content — glow wraps only this, not the icon */}
                  <div
                    className={isActive
                      ? "rounded-lg bg-copper/[0.04] px-4 py-3 -mx-2"
                      : ""
                    }
                  >
                    <div className="reveal-child mb-2 flex items-center gap-2">
                      {isActive && (
                        <span className="size-1.5 rounded-full bg-copper animate-pulse-live" />
                      )}
                      <span className="typ-tag tracking-widest text-slate">
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>

                    <h3 className="reveal-child typ-h2 text-charcoal leading-tight">
                      {exp.company}
                    </h3>

                    <p className="reveal-child mt-1 typ-tag font-medium text-copper">
                      {exp.role}
                    </p>

                    <div className="reveal-child my-3 h-px w-8 bg-copper/25" />

                    <p className="reveal-child typ-body text-charcoal/60 leading-[1.75]">
                      {exp.description}
                    </p>

                    <EntryHighlights highlights={exp.highlights} />

                    <div className="reveal-child mt-4 flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <Tag key={t} variant="light">{t}</Tag>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ===== DESKTOP: 3-column grid — year | icon | content ===== */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Scroll-drawn line — centered in the 46px icon column: 180 + 20(gap) + 23 = 223 */}
            <div
              className="timeline-line absolute left-[223px] top-0 h-full w-[1.5px] origin-top bg-copper/25"
            />

            <ol className="flex flex-col gap-20 list-none">
              {experiences.map((exp) => {
                const isActive = exp.endDate === "Present";
                const yearMatch = exp.startDate.match(/\d{4}/);
                const yearFull = yearMatch ? yearMatch[0] : "";
                const yearShort = yearMatch ? `'${yearMatch[0].slice(2)}` : "";

                return (
                  <li
                    key={exp.company}
                    className="timeline-entry grid grid-cols-[180px_46px_1fr] gap-x-5 items-start"
                  >
                    {/* COL 1 — Year + metadata */}
                    <div className="text-right pt-1">
                      <span
                        className="reveal-child block font-[family-name:var(--font-heading)] text-[3.25rem] font-semibold leading-none tracking-tight text-copper/[0.18]"
                        aria-hidden="true"
                      >
                        {yearFull}
                      </span>

                      <div className="reveal-child mt-2 flex items-center justify-end gap-2">
                        {isActive && (
                          <span className="size-1.5 rounded-full bg-copper animate-pulse-live" />
                        )}
                        <span className="typ-tag tracking-widest text-slate">
                          {yearShort} — {isActive ? "Now" : `'${exp.endDate.match(/\d{4}/)?.[0]?.slice(2) ?? exp.endDate}`}
                        </span>
                      </div>

                      <p className="reveal-child mt-1 typ-tag text-[0.625rem] font-medium text-copper/70">
                        {exp.role}
                      </p>
                    </div>

                    {/* COL 2 — Timeline icon */}
                    <div className="relative z-10 flex justify-center pt-1">
                      <div
                        className={`timeline-icon size-10 ${
                          isActive ? "opacity-100" : "opacity-60"
                        }`}
                      >
                        <Image
                          src={TIMELINE_ICON}
                          alt=""
                          width={40}
                          height={40}
                          sizes="40px"
                          className="size-full object-contain drop-shadow-md"
                        />
                      </div>
                    </div>

                    {/* COL 3 — Company + content */}
                    <div
                      className={`relative ${
                        isActive
                          ? "rounded-lg bg-copper/[0.04] px-5 py-4 -mx-5 -my-4"
                          : ""
                      }`}
                    >
                      <h3 className="reveal-child typ-h1 text-charcoal leading-[1.15] tracking-[-0.01em]">
                        {exp.company}
                      </h3>

                      <div className="reveal-child my-4 h-px w-10 bg-copper/25" />

                      <p className="reveal-child typ-body max-w-[580px] text-charcoal/60 leading-[1.8]">
                        {exp.description}
                      </p>

                      <EntryHighlights highlights={exp.highlights} />

                      <div className="reveal-child mt-5 flex flex-wrap gap-1.5">
                        {exp.tech.map((t) => (
                          <Tag key={t} variant="light">{t}</Tag>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/** Shared highlight metrics — used in both mobile and desktop layouts */
function EntryHighlights({ highlights }: { highlights: string[] }) {
  if (highlights.length === 0) return null;

  return (
    <div className="reveal-child mt-3 flex flex-wrap gap-x-4 gap-y-1 lg:gap-x-5 lg:gap-y-1.5">
      {highlights.map((h) => (
        <span
          key={h}
          className="inline-flex items-center gap-1.5 typ-tag font-medium text-copper-dark"
        >
          <span className="size-1 rounded-full bg-copper/40" />
          {h}
        </span>
      ))}
    </div>
  );
}
