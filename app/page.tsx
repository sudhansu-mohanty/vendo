import type { CSSProperties, ReactNode } from "react"

/* ─── Icons ─────────────────────────────────────────────────────────────── */

function ICheck({ stroke = "black" }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
      <polyline points="5,12.5 9.5,17 19,6" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IPin() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
      <path d="M12 21 C12 21 18 14.5 18 10 A6 6 0 0 0 6 10 C6 14.5 12 21 12 21 Z" stroke="black" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.3" fill="black" />
    </svg>
  )
}
function IBack() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <line x1="19" y1="12" x2="5" y2="12" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
      <polyline points="11,6 5,12 11,18" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IBlock() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
      <circle cx="12" cy="12" r="8" stroke="black" strokeWidth="1.7" />
      <line x1="6.3" y1="17.7" x2="17.7" y2="6.3" stroke="black" strokeWidth="1.7" />
    </svg>
  )
}
function ISend() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
      <path d="M4 12 L20 4 L13 20 L11 13 Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}
function IBook() {
  return (
    <svg viewBox="0 0 24 24" width="42" height="42" fill="none">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="black" strokeWidth="1.6" />
      <line x1="4" y1="7" x2="20" y2="7" stroke="black" strokeWidth="1.6" />
      <line x1="8" y1="11" x2="16" y2="11" stroke="black" strokeWidth="1.4" />
      <line x1="8" y1="14.5" x2="16" y2="14.5" stroke="black" strokeWidth="1.4" />
    </svg>
  )
}
function ILamp() {
  return (
    <svg viewBox="0 0 24 24" width="42" height="42" fill="none">
      <path d="M8 5 L16 5 L13.2 12 L18 12" stroke="black" strokeWidth="1.6" strokeLinejoin="round" />
      <line x1="13" y1="12" x2="13" y2="19" stroke="black" strokeWidth="1.6" />
      <line x1="8" y1="19" x2="18" y2="19" stroke="black" strokeWidth="1.6" />
    </svg>
  )
}
function ICalc() {
  return (
    <svg viewBox="0 0 24 24" width="42" height="42" fill="none">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="black" strokeWidth="1.6" />
      <rect x="7.5" y="5.5" width="9" height="4" rx="0.8" stroke="black" strokeWidth="1.3" />
      <circle cx="8.5" cy="13.5" r="1.1" fill="black" />
      <circle cx="12" cy="13.5" r="1.1" fill="black" />
      <circle cx="15.5" cy="13.5" r="1.1" fill="black" />
      <circle cx="8.5" cy="17" r="1.1" fill="black" />
      <circle cx="12" cy="17" r="1.1" fill="black" />
      <circle cx="15.5" cy="17" r="1.1" fill="black" />
    </svg>
  )
}
function IJacket() {
  return (
    <svg viewBox="0 0 24 24" width="42" height="42" fill="none">
      <path d="M9 4 L12 6 L15 4 L19 7 L17 10 L16 9 L16 20 L8 20 L8 9 L7 10 L5 7 Z" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="12" y1="6" x2="12" y2="20" stroke="black" strokeWidth="1.2" />
    </svg>
  )
}
function IFridge() {
  return (
    <svg viewBox="0 0 24 24" width="42" height="42" fill="none">
      <rect x="6" y="2.5" width="12" height="19" rx="2" stroke="black" strokeWidth="1.6" />
      <line x1="6" y1="10" x2="18" y2="10" stroke="black" strokeWidth="1.6" />
      <line x1="9" y1="5" x2="9" y2="7.5" stroke="black" strokeWidth="1.4" />
      <line x1="9" y1="12.5" x2="9" y2="15" stroke="black" strokeWidth="1.4" />
    </svg>
  )
}

/* ─── Primitives ─────────────────────────────────────────────────────────── */

function Sticker({ bg, rotate, top, bottom, left, right, children }: {
  bg: string; rotate: string;
  top?: number | string; bottom?: number | string;
  left?: number | string; right?: number | string;
  children: ReactNode;
}) {
  return (
    <div style={{
      position: "absolute", width: 56, height: 56,
      border: "1px solid #000", borderRadius: 16, background: bg,
      transform: `rotate(${rotate})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 3, top, bottom, left, right,
    }}>
      {children}
    </div>
  )
}

function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #000", borderRadius: 28, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid #000", background: "#eef0ea" }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", border: "1px solid #000", background: "var(--ember)", display: "block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", border: "1px solid #000", background: "var(--sunburst)", display: "block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", border: "1px solid #000", background: "var(--mint-pop)", display: "block" }} />
        <span style={{ flex: 1, marginLeft: 6, background: "#fff", border: "1px solid #000", borderRadius: 1600, fontSize: 11, fontWeight: 600, padding: "4px 12px", fontFamily: "ui-monospace, Consolas, monospace", color: "#444", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {url}
        </span>
      </div>
      <div style={{ padding: 22 }}>{children}</div>
    </div>
  )
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: "min(380px, 100%)", margin: "0 auto", background: "#fff", border: "1px solid #000", borderRadius: 34, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
        <span style={{ width: 70, height: 6, background: "#000", borderRadius: 1600, display: "block" }} />
      </div>
      <div style={{ padding: "12px 14px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
        {children}
      </div>
    </div>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.032em", textTransform: "uppercase", display: "inline-block", padding: "5px 12px", border: "1px solid #000", borderRadius: 1600, background: "#fff", marginBottom: 14 }}>
      {children}
    </span>
  )
}

function Tag({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.02em", textTransform: "uppercase", border: "1px solid #000", borderRadius: 1600, padding: "3px 8px", ...style }}>
      {children}
    </span>
  )
}

function Chip({ active, children }: { active?: boolean; children: ReactNode }) {
  return (
    <span style={{ border: "1px solid #000", borderRadius: 1600, padding: "7px 13px", fontSize: 12, fontWeight: 700, background: active ? "#000" : "#fff", color: active ? "#fff" : "#000" }}>
      {children}
    </span>
  )
}

function PillBtn({ fill, children, style }: { fill?: boolean; children: ReactNode; style?: CSSProperties }) {
  return (
    <span style={{ border: "1px solid #000", borderRadius: 1600, fontWeight: 700, fontSize: 12, letterSpacing: "0.032em", textTransform: "uppercase", padding: "10px 16px", display: "inline-flex", alignItems: "center", gap: 6, background: fill ? "#000" : "#fff", color: fill ? "#fff" : "#000", ...style }}>
      {children}
    </span>
  )
}

function ListingCard({ bg, icon, title, price, time, tags }: {
  bg: string; icon: ReactNode;
  title: string; price: string; time: string; tags: string[];
}) {
  return (
    <article style={{ border: "1px solid #000", borderRadius: 20, background: "#fff", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ aspectRatio: "1.1/1", borderRadius: 14, border: "1px solid #000", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <p style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3, margin: 0 }}>{title}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 800, fontSize: 14 }}>{price}</span>
        <span style={{ fontSize: 10.5, color: "#555", fontWeight: 600 }}>{time}</span>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tags.map(t => <Tag key={t}>{t}</Tag>)}
      </div>
    </article>
  )
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const MARQUEE = [
  "VENDO VISUAL DIRECTION — ADAPTED FROM THE SLUSH STYLE SYSTEM",
  "SCREENS: FEED · LISTING DETAIL · CHAT",
  "VENDO VISUAL DIRECTION — ADAPTED FROM THE SLUSH STYLE SYSTEM",
  "SCREENS: FEED · LISTING DETAIL · CHAT",
]

const CARDS = [
  { bg: "var(--sunburst)",      icon: <IBook />,   title: "Calculus 1 Textbook — MATH 203", price: "$40", time: "2h ago",  tags: ["Textbooks",   "SGW"]    },
  { bg: "var(--lavender)",      icon: <ILamp />,   title: "IKEA Desk Lamp",                 price: "$15", time: "5h ago",  tags: ["Furniture",   "Loyola"] },
  { bg: "var(--electric-blue)", icon: <ICalc />,   title: "TI-84 Plus Calculator",          price: "$35", time: "1d ago",  tags: ["Electronics", "SGW"]    },
  { bg: "var(--ember)",         icon: <IJacket />, title: "Winter Jacket (M)",              price: "$60", time: "3h ago",  tags: ["Clothing",    "Loyola"] },
  { bg: "var(--sunburst)",      icon: <IBook />,   title: "COMP 352 Notes Bundle",          price: "$20", time: "6h ago",  tags: ["Textbooks",   "SGW"]    },
  { bg: "var(--lavender)",      icon: <IFridge />, title: "Mini Fridge, works great",       price: "$80", time: "1d ago",  tags: ["Furniture",   "Loyola"] },
]

const MESSAGES = [
  { out: false, text: "Hey! Still interested in the Calc textbook?",  time: "GCS · U3 · 4:02 PM" },
  { out: true,  text: "Yes! Is it still available?",                   time: "You · 4:03 PM ✓"    },
  { out: false, text: "Yep, barely used. $40 works?",                  time: "GCS · U3 · 4:05 PM" },
  { out: true,  text: "Works for me. Meet today around 3?",            time: "You · 4:06 PM ✓"    },
  { out: false, text: "Bench by the Webster Library security desk?",   time: "GCS · U3 · 4:07 PM" },
]

/* ─── Page ───────────────────────────────────────────────────────────────── */

const display: CSSProperties = { fontFamily: "var(--font-bowlby), 'Bowlby One', sans-serif" }
const section: CSSProperties = { padding: "64px 24px 80px", position: "relative", overflow: "hidden", borderBottom: "1px solid #000" }
const sectionHead: CSSProperties = { maxWidth: 980, margin: "0 auto 36px", position: "relative", zIndex: 2 }
const frameWrap: CSSProperties = { maxWidth: 980, margin: "0 auto", position: "relative", zIndex: 2 }

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ── Marquee ──────────────────────────────────────────────────────── */}
      <div style={{ background: "#000", color: "#fff", overflow: "hidden", whiteSpace: "nowrap", borderBottom: "1px solid #000" }}>
        <div className="animate-marquee" style={{ display: "inline-flex", padding: "11px 0" }}>
          {MARQUEE.map((item, i) => (
            <span key={i} style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.032em", textTransform: "uppercase", padding: "0 28px", whiteSpace: "nowrap" }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", background: "var(--sky-wash)", padding: "72px 24px 56px", textAlign: "center", overflow: "hidden", borderBottom: "1px solid #000" }}>
        <svg style={{ position: "absolute", top: "10%", left: "50%", width: "min(1100px, 150%)", transform: "translateX(-50%)", zIndex: 0 }} viewBox="0 0 1100 260" aria-hidden="true">
          <path d="M-20 170 C 220 40, 420 260, 640 120 C 820 10, 980 150, 1140 70" fill="none" stroke="#4da2ff" strokeWidth="70" strokeLinecap="round" opacity={0.9} />
          <path d="M-20 170 C 220 40, 420 260, 640 120 C 820 10, 980 150, 1140 70" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ ...display, fontSize: "clamp(64px, 14vw, 150px)", lineHeight: 0.78, letterSpacing: "0.01em", margin: 0 }}>
            VENDO
          </h1>
          <p style={{ margin: "18px auto 0", maxWidth: 540, fontSize: 17, lineHeight: 1.5, fontWeight: 500 }}>
            The visual direction for Concordia&apos;s student-only marketplace — pastel sticker-book style, borrowed from Slush and re-cut for buying, selling, and anonymous chat.
          </p>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 22, padding: "8px 16px", background: "#fff", border: "1px solid #000", borderRadius: 1600, fontSize: 12, fontWeight: 700, letterSpacing: "0.032em", textTransform: "uppercase" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--voltage-violet)", border: "1px solid #000", display: "inline-block" }} />
            Three screens, one look
          </span>
        </div>
      </section>

      {/* ── Screen 01 — Feed ─────────────────────────────────────────────── */}
      <section style={{ ...section, background: "var(--sky-wash)" }}>
        <Sticker bg="var(--sunburst)" rotate="-8deg" top={40} right="6%"><ICheck /></Sticker>
        <Sticker bg="var(--mint-pop)" rotate="10deg" bottom={10} left="4%"><IPin /></Sticker>

        <div style={sectionHead}>
          <Eyebrow>Screen 01</Eyebrow>
          <h2 style={{ ...display, fontSize: "clamp(40px, 7vw, 78px)", lineHeight: 0.82, margin: "0 0 10px" }}>FEED</h2>
          <p style={{ fontSize: 15, fontWeight: 500, maxWidth: 560, lineHeight: 1.5, margin: 0 }}>
            Public — anyone can browse without an account. Opening an item or messaging a seller is what prompts sign-up.
          </p>
          <span style={{ display: "inline-block", marginTop: 14, fontSize: 12, fontWeight: 600, fontFamily: "ui-monospace, Consolas, monospace", background: "#000", color: "#fff", padding: "4px 10px", borderRadius: 6 }}>
            vendo.app/
          </span>
        </div>

        <div style={frameWrap}>
          <BrowserFrame url="vendo.app">
            {/* Nav */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #000", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", ...display, fontSize: 15 }}>V</span>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["Browse", "Want Board", "Sell"].map(l => (
                    <span key={l} style={{ border: "1px solid #000", background: "#fff", borderRadius: 1600, padding: "8px 14px", fontSize: 12, fontWeight: 700, letterSpacing: "0.032em", textTransform: "uppercase" }}>{l}</span>
                  ))}
                </div>
              </div>
              <PillBtn fill>Sign up</PillBtn>
            </div>
            {/* Head */}
            <div style={{ margin: "6px 0 18px" }}>
              <h3 style={{ ...display, fontSize: "clamp(26px, 5vw, 40px)", lineHeight: 0.85, marginBottom: 6 }}>WHAT&apos;S NEW</h3>
              <p style={{ fontSize: 13, color: "#444", fontWeight: 500, margin: 0 }}>142 active listings across SGW &amp; Loyola</p>
            </div>
            {/* Chips */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              <Chip active>SGW</Chip>
              {["Loyola", "Textbooks", "Electronics", "Furniture", "Clothing"].map(c => <Chip key={c}>{c}</Chip>)}
            </div>
            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
              {CARDS.map((c, i) => <ListingCard key={i} {...c} />)}
            </div>
          </BrowserFrame>
        </div>
      </section>

      {/* ── Screen 02 — Listing Detail ───────────────────────────────────── */}
      <section style={{ ...section, background: "#fff" }}>
        <Sticker bg="var(--ember)" rotate="-6deg" top={30} left="5%"><IPin /></Sticker>
        <Sticker bg="var(--voltage-violet)" rotate="9deg" bottom={30} right="5%"><ICheck stroke="white" /></Sticker>

        <div style={sectionHead}>
          <Eyebrow>Screen 02</Eyebrow>
          <h2 style={{ ...display, fontSize: "clamp(40px, 7vw, 78px)", lineHeight: 0.82, margin: "0 0 10px" }}>LISTING DETAIL</h2>
          <p style={{ fontSize: 15, fontWeight: 500, maxWidth: 560, lineHeight: 1.5, margin: 0 }}>
            Still public to view. &ldquo;Message Seller&rdquo; is the gate — tapping it without an account prompts sign-up.
          </p>
          <span style={{ display: "inline-block", marginTop: 14, fontSize: 12, fontWeight: 600, fontFamily: "ui-monospace, Consolas, monospace", background: "#000", color: "#fff", padding: "4px 10px", borderRadius: 6 }}>
            vendo.app/listings/calc-1-math203
          </span>
        </div>

        <div style={frameWrap}>
          <BrowserFrame url="vendo.app/listings/calc-1-math203">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: 14 }}>
              <IBack /> Back to feed
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ border: "1px solid #000", borderRadius: 20, aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--sunburst)", maxWidth: 220 }}>
                <IBook />
              </div>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2, marginBottom: 6 }}>Calculus 1 Textbook</h3>
                <p style={{ fontSize: 24, fontWeight: 800, margin: "0 0 10px" }}>$40</p>
                <div style={{ display: "flex", gap: 7, marginBottom: 14, flexWrap: "wrap" }}>
                  <Tag>Textbooks</Tag><Tag>SGW</Tag>
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#222", margin: "0 0 12px" }}>
                  Barely used, 9th edition. No highlighting, all pages intact. Selling because I switched sections.
                </p>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#444", margin: "0 0 16px" }}>Course code: MATH 203</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid #000", borderRadius: 1600, padding: "8px 14px 8px 8px", marginBottom: 16 }}>
                  <span style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--lavender)", border: "1px solid #000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>GC</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700 }}>GCS · U3</span>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <PillBtn fill>Message Seller</PillBtn>
                </div>
                <div style={{ border: "1px solid #000", borderRadius: 20, background: "#eef0ea", padding: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: "var(--sunburst)", border: "1px solid #000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                      <path d="M12 21 C12 21 18 14.5 18 10 A6 6 0 0 0 6 10 C6 14.5 12 21 12 21 Z" stroke="black" strokeWidth="1.6" strokeLinejoin="round" />
                      <circle cx="12" cy="10" r="2.3" fill="black" />
                    </svg>
                  </span>
                  <div>
                    <p style={{ fontSize: 12.5, fontWeight: 800, margin: "0 0 3px" }}>Suggested meetup</p>
                    <p style={{ fontSize: 12.5, fontWeight: 600, margin: "0 0 4px" }}>Bench near Webster Library security desk, SGW</p>
                    <p style={{ fontSize: 11, color: "#555", lineHeight: 1.4, margin: 0 }}>Not an official Concordia safety guarantee — just a well-lit, public spot.</p>
                  </div>
                </div>
              </div>
            </div>
          </BrowserFrame>
        </div>
      </section>

      {/* ── Screen 03 — Chat ─────────────────────────────────────────────── */}
      <section style={{ ...section, background: "var(--concrete-gray)" }}>
        <Sticker bg="var(--lavender)" rotate="7deg" top={36} left="7%"><IPin /></Sticker>
        <Sticker bg="var(--sunburst)" rotate="-10deg" bottom={20} right="7%"><ICheck /></Sticker>

        <div style={sectionHead}>
          <Eyebrow>Screen 03</Eyebrow>
          <h2 style={{ ...display, fontSize: "clamp(40px, 7vw, 78px)", lineHeight: 0.82, margin: "0 0 10px" }}>CHAT</h2>
          <p style={{ fontSize: 15, fontWeight: 500, maxWidth: 560, lineHeight: 1.5, margin: 0 }}>
            Anonymous by default — faculty only. A name shows only after both sides agree; either can decline, no explanation needed.
          </p>
          <span style={{ display: "inline-block", marginTop: 14, fontSize: 12, fontWeight: 600, fontFamily: "ui-monospace, Consolas, monospace", background: "#000", color: "#fff", padding: "4px 10px", borderRadius: 6 }}>
            vendo.app/inbox/142
          </span>
        </div>

        <div style={frameWrap}>
          <PhoneFrame>
            {/* Chat header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 10, borderBottom: "1px solid #000" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid #000", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><IBack /></span>
                <span style={{ fontSize: 12.5, fontWeight: 700 }}>GCS · U3</span>
              </div>
              <span style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid #000", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><IBlock /></span>
            </div>
            {/* Reveal card */}
            <div style={{ border: "1px solid #000", borderRadius: 16, background: "var(--lavender)", padding: 11 }}>
              <p style={{ fontSize: 11.5, fontWeight: 600, lineHeight: 1.4, margin: "0 0 8px" }}>GCS · U3 would like to reveal names to each other.</p>
              <div style={{ display: "flex", gap: 6 }}>
                <PillBtn fill style={{ padding: "6px 11px", fontSize: 10.5 }}>Reveal mine too</PillBtn>
                <PillBtn style={{ padding: "6px 11px", fontSize: 10.5 }}>Stay anonymous</PillBtn>
              </div>
            </div>
            {/* Thread */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {MESSAGES.map((msg, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", maxWidth: "82%", alignSelf: msg.out ? "flex-end" : "flex-start", alignItems: msg.out ? "flex-end" : "flex-start" }}>
                  <div style={{ border: "1px solid #000", borderRadius: 16, padding: "9px 12px", fontSize: 12.5, lineHeight: 1.4, background: msg.out ? "#fff" : "var(--sky-wash)" }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: 9.5, color: "#666", marginTop: 3, fontWeight: 600 }}>{msg.time}</span>
                </div>
              ))}
            </div>
            {/* Composer */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #000", borderRadius: 1600, padding: "4px 4px 4px 14px", marginTop: 4 }}>
              <span style={{ flex: 1, fontSize: 12.5, color: "#999", padding: "8px 0" }}>Message GCS · U3...</span>
              <span style={{ width: 30, height: 30, borderRadius: "50%", background: "#000", border: "1px solid #000", display: "flex", alignItems: "center", justifyContent: "center" }}><ISend /></span>
            </div>
          </PhoneFrame>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ padding: "40px 24px 56px", textAlign: "center", background: "#fff" }}>
        <p style={{ fontSize: 12.5, color: "#555", fontWeight: 600, marginBottom: 16, margin: "0 0 16px" }}>
          Visual direction adapted from the Slush style system for Vendo
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          {["var(--electric-blue)", "var(--mint-pop)", "var(--lavender)", "var(--ember)", "var(--sunburst)", "var(--voltage-violet)"].map((c, i) => (
            <span key={i} style={{ width: 18, height: 18, borderRadius: "50%", border: "1px solid #000", background: c, display: "block" }} />
          ))}
        </div>
      </footer>

    </div>
  )
}
