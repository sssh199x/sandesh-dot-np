"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { StatCard } from "@/components/ui/StatCard";

const teachingStats = [
  { value: "200+", label: "Students Taught" },
  { value: "7", label: "Sections" },
  { value: "2", label: "Courses" },
];

export function Teaching() {
  return (
    <SectionWrapper id="teaching" background="#F5F0E8">
      <FadeUp>
        <SectionHeading heading="Teaching" label="Educator" />
      </FadeUp>

      <FadeUp delay={0.15}>
        <div className="rounded-lg border border-charcoal/[0.06] bg-surface-light p-5 shadow-[0_2px_20px_rgba(26,23,20,0.06)] sm:p-8 lg:p-12">
          {/* Badge + Heading */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <h3 className="typ-h2 text-charcoal">
              AWS Academy Educator
            </h3>
            <span className="inline-block rounded-pill bg-sage/15 px-3 py-1 font-[family-name:var(--font-mono)] text-xs font-medium tracking-wide text-sage">
              Verified
            </span>
          </div>

          {/* Description */}
          <p className="typ-body-lg mb-4 max-w-[720px] text-charcoal/70">
            Computing Instructor at Informatics College Pokhara, affiliated with
            London Metropolitan University. Leading hands-on workshops for
            students pursuing computing degrees.
          </p>
          <p className="typ-body mb-8 max-w-[720px] text-charcoal/60">
            Teaching Advanced Java (Servlets, JSP, JSTL, session management,
            MVC patterns) and Cloud Computing &amp; IoT (AWS services, embedded
            systems). Managing assignments and collaboration via GitHub
            Classroom.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {teachingStats.map((stat, i) => (
              <FadeUp key={stat.label} delay={0.2 + i * 0.1}>
                <StatCard value={stat.value} label={stat.label} />
              </FadeUp>
            ))}
          </div>
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
