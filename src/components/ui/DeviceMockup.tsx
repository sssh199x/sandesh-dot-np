"use client";

import { useId, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, useGSAP } from "@/lib/gsap";

/* ═══════════════════════════════════════════════════════════
   DeviceMockup — SVG-based MacBook on stone pedestal with
   rotating project screenshots that scroll inside the screen.

   Layers (bottom to top):
   1. Ground shadow — soft ellipse beneath stone
   2. Stone pedestal (natural) — extracted from PSD
   2b. Stone pedestal (warm) — copper-graded, fades in on hover
   3. Project screenshot — full-page, scrolls via GSAP, clipped
   4. Screen reflection gradient
   5. MacBook frame — transparent PNG overlay (notch preserved)

   Animation cycle per project (all GSAP):
     0.0s  — crossfade in
     1.5s  — hold at hero (let viewer absorb the landing)
     1.5s  — begin scrolling top → bottom at ~400 SVG units/s
     ...   — scroll adapts to page length (up to 10s)
     end   — hold at bottom 1.2s, then cycle

   SVG viewBox contains everything — zero overflow.
   ═══════════════════════════════════════════════════════════ */

interface ProjectSlide {
  src: string;
  title: string;
  /** Height/width ratio of the full-page screenshot */
  ratio: number;
}

const projectSlides: ProjectSlide[] = [
  { src: "/images/projects/silverline/silverline.webp", title: "Silverline Education", ratio: 6.501 },
  { src: "/images/projects/kaya/kaya.webp", title: "Kaya E-Commerce", ratio: 6.326 },
  { src: "/images/projects/exosolve/exosolve.webp", title: "Exosolve Analytics", ratio: 6.501 },
  { src: "/images/projects/krofile/krofile.webp", title: "Krofile Platform", ratio: 5.483 },
  { src: "/images/projects/rebuzz/rebuzz.webp", title: "Rebuzz POS", ratio: 4.606 },
];

/* All coordinates in SVG viewBox space (900×695). */
const VB = { x: 0, y: 0, w: 900, h: 695 };
const FRAME = { x: 0, y: 0, w: 900, h: 695 };
const SCREEN = { x: 122, y: 16, w: 591, h: 384 };
const NOTCH = { x: 382, y: 16, w: 70, h: 13 };


const SCREEN_CLIP = [
  `${SCREEN.x},${SCREEN.y}`,
  `${NOTCH.x},${SCREEN.y}`,
  `${NOTCH.x},${NOTCH.y + NOTCH.h}`,
  `${NOTCH.x + NOTCH.w},${NOTCH.y + NOTCH.h}`,
  `${NOTCH.x + NOTCH.w},${SCREEN.y}`,
  `${SCREEN.x + SCREEN.w},${SCREEN.y}`,
  `${SCREEN.x + SCREEN.w},${SCREEN.y + SCREEN.h}`,
  `${SCREEN.x},${SCREEN.y + SCREEN.h}`,
].join(" ");

const STONE = { x: 0, y: 420, w: 900, h: 275 };

/* ── Timing constants ── */
const CROSSFADE  = 0.6;   // seconds — fade between projects
const HOLD_TOP   = 1.5;   // seconds — pause at hero before scrolling
const HOLD_BOT   = 1.2;   // seconds — pause at bottom before next project
const HOLD_STATIC = 3.5;  // seconds — for non-scrollable pages (Kaya)
const SCROLL_SPEED = 400;  // SVG units/s — comfortable reading pace
const MAX_SCROLL  = 10;    // seconds — cap for very long pages

export function DeviceMockup({ animate = true }: { animate?: boolean }) {
  const uid = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const warmStoneRef = useRef<SVGImageElement>(null);
  const shadowRef = useRef<SVGEllipseElement>(null);
  const imgARef = useRef<SVGImageElement>(null);
  const imgBRef = useRef<SVGImageElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const cycleIndexRef = useRef(0);
  const useARef = useRef(true);
  const firstCallRef = useRef(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const isClientRef = useRef(false);

  useEffect(() => { isClientRef.current = true; }, []);

  /* ── Pause/resume timeline when off-screen to save GPU ── */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timelineRef.current?.resume();
        } else {
          timelineRef.current?.pause();
        }
      },
      { threshold: 0 }
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  /* ── Play a single slide: crossfade in → hold → scroll → hold → complete ── */
  const playSlide = useRef<(index: number) => void>(null);

  useGSAP(
    () => {
      if (!isClientRef.current || !animate) return;
      if (!imgARef.current || !imgBRef.current) return;

      const imgA = imgARef.current;
      const imgB = imgBRef.current;

      // Initialize: show first slide on imgA, imgB stays hidden (no href = no fetch)
      const firstSlide = projectSlides[0];
      gsap.set(imgA, {
        attr: { href: firstSlide.src, height: SCREEN.w * firstSlide.ratio },
        y: 0,           // CSS translateY — starts at 0 (SVG y attr handles base position)
        opacity: 1,
        willChange: "transform, opacity",
      });
      gsap.set(imgB, { opacity: 0, willChange: "transform, opacity" });

      playSlide.current = (index: number) => {
        // Kill any running timeline to prevent memory leaks
        if (timelineRef.current) {
          timelineRef.current.kill();
          timelineRef.current = null;
        }

        const slide = projectSlides[index];
        const imgHeight = SCREEN.w * slide.ratio;
        const scrollDistance = imgHeight - SCREEN.h;
        const canScroll = scrollDistance > 10;
        const scrollDuration = canScroll
          ? Math.min(scrollDistance / SCROLL_SPEED, MAX_SCROLL)
          : 0;

        const incoming = useARef.current ? imgA : imgB;
        const outgoing = useARef.current ? imgB : imgA;

        // First call: slide 0 is already visible on imgA — skip crossfade to avoid flash
        const isFirst = firstCallRef.current;
        if (isFirst) {
          firstCallRef.current = false;
        } else {
          // Prep incoming: set source, reset to top, hidden
          gsap.set(incoming, {
            attr: { href: slide.src, height: imgHeight },
            y: 0,           // CSS translateY reset to top
            opacity: 0,
          });
        }

        const tl = gsap.timeline({
          onComplete: () => {
            // Advance to next slide
            const next = (index + 1) % projectSlides.length;
            cycleIndexRef.current = next;
            useARef.current = !useARef.current;
            setActiveIndex(next);
            playSlide.current?.(next);
          },
        });

        // Phase 1: Crossfade (skip on first call — already visible)
        if (!isFirst) {
          tl.to(incoming, { opacity: 1, duration: CROSSFADE, ease: "power2.inOut" }, 0);
          tl.to(outgoing, { opacity: 0, duration: CROSSFADE, ease: "power2.inOut" }, 0);
        }
        const fadeOffset = isFirst ? 0 : CROSSFADE;

        if (canScroll) {
          // Phase 2: Hold at hero — let viewer see the landing page
          // Phase 3: Scroll via CSS translateY — GPU-composited, zero repaints
          tl.to(incoming, {
            y: -scrollDistance,   // CSS translateY (GPU layer) instead of SVG attr
            duration: scrollDuration,
            ease: "power1.inOut",
          }, fadeOffset + HOLD_TOP);

          // Phase 4: Hold at bottom
          tl.to({}, { duration: HOLD_BOT }, fadeOffset + HOLD_TOP + scrollDuration);
        } else {
          // Static page — just hold for a comfortable beat
          tl.to({}, { duration: HOLD_STATIC }, fadeOffset);
        }

        timelineRef.current = tl;
      };

      // Start cycle
      const startTimer = setTimeout(() => playSlide.current?.(0), 600);

      return () => {
        clearTimeout(startTimer);
        if (timelineRef.current) {
          timelineRef.current.kill();
          timelineRef.current = null;
        }
      };
    },
    { scope: svgRef, dependencies: [animate] }
  );

  /* ── Dot click: jump to specific project ── */
  const jumpToSlide = (index: number) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    cycleIndexRef.current = index;
    setActiveIndex(index);
    playSlide.current?.(index);
  };

  /* ── GSAP hover: crossfade to warm stone ── */
  useGSAP(
    () => {
      if (!svgRef.current || !warmStoneRef.current || !shadowRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const warm = warmStoneRef.current;
      const shadow = shadowRef.current;
      let warmLoaded = false;

      const onEnter = () => {
        // Lazy-load warm stone on first hover — saves 53K on initial load
        if (!warmLoaded) {
          warm.setAttribute("href", "/images/macbook-stone-warm.webp");
          warmLoaded = true;
        }
        gsap.to(warm, { opacity: 1, duration: 0.6, ease: "power2.out" });
        gsap.to(shadow, { attr: { rx: 380, ry: 24 }, duration: 0.5, ease: "power2.out" });
      };

      const onLeave = () => {
        gsap.to(warm, { opacity: 0, duration: 0.8, ease: "power2.inOut" });
        gsap.to(shadow, { attr: { rx: 360, ry: 20 }, duration: 0.6, ease: "power2.inOut" });
      };

      const svg = svgRef.current;
      svg.addEventListener("mouseenter", onEnter);
      svg.addEventListener("mouseleave", onLeave);

      return () => {
        svg.removeEventListener("mouseenter", onEnter);
        svg.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: svgRef }
  );

  const current = projectSlides[activeIndex];

  const clipId = `screen-clip-${uid}`;
  const reflectionId = `screen-reflection-${uid}`;
  const shadowGradId = `ground-shadow-${uid}`;

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
        className="w-full h-auto"
        role="img"
        aria-label={`MacBook showing ${current.title}`}
      >
        <defs>
          <clipPath id={clipId}>
            <polygon points={SCREEN_CLIP} />
          </clipPath>
          <linearGradient id={reflectionId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.05" />
            <stop offset="40%" stopColor="white" stopOpacity="0" />
            <stop offset="60%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0.03" />
          </linearGradient>
          <radialGradient id={shadowGradId} cx="50%" cy="50%" rx="50%" ry="50%">
            <stop offset="0%" stopColor="#1A1714" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#1A1714" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1A1714" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Layer 1: Ground shadow */}
        <ellipse
          ref={shadowRef}
          cx={VB.w / 2}
          cy={STONE.y + STONE.h - 10}
          rx={360}
          ry={20}
          fill={`url(#${shadowGradId})`}
        />

        {/* Layer 2: Stone (natural) */}
        <image
          href="/images/macbook-stone.webp"
          x={STONE.x}
          y={STONE.y}
          width={STONE.w}
          height={STONE.h}
        />

        {/* Layer 2b: Stone (warm) — hover crossfade, href set lazily by GSAP on first mouseenter */}
        <image
          ref={warmStoneRef}
          x={STONE.x}
          y={STONE.y}
          width={STONE.w}
          height={STONE.h}
          opacity={0}
        />

        {/* Layer 3: Dual screenshot images — GSAP alternates A/B */}
        <g clipPath={`url(#${clipId})`}>
          <image
            ref={imgARef}
            href={projectSlides[0].src}
            x={SCREEN.x}
            y={SCREEN.y}
            width={SCREEN.w}
            height={SCREEN.w * projectSlides[0].ratio}
            preserveAspectRatio="xMidYMin slice"
          />
          {/* imgB starts without href — GSAP sets it on first cycle, saving one duplicate fetch */}
          <image
            ref={imgBRef}
            x={SCREEN.x}
            y={SCREEN.y}
            width={SCREEN.w}
            height={SCREEN.w * projectSlides[0].ratio}
            preserveAspectRatio="xMidYMin slice"
            opacity={0}
          />

          {/* Screen reflection */}
          <rect
            x={SCREEN.x}
            y={SCREEN.y}
            width={SCREEN.w}
            height={SCREEN.h}
            fill={`url(#${reflectionId})`}
          />
        </g>

        {/* Layer 5: MacBook frame */}
        <image
          href="/images/macbook-frame.webp"
          x={FRAME.x}
          y={FRAME.y}
          width={FRAME.w}
          height={FRAME.h}
        />
      </svg>

      {/* Project indicator */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <div className="flex items-center gap-1.5">
          {projectSlides.map((slide, i) => (
            <button
              key={slide.title}
              onClick={() => jumpToSlide(i)}
              aria-label={`Show ${slide.title}`}
              className={`relative block p-3 cursor-pointer before:block before:size-1.5 before:rounded-full before:transition-all before:duration-300 ${
                i === activeIndex
                  ? "before:scale-125 before:bg-copper"
                  : "before:bg-copper/25 hover:before:bg-copper/40"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.span
            key={current.title}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.3 }}
            className="font-[family-name:var(--font-mono)] text-[0.5625rem] uppercase tracking-[0.08em] text-slate"
          >
            {current.title}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
