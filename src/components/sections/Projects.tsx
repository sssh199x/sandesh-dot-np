"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { FadeUp } from "@/components/animations/FadeUp";
import { projects } from "@/data/projects";

/* 5-card asymmetric grid: 7/5, 5/7, 12 */
const cardSizes = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-12",
];

/* Extract domain from URL for browser chrome */
function getDomain(url?: string) {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

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
        className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12 lg:gap-7"
      >
        {/* Per-card phase offsets so slideshows don't sync across cards */}
        {projects.map((project, i) => {
          const domain = getDomain(project.href);
          const isWide = i === 4;
          const cardOffset = [0, 2.3, 4.1, 1.7, 3.5][i] ?? 0;

          return (
            <div
              key={project.title}
              className={`project-card ${cardSizes[i]} col-span-1`}
            >
              <div className="group h-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#302C29] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:[box-shadow:0_12px_48px_rgba(184,115,51,0.12)]">

                {/* Browser chrome + screenshot slideshow */}
                {project.images.length > 0 && (
                  <div>
                    {/* Browser chrome bar */}
                    <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
                      {/* macOS traffic lights */}
                      <div className="flex gap-1.5">
                        <span className="size-2.5 rounded-full bg-[#FF5F57]" />
                        <span className="size-2.5 rounded-full bg-[#FFBD2E]" />
                        <span className="size-2.5 rounded-full bg-[#28C840]" />
                      </div>
                      {/* URL bar */}
                      <div className="ml-1 flex-1">
                        <div className="mx-auto w-fit max-w-[220px] rounded-md bg-white/[0.05] px-3 py-0.5">
                          <span className={`block truncate font-[family-name:var(--font-mono)] text-[0.625rem] tracking-wide ${domain ? "text-cream/35 transition-colors duration-300 group-hover:text-copper/60" : "text-cream/20"}`}>
                            {domain || "localhost:3000"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Screenshot crossfade slideshow */}
                    <div className={`relative overflow-hidden ${isWide ? "aspect-[2/1]" : "aspect-video"}`}>
                      {project.images.map((src, imgIdx) => {
                        const count = project.images.length;
                        const isSingle = count <= 1;
                        const duration = count * 5;
                        const delay = imgIdx * 5 + cardOffset;
                        const animName = count <= 3 ? "crossfade-3" : "crossfade-4";

                        return (
                          <Image
                            key={src}
                            src={src}
                            alt={imgIdx === 0 ? `${project.title} screenshot` : ""}
                            fill
                            sizes={isWide ? "(min-width: 1024px) 80vw, 100vw" : "(min-width: 1024px) 55vw, 100vw"}
                            className="absolute inset-0 object-cover object-top lg:brightness-[0.85] lg:saturate-[0.9] lg:group-hover:brightness-100 lg:group-hover:saturate-100"
                            loading="lazy"
                            aria-hidden={imgIdx > 0 ? true : undefined}
                            style={isSingle ? undefined : {
                              animation: `${animName} ${duration}s ease-in-out ${delay}s infinite`,
                              opacity: imgIdx === 0 ? 1 : 0,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="px-5 pt-5 pb-5 sm:px-6 sm:pb-6 lg:px-7 lg:pb-7">
                  {/* Title + link */}
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="typ-h2 text-cream">{project.title}</h3>
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.title}`}
                        className="flex size-8 shrink-0 items-center justify-center rounded-full border border-copper/15 text-copper/50 transition-all duration-200 hover:border-copper/30 hover:bg-copper/10 hover:text-copper focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-[#302C29] outline-none"
                      >
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>

                  <p className="typ-body mb-5 leading-relaxed text-cream/75">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
