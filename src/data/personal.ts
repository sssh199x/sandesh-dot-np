import type { PersonalInfo, NavItem, StatItem } from "@/types";

export const personal: PersonalInfo = {
  name: "Sandesh Hamal Thakuri",
  tagline:
    "From Java to Next.js to AWS to IoT — I ship production apps for remote teams, then teach 200+ students the craft.",
  bio: "I'm a Full Stack Developer with over 5 years of experience working remotely with US-based teams. I specialize in building scalable, production-grade applications using React, Next.js, Node.js, Java/Spring Boot, and AWS.",
  bioHighlight: "I bring ideas to life with clean code and thoughtful design.",
  bioContinued: "From architecting 138+ component e-commerce platforms to designing interactive D3.js data visualization dashboards — I ship real products that serve real users. When I'm not building features, I teach 200+ students at Informatics College Pokhara as an AWS Verified Academy Educator.",
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
