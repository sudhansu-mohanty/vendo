"use client";

import type { CSSProperties, ReactNode } from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
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

/* ─── What Vendo scrollytelling ─────────────────────────────────────────── */

const WHAT_TEXT = "Vendo is the marketplace your campus was missing. Free — no fees, no commission, no catch. Anonymous by default, your real name stays hidden until you choose to share. Concordia only, every account verified with a live.concordia.ca email. Buy, sell, and trade with people who share your campus."

const PILLS: Record<number, { label: string; bg: string }> = {
  7:  { label: "No listing fees",    bg: "var(--sunburst)" },
  16: { label: "Real name hidden",   bg: "var(--mint-pop)" },
  25: { label: "Campus verified",    bg: "var(--lavender)" },
}

function Word({ word, index, total, progress }: {
  word: string; index: number; total: number
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
  const start = (index - 2) / total
  const end   = (index + 3) / total
  const opacity = useTransform(progress, [Math.max(0, start), Math.min(1, end)], [0.15, 1])
  const pill = PILLS[index]

  return (
    <motion.span style={{ opacity, position: "relative", display: "inline" }}>
      {pill && (
        <span style={{
          position: "absolute",
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          background: pill.bg,
          border: "1px solid #000",
          borderRadius: 1000,
          padding: "3px 12px",
          fontSize: "clamp(9px, 1.1vw, 12px)",
          fontWeight: 700,
          whiteSpace: "nowrap",
          color: "#000",
          letterSpacing: "0.03em",
          marginBottom: 4,
          display: "block",
        }}>
          {pill.label}
        </span>
      )}
      {word}{" "}
    </motion.span>
  )
}

function WhatVendo() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const words = WHAT_TEXT.split(" ")

  return (
    <section ref={ref} style={{ height: "300vh", position: "relative", background: "#fff", borderBottom: "1px solid #000" }}>

      {/* Wavy "What is Vendo?" banner */}
      <div style={{ position: "relative", width: "100%", overflow: "hidden", marginBottom: -2 }}>
        <svg
          viewBox="200 820 1900 760"
          style={{ display: "block", width: "100%", height: "clamp(220px, 28vw, 420px)" }}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="sq-clip-a"><path d="M 55 762 L 2318 762 L 2318 1713 L 55 1713 Z" clipRule="nonzero"/></clipPath>
            <clipPath id="sq-clip-b"><path d="M -0.00390625 1682.378906 L 899.375 0.109375 L 2337.636719 769.035156 L 1438.257812 2451.304688 Z" clipRule="nonzero"/></clipPath>
          </defs>
          <g clipPath="url(#sq-clip-a)">
            <g clipPath="url(#sq-clip-b)">
              <path
                fill="#f97316"
                fillOpacity="1"
                fillRule="nonzero"
                d="M 66.21875 1712.007812 C 52.136719 1708.941406 45.496094 1646.917969 84.988281 1547.726562 C 123.136719 1451.921875 216.878906 1309.832031 396.160156 1231.019531 C 507.378906 1183.464844 631.425781 1165.460938 765.007812 1167.152344 C 880.214844 1167.792969 996.75 1180.585938 1111.183594 1181.941406 C 1123.5 1182.109375 1135.863281 1182.136719 1148.269531 1182.019531 C 1495.355469 1178.738281 1786.261719 1065.285156 1988.722656 954.800781 C 2188.820312 845.605469 2299.140625 748.289062 2315.824219 764.382812 C 2332.507812 780.480469 2250.421875 911.019531 2052.457031 1055.007812 C 1852.148438 1200.703125 1537.570312 1345.902344 1149.941406 1349.9375 C 1136.132812 1350.082031 1122.363281 1350.042969 1108.644531 1349.820312 C 981.890625 1347.527344 866.394531 1332.207031 761.15625 1327.558594 C 639.144531 1323.105469 537.207031 1329.011719 446.695312 1360.289062 C 303.425781 1407.589844 207.507812 1511.898438 155.246094 1585.277344 C 101.070312 1661.339844 80.300781 1715.074219 66.21875 1712.007812 Z"
              />
            </g>
          </g>
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "15%" }}>
          <span style={{ fontFamily: "var(--font-pacifico), 'Pacifico', cursive", fontSize: "clamp(48px, 8vw, 100px)", color: "#fff", display: "block", textAlign: "center", padding: "0 24px" }}>
            What is Vendo?
          </span>
        </div>
      </div>

      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 6vw" }}>
        <p style={{ ...dmSans, fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 40, color: "#999", fontWeight: 700 }}>
          What Vendo
        </p>
        <p style={{ ...dmSans, fontSize: "clamp(17px, 2.8vw, 43px)", lineHeight: 1.3, textAlign: "center", maxWidth: 1000, margin: 0, fontWeight: 700 }}>
          {words.map((word, i) => (
            <Word key={i} word={word} index={i} total={words.length} progress={scrollYProgress} />
          ))}
        </p>
      </div>
    </section>
  )
}

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
const dmSans: CSSProperties = { fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }

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
          style={{ height: "100vh", background: "var(--sky-wash)" }}
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

        {/* ── Blue → white fade ────────────────────────────────────────── */}
        <div style={{ height: 160, background: "linear-gradient(to bottom, var(--sky-wash), #fff)" }} />

        {/* ── What Vendo ───────────────────────────────────────────────── */}
        <WhatVendo />

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
