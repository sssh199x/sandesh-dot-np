"use client";

import { Mail } from "lucide-react";
import { personal } from "@/data/personal";

export function Footer() {
  return (
    <footer className="bg-dusk-contact px-[var(--spacing-container-px)] pb-[max(2rem,env(safe-area-inset-bottom))] pt-0">
      <div className="mx-auto max-w-[1280px]">
        {/* Copper rule */}
        <div className="mb-6 h-px w-full bg-copper/20" />

        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] tracking-wider text-cream/50 sm:text-xs">
              Sandesh Hamal Thakuri &middot; Pokhara, Nepal &middot; {new Date().getFullYear()}
            </span>
            <div className="flex items-center gap-1">
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex size-11 items-center justify-center text-cream/30 transition-colors duration-200 hover:text-copper focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none rounded-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/></svg>
              </a>
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex size-11 items-center justify-center text-cream/30 transition-colors duration-200 hover:text-copper focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none rounded-sm"
              >
                <svg viewBox="0 0 448 512" fill="currentColor" className="size-3.5"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.83-48.3 93.97 0 111.28 61.9 111.28 142.3V448z"/></svg>
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Email"
                className="flex size-11 items-center justify-center text-cream/30 transition-colors duration-200 hover:text-copper focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none rounded-sm"
              >
                <Mail className="size-3.5" />
              </a>
            </div>
          </div>
          <span className="font-[family-name:var(--font-mono)] text-[0.5625rem] tracking-wider text-cream/60 sm:text-[0.625rem]">
            Built with Next.js, Tailwind &amp; Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
