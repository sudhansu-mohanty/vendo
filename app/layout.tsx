import type { Metadata } from "next";
import { Inter, Bowlby_One, DM_Sans, Pacifico } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PageTransitionProvider } from "@/components/ui/page-transition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "700"],
});

const bowlbyOne = Bowlby_One({
  subsets: ["latin"],
  variable: "--font-bowlby",
  weight: "400",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

const pacifico = Pacifico({
  subsets: ["latin"],
  variable: "--font-pacifico",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Vendo",
  description: "The Concordia student marketplace",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", inter.variable, bowlbyOne.variable, dmSans.variable, pacifico.variable)}
    >
      <body className="min-h-full flex flex-col">
        {/*
          Runs synchronously during HTML parsing — before React hydrates.
          Sets data-intro="1" on <html> so the FOUC-prevention CSS kicks in
          while the JS bundle loads. Removed in PageTransitionProvider's
          useLayoutEffect once the client takes over.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var dev=${process.env.NODE_ENV === "development" ? "true" : "false"};if(!window.matchMedia('(prefers-reduced-motion:reduce)').matches&&(dev||!sessionStorage.getItem('vendo-intro-seen'))){document.documentElement.setAttribute('data-intro','1')}}catch(e){}})()`,
          }}
        />
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
