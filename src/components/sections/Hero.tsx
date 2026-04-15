"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Download, Globe, Award, Layers } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";
import { useNavigationStore } from "@/store/navigation";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const introComplete = useNavigationStore((s) => s.introComplete);

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

      // Immediately hide everything (before intro completes)
      gsap.set(".hero-hide", { opacity: 0 });

      if (!introComplete) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
        { opacity: 0, scale: 1.08, filter: "blur(8px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
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
      className="relative min-h-dvh overflow-hidden bg-dusk-hero"
    >
      {/* Warm radial gradient background */}
      <ParallaxLayer speed={-15} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_40%,rgba(184,115,51,0.06),transparent)]" />
      </ParallaxLayer>

      {/* Main content — fades and recedes as user scrolls */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative mx-auto flex min-h-dvh max-w-[1280px] items-center px-[var(--spacing-container-px)] pt-20 pb-12"
      >
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left column — Text content */}
          <div className="lg:col-span-7">
            {/* Mobile/Tablet avatar — circular, above label */}
            <div className="hero-hide hero-avatar mb-6 lg:hidden">
              <div className="relative size-20 overflow-hidden rounded-full ring-2 ring-copper/20 ring-offset-2 ring-offset-dusk-hero sm:size-24">
                <div className="absolute inset-0 -z-10 scale-110 bg-[radial-gradient(ellipse_at_center,rgba(184,115,51,0.14),transparent_70%)] blur-xl animate-glow-breathe" />
                <Image
                  src="/images/avatar.webp"
                  alt="Sandesh Hamal Thakuri"
                  width={96}
                  height={96}
                  loading="eager"
                  sizes="(min-width: 640px) 96px, 80px"
                  className="size-full object-cover object-top"
                />
              </div>
            </div>

            {/* Label */}
            <span className="hero-hide hero-label typ-label mb-6 block text-copper-btn">
              Full Stack Engineer
            </span>

            {/* Name */}
            <h1
              className="hero-hide hero-name typ-display text-charcoal mb-6 overflow-hidden"
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
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
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
              <div className="mt-10 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="hero-trust-pill inline-flex items-center gap-2 rounded-full border border-copper/15 bg-[rgba(184,115,51,0.05)] px-3.5 py-1.5 transition-colors duration-200 hover:bg-[rgba(184,115,51,0.1)]">
                  <Globe className="size-3.5 text-copper" />
                  <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-wide text-slate">
                    5+ Years Remote
                  </span>
                </span>
                <span className="hero-trust-pill inline-flex items-center gap-2 rounded-full border border-copper/15 bg-[rgba(184,115,51,0.05)] px-3.5 py-1.5 transition-colors duration-200 hover:bg-[rgba(184,115,51,0.1)]">
                  <Award className="size-3.5 text-copper" />
                  <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-wide text-slate">
                    AWS Academy Educator
                  </span>
                </span>
                <span className="hero-trust-pill hidden items-center gap-2 rounded-full border border-copper/15 bg-[rgba(184,115,51,0.05)] px-3.5 py-1.5 transition-colors duration-200 hover:bg-[rgba(184,115,51,0.1)] sm:inline-flex">
                  <Layers className="size-3.5 text-copper" />
                  <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-wide text-slate">
                    50+ Projects
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Right column — Avatar */}
          <div className="hidden lg:col-span-5 lg:flex lg:justify-end">
            <ParallaxLayer speed={-8}>
              <div className="hero-hide hero-avatar relative w-[340px] xl:w-[380px]">
                {/* Decorative ring system — mandala-inspired geometric backdrop */}
                <svg
                  viewBox="0 0 400 400"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] w-[115%] aspect-square pointer-events-none"
                  aria-hidden="true"
                >
                  {/* Filled zone — cool charcoal tint as contrast stage */}
                  <circle
                    cx="200" cy="200" r="197"
                    fill="rgba(26,23,20,0.035)"
                  />

                  {/* Outermost ring */}
                  <circle
                    cx="200" cy="200" r="196"
                    fill="none"
                    stroke="rgba(143,90,40,0.30)"
                    strokeWidth="0.75"
                  />

                  {/* Outer ring — dotted, slow rotation */}
                  <circle
                    cx="200" cy="200" r="190"
                    fill="none"
                    stroke="rgba(143,90,40,0.45)"
                    strokeWidth="1"
                    strokeDasharray="2 10"
                    className="animate-ring-spin"
                  />

                  {/* Inner ring — solid, static, recedes */}
                  <circle
                    cx="200" cy="200" r="150"
                    fill="none"
                    stroke="rgba(143,90,40,0.35)"
                    strokeWidth="1.25"
                  />

                  {/* Cardinal tick marks — counter-rotating */}
                  <g className="animate-ring-spin-reverse">
                    {[0, 90, 180, 270].map((deg) => (
                      <line
                        key={deg}
                        x1="200" y1="2"
                        x2="200" y2="18"
                        stroke="rgba(143,90,40,0.50)"
                        strokeWidth="1"
                        transform={`rotate(${deg} 200 200)`}
                      />
                    ))}
                  </g>
                </svg>

                <Image
                  src="/images/avatar.webp"
                  alt="Sandesh Hamal Thakuri — illustrated portrait waving hello"
                  width={1203}
                  height={1307}
                  loading="eager"
                  className="relative animate-wave-tilt drop-shadow-[0_8px_24px_rgba(26,23,20,0.1)]"
                />
              </div>
            </ParallaxLayer>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar — also fades with scroll */}
      <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-0 left-0 w-full px-[var(--spacing-container-px)] pb-6 sm:pb-8">
        <div className="mx-auto flex max-w-[1280px] items-end justify-center sm:justify-between">
          {/* Location */}
          <div className="hero-hide hero-location">
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] tracking-wider text-slate sm:text-xs">
              {personal.location} &middot; {personal.availability}
            </span>
          </div>

          {/* Scroll indicator — hidden on mobile */}
          <div className="hero-hide hero-scroll hidden flex-col items-center gap-2 sm:flex">
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] tracking-widest text-slate/60 uppercase">
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

      {/* Peek avatar — slides up when user hasn't scrolled */}
      <PeekAvatar introComplete={introComplete} />
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
    if (window.matchMedia("(max-width: 767px)").matches) return;

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
            <Image
              src="/images/peek-avatar.svg"
              alt=""
              width={160}
              height={73}
              className="object-contain object-bottom drop-shadow-[0_-4px_12px_rgba(26,23,20,0.12)]"
              aria-hidden="true"
            />

            {/* Eye sparkle glints — tiny stars that appear after avatar settles */}
            <svg
              viewBox="0 240 1536 700"
              className="absolute inset-0 size-full"
              aria-hidden="true"
            >
              {/* Left eye glint */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.6, 1], scale: [0, 1.2, 0.8, 1] }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              >
                <motion.g
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 0.7, 1] }}
                  transition={{ delay: 1.5, duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path
                    d="M610,840 L616,852 L610,864 L604,852 Z"
                    fill="white"
                    opacity="0.9"
                  />
                  <path
                    d="M610,852 L622,846 L610,852 L598,846 Z"
                    fill="white"
                    opacity="0.7"
                  />
                </motion.g>
              </motion.g>

              {/* Right eye glint */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.6, 1], scale: [0, 1.2, 0.8, 1] }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              >
                <motion.g
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 0.7, 1] }}
                  transition={{ delay: 2.0, duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path
                    d="M940,807 L946,819 L940,831 L934,819 Z"
                    fill="white"
                    opacity="0.9"
                  />
                  <path
                    d="M940,819 L952,813 L940,819 L928,813 Z"
                    fill="white"
                    opacity="0.7"
                  />
                </motion.g>
              </motion.g>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
