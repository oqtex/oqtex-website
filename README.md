# OQTEX — AI-Powered Ophthalmology Technologies
## Premium Med-Tech Website | Production Ready ✅

> **Status:** Complete · All tests passing · Zero JS errors · Production build confirmed
> **Last tested:** PlaywrightConsoleCapture — 1 console message (branded log only), 10.56s load

---

## Project Overview

OQTEX is an Egyptian Med-Tech company at the intersection of artificial intelligence, ophthalmology, and digital healthcare infrastructure. This is a premium, cinematic, Apple-level static website showcasing the OQTEX brand, products (OQfy + OQgen), and the OQmega R&D division.

**Design Philosophy:** Futuristic medical · Elite AI company · Cinematic storytelling

---

## File Structure

```
index.html              Main landing page (49,349 bytes)
css/
  ├── style.css         Main stylesheet (51,830 bytes)
  └── animations.css    Enhanced animations & polish layer (38,698 bytes)
js/
  └── main.js           All JavaScript — canvases, interactions, effects (34,045 bytes)
images/
  ├── oqtex-logo.png    Full OQTEX horizontal logo (86,927 bytes)
  ├── oqtex-icon.png    OQTEX icon only — Q+X mark (237,475 bytes)
  ├── oqfy-logo.png     OQfy product logo — concentric rings + Q tail (99,810 bytes)
  └── oqgen-logo.png    OQgen product logo — concentric circles + oq center (189,996 bytes)
README.md               This file
```

---

## Brand Guidelines

| Token | Value | Usage |
|-------|-------|-------|
| `--copper` | `#C97F52` | Primary brand color, CTAs, icons |
| `--copper-light` | `#E0A37A` | Glow, highlights, hover states |
| `--copper-dark` | `#A3613A` | CTA gradients, secondary accents |
| `--red-deep` | `#6F1D1B` | Deep accents, hero ambience |
| `--red-mid` | `#8D2A2A` | OQgen accents, card borders |
| `--red-accent` | `#A33A3A` | OQgen highlights |
| `--bg-0` | `#050505` | Primary background |
| `--bg-1` | `#0B0B0B` | Section backgrounds |

**Fonts:** Space Grotesk (headings) · Sora (hero) · Inter (body)

---

## Page Sections

| # | Section | ID | Notes |
|---|---------|-----|-------|
| 1 | Navigation | `#navbar` | Sticky · scrolled state · hamburger mobile · active link tracking |
| 2 | Hero | `#hero` | Neural canvas · retina rings · floating panels · hero stats |
| 3 | Trust Bar | `.trust-bar` | 12-item infinite scroll ticker (24 items × seamless loop) |
| 4 | About | `#about` | Story · 4 glass cards · animated stat counters |
| 5 | Products | `#products` | OQfy + OQgen cards with hero banner logos + mockup screens |
| 6 | OQmega | `#oqmega` | **VERY IMPORTANT** — R&D division · 4 pillars · code window · 4 team cards |
| 7 | Why OQTEX | `#why` | 6 advantage cards |
| 8 | Vision | `#vision` | Canvas retina rings · quote · 4 vision pillars |
| 9 | Contact | `#contact` | Form (simulated submit) · contact info · social links |
| 10 | Footer | `.footer` | Brand · 3 link columns · badges |

---

## Implemented Features

### Visual Effects
- [x] **Neural Network Canvas** — 70 nodes, copper/red color palette, proximity connections, pulsing glow
- [x] **Retina Scan Rings** — 3 concentric rings with animated scan beam, mouse parallax tracking
- [x] **Floating Particles** — 30 JS-generated hero particles with random float animations
- [x] **OQmega Particle Canvas** — 50-node ambient particle network
- [x] **Vision Retina Canvas** — 8 animated concentric rings + 12 radial vessels + center glow pulse
- [x] **Scroll Progress Bar** — `#scrollProgress` fixed top, `scaleX` driven

### Product Card System (Hero Banner)
- [x] **Product Hero Banner** — Full-bleed gradient banner at top of each card
- [x] **OQfy Logo** — `images/oqfy-logo.png` with `mix-blend-mode: screen` (black bg → transparent)
- [x] **OQgen Logo** — `images/oqgen-logo.png` with `mix-blend-mode: screen`
- [x] **Logo hover effects** — Scale + rotate + copper/red glow drop-shadow
- [x] **Product badge** — Top-right pill (Clinical Platform / AI Engine)
- [x] **Card body padding** — Direct child selectors (`product-card > .product-title` etc.) for clean layout after zero-padding card

### Animations & Interactions
- [x] **Preloader** — Branded loading screen with gradient progress bar, fades out after window.load + 1.4s
- [x] **Scroll Reveal** — IntersectionObserver, `.reveal-up / .reveal-left / .reveal-right → .revealed`
- [x] **Counter Animation** — Ease-out-cubic, triggers on viewport entry
- [x] **Hero Entrance Sequence** — Staggered opacity/transform reveals (badge → title → CTA → stats → panels)
- [x] **Trust Bar Ticker** — `animation: trust-scroll 30s linear infinite`, pauses on hover
- [x] **OQmega Holographic Team Cards** — `@keyframes holo-spin` spinning rings, accelerate on hover
- [x] **3D Card Tilt** — `perspective(800px) rotateY/X` on `mousemove` for product, pillar, why cards
- [x] **Cursor Glow** — 300px radial gradient follows mouse (desktop only, skipped on touch)
- [x] **Product Glow Follow** — `.product-glow` tracks cursor within card bounds
- [x] **Retina Ring Parallax** — Rings shift on hero `mousemove` with staggered factor
- [x] **Code Window Animation** — Code lines animate in on IntersectionObserver
- [x] **Research Bars** — Width animates from 0 on viewport entry
- [x] **Glassmorphism Sweep** — `glass-card::before` diagonal shine on hover
- [x] **Gradient Text Shimmer** — `.gradient-text` copper shimmer, 4s loop
- [x] **Ambient Hero Pulse** — `hero-section::before` radial glow, 8s pulse
- [x] **Footer Reveal** — Fade-in translateY on IntersectionObserver
- [x] **OQmega Emblem Spin** — 3 concentric rings, accelerate on `mouseenter`

### Technical Architecture
- [x] **Pure Vanilla Stack** — HTML5 / CSS3 / ES6+ (no frameworks)
- [x] **3× Canvas API** — `neuralCanvas`, `oqmegaCanvas`, `visionCanvas`
- [x] **ResizeObserver** — All canvases auto-resize with container
- [x] **CSS Custom Properties** — Full theming via `:root` variables
- [x] **Glassmorphism** — `backdrop-filter: blur(20px)` on all glass cards
- [x] **`mix-blend-mode: screen`** — Product logos (black bg) become transparent on dark cards
- [x] **Passive event listeners** — Scroll/mousemove optimized
- [x] **Mobile Optimization** — Heavy canvas disabled on `hardwareConcurrency < 4`

### SEO & Meta
- [x] Full `<meta>` tags (description, keywords, robots)
- [x] Open Graph (og:title, og:description, og:image, og:type)
- [x] Twitter Card (summary_large_image)
- [x] Canonical URL (`https://oqtex.ai`)
- [x] Theme color (`#C97F52`)
- [x] Apple touch icon + favicon

---

## Product Card Architecture

```
.product-card (padding: 0 — banner bleeds full width)
  ├── .product-glow           ← radial gradient, follows cursor
  ├── .product-hero-banner    ← full-bleed gradient top banner
  │   ├── .product-hero-bg    ← absolute overlay gradient
  │   ├── .product-hero-content
  │   │   ├── .product-hero-icon → img.product-logo-img (mix-blend-mode: screen)
  │   │   └── .product-hero-text → .product-name + .product-tagline
  │   └── .product-hero-badge ← top-right pill
  ├── h3.product-title        ← padding-left/right: 28px; padding-top: 24px
  ├── p.product-desc          ← padding-left/right: 28px
  ├── .product-features       ← padding-left/right: 28px (2-col grid of feat-items)
  ├── .product-mockup         ← padding-left/right: 28px; padding-bottom: 4px
  └── a.product-cta           ← padding-left/right: 28px; padding-bottom: 28px
```

---

## JavaScript Module Map (`js/main.js`)

| Function | Purpose |
|----------|---------|
| `initNavbar()` | Sticky scroll state, hamburger, active link IntersectionObserver |
| `initNeuralCanvas()` | 70-node animated network on hero canvas |
| `initOqmegaCanvas()` | 50-node particle ambient network on oqmega canvas |
| `initVisionCanvas()` | 8 rings + 12 vessels + center glow on vision canvas |
| `initHeroParticles()` | 30 JS-injected floating particles in hero |
| `initScrollReveal()` | IntersectionObserver → `.revealed` class |
| `initCounters()` | Ease-out-cubic counter animation on `data-target` |
| `initHeroStats()` | Same counter logic for hero stat numbers |
| `initResearchBars()` | Width animate from 0 on `.rs-bar` elements |
| `initContactForm()` | Prevent default + simulated async submit + success state |
| `initSmoothScroll()` | Native smooth scroll with 72px navbar offset |
| `initCardTilt()` | 3D perspective tilt on product/pillar/why cards |
| `initParallax()` | Hero content + retina rings on scroll |
| `initProductFeatures()` | Hover color + icon scale on feat-items |
| `initCodeEffect()` | Code lines slide in on IntersectionObserver |
| `initAmbientGlow()` | Section `--section-active` custom property |
| `initFavicon()` | Dynamic favicon injection |
| `initPreloader()` | Branded loading screen with gradient bar |
| `initCursorGlow()` | 300px radial cursor glow (desktop only) |
| `initProductGlowFollow()` | `.product-glow` cursor tracking per card |
| `initCinematicEntrance()` | Inject `@keyframes section-enter` |
| `initWhyCardStagger()` | Staggered transition delays on why cards |
| `initAboutStatsHover()` | Scale on hover for astat numbers |
| `initVisionQuote()` | Fade-in vision quote on IntersectionObserver |
| `initGlassBorderPulse()` | Pulsing border glow on oqmega pillar cards |
| `initScrollProgress()` | `#scrollProgress` scaleX driven by scroll % |
| `initHeroEntrance()` | Staggered entrance for all hero elements |
| `initColorTrails()` | Inject transition CSS for about/pillar/why/team/vpillar cards |
| `initRetinaInteractive()` | Hero retina rings follow mouse with parallax factor |
| `initProductDeepGlow()` | Inject deep hover glow for product cards |
| `initTrustBarHover()` | Pause trust bar animation on mouseenter |
| `initFooterReveal()` | Footer fade-in on IntersectionObserver |
| `initOqmegaRings()` | OQmega emblem ring spin acceleration on hover |

---

## Logo Technical Notes

**OQfy logo** (`images/oqfy-logo.png`, 99,810 bytes)
- Design: Concentric rings with Q-tail motif
- Colors: Deep red + copper — matches brand palette perfectly
- Background: Black → `mix-blend-mode: screen` makes it transparent on dark cards
- Filter: `brightness(1.10) saturate(1.15)` at rest; enhanced glow on hover

**OQgen logo** (`images/oqgen-logo.png`, 189,996 bytes)
- Design: Concentric circles with "oq" center mark
- Colors: Copper/dark-red palette
- Background: Black → `mix-blend-mode: screen` makes it transparent on dark cards
- Filter: `brightness(1.08) saturate(1.10)` at rest; enhanced glow on hover

**Source URLs (official):**
- OQfy: `https://www.genspark.ai/api/files/s/ymFhNoJb`
- OQgen: `https://www.genspark.ai/api/files/s/4RqFFmPS`
- OQTEX Logo: `https://www.genspark.ai/api/files/s/smZwJjg7`
- OQTEX Icon: `https://www.genspark.ai/api/files/s/DNCA33ej`

---

## Production Test Results

```
✅ PlaywrightConsoleCapture — index.html
   Total console messages: 1
   Messages: [LOG] OQTEX — Ophthalmology Meets Intelligence (branded only)
   Errors: 0
   Warnings: 0
   404s: 0
   Load time: 10.56s
```

---

## Responsive Breakpoints

| Breakpoint | Key Changes |
|-----------|-------------|
| `≤ 1024px` | Products grid → 1 column |
| `≤ 900px` | OQmega team grid → 2×2, about-grid stacked |
| `≤ 768px` | Nav links hidden → hamburger menu, hero panels hidden |
| `≤ 480px` | Team grid 2×2 compact, trust bar speed up |

---

## Deployment

To publish this website, go to the **Publish tab** and click publish. The Publish tab handles all deployment automatically and provides the live URL.

---

## Potential Future Enhancements

- [ ] Add real team member names and photos to OQmega team cards
- [ ] Connect contact form to a backend email service (Formspree / EmailJS)
- [ ] Add dedicated product detail pages (`/oqfy` and `/oqgen`)
- [ ] Add a news/blog section for OQTEX research publications
- [ ] Add real video demo embed for product showcase
- [ ] Implement language toggle (Arabic / English) for MENA audience
- [ ] Add Google Analytics or Plausible analytics integration
- [ ] Create a careers page for OQmega team hiring
- [ ] Add HIPAA / compliance documentation page
- [ ] Progressive Web App (PWA) manifest + service worker for offline support
