import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Angular" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
      { name: "Redux" },
      { name: "Radix UI" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "Spring Boot" },
      { name: "GraphQL" },
      { name: "REST APIs" },
      { name: "RabbitMQ" },
      { name: "Kafka" },
      { name: "Nginx" },
    ],
  },
  {
    category: "Data Visualization",
    skills: [
      { name: "D3.js" },
      { name: "Recharts" },
      { name: "ECharts" },
      { name: "Chart.js" },
      { name: "fl_chart" },
      { name: "Custom Dashboards" },
    ],
  },
  {
    category: "Database & ORM",
    skills: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "Redis" },
      { name: "Prisma" },
      { name: "Hibernate" },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "Jenkins" },
      { name: "GitHub Actions" },
      { name: "Vercel" },
    ],
  },
  {
    category: "Mobile",
    skills: [
      { name: "Flutter" },
      { name: "Dart" },
      { name: "Bluetooth/IoT" },
      { name: "Push Notifications" },
      { name: "Offline Storage" },
      { name: "Material Design" },
    ],
  },
];
