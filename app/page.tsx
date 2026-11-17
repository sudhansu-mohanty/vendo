"use client";

import type { CSSProperties, ReactNode } from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero"
import { NotchNav } from "@/components/ui/adaptive-notch-navigation-bar"
import type { NotchItemData } from "@/components/ui/adaptive-notch-navigation-bar"
import { IntroScreen } from "@/components/ui/intro-screen"
import { Search, Tag } from "lucide-react"


/* ─── Animated Sticker ───────────────────────────────────────────────────── */

const ALL_CHARS = [
  "red1", "red2",
  "green1", "green2", "green3", "green4",
  "blue1", "blue2", "blue3",
  "orange1", "orange2", "orange3",
  "yellow1", "yellow2", "yellow3",
  "pink1", "pink2", "pink3",
]

function pickOther(exclude: string) {
  const pool = ALL_CHARS.filter(c => c !== exclude)
  return pool[Math.floor(Math.random() * pool.length)]
}

function AnimatedSticker({ rotate, top, bottom, left, right, initial, delay = 0 }: {
  rotate: string
  top?: number | string; bottom?: number | string
  left?: number | string; right?: number | string
  initial: string
  delay?: number
}) {
  const [char, setChar] = useState(initial)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    function cycle() {
      setVisible(false)
      timer = setTimeout(() => {
        setChar(prev => pickOther(prev))
        setVisible(true)
        timer = setTimeout(cycle, 1800 + Math.random() * 2400)
      }, 350)
    }

    timer = setTimeout(() => {
      setVisible(true)
      timer = setTimeout(cycle, 1800 + Math.random() * 2400)
    }, delay)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ position: "absolute", transform: `rotate(${rotate})`, zIndex: 3, top, bottom, left, right }}>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.img
            key={char}
            src={`/cute-shapes/${char}.svg`}
            alt=""
            style={{ width: "clamp(84px, 21vw, 180px)", height: "clamp(84px, 21vw, 180px)", display: "block" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          />
        )}
      </AnimatePresence>
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
    icon: <img src="/cute-shapes/orange1.svg" width={64} height={64} alt="" />,
    title: "Free",
    body: "No fees, no commission, no catch. Post and browse at no cost.",
  },
  {
    bg: "#fff",
    icon: <img src="/cute-shapes/yellow1.svg" width={64} height={64} alt="" />,
    title: "Anonymous",
    body: "Your real name stays hidden until both sides choose to reveal.",
  },
  {
    bg: "#fff",
    icon: <img src="/cute-shapes/pink1.svg" width={64} height={64} alt="" />,
    title: "Concordia Only",
    body: "Every account is verified with a @live.concordia.ca email.",
  },
]

/* ─── Nav ────────────────────────────────────────────────────────────────── */

const display: CSSProperties = { fontFamily: "var(--font-bowlby), 'Bowlby One', sans-serif" }

const NAV_ITEMS: NotchItemData[] = [
  { id: "browse", label: "Browse", icon: Search },
  { id: "sell",   label: "Sell",   icon: Tag },
]

const NavLogo = (
  <span style={{ ...display, fontSize: 18, letterSpacing: "0.01em" }}>
    VENDO
  </span>
)

const NavRight = (
  <span style={{
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    borderRadius: 1600,
    padding: "5px 14px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    cursor: "pointer",
  } as CSSProperties}>
    Sign up free
  </span>
)

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <>
      {showIntro && <IntroScreen onDone={() => setShowIntro(false)} />}
      <NotchNav
      items={NAV_ITEMS}
      defaultActiveId="browse"
      position="top"
      logo={NavLogo}
      rightContent={NavRight}
    >
      <div style={{ width: "100%" }}>

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <TiltedGridHero
          images={HERO_IMAGES}
          axis={42}
          curve={60}
          speed={5}
          tileHeight={60}
          fade={14}
          style={{ height: 640, background: "var(--sky-wash)", borderBottom: "1px solid #000" }}
        >
          <AnimatedSticker rotate="-10deg" top="4%"     left="3%"   initial="red1"    delay={200} />
          <AnimatedSticker rotate="8deg"   top="6%"     right="3%"  initial="green1"  delay={700} />
          <AnimatedSticker rotate="-6deg"  bottom="4%"  right="4%"  initial="blue1"   delay={400} />
          <AnimatedSticker rotate="6deg"   bottom="5%"  left="4%"   initial="orange1" delay={1000} />

          <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "5px 24px", textAlign: "center" }}>
            <h1 style={{ ...display, fontSize: "clamp(56px, 12vw, 140px)", lineHeight: 0.78, letterSpacing: "0.01em", margin: "0 0 24px", color: "#fff", textShadow: "0 2px 32px rgba(0,0,0,0.45)" }}>
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

        {/* ── Features ─────────────────────────────────────────────────── */}
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

        {/* ── How it works ─────────────────────────────────────────────── */}
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

        {/* ── CTA banner ───────────────────────────────────────────────── */}
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

        {/* ── Footer ───────────────────────────────────────────────────── */}
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
    </NotchNav>
    </>
  )
}
