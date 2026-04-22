"use client";

import { useId, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, useGSAP } from "@/lib/gsap";

/* ═══════════════════════════════════════════════════════════
   PhoneMockup — SVG-based iPhone 17 with rotating project
   screenshots that scroll inside the screen.

   Layers (bottom to top):
   1. Ground shadow — soft ellipse beneath phone
   2. Project screenshot — full-page, scrolls via GSAP, clipped
   3. Screen reflection gradient
   4. Dynamic Island overlay — real camera/sensor detail from PSD
   5. iPhone frame — transparent WebP (screen area cut out)

   DI extracted separately from PSD composite with camera lens,
   speaker grille, and copper bezel framing preserved as real pixels.

   Same GSAP scroll engine as DeviceMockup — crossfade + scroll.
   Shown on tablet breakpoint (sm → lg), hidden on mobile and desktop.
   ═══════════════════════════════════════════════════════════ */

interface ProjectSlide {
  src: string;
  title: string;
  /** Height/width ratio of the full-page screenshot */
  ratio: number;
}

const projectSlides: ProjectSlide[] = [
  { src: "/images/projects/silverline/silverline-mobile.webp", title: "Silverline Education", ratio: 21.004 },
  { src: "/images/projects/kaya/kaya-mobile.webp", title: "Kaya E-Commerce", ratio: 21.004 },
  { src: "/images/projects/exosolve/exosolve-mobile.webp", title: "Exosolve Analytics", ratio: 21.004 },
  { src: "/images/projects/krofile/krofile-mobile.webp", title: "Krofile Platform", ratio: 21.004 },
  { src: "/images/projects/rebuzz/rebuzz-mobile.webp", title: "Rebuzz POS", ratio: 19.050 },
];

/* All coordinates in SVG viewBox space (500×1027).
   Measured from PSD alpha channel flood-fill analysis.
   Frame uses hard-edged alpha (0 or 255) — no anti-aliased bleed zone.
   SCREEN = exact transparent screen interior boundary. */
const VB = { w: 500, h: 1027 };
const SCREEN = { x: 20, y: 15, w: 459, h: 997 };
const CORNER_R = 55;

/* Dynamic Island overlay — extracted from PSD with camera/sensor detail */
const DI = { x: 184, y: 30, w: 130, h: 39 };

/* ── Timing constants ── */
const CROSSFADE   = 0.6;
const HOLD_TOP    = 1.5;
const HOLD_BOT    = 1.2;
const HOLD_STATIC = 3.5;
const SCROLL_SPEED = 350;  // slightly slower than MacBook — phone feels more intimate
const MAX_SCROLL   = 14;   // higher cap than Mac — mobile pages are 3× taller

export function PhoneMockup({ animate = true }: { animate?: boolean }) {
  const uid = useId();
  const svgRef = useRef<SVGSVGElement>(null);
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

  const playSlide = useRef<(index: number) => void>(null);

  useGSAP(
    () => {
      if (!isClientRef.current || !animate) return;
      if (!imgARef.current || !imgBRef.current) return;

      const imgA = imgARef.current;
      const imgB = imgBRef.current;

      const firstSlide = projectSlides[0];
      gsap.set(imgA, {
        attr: { href: firstSlide.src, height: SCREEN.w * firstSlide.ratio },
        y: 0,
        opacity: 1,
        willChange: "transform, opacity",
      });
      gsap.set(imgB, { opacity: 0, willChange: "transform, opacity" });

      playSlide.current = (index: number) => {
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
          gsap.set(incoming, {
            attr: { href: slide.src, height: imgHeight },
            y: 0,
            opacity: 0,
          });
        }

        const tl = gsap.timeline({
          onComplete: () => {
            const next = (index + 1) % projectSlides.length;
            cycleIndexRef.current = next;
            useARef.current = !useARef.current;
            setActiveIndex(next);
            playSlide.current?.(next);
          },
        });

        if (!isFirst) {
          tl.to(incoming, { opacity: 1, duration: CROSSFADE, ease: "power2.inOut" }, 0);
          tl.to(outgoing, { opacity: 0, duration: CROSSFADE, ease: "power2.inOut" }, 0);
        }
        const fadeOffset = isFirst ? 0 : CROSSFADE;

        if (canScroll) {
          tl.to(incoming, {
            y: -scrollDistance,
            duration: scrollDuration,
            ease: "power1.inOut",
          }, fadeOffset + HOLD_TOP);

          tl.to({}, { duration: HOLD_BOT }, fadeOffset + HOLD_TOP + scrollDuration);
        } else {
          tl.to({}, { duration: HOLD_STATIC }, fadeOffset);
        }

        timelineRef.current = tl;
      };

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

  const jumpToSlide = (index: number) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    cycleIndexRef.current = index;
    setActiveIndex(index);
    playSlide.current?.(index);
  };

  const current = projectSlides[activeIndex];

  const clipId = `phone-screen-clip-${uid}`;
  const reflectionId = `phone-reflection-${uid}`;
  const shadowGradId = `phone-shadow-${uid}`;

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="w-full h-auto"
        role="img"
        aria-label={`iPhone showing ${current.title}`}
      >
        <defs>
          {/* Rounded rectangle clip for screen area */}
          <clipPath id={clipId}>
            <rect
              x={SCREEN.x}
              y={SCREEN.y}
              width={SCREEN.w}
              height={SCREEN.h}
              rx={CORNER_R}
              ry={CORNER_R}
            />
          </clipPath>
          <linearGradient id={reflectionId} x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.06" />
            <stop offset="30%" stopColor="white" stopOpacity="0" />
            <stop offset="70%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0.04" />
          </linearGradient>
          <radialGradient id={shadowGradId} cx="50%" cy="50%" rx="50%" ry="50%">
            <stop offset="0%" stopColor="#1A1714" stopOpacity="0.12" />
            <stop offset="60%" stopColor="#1A1714" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#1A1714" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Layer 1: Ground shadow */}
        <ellipse
          cx={VB.w / 2}
          cy={VB.h - 4}
          rx={190}
          ry={14}
          fill={`url(#${shadowGradId})`}
        />

        {/* Layer 2: Screenshot images — GSAP alternates A/B */}
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
          {/* imgB starts without href — GSAP sets it on first cycle */}
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
            rx={CORNER_R}
            fill={`url(#${reflectionId})`}
          />
        </g>

        {/* Layer 3: Dynamic Island — real camera/sensor hardware from PSD */}
        <image
          href="/images/devices/iphone-di.webp"
          x={DI.x}
          y={DI.y}
          width={DI.w}
          height={DI.h}
        />

        {/* Layer 4: iPhone frame overlay */}
        <image
          href="/images/devices/iphone-frame.webp"
          x={0}
          y={0}
          width={VB.w}
          height={VB.h}
        />
      </svg>

      {/* Project indicator */}
      <div className="mt-2.5 flex items-center justify-center gap-2">
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
            className="font-mono text-[0.5625rem] uppercase tracking-[0.08em] text-slate"
          >
            {current.title}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
