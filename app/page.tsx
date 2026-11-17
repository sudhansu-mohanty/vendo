import type { CSSProperties, ReactNode } from "react"
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero"

/* ─── Icons ─────────────────────────────────────────────────────────────── */

function ICheck() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
      <polyline points="5,12.5 9.5,17 19,6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ILock() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="black" strokeWidth="1.7" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="black" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
function IStar() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
      <path d="M12 3l2.09 5.26L20 9.27l-4 3.9.94 5.46L12 15.9l-4.94 2.73.94-5.46-4-3.9 5.91-.01z" stroke="black" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Sticker ────────────────────────────────────────────────────────────── */

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

/* ─── Hero images (placeholders — replace with real Vendo content) ───────── */

const CDN = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev"

const HERO_IMAGES = [
  { src: `${CDN}/stock-images/767d99bb371a54d0d36751e8cecae43c.jpg`, alt: "Campus life" },
  { src: `${CDN}/gradients/hero_gradient/hero-gradients-01.png`,    alt: "" },
  { src: `${CDN}/stock-images/821d815affa6496c39cbdeeec7a84603.jpg`, alt: "Student scene" },
  { src: `${CDN}/gradients/moon/moon-grade-03.png`,                  alt: "" },
  { src: `${CDN}/stock-images/937438c560ada1c83317f2c11b3454b0.jpg`, alt: "Student scene" },
  { src: `${CDN}/gradients/shade_shiters/shade-shifters-05.png`,     alt: "" },
  { src: `${CDN}/stock-images/98f89cb9994f5c382ab964062c4039db.jpg`, alt: "Student scene" },
  { src: `${CDN}/gradients/shade_shiters/shade-shifters-09.png`,     alt: "" },
  { src: `${CDN}/stock-images/ddcbee38be8b7274e19e132d7ab35b53.jpg`, alt: "Student scene" },
  { src: `${CDN}/gradients/moon/moon-grade-06.png`,                  alt: "" },
]

/* ─── Data ───────────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    bg: "var(--sunburst)",
    icon: <IStar />,
    title: "Free",
    body: "No fees, no commission, no catch. Post and browse at no cost.",
  },
  {
    bg: "var(--lavender)",
    icon: <ILock />,
    title: "Anonymous",
    body: "Your real name stays hidden until both sides choose to reveal.",
  },
  {
    bg: "var(--mint-pop)",
    icon: <ICheck />,
    title: "Concordia Only",
    body: "Every account is verified with a @live.concordia.ca email.",
  },
]

/* ─── Page ───────────────────────────────────────────────────────────────── */

const display: CSSProperties = { fontFamily: "var(--font-bowlby), 'Bowlby One', sans-serif" }

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff", borderBottom: "1px solid #000", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ ...display, fontSize: 22, letterSpacing: "0.01em" }}>VENDO</span>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ border: "1px solid #000", background: "#fff", borderRadius: 1600, padding: "8px 16px", fontSize: 12, fontWeight: 700, letterSpacing: "0.032em", textTransform: "uppercase" }}>
            Browse
          </span>
          <span style={{ border: "1px solid #000", background: "#000", color: "#fff", borderRadius: 1600, padding: "10px 18px", fontSize: 12, fontWeight: 700, letterSpacing: "0.032em", textTransform: "uppercase" }}>
            Sign up free
          </span>
        </div>
      </nav>

      {/* ── Marquee ticker ───────────────────────────────────────────────── */}
      <div style={{ background: "var(--sunburst)", borderBottom: "1px solid #000", padding: "10px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div className="animate-marquee" style={{ display: "inline-block" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} style={{ ...display, fontSize: 13, letterSpacing: "0.06em", marginRight: 0 }}>
              FREE &nbsp;·&nbsp; CONCORDIA ONLY &nbsp;·&nbsp; ANONYMOUS &nbsp;·&nbsp; BUY &nbsp;·&nbsp; SELL &nbsp;·&nbsp; VENDO &nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      {/* axis=42 puts the image band in the upper-center area.
          Content is pushed to the bottom half via justifyContent: flex-end. */}
      <TiltedGridHero
        images={HERO_IMAGES}
        axis={42}
        curve={78}
        speed={5}
        tileHeight={30}
        fade={14}
        style={{ height: 640, background: "var(--sky-wash)", borderBottom: "1px solid #000" }}
      >
        <Sticker bg="var(--ember)"          rotate="-10deg" top="18%"  left="8%"><IStar /></Sticker>
        <Sticker bg="var(--sunburst)"       rotate="8deg"   top="12%"  right="8%"><ICheck /></Sticker>
        <Sticker bg="var(--voltage-violet)" rotate="-6deg"  bottom="15%" right="12%"><ILock /></Sticker>

        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", textAlign: "center" }}>
          <h1 style={{ ...display, fontSize: "clamp(56px, 12vw, 140px)", lineHeight: 0.78, letterSpacing: "0.01em", margin: "0 0 24px" }}>
            BUY.<br />SELL.<br />VENDO.
          </h1>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ border: "1px solid #000", background: "#000", color: "#fff", borderRadius: 1600, padding: "12px 24px", fontSize: 13, fontWeight: 700, letterSpacing: "0.032em", textTransform: "uppercase" }}>
              Sign up free
            </span>
            <span style={{ border: "1px solid #000", background: "#fff", color: "#000", borderRadius: 1600, padding: "12px 24px", fontSize: 13, fontWeight: 700, letterSpacing: "0.032em", textTransform: "uppercase" }}>
              Browse listings
            </span>
          </div>
        </div>
      </TiltedGridHero>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "72px 24px 80px", borderBottom: "1px solid #000" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <h2 style={{ ...display, fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 0.9, margin: "0 0 48px", textAlign: "center" }}>
            WHY VENDO
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{ border: "1px solid #000", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ width: 56, height: 56, border: "1px solid #000", borderRadius: 16, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {f.icon}
                </div>
                <p style={{ ...display, fontSize: 22, lineHeight: 1, margin: 0 }}>{f.title.toUpperCase()}</p>
                <p style={{ fontSize: 14, lineHeight: 1.6, fontWeight: 500, color: "#333", margin: 0 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section style={{ background: "var(--sky-wash)", padding: "72px 24px 80px", borderBottom: "1px solid #000" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <h2 style={{ ...display, fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 0.9, margin: "0 0 48px", textAlign: "center" }}>
            HOW IT WORKS
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              { n: "01", bg: "var(--mint-pop)", title: "Verify your email", body: "Sign up with your @live.concordia.ca email. We send a one-time link — no password needed." },
              { n: "02", bg: "var(--lavender)", title: "Post a listing", body: "Add photos, a title, price, and category. Your name stays hidden — you show as @username." },
              { n: "03", bg: "var(--sunburst)", title: "Chat & close the deal", body: "Message buyers or sellers inside Vendo. Meet on campus and exchange. Done." },
            ].map((step) => (
              <div key={step.n} style={{ border: "1px solid #000", borderRadius: 20, padding: 28, background: "#fff", display: "flex", flexDirection: "column", gap: 16 }}>
                <span style={{ ...display, fontSize: 48, lineHeight: 1, background: step.bg, border: "1px solid #000", borderRadius: 14, width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center" } as CSSProperties}>
                  {step.n}
                </span>
                <p style={{ ...display, fontSize: 20, lineHeight: 1, margin: 0 }}>{step.title.toUpperCase()}</p>
                <p style={{ fontSize: 14, lineHeight: 1.6, fontWeight: 500, color: "#333", margin: 0 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────────────────── */}
      <section style={{ background: "#000", padding: "80px 24px", textAlign: "center", borderBottom: "1px solid #000" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
          <h2 style={{ ...display, fontSize: "clamp(42px, 8vw, 96px)", lineHeight: 0.85, color: "#fff", margin: 0 }}>
            READY TO<br />
            <span style={{ color: "var(--sunburst)" }}>SELL?</span>
          </h2>
          <p style={{ fontSize: 15, fontWeight: 500, color: "#aaa", margin: 0, maxWidth: 400, lineHeight: 1.6 }}>
            Free. Anonymous. Concordia-only. The marketplace your campus was missing.
          </p>
          <span style={{ border: "1px solid #fff", background: "var(--sunburst)", color: "#000", borderRadius: 1600, padding: "14px 32px", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Sign up free
          </span>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ padding: "40px 24px", background: "#fff", borderTop: "1px solid #000" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ ...display, fontSize: 22 }}>VENDO</span>
            <p style={{ fontSize: 12, fontWeight: 500, color: "#666", margin: 0 }}>Concordia University student marketplace</p>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {["About", "Privacy", "Terms"].map((l) => (
              <span key={l} style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#000", textDecoration: "underline", textUnderlineOffset: 3 }}>{l}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["var(--electric-blue)", "var(--mint-pop)", "var(--lavender)", "var(--ember)", "var(--sunburst)", "var(--voltage-violet)"].map((c, i) => (
              <span key={i} style={{ width: 16, height: 16, borderRadius: "50%", border: "1px solid #000", background: c, display: "block" }} />
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}
