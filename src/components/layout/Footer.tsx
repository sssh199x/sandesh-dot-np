"use client";

import { Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
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
              Sandesh Hamal Thakuri &middot; Pokhara, Nepal &middot; 2026
            </span>
            <div className="flex items-center gap-1">
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex size-11 items-center justify-center text-cream/30 transition-colors duration-200 hover:text-copper focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none rounded-sm"
              >
                <SiGithub className="text-[14px]" />
              </a>
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex size-11 items-center justify-center text-cream/30 transition-colors duration-200 hover:text-copper focus-visible:ring-2 focus-visible:ring-copper focus-visible:outline-none rounded-sm"
              >
                <FaLinkedinIn className="text-[14px]" />
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
          <span className="font-[family-name:var(--font-mono)] text-[0.5625rem] tracking-wider text-cream/40 sm:text-[0.625rem]">
            Built with Next.js, Tailwind &amp; Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
