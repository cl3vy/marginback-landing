# Marginback — Landing Page

An editorial-fintech landing page for **Marginback**, a shared-network delivery
platform that gives independent restaurants their delivery margin back: a flat
$349/month with no commissions, performance-backed.

> *"It should look like a confident financial broadsheet that happens to be
> interactive — minimal, exact, and quietly bold."*

Built from a Claude Design handoff bundle as a production React + Vite app.

## Design system

- **Type** — Newsreader (editorial serif, display) · Instrument Sans (neutral
  grotesque, body) · IBM Plex Mono for every dollar figure (the ledger/receipt
  trust play).
- **Palette** — warm paper `#F7F4EE`, ink `#16140F`, a single money-green accent
  `#1F6B4A`, and a whisper of clay `#B0552F` for the "skimmed" segment.
- **Structure** — 12-column asymmetric grid, 1px hairline rules instead of
  cards/shadows, a mono `FIG.` footnote system and a thin top utility bar.

## Signature interactions

All motion respects `prefers-reduced-motion`.

- **Rolling-digit odometer** — every dollar figure spins into place like a cash
  register tallying up (hero, calculator outputs, ledger, price).
- **Interactive savings calculator** — type or drag your monthly delivery sales
  and the lost/kept split plus the annual verdict recompute live.
- **25¢ slice metaphor** — the platform dollar visibly gets skimmed on scroll
  while yours stays whole.
- **Scroll-reveal** — staggered fade + rise as sections enter view, a top
  scroll-progress hairline, and magnetic CTAs.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Project structure

```
index.html              # document shell + Google Fonts
src/
  main.jsx              # React entry point
  App.jsx              # page composition + scroll-progress bar
  styles.css           # full design system (tokens, layout, sections, motion)
  hooks.jsx            # motion primitives (count-up, reveal, in-view, magnetic)
  components/
    Odometer.jsx       # mechanical rolling-digit display
    Hero.jsx           # utility bar, nav, hero, live ticker
    Problem.jsx        # problem statement + slice metaphor
    MathLedger.jsx     # ledger comparison table
    Calculator.jsx     # interactive savings calculator
    Steps.jsx          # how it works + features
    Closing.jsx        # pricing, guarantee, social proof, final CTA, contact, footer
```

## Notes

- The savings figures are illustrative, based on a $10K/mo delivery store at a
  25% effective commission. Replace with real pilot numbers before publishing a
  guarantee.
- The contact form is front-end only — submissions show a confirmation state but
  are not yet wired to a backend, email service, or CRM.
- Social-proof cards are intentional placeholders; drop in real testimonials
  once the pilot closes.
