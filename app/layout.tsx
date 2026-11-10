import type { Metadata } from "next";
import { Inter, Bowlby_One } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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

export const metadata: Metadata = {
  title: "Vendo",
  description: "The Concordia student marketplace",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", inter.variable, bowlbyOne.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
