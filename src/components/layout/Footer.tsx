"use client";

import { Mail } from "lucide-react";
import { personal, navItems } from "@/data/personal";

/* Inline social SVG icons — zero extra deps */
const socials = [
  {
    name: "GitHub",
    href: personal.socials.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: personal.socials.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: personal.socials.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: personal.socials.facebook,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 36.6 36.6 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: personal.socials.whatsapp,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: `mailto:${personal.email}`,
    icon: <Mail className="size-[18px]" />,
  },
];

export function Footer() {
  return (
    <footer className="relative z-20 -mt-28 px-4 pb-0 sm:-mt-36 sm:px-6 lg:px-8">
      {/* Card — warm surface emerging from night */}
      <div className="mx-auto w-full overflow-hidden rounded-t-3xl bg-[#221F1B] shadow-[0_-4px_30px_rgba(0,0,0,0.4)]">
        {/* Copper glow on top edge */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, rgba(184,115,51,0.35) 30%, rgba(184,115,51,0.55) 50%, rgba(184,115,51,0.35) 70%, transparent 95%)",
          }}
        />

        <div className="mx-auto max-w-[1280px] px-6 pb-8 pt-14 sm:px-10 sm:pb-10 sm:pt-20 lg:px-16">
          {/* Top section: Brand + Nav + Social */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-12 sm:gap-8">
            {/* Brand */}
            <div className="sm:col-span-5">
              <span className="font-[family-name:var(--font-heading)] text-2xl font-semibold tracking-tight text-copper">
                sandesh.
              </span>
              <p className="mt-4 max-w-xs font-[family-name:var(--font-body)] text-sm leading-relaxed text-cream/60">
                Full Stack Developer building production web apps for US teams.
                AWS Verified Academy Educator based in Pokhara, Nepal.
              </p>
              <a
                href={`mailto:${personal.email}`}
                className="mt-4 inline-block font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-wide text-copper-light/80 transition-colors duration-200 hover:text-copper-light"
              >
                {personal.email}
              </a>
            </div>

            {/* Quick Links */}
            <div className="sm:col-span-3">
              <h3 className="typ-label mb-5 text-copper-light">Navigate</h3>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={`#${item.href}`}
                      className="font-[family-name:var(--font-body)] text-sm text-cream/60 transition-colors duration-200 hover:text-copper"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="sm:col-span-4">
              <h3 className="typ-label mb-5 text-copper-light">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {socials.map(
                  (link) =>
                    link.href && (
                      <a
                        key={link.name}
                        href={link.href}
                        target={link.name === "Email" ? undefined : "_blank"}
                        rel={
                          link.name === "Email"
                            ? undefined
                            : "noopener noreferrer"
                        }
                        aria-label={link.name}
                        className="flex size-10 items-center justify-center rounded-full border border-copper/20 text-cream/60 transition-all duration-200 hover:border-copper/40 hover:text-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
                      >
                        {link.icon}
                      </a>
                    )
                )}
              </div>
            </div>
          </div>

          {/* Large brand text — copper gradient fade */}
          <div className="mt-14 border-t border-copper/[0.08] pt-10 sm:mt-16">
            <p
              aria-hidden="true"
              className="select-none text-center font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(184,115,51,0.3), rgba(184,115,51,0.1) 65%, transparent)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SANDESH HAMAL THAKURI
            </p>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col items-center gap-3 border-t border-copper/[0.06] pt-6 sm:flex-row sm:justify-between">
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] tracking-wider text-cream/50 sm:text-xs">
              &copy; {new Date().getFullYear()} Sandesh Hamal Thakuri &middot;
              Pokhara, Nepal
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[0.5625rem] tracking-wider text-cream/60 sm:text-[0.625rem]">
              Built with Next.js, Tailwind &amp; Framer Motion
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
