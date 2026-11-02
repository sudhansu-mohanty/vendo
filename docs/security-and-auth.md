# Vendo — Security and Auth Document

Last updated: 2026-11-02
Status: Living document — updated each sprint.

---

## 1. Concordia Email Allowlist

Only Concordia University student emails are allowed to register.

- Known domain: `@live.concordia.ca`
- The allowlist is stored in a **single configurable constant** (e.g. `lib/config/allowed-domains.ts`), not hardcoded throughout the codebase. This makes it easy to add domains if others exist.
- Enforcement is **server-side only** — client-side checks are for UX, never the source of truth.

**Open decision:** Verify whether other Concordia student domains exist (e.g. `@concordia.ca` for staff vs. students). Check with a real account before locking in.

---

## 2. Auth Flow

```
[Sign-up form] → server validates domain → Supabase creates unverified account
      ↓
[Verification email sent] → user clicks link → account marked verified
      ↓
[Profile setup] → set faculty, year (optional real name, stays private)
      ↓
[Access granted as verified Student]
```

- Supabase Auth handles the session (JWT, refresh tokens, cookies).
- Until email is verified, the user has no access beyond the sign-up confirmation page.
- Login is: email + password (or magic link — decision TBD).

**Open decision:** Magic link vs. password login. Magic link is simpler and removes password management; password is more familiar. Decide before sprint 1.

---

## 3. Server-Side Domain Enforcement

The email domain check must happen on the server, not just the client. Two options:

**Option A: Supabase Auth Hook (recommended for sprint 1)**
- A `before_user_created` hook (Postgres function + Supabase hook) rejects the signup if the email domain is not in the allowlist.
- The error is returned to the client as a standard auth error.

**Option B: Database Trigger**
- A trigger on the `auth.users` table raises an exception for disallowed domains.
- Slightly more complex to maintain; hook is cleaner.

**Decision:** TBD — team to confirm Option A or B in sprint 1.

---

## 4. Row-Level Security (RLS) Philosophy

> RLS is a Postgres feature that lets you write rules directly on database tables controlling which rows a user can read or write. Even if someone calls the API directly, the database enforces the rules.

- **Default deny**: every table has RLS enabled. A row is inaccessible unless a policy explicitly allows it.
- Policies are written deliberately, one per operation (SELECT, INSERT, UPDATE, DELETE).
- No table should ever have a blanket "allow all" policy.
- All RLS policies are documented in `docs/database.md`.

**Rule of thumb before every sprint:** Ask "what is the worst thing a logged-in student could do if they hit this table directly?" and write a policy that prevents it.

---

## 5. Anonymity Rules

These are core product rules, not optional privacy extras.

1. A user's Concordia email is **never returned** in any API response visible to other users.
2. In chat, users see only the other person's **faculty** and optionally **year** — never a name.
3. Real names are shown **only if both sides independently agree** to reveal. Either side can decline without explanation.
4. The reveal state is stored **per conversation** in the `conversations` table (`buyer_revealed`, `seller_revealed`), not per user globally.
5. Faculty + year + course code on a want request can narrow identity in small programs — **keep year and course code optional**.

---

## 6. Rate Limiting

New accounts are the highest-risk vector for spam (the exact problem Vendo exists to solve).

- **Posting**: limit new accounts (< 7 days old or < 1 confirmed trade) to a configurable max posts per day.
- **Messaging**: limit message sends per minute per user to prevent flooding.
- Implementation: Supabase Edge Functions or middleware can enforce this. Exact limits are configurable constants.

**Open decision:** Exact rate limit values — TBD before sprint 4 (chat).

---

## 7. Input Validation and Image Uploads

- All user input is validated **server-side** (Next.js Server Actions or API routes). Client validation is for UX only.
- Text fields: max length, no raw HTML (sanitize or use a safe renderer).
- Image uploads:
  - Allowed types: `image/jpeg`, `image/png`, `image/webp` only.
  - Max file size: TBD (suggested: 5 MB per image, max 5 images per listing).
  - Images are stored in Supabase Storage with a randomly generated path — not the original filename.
  - RLS on the storage bucket ensures only the uploader can delete their images.

---

## 8. Secrets and Environment Variables

- All secrets (Supabase URL, anon key, service role key, Resend API key) live in `.env.local`.
- `.env.local` is in `.gitignore` and **never committed**.
- A `.env.example` file documents required variable names without values.
- The Supabase **service role key** (admin-level, bypasses RLS) is used only in server-side code, never exposed to the client.

---

## 9. Admin Access Model

- Admins (the two founders) can see the mapping between a verified Concordia email and an account.
- This is disclosed in the Terms of Use and Privacy Policy.
- Admin actions (hide content, ban user) are logged (implementation TBD — sprint 7).
- The admin panel route (`/admin`) is protected server-side by role check, not just client-side redirect.

---

## 10. Security Checklist (review every sprint story against this)

- [ ] RLS is on for every new table. Default deny. Policies are deliberate.
- [ ] No endpoint or query returns another user's email or real name before mutual reveal.
- [ ] Email domain check is enforced server-side.
- [ ] Image uploads validate type and size server-side.
- [ ] No secrets in client-side code or committed files.
- [ ] Rate limiting covers new-account posting and messaging.
- [ ] All user input is validated and sanitized server-side.
- [ ] Admin routes are protected server-side by role, not just client redirect.
- [ ] Anonymity: faculty/year/course are optional to prevent narrow identification.
