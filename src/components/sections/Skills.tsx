"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { Tag } from "@/components/ui/Tag";
import Image from "next/image";
import { skillCategories } from "@/data/skills";

const categoryDescriptions: Record<string, string> = {
  Frontend:
    "Building responsive, accessible interfaces with modern React ecosystems and component-driven architecture.",
  Backend:
    "Designing scalable APIs, event-driven systems, and microservice architectures for high-throughput applications.",
  "Data Visualization":
    "Transforming complex datasets into interactive dashboards and real-time visual analytics.",
  "Database & ORM":
    "Modeling data across relational and document stores with optimized queries and type-safe ORMs.",
  "Cloud & DevOps":
    "Deploying containerized infrastructure with CI/CD pipelines and cloud-native orchestration.",
  Mobile:
    "Cross-platform Flutter apps — from Bluetooth IoT integration to offline-first architectures.",
};

/* Skill name → SVG icon path in /public/images/skills/
 * Icons render at 14×14px inside skill chips with original brand colors. */
const skillIcons: Record<string, string> = {
  // Frontend
  React: "/images/skills/react.svg",
  "Next.js": "/images/skills/next.svg",
  Angular: "/images/skills/angular.svg",
  TypeScript: "/images/skills/typescript.svg",
  "Tailwind CSS": "/images/skills/tailwind.svg",
  "Framer Motion": "/images/skills/framer-motion.svg",
  Redux: "/images/skills/redux.svg",
  "Radix UI": "/images/skills/Radix-Ui.svg",
  // Backend
  "Node.js": "/images/skills/node-js.svg",
  Express: "/images/skills/express-js.svg",
  "Spring Boot": "/images/skills/spring-boot.svg",
  GraphQL: "/images/skills/graphql.svg",
  "REST APIs": "/images/skills/rest-api.svg",
  RabbitMQ: "/images/skills/rabbitmq.svg",
  Kafka: "/images/skills/kafka.svg",
  Nginx: "/images/skills/nginx.svg",
  // Data Visualization
  "D3.js": "/images/skills/d3-js.svg",
  Recharts: "/images/skills/recharts.svg",
  ECharts: "/images/skills/echarts.svg",
  "Chart.js": "/images/skills/charts-js.svg",
  fl_chart: "/images/skills/fl-charts.svg",
  // Database & ORM
  PostgreSQL: "/images/skills/postgresql.svg",
  MongoDB: "/images/skills/mongodb.svg",
  MySQL: "/images/skills/mysql.svg",
  Redis: "/images/skills/redis.svg",
  Prisma: "/images/skills/prisma.svg",
  Hibernate: "/images/skills/hibernate.svg",
  // Cloud & DevOps
  AWS: "/images/skills/aws.svg",
  Docker: "/images/skills/docker.svg",
  Kubernetes: "/images/skills/kubernetes.svg",
  Jenkins: "/images/skills/jenkins.svg",
  "GitHub Actions": "/images/skills/github-actions.svg",
  Vercel: "/images/skills/vercel.svg",
  // Mobile
  Flutter: "/images/skills/flutter.svg",
  Dart: "/images/skills/dart.svg",
  "Bluetooth/IoT": "/images/skills/bluetooth.svg",
  "Material Design": "/images/skills/material-design.svg",
};

/*
 * Desktop bento layout (12 cols), alternating rhythm:
 * ┌──── 7 cols ────┬── 5 cols ──┐
 * │  Frontend       │  Backend   │
 * ├── 5 cols ──┬────┴─ 7 cols ──┤
 * │  Data Viz   │  Database      │
 * ├──── 7 cols ─┴──┬── 5 cols ──┤
 * │  Cloud & DevOps │  Mobile    │
 * └────────────────┴────────────┘
 */
const cardLayout = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-7",
  "lg:col-span-5",
];

export function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      const cards = gridRef.current.querySelectorAll(".skill-card");

      if (isMobile) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      } else {
        cards.forEach((card, i) => {
          const isLeft = i % 2 === 0;
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, x: isLeft ? -40 : 40 },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              delay: i * 0.07,
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            }
          );

          const skills = card.querySelectorAll(".skill-item");
          gsap.fromTo(
            skills,
            { opacity: 0, x: -8 },
            {
              opacity: 1,
              x: 0,
              duration: 0.3,
              ease: "power2.out",
              stagger: 0.03,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    },
    { scope: gridRef }
  );

  return (
    <SectionWrapper id="skills" background="#1E1B19">
      <FadeUp>
        <SectionHeading heading="Skills" label="Tech Stack" dark />
      </FadeUp>

      <div
        ref={gridRef}
        className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5"
      >
        {skillCategories.map((cat, i) => (
          <div
            key={cat.category}
            className={`skill-card group relative overflow-hidden rounded-lg border border-white/[0.06] bg-[rgba(255,255,255,0.03)] transition-[border-color] duration-300 hover:border-copper/20 focus-within:border-copper/20 sm:col-span-1 ${cardLayout[i]}${i % 2 === 1 ? " sm:mt-2 lg:mt-3" : ""}`}
          >
            {/* Copper left accent */}
            <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-copper/40 via-copper/15 to-transparent" />

            {/* Card content */}
            <div className="relative z-10 p-5 sm:p-6">
              {/* Header — number + category */}
              <div className="mb-3 flex items-center gap-3">
                <span className="font-mono text-[0.6875rem] tracking-widest text-copper/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="typ-h2 text-cream">{cat.category}</h3>
              </div>

              {/* Description */}
              <p className="typ-caption mb-5 text-cream/80">
                {categoryDescriptions[cat.category]}
              </p>

              {/* Skill list — inline flow with dot separators */}
              <ul className="flex flex-wrap items-center gap-x-1.5 gap-y-2" role="list">
                {cat.skills.map((skill, si) => (
                  <li key={skill.name} className="flex items-center gap-1.5">
                    {si > 0 && (
                      <span className="text-cream/15 select-none" aria-hidden="true">·</span>
                    )}
                    <Tag variant="dark" className="skill-item">
                      {skillIcons[skill.name] && (
                        <Image
                          src={skillIcons[skill.name]}
                          alt=""
                          width={14}
                          height={14}
                          unoptimized
                          aria-hidden="true"
                          className="size-3.5 shrink-0"
                        />
                      )}
                      {skill.name}
                    </Tag>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
