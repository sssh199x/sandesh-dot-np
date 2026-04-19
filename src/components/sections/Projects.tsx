"use client";

import { useRef } from "react";
import { ArrowUpRight, ShoppingCart, BarChart3, Monitor, Users } from "lucide-react";
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

/* Unique visual identity per project — gradient + icon + pattern */
const projectVisuals = [
  {
    gradient: "from-[#B87333]/20 via-[#D4944D]/10 to-transparent",
    icon: <ShoppingCart className="size-10 sm:size-12" />,
    pattern: "radial-gradient(circle at 80% 20%, rgba(184,115,51,0.12) 0%, transparent 50%)",
    label: "E-Commerce Platform",
  },
  {
    gradient: "from-[#7A8B6F]/20 via-[#7A8B6F]/10 to-transparent",
    icon: <BarChart3 className="size-10 sm:size-12" />,
    pattern: "radial-gradient(circle at 20% 80%, rgba(122,139,111,0.12) 0%, transparent 50%)",
    label: "Analytics Dashboard",
  },
  {
    gradient: "from-[#D4944D]/15 via-[#B87333]/10 to-transparent",
    icon: <Monitor className="size-10 sm:size-12" />,
    pattern: "radial-gradient(circle at 70% 70%, rgba(212,148,77,0.12) 0%, transparent 50%)",
    label: "Retail Solution",
  },
  {
    gradient: "from-[#B87333]/15 via-[#7A8B6F]/10 to-transparent",
    icon: <Users className="size-10 sm:size-12" />,
    pattern: "radial-gradient(circle at 30% 30%, rgba(184,115,51,0.12) 0%, transparent 50%)",
    label: "Business Platform",
  },
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
            <div
              className="group h-full rounded-lg border border-white/[0.06] bg-surface-dark p-6 lg:p-8 transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-1.5 hover:[box-shadow:0_8px_40px_rgba(184,115,51,0.15)]"
            >
              {/* Project visual */}
              <div
                className={`mb-5 aspect-[16/10] overflow-hidden rounded-md bg-gradient-to-br ${projectVisuals[i]?.gradient} relative`}
                style={{ backgroundImage: projectVisuals[i]?.pattern }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <span className="text-copper/40 transition-colors duration-300 group-hover:text-copper/70">
                    {projectVisuals[i]?.icon}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[0.625rem] tracking-widest text-cream/25 uppercase">
                    {projectVisuals[i]?.label}
                  </span>
                </div>
                {/* Decorative grid lines */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: "linear-gradient(rgba(250,247,242,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(250,247,242,0.3) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }} />
              </div>

              {/* Title + link */}
              <div className="mb-2 flex items-center gap-3">
                <h3 className="typ-h2 text-cream">{project.title}</h3>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title}`}
                    className="flex size-11 items-center justify-center rounded-full bg-copper/[0.08] text-copper transition-all duration-200 hover:bg-copper/20"
                  >
                    <ArrowUpRight className="size-4" />
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
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
