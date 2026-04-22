"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DeviceMockup } from "@/components/ui/DeviceMockup";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { personal } from "@/data/personal";
import { useNavigationStore } from "@/store/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const introComplete = useNavigationStore((s) => s.introComplete);
  const introPlayed = useNavigationStore((s) => s.introPlayed);
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isSm = useMediaQuery("(min-width: 640px)");

  // Delay mockup auto-scroll timeline until after iris-close clears (~1s).
  const [mockupReady, setMockupReady] = useState(false);
  useEffect(() => {
    if (!introComplete) return;
    const delay = introPlayed ? 1000 : 0;
    const t = setTimeout(() => setMockupReady(true), delay);
    return () => clearTimeout(t);
  }, [introComplete, introPlayed]);

  // Scroll-driven fade — opacity only
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  // Parallax: devices trail the text on scroll — heavier, grounded feel
  const deviceParallaxY = useTransform(scrollY, [0, 800], [0, 60]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-svh overflow-hidden bg-dusk-hero"
      // CSS animations trigger when this attribute appears — no GSAP, no revert cycles
      data-hero-ready={introComplete || undefined}
    >
      {/* Warm radial gradient — static */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_40%,rgba(184,115,51,0.06),transparent)]" />

      {/* Main content — opacity-only fade on scroll */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative mx-auto flex min-h-svh max-w-[1280px] items-center px-[var(--spacing-container-px)] pt-14 sm:pt-20 pb-[max(2.5rem,calc(env(safe-area-inset-bottom)+1.5rem))] sm:pb-12"
      >
        <div className="grid w-full grid-cols-1 items-center gap-8 sm:grid-cols-12 sm:gap-6 lg:gap-8">
          {/* Left column — Text content */}
          <div className="sm:col-span-7">
            {/* Avatar — visible on all breakpoints, integrated with identity */}
            <div className="hero-hide hero-label mb-4 sm:mb-6 flex items-center gap-3.5">
              <div className="relative size-12 sm:size-14 overflow-hidden rounded-full ring-2 ring-copper/25 ring-offset-2 ring-offset-dusk-hero">
                <Image
                  src="/images/me/me-avatar-sm.webp"
                  alt="Sandesh Hamal Thakuri"
                  width={160}
                  height={160}
                  loading="eager"
                  sizes="56px"
                  className="size-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.6875rem] sm:text-xs tracking-wide text-copper-btn">
                  Full Stack Developer
                </span>
                <span className="font-mono text-[0.6rem] tracking-wider text-slate uppercase">
                  {personal.location}
                </span>
              </div>
            </div>

            {/* Name — LCP element, never animated, never hidden */}
            <h1 className="hero-hide hero-name typ-display text-charcoal mb-2.5 sm:mb-6">
              {personal.name}
            </h1>

            {/* Tagline — conversational, not corporate */}
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

            {/* Mobile location + contact */}
            <div className="hero-hide hero-trust">
              <div className="hero-hide hero-location mt-3 sm:hidden">
                <span className="font-mono text-[0.625rem] tracking-wider text-slate">
                  {personal.availability} &middot;{" "}
                  <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="text-copper-btn">
                    {personal.phone}
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Right column — Device mockups (parallax: trails text on scroll) */}
          {isLg && (
            <motion.div
              style={{ y: deviceParallaxY }}
              className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center"
            >
              <div className="hero-hide hero-mockup relative w-[460px] xl:w-[520px]">
                <div
                  className="absolute -inset-[10%] -z-10 rounded-3xl blur-[60px] opacity-15"
                  style={{ background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(184,115,51,0.5) 0%, rgba(184,115,51,0.15) 50%, transparent 80%)" }}
                />
                <DeviceMockup animate={mockupReady} />
              </div>
            </motion.div>
          )}
          {/* Tablet (sm → lg): iPhone 17 */}
          {isSm && !isLg && (
          <motion.div
            style={{ y: deviceParallaxY }}
            className="hidden sm:col-span-5 sm:flex sm:items-center sm:justify-center lg:hidden"
          >
            <div className="hero-hide hero-mockup relative w-[200px] md:w-[240px]">
              <div
                className="absolute -inset-[15%] -z-10 rounded-[2rem] blur-[40px] opacity-10"
                style={{ background: "radial-gradient(ellipse 60% 40% at 50% 35%, rgba(184,115,51,0.4) 0%, transparent 80%)" }}
              />
              <PhoneMockup animate={mockupReady} />
            </div>
          </motion.div>
          )}
        </div>
      </motion.div>

      {/* Bottom bar — desktop only */}
      <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-0 left-0 hidden w-full px-[var(--spacing-container-px)] pb-8 sm:block">
        <div className="mx-auto flex max-w-[1280px] items-end justify-between">
          <div className="hero-hide hero-location">
            <span className="font-mono text-[0.625rem] tracking-wider text-slate sm:text-xs">
              {personal.location} &middot; {personal.availability} &middot;{" "}
              <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="text-copper-btn transition-colors hover:text-copper">
                {personal.phone}
              </a>
            </span>
          </div>

          {/* Scroll indicator — CSS animation */}
          <div className="hero-hide hero-scroll hidden flex-col items-center gap-2 sm:flex">
            <span className="font-mono text-[0.625rem] tracking-widest text-slate uppercase">
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
              <rect x="1" y="1" width="18" height="32" rx="9" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="10" cy="10" r="3" fill="currentColor" className="animate-scroll-dot" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Peek avatar — desktop only */}
      {isLg && <PeekAvatar introComplete={introComplete} />}
    </section>
  );
}

/* ═══════════════════════════════════════════
   Peek Avatar — pops up from bottom edge
   after 4s of no scrolling, hides on scroll.
   ═══════════════════════════════════════════ */
function PeekAvatar({ introComplete }: { introComplete: boolean }) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const visibleRef = useRef(false);

  useEffect(() => { visibleRef.current = visible; }, [visible]);

  useEffect(() => {
    if (!introComplete) return;

    const startTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (visibleRef.current) setVisible(false);
      timerRef.current = setTimeout(() => {
        if (window.scrollY < 200) setVisible(true);
      }, 4000);
    };

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
            transition: { type: "spring", stiffness: 260, damping: 18, mass: 0.8 },
          }}
          exit={{
            y: 120,
            opacity: 0,
            transition: { duration: 0.25, ease: [0.25, 0, 0.5, 0] },
          }}
          className="pointer-events-none absolute bottom-0 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 0, 120, 120, 0] }}
            transition={{
              duration: 6,
              times: [0, 0.47, 0.53, 0.87, 1],
              repeat: Infinity,
              ease: ["linear", "easeIn", "linear", "easeOut"],
              delay: 2.0,
            }}
            className="relative"
          >
            <div className="w-[240px] h-[120px] overflow-hidden">
              <Image
                src="/images/me/me-peek.webp"
                alt=""
                width={480}
                height={320}
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
