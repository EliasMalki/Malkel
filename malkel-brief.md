# MalkEl Solutions — Site Build Brief

A single-page marketing site for MalkEl Solutions, a full-service software and business agency. This brief contains everything required to design and build the site: positioning, copy, design system, layout, and motion.

---

## 1. The Company

**MalkEl Solutions** is a full-service software and business agency. We are the only partner a scaling business needs — strategy, software engineering, automation, and operations under one roof.

Our typical client is a $500K–$10M revenue business that has outgrown duct-taped tools and fragmented vendors. They are bleeding revenue invisibly through manual follow-ups, disconnected systems, and missed leads. We engineer them a unified revenue ecosystem that seals those leaks permanently and compounds returns over time.

We position software as a high-yield capital asset, not a line-item expense. We call this **Capital Allocation** and **Yield Engineering**.

**Core products under the MalkEl umbrella:**
- **ClyxAI** — Proprietary AI task-bots for 24/7 lead response, qualifying, and automated booking
- **Digital Storefronts** — High-converting web architecture
- **Core CRM** — Custom-built CRM workflows with airtight automation
- **Custom Engineering** — Bespoke internal tools (workforce management with biometric auth, GPS perimeter tracking, custom API bridging)

---

## 2. The Site

A single-page scroll. One continuous experience, ten sections, one conversion goal: get qualified prospects to request an infrastructure audit.

The site must do three things in the first five seconds:
1. Establish premium positioning visually
2. Make clear this is one partner replacing many
3. Make the visitor feel they are in adult company — operators talking to operators

---

## 3. Design Language

The reference is Apple. Specifically, Apple product pages — restrained, monochrome, type-led, with whitespace doing more work than any visual element. Translated to MalkEl's context:

- **Pure restraint.** Nothing decorative. Every element justifies its space.
- **Whitespace is the design.** Generous vertical rhythm. Sections breathe.
- **Monochrome.** Black background, white type. One accent color (gold) used exactly once on the entire page, as the climax of the central narrative.
- **No visible structure.** No hard borders between sections. Sections flow through space, not lines.
- **Type as hero.** Big, confident headlines do the work. Imagery and motion play supporting roles.
- **Subtle motion.** Scroll-tied transitions, never gimmicky. Apple-grade easing.
- **Pill buttons.** Fully rounded (border-radius: 980px), generous horizontal padding.

---

## 4. Color System

```
Background        #000000   pure black
Surface (raised)  #0A0A0A   used only when a card needs separation
Text primary      #FFFFFF   pure white
Text secondary    #FFFFFF at 60% opacity
Text tertiary     #FFFFFF at 35% opacity
Divider           #FFFFFF at 8% opacity (use sparingly)
Accent (Gold)     #D4A056   PIPELINE STORY CLIMAX ONLY — never anywhere else
```

No other colors anywhere. No gradients in any UI element. The Aurora Sweep background animation (§9) introduces extremely faint color in motion — never as a static element.

---

## 5. Typography

Apple system font stack. Renders as SF Pro on Apple devices, Segoe UI on Windows, Roboto on Android. No external fonts.

```
--font-display: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif;
--font-text:    -apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, sans-serif;
```

**Type scale (desktop):**

| Use | Size | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|
| Hero headline | 96–120px | 600 | -0.025em | 1.05 |
| Section headline | 64–80px | 600 | -0.022em | 1.08 |
| Eyebrow label | 13px | 500 | 0.08em UPPERCASE | 1.4 |
| Body large | 21px | 400 | -0.005em | 1.5 |
| Body | 17px | 400 | 0 | 1.55 |
| Body small | 14px | 400 | 0 | 1.5 |
| Stat numerals | 88–120px | 500 | -0.03em | 1 |
| Button | 15px | 500 | -0.005em | 1 |

All text sentence case. No ALL CAPS except eyebrow labels. No italics except editorial accents.

---

## 6. Layout & Spacing

- Container max-width: **1120px**
- Container side padding: 24px mobile, 48px desktop
- Section vertical padding: 160px mobile, **200px desktop**
- Grid: 12-column, 24px gutter
- Border-radius: 16px for cards, 980px for buttons (full pill)

---

## 7. Page Structure — Ten Sections

### Section 1 — Navigation

Sticky. Transparent on load, solid black with `backdrop-filter: blur(20px)` on scroll. Three elements:
- **Logo (left):** "MALKEL" in display font, 17px, weight 600, letter-spacing 0.08em
- **Nav links (center):** Ecosystem · Process · Why MalkEl · FAQ — 14px, weight 400, white at 60% opacity
- **CTA pill (right):** "Book an Audit" — white border at 22% opacity, transparent fill, white text

---

### Section 2 — Hero

Full viewport height. Centered. Vertical stack:

1. **Eyebrow:** Full-service software & business agency
2. **Headline:** The only software partner your business will ever need.
3. **Subhead:** We engineer end-to-end optimization and effortless scaling. Your dedicated CTO and full engineering team, under one roof.
4. **Buttons (side by side):**
   - Primary pill: "Explore the Ecosystem" (white fill, black text)
   - Ghost pill: "Book an Audit" (transparent, white border)
5. **Scroll indicator** at bottom: thin vertical line + small "Scroll" label

**Motion:** Hero headline translates upward at 0.18× scroll speed and fades out fully by ~500px scrolled.

---

### Section 3 — Trust Marquee

A slim, single-line marquee of partner technology names. No card, no header, just the line — used as a visual breath between Hero and the Pipeline Story.

**Tech names:** GoHighLevel · HubSpot · OpenAI · Stripe · Vercel · Twilio · Zapier · Calendly · AWS · Supabase

**Style:** White text at 18% opacity, 13px, weight 600, 0.1em letter-spacing, uppercase. Auto-scrolls left in a 30-second linear loop. Pauses on hover.

---

### Section 4 — The Pipeline Story *(the emotional center)*

This is the most important section on the page. It tells a complete before/after narrative in three connected scroll phases. Do not split it into separate sections.

**Phase A — The cost:**
- Eyebrow: The cost of the unknown
- Massive stat numeral: **30%**
- Caption: of revenue lost to leaky pipelines, manual tasks, and fragmented systems

**Phase B — The animation:**

A horizontal pipeline visualization rendered in canvas. Initial state: three pipe segments with two visible gaps between them. Small white dots continuously fall through the gaps, representing leaking leads.

When the section enters the viewport (40% threshold), the animation transforms. A **gold seal sweeps across the pipeline from left to right** over ~2 seconds, closing every gap. This is the **only** gold moment on the entire page. After the seal completes, gold pulse rings radiate gently from the center on a loop.

**Phase C — The resolution:**

Three stats fade into view, arranged horizontally:
- **<60s** — Lead response, around the clock
- **10×** — Faster than building in-house
- **1** — Partner replaces six or more vendors

Closes with one body line: *Every leak, permanently closed.*

---

### Section 5 — The Ecosystem *(Bento Grid)*

- Eyebrow: The MalkEl Ecosystem
- Headline: One roof. Every solution.

Below: a 2-row bento grid on a 12-column base. **No visible borders** between cards — separation comes from a very subtle background tint (white at 3% opacity) and generous gap (24px).

**Row 1** (7 columns + 5 columns):

**ClyxAI — 24/7 Lead Automation**
Proprietary AI task-bots for instant lead response, intelligent qualifying, and automated calendar booking. Your pipeline works while you sleep.

**Digital Storefronts**
High-speed, conversion-optimized web architecture designed to capture market share and establish immediate authority.

**Row 2** (5 columns + 7 columns):

**Core CRM & Revenue Infrastructure**
Custom-built CRM workflows and API bridging that ensure zero lead leakage by automating the entire nurture-to-close pipeline.

**Custom Engineering & Internal Tooling**
Bespoke software for what off-the-shelf SaaS can't fix. Workforce platforms with biometric auth, GPS perimeter tracking, QR clock-ins, and custom API bridging built precisely to your operational reality.

Each card: large ghost numeral (01–04) at top in white at 5% opacity, small eyebrow tag, title (24px, weight 600), body (17px, weight 400, white at 60% opacity).

---

### Section 6 — The Process

- Eyebrow: How it works
- Headline: From fragmented to compounding.

Below: four horizontal steps with **generous spacing and no vertical dividers** — pure whitespace separates them. Each step:

| | | |
|---|---|---|
| **01 Audit** | We map every leak in your current stack and quantify the exact capital you're losing. |
| **02 Architect** | We design your unified revenue ecosystem — custom-fit to your business model, team size, and growth targets. |
| **03 Deploy** | We build, integrate, and automate everything. Front-end, back-end, AI layer, CRM — delivered as a single unified system. |
| **04 Compound** | We optimize and scale your infrastructure over time. The longer we work together, the higher your yield. |

Step numerals in display font, 88px, weight 500, white at 5% opacity. Titles in 17px weight 600. Body in 14px weight 400 white at 60%.

---

### Section 7 — Why MalkEl *(Manifesto + Comparison)*

A statement-driven section. Not a feature spec, not a comparison table — a manifesto with comparison embedded as proof.

- Eyebrow: Why MalkEl
- Headline: Built by operators, for operators.

**Three paragraphs of manifesto copy in body large (21px), generously spaced:**

> MalkEl was founded on a simple premise: the businesses that scale fastest aren't the ones with the biggest budgets — they're the ones whose software works as hard as they do.

> We don't sell websites and disappear. We become the engineering infrastructure behind your business — strategy, software, automation, and operations, all under one roof, all working together.

> Every engagement starts with an audit. Every solution is engineered for yield. Every system is built to compound over time.

**Below the manifesto, a comparison appears as two columns of clean type — no cards, no borders, just a subtle vertical line at 8% opacity dividing them:**

| The standard model | The MalkEl way |
|---|---|
| Six or more disconnected vendors | One dedicated partner |
| Manual follow-ups, delayed response | AI response in under 60 seconds |
| Software treated as expense | Software engineered as capital asset |
| Build and disappear | Embedded long-term engineering |

Left column at 50% white opacity. Right column at 100%.

---

### Section 8 — FAQ

- Eyebrow: Questions
- Headline: Worth answering up front.

Four accordion items. Smooth max-height transition. One open at a time.

1. **What does "one roof" actually mean?**
   It means you have one partner accountable for every layer of your digital infrastructure — from the website visitors first see, to the AI that responds to their inquiry, to the CRM that routes them to close, to any custom internal tooling your ops team needs. No hand-offs. No finger-pointing between vendors.

2. **What size business is MalkEl built for?**
   We work best with businesses generating $500K–$10M+ in annual revenue that are scaling and feeling the friction of a fragmented tech stack. If you're manually handling tasks that should be automated, or managing more than three separate tools that don't talk to each other, you're a strong fit.

3. **How long does a typical engagement take?**
   Initial deployment — from audit to live system — typically runs 6 to 12 weeks depending on scope. After that, most clients move to an ongoing retainer for optimization, scaling, and new feature development.

4. **How is MalkEl different from a dev agency?**
   A dev agency takes a brief and builds to spec. We take ownership of outcomes. We audit your pipeline, architect the right solution, and stay accountable for results. We think like a CTO, not a contractor.

---

### Section 9 — The Audit *(conversion form)*

Centered. Final conversion section.

- Eyebrow: Start the conversation
- Headline: Ready to audit your digital infrastructure?
- Sub: Tell us where you are. We'll tell you exactly what it would take to seal your pipeline.

**Form fields:**
- Name + Company (two-column row)
- Email + Monthly Lead Volume (dropdown: <100 / 100–500 / 500–2K / 2K+) — two-column row
- Biggest Bottleneck (dropdown, full-width) — options: Slow lead follow-up / Disconnected tools / Manual ops / Poor conversion / No pipeline visibility / All of the above
- Target Revenue Goal (dropdown, full-width) — options: $500K–$1M / $1M–$5M / $5M–$20M / $20M+
- Open text area (full-width, placeholder: "Brief context on your business and what you're trying to solve...")
- **Submit pill button (full-width):** Request Infrastructure Audit
- Note below: We review every submission personally. No spam, no outsourced sales calls.

Form inputs: white at 4% background fill, white at 8% border, white text. On focus: border becomes white at 28%.

---

### Section 10 — Footer

Top border at 8% white opacity. Four-column grid:

1. **Brand column:** "MALKEL" + tagline: "Full-service software & business agency. Strategy, engineering, automation, and operations — under one roof, engineered for yield."
2. **Services:** ClyxAI Automation · Digital Storefronts · Core CRM Build · Custom Engineering · Workforce Platform
3. **Company:** About · Process · FAQ · Case Studies
4. **Contact:** Book an Audit · hello@malkel.com · LinkedIn · Instagram

Bottom bar: copyright (left), Privacy Policy + Terms of Service (right). All footer text at 38% white opacity, links hover to 100%.

---

## 8. The One Special Moment

To repeat for emphasis: **gold (#D4A056) is used exactly once on the entire page** — during the Pipeline Story climax (Section 4, Phase B), when the seal sweeps across to close the leaks. Nowhere else. Not in buttons, not in highlights, not in hover states.

This single gold moment is the visual signature of the entire site. Treat it as sacred.

---

## 9. Animations & Interactions

**Aurora Sweep (background, site-wide)**
A fixed full-viewport canvas behind all content. Three sine-wave color bands (teal hue 185°, blue hue 210°, mint hue 165°) drift slowly with different sine frequencies and offsets, so the pattern never visibly repeats. Each band rendered at ~5% opacity. Pure black background underneath. The aurora should feel atmospheric — barely perceptible until you stare.

**Hero parallax**
Hero headline: `translateY(scroll * 0.18)` and opacity `1 - scroll/500`.

**Section reveals**
Every section enters with: 700ms fade + 26px upward translate when 12% visible in viewport. Use IntersectionObserver. Stagger child elements by 100ms delays.

**Pipeline animation (Section 4)**
HTML canvas, ~140px tall, full container width. Particles continuously simulate leaking leads through two pipe gaps. When section reaches 40% viewport visibility, the gold seal sweeps left → right over ~2 seconds. After completion, gold pulse rings emanate from center every 1.4 seconds (subtle, looped).

**Marquee (Section 3)**
CSS `transform: translateX` infinite linear loop, 30s per cycle. Pauses on `:hover`. Mask edges with `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)`.

**FAQ accordion (Section 8)**
`max-height` transition with 400ms ease curve. Only one open at a time (close others on open).

**Buttons**
Pill buttons fade to 88% opacity on hover (200ms). No transforms, no shadow changes. Active state: scale(0.98) for 100ms.

**Easing curve**
Use `cubic-bezier(0.16, 1, 0.3, 1)` (Apple-style ease-out) for all transitions except the marquee (linear).

---

## 10. Responsive Behavior

- **Desktop:** 1025px+ — full layouts as specified
- **Tablet:** 769–1024px — type scales down ~20%, two-column rows in form remain, bento collapses to 2×2 grid
- **Mobile:** ≤768px — single column everywhere, condensed type, full-width buttons, hero headline at 56–64px, form fields stacked

---

## 11. Accessibility & Performance

- Minimum font size: 14px anywhere
- All interactive elements have visible focus states: 2px white outline at 60% opacity, 4px offset
- Color contrast easily exceeds WCAG AAA (white on black)
- Form inputs use real `<label>` elements (visible)
- Aurora canvas pauses if `prefers-reduced-motion: reduce`
- All scroll animations respect `prefers-reduced-motion` (replace with instant fade-in)
- Target Lighthouse 95+ on Performance, Accessibility, Best Practices, SEO
- No external font loads (system font stack only)
- Lazy-load any images
- Canvas animations use `requestAnimationFrame`, not `setInterval`

---

## 12. Deliverables

- One Framer project, single page, fully responsive
- Working accordion (FAQ section)
- Working form (use Framer's built-in form handling, route submissions to TBD email/CRM)
- All copy, layout, and motion exactly as specified above
- Source files / Framer project access
- Mobile, tablet, and desktop breakpoints all reviewed and polished

---

## 13. Final Notes for the Build Team

The single biggest risk to this site is **over-design**. If you're tempted to add a gradient, a colored highlight, an icon, an illustration, or any decorative element not specified above — don't. The restraint is the brand.

The single biggest risk to the copy is **over-explanation**. Every line is calibrated. Don't pad sentences, don't add subheadings, don't break paragraphs into bullet points. Trust the reader.

When in doubt, look at apple.com/iphone or stripe.com. That's the benchmark.
