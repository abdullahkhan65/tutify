# Taleem Design System

## Philosophy

**"Smart & Vibrant"** — educational depth meets Pakistani Gen Z energy. Every design decision serves two masters at once: a student who wants to feel like the app *gets* them, and a parent who needs to trust it with their child's future.

Never boring. Never a textbook. Never inDrive.

---

## Brand Personality

| Audience | Tone | Visual Weight |
|---|---|---|
| Students | Roman Urdu + English mix, bold, direct, "Sorted 💀" energy | High contrast, large type, amber glow |
| Parents | English primary, results-focused, trustworthy | Clean grids, data-forward, subdued glow |

Both audiences share the same UI — the design bridges them through copy, not separate screens.

---

## Color System

### Background
- **Deep Navy** `hsl(230, 22%, 7%)` ≈ `#0C0F1E`
  - Not pure black (avoids the "hacker dark" / inDrive read)
  - Has warmth and depth without being harsh

### Brand Accent — Golden Amber
- `amber-400` = `#FBBF24` — primary CTAs, logo, active states
- `amber-500` = `#F59E0B` — hover states
- `amber-900/30` — tinted card backgrounds for amber-themed elements
- Glow: `rgba(245, 158, 11, 0.45)` inner, `rgba(245, 158, 11, 0.18)` outer
- Represents: achievement, aspiration, Pakistani gold, excellence

### Primary — Electric Indigo
- `hsl(248, 78%, 68%)` ≈ `#786EFA` — app interior primary (buttons, rings, focus)
- Used via CSS variable `--primary` for form elements, shadcn components
- Inside the app (chat, sidebar, dashboard): indigo replaces purple as the dominant accent

### Secondary Accents (section-specific)
| Color | Tailwind | Used For |
|---|---|---|
| Purple | `purple-400` / `purple-600` | For Parents section, Pro pricing, building status |
| Teal | `teal-400` / `teal-500` | Focus Rooms, science-adjacent UI, progress bars |
| Orange | `orange-400` | Duels, alerts, energy moments |
| Blue | `blue-400` | Study Groups, informational |
| Yellow | `yellow-400` | Leaderboard, rankings, trophies |
| Red | `red-400` | Streaks/Flame, destructive, incorrect answers |

### Surface Hierarchy
```
Background  #0C0F1E  (base layer)
Card        #131825  (elevated layer, bg-white/3 or bg-card)
Overlay     bg-white/5  (modals, popovers)
Border      border-white/8 to border-white/10
```

---

## Typography

| Role | Font | Weight | Size Range |
|---|---|---|---|
| Hero display | Inter | Black (900) | `text-6xl` → `text-8xl` |
| Section heading | Inter | Black (900) | `text-5xl` → `text-6xl` |
| Card heading | Inter | Bold (700) | `text-2xl` → `text-3xl` |
| Body | Inter | Medium (500) | `text-base` → `text-xl` |
| UI labels | Inter | Semibold (600) | `text-sm` |
| Captions / meta | Inter | Regular (400) | `text-xs` |
| Math / code | JetBrains Mono | Regular (400) | `text-sm` → `text-3xl` |

**Urdu text** (`تعلیم`, etc.) uses system fallback — render as decorative accent at small size.

---

## Spacing & Shape

- **Border radius**: `rounded-xl` (inputs, small cards), `rounded-2xl` (cards, panels), `rounded-3xl` (hero mock, final CTA)
- **Section padding**: `py-20` → `py-24` between major sections
- **Max widths**: `max-w-5xl` (content-heavy), `max-w-6xl` (feature grids), `max-w-7xl` (full-width nav/hero)
- **Card padding**: `p-5` → `p-6` standard

---

## Component Patterns

### Primary CTA Button
```
bg-amber-400 hover:bg-amber-500 text-black font-black
glow-amber rounded-2xl
```
Use for: Sign Up, Start Free, main conversion actions.

### Secondary Button
```
bg-white/10 hover:bg-white/15 border border-white/10 text-foreground
```
Use for: secondary actions, "Log in", ghost alternatives.

### Section Label Pill
```
inline-flex items-center gap-2 px-4 py-2 rounded-full
border border-[color]-500/20 bg-[color]-400/8 text-[color]-400
text-xs font-bold uppercase tracking-widest
```
Every section gets one above its heading. Color matches the section theme.

### Feature Card (Bento)
```
rounded-2xl border p-6 bg-white/3 hover:bg-white/5
border-[color]-500/20 hover:border-[color]-500/40 transition-all
```

### Active / Selected State
- Amber border + amber tinted background
- Pattern: `border-amber-500/30 bg-amber-900/10`

### Status Indicators
| Status | Style |
|---|---|
| Live | `bg-amber-400 animate-pulse` dot |
| Building | `bg-purple-400` dot |
| Planned | `bg-white/20` dot |
| Active (real-time) | `bg-amber-400 animate-pulse` |

### Progress Bars
- High (≥75%): `bg-amber-400`
- Medium (≥55%): `bg-yellow-500`
- Low (<55%): `bg-red-500`

---

## Glassmorphism

Two levels:
- `.glass` — `bg-white/5 backdrop-blur-md border border-white/10` — standard cards
- `.glass-strong` — `bg-white/5 backdrop-blur-xl border border-white/10` — modal overlays, hero mock

Glow orbs behind key sections use `blur-3xl` with low-opacity color blobs to add depth without noise.

---

## Glow Utilities

| Class | Shadow |
|---|---|
| `.glow-amber` | `0 0 30px rgba(245,158,11,0.45), 0 0 60px rgba(245,158,11,0.18)` |
| `.glow-indigo` | `0 0 30px rgba(120,110,250,0.4), 0 0 60px rgba(120,110,250,0.2)` |
| `.glow-teal` | `0 0 20px rgba(13,148,136,0.4)` |

**Rule**: Only apply glows to primary CTAs, active logo marks, and the AI avatar while "speaking". Not on every element.

---

## Voice & Copy Rules

1. **Student copy**: Roman Urdu naturally mixed. "Sorted 💀", "Bilkul free", "Padhai shuru karo". Direct and encouraging. Never condescending.
2. **Parent copy**: English-first. Results, data, and trust. "Weekly AI progress report", "Predicted board score".
3. **Section headings**: One Urdu/mixed phrase + one English phrase per section. Creates cultural authenticity without alienating parents.
4. **No corporate speak**: "Sign up for my child" not "Register your dependent".
5. **Emoji use**: Sparingly on landing page (1-2 per section max). Never in the app interior.

---

## What We Don't Do

- No pure black backgrounds — always deep navy
- No lime/neon green (was too similar to inDrive)
- No auto-scrolling infinite carousels (replaced by static feature pills)
- No light mode (dark-first only, no toggle)
- No rounded corners below `rounded-lg`
- No box shadows without the glow utilities (keep glow language consistent)
- No more than 3 accent colors per section (visual noise)
