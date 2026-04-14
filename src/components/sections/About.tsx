"use client";

import Image from "next/image";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCard } from "@/components/ui/StatCard";
import { FadeUp } from "@/components/animations/FadeUp";
import { personal, stats } from "@/data/personal";

export function About() {
  return (
    <SectionWrapper id="about" background="#F5F0E8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left — Bio */}
        <div className="lg:col-span-7">
          <FadeUp>
            <SectionHeading heading="About" label="Who I Am" />
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="typ-body-lg text-charcoal/80 leading-relaxed">
              {personal.bio}
            </p>
          </FadeUp>
        </div>

        {/* Right — Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
          {stats.map((stat, i) =>
            stat.value === "AWS" ? (
              <FadeUp key={stat.label} delay={0.1 + i * 0.1}>
                <div className="rounded-lg border border-charcoal/[0.06] bg-surface-light p-6 text-center">
                  <div className="typ-display text-copper flex items-center justify-center gap-3">
                    <Image
                      src="/images/aws-academy-educator.webp"
                      alt="AWS Academy Educator Badge"
                      width={64}
                      height={64}
                      className="size-[1.15em] shrink-0"
                    />
                    <span>AWS</span>
                  </div>
                  <p className="typ-caption mt-2">{stat.label}</p>
                </div>
              </FadeUp>
            ) : (
              <FadeUp key={stat.label} delay={0.1 + i * 0.1}>
                <StatCard value={stat.value} label={stat.label} />
              </FadeUp>
            )
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
