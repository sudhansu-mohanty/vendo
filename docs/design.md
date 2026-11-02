# Vendo — Design Document

Last updated: 2026-11-02
Status: Living document — updated each sprint.

---

## 1. Product Vision

Vendo is a free marketplace where only verified Concordia University students can list items, post requests, chat, and trade. Facebook Marketplace and Kijiji are full of scammers and outsiders; Discord buy/sell channels are too noisy. Vendo fixes both with a Concordia-email-only gate, structured and searchable listing cards, anonymous-by-default chat, and suggested safe meetup spots on campus.

---

## 2. User Roles

| Role | Description | What they can do |
|---|---|---|
| Visitor | Not logged in | Browse the feed of listing cards. Cannot open a listing detail, post, or message. |
| Student (verified) | Signed up with a Concordia email and clicked the verification link | Full access: post listings and requests, search, filter, chat, report, block, confirm trades. |
| Admin | The two founders | Everything a Student can do, plus: review reports, hide or restore content, ban users, view admin dashboard. |

---

## 3. Core UX Flows

### 3.1 Browse as a Visitor
1. Land on feed (`/`) — see listing cards (photo, title, price, category, campus).
2. Attempt to open a listing or click "Sell" → gated modal prompts sign-up or login.

### 3.2 Sign-Up and Verification
1. Enter Concordia email → server checks domain against allowlist.
2. Receive verification email → click link → account activated.
3. Prompted to set faculty and year (optional real name stays private).
4. Redirected to feed as a verified Student.

### 3.3 Post a Listing
1. Click "Sell" → post form.
2. Fill in: title, description, price, category, campus (SGW or Loyola), photos, optional course code.
3. Submit → listing goes live, auto-expires per configured duration.
4. Seller can edit or delete any time before expiry.

### 3.4 Post a Want Request
1. Click "Looking for something?" → want form.
2. Fill in: title, description, budget, category, optional needed-by date.
3. Submit → appears on the want board.

### 3.5 Open and Message a Listing
1. Student opens a listing card → listing detail page.
2. Clicks "Message Seller" → chat thread created, conversation opens.
3. Both sides see only faculty and optionally year (no names, no email).
4. Either side can request name reveal → the other accepts or declines → name shows only if both agree.

### 3.6 Confirm a Trade
1. Buyer or seller clicks "Mark as Sold / Traded".
2. Other side receives a prompt to confirm.
3. Trade counts only when both sides confirm.
4. Listing moves to sold status and leaves the active feed.

---

## 4. Page and Route Map

| Route | Page | Access |
|---|---|---|
| `/` | Feed (listing cards) | Public |
| `/listings/[id]` | Listing detail | Public (interaction requires login) |
| `/sell` | Post a listing form | Student |
| `/want` | Post a want request form | Student |
| `/want-board` | Browse want requests | Public (interaction requires login) |
| `/inbox` | Conversation list | Student |
| `/inbox/[conversationId]` | Chat thread | Student (own conversations only) |
| `/profile` | Own profile / settings | Student |
| `/admin` | Admin dashboard | Admin |
| `/auth/signup` | Sign-up page | Public |
| `/auth/login` | Login page | Public |
| `/auth/verify` | Email verification landing | Public |

---

## 5. Key Components (to design and build)

- **ListingCard** — photo, title, price, category chip, campus badge, time-ago.
- **ListingForm** — controlled form with photo upload, validation, category select, campus select.
- **WantCard** — similar to ListingCard but shows budget and needed-by date.
- **ChatBubble** — message bubble with sender label (faculty/year, or "You"), timestamp, read indicator.
- **NameRevealBanner** — in-chat prompt to request or accept/decline name reveal.
- **MeetupSpotWidget** — displays suggested meetup location (named spot, map pin) with disclaimer copy.
- **ReportModal** — reason selector and submit button, prevents duplicate reports.
- **AdminReportRow** — content preview, report count, hide/restore/ban actions.

---

## 6. Open Design Decisions

| Question | Status | Notes |
|---|---|---|
| Final product name | Open | "Vendo" is the working name. |
| Color palette / visual identity | Open | TBD with the team. |
| Light/dark mode | Open | shadcn/ui supports both — decide before sprint 2. |
| Listing card layout: grid vs. list | Open | Decide in sprint 2 when feed is built. |
| Feed sort order | Open | Default: newest first. Seasonal boost is a later feature. |
| Report threshold (auto-hide) | Open | Configurable constant. Team feels 3 may be too many. Starting conservative. |
| Faculty/year on want-board requests | Open | Currently optional for listings; want-board behavior TBD. |
| Listing expiry duration | Open | TBD — 72 hours is one idea from competitive research. |
| Meetup spot names | Open | To be chosen by walking the SGW and Loyola campuses. |
