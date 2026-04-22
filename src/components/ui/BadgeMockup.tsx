"use client";

import Image from "next/image";
import { personal } from "@/data/personal";

/**
 * Hanging ID badge mockup — PSD-extracted frame overlay with HTML content.
 * Premium conference-badge aesthetic: edge-to-edge photo, clean typography.
 *
 * Frame: /images/devices/badge-frame.webp (1020×2498)
 * Content area: left 5.20%, top 45.20%, width 89.61%, height 51.84%
 */
export function BadgeMockup() {
  return (
    <div
      className="relative origin-top animate-badge-swing"
      style={{ aspectRatio: "1020 / 2498" }}
    >
      {/* Content layer — white card, inset within PSD copper border */}
      <div
        className="absolute overflow-hidden rounded-[2%] bg-white"
        style={{
          left: "5.20%",
          top: "45.20%",
          width: "89.61%",
          height: "51.84%",
        }}
      >
        {/* ── Photo — below hole, padded to preserve head ── */}
        <div className="flex w-full justify-center" style={{ marginTop: "12%", height: "42%" }}>
          <div className="relative h-full overflow-hidden rounded-[3px]" style={{ aspectRatio: "3 / 4" }}>
            <Image
              src="/images/me/me-about.webp"
              alt="Sandesh Hamal Thakuri"
              width={748}
              height={821}
              sizes="180px"
              quality={60}
              className="size-full object-cover"
              style={{
                objectPosition: "center 5%",
                filter: "contrast(1.12) saturate(1.05) brightness(1.18) sepia(0.04)",
              }}
            />
          </div>
        </div>

        {/* ── Info block — centered, breathing room ── */}
        <div className="flex flex-col items-center px-[8%] pb-[4%]" style={{ height: "44%" }}>
          {/* Name */}
          <h3 className="text-center font-[family-name:var(--font-heading)] text-[clamp(0.75rem,2.1vw,1.0625rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-charcoal">
            {personal.name.split(" ").slice(0, 2).join(" ")}
            <br />
            <span className="text-[0.85em] font-medium text-charcoal/70">
              {personal.name.split(" ").slice(2).join(" ")}
            </span>
          </h3>

          {/* Role pill */}
          <span className="mt-[4%] inline-block rounded-full border border-copper/20 bg-copper/[0.06] px-[8%] py-[1.5%] font-[family-name:var(--font-mono)] text-[clamp(0.25rem,0.85vw,0.4375rem)] uppercase tracking-[0.1em] text-copper">
            Full Stack Engineer
          </span>

          {/* Divider */}
          <div className="my-[5%] h-px w-[40%] bg-gradient-to-r from-transparent via-charcoal/10 to-transparent" />

          {/* Stats — compact 3-column */}
          <div className="grid w-[90%] grid-cols-3 gap-x-[4%]">
            <div className="text-center">
              <span className="block font-[family-name:var(--font-heading)] text-[clamp(0.625rem,1.6vw,0.875rem)] font-semibold tracking-tight text-copper">
                5+
              </span>
              <span className="block font-[family-name:var(--font-mono)] text-[clamp(0.1875rem,0.55vw,0.3125rem)] uppercase tracking-[0.03em] leading-tight text-charcoal/40">
                Years
              </span>
            </div>
            <div className="relative text-center">
              {/* Vertical separators */}
              <div className="absolute left-0 top-[10%] h-[80%] w-px bg-charcoal/8" />
              <div className="absolute right-0 top-[10%] h-[80%] w-px bg-charcoal/8" />
              <span className="block font-[family-name:var(--font-heading)] text-[clamp(0.625rem,1.6vw,0.875rem)] font-semibold tracking-tight text-copper">
                50+
              </span>
              <span className="block font-[family-name:var(--font-mono)] text-[clamp(0.1875rem,0.55vw,0.3125rem)] uppercase tracking-[0.03em] leading-tight text-charcoal/40">
                Projects
              </span>
            </div>
            <div className="text-center">
              <span className="block font-[family-name:var(--font-heading)] text-[clamp(0.625rem,1.6vw,0.875rem)] font-semibold tracking-tight text-copper">
                AWS
              </span>
              <span className="block font-[family-name:var(--font-mono)] text-[clamp(0.1875rem,0.55vw,0.3125rem)] uppercase tracking-[0.03em] leading-tight text-charcoal/40">
                Certified
              </span>
            </div>
          </div>

          {/* Location — anchored to bottom */}
          <div className="mt-auto flex items-center gap-1">
            <svg className="size-[6px] shrink-0 text-copper/50" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-[family-name:var(--font-mono)] text-[clamp(0.25rem,0.7vw,0.34375rem)] uppercase tracking-[0.06em] text-charcoal/35">
              {personal.location}
            </span>
          </div>
        </div>
      </div>

      {/* Frame overlay — PSD copper outline + clip + lanyard */}
      <Image
        src="/images/devices/badge-frame.webp"
        alt=""
        width={1020}
        height={2498}
        sizes="280px"
        className="pointer-events-none relative z-10 size-full object-contain"
        aria-hidden="true"
      />
    </div>
  );
}
