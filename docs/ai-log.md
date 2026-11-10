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
