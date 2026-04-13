"use client";

export function Footer() {
  return (
    <footer className="bg-dusk-contact px-[var(--spacing-container-px)] pb-8 pt-0">
      <div className="mx-auto max-w-[1280px]">
        {/* Copper rule */}
        <div className="mb-6 h-px w-full bg-copper/20" />

        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <span className="font-[family-name:var(--font-mono)] text-[0.625rem] tracking-wider text-cream/50 sm:text-xs">
            Sandesh Hamal Thakuri &middot; Pokhara, Nepal &middot; 2026
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[0.5625rem] tracking-wider text-cream/40 sm:text-[0.625rem]">
            Built with Next.js, Tailwind &amp; Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
