"use client";

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
          {stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={0.1 + i * 0.1}>
              <StatCard value={stat.value} label={stat.label} />
            </FadeUp>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
