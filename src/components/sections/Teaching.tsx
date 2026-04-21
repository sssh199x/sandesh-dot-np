"use client";

import { useRef } from "react";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
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

const javaTopics = [
  { name: "Servlets", src: "/images/teaching/servlet.svg" },
  { name: "JSP", src: "/images/teaching/jsp.svg" },
  { name: "JSTL", src: "/images/teaching/jstl.svg" },
  { name: "Session Mgmt", src: "/images/teaching/session.svg" },
  { name: "MVC", src: "/images/teaching/mvc.png" },
  { name: "Auth Filter", src: "/images/teaching/authentication-filter.svg" },
  { name: "Collections", src: "/images/teaching/collections.svg" },
  { name: "Functional Interfaces", src: "/images/teaching/functional-interfaces.svg" },
  { name: "Streams API", src: "/images/teaching/streams-api.svg" },
  { name: "Multithreading", src: "/images/teaching/multithreading.svg" },
  { name: "Exception Handling", src: "/images/teaching/exception-handling.svg" },
  { name: "JDBC", src: "/images/teaching/jdbc.svg" },
] as { name: string; src?: string }[];

const courses = [
  {
    name: "Advanced Java",
    description:
      "Server-side programming from servlet lifecycle to production MVC architectures.",
    topics: javaTopics,
    iconSrc: "/images/teaching/java-bgwhite.svg",
  },
  {
    name: "Cloud Computing & IoT",
    description:
      "Virtualization, cloud service models, and IoT protocols — from VMware labs to MQTT sensor networks.",
    topics: [
      { name: "VMware", src: "/images/teaching/vmware.svg" },
      { name: "Ubuntu", src: "/images/teaching/ubuntu.svg" },
      { name: "MQTT", src: "/images/teaching/mqtt.svg" },
      { name: "Arduino", src: "/images/teaching/arduino.svg" },
      { name: "ESP-32", src: "/images/teaching/esp32.svg" },
      { name: "Raspberry Pi", src: "/images/teaching/raspberry-pi.svg" },
      { name: "IaaS / PaaS / SaaS", src: "/images/teaching/iaas-paas-saas.svg" },
      { name: "Virtual Machines", src: "/images/teaching/virtual-machines.svg" },
      { name: "Sensors & Actuators", src: "/images/teaching/sensors-actuators.svg" },
      { name: "Cloud Types", src: "/images/teaching/cloud-types.svg" },
    ] as { name: string; src?: string }[],
    iconSrc: "/images/teaching/IoT.svg",
  },
];

const collegeBg = "/images/teaching/informatics-college-pokhara.webp";

/** Watermark — Informatics College Pokhara logo */
function CollegeBgMark() {
  return (
    <Image
      src={collegeBg}
      alt=""
      aria-hidden="true"
      width={280}
      height={280}
      className="pointer-events-none absolute left-1/2 top-1/2 w-[80%] max-w-[240px] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.10]"
    />
  );
}

export function Teaching() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
                    src="/images/icons/aws-academy-educator.webp"
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
                  <span className="typ-label mb-4 block text-charcoal/60">
                    Services Covered
                  </span>
                  <div className="grid grid-cols-4 gap-x-3 gap-y-5 sm:grid-cols-7 lg:grid-cols-10">
                    {awsServices.map((svc) => (
                      <div
                        key={svc.name}
                        className="aws-svc-icon group/icon flex flex-col items-center gap-1.5"
                      >
                        <Image
                          src={svc.src}
                          alt={svc.name}
                          width={40}
                          height={40}
                          loading="lazy"
                          unoptimized
                          className="size-9 transition-transform duration-200 group-hover/icon:scale-110 sm:size-10"
                        />
                        <span className="text-center font-[family-name:var(--font-mono)] text-[9px] leading-tight uppercase tracking-[0.04em] text-charcoal/65">
                          {svc.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right: Stats — stretch to match left column */}
              <div className="relative flex flex-col border-t border-charcoal/[0.06] p-5 sm:p-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-10">
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
                      className="border-0 bg-transparent p-0 pl-4 shadow-none before:bg-sage/40 hover:translate-y-0 hover:border-0 hover:shadow-none [&_.typ-display]:text-[clamp(1.75rem,3vw,2.5rem)]"
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
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md sm:size-10">
                  <Image
                    src={course.iconSrc}
                    alt=""
                    width={40}
                    height={40}
                    unoptimized
                    className="size-full object-contain"
                    aria-hidden="true"
                  />
                </span>
                <h4 className="font-[family-name:var(--font-heading)] text-base font-medium tracking-tight text-charcoal sm:text-lg">
                  {course.name}
                </h4>
              </div>

              {/* Description */}
              <p className="mb-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-charcoal/65">
                {course.description}
              </p>

              {/* Topic icons */}
              {course.topics.some((t) => t.src) && (
                <div className="grid grid-cols-3 gap-x-2 gap-y-5 sm:grid-cols-4 lg:grid-cols-6">
                  {course.topics
                    .filter((t) => t.src)
                    .map((topic) => (
                      <div
                        key={topic.name}
                        className="flex flex-col items-center gap-2"
                      >
                        <Image
                          src={topic.src!}
                          alt={topic.name}
                          width={36}
                          height={36}
                          loading="lazy"
                          unoptimized={topic.src!.endsWith(".svg")}
                          className="size-9 object-contain sm:size-10"
                        />
                        <span className="w-full text-center font-[family-name:var(--font-mono)] text-[7px] leading-tight uppercase tracking-[0.02em] text-charcoal/65 sm:text-[8px]">
                          {topic.name}
                        </span>
                      </div>
                    ))}
                </div>
              )}

              {/* Topic tags (no icon) */}
              {course.topics.some((t) => !t.src) && (
                <div className={`flex flex-wrap gap-1.5 ${course.topics.some((t) => t.src) ? "mt-4" : ""}`}>
                  {course.topics
                    .filter((t) => !t.src)
                    .map((topic) => (
                      <Tag key={topic.name} variant="light">
                        {topic.name}
                      </Tag>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ─── GitHub Classroom ─── */}
        <FadeUp delay={0.25}>
          <div className="mt-5 flex items-center gap-3 rounded-lg border border-charcoal/[0.06] bg-surface-light px-5 py-3.5">
            <Image
              src="/images/teaching/github-classroom.svg"
              alt=""
              width={20}
              height={20}
              loading="lazy"
              unoptimized
              className="size-5 shrink-0"
              aria-hidden="true"
            />
            <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-charcoal/65">
              All assignments and collaboration managed through{" "}
              <span className="font-medium text-charcoal/80">
                GitHub Classroom
              </span>
            </p>
          </div>
        </FadeUp>
      </div>
    </SectionWrapper>
  );
}
