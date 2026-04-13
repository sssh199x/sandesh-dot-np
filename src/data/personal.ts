import type { PersonalInfo, NavItem, StatItem } from "@/types";

export const personal: PersonalInfo = {
  name: "Sandesh Hamal Thakuri",
  tagline:
    "Building production web & mobile applications for US companies — from enterprise analytics dashboards to e-commerce platforms.",
  bio: "I'm a Full Stack Developer with over 5 years of experience working remotely with US-based teams. I specialize in building scalable, production-grade applications using React, Next.js, Node.js, Java/Spring Boot, and AWS. From architecting 138+ component e-commerce platforms to designing interactive D3.js data visualization dashboards, I bring ideas to life with clean code and thoughtful design. When I'm not shipping features, I teach 200+ students at Informatics College Pokhara as an AWS Verified Academy Educator.",
  email: "sandeshhamal5890@gmail.com",
  location: "Pokhara, Nepal",
  availability: "Open to Remote Roles",
  socials: {
    github: "https://github.com/sssh199x",
    linkedin: "https://linkedin.com/in/sandesh-hamal-thakuri",
  },
};

export const navItems: NavItem[] = [
  { label: "About", href: "about" },
  { label: "Experience", href: "experience" },
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Teaching", href: "teaching" },
  { label: "Contact", href: "contact" },
];

export const stats: StatItem[] = [
  { value: "5+", label: "Years Remote Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "AWS", label: "Verified Academy Educator" },
];
