import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "State 1676 - Strategy, Unity, and Harmony | Whiteout Survival",
  description: "Join State 1676 in Whiteout Survival - Experience strategic gameplay, strong alliances, and coordinated events. Home to NAP4 alliances: TH3, ARC, PHW, and APX.",
  keywords: "Whiteout Survival, State 1676, NAP4, Alliance, Strategy Game, Gaming Community, TH3, ARC, PHW, APX",
  authors: [{ name: "State 1676 Community" }],
  openGraph: {
    title: "State 1676 - Strategy, Unity, and Harmony",
    description: "Join State 1676 in Whiteout Survival - Experience strategic gameplay, strong alliances, and coordinated events.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "State 1676 - Strategy, Unity, and Harmony",
    description: "Join State 1676 in Whiteout Survival - Experience strategic gameplay, strong alliances, and coordinated events.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
