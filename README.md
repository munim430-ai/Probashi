# Probashi Design System

**Company:** Keystone Software Solutions  
**Product:** Probashi — a digital platform for Bangladeshi migrant workers (প্রবাসী)  
**Sources:** GitHub repo `munim430-ai/Probashi` (stub only — one-line README), plus brand brief from project owner.

---

## What is Probashi?

"Probashi" (প্রবাসী) means *expatriate* in Bengali — someone living abroad. The Probashi platform serves Bangladeshi migrant workers globally, covering:

- **Remittance & financial services** — send money home, track transfers
- **Job search & placement** — find verified overseas jobs
- **Documentation support** — visa, passport, contract guidance
- **Community & support** — connect with other Bangladeshi workers abroad
- **Emergency assistance** — legal, medical, repatriation support

The brand speaks directly to the Bangladeshi diaspora, particularly blue-collar and semi-skilled workers in the Gulf, Malaysia, Singapore, and beyond. It combines national pride (flag colors) with modern digital utility.

---

## CONTENT FUNDAMENTALS

### Voice & Tone
- **Warm, direct, empowering.** The platform speaks *with* workers, not *at* them.
- **Bilingual:** English + Bengali (বাংলা). Bengali is primary for emotional/cultural moments; English for technical/global contexts.
- **Plain language:** Audience may have limited formal education — avoid jargon, use short sentences.
- **First person (আমরা / We):** "We help you get home safely" not "Users are assisted…"
- **Second person (আপনি / তুমি):** Formal আপনি in professional contexts; familiar তুমি in community/peer spaces.
- **Positive framing:** "Your money arrives in 2 hours" not "Transfer delay avoided."
- **No emoji in core UI.** Emoji may appear in community/chat features only.

### Casing
- Title Case for navigation items and CTAs in English.
- Sentence case for body copy and helper text.
- ALL CAPS sparingly — only for status badges/tags (e.g. VERIFIED, PENDING).

### Examples
- ✅ "Send money home in minutes."
- ✅ "আপনার পরিবার সবসময় নিরাপদ।" (Your family is always safe.)
- ✅ "Track your transfer — live."
- ❌ "Utilize our remittance facilitation module to execute peer-to-peer transactions."

---

## VISUAL FOUNDATIONS

### Colors
Rooted in the Bangladesh national flag: **deep green + bright red**, with warm neutral support tones.

| Role | Value | Notes |
|---|---|---|
| Brand Green | `#006400` | Primary brand, CTAs, nav active |
| Brand Red | `#CE1126` | Accent, urgency, alerts, flag motif |
| Green Light | `#1A8C2E` | Hover state, secondary buttons |
| Green Pale | `#E8F5EC` | Backgrounds, success tints |
| Red Light | `#F5E6E9` | Error tints, soft accent |
| Gold | `#F4A832` | Remittance/money highlights |
| Neutral 900 | `#1A1A1A` | Primary text |
| Neutral 600 | `#5A5A5A` | Secondary text |
| Neutral 300 | `#C8C8C8` | Borders, dividers |
| Neutral 100 | `#F5F5F5` | Page background |
| White | `#FFFFFF` | Cards, surfaces |

### Typography
- **English Display/Heading:** Poppins Bold/SemiBold — modern, strong, legible
- **English Body:** Poppins Regular — clean, readable
- **Bengali:** Noto Sans Bengali — widely supported, clean Unicode Bengali rendering (Google Fonts). *Note: SolaimanLipi/Mukti preferred but not on Google Fonts; Noto Sans Bengali is the nearest freely available match.*

### Backgrounds
- **Cards:** white with subtle `box-shadow` — no heavy borders
- **Page background:** Neutral 100 (`#F5F5F5`) or white
- **Hero/feature areas:** Brand Green with white text, or white with green accents
- **No gradients in core UI.** Gradients only in illustrative/marketing hero contexts, using green→dark-green or flag-inspired diagonal fills.
- **Patterns/textures:** None in app UI. Marketing surfaces may use a subtle geometric pattern or map silhouette motif.

### Spacing System
- Base unit: `4px`
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96

### Corner Radii
- Small (inputs, badges): `6px`
- Medium (cards, modals): `12px`
- Large (hero blocks, sheets): `20px`
- Full (pills, avatars): `9999px`

### Shadows
- **Card:** `0 2px 8px rgba(0,0,0,0.08)`
- **Elevated (modal/dropdown):** `0 8px 24px rgba(0,0,0,0.12)`
- **Focus ring:** `0 0 0 3px rgba(0,100,0,0.25)` (green tint)

### Animation
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (Material-style ease-in-out)
- **Duration:** 150ms micro, 250ms transitions, 400ms page/sheet
- **Style:** Subtle fades + vertical slides (bottom-to-up for sheets, fade for modals). No bounces.
- **Reduced motion:** Respect `prefers-reduced-motion`.

### Hover / Press States
- **Buttons:** Hover → `#1A8C2E` (slightly lighter green); Press → `scale(0.97)` + darker green
- **Links:** Underline on hover, color shift to `#1A8C2E`
- **Cards:** Hover → `box-shadow` elevation bump
- **Icon buttons:** Hover → pale green background `rgba(0,100,0,0.08)`

### Borders
- Default input/card border: `1px solid #C8C8C8`
- Focus border: `2px solid #006400`
- Error border: `1px solid #CE1126`

### Imagery
- **Warm and real:** photos of actual Bangladeshi workers, families, airports, cities (Gulf skylines + Dhaka)
- **Color treatment:** Natural, slightly warm-toned. No heavy filters. No grain.
- **Illustrations:** Flat, simple, using brand color palette. Worker/travel/family motifs.
- **No stock-photo coldness** — imagery should feel community-rooted.

### Layout
- Mobile-first app. Max content width on web: `1200px`, centered.
- Fixed bottom navigation bar on mobile.
- Fixed top header with logo + language toggle (EN / বাং).

---

## ICONOGRAPHY

See `assets/` for all icon assets.

- **Primary icon style:** Outlined/stroke icons with rounded caps. `24px` standard, `20px` compact, `32px` feature.
- **Icon library:** Lucide Icons (CDN) — stroke weight 1.5, rounded linecap/linejoin. Matches the clean outlined aesthetic.
- **No icon fonts embedded in the codebase** (repo is a stub).
- **Custom icons needed:** BD flag, taka symbol (৳), worker/suitcase, airplane, palm tree — these are in `assets/icons/` as SVGs.
- **Emoji:** Not used in core UI. Community chat only.
- **Flag usage:** Bangladesh flag (`🇧🇩`) used in language selectors and national-pride contexts only.

---

## FILES INDEX

```
README.md                    ← This file
SKILL.md                     ← Agent skill definition
colors_and_type.css          ← CSS custom properties (colors, type, spacing)
assets/
  logo/                      ← Probashi logo variants (SVG)
  icons/                     ← Custom SVG icons (flag, taka, worker, etc.)
preview/
  colors-brand.html          ← Brand color swatches
  colors-neutral.html        ← Neutral scale
  colors-semantic.html       ← Semantic color usage
  type-display.html          ← Display/heading specimens
  type-body.html             ← Body + caption specimens
  type-bengali.html          ← Bengali font specimens
  spacing-tokens.html        ← Spacing scale
  spacing-radii.html         ← Corner radii + shadows
  components-buttons.html    ← Button states
  components-inputs.html     ← Form inputs
  components-cards.html      ← Card variants
  components-badges.html     ← Badges, tags, status indicators
  components-nav.html        ← Navigation bar
  brand-logo.html            ← Logo variants
  brand-illustrations.html   ← Illustrations and motifs
ui_kits/
  probashi/
    README.md
    index.html               ← Main interactive prototype
    Header.jsx
    BottomNav.jsx
    HomeScreen.jsx
    SendMoneyScreen.jsx
    JobsScreen.jsx
    ProfileScreen.jsx
```
