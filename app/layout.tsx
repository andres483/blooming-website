import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blooming — Growth that matters.",
  description: "We help AI and technology companies build real traction in San Francisco — through events, community, and go-to-market strategy.",
  openGraph: {
    title: "Blooming — Growth that matters.",
    description: "We help AI and technology companies build real traction in San Francisco.",
    url: "https://weareblooming.co",
    siteName: "Blooming",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-cream text-negro antialiased">{children}</body>
    </html>
  );
}
