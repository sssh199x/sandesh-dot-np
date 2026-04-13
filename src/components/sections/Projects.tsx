"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { FadeUp } from "@/components/animations/FadeUp";
import { projects } from "@/data/projects";

const cardSizes = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = containerRef.current.querySelectorAll(".project-card");

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          cards.forEach((card) => {
            gsap.from(card, {
              scale: 0.92,
              opacity: 0,
              y: 60,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          });
        },
        "(max-width: 1023px)": () => {
          cards.forEach((card) => {
            gsap.from(card, {
              opacity: 0,
              y: 40,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            });
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <SectionWrapper id="projects" background="#2C2826">
      <FadeUp>
        <SectionHeading heading="Projects" label="Featured Work" dark />
      </FadeUp>

      <div
        ref={containerRef}
        className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8"
      >
        {projects.map((project, i) => (
          <div
            key={project.title}
            className={`project-card ${cardSizes[i]} col-span-1`}
          >
            <motion.div
              whileHover={{
                y: -6,
                boxShadow: "0 8px 40px rgba(184, 115, 51, 0.15)",
              }}
              transition={{ duration: 0.25 }}
              className="group h-full rounded-lg border border-white/[0.06] bg-surface-dark p-6 lg:p-8"
            >
              {/* Placeholder image area */}
              <div className="mb-5 aspect-[16/10] overflow-hidden rounded-md bg-white/[0.03]">
                <div className="flex h-full items-center justify-center">
                  <span className="font-[family-name:var(--font-mono)] text-xs tracking-wider text-cream/30 uppercase">
                    Mockup coming soon
                  </span>
                </div>
              </div>

              {/* Title + link */}
              <div className="mb-2 flex items-center gap-3">
                <h3 className="typ-h2 text-cream">{project.title}</h3>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--font-mono)] text-xs text-copper transition-colors hover:text-copper-light"
                  >
                    ↗
                  </a>
                )}
              </div>

              <p className="typ-body mb-5 text-cream/60">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
