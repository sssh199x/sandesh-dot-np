import type { Project } from "@/types";

export const projects: Project[] = [
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
  },
  {
    title: "Rebuzz POS",
    description:
      "Retail management solution deployed to 30+ retailers. Led a 6-member team building Flutter frontend with real-time inventory tracking, multi-gateway payments, offline-first architecture, and interactive sales analytics dashboards.",
    tech: ["Flutter", "Node.js", "MongoDB", "fl_chart", "IoT", "SQLite"],
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
    href: "https://krofile.com",
  },
];
