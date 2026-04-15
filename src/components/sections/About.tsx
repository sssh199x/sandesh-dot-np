"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FadeUp } from "@/components/animations/FadeUp";
import { personal } from "@/data/personal";

const aboutSnippet = `// sandesh.config.ts

const developer = {
  name: "Sandesh Hamal Thakuri",
  role: "Full Stack Developer",
  experience: "5+ years remote",
  stack: [
    "React", "Next.js",
    "Node.js", "Spring Boot",
  ],
  cloud: "AWS Academy Educator",
  students: 200,
  projects: 50,
  location: "Pokhara, Nepal",
  status: "open to remote",
} as const;

export default developer;`;

export function About() {
  return (
    <SectionWrapper id="about" background="#F5F0E8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Left — Bio */}
        <div className="lg:col-span-7">
          <FadeUp>
            <SectionHeading heading="About" label="Who I Am" accent={false} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="typ-body-lg text-charcoal/80 leading-relaxed">
              {personal.bio}
            </p>
          </FadeUp>

          {/* Highlight quote */}
          <FadeUp delay={0.2}>
            <blockquote className="my-8 border-l-3 border-copper/40 pl-6">
              <p className="typ-h2 text-copper leading-snug">
                {personal.bioHighlight}
              </p>
            </blockquote>
          </FadeUp>

          {/* Continued bio */}
          <FadeUp delay={0.3}>
            <p className="typ-body-lg text-charcoal/80 leading-relaxed">
              {personal.bioContinued}
            </p>
          </FadeUp>
        </div>

        {/* Right — Code block */}
        <div className="lg:col-span-5 lg:self-center">
          <FadeUp delay={0.2}>
            <CodeBlock
              code={aboutSnippet}
              filename="sandesh.config.ts"
              className="!animate-none shadow-[0_12px_48px_rgba(26,23,20,0.15)]"
            />
          </FadeUp>
        </div>
      </div>
    </SectionWrapper>
  );
}
