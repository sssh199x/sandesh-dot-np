"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { TextReveal } from "@/components/animations/TextReveal";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";
import { FadeUp } from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { personal } from "@/data/personal";

const heroCode = `const developer = {
  name: "Sandesh Hamal Thakuri",
  location: "Pokhara, Nepal",
  stack: ["React", "Next.js", "Node.js",
          "Spring Boot", "Flutter", "AWS"],
  passion: "Building things that matter",
  remote: true,
};

export default developer;`;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] as const },
  }),
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-dusk-hero"
    >
      {/* Warm radial gradient background */}
      <ParallaxLayer speed={-15} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_40%,rgba(184,115,51,0.06),transparent)]" />
      </ParallaxLayer>

      {/* Main content */}
      <div className="relative mx-auto flex min-h-screen max-w-[1280px] items-center px-[var(--spacing-container-px)] pt-20 pb-12">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left column — Text content */}
          <div className="lg:col-span-7">
            {/* Label */}
            <motion.span
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={fadeIn}
              className="typ-label mb-6 block text-copper"
            >
              Full Stack Developer
            </motion.span>

            {/* Name */}
            <TextReveal
              as="h1"
              className="typ-display text-charcoal mb-6"
              delay={0.4}
              stagger={0.04}
              duration={0.9}
            >
              {personal.name}
            </TextReveal>

            {/* Tagline */}
            <FadeUp delay={1.0} y={20}>
              <p className="typ-body-lg max-w-[540px] text-slate">
                {personal.tagline}
              </p>
            </FadeUp>

            {/* Buttons */}
            <FadeUp delay={1.2} y={20}>
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
            </FadeUp>

            {/* Trust bar */}
            <FadeUp delay={1.4} y={15}>
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
            </FadeUp>
          </div>

          {/* Right column — Code card */}
          <div className="hidden lg:col-span-5 lg:flex lg:justify-end">
            <FadeUp delay={1.0} y={30}>
              <ParallaxLayer speed={-8}>
                <CodeBlock
                  code={heroCode}
                  filename="developer.ts"
                  className="w-[380px] xl:w-[420px]"
                />
              </ParallaxLayer>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 w-full px-[var(--spacing-container-px)] pb-6 sm:pb-8">
        <div className="mx-auto flex max-w-[1280px] items-end justify-center sm:justify-between">
          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] tracking-wider text-slate sm:text-xs">
              {personal.location} &middot; {personal.availability}
            </span>
          </motion.div>

          {/* Scroll indicator — hidden on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="hidden flex-col items-center gap-2 sm:flex"
          >
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] tracking-widest text-slate/60 uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-8 w-px bg-copper/40"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
