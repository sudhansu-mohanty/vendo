# Vendo: Project Context for Claude Code

Working name: "Vendo" (may be renamed, so keep the name in config and copy, not hardcoded everywhere). Last updated: 2026-11-02.

This file is the single source of context for the project: what it is, who it's for, the agile backlog, the sprint plan, and how we want you to work with us. Read it fully before making suggestions or changes.

## 1. Product in one paragraph

Vendo is a free marketplace where only verified Concordia University students can list items, post requests, chat, and trade. Facebook Marketplace and Kijiji are full of scammers and outsiders, and Discord buy/sell channels are so flooded with spam that honest listings get ignored. Vendo fixes both with a Concordia-email-only gate, structured and searchable listing cards, anonymous-by-default chat, and suggested safe meetup spots on campus.

Two people are building it: both Concordia software engineering students, one handling more of the technical side and the other more business/ops. It's a project the team wants to build and learn from. Winning is not required, so quality of learning and a working product matter more than hype.

## 2. How to work with us (important)

We are learning while building. Optimize for understanding, not just output.

- Work in small vertical slices (one story at a time). Never generate a whole feature or the whole app in one go.
- Before writing code for a non-trivial task, briefly explain the approach and the concept involved (for example "row-level security means...") and let us try it first when we ask.
- Prefer simple, readable code over clever code. Add short comments only where the *why* isn't obvious.
- Ask before making architectural decisions (new library, new table, changing auth flow). Offer 2 options with trade-offs.
- When we ask for a review, point out security and privacy issues first (see section 8), then correctness, then style.
- Suggest how to test each story against its acceptance criteria, and write tests where they're cheap.
- Keep commits small and focused. Use feature branches and pull requests, and write PR descriptions that reference story IDs (for example `E1-S2`).
- When we finish a slice and ask, help us add 2-4 lines to `LEARNINGS.md` about what we learned.
- Do not add features outside the current sprint scope. If you see a good idea, add it to "Parked ideas" instead.
- This repo is separate from our other projects. Don't mix code, keys, or Supabase projects with them.

## 3. Proposed tech stack (confirm with the team before locking in)

- Next.js (App Router) + TypeScript
- Supabase: Postgres, Auth, Realtime (chat), Storage (photos), Row-Level Security, scheduled jobs
- shadcn/ui + Tailwind for UI
- Vercel for deploys (deploy from day one)
- Transactional email (for example Resend) for message notifications and verification fallbacks

Reason for the stack: the team already knows it, so the learning budget goes to new concepts (RLS, realtime, schema design) instead of new tools.

## 4. Users and roles

- **Visitor**: not logged in. Can see the feed of listing cards. Opening a listing, selling, requesting, or messaging requires registration.
- **Student (verified user)**: signed up with a Concordia email and verified it. Can post listings and requests, search, chat, report, block, and confirm trades.
- **Admin**: the two founders. Review reports, hide or restore content, ban users.

## 5. Core product rules

1. Only Concordia student emails can register. Enforce this on the server side (auth hook or database trigger), not only in the client. Keep the allowed domains in one configurable allowlist.
2. The user's Concordia email is never shown to other users, in the UI or in API responses.
3. Chat is anonymous by default. Other users see only faculty (for example GCS, JMSB) and optionally year. Names are revealed only if both sides agree, and either side can decline.
4. Reveal state is stored per conversation, not per user.
5. Listings and requests live in one `posts` table with a `type` field (`listing` or `want`).
6. A trade counts only when both buyer and seller confirm it.
7. Listings expire automatically. Requests have an optional needed-by date.
8. Meetup spots are "suggested" and never presented as an official Concordia or security guarantee.

## 6. Agile backlog

Priority: **v0** means build first, **later** means after the core loop works. Size is an initial T-shirt estimate (S, M, L) to be revised by the team. Story IDs are `E<epic>-S<n>`.

### E1: Access and verification

| ID | Story | Pri | Size |
|---|---|---|---|
| E1-S1 | As a visitor, I want to see the feed of listings without an account, so I can tell whether Vendo is worth joining. (Opening a listing or selling prompts registration.) | v0 | S |
| E1-S2 | As a student, I want to sign up with my Concordia email, so only real students are on the platform. | v0 | M |
| E1-S3 | As a user, I want non-Concordia emails rejected, so outsiders and scammers can't join. | v0 | S |
| E1-S4 | As a user, I want to set my faculty and year, so others can trust me without knowing who I am. | v0 | S |
| E1-S5 | As a user, I want to log in and out securely, so no one else can use my account. | v0 | S |

### E2: Listings (selling)

| ID | Story | Pri | Size |
|---|---|---|---|
| E2-S1 | As a seller, I want to post an item with photos, price, category, campus, and description, so buyers can find it. | v0 | M |
| E2-S2 | As a seller, I want to edit or delete my listing, so I can fix mistakes or remove items I no longer have. | v0 | S |
| E2-S3 | As a seller, I want my listing to expire automatically, so the feed doesn't fill with stale items. | v0 | M |
| E2-S4 | As a seller, I want to upload a photo and get a suggested title and description, so posting takes seconds. | later | L |

### E3: Discovery (buying)

| ID | Story | Pri | Size |
|---|---|---|---|
| E3-S1 | As a buyer, I want to browse a feed of listings, so I can see what's available. | v0 | M |
| E3-S2 | As a buyer, I want to filter by category, campus (SGW or Loyola), and price, so I only see relevant items. | v0 | M |
| E3-S3 | As a buyer, I want to search by keyword or course code, so I can find a specific textbook fast. | v0 | M |
| E3-S4 | As a buyer, I want the feed to adjust by season (move-out, back-to-school), so the most relevant items show first. | later | M |

### E4: Want board

| ID | Story | Pri | Size |
|---|---|---|---|
| E4-S1 | As a buyer, I want to post what I'm looking for, with a budget and a needed-by date, so sellers can come to me. | v0 | S |
| E4-S2 | As a seller, I want to browse requests, so I can see what people want to buy. | v0 | S |
| E4-S3 | As a seller, I want to be notified when a request matches something I list, so I don't miss a sale. | later | L |

### E5: Chat and anonymity

| ID | Story | Pri | Size |
|---|---|---|---|
| E5-S1 | As a buyer, I want to message a seller from their listing, so we can arrange the deal without sharing contact info. | v0 | L |
| E5-S2 | As a user, I want to see only my own conversations, so no one else can read my messages. | v0 | M |
| E5-S3 | As a user, I want an email when I get a message while offline, so I don't miss replies. | v0 | M |
| E5-S4 | As a user, I want to stay anonymous (faculty only) in chat, so my identity is protected. | v0 | M |
| E5-S5 | As a user, I want to choose whether to reveal my name, with names shown only if both sides agree, so I control my privacy. | v0 | M |
| E5-S6 | As a user, I want to block someone in chat, so I can stop unwanted messages. | v0 | S |

### E6: Safety and trust

| ID | Story | Pri | Size |
|---|---|---|---|
| E6-S1 | As a user, I want to report a listing, request, or user, so scams and spam get dealt with. | v0 | M |
| E6-S2 | As a user, I want a listing hidden automatically after enough reports, so harmful posts disappear quickly. | v0 | M |
| E6-S3 | As a buyer or seller, I want a suggested meetup spot near security at SGW or Loyola, so I feel safe meeting. | v0 | S |
| E6-S4 | As a user, I want to see badges and a trade count on profiles, so I can judge reliability at a glance. | later | M |
| E6-S5 | As a user, I want to rate how accurately an item matched its description, so misleading sellers are visible. | later | M |

### E7: Completing trades

| ID | Story | Pri | Size |
|---|---|---|---|
| E7-S1 | As a buyer or seller, I want to mark an item as sold, with both sides confirming, so the record is honest. | v0 | M |
| E7-S2 | As a seller, I want my sold item to leave the feed, so buyers don't keep messaging about it. | later | S |

### E8: Moderation

| ID | Story | Pri | Size |
|---|---|---|---|
| E8-S1 | As an admin, I want to review reported content and ban users, so the platform stays clean. | v0 | M |
| E8-S2 | As an admin, I want to see numbers on signups, listings, requests, and completed trades, so I can tell whether it's working. | later | M |

## 7. Acceptance criteria for the trickiest stories

**E1-S2 / E1-S3: Concordia email signup**
- [ ] Signup fails with a clear message for any email outside the allowed Concordia domains.
- [ ] An account isn't active until the emailed verification link is clicked.
- [ ] The Concordia email never appears in the UI or in API responses for other users.

**E5-S4 / E5-S5: Anonymity and mutual name reveal**
- [ ] Names are hidden by default in every conversation.
- [ ] A name shows only after both people have agreed, and either can decline without explanation.
- [ ] Reveal status is stored per conversation, not per user.

**E6-S1 / E6-S2: Report and auto-hide**
- [ ] A listing is hidden from the feed once it reaches the report threshold from different users.
- [ ] The poster still sees it, marked as under review, and an admin can restore it.
- [ ] A user can't report the same item twice.

## 8. Security and privacy checklist (review every slice against this)

- Row-Level Security is on for every table. Default is deny, and policies are written deliberately. A missing policy means no access.
- Users can read and write only their own profile, posts, and conversations, and can read other users' posts only through safe views.
- No endpoint or query returns another user's email or real name before a mutual reveal.
- Anonymity can leak through small details. Faculty plus year plus a course code on a request can identify someone in a small program, so keep year and course detail optional.
- Rate-limit posting and messaging for new accounts to prevent the same spam problem Vendo exists to solve.
- Validate and sanitize all user input, restrict image types and sizes, and keep secrets in `.env.local` (never committed).
- Users are anonymous to each other but not to the admins: every account maps to a verified Concordia email, and the terms should say so.

## 9. Sprint plan (1-week sprints, 3-4 working sessions per week)

Dates are set by the team. The goal is a usable v0 before the December move-out rush, so if time is short, cut from the later sprints, not from sprint 1-5.

| Sprint | Goal | Stories |
|---|---|---|
| 0 | Foundation: repo, Supabase project, Next.js app deployed on Vercel, team agrees the data model on a whiteboard | setup, schema sketch |
| 1 | A Concordia email can sign up, verify, log in, and see its profile | E1-S2 to E1-S5 |
| 2 | Sellers can post, edit, and delete listings with photos; feed and detail pages | E2-S1, E2-S2, E3-S1, E1-S1 |
| 3 | Find things fast, and buyers can post requests; first security pass on RLS | E3-S2, E3-S3, E4-S1, E4-S2 |
| 4 | Core chat works end to end, private to participants, anonymous by default | E5-S1, E5-S2, E5-S4 |
| 5 | Chat is complete: mutual reveal, block, email notifications | E5-S3, E5-S5, E5-S6 |
| 6 | Trust and cleanliness: reports, auto-hide, listing expiry, meetup spots, both-sides sold confirmation | E6-S1 to E6-S3, E2-S3, E7-S1 |
| 7 | Admin tools, seed data, polish, closed launch to a small group | E8-S1, seed data |

Do not open Vendo beyond the founders' close circle until report/block (E5-S6, E6-S1, E6-S2) exist.

### Definition of Ready (before starting a story)
- The story and acceptance criteria are written, and any new tables or policies are sketched.
- We know which sprint goal it supports.

### Definition of Done (before closing a story)
- Works in the deployed environment, not only locally.
- Acceptance criteria are met and we've tried to break it (empty input, wrong user, logged out).
- RLS and privacy checklist (section 8) reviewed.
- Reviewed by the other teammate in a pull request.
- A learning note added to `LEARNINGS.md` when we asked for one.

## 10. Data model (draft sketch for the team to design, not a spec)

We will design the schema together first. Review it, don't dictate it.

- `profiles`: id (matches auth user), faculty, year, optional real name (private until reveal), created_at
- `posts`: id, author_id, type (`listing` or `want`), title, description, price or budget, category, campus (`SGW` or `Loyola`), course_code, photos, status (`active`, `sold`, `expired`, `hidden`), expires_at, needed_by
- `conversations`: id, post_id, buyer_id, seller_id, buyer_revealed, seller_revealed
- `messages`: id, conversation_id, sender_id, body, created_at, read_at
- `blocks`: blocker_id, blocked_id
- `reports`: id, reporter_id, target type and id, reason, created_at (unique per reporter and target)
- `trades`: post_id, buyer_confirmed, seller_confirmed, confirmed_at

## 11. Decisions so far

| Question | Status |
|---|---|
| Valid email domains | Team believes student addresses look like `<id>@live.concordia.ca`. Verify with a real account and keep the allowlist configurable, since other student domains may exist. |
| Logged-out access | Decided: visitors can explore the feed, but opening a listing or selling something requires registration. |
| Report threshold | Not decided. The team feels 3 reports may be too many. Idea under discussion: at 2 reports, notify the poster to check the issue (may be a bad idea). Make both thresholds configurable constants and start conservative. |
| Faculty and year on want-board requests | Open. |
| Final product name | Open. "Vendo" is a working name. |
| Tech stack | Proposed in section 3, to confirm. |

## 12. Context beyond v0 (do not build yet, but keep the design open for it)

Parked ideas, in rough priority order:
- Badges and a visible trust score: volume ("12+ Sold"), speed ("Responds in under 1 hr"), category expert, "Founding Member" for the first ~100 users. Powered by confirmed trades.
- Semester-aware feed: Move-Out Mode (early December, late April) and Back-to-School Mode (late August).
- Matching want-board requests to new listings with notifications.
- AI-assisted listing creation from a photo.
- "As described" rating separate from the overall trust score.
- Swipe-style browsing.
- Campus-zone refinements for SGW and Loyola, and club channels for event tickets, merch, and swag through the founders' club networks.
- In-app payments, and any form of escrow.
- Public Discord and Instagram as the community and storefront (currently only an internal Discord for the two founders).

Monetization: free at launch. Later options in order of near-term feasibility: paid placements from clubs and local businesses, a small transaction fee once in-app payments exist, premium seller tiers, and possibly university licensing. A multi-campus expansion story is needed to pitch this as more than a one-campus tool.

## 13. Go-to-market and success measures

- Launch narrowly: close circle first, then the founders' club networks. Pre-seed the feed with real listings and requests so it never looks empty.
- Wedge: items students want to sell off (especially around move-out), with housing and sublets as a target category once the terms are written carefully.
- The real risk is liquidity: enough listings and requests, in the same categories, on the same campus, at the same time. Success is measured by repeat usage and retention among the first 100 real users, not by signups alone.

## 14. Legal and safety notes

- Meetup spots are "suggested" and not an official Concordia partnership or safety guarantee. Say this in the app copy. The plan is benches near security desks at SGW and Loyola, with specific named spots chosen by walking the campuses.
- Subletting has Quebec tenant-law implications. Position Vendo as a bulletin board connecting verified students, never a party to a lease or transaction, and read up on this before the housing category goes live.
- Terms of use and privacy copy should be written before public launch.

## 15. Competitive context

Verified student-only marketplaces already exist at other schools (for example Versa, ZWAP, CampEx, Curb at UC Berkeley, iWantIt, OpenShelf). Ideas seen there that are worth knowing: meetup verification codes, double-confirmation of trades, 72-hour auto-expiring listings, founding-member badges, and AI-written listings. None targets Concordia. The concept is not the moat, so execution quality, trust design, and campus distribution through the founders' clubs are.
