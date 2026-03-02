import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const displayFont = DM_Serif_Display({
  variable: "--font-display-family",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Outfit({
  variable: "--font-body-family",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Klysera Skill Bank",
    template: "%s | Klysera Skill Bank",
  },
  description:
    "A curated catalog of AI-native engineering skills, mapped to roles and tasks.",
  icons: {
    icon: "/klysera.svg",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://skills.klysera.com"
  ),
  openGraph: {
    title: "Klysera Skill Bank",
    description:
      "A curated catalog of AI-native engineering skills, mapped to roles and tasks.",
    siteName: "Klysera Skill Bank",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klysera Skill Bank",
    description:
      "A curated catalog of AI-native engineering skills, mapped to roles and tasks.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
