"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/personal";
import { useNavigationStore } from "@/store/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { activeSection, isMenuOpen, toggleMenu, closeMenu } =
    useNavigationStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    closeMenu();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "bg-cream/80 backdrop-blur-md shadow-[0_1px_0_rgba(26,23,20,0.06)]"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-[var(--spacing-container-px)] py-4">
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="font-[family-name:var(--font-heading)] text-xl font-semibold text-copper cursor-pointer"
          >
            sandesh.
          </button>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-6 xl:gap-10 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={cn(
                  "relative cursor-pointer font-[family-name:var(--font-mono)] text-sm tracking-wide transition-colors duration-200",
                  activeSection === item.href
                    ? "text-copper"
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
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="rounded-pill bg-copper px-7 py-3 font-[family-name:var(--font-mono)] text-sm font-medium tracking-wide text-cream transition-colors duration-200 hover:bg-copper-dark cursor-pointer"
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMenu}
            className="relative z-50 flex size-10 flex-col items-center justify-center gap-1.5 lg:hidden cursor-pointer"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={
                isMenuOpen
                  ? { rotate: 45, y: 6 }
                  : { rotate: 0, y: 0 }
              }
              className="block h-[2px] w-6 bg-copper"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-[2px] w-6 bg-copper"
            />
            <motion.span
              animate={
                isMenuOpen
                  ? { rotate: -45, y: -6 }
                  : { rotate: 0, y: 0 }
              }
              className="block h-[2px] w-6 bg-copper"
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-cream lg:hidden"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => scrollTo(item.href)}
                className={cn(
                  "typ-h2 cursor-pointer transition-colors",
                  activeSection === item.href
                    ? "text-copper"
                    : "text-charcoal"
                )}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + navItems.length * 0.05 }}
              onClick={() => scrollTo("contact")}
              className="mt-4 rounded-pill bg-copper px-8 py-3.5 font-[family-name:var(--font-mono)] text-base font-medium tracking-wide text-cream cursor-pointer"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
