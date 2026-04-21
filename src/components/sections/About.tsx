"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";
import { personal } from "@/data/personal";
import { stats } from "@/data/personal";

const identities = ["Computer Engineer", "Builder", "Educator", "Pixel Perfectionist", "Problem Solver", "Cloud Architect"];

function RotatingIdentity() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % identities.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="flex items-center gap-3">
      {/* Pulsing status dot */}
      <span className="relative flex size-2 shrink-0">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-copper/30" />
        <span className="relative inline-flex size-2 rounded-full bg-copper/60" />
      </span>

      {/* Rotating word — vertical slide with spring physics */}
      <div className="relative h-[1.875rem] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={identities[index]}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 24,
              mass: 0.8,
            }}
            className="block font-[family-name:var(--font-heading)] text-[1.375rem] font-semibold leading-[1.875rem] tracking-tight text-copper"
          >
            {identities[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function About() {
  return (
    <SectionWrapper id="about" background="#F5F0E8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left — Bio */}
        <div className="lg:col-span-7">
          <FadeUp>
            <SectionHeading heading="About" label="Who I Am" accent={false} />
          </FadeUp>

          {/* Mobile portrait — inline with first paragraph */}
          <FadeUp delay={0.1}>
            <div className="mb-6 flex items-center gap-4 lg:hidden">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-full ring-2 ring-copper/20 ring-offset-2 ring-offset-[#F5F0E8]">
                <Image
                  src="/images/me/me-about.webp"
                  alt="Sandesh Hamal Thakuri"
                  width={160}
                  height={160}
                  sizes="80px"
                  quality={60}
                  className="size-full object-cover object-top"
                  style={{ filter: "contrast(1.18) saturate(1.08) brightness(1.22) sepia(0.05)" }}
                />
              </div>
              <RotatingIdentity />
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p className="typ-body-lg text-charcoal/80 leading-relaxed">
              {personal.bio}
            </p>
          </FadeUp>

          {/* Highlight quote */}
          <FadeUp delay={0.25}>
            <blockquote className="my-8 border-l-3 border-copper/40 pl-6">
              <p className="typ-h2 text-copper leading-snug">
                {personal.bioHighlight}
              </p>
            </blockquote>
          </FadeUp>

          {/* Continued bio */}
          <FadeUp delay={0.35}>
            <p className="typ-body-lg text-charcoal/80 leading-relaxed">
              {personal.bioContinued}
            </p>
          </FadeUp>
        </div>

        {/* Right — Profile dossier card (desktop) */}
        <div className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center">
          <FadeUp delay={0.2}>
            <div className="relative w-full max-w-[380px] pt-16">
              {/* Dark card surface — overflow visible so photo breaks out */}
              <div className="relative rounded-2xl border border-[rgba(184,115,51,0.12)] bg-[#1E1B19] shadow-[0_12px_48px_rgba(26,23,20,0.25),0_2px_6px_rgba(26,23,20,0.15)]">
                {/* Portrait — breaks out above the card */}
                <div className="relative -mt-16 px-6">
                  {/* Warm ambient glow behind portrait */}
                  <div
                    className="absolute inset-x-6 top-0 bottom-0 blur-3xl"
                    style={{ background: "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(184,115,51,0.14) 0%, transparent 70%)" }}
                  />
                  <ParallaxLayer speed={-10}>
                    <Image
                      src="/images/me/me-about.webp"
                      alt="Sandesh Hamal Thakuri — casual portrait"
                      width={748}
                      height={821}
                      sizes="340px"
                      className="relative w-full object-contain drop-shadow-[0_8px_24px_rgba(26,23,20,0.3)]"
                      style={{
                        filter: "contrast(1.18) saturate(1.08) brightness(1.22) sepia(0.05)",
                        maskImage: "linear-gradient(to bottom, black 72%, transparent 96%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 72%, transparent 96%)",
                      }}
                    />
                  </ParallaxLayer>
                </div>

                {/* Identity + info block */}
                <div className="relative px-6 pb-6 pt-2">
                  {/* Top label + status */}
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-[family-name:var(--font-mono)] text-[0.5625rem] uppercase tracking-[0.1em] text-cream/30">
                      Profile
                    </span>
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage/40" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-sage" />
                    </span>
                  </div>

                  {/* Rotating identity */}
                  <RotatingIdentity />

                  {/* Thin copper rule */}
                  <div className="my-4 h-px bg-gradient-to-r from-copper/30 via-copper/15 to-transparent" />

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {stats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                        className="text-center"
                      >
                        <span className="block font-[family-name:var(--font-heading)] text-2xl font-semibold tracking-tight text-copper">
                          {stat.value}
                        </span>
                        <span className="mt-0.5 block font-[family-name:var(--font-mono)] text-[0.5625rem] uppercase tracking-[0.06em] leading-tight text-cream/40">
                          {stat.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Location footer */}
                  <div className="mt-4 flex items-center justify-center gap-1.5">
                    <svg className="size-3 text-copper/40" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-[family-name:var(--font-mono)] text-[0.5625rem] uppercase tracking-[0.08em] text-cream/35">
                      {personal.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </SectionWrapper>
  );
}
