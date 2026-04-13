# Feature Breakdown — Sandesh Portfolio

Each feature is a self-contained unit of work. Build in order — each depends on the ones above it.

---

## Phase 1: Foundation

### F-01: Project Setup & Dependencies
- Install `gsap` and `@gsap/react`
- Verify dev server runs with `npm run dev`
- Clean up any leftover boilerplate files
- **Done when:** `npm run dev` works, all deps installed

### F-02: Tailwind v4 Theme & Global Styles
- Set up `@theme` directive in `globals.css` with full color system:
  - Dusk gradient backgrounds (7 section colors)
  - Accent colors (copper, sage, cream, charcoal, slate, ghost)
  - Font family CSS variables from next/font
  - Typography scale (display → tag)
  - Spacing tokens
  - Border radius tokens
- Base styles: reset, smooth scrolling, selection color
- Grain texture overlay (CSS SVG filter)
- **Done when:** All CSS variables defined, no visual output yet

### F-03: Font Loading
- Create `src/lib/fonts.ts` — load Sora, Outfit, JetBrains Mono via `next/font/google`
- Export font variables
- Apply to `<html>` in `layout.tsx`
- Wire font CSS variables into Tailwind @theme
- **Done when:** Fonts render correctly on a test heading/paragraph

### F-04: Root Layout & Metadata
- Update `layout.tsx` with fonts, metadata (title, description, OG tags)
- Set up proper `<html lang="en">` with font class variables
- Add favicon (generate or use simple one)
- **Done when:** Page title shows, fonts load, no CLS

### F-05: TypeScript Types
- Create `src/types/index.ts` with interfaces:
  - `Experience`, `Project`, `Skill`, `SkillCategory`
  - `ContactFormData`, `NavItem`, `StatItem`
  - `SectionId` union type
- **Done when:** All types defined, importable via `@/types`

### F-06: Data Files
- `src/data/personal.ts` — name, bio, tagline, email, socials, location
- `src/data/experience.ts` — 6 roles from resume (typed)
- `src/data/projects.ts` — 4 featured projects (typed)
- `src/data/skills.ts` — 6 categories with skills (typed)
- **Done when:** All data exported as typed constants, matches resume exactly

---

## Phase 2: Infrastructure

### F-07: GSAP Registration
- Create `src/lib/gsap.ts` — register ScrollTrigger, export gsap + useGSAP
- Client-only module (`"use client"`)
- **Done when:** Can import `{ gsap, ScrollTrigger, useGSAP }` from `@/lib/gsap`

### F-08: Smooth Scroll Provider (Lenis + GSAP)
- Create `src/components/layout/SmoothScroll.tsx`
- Initialize Lenis, sync with GSAP ticker
- Wrap children in layout.tsx
- **Done when:** Page scrolls smoothly with Lenis, ScrollTrigger works

### F-09: Zustand Navigation Store
- Create `src/store/navigation.ts`
- State: `activeSection`, `setActiveSection`, `isMenuOpen`, `toggleMenu`
- **Done when:** Store importable, state updates work

### F-10: Utility Helpers
- Create `src/lib/utils.ts` — `cn()` classname merger
- Any other shared helpers needed
- **Done when:** `cn()` works for conditional classnames

---

## Phase 3: Shared UI Components

### F-11: SectionWrapper
- Reusable section container with id, max-width, padding
- Accepts background color prop for dusk gradient
- Optional ref forwarding for GSAP
- **Done when:** Can wrap any content in a properly spaced section

### F-12: SectionHeading
- Heading text (Sora) + optional small label above (JetBrains Mono)
- Optional copper decorative line
- Adapts text color for light/dark sections
- **Done when:** Renders heading with label in correct typography

### F-13: Button Component
- Two variants: `solid` (copper bg) and `ghost` (outlined)
- Framer Motion whileTap scale
- Magnetic hover optional
- **Done when:** Both variants render, hover/tap animations work

### F-14: Card Component
- Warm surface with soft shadow
- Hover lift animation (Framer Motion)
- Adapts for light/dark section backgrounds
- **Done when:** Card renders with hover effect on both light and dark bgs

### F-15: Tag Component
- Small pill for tech stack labels
- JetBrains Mono, uppercase, tracked
- Ghost copper background
- **Done when:** Tags render inline, wrapping properly

### F-16: StatCard Component
- Large number (Sora display, copper) + label below
- CountUp animation when in view (GSAP or Framer)
- **Done when:** Numbers count from 0 to target on scroll into view

### F-17: CodeBlock Component
- Styled `<pre>` with fake editor chrome (dots, tab label)
- JetBrains Mono, warm surface background
- Gentle CSS bobbing animation
- **Done when:** Code snippet renders with editor look, floats gently

---

## Phase 4: Animation Components

### F-18: FadeUp Animation Wrapper
- Framer Motion component: fades children up on viewport enter
- Props: `delay`, `duration`, `y` offset
- Uses `useInView` or `whileInView`
- **Done when:** Any wrapped content animates in on scroll

### F-19: TextReveal (Kinetic Typography)
- GSAP SplitText — splits into chars/words
- Staggers from bottom with spring easing
- Cleanup with `.revert()` for React 19
- **Done when:** Hero name animates letter by letter on load

### F-20: ParallaxLayer
- GSAP ScrollTrigger wrapper
- Props: `speed` (yPercent amount), `direction`
- Responsive via `ScrollTrigger.matchMedia`
- Reduced/disabled on mobile
- **Done when:** Elements move at different scroll speeds

### F-21: ScrollProgress Bar
- Thin copper line at top of viewport
- Width tied to scroll position via GSAP scrub
- Fixed, z-50
- **Done when:** Progress bar fills as user scrolls the page

### F-22: Custom Cursor
- Copper dot that follows mouse with spring lag (Framer Motion)
- Scales up when hovering interactive elements
- Hidden on mobile/touch devices
- **Done when:** Custom cursor follows mouse smoothly, scales on links/buttons

---

## Phase 5: Sections (Build Top to Bottom)

### F-23: Navbar
- Fixed top, transparent → blurred on scroll
- Left: "sandesh." copper logotype
- Right: section links (JetBrains Mono label) + "Get in Touch" pill
- Active section highlighting from zustand store
- Mobile: hamburger → slide menu
- Smooth scroll to section on click (Lenis scrollTo)
- **Done when:** Nav renders, scrolls to sections, highlights active, works on mobile

### F-24: Hero Section
- Full viewport height
- Left: label + name (TextReveal) + tagline + 2 buttons + trust bar
- Right: CodeBlock floating card
- Bottom: location label + scroll indicator
- Parallax layers (warm gradient bg moves slower)
- Background: #FAF7F2
- **Done when:** Hero renders with all content, text animates on load, parallax works

### F-25: About Section
- Two-column layout (bio left, stats right)
- Bio paragraph from `data/personal.ts`
- 3 StatCards: "5+", "50+", "AWS"
- FadeUp animation on scroll
- Background: #F5F0E8
- **Done when:** About renders, stats count up on scroll

### F-26: Experience Section
- Vertical timeline with copper line
- GSAP scroll-scrubbed line draw
- 6 role cards from `data/experience.ts`
- Each card: company, role, date, description, tech tags
- Cards reveal as timeline progresses
- Background: #EDE4D4
- **Done when:** Timeline draws on scroll, all 6 roles render with staggered reveals

### F-27: Projects Section (Dark Flip)
- Background flips to #2C2826 — text becomes cream
- 4 project cards from `data/projects.ts` in asymmetric layout
- Each card: mockup image (placeholder for now) + title + description + tags
- GSAP pinned scroll — cards animate in sequence
- Hover: card lifts + copper glow shadow (Framer Motion)
- **Done when:** Dark section renders, cards pin-scroll, hover effects work

### F-28: Skills Section (Dark)
- 6 category cards in 3x2 grid
- Data from `data/skills.ts`
- Cards stagger in on scroll
- Skills inside cascade with 30ms delays
- Background: #1E1B19
- **Done when:** All categories render, staggered animation works

### F-29: Teaching Section (Return to Light)
- Background returns to #F5F0E8
- Featured full-width card
- "AWS Verified Academy Educator" with sage green "Verified"
- Teaching description + 3 stat highlights
- **Done when:** Teaching section renders with proper styling, sage accent

### F-30: Contact Section
- Background: #1A1714 (dark)
- "Let's Build Together" heading with text-reveal animation
- Contact form: name, email, message fields
- Submit button with loading/success/error states
- Social links: GitHub, LinkedIn, Email
- **Done when:** Form renders, fields animate on focus, UI states work (no backend yet)

### F-31: Footer
- Thin copper rule
- Name · Location · Year in label style
- "Built with..." credit line
- **Done when:** Footer renders properly

---

## Phase 6: Backend & Integration

### F-32: Contact Form Server Action
- Create `src/app/actions/contact.ts`
- Validate input (name, email, message)
- Send email via Resend SDK
- Return success/error response
- Wire to Contact section form
- **Done when:** Form submits, email received, success/error states display

### F-33: Scroll-Aware Active Section
- IntersectionObserver hook to detect current section
- Updates zustand store → Navbar highlights active link
- **Done when:** Nav active state updates correctly as user scrolls

### F-34: Background Dusk Gradient Transition
- GSAP ScrollTrigger controls background color transitions between sections
- Smooth interpolation as you scroll between section boundaries
- The entire page feels like one continuous atmospheric shift
- **Done when:** Background seamlessly transitions through all 7 section colors

---

## Phase 7: Images & Assets

### F-35: Generate Project Mockups (Stitch)
- Use Stitch MCP to generate 4 project mockup images:
  - Kaya e-commerce dashboard/product page
  - Exosolve analytics dashboard with charts
  - Rebuzz POS retail interface
  - Krofile business profile platform
- Export as optimized WebP, place in `public/images/projects/`
- Wire into project cards with `next/image`
- **Done when:** All 4 project cards show real mockup images

### F-36: OG Image
- Create `src/app/opengraph-image.tsx` using `ImageResponse`
- Or generate static OG image via Stitch
- Shows name, role, copper accent
- **Done when:** Social preview card shows when link is shared

### F-37: Favicon
- Generate or create a simple "S" favicon
- Place as `src/app/favicon.ico` or `src/app/icon.tsx`
- **Done when:** Browser tab shows custom icon

---

## Phase 8: Polish & Production

### F-38: Responsive Tuning
- Test all sections at: 375px, 768px, 1024px, 1440px
- Fix any layout breaks
- Reduce parallax on mobile, disable pinned sections
- Mobile nav menu works correctly
- **Done when:** All sections look great at all breakpoints

### F-39: Reduced Motion Support
- Detect `prefers-reduced-motion`
- Disable GSAP timelines and Framer animations
- Keep Lenis smooth scroll (less jarring than native)
- Simple fade-in instead of complex reveals
- **Done when:** Page is usable and pleasant with reduced motion enabled

### F-40: Lighthouse Audit & Performance
- Run Lighthouse on production build
- Fix any performance issues (image sizes, CLS, FCP)
- Ensure 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO
- Check contrast ratios on all text (copper on cream, cream on charcoal)
- **Done when:** All Lighthouse scores hit targets

### F-41: SEO & Meta
- Structured data (JSON-LD Person schema)
- Canonical URL
- Sitemap (if needed for single page)
- Verify metadata renders correctly
- **Done when:** SEO checklist passes, OG preview works

### F-42: Final Deploy
- Push to GitHub
- Deploy to Vercel
- Set environment variables (RESEND_API_KEY, etc.)
- Test contact form in production
- Verify custom domain (if applicable)
- **Done when:** Live at production URL, all features working

---

## Summary

| Phase | Features | Description |
|-------|----------|-------------|
| 1. Foundation | F-01 → F-06 | Setup, theme, fonts, types, data |
| 2. Infrastructure | F-07 → F-10 | GSAP, Lenis, Zustand, utils |
| 3. Shared UI | F-11 → F-17 | Reusable components |
| 4. Animations | F-18 → F-22 | Animation wrappers |
| 5. Sections | F-23 → F-31 | All 8 sections + navbar |
| 6. Backend | F-32 → F-34 | Contact form, scroll state, dusk gradient |
| 7. Images | F-35 → F-37 | Stitch mockups, OG image, favicon |
| 8. Polish | F-38 → F-42 | Responsive, a11y, perf, deploy |

**Total: 42 features across 8 phases.**
