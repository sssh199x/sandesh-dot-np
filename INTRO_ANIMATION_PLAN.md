# Intro Overlay Animation — Implementation Plan

> **Status:** Not started — implement this next.
> **Read CLAUDE.md and AGENTS.md first** for full creative direction and code conventions.

---

## What to Build

A cinematic full-screen intro overlay that plays on first page load, then fades out revealing the Hero section. Pure CSS animations — no GSAP or Framer Motion for the intro itself.

## Component Structure

```
src/components/animations/IntroOverlay.tsx   — the full overlay + animated wordmark
```

Render in `page.tsx` ABOVE everything else, `fixed inset-0 z-50`.

---

## Animation Sequence (CSS @keyframes only)

### Phase 1 — Decorative Emblem (0ms → 1200ms)
- A minimal **single-stem grass/reed silhouette** grows up from the bottom center
- Source: Download 1 minimal grass SVG from https://www.svgrepo.com/collection/type-of-grasses-vectors/
- Pick the most minimal, single-stem silhouette — NOT a full bush/landscape
- Tint: copper `#B87333` at full opacity
- Animation: `clip-path: inset(100% 0 0 0)` → `inset(0)` (reveals bottom-to-top, like it's growing)
- Duration: ~1200ms, `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo)
- Size: ~80px tall, centered above the wordmark

### Phase 2 — Decorative Underline (1250ms → 1750ms)
- A thin horizontal copper line reveals beneath the emblem
- Animation: `clip-path: inset(0 50% 0 50%)` → `inset(0)` (expands from center outward)
- Width: ~60px, height: 1px
- Color: `#B87333` at 40% opacity

### Phase 3 — Wordmark "sandesh." (2000ms → 3200ms)
- Each letter of "sandesh." revealed one by one, left to right
- Font: Sora (`--font-heading`), weight 600, size ~clamp(2.5rem, 5vw, 4rem)
- Color: `#B87333` (copper)
- Each letter is a `<span>` with individual `animation-delay`
- Animation per letter: `clip-path: inset(0 100% 0 0)` → `inset(0)` (reveals left to right)
- Duration: 250ms per letter, staggered 150ms apart
- Letters: s(2000ms) a(2150ms) n(2300ms) d(2450ms) e(2600ms) s(2750ms) h(2900ms) .(3050ms)

### Phase 4 — Tagline (2750ms → 3250ms)
- Text: "Full Stack Developer · Pokhara, Nepal"
- Font: JetBrains Mono (`--font-mono`), uppercase, tracked wide, ~0.75rem
- Color: `rgba(250, 247, 242, 0.5)` (cream/50)
- Animation: `opacity: 0` + `filter: blur(4px)` → `opacity: 1` + `filter: blur(0)`
- Duration: 500ms, starts at 2750ms

### Phase 5 — Overlay Dismissal (3500ms → 4100ms)
- Entire overlay fades out: `opacity: 1` → `opacity: 0`
- Duration: 600ms
- After fade completes: unmount component via `useState` + `onAnimationEnd`
- The Hero section entrance animations should begin playing AFTER this dismissal

---

## Technical Requirements

### Overlay Component
```tsx
// src/components/animations/IntroOverlay.tsx
"use client";
- useState to track `isDismissed`
- onAnimationEnd on the overlay wrapper to set isDismissed → return null
- Background: #1A1714 (night color from theme)
- Fixed inset-0 z-50
- Flexbox centered content
- All animations via CSS @keyframes + animation-delay (inline styles or CSS classes)
```

### CSS Keyframes Needed
```css
@keyframes grow-up      → clip-path: inset(100% 0 0 0) → inset(0)
@keyframes expand-center → clip-path: inset(0 50% 0 50%) → inset(0)
@keyframes reveal-left   → clip-path: inset(0 100% 0 0) → inset(0)
@keyframes reveal-blur   → opacity:0 + blur(4px) → opacity:1 + blur(0)
@keyframes fade-out      → opacity:1 → opacity:0
```

### Hero Timing Coordination
- Current Hero animations have hardcoded delays (label: 0.2s, name: 0.4s, tagline: 1.0s, etc.)
- These delays assume the hero is visible immediately on load
- After intro overlay: hero animations should start AFTER the overlay dismisses (~4.1s)
- Option A: Add an `introComplete` state/prop that gates hero animations
- Option B: Keep hero animations as-is — they play under the overlay, so by the time overlay fades at 3.5s, the hero is already fully revealed (simpler, may work fine)
- **Recommend Option B** — test it first, only add gating if it looks wrong

### Reduced Motion
- `prefers-reduced-motion: reduce` → skip intro entirely, show site immediately
- Check via `window.matchMedia` or CSS `@media (prefers-reduced-motion: reduce)`

### Session Behavior
- Intro plays once per session — use `sessionStorage` to track
- On revisit within same session: skip intro, show site immediately

---

## Design Constraints

### DO
- Keep it under 4 seconds total — respect the visitor's time
- Use the existing Sora + JetBrains Mono fonts (already loaded)
- Match the "warm but serious, calm but confident" tone
- The grass emblem should feel like a subtle nod to Nepal, not a nature theme

### DON'T
- Don't use GSAP or Framer Motion for the intro (CSS-only for this component)
- Don't add a background video/image — the dark overlay is enough
- Don't make the grass element too large or detailed — one minimal stem, not a landscape
- Don't add more than one grass SVG — restraint is key
- Don't delay site interactivity — the Hero should be hydrated and ready under the overlay

---

## Grass SVG Usage (from design audit)

**Source:** https://www.svgrepo.com/collection/type-of-grasses-vectors/

**Where to use:**
| Location | What | How |
|----------|------|-----|
| Intro overlay | Single minimal grass stem above wordmark | Copper, full opacity, grows up |
| Footer | Tiny grass silhouette next to "Pokhara, Nepal" | Copper at 20% opacity, ~16px tall |

**Where NOT to use:**
- Section dividers (too repetitive)
- Hero background (overpowers typography)
- Every section border (craft-blog energy)

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/animations/IntroOverlay.tsx` | CREATE — full overlay component |
| `src/app/globals.css` | EDIT — add @keyframes for intro animations |
| `src/app/page.tsx` | EDIT — render IntroOverlay above everything |
| `src/components/layout/Footer.tsx` | EDIT — add small grass SVG next to "Pokhara, Nepal" |
| `public/images/grass-stem.svg` | CREATE — the minimal grass SVG asset |

---

## Reference: Color Palette
```
Background:  #1A1714  (night)
Wordmark:    #B87333  (copper)
Tagline:     rgba(250, 247, 242, 0.5)  (cream/50)
Emblem:      #B87333  (copper)
Underline:   rgba(184, 115, 51, 0.4)  (copper/40)
```
