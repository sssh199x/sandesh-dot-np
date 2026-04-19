import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Silverline Education",
    description:
      "End-to-end delivery of a 20+ section website from Figma designs through production deployment. Integrated Sanity v5 headless CMS with 14 content schemas and on-demand ISR revalidation. Lighthouse 95+ Performance, 100 Accessibility.",
    tech: [
      "Next.js 16",
      "React 19",
      "Sanity v5",
      "Tailwind CSS v4",
      "GSAP",
      "Framer Motion",
    ],
    images: [
      "/images/projects/silverline/silverline.webp",
      "/images/projects/silverline/silverline-2.webp",
      "/images/projects/silverline/silverline-3.webp",
    ],
    href: "https://consultsilverline.net",
  },
  {
    title: "Kaya E-Commerce",
    description:
      "4-panel e-commerce platform with 138+ React components, custom GraphQL client, multi-step Stripe checkout, Easyship multi-courier shipping, and advanced product filtering. Sole developer on the user-facing panel.",
    tech: [
      "Next.js 16",
      "React 19",
      "GraphQL",
      "Stripe",
      "NextAuth 5",
      "Radix UI",
    ],
    images: [
      "/images/projects/kaya/kaya.webp",
      "/images/projects/kaya/kaya-2.webp",
      "/images/projects/kaya/kaya-3.webp",
    ],
    href: "https://thehouseofkaya.com",
  },
  {
    title: "Exosolve Analytics",
    description:
      "Enterprise analytics dashboards with 5+ custom D3.js chart components — bubble maps, heat maps, time-series, tree diagrams. Integrated Amazon Lex AI for natural language data querying by non-technical stakeholders.",
    tech: [
      "Angular 17",
      "D3.js",
      "Spring Boot",
      "Amazon Lex",
      "GraphQL",
      "AWS",
    ],
    images: [
      "/images/projects/exosolve/exosolve.webp",
      "/images/projects/exosolve/exosolve-2.webp",
      "/images/projects/exosolve/exosolve-3.webp",
      "/images/projects/exosolve/exosolve-4.webp",
    ],
    href: "https://exosolve.io",
  },
  {
    title: "Rebuzz POS",
    description:
      "Retail management solution deployed to 30+ retailers. Led a 6-member team building Flutter frontend with real-time inventory tracking, multi-gateway payments, offline-first architecture, and interactive sales analytics dashboards.",
    tech: ["Flutter", "Node.js", "MongoDB", "fl_chart", "IoT", "SQLite"],
    images: [
      "/images/projects/rebuzz/rebuzz.webp",
      "/images/projects/rebuzz/rebuzz-2.webp",
      "/images/projects/rebuzz/rebuzz-3.webp",
      "/images/projects/rebuzz/rebuzz-4.webp",
    ],
    href: "https://rebuzzpos.com",
  },
  {
    title: "Krofile Platform",
    description:
      "Digital business profile platform with real-time analytics, QR engagement tracking, and review management. Cross-platform with 12+ Flutter screens and a React web app serving 30+ businesses.",
    tech: [
      "React",
      "Flutter",
      "Node.js",
      "Chart.js",
      "GraphQL",
      "WebSockets",
    ],
    images: [
      "/images/projects/krofile/krofile.webp",
      "/images/projects/krofile/krofile-2.webp",
      "/images/projects/krofile/krofile-3.webp",
      "/images/projects/krofile/krofile-4.webp",
    ],
    href: "https://krofile.com",
  },
];
