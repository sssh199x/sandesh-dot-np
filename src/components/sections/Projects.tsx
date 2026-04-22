"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { FadeUp } from "@/components/animations/FadeUp";
import { projects } from "@/data/projects";
import { playHoverSound } from "@/lib/sound";

/* 5-card asymmetric grid: 7/5, 5/7, 12 */
const cardSizes = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-12",
];

/* Extract domain from URL for project bar */
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
            gsap.fromTo(
              card,
              { scale: 0.92, opacity: 0, y: 60 },
              {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        },
        "(max-width: 1023px)": () => {
          cards.forEach((card) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        },
      });
    },
    { scope: containerRef }
  );

  /* JS-controlled crossfade: setInterval cycles opacity, CSS transition handles the fade.
     Starts only when card is in viewport (IntersectionObserver), stops when it leaves. */
  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const slideshows = containerRef.current.querySelectorAll<HTMLDivElement>(".slideshow");
    const timers = new Map<Element, number>();
    const currents = new Map<Element, number>();

    const cycle = (el: Element, images: NodeListOf<HTMLImageElement>, delay: number) => {
      const id = window.setTimeout(() => {
        const prev = currents.get(el) ?? 0;
        const next = (prev + 1) % images.length;
        images[prev].style.opacity = "0";
        images[next].style.opacity = "1";
        currents.set(el, next);
        cycle(el, images, 5000); // 4s display + 1s fade
      }, delay);
      timers.set(el, id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const images = el.querySelectorAll<HTMLImageElement>("img");
          if (images.length <= 1) return;

          if (entry.isIntersecting && !timers.has(el)) {
            const offset = parseFloat(el.dataset.offset || "0") * 1000;
            cycle(el, images, 5000 + offset); // first cycle: 5s + card offset
          } else if (!entry.isIntersecting && timers.has(el)) {
            clearTimeout(timers.get(el)!);
            timers.delete(el);
          }
        });
      },
      { rootMargin: "50px" }
    );

    slideshows.forEach((s) => observer.observe(s));
    return () => {
      observer.disconnect();
      timers.forEach((id) => clearTimeout(id));
    };
  }, []);

  return (
    <SectionWrapper id="projects" background="#2C2826">
      <FadeUp>
        <SectionHeading heading="Projects" label="Featured Work" dark />
      </FadeUp>

      <div
        ref={containerRef}
        className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12 lg:gap-7"
      >
        {projects.map((project, i) => {
          const domain = getDomain(project.href);
          const isWide = i === 4;
          const colSpan = cardSizes[i];
          const imgSizes = isWide
            ? "(min-width: 1024px) 80vw, 100vw"
            : colSpan.includes("7")
              ? "(min-width: 1024px) 58vw, 100vw"
              : "(min-width: 1024px) 42vw, 100vw";
          /* Per-card phase offset so slideshows don't sync across cards */
          const cardOffset = [0, 2.3, 4.1, 1.7, 3.5][i] ?? 0;

          return (
            <div
              key={project.title}
              className={`project-card ${cardSizes[i]} col-span-1`}
            >
              <div onMouseEnter={() => playHoverSound()} className="group h-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#302C29] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:[box-shadow:0_12px_48px_rgba(184,115,51,0.12)]">

                {/* Screenshot slideshow with minimal top bar */}
                {project.images.length > 0 && (
                  <div>
                    {/* Minimal project bar — domain + index */}
                    <div className="flex items-center justify-between border-t-[1.5px] border-t-copper/20 border-b border-b-white/[0.06] bg-white/[0.02] px-4 py-2">
                      <span className="font-[family-name:var(--font-mono)] text-[0.5625rem] tracking-widest text-cream/25 uppercase">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {domain && (
                        <span className="font-[family-name:var(--font-mono)] text-[0.5625rem] tracking-wide text-cream/30 transition-colors duration-300 group-hover:text-copper/60">
                          {domain}
                        </span>
                      )}
                    </div>

                    {/* Screenshot crossfade slideshow */}
                    <div
                      className={`slideshow relative overflow-hidden ${isWide ? "aspect-[2/1]" : "aspect-video"}`}
                      data-offset={cardOffset}
                    >
                      {project.images.map((src, imgIdx) => (
                        <Image
                          key={src}
                          src={src}
                          alt={imgIdx === 0 ? `${project.title} screenshot` : ""}
                          fill
                          sizes={imgSizes}
                          className="absolute inset-0 object-cover object-top transition-opacity duration-1000 ease-in-out lg:brightness-[0.85] lg:saturate-[0.9] lg:group-hover:brightness-100 lg:group-hover:saturate-100"
                          loading="lazy"
                          decoding="async"
                          aria-hidden={imgIdx > 0 ? true : undefined}
                          style={{ opacity: imgIdx === 0 ? 1 : 0 }}
                        />
                      ))}
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
