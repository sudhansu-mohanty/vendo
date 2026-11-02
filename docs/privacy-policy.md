# Vendo — Privacy Policy

Last updated: 2026-11-02
Status: Draft. Must be reviewed by the team before public launch.

> This is a working draft. Have it reviewed before Vendo opens beyond the founders' close circle.

---

## 1. Who We Are

Vendo is a free marketplace for verified Concordia University students, operated by its two student founders ("we", "us", "our"). This policy explains what personal information we collect, how we use it, and what choices you have.

---

## 2. Information We Collect

### 2.1 Information you provide

| Data | When collected | Who can see it |
|---|---|---|
| Concordia student email | Sign-up | Admins only. Never shown to other users. |
| Faculty (e.g. GCS, JMSB) | Profile setup | Other users in chat (anonymous identifier). |
| Year (e.g. U2) | Profile setup (optional) | Other users in chat if you chose to share it. |
| Real name | Profile setup (optional) | Hidden by default. Shown to the other party in a conversation only if both sides agree to a mutual reveal. |
| Listing content (title, description, price, photos, category, campus, course code) | When you post a listing or want request | All users (public feed). |
| Messages | When you send a chat message | Only the participants of that conversation. |
| Reports | When you file a report | Admins only. |
| Trade confirmations | When you confirm a trade | Both participants and admins. |

### 2.2 Information collected automatically

- Session data (authentication tokens) managed by Supabase Auth.
- Basic server logs (IP address, browser, timestamps) for security and abuse detection. These are not linked to your public profile.

---

## 3. How We Use Your Information

| Purpose | Data used |
|---|---|
| Verify you are a Concordia student | Email domain check |
| Send verification and notification emails | Email address |
| Display your anonymous identity in chat | Faculty, optional year |
| Allow name reveal (with mutual consent) | Real name |
| Show your listings in the feed | All listing fields |
| Deliver messages | Message content, conversation participants |
| Investigate reports and enforce community rules | Email, account history, reported content |
| Prevent spam and abuse | Account age, post rate, message rate |

We do not sell your personal information to anyone.

---

## 4. What Other Users Can See

| Data | Visible to other users? |
|---|---|
| Concordia email | Never |
| Real name | Only after mutual name reveal (both sides agree) |
| Faculty | Yes (shown in chat as anonymous identifier) |
| Year | Only if you chose to include it |
| Listings and want requests | Yes (public feed) |
| Messages | Only your conversation partner |
| Reports you filed | No |
| Trade history (count only) | Planned future feature (trust badge) |

---

## 5. Admin Access

Vendo's two admin accounts (the founders) can see:

- The mapping between a verified Concordia email and an account, for the purpose of investigating abuse and enforcing bans.
- Reported content and report history.
- Platform usage statistics (counts only — signups, listings, trades).

Admins cannot see message content without a specific, logged investigation reason. Message access controls are TBD and will be documented when implemented.

---

## 6. Data Sharing

We do not sell, rent, or trade your personal information.

We share data only with:

- **Supabase** (our database and auth provider) — processes data on our behalf under their data processing terms.
- **Vercel** (our hosting provider) — hosts the application and handles server-side requests.
- **Resend** (our email provider) — delivers verification and notification emails. Your email address is passed to Resend for this purpose.
- **Law enforcement or legal authorities** — if required by law or to protect the safety of users.

---

## 7. Data Retention

| Data | Retention |
|---|---|
| Active listings | Until expired, deleted by user, or hidden by admin. |
| Expired / sold listings | TBD — team to decide (e.g. 90 days after expiry). |
| Messages | TBD — team to decide (e.g. 1 year or until account deletion). |
| Profiles | Until account deletion request. |
| Reports | Until resolved or account deletion. |

Data retention periods will be finalized and documented here before public launch.

---

## 8. Your Rights

You can:

- **Access** the information we hold about you by contacting us.
- **Update** your faculty, year, and optional real name at any time in your profile settings.
- **Delete** your account and associated data by contacting us. Some data (e.g. trade confirmation records) may be retained in anonymized form.
- **Opt out** of email notifications in your profile settings (verification emails are required and cannot be opted out of).

If you are in Quebec, you have rights under **Quebec's Act respecting the protection of personal information in the private sector (Law 25)**. Contact us with any privacy requests.

---

## 9. Security

We protect your data using:

- Encrypted connections (HTTPS everywhere).
- Supabase Row-Level Security — every database table has policies ensuring users can only access their own data.
- Secrets (API keys, database credentials) are never stored in source code.
- Images are stored with randomized paths in Supabase Storage.

No system is perfectly secure. If you discover a security issue, please contact us privately before disclosing it publicly.

---

## 10. Cookies and Tracking

Vendo uses only the cookies necessary to maintain your login session (set by Supabase Auth). We do not use advertising cookies or third-party tracking pixels.

---

## 11. Changes to This Policy

We may update this policy as the platform evolves. Significant changes will be communicated through the platform. The "last updated" date at the top of this document will reflect any revisions.

---

## 12. Contact

Privacy questions, access requests, or deletion requests:
Contact: [contact email — TBD before launch]
