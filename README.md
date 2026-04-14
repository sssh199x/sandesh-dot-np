# Sandesh Hamal Thakuri — Portfolio

Personal developer portfolio built with Next.js 16, Tailwind CSS v4, GSAP, Framer Motion, and Lenis.

## Creative Direction: "Himalayan Dusk"

The scroll is a sunset. Background transitions from warm cream through amber to deep indigo as the user scrolls — like golden hour over Pokhara valley. Copper accents. Sora + Outfit + JetBrains Mono typography. Cinematic scroll-driven animations.

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Scroll Animation | GSAP + ScrollTrigger |
| UI Animation | Framer Motion |
| Smooth Scroll | Lenis |
| State | Zustand |
| Contact | Resend |
| Images | Optimized with next/image |
| Deploy | Vercel |

## Sections

1. **Hero** — Kinetic text reveal, floating code card, parallax layers
2. **About** — Bio + animated stat counters
3. **Experience** — Scroll-drawn timeline with 6 roles
4. **Projects** — Pinned asymmetric masonry with hover effects (dark section)
5. **Skills** — Cascading tech grid (dark section)
6. **Teaching** — AWS Educator featured card (return to light)
7. **Contact** — Text reveal heading, form with Resend
8. **Footer** — Minimal

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Key Design Decisions

- **No dark/light toggle** — the page IS the gradient from light to dark and back
- **Copper (#B87333) is the only accent** — one color, used with intention
- **Sage green (#7A8B6F) appears once** — in the Teaching section, making it special
- **GSAP for scroll, Framer for interactions** — no conflicts, clear separation of concerns
- **Lenis smooth scroll** — foundation layer, synced with ScrollTrigger
- **JetBrains Mono for all metadata** — reinforces the "developer" identity without code blocks everywhere

## Performance

Targeting 95+ Lighthouse across all categories. Static generation, optimized images, font preloading, code splitting per section.
