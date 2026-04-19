"use client";

import { useRef } from "react";
import Image from "next/image";
import { BadgeCheck, Code2, Cloud, GitBranch } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { StatCard } from "@/components/ui/StatCard";
import { Tag } from "@/components/ui/Tag";

/* AWS service icons — all 19 services in credential card */
const awsServices = [
  { name: "EC2", src: "/images/teaching/ec2.svg" },
  { name: "S3", src: "/images/teaching/s3.svg" },
  { name: "Lambda", src: "/images/teaching/lambda.svg" },
  { name: "RDS", src: "/images/teaching/rds.svg" },
  { name: "IAM", src: "/images/teaching/iam.svg" },
  { name: "CloudWatch", src: "/images/teaching/cloudwatch.svg" },
  { name: "DynamoDB", src: "/images/teaching/dynamodb.svg" },
  { name: "CloudFront", src: "/images/teaching/cloudfront.svg" },
  { name: "API Gateway", src: "/images/teaching/api-gateway.svg" },
  { name: "VPC", src: "/images/teaching/vpc.svg" },
  { name: "SQS", src: "/images/teaching/sqs.svg" },
  { name: "Route 53", src: "/images/teaching/route53.svg" },
  { name: "ECS", src: "/images/teaching/ecs.svg" },
  { name: "EKS", src: "/images/teaching/eks.svg" },
  { name: "SNS", src: "/images/teaching/sns.svg" },
  { name: "CodePipeline", src: "/images/teaching/codepipeline.svg" },
  { name: "Auto Scaling", src: "/images/teaching/ec2-auto-scaling.svg" },
  { name: "Beanstalk", src: "/images/teaching/elastic-beanstalk.svg" },
  { name: "ELB", src: "/images/teaching/elb.svg" },
];

const teachingStats = [
  { value: "200+", label: "Students Taught" },
  { value: "7", label: "Sections Led" },
  { value: "2", label: "Courses Designed" },
];

const courses = [
  {
    name: "Advanced Java",
    description:
      "Server-side programming from servlet lifecycle to production MVC architectures.",
    topics: ["Servlets", "JSP", "JSTL", "Session Mgmt", "MVC"],
    Icon: Code2,
  },
  {
    name: "Cloud Computing & IoT",
    description:
      "AWS cloud infrastructure and embedded systems — from EC2 provisioning to IoT sensor networks.",
    topics: ["AWS Services", "EC2 & S3", "Lambda", "Embedded Systems", "IoT"],
    Icon: Cloud,
  },
];

const collegeBg = "/images/teaching/informatics-college-pokhara.webp";

/** Watermark background — Informatics College Pokhara logo */
function CollegeBgMark() {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-[length:45%] bg-[position:right_0.75rem_center] bg-no-repeat opacity-[0.12]"
      style={{ backgroundImage: `url(${collegeBg})` }}
      aria-hidden="true"
    />
  );
}

export function Teaching() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const verifyLineRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);

  /* Sage verification line draws on scroll — the signature interaction */
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Sage line draws left-to-right
      if (verifyLineRef.current) {
        gsap.fromTo(
          verifyLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: verifyLineRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Shimmer sweep across "Verified" pill
      if (shimmerRef.current) {
        gsap.fromTo(
          shimmerRef.current,
          { x: "-100%" },
          {
            x: "200%",
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: shimmerRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // AWS service icons cascade in
      const svcIcons = sectionRef.current.querySelectorAll(".aws-svc-icon");
      if (svcIcons.length) {
        gsap.fromTo(
          svcIcons,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.4)",
            stagger: 0.05,
            scrollTrigger: {
              trigger: svcIcons[0],
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Course cards stagger in from below
      const courseCards = sectionRef.current.querySelectorAll(".course-card");
      if (courseCards.length) {
        gsap.fromTo(
          courseCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: courseCards[0],
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <SectionWrapper id="teaching" background="#F5F0E8">
      <div ref={sectionRef}>
        <FadeUp>
          <SectionHeading heading="Teaching" label="Educator" />
        </FadeUp>

        {/* ─── Credential Card ─── */}
        <FadeUp delay={0.1}>
          <div className="relative overflow-hidden rounded-lg border border-charcoal/[0.06] bg-surface-light shadow-[0_2px_20px_rgba(26,23,20,0.06)]">

            <div className="relative grid grid-cols-1 lg:grid-cols-12">
              {/* Left: Badge + Description */}
              <div className="p-5 sm:p-8 lg:col-span-8 lg:p-10">
                {/* Badge row */}
                <div className="mb-5 flex flex-wrap items-center gap-4">
                  <Image
                    src="/images/aws-academy-educator.webp"
                    alt="AWS Academy Educator Badge"
                    width={56}
                    height={56}
                    className="size-14 shrink-0"
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="typ-h2 text-charcoal">
                      AWS Academy Educator
                    </h3>
                    <span className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-pill bg-sage/15 px-3 py-1 font-[family-name:var(--font-mono)] text-xs font-medium tracking-wide text-sage">
                      <BadgeCheck className="size-3.5" />
                      Verified
                      {/* Shimmer overlay — animated via GSAP on scroll entry */}
                      <span
                        ref={shimmerRef}
                        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                        style={{ transform: "translateX(-100%)" }}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>

                <p className="typ-body-lg max-w-[640px] text-charcoal/70">
                  Computing Instructor at Informatics College Pokhara, affiliated
                  with London Metropolitan University. Leading hands-on workshops
                  for students pursuing computing degrees.
                </p>

                {/* AWS service icon grid — certification study sheet */}
                <div className="mt-8 lg:mt-10">
                  <span className="typ-label mb-4 block text-charcoal/25">
                    Services Covered
                  </span>
                  <div className="grid grid-cols-5 gap-x-3 gap-y-5 sm:grid-cols-7 lg:grid-cols-10">
                    {awsServices.map((svc) => (
                      <div
                        key={svc.name}
                        className="aws-svc-icon group/icon flex flex-col items-center gap-1.5"
                      >
                        <img
                          src={svc.src}
                          alt={svc.name}
                          width={40}
                          height={40}
                          loading="lazy"
                          className="size-9 transition-transform duration-200 group-hover/icon:scale-110 sm:size-10"
                        />
                        <span className="text-center font-[family-name:var(--font-mono)] text-[7px] leading-tight uppercase tracking-[0.06em] text-charcoal/40 sm:text-[8px]">
                          {svc.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right: Stats — stretch to match left column */}
              <div className="relative flex flex-col overflow-hidden border-t border-charcoal/[0.06] p-5 sm:p-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-10">
                <CollegeBgMark />
                <span className="typ-label mb-5 block text-sage">
                  By the Numbers
                </span>
                <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row lg:flex-col lg:gap-0">
                  {teachingStats.map((stat) => (
                    <StatCard
                      key={stat.label}
                      value={stat.value}
                      label={stat.label}
                      className="border-0 bg-transparent p-0 pl-4 shadow-none before:bg-sage/40 hover:translate-y-0 hover:border-0 hover:shadow-none"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ─── Course Cards ─── */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course.name}
              className="course-card group relative overflow-hidden rounded-lg border border-charcoal/[0.06] bg-surface-light p-5 pl-7 shadow-[0_2px_20px_rgba(26,23,20,0.06)] transition-[shadow,border-color,transform] duration-200 hover:border-sage/30 hover:shadow-warm-sm hover:-translate-y-0.5 sm:p-6 sm:pl-8"
            >
              {/* Sage left accent bar — gradient fade */}
              <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-sage/50 via-sage/25 to-transparent" />

              {/* Course header */}
              <div className="mb-3 flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-md bg-sage/10 text-sage">
                  <course.Icon className="size-4" aria-hidden="true" />
                </span>
                <h4 className="font-[family-name:var(--font-heading)] text-base font-medium tracking-tight text-charcoal sm:text-lg">
                  {course.name}
                </h4>
              </div>

              {/* Description */}
              <p className="typ-caption mb-4 text-charcoal/60">
                {course.description}
              </p>

              {/* Topic tags */}
              <div className="flex flex-wrap gap-1.5">
                {course.topics.map((topic) => (
                  <Tag key={topic} variant="light">
                    {topic}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─── GitHub Classroom ─── */}
        <FadeUp delay={0.25}>
          <div className="mt-5 flex items-center gap-2.5 rounded-lg border border-charcoal/[0.04] bg-surface-light/50 px-5 py-3.5">
            <GitBranch
              className="size-4 shrink-0 text-sage"
              aria-hidden="true"
            />
            <p className="typ-caption text-charcoal/50">
              All assignments and collaboration managed through{" "}
              <span className="font-medium text-charcoal/70">
                GitHub Classroom
              </span>
            </p>
          </div>
        </FadeUp>
      </div>
    </SectionWrapper>
  );
}
