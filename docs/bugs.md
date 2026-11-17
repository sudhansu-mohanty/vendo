# Vendo — Bug Log

A record of every bug encountered, what caused it, how it was fixed, and what to learn from it.
Added to `LEARNINGS.md` after each entry for quiz coverage.

---

## BUG-001 — `@import "shadcn/tailwind.css"` cannot be resolved

**Date:** 2026-11-15
**Severity:** Blocking — dev server and build both fail
**Symptom:** CSS build error: cannot resolve module `shadcn/tailwind.css`

### What happened

`app/globals.css` contained:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";  ← this line
```

Tailwind's CSS processor tried to resolve `shadcn/tailwind.css` from `node_modules/shadcn/tailwind.css`. The `shadcn` package was present in `package.json` as a devDependency at `^1.0.0`, but that version is an **empty stub** — it has no CSS files, only a bare `package.json` and `index.js`.

### Root cause

`shadcn@1.0.0` on npm is a placeholder package, not the real shadcn CLI (which ships under higher versions). The `npx shadcn@latest init` command injected `@import "shadcn/tailwind.css"` into `globals.css` expecting a newer real package, but `package.json` locked it to the stub at `^1.0.0`.

Additionally, all the CSS variables that `shadcn/tailwind.css` would have provided (`--background`, `--foreground`, etc.) were already defined inline in the `:root` block of `globals.css` — making the import both broken and redundant.

### Fix

Removed the broken import line from `app/globals.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";
/* @import "shadcn/tailwind.css" — removed: stub package, vars already in :root */
```

No styles were lost. The `:root` block below already defined every variable the import would have provided.

### Prevention

Created `.github/workflows/ci.yml` — runs `npm ci` → `npm run lint` → `npm run build` on every push and PR. A broken CSS import would have been caught at the build step before anyone ran the dev server.

### Questions added to LEARNINGS.md

- BUG-001-Q1, BUG-001-Q2, BUG-001-Q3

---

<!-- Add new bug entries below in the same format -->
