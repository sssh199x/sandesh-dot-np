<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Creative Direction — "Himalayan Dusk"

## The Concept
This portfolio is designed around the golden hour in the Himalayas — that 20-minute window when the sun drops behind Machapuchare and the entire Pokhara valley turns amber, rose, and deep indigo. It's warm but serious. Calm but confident. The kind of light that makes everything look important.

It's NOT a dark theme. It's NOT a white theme. It's a **warm neutral canvas** that shifts tone section by section — like the sky changing color as you scroll through twilight.

## The Unforgettable Thing
**The scroll IS the sunset.** As the user scrolls, the background subtly transitions through a dusk gradient — warm cream at the hero, deepening to soft amber in the middle sections, settling into deep warm indigo at the contact/footer. The entire page is one continuous atmospheric shift. No section looks the same, but they all belong together.

---

## Color System

### The Dusk Gradient (Background — shifts per section)
```
Hero:        #FAF7F2  (warm morning cream)
About:       #F5F0E8  (golden parchment)
Experience:  #EDE4D4  (amber sand)
Projects:    #2C2826  (warm dusk charcoal)  ← the flip point
Skills:      #1E1B19  (deep evening)
Teaching:    #F5F0E8  (return to warmth — dawn after dusk)
Contact:     #1A1714  (night)
```

### Accent Colors
```
--copper:      #B87333   Primary — warm copper, like temple bells
--sage:        #7A8B6F   Secondary — Himalayan forest, grounding
--cream:       #FAF7F2   Light text on dark sections
--charcoal:    #1A1714   Dark text on light sections
--slate:       #6B6560   Muted text
--ghost:       rgba(184, 115, 51, 0.08)  Copper at low opacity for tags/surfaces
```

### Rules
- Light sections (#FAF7F2 → #EDE4D4): dark text (#1A1714), copper accents
- Dark sections (#2C2826 → #1A1714): cream text (#FAF7F2), copper accents
- The copper (#B87333) is the ONE constant across all sections — the thread
- Sage green is used sparingly — stat numbers, teaching badge, hover states
- NO pure white. NO pure black. NO blue. NO purple.

---

## Typography

### Font Stack
```
Headings:  Sora (Google Font) — geometric, confident, modern but warm
Body:      Outfit (Google Font) — humanist, excellent readability, friendly
Code:      JetBrains Mono — developer identity, used for labels/metadata/tags
```

### Scale (desktop)
```
display:    clamp(3rem, 6vw, 5.5rem)  Sora 600  tracking: -0.03em
heading-1:  clamp(2rem, 4vw, 3.5rem)  Sora 600  tracking: -0.02em
heading-2:  clamp(1.5rem, 2vw, 2rem)  Sora 500  tracking: -0.01em
body-lg:    1.125rem / 1.75           Outfit 400
body:       1rem / 1.7                Outfit 400
caption:    0.875rem / 1.5            Outfit 400   color: --slate
label:      0.75rem / 1.4             JetBrains Mono 500  tracking: 0.08em  uppercase
tag:        0.6875rem / 1.3           JetBrains Mono 400  tracking: 0.06em  uppercase
```

### Rules
- Display text: always Sora, always tight tracking, always a bold statement
- Body text: always Outfit, generous line-height — text should breathe
- Anything "system/technical" (nav items, tags, dates, metadata): JetBrains Mono, small, uppercase, tracked wide
- Numbers in stats: Sora at display size, colored copper — numbers are the hero
- NEVER use font-weight above 600. This is a portfolio, not a billboard.

---

## Animation Architecture

### Layer 1: Lenis (Foundation)
- Smooth scroll wrapper on the entire page
- Synced with GSAP via `lenis.on('scroll', ScrollTrigger.update)`
- Smooth, buttery, 0.8-1.0 duration, easeOutQuart

### Layer 2: GSAP + ScrollTrigger (Scroll-Driven)
These are tied to scroll position — they scrub:
- **Background dusk gradient** — the section backgrounds transition as you scroll between them
- **Parallax layers** — hero has 2-3 layers moving at different speeds
- **Timeline line draw** — experience section vertical line draws itself as you scroll through roles
- **Horizontal text marquee** — a thin strip of scrolling tech names as a section divider
- **Pinned sections** — projects section pins while cards animate in sequence

### Layer 3: Framer Motion (Viewport-Triggered + Interactions)
These fire once when entering viewport or on user action:
- **Section reveals** — each section fades up (y: 40 → 0, opacity: 0 → 1) with staggered children
- **Hover states** — project cards lift + shadow deepens, buttons glow, nav underlines slide
- **Tap/click feedback** — scale(0.98) spring on buttons
- **Hero text entrance** — words stagger in from bottom on page load, spring easing
- **Stat number counters** — animate from 0 to final value when in view
- **Contact form** — field focus animations, submit state transitions

### Layer 4: CSS (Ambient/Always-On)
- Grain texture overlay (SVG filter, 2% opacity, animated subtly)
- Cursor: custom copper dot that scales on hovering interactive elements
- Subtle pulsing glow on CTA buttons (CSS keyframes)
- Smooth color transitions on section backgrounds (CSS transitions triggered by GSAP)

### Animation Rules
- NEVER animate more than 3 things simultaneously in the same viewport
- Every animation must have purpose — reveal, guide attention, or provide feedback
- Easing: `power3.out` for reveals, `power2.inOut` for scrubbed, `spring` for interactions
- Duration: 0.6-0.8s for reveals, scroll-scrubbed for parallax, 0.2s for hover states
- Respect `prefers-reduced-motion` — disable GSAP timelines + Framer animations, keep Lenis
- Mobile: reduce parallax to single layer, disable pinned sections, simplify reveals

---

## Layout System

### Grid
12-column grid, max-width 1280px, centered. Side padding: 24px mobile, 48px tablet, 80px desktop.

### Section Spacing
- Between sections: 160px desktop, 100px tablet, 80px mobile
- Internal section padding: 80px top/bottom desktop

### Asymmetry Rules
- Hero name: starts at column 1, full bleed left energy
- About bio: columns 1-7, stats: columns 9-12
- Experience: timeline line at column 1, cards columns 2-12
- Projects: asymmetric masonry — cards are NOT the same size
- Skills: 3-column grid desktop, 2-column tablet, 1-column mobile
- Contact: centered, narrower (columns 3-10)

---

## Section-by-Section Spec

### 1. Hero
- **Nav:** Fixed top. Left: "sandesh." lowercase Sora bold, copper colored. Right: nav items in JetBrains Mono label style. "Get in Touch" pill button with copper bg.
- **Content:** Left-aligned. Small label "FULL STACK DEVELOPER" in JetBrains Mono. Then "Sandesh Hamal Thakuri" in display Sora — each word staggers in on load. Below: 2-line tagline in Outfit body-lg. Two buttons: "Explore My Work" (copper solid) + "Resume" (ghost outlined).
- **Right:** Floating code card with warm surface, soft shadow, showing a real TypeScript snippet. Gentle bobbing animation (CSS).
- **Ambient:** Subtle warm radial gradient behind content. 2 parallax layers — foreground text moves faster than background glow.
- **Bottom:** "Pokhara, Nepal · Open to Remote" in label style, left. Scroll indicator right.

### 2. About
- **Layout:** Two columns. Left (7 cols): heading "About" + bio paragraph. Right (3 cols, offset): three stat cards stacked — "5+" / "50+" / "AWS" with labels.
- **Animation:** Section fades up. Stats count up when in view. Cards stagger in 100ms apart.
- **Vibe:** Warm, personal, readable. This is the "human" section.

### 3. Experience
- **Layout:** Vertical timeline. Thin copper line on left that draws itself via GSAP scrub. 6 role cards.
- **Cards:** Company name (Sora heading-2), role + date on same line (JetBrains Mono label), description (Outfit body), tech tags (pills with ghost copper bg).
- **Animation:** Line draws on scroll. Each card reveals as timeline reaches it. Cards alternate slight offset left/right.
- **Data:** Silverline, Two Ace/Kaya, Informatics College, Exosolve, Krofile, Brand Builders — all from resume with real descriptions.

### 4. Projects (Dark Section — The Flip)
- **Background flips to dark (#2C2826)**. This is the dramatic moment. Text becomes cream.
- **Layout:** 4 cards, asymmetric masonry. Cards have different heights/widths.
- **Cards:** Project mockup image fills top, content below. Title in Sora heading-2, description in Outfit, tech tags as pills.
- **Animation:** Section pins. Cards animate in sequence (GSAP ScrollTrigger scrub). Each card scales from 0.9 to 1.0 and fades in. On hover: card lifts, copper shadow glows.
- **Projects:** Kaya E-Commerce, Exosolve Analytics, Rebuzz POS, Krofile Platform — real data from resume.

### 5. Skills (Dark Section)
- **Layout:** 6 category cards in 3x2 grid. Each card: category name in Sora, skills listed in Outfit body-sm.
- **Categories:** Frontend, Backend, Data Visualization, Database & ORM, Cloud & DevOps, Mobile
- **Animation:** Cards stagger in. Skills inside each card cascade with 30ms delay.
- **Visual:** Cards have subtle warm border (ghost copper). Category icon or decorative element optional.

### 6. Teaching (Return to Light)
- **Background returns to warm cream.** Feels like dawn after the dark sections.
- **Layout:** Full-width featured card. "AWS Verified Academy Educator" heading, sage green "Verified" accent. Description of teaching work. Below: 3 stats — "200+ Students", "7 Sections", "2 Courses".
- **Vibe:** Prestigious, warm. The sage green here is its only prominent appearance — makes it special.

### 7. Contact (Dark)
- **Background:** Deep night (#1A1714).
- **Layout:** Centered. "Let's Build Together" in display Sora, cream. Tagline below. Contact form (name, email, message) with Resend backend. Social links: GitHub, LinkedIn, Email.
- **Animation:** Heading text-reveal (copper block slides across). Form fields animate on focus.

### 8. Footer
- **Minimal.** Thin copper rule. "Sandesh Hamal Thakuri · Pokhara, Nepal · 2026" in label style. "Built with Next.js, Tailwind & Framer Motion" tiny text.

---

## Component Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout, font loading, Lenis provider, metadata
│   ├── page.tsx            # Assembles all sections
│   ├── globals.css         # Tailwind v4 @theme, custom properties, grain overlay, base styles
│   └── actions/
│       └── contact.ts      # Server action for Resend email
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed nav with scroll-aware blur
│   │   ├── Footer.tsx          # Minimal footer
│   │   ├── SmoothScroll.tsx    # Lenis wrapper + GSAP sync
│   │   └── SectionWrapper.tsx  # Reusable section with viewport reveal animation
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Teaching.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Button.tsx          # Copper solid + ghost variants
│   │   ├── Card.tsx            # Warm surface card with hover lift
│   │   ├── Tag.tsx             # Tech tag pill
│   │   ├── StatCard.tsx        # Number + label with count-up
│   │   ├── CodeBlock.tsx       # Styled code snippet display
│   │   ├── Timeline.tsx        # GSAP scroll-drawn line
│   │   ├── SectionHeading.tsx  # Heading + decorative label
│   │   └── CustomCursor.tsx    # Copper dot cursor
│   └── animations/
│       ├── TextReveal.tsx      # Word-by-word stagger reveal
│       ├── FadeUp.tsx          # Framer Motion fade + translate
│       ├── ParallaxLayer.tsx   # GSAP parallax wrapper
│       ├── CountUp.tsx         # Animated number counter
│       └── ScrollProgress.tsx  # Thin copper progress bar at top
├── data/
│   ├── experience.ts       # Work history array (typed)
│   ├── projects.ts         # Featured projects array (typed)
│   ├── skills.ts           # Tech categories (typed)
│   └── personal.ts         # Name, bio, contact info, socials
├── lib/
│   ├── gsap.ts             # GSAP + plugin registration (client-only)
│   ├── fonts.ts            # next/font/google — Sora, Outfit, JetBrains Mono
│   └── utils.ts            # cn() helper, etc.
└── types/
    └── index.ts            # Shared TypeScript interfaces
```

---

## Performance Targets
- Lighthouse: 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO
- First Contentful Paint < 1.2s
- Cumulative Layout Shift < 0.1
- All images: next/image with blur placeholder, WebP/AVIF
- Fonts: `display: swap`, preloaded
- GSAP: register plugins only on client, tree-shake unused
- Code split: each section lazy-loaded if below fold

---

## Implementation Patterns (CRITICAL)

### Dependencies to Install
```bash
npm install gsap @gsap/react
```

### GSAP Setup — Single Registration Point
```tsx
// src/lib/gsap.ts
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger, useGSAP };
```

### Lenis + GSAP Sync — The Foundation
```tsx
// src/components/layout/SmoothScroll.tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
```

### GSAP in Components — Always Use useGSAP
```tsx
// Pattern for scroll-triggered animations
"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function Section() {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(".reveal-item", {
      y: 60, opacity: 0, duration: 0.8, ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: container }); // auto-cleanup on unmount
  return <div ref={container}>...</div>;
}
```

### GSAP + Framer Motion — Division of Labor
| Concern | Tool | Why |
|---------|------|-----|
| Scroll-driven (parallax, pin, scrub, timeline draw) | GSAP ScrollTrigger | Built for scroll linking |
| UI transitions (hover, tap, mount/unmount, layout) | Framer Motion | Declarative React API |
| Page load entrance (hero text reveal) | GSAP SplitText | Best text splitting |
| Stat counters on scroll | GSAP ScrollTrigger | Needs scroll position |
| Card hover lift + shadow | Framer Motion whileHover | Gesture-native |
| Custom cursor | Framer Motion useSpring | Smooth with springs |

**CRITICAL RULE:** Never animate the same CSS property on the same element with both GSAP and Framer Motion simultaneously. If both need transforms, use GSAP on a wrapper div and Framer on the inner div.

### Kinetic Typography (Hero Text)
```tsx
// GSAP SplitText for hero name reveal
useGSAP(() => {
  const split = new SplitText(textRef.current, { type: "chars,words" });
  gsap.from(split.chars, {
    y: 80, opacity: 0, rotateX: -90,
    stagger: 0.03, duration: 0.8, ease: "back.out(1.7)",
  });
  return () => split.revert(); // critical for React 19 Strict Mode
}, { scope: textRef });
```

### Parallax
```tsx
// Use yPercent for responsive parallax
gsap.to(".parallax-bg", {
  yPercent: -30, ease: "none",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top bottom", end: "bottom top",
    scrub: true,
  },
});
// Mobile: reduce with ScrollTrigger.matchMedia
ScrollTrigger.matchMedia({
  "(min-width: 768px)": () => { /* full parallax */ },
  "(max-width: 767px)": () => { /* reduced or none */ },
});
```

### Magnetic Hover (Buttons/Links)
```tsx
// Framer Motion — lightweight, no extra deps
const x = useMotionValue(0);
const y = useMotionValue(0);
const springX = useSpring(x, { stiffness: 150, damping: 15 });
const springY = useSpring(y, { stiffness: 150, damping: 15 });
// onMouseMove: set x/y to (cursor - center) * 0.3
// onMouseLeave: set x/y to 0
```

### React 19 Strict Mode Gotchas
- `useGSAP` handles double-mount cleanup automatically — ALWAYS use it over `useEffect`
- SplitText MUST call `.revert()` in the cleanup return
- Never register plugins inside components — only in `lib/gsap.ts`
- Call `ScrollTrigger.refresh()` after fonts/images load to recalculate positions

### Next.js 16 Specifics
- `next build` does NOT run ESLint — must run `npm run lint` separately
- Turbopack is default dev bundler
- All section components need `"use client"` (animation libs require it)
- `page.tsx` can stay as server component — just composes client section components
- Fonts: use `next/font/google` in layout, apply as CSS variables on `<html>`
- Images: `next/image` with `placeholder="blur"` for local imports, configure `remotePatterns` for external
- Metadata: use `export const metadata: Metadata` in layout.tsx (already correct)
- OG images: create `opengraph-image.tsx` using `ImageResponse` from `next/og`

---

## Implementation Sequence
1. **Foundation** — `globals.css` (@theme), `layout.tsx` (fonts, providers, metadata), `types/index.ts`
2. **Infrastructure** — `lib/gsap.ts`, `SmoothScroll.tsx`, `store/navigation.ts`
3. **Data** — `data/personal.ts`, `data/experience.ts`, `data/projects.ts`, `data/skills.ts`
4. **Shared UI** — Button, Card, Tag, SectionWrapper, SectionHeading
5. **Animations** — TextReveal, FadeUp, ParallaxLayer, CountUp, CustomCursor
6. **Sections (top-down)** — Hero → About → Experience → Projects → Skills → Teaching → Contact → Footer
7. **Navigation** — Navbar with scroll-aware active state
8. **Contact Backend** — Server action with Resend
9. **Images** — Add project mockup images
10. **Polish** — OG image, favicon, responsive tuning, reduced-motion, Lighthouse audit
