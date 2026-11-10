# Vendo — Learnings

A structured log of tech concepts, decisions, and "why we chose X."
At the start of each session, Claude quizzes you on this before any code is written.

Format per entry:
- **Q:** question Claude will ask
- **A:** correct answer

---

## Sprint 0 — Foundation

**Q:** What is the difference between Next.js App Router and Pages Router?
**A:** App Router uses the `app/` directory with nested `layout.tsx` files; Pages Router uses `pages/`. App Router is the modern default and eliminates repetitive layout wrapping.

**Q:** What do route groups like `(auth)` and `(main)` do?
**A:** They organize files and share layouts without changing the URL — `(auth)/login/page.tsx` becomes `/login`, not `/(auth)/login`.

**Q:** Why do we need `@supabase/ssr` in addition to `@supabase/supabase-js`?
**A:** `@supabase/ssr` lets the server (Server Components, middleware) read auth cookies so it can identify the logged-in user. `@supabase/supabase-js` alone only works on the client.

**Q:** How is shadcn/ui different from a typical component library like MUI?
**A:** shadcn/ui copies component source code directly into your project — you own and can edit every component. It is not a black-box npm dependency.

**Q:** Where does Tailwind configuration live in Tailwind v4?
**A:** There is no `tailwind.config.ts`. Config lives in `app/globals.css` via `@import`.

**Q:** What are the three packages we are installing for backend/email, and what does each do?
**A:** `@supabase/supabase-js` — Supabase client; `@supabase/ssr` — server-side auth cookie handling for Next.js; `resend` — transactional email sending.

**Q:** What is the email domain gate for Vendo, and why?
**A:** Only `@live.concordia.ca` (and possibly other Concordia domains) are allowed. This keeps the marketplace exclusive to Concordia students, which is Vendo's core differentiator.

---

<!-- Add new entries below as each sprint/story is completed -->
