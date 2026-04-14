@AGENTS.md

# Sandesh Hamal Thakuri — Developer Portfolio

## Quick Context
Personal portfolio for a Full Stack Developer (5+ years, remote US companies), AWS Verified Academy Educator, Computing Instructor, Pokhara Nepal. Single-page scroll with cinematic animations.

## Tech Stack
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (`@theme` directive in globals.css, no tailwind.config)
- **Animation:** GSAP + ScrollTrigger (scroll-driven), Framer Motion (UI transitions), Lenis (smooth scroll)
- **State:** Zustand (minimal — contact form state only)
- **Email:** Resend (contact form backend via server action)
- **Fonts:** next/font/google — Sora (headings), Outfit (body), JetBrains Mono (code/labels)
- **Deploy:** Vercel
- **Images:** Optimized with next/image

## Dependencies to Add
```bash
npm install gsap @gsap/react
```

## Commands
- `npm run dev` — start dev server (Turbopack default)
- `npm run build` — production build (does NOT run linter)
- `npm run lint` — ESLint (must run separately, not part of build)

## Code Conventions
- All components are client components unless explicitly server (animation libs need client)
- GSAP initialization in a single `useGSAP()` hook per section, cleaned up on unmount
- Lenis initialized once in layout, integrated with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`
- Framer Motion for entry animations, hover/tap states, and AnimatePresence
- GSAP for scroll-scrubbed parallax, timeline drawing, pinned sections, text splits
- Section data lives in `src/data/` as typed constants — never hardcoded in components
- Images in `public/images/projects/` — optimized PNGs
- Use `@/*` path alias (maps to `./src/*`)
- `page.tsx` is a server component that composes client section components
- All section/animation components must be `"use client"`
- Never register GSAP plugins inside components — only in `lib/gsap.ts`
- SplitText must call `.revert()` in cleanup (React 19 Strict Mode)
- Call `ScrollTrigger.refresh()` after fonts/images load
