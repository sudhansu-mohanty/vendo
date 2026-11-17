# Vendo — AI Log

A running record of sessions, decisions made, and what was built. All decisions are the team's.

Format: `[date] [story or topic] — decision or outcome`

---

## 2026-11-02 — Session 1: Foundation and Documentation

**Context loaded:**

- Read `.mdfiles/CLAUDE.md` — full product context, backlog, sprint plan, and data model draft.
- Established working preferences: all decisions are the team's; everything built is taught first.

**Decisions made today:**

- Created `docs/` folder with 6 documentation files as living references for the project.
- Files created: `design.md`, `security-and-auth.md`, `database.md`, `terms-and-conditions.md`, `privacy-policy.md`, `ai-log.md` (this file).

**Open decisions flagged (no decision yet):**

- Magic link vs. password login (decide before sprint 1).
- Server-side email domain enforcement: auth hook (Option A) vs. DB trigger (Option B) — decide in sprint 1.
- Listing expiry duration (72 hours suggested from competitive research — TBD).
- Report auto-hide threshold (configurable constant — value TBD).
- Faculty list format: enum vs. free text (TBD).
- Category list: starting enum suggested (Textbooks, Electronics, Furniture, Clothing, Other — TBD).
- Final product name: "Vendo" is working name.
- Color palette and light/dark mode: TBD before sprint 2.
- Exact rate limit values for posting and messaging: TBD before sprint 4.
- Data retention periods for messages and expired listings: TBD before launch.
- Meetup spot names: to be chosen by walking SGW and Loyola campuses.

**Next up (Sprint 0):**

- Set up Next.js app with App Router + TypeScript.
- Create Supabase project.
- Deploy to Vercel.
- Sketch and agree on data model as a team.

---

## 2026-11-07 — Session 2: Sprint 0 — Next.js Setup

**What was done:**

- Planned Sprint 0 completion: Next.js init, shadcn/ui, Supabase client stubs, .env template, Vercel deploy.
- Taught App Router vs Pages Router, route groups `(auth)`/`(main)`, shadcn/ui model, `@supabase/ssr` vs `@supabase/supabase-js`.
- User initialized Next.js app manually using default options (no `--src-dir`), so `app/` lives at project root (not `src/app/`).
- Confirmed clean structure: Next.js 16.4.5, React 19.3.0, Tailwind 4, TypeScript 5.
- Note: Tailwind v4 has no `tailwind.config.ts` — config lives in `app/globals.css`.

**Sprint 0 status:**

- [x] Git repo initialized
- [x] Documentation files created
- [x] Next.js app initialized
- [ ] shadcn/ui installed
- [ ] Supabase client stubs added
- [ ] `.env.local` template created
- [ ] Supabase project created (browser)
- [ ] Vercel deployment
- [ ] Data model agreed as a team

**Next up:**

- Step 3: Install shadcn/ui (`npx shadcn@latest init`)
- Step 4: Install `@supabase/supabase-js`, `@supabase/ssr`, `resend`
- Step 5–7: Folder structure, env template, Supabase client stubs

---

## 2026-11-10 — Session 3: Sprint 0 — Packages + Supabase Stubs

**What was done:**

- Start-of-session quiz: user scored 4/5 — solid retention of App Router, route groups, shadcn model, Tailwind v4. App Router vs Pages Router wording needs reinforcing.
- Confirmed shadcn/ui was already installed from last session: `components.json` present, `components/ui/button.tsx` generated, config correct for Tailwind v4.
- Installed three packages: `@supabase/supabase-js` ^2.119.0, `@supabase/ssr` ^0.12.7, `resend` ^6.38.0.
- 7 moderate npm audit vulnerabilities — all in dev/build tooling, safe to ignore for now.

**Sprint 0 status:**

- [x] Git repo initialized
- [x] Documentation files created
- [x] Next.js app initialized
- [x] shadcn/ui installed
- [x] `@supabase/supabase-js`, `@supabase/ssr`, `resend` installed
- [ ] Supabase client stubs added (`lib/supabase/client.ts` + `server.ts`)
- [ ] `.env.local` template created
- [ ] Supabase project created (browser)
- [ ] Vercel deployment
- [ ] Data model agreed as a team

**What was built:**

- Created `lib/supabase/client.ts` — browser Supabase client using `createBrowserClient`
- Created `lib/supabase/server.ts` — server Supabase client using `createServerClient` + cookie handling
- Created `env.local.example` — env var template with comments pointing to where to find each value
- Confirmed `.env*` is already in `.gitignore` — safe

**Decisions made:**

- Supabase project created by user (URL + anon key to be filled into `.env.local` later)
- Vercel deployment deferred — user will handle independently
- Data model meeting deferred — co-founder sync pending
- Frontend work approved to start on schema-safe pieces: routing structure + auth page shells

**Sprint 0 status:**

- [x] Git repo initialized
- [x] Documentation files created
- [x] Next.js app initialized
- [x] shadcn/ui installed
- [x] `@supabase/supabase-js`, `@supabase/ssr`, `resend` installed
- [x] Supabase client stubs added (`lib/supabase/client.ts` + `server.ts`)
- [x] `.env.local.example` created
- [x] Supabase project created (browser)
- [ ] `.env.local` filled in (user to do when ready)
- [ ] Vercel deployment (user to handle)
- [ ] Data model agreed as a team (co-founder meeting pending)

**Next up:**

- Route group structure: `app/(auth)/` and `app/(main)/`
- Auth page shells: login and signup
- Shell components: navbar, page wrappers

---

## 2026-11-15 — Session 4: Sprint 0 — Homepage (public landing page)

**What was done:**

- Start-of-session quiz: user scored 5/5 — strong retention across all Sprint 0 concepts.
- Reviewed `app/page.tsx` — it existed as a visual direction/design demo (Slush style reference with Screen 01/02/03 mockups). Decided to replace it with a real public landing page (Option A).
- Reviewed `app/layout.tsx` to confirm font setup: Inter (body) and Bowlby One (display) loaded via `next/font/google` as CSS variables `--font-inter` and `--font-bowlby`.
- Confirmed design system already fully wired in `app/globals.css`: all Slush color tokens, border radii, marquee animation.

**What was built:**

Replaced `app/page.tsx` with the real Vendo public homepage:
- **Marquee strip** — black bg, looping: "CONCORDIA'S STUDENT MARKETPLACE · FREE LISTINGS · ANONYMOUS BY DEFAULT · CONCORDIA EMAIL ONLY · BUY · SELL · VENDO"
- **Navbar** — sticky, white bg, 1px black border. Logo left (VENDO in Bowlby One), Browse pill center, Sign up free filled-black pill right.
- **Hero** — sky-wash (`#dceeff`) background. Display headline "BUY. / SELL. / VENDO." in Bowlby One at clamp(72px–180px), 0.78 line-height. Electric blue SVG ribbon behind text. Three sticker decorations (ember, sunburst, voltage-violet). Tagline + two CTAs.
- **Features section** — white bg, "WHY VENDO" heading, 3 cards: Free (sunburst) · Anonymous (lavender) · Concordia Only (mint-pop).
- **Footer** — logo left, tagline center, six color dots right.

**Decisions made:**

- Nav items and buttons are `<span>` for now — routes don't exist yet. Will upgrade to `<Link>` when auth pages are built in Sprint 1.
- Design reference page (old `page.tsx`) fully replaced — in git history if needed.

**Tech concepts taught this session:**

- `app/page.tsx` as the root route — file-based routing convention
- `app/layout.tsx` — wraps all pages, where fonts and metadata live
- `next/font/google` — self-hosted fonts via CSS variables, eliminates layout shift
- React Server Components — no `"use client"` needed for static/non-interactive pages
- CSS custom properties in React inline styles — `var(--sky-wash)` resolves from `:root` in globals.css
- `position: sticky` on nav — stays at top of viewport on scroll, unlike `position: fixed`

**Sprint 0 status:**

- [x] Git repo initialized
- [x] Documentation files created
- [x] Next.js app initialized
- [x] shadcn/ui installed
- [x] `@supabase/supabase-js`, `@supabase/ssr`, `resend` installed
- [x] Supabase client stubs added
- [x] `.env.local.example` created
- [x] Supabase project created (browser)
- [x] Public homepage built
- [ ] `.env.local` filled in (user to do)
- [ ] Vercel deployment (user to handle)
- [ ] Data model agreed as a team (co-founder meeting pending)

**Next up:**

- Route group structure: `app/(auth)/` and `app/(main)/`
- Auth page shells: login and signup
- Wire nav/CTA buttons to real routes
