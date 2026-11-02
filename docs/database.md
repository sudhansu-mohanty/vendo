# Vendo — Database Document

Last updated: 2026-11-02
Status: Living document — schema is a draft for the team to review and finalize together.

---

## 1. Overview

Vendo uses **Supabase Postgres**. Every table has **Row-Level Security (RLS) enabled** with a default-deny stance — no row is readable or writable unless a policy explicitly allows it.

This document is a draft sketch. The team will review, adjust field types, add constraints, and finalize policies before each sprint that touches the schema.

---

## 2. Tables

### 2.1 `profiles`

Extends `auth.users` (Supabase's built-in auth table). One row per verified user.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` (PK) | Matches `auth.users.id` — set on signup via trigger. |
| `faculty` | `text` | e.g. "GCS", "JMSB", "ENCS". Required after signup. |
| `year` | `smallint` | Academic year (1–5+). Optional. |
| `real_name` | `text` | Optional. Private until mutual reveal in a conversation. |
| `created_at` | `timestamptz` | Default: `now()`. |

**RLS sketch:**
- SELECT: a user can read their own profile. Others can read only `faculty` and `year` (via a safe view, never the raw table).
- INSERT: allowed only via the signup trigger (service role).
- UPDATE: a user can update only their own row.

---

### 2.2 `posts`

Holds both listings (selling) and want requests (buying), distinguished by `type`.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` (PK) | Auto-generated. |
| `author_id` | `uuid` (FK → profiles.id) | The poster. |
| `type` | `text` | `'listing'` or `'want'`. |
| `title` | `text` | Required. Max length TBD. |
| `description` | `text` | Required for listings. Optional for wants. |
| `price` | `numeric(10,2)` | For listings. Null for wants. |
| `budget` | `numeric(10,2)` | For wants. Null for listings. |
| `category` | `text` | e.g. "Textbooks", "Electronics", "Furniture". Enum TBD. |
| `campus` | `text` | `'SGW'` or `'Loyola'`. |
| `course_code` | `text` | Optional. e.g. "COMP 352". |
| `photos` | `text[]` | Array of Supabase Storage paths. Max 5. |
| `status` | `text` | `'active'`, `'sold'`, `'expired'`, `'hidden'`. Default: `'active'`. |
| `report_count` | `smallint` | Incremented on each unique report. Default: 0. |
| `expires_at` | `timestamptz` | Set on insert. Duration is a configurable constant. |
| `needed_by` | `date` | For wants only. Optional. |
| `created_at` | `timestamptz` | Default: `now()`. |

**RLS sketch:**
- SELECT: visitors and students can read `status = 'active'` posts. The author can also read their own hidden/expired posts.
- INSERT: verified students only.
- UPDATE: only the author (for title, description, photos, status). Admins can update `status` to `'hidden'` or `'active'`.
- DELETE: only the author (or admin).

---

### 2.3 `conversations`

One row per buyer-seller thread, tied to a specific post.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` (PK) | Auto-generated. |
| `post_id` | `uuid` (FK → posts.id) | The listing or want that started the conversation. |
| `buyer_id` | `uuid` (FK → profiles.id) | The person who messaged first. |
| `seller_id` | `uuid` (FK → profiles.id) | The post author. |
| `buyer_revealed` | `boolean` | Has the buyer agreed to reveal their name? Default: false. |
| `seller_revealed` | `boolean` | Has the seller agreed to reveal their name? Default: false. |
| `created_at` | `timestamptz` | Default: `now()`. |

**RLS sketch:**
- SELECT: only the buyer and seller of a conversation can see it.
- INSERT: verified students only (one conversation per buyer per post — enforce with unique constraint).
- UPDATE: each participant can only update their own `*_revealed` field.

---

### 2.4 `messages`

Individual messages within a conversation.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` (PK) | Auto-generated. |
| `conversation_id` | `uuid` (FK → conversations.id) | Parent conversation. |
| `sender_id` | `uuid` (FK → profiles.id) | Who sent it. |
| `body` | `text` | Message content. Required. Max length TBD. |
| `created_at` | `timestamptz` | Default: `now()`. |
| `read_at` | `timestamptz` | Null until the other side reads it. |

**RLS sketch:**
- SELECT: only participants of the parent conversation.
- INSERT: only a participant of the parent conversation.
- UPDATE: sender can update `read_at` is not appropriate — the *receiver* marks as read. Policy TBD.

---

### 2.5 `blocks`

Tracks one-way blocks between users.

| Column | Type | Notes |
|---|---|---|
| `blocker_id` | `uuid` (FK → profiles.id) | Who placed the block. |
| `blocked_id` | `uuid` (FK → profiles.id) | Who is blocked. |
| `created_at` | `timestamptz` | Default: `now()`. |

Primary key: `(blocker_id, blocked_id)`.

**RLS sketch:**
- SELECT: a user can only see their own block rows.
- INSERT: a user can only insert rows where they are the blocker.
- DELETE: a user can only delete their own block rows (i.e. unblock).

---

### 2.6 `reports`

User-submitted reports on posts, requests, or other users.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` (PK) | Auto-generated. |
| `reporter_id` | `uuid` (FK → profiles.id) | Who filed the report. |
| `target_type` | `text` | `'post'` or `'user'`. |
| `target_id` | `uuid` | ID of the reported post or user profile. |
| `reason` | `text` | Selected from a short list (e.g. "Scam", "Spam", "Inappropriate"). |
| `created_at` | `timestamptz` | Default: `now()`. |

Unique constraint: `(reporter_id, target_type, target_id)` — prevents duplicate reports from the same user.

**RLS sketch:**
- SELECT: admins only.
- INSERT: verified students only (unique constraint handles deduplication).

---

### 2.7 `trades`

Tracks the double-confirmation of a completed trade.

| Column | Type | Notes |
|---|---|---|
| `post_id` | `uuid` (PK, FK → posts.id) | One trade record per post. |
| `buyer_confirmed` | `boolean` | Default: false. |
| `seller_confirmed` | `boolean` | Default: false. |
| `confirmed_at` | `timestamptz` | Set when both sides confirm. |

**RLS sketch:**
- SELECT: participants of the related post's conversation.
- INSERT / UPDATE: only the buyer or seller of that post's conversation.

---

## 3. Table Relationship Diagram

```
auth.users (Supabase managed)
    |
    | 1:1
    v
profiles
    |           |
    | 1:many    | 1:many
    v           v
  posts       blocks
    |
    | 1:many
    v
conversations
    |           |
    | 1:many    | 1:1
    v           v
messages      trades
    |
    | (reporter_id)
    v
reports
```

---

## 4. Open Schema Questions

| Question | Status |
|---|---|
| Report auto-hide threshold | Configurable constant. Value TBD. |
| Listing expiry duration | Configurable constant. 72 hours is one idea. TBD. |
| Faculty list (enum or free text) | TBD — enum is safer; free text is more flexible. |
| Category list (enum or free text) | TBD — start with a short enum (Textbooks, Electronics, Furniture, Clothing, Other). |
| Max message body length | TBD. |
| Max listing title length | TBD. |
| Whether `real_name` belongs in `profiles` or a separate table | Open — separate table is cleaner if reveal logic gets complex. |
| `read_at` update policy (who can mark a message as read) | TBD before sprint 4. |

---

## 5. Migrations

Schema changes will be managed as numbered Supabase migration files in `supabase/migrations/`. Each sprint that changes the schema adds a new migration file. Never edit existing migration files after they have been applied.
