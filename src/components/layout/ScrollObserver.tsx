"use client";

import { useEffect, useCallback, useRef } from "react";
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
  const setNavbarSection = useNavigationStore((s) => s.setNavbarSection);
  const offsetsRef = useRef<{ id: SectionId; top: number }[]>([]);
  const rafRef = useRef<number>(0);

  const cacheOffsets = useCallback(() => {
    offsetsRef.current = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return { id, top: 0 };
      let top = 0;
      let current: HTMLElement | null = el;
      while (current) {
        top += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }
      return { id, top };
    });
  }, []);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Nav underline: which section is the user reading? (~40% down viewport)
      const readThreshold = scrollY + vh * 0.4;
      // Navbar color: which section is behind the navbar? (~8% down = just below nav)
      const navThreshold = scrollY + vh * 0.08;

      let active: SectionId = "hero";
      let navbar: SectionId = "hero";

      for (const { id, top } of offsetsRef.current) {
        if (top <= readThreshold) active = id;
        if (top <= navThreshold) navbar = id;
      }

      setActiveSection(active);
      setNavbarSection(navbar);
    });
  }, [setActiveSection, setNavbarSection]);

  useEffect(() => {
    cacheOffsets();
    handleScroll();

    // Recache when DOM changes (lazy-loaded sections mounting)
    const observer = new MutationObserver(() => {
      cacheOffsets();
      handleScroll();
    });
    const main = document.getElementById("main-content");
    if (main) {
      observer.observe(main, { childList: true, subtree: true });
    }

    const stopTimer = setTimeout(() => observer.disconnect(), 3000);

    const onResize = () => {
      cacheOffsets();
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      clearTimeout(stopTimer);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [cacheOffsets, handleScroll]);

  return null;
}
