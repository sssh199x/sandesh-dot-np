import type { PersonalInfo, NavItem, StatItem } from "@/types";

export const personal: PersonalInfo = {
  name: "Sandesh Hamal Thakuri",
  tagline:
    "From Java to Next.js to AWS to IoT — I ship production apps for remote teams, then teach 200+ students the craft.",
  bio: "I started with Java Servlets, fell in love with the web, and never looked back. Five years of shipping production apps for US-based remote teams later — I've touched everything from React and Spring Boot to AWS infrastructure and IoT devices.",
  bioHighlight: "I build things that work, for people who need them to.",
  bioContinued: "That means a 138-component e-commerce platform one month, interactive D3.js analytics dashboards the next, and a Flutter POS system deployed to 30+ retailers after that. Between projects, I teach 200+ students at Informatics College Pokhara as an AWS Academy Educator — because the best way to understand something is to explain it.",
  email: "sandeshhamal5890@gmail.com",
  phone: "+977 9815141345",
  location: "Pokhara, Nepal",
  availability: "Open to Remote Roles",
  socials: {
    github: "https://github.com/sssh199x",
    linkedin: "https://linkedin.com/in/sandesh-hamal-thakuri",
    instagram: "https://instagram.com/sssh_199x",
    facebook: "https://www.facebook.com/adithakuri.390",
    whatsapp: "https://wa.me/9779815141345",
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
