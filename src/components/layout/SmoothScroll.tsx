"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useNavigationStore } from "@/store/navigation";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoResize: false,
    });

    instance.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // --- Resize scroll-preservation ---
    // Only act on WIDTH changes (actual breakpoint resize).
    // Height-only changes (mobile address bar) are ignored —
    // they're already handled by ScrollTrigger.config({ ignoreMobileResize: true }).

    let isResizing = false;
    let savedSection = "hero";
    let lastWidth = window.innerWidth;

    // 1. On resize: only if width changed, freeze Lenis, save section, update dimensions
    const onResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth === lastWidth) {
        // Height-only change (mobile address bar) — just update Lenis dimensions quietly
        instance.resize();
        return;
      }
      lastWidth = newWidth;

      isResizing = true;
      savedSection = useNavigationStore.getState().activeSection;
      instance.stop();
      instance.resize();
      // ScrollTrigger's own internal debounced refresh will fire next
    };

    // 2. After ScrollTrigger finishes refresh: restore position, unfreeze
    const onRefresh = () => {
      if (!isResizing) return;
      isResizing = false;

      if (savedSection !== "hero") {
        const el = document.getElementById(savedSection);
        if (el) {
          const rect = el.getBoundingClientRect();
          const targetY = window.scrollY + rect.top;
          window.scrollTo(0, targetY);
          instance.scrollTo(targetY, { immediate: true, force: true });
        }
      }

      instance.start();
    };

    window.addEventListener("resize", onResize);
    ScrollTrigger.addEventListener("refresh", onRefresh);

    setLenis(instance); // eslint-disable-line react-hooks/set-state-in-effect

    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(rafCallback);
      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
