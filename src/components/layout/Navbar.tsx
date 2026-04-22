"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn, smoothScrollTo } from "@/lib/utils";
import { navItems } from "@/data/personal";
import { useNavigationStore } from "@/store/navigation";
import { useLenis } from "@/components/layout/SmoothScroll";
import { useHydrated } from "@/hooks/useHydrated";
import Image from "next/image";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { playHoverSound } from "@/lib/sound";

const darkSections = new Set(["projects", "skills", "contact"]);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const mounted = useHydrated();
  const reducedMotion = useReducedMotion();
  const { activeSection, navbarSection, isMenuOpen, toggleMenu, closeMenu } =
    useNavigationStore();
  const lenis = useLenis();

  // activeSection = what user is reading (drives underline)
  // navbarSection = what's behind the navbar (drives color)
  const isDark = darkSections.has(navbarSection);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        rafId = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Lock/unlock Lenis when mobile menu opens/closes
  useEffect(() => {
    if (!lenis) return;
    if (isMenuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isMenuOpen, lenis]);

  // Close menu if resized past lg breakpoint (1024px)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) closeMenu();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeMenu]);

  const scrollTo = (id: string) => {
    closeMenu();
    if (lenis) {
      // Restart Lenis synchronously before scrolling — closeMenu() sets
      // isMenuOpen:false but the useEffect that calls lenis.start() is
      // deferred until after render. Without this, lenis.scrollTo() is
      // a no-op because Lenis is still in stopped state.
      lenis.start();
      lenis.scrollTo(`#${id}`, {
        offset: 0,
        duration: 1.6,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
    } else {
      smoothScrollTo(`#${id}`);
    }
  };

  // Determine header background
  const headerBg = !mounted
    ? "bg-transparent"
    : scrolled && isDark
      ? "bg-[#1A1714]/85 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.04)]"
      : scrolled && !isDark
        ? "bg-cream/85 backdrop-blur-md shadow-[0_1px_0_rgba(26,23,20,0.06)]"
        : isDark
          ? "bg-[#1A1714]/60 backdrop-blur-sm"
          : "bg-transparent";

  return (
    <>
      {/* Mobile Menu — rendered BEFORE header so header's hamburger stays on top */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            data-lenis-prevent
            initial={reducedMotion ? false : { opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
            transition={reducedMotion ? { duration: 0.01 } : { type: "spring" as const, stiffness: 300, damping: 30 }}
            className={cn(
              "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden",
              "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
              isDark ? "bg-[#1A1714]" : "bg-cream"
            )}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.href}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0.01 } : { delay: 0.1 + i * 0.05 }}
                onClick={() => scrollTo(item.href)}
                className={cn(
                  "typ-h2 cursor-pointer transition-colors",
                  activeSection === item.href
                    ? "text-copper"
                    : isDark
                      ? "text-cream/80"
                      : "text-charcoal"
                )}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0.01 } : { delay: 0.1 + navItems.length * 0.05 }}
              onClick={() => scrollTo("contact")}
              className="mt-4 rounded-pill bg-copper-btn px-8 py-3.5 font-[family-name:var(--font-mono)] text-base font-medium tracking-wide text-cream cursor-pointer"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={cn(
          "fixed top-0 left-0 z-40 w-full transform-gpu transition-[background-color,box-shadow,backdrop-filter] duration-300",
          headerBg
        )}
      >
        <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-[var(--spacing-container-px)] pt-[max(1rem,env(safe-area-inset-top))] pb-4">
          {/* Logo — avatar + monogram */}
          <button
            onClick={() => scrollTo("hero")}
            onMouseEnter={() => playHoverSound()}
            className="flex items-center gap-2.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none rounded-sm"
          >
            <Image
              src="/images/me/me-avatar-sm.webp"
              alt=""
              width={28}
              height={28}
              sizes="28px"
              loading="eager"
              className="size-7 rounded-full object-cover object-top ring-1 ring-copper/20"
            />
            <span className="font-[family-name:var(--font-heading)] text-[0.9375rem] font-semibold tracking-wide text-copper">
              SHT
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-6 xl:gap-10 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                onMouseEnter={() => playHoverSound()}
                className={cn(
                  "relative cursor-pointer font-[family-name:var(--font-mono)] text-sm tracking-wide transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none rounded-sm",
                  activeSection === item.href
                    ? "text-copper"
                    : isDark
                      ? "text-cream/80 hover:text-cream"
                      : "text-slate hover:text-charcoal"
                )}
              >
                {item.label}
                {activeSection === item.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-[2px] w-full bg-copper"
                    transition={{
                      type: "spring" as const,
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}
              </button>
            ))}
            <SoundToggle isDark={isDark} />
            <button
              onClick={() => scrollTo("contact")}
              onMouseEnter={() => playHoverSound()}
              className="rounded-pill bg-copper-btn px-7 py-3 font-[family-name:var(--font-mono)] text-sm font-medium tracking-wide text-cream transition-colors duration-200 hover:bg-copper-dark cursor-pointer focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none"
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMenu}
            className="relative z-10 flex size-11 flex-col items-center justify-center gap-1.5 lg:hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none rounded-sm"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={
                isMenuOpen
                  ? { rotate: 45, y: 6 }
                  : { rotate: 0, y: 0 }
              }
              className={cn(
                "block h-[2px] w-6 transition-colors duration-300",
                isMenuOpen ? "bg-copper" : isDark ? "bg-cream" : "bg-copper"
              )}
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={cn(
                "block h-[2px] w-6 transition-colors duration-300",
                isDark ? "bg-cream" : "bg-copper"
              )}
            />
            <motion.span
              animate={
                isMenuOpen
                  ? { rotate: -45, y: -6 }
                  : { rotate: 0, y: 0 }
              }
              className={cn(
                "block h-[2px] w-6 transition-colors duration-300",
                isMenuOpen ? "bg-copper" : isDark ? "bg-cream" : "bg-copper"
              )}
            />
          </button>
        </nav>
      </header>
    </>
  );
}
