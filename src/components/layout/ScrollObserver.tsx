"use client";

import { useEffect } from "react";
import { useNavigationStore } from "@/store/navigation";
import type { SectionId } from "@/types";

const sectionIds: SectionId[] = [
  "hero",
  "about",
  "experience",
  "projects",
  "skills",
  "teaching",
  "contact",
];

export function ScrollObserver() {
  const setActiveSection = useNavigationStore((s) => s.setActiveSection);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-40% 0px -55% 0px",
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [setActiveSection]);

  return null;
}
