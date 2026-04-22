"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { BadgeMockup } from "@/components/ui/BadgeMockup";
import { personal } from "@/data/personal";

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
            className="block font-heading text-[1.375rem] font-semibold leading-[1.875rem] tracking-tight text-copper"
          >
            {identities[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function About() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: badgeRef,
    offset: ["start end", "end start"],
  });
  // Badge trails scroll — heavier feel, like real mass on a lanyard
  const badgeY = useTransform(scrollYProgress, [0, 1], [40, -30]);

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
              <div className="relative size-20 shrink-0 overflow-hidden rounded-full ring-2 ring-copper/20 ring-offset-2 ring-offset-dusk-about">
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

        {/* Right — Hanging ID badge (desktop) */}
        <div ref={badgeRef} className="hidden lg:col-span-5 lg:flex lg:items-start lg:justify-center">
          <FadeUp delay={0.2}>
            <motion.div style={{ y: badgeY }} className="w-[240px] xl:w-[260px]">
              <BadgeMockup />
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </SectionWrapper>
  );
}
