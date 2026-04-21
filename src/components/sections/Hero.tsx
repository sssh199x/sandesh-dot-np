"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Download, Globe, Layers } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";
import { useNavigationStore } from "@/store/navigation";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const introComplete = useNavigationStore((s) => s.introComplete);

  // Skip PeekAvatar mount entirely on mobile — avoids 150 lines of unused animation code
  const isDesktop = !useIsTouchDevice();

  // Reduced motion check for ambient animations
  const prefersReducedMotion = useReducedMotion();

  // Scroll-driven fade + scale for cinematic recession
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 600], [0, 60]);

  // Pause scroll indicator animation when hero is invisible
  const [heroVisible, setHeroVisible] = useState(true);
  useMotionValueEvent(heroOpacity, "change", (v) => setHeroVisible(v > 0.1));

  // Single GSAP timeline — frame-perfect choreography
  useGSAP(
    () => {
      if (!sectionRef.current) return;

     // Immediately hide everything except the name (before intro completes).
      // Keeping hero-name visible preserves LCP — Lighthouse counts the SSR
      // paint (~0.9s) instead of the GSAP repaint (~3.8s).
      gsap.set(".hero-hide:not(.hero-name)", { opacity: 0 });

      if (!introComplete) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          window.matchMedia("(max-width: 767px)").matches) {
        gsap.set(".hero-hide", { opacity: 1, y: 0, scale: 1, filter: "none" });
        return;
      }

      const nameEl = sectionRef.current.querySelector(".hero-name");
      // Restore name container opacity — SplitText chars handle their own opacity
      if (nameEl) gsap.set(nameEl, { opacity: 1 });
      const split = nameEl ? new SplitText(nameEl, { type: "chars,words" }) : null;
      // Hide the individual chars (they start visible after split)
      if (split) gsap.set(split.chars, { opacity: 0 });

      const tl = gsap.timeline();

      // 1. Label
      tl.fromTo(".hero-label",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        0.15);

      // 2. Name — char-by-char reveal
      if (split) {
        tl.fromTo(split.chars,
          { y: 80, opacity: 0, rotateX: -90 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.04, duration: 0.9, ease: "back.out(1.4)" },
          0.3);
      }

      // 3. Tagline then avatar (100ms apart)
      tl.fromTo(".hero-tagline",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        0.8);
      tl.fromTo(".hero-avatar",
        { opacity: 0, scale: 1.06, clipPath: "circle(0% at 50% 50%)" },
        { opacity: 1, scale: 1, clipPath: "circle(75% at 50% 50%)", duration: 1.2, ease: "power3.out" },
        0.9);

      // 4. Buttons
      tl.fromTo(".hero-buttons",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
        1.0);

      // 5. Trust badges — reveal parent, then stagger pills
      tl.set(".hero-trust", { opacity: 1 }, 1.15);
      tl.fromTo(".hero-trust-pill",
        { y: 12, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", stagger: 0.1 },
        1.15);

      // 6. Bottom bar
      tl.fromTo(".hero-location",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power3.out" },
        1.3);
      tl.fromTo(".hero-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power3.out" },
        1.5);

      return () => {
        if (split) split.revert();
      };
    },
    { scope: sectionRef, dependencies: [introComplete] }
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-svh overflow-hidden bg-dusk-hero"
    >
      {/* Warm radial gradient background */}
      <ParallaxLayer speed={-15} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_40%,rgba(184,115,51,0.06),transparent)]" />
      </ParallaxLayer>

      {/* Main content — fades and recedes as user scrolls */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative mx-auto flex min-h-svh max-w-[1280px] items-center px-[var(--spacing-container-px)] pt-14 sm:pt-20 pb-[max(2.5rem,calc(env(safe-area-inset-bottom)+1.5rem))] sm:pb-12"
      >
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left column — Text content */}
          <div className="lg:col-span-7">
            {/* Mobile/Tablet avatar — circular, above label. NO hero-hide: paints from SSR for fast LCP */}
            <div className="mb-2.5 sm:mb-6 lg:hidden">
              <div className="relative size-14 sm:size-20 overflow-hidden rounded-full ring-2 ring-copper/20 ring-offset-1 sm:ring-offset-2 ring-offset-dusk-hero">
                <div className="absolute inset-0 -z-10 scale-110 bg-[radial-gradient(ellipse_at_center,rgba(184,115,51,0.14),transparent_70%)] blur-xl" />
                <Image
                  src="/images/me-avatar-sm.webp"
                  alt="Sandesh Hamal Thakuri"
                  width={160}
                  height={160}
                  priority
                  sizes="(min-width: 640px) 80px, 56px"
                  className="size-full object-cover object-top"
                />
              </div>
            </div>

            {/* Label */}
            <span className="hero-hide hero-label typ-label mb-2 sm:mb-6 block text-copper-btn">
              Full Stack Engineer
            </span>

            {/* Name */}
            <h1
              className="hero-hide hero-name typ-display text-charcoal mb-2.5 sm:mb-6 overflow-hidden"
              style={{ perspective: "500px" }}
            >
              {personal.name}
            </h1>

            {/* Tagline */}
            <div className="hero-hide hero-tagline">
              <p className="typ-body-lg max-w-[540px] text-slate">
                {personal.tagline}
              </p>
            </div>

            {/* Buttons */}
            <div className="hero-hide hero-buttons">
              <div className="mt-4 sm:mt-8 flex flex-row flex-wrap gap-3 sm:gap-4">
                <Button variant="solid" href="#projects">
                  View Projects
                  <ArrowDown className="size-3.5" />
                </Button>
                <Button variant="ghost" href="/resume.pdf">
                  <Download className="size-3.5" />
                  Resume
                </Button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="hero-hide hero-trust">
              <div className="mt-3 sm:mt-10 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="hero-trust-pill inline-flex items-center gap-2 rounded-full border border-copper/15 bg-[rgba(184,115,51,0.05)] px-2.5 py-1 sm:px-3.5 sm:py-1.5 transition-colors duration-200 hover:bg-[rgba(184,115,51,0.1)]">
                  <Globe className="size-3.5 text-copper" />
                  <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-wide text-slate">
                    5+ Years Remote
                  </span>
                </span>
                <span className="hero-trust-pill inline-flex items-center gap-2 rounded-full border border-copper/15 bg-[rgba(184,115,51,0.05)] px-2.5 py-1 sm:px-3.5 sm:py-1.5 transition-colors duration-200 hover:bg-[rgba(184,115,51,0.1)]">
                  <Image
                    src="/images/aws-academy-educator.webp"
                    alt=""
                    width={16}
                    height={16}
                    className="size-4 shrink-0"
                  />
                  <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-wide text-slate">
                    AWS Academy Educator
                  </span>
                </span>
                <span className="hero-trust-pill inline-flex items-center gap-2 rounded-full border border-copper/15 bg-[rgba(184,115,51,0.05)] px-2.5 py-1 sm:px-3.5 sm:py-1.5 transition-colors duration-200 hover:bg-[rgba(184,115,51,0.1)]">
                  <Layers className="size-3.5 text-copper" />
                  <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-wide text-slate">
                    50+ Projects
                  </span>
                </span>
              </div>

              {/* Mobile location — inline instead of absolute to avoid Safari toolbar clipping */}
              <div className="hero-hide hero-location mt-2 sm:hidden">
                <span className="font-[family-name:var(--font-mono)] text-[0.625rem] tracking-wider text-slate">
                  {personal.location} &middot;{" "}
                  <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="text-[#8B5A2B]">
                    {personal.phone}
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Right column — Portrait */}
          <div className="hidden lg:col-span-5 lg:flex lg:justify-end">
            <ParallaxLayer speed={-8}>
              {/* GSAP controls clip-path on this outer wrapper */}
              <div className="hero-hide hero-avatar relative w-[320px] xl:w-[360px]">
                {/* Warm copper glow behind portrait — syncs with float */}
                <motion.div
                  className="absolute -inset-[15%] -z-10 rounded-full blur-[60px]"
                  style={{ background: "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(184,115,51,0.16) 0%, rgba(184,115,51,0.06) 50%, transparent 80%)" }}
                  animate={introComplete && !prefersReducedMotion ? {
                    opacity: [0.14, 0.26, 0.14],
                    scale: [1.0, 1.06, 1.0],
                  } : undefined}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Framer Motion handles ambient float — separate from GSAP entrance */}
                <motion.div
                  animate={introComplete && !prefersReducedMotion ? {
                    y: [0, -8, 0],
                    rotate: [0, 0.8, 0, -0.8, 0],
                  } : undefined}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/images/me-generated.webp"
                    alt="Sandesh Hamal Thakuri — portrait"
                    width={1024}
                    height={1536}
                    priority
                    sizes="(min-width: 1280px) 360px, 320px"
                    className="relative"
                    style={{
                      filter: "contrast(1.04) saturate(0.92) brightness(1.03) sepia(0.08) drop-shadow(0 8px 24px rgba(184,115,51,0.08)) drop-shadow(0 20px 50px rgba(26,23,20,0.18))",
                      maskImage: "linear-gradient(to bottom, black 78%, transparent 100%), linear-gradient(to right, transparent 0%, black 12%, black 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%), linear-gradient(to right, transparent 0%, black 12%, black 100%)",
                      maskComposite: "intersect",
                      WebkitMaskComposite: "source-in",
                    }}
                  />
                </motion.div>
              </div>
            </ParallaxLayer>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar — desktop only, absolute positioned. Hidden on mobile to avoid Safari toolbar clipping. */}
      <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-0 left-0 hidden w-full px-[var(--spacing-container-px)] pb-8 sm:block">
        <div className="mx-auto flex max-w-[1280px] items-end justify-between">
          {/* Location + phone */}
          <div className="hero-hide hero-location">
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] tracking-wider text-slate sm:text-xs">
              {personal.location} &middot; {personal.availability} &middot;{" "}
              <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="text-[#8B5A2B] transition-colors hover:text-copper">
                {personal.phone}
              </a>
            </span>
          </div>

          {/* Scroll indicator — hidden on mobile */}
          <div className="hero-hide hero-scroll hidden flex-col items-center gap-2 sm:flex">
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] tracking-widest text-slate uppercase">
              Scroll
            </span>
            <svg
              width="20"
              height="34"
              viewBox="0 0 20 34"
              fill="none"
              className="text-copper/50"
              role="img"
              aria-label="Scroll down"
            >
              <rect
                x="1"
                y="1"
                width="18"
                height="32"
                rx="9"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <motion.circle
                cx="10"
                cy="10"
                r="3"
                fill="currentColor"
                animate={heroVisible ? { y: [0, 12, 0] } : { y: 0 }}
                transition={heroVisible ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Peek avatar — slides up when user hasn't scrolled (desktop only) */}
      {isDesktop && <PeekAvatar introComplete={introComplete} />}
    </section>
  );
}

/* ═══════════════════════════════════════════
   Peek Avatar — pops up from bottom edge
   after 4s of no scrolling, hides on scroll.
   Speech bubble staggers in after entrance.
   ═══════════════════════════════════════════ */
function PeekAvatar({ introComplete }: { introComplete: boolean }) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const visibleRef = useRef(false);

  // Keep ref in sync to avoid closure stale reads
  useEffect(() => { visibleRef.current = visible; }, [visible]);

  // Show/hide timer logic
  useEffect(() => {
    if (!introComplete) return;

    const startTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      // Only update state if currently visible (avoid unnecessary re-renders)
      if (visibleRef.current) setVisible(false);
      timerRef.current = setTimeout(() => {
        if (window.scrollY < 200) setVisible(true);
      }, 4000);
    };

    // Debounced scroll handler — fires at most once per 200ms
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        startTimer();
      }, 200);
    };

    startTimer();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [introComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 18,
              mass: 0.8,
            },
          }}
          exit={{
            y: 120,
            opacity: 0,
            transition: { duration: 0.25, ease: [0.25, 0, 0.5, 0] },
          }}
          className="pointer-events-none absolute bottom-0 left-1/2 z-10 -translate-x-1/2"
        >
          {/*
            Peek cycle — 6s, asymmetric timing for character:
            0–47%  (2.85s): Visible, holding — time to read speech bubble
            47–53% (0.35s): Duck down FAST (easeIn — snap! scared)
            53–87% (2.0s):  Hidden — anticipation builds
            87–100%(0.8s):  Peek up SLOW (easeOut — cautious, curious)
          */}
          <motion.div
            animate={{
              y: [0, 0, 120, 120, 0],
            }}
            transition={{
              duration: 6,
              times: [0, 0.47, 0.53, 0.87, 1],
              repeat: Infinity,
              ease: ["linear", "easeIn", "linear", "easeOut"],
              delay: 2.0,
            }}
            className="relative"
          >
            {/* Overflow-hidden crops the wooden ledge; image positioned so fingers grip the container edge */}
            <div className="w-[240px] h-[120px] overflow-hidden">
              <Image
                src="/images/me-peek.webp"
                alt=""
                width={1536}
                height={1024}
                sizes="240px"
                className="w-full h-auto object-cover drop-shadow-[0_-4px_16px_rgba(26,23,20,0.15)]"
                style={{
                  filter: "contrast(1.02) saturate(0.78) brightness(1.06) sepia(0.06)",
                  marginTop: "-8px",
                }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
