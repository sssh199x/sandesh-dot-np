export type SectionId =
  | "hero"
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "teaching"
  | "contact";

export interface NavItem {
  label: string;
  href: SectionId;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
  tech: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  href?: string;
  github?: string;
}

export interface Skill {
  name: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  bio: string;
  bioHighlight: string;
  bioContinued: string;
  email: string;
  location: string;
  availability: string;
  socials: {
    github: string;
    linkedin: string;
  };
}
