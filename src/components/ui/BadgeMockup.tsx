"use client";

import Image from "next/image";
import { personal } from "@/data/personal";

/**
 * Hanging ID badge mockup — PSD-extracted frame overlay with HTML content.
 * Warm parchment card with constrained portrait + minimal info block.
 * Single continuous gradient flows through entire card — no color breaks.
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
      {/* Content layer — card bg matches photo bg at top, deepens toward bottom */}
      <div
        className="absolute overflow-hidden rounded-[2%]"
        style={{
          left: "5.20%",
          top: "45.20%",
          width: "89.61%",
          height: "51.84%",
          background: "linear-gradient(180deg, #EDE5D8 0%, #F5F0E8 10%, #FEFEFE 25%, #FEFEFE 45%, #F5F0E8 75%, #F0EAE0 100%)",
        }}
      >
        {/* ── Photo — full bleed width, 50% height ── */}
        <div className="relative w-full" style={{ marginTop: "5%", height: "38%" }}>
          <Image
            src="/images/me/me-about.webp"
            alt="Sandesh Hamal Thakuri"
            width={748}
            height={821}
            sizes="220px"
            quality={65}
            className="size-full object-cover"
            style={{
              objectPosition: "center 0%",
              filter: "contrast(1.08) saturate(1.02) brightness(1.12) sepia(0.03)",
            }}
          />
        </div>

        {/* ── Info block — 50%, generous spacing ── */}
        <div className="flex flex-1 flex-col items-center justify-center px-[8%] pb-[3%]" style={{ paddingTop: "4%" }}>
          {/* Name — full charcoal, no faded surname */}
          <h3 className="text-center font-[family-name:var(--font-heading)] text-[clamp(0.75rem,2.1vw,1.0625rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-charcoal">
            {personal.name.split(" ").slice(0, 2).join(" ")}
            <br />
            <span className="text-[0.85em] font-medium text-charcoal">
              {personal.name.split(" ").slice(2).join(" ")}
            </span>
          </h3>

          {/* Role */}
          <span className="mt-[4%] font-[family-name:var(--font-mono)] text-[clamp(0.5rem,0.85vw,0.5625rem)] uppercase tracking-[0.1em] text-copper">
            Full Stack Developer
          </span>

          {/* Divider */}
          <div className="my-[5%] h-px w-[40%] bg-gradient-to-r from-transparent via-copper/20 to-transparent" />

          {/* Stats — compact 3-column */}
          <div className="grid w-[90%] grid-cols-3 gap-x-[4%]">
            {[
              { value: "5+", label: "Years" },
              { value: "50+", label: "Projects" },
              { value: "AWS", label: "Educator" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center ${i === 1 ? "border-x border-copper/10" : ""}`}
              >
                <span className="block font-[family-name:var(--font-heading)] text-[clamp(0.625rem,1.6vw,0.875rem)] font-semibold tracking-tight text-copper">
                  {stat.value}
                </span>
                <span className="block font-[family-name:var(--font-mono)] text-[clamp(0.4375rem,0.6vw,0.5rem)] uppercase tracking-[0.03em] leading-tight text-charcoal/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Location — separated from stats with its own divider */}
          <div className="mt-auto w-[40%] h-px bg-gradient-to-r from-transparent via-copper/15 to-transparent" />
          <div className="mt-[3%] flex items-center gap-1">
            <svg className="size-[6px] shrink-0 text-copper/50" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-[family-name:var(--font-mono)] text-[clamp(0.4375rem,0.7vw,0.5rem)] uppercase tracking-[0.06em] text-charcoal/45">
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
