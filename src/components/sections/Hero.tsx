"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Download } from "lucide-react";
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

      // 5. Trust bar
      tl.fromTo(".hero-trust",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
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
                  alt=""
                  width={96}
                  height={96}
                  sizes="(min-width: 640px) 96px, 80px"
                  className="size-full object-cover object-top"
                />
              </div>
            </div>

            {/* Label */}
            <span className="hero-hide hero-label typ-label mb-6 block text-copper-btn">
              Full Stack Developer
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
                  Explore My Work
                  <ArrowDown className="size-3.5" />
                </Button>
                <Button variant="ghost" href="/resume.pdf">
                  <Download className="size-3.5" />
                  Resume
                </Button>
              </div>
            </div>

            {/* Trust bar */}
            <div className="hero-hide hero-trust">
              <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full bg-sage" />
                  <span className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-slate">
                    5+ Years Remote
                  </span>
                </div>
                <div className="h-3 w-px bg-charcoal/10" />
                <div className="flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full bg-copper" />
                  <span className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-slate">
                    AWS Educator
                  </span>
                </div>
                <div className="hidden h-3 w-px bg-charcoal/10 sm:block" />
                <div className="hidden items-center gap-2 sm:flex">
                  <span className="inline-block size-2 rounded-full bg-copper/50" />
                  <span className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-slate">
                    50+ Projects
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — Avatar */}
          <div className="hidden lg:col-span-5 lg:flex lg:justify-end">
            <ParallaxLayer speed={-8}>
              <div className="hero-hide hero-avatar relative w-[340px] xl:w-[380px]">
                {/* Breathing copper glow behind avatar */}
                <div className="absolute inset-0 translate-y-4 scale-90 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(184,115,51,0.14),transparent_70%)] blur-2xl animate-glow-breathe" />
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
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
