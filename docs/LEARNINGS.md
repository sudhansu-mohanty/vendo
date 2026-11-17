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

---

## Session 4 — Homepage + Layout concepts

**Q:** What is `app/layout.tsx` and what does it do?
**A:** It is the root layout — a wrapper that Next.js applies to every page in the app. It is where you load fonts, set `<html>` attributes, and define the outer HTML structure. Every `page.tsx` renders inside it as `{children}`.

**Q:** Why do we use `next/font/google` instead of a plain `<link>` tag to load fonts?
**A:** `next/font/google` downloads the font at build time and self-hosts it. At runtime there is no call to Google's CDN, the font is injected as a CSS variable (`--font-bowlby`), and the browser has zero layout shift because the font is available immediately.

**Q:** What is a React Server Component and why does `page.tsx` not need `"use client"`?
**A:** Server Components render on the server and send plain HTML to the browser — no JavaScript bundle for that component is shipped. `"use client"` is only needed when a component uses browser APIs (`useState`, `useEffect`, event handlers). A static page with no interactivity is a Server Component by default and renders faster.

**Q:** How do CSS custom properties (design tokens like `--sky-wash`) get used in React inline styles?
**A:** You write them as a string value: `background: "var(--sky-wash)"`. React passes that string straight to the browser's style attribute. The browser resolves the variable by looking it up in `:root` in `globals.css`. No special React magic — it is just CSS.

**Q:** What is the difference between `position: sticky` and `position: fixed` on a navbar?
**A:** `position: fixed` removes the element from document flow and pins it to the viewport — the page content scrolls under it and you need top padding to prevent overlap. `position: sticky` keeps the element in flow and only pins it when it reaches the threshold (`top: 0`) during scroll. Sticky is simpler for navbars because it needs no extra spacing.

---

## Session 4 — CI/CD + Bug-001

**Q (BUG-001-Q1):** Why did `@import "shadcn/tailwind.css"` fail even though `shadcn` was listed in `package.json`?
**A:** The `shadcn` package at `^1.0.0` is an empty stub — it has only a bare `package.json` and no CSS files. The import resolved to `node_modules/shadcn/tailwind.css` which doesn't exist. The fix was removing the import; all the CSS variables it would have provided were already defined in the `:root` block of `globals.css`.

**Q (BUG-001-Q2):** What is the difference between `npm install` and `npm ci`, and why do we use `npm ci` in a CI pipeline?
**A:** `npm install` resolves version ranges in `package.json` and may update `package-lock.json`. `npm ci` installs exactly what is in `package-lock.json`, never updates it, fails if there is a mismatch, and is faster. In CI you want deterministic installs — the same packages every time — so `npm ci` is always the right choice there.

**Q (BUG-001-Q3):** What does the `npm run build` step in a CI pipeline catch that `npm run dev` might not surface immediately?
**A:** `next build` does a full production compile — it resolves every import, type-checks TypeScript, and processes all CSS. Broken imports, bad types, and missing env vars all fail here. `npm run dev` is lazy — it only compiles files as you visit them, so you might not notice a broken import until you open that specific page.

---

## Session 4 — TiltedGridHero component

**Q:** In Next.js App Router, can a Server Component render a Client Component? Can a Client Component render a Server Component?
**A:** Yes and no. A Server Component can import and render a Client Component — Next.js handles the boundary automatically. A Client Component cannot import a Server Component, because Client Components run in the browser and Server Components only exist on the server. The boundary is one-way: Server → Client.

**Q:** Why does `TiltedGridHero` need an explicit pixel height on its wrapper, and what breaks if you leave it as `height: auto`?
**A:** The component sizes tiles using CSS container query units `cqh` (percentage of container height) and `cqw` (percentage of container width). It sets `containerType: "size"` which requires the container to have a defined size — `height: auto` collapses `cqh` to 0, so tiles have zero height and nothing renders. You must give the wrapper a fixed height (e.g. `height: 640`).

**Q:** Why does `TiltedGridHero` inject a `<style>` tag with `@keyframes` at runtime instead of using a static CSS file?
**A:** The orbit animation maths — sweep angle, timing, visibility keypoints — depend on the container's measured pixel dimensions and the props passed in. These can't be known at build time. The component uses `useId()` to generate a unique keyframe name per instance so multiple heroes on the same page don't collide.

**Q:** What is `ResizeObserver` and why is it used here instead of a window `resize` event listener?
**A:** `ResizeObserver` fires a callback whenever a specific element changes size — not just when the window resizes. This matters because the hero could resize due to a sidebar opening, a parent layout change, or orientation change on mobile, none of which trigger `window.resize`. It is also more performant since it only watches one element.

<!-- Add new entries below as each sprint/story is completed -->
