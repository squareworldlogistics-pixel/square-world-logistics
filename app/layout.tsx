import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";
import WhatsappButton from "@/components/whatsapp-button";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import PageFlowPath from "@/components/page-flow-path";
import { COMPANY } from "@/lib/site-data";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  variable: "--font-dm-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.squareworldlogistics.com"),
  title: {
    default: `${COMPANY.name} — Global Logistics. Simplified.`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Reliable global shipping and freight solutions across 220+ countries. End-to-end logistics support including air express, air freight, sea freight, customs clearance, and tailor-made solutions.",
  keywords: [
    "logistics",
    "shipping",
    "freight",
    "air freight",
    "sea freight",
    "customs clearance",
    "international shipping",
    "Square World Logistics",
    "freight forwarding",
    "global shipping",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${COMPANY.name} — Global Logistics. Simplified.`,
    description: "Reliable global shipping and freight solutions across 220+ countries. End-to-end logistics support including air express, air freight, sea freight, customs clearance, and tailor-made solutions.",
    url: "https://www.squareworldlogistics.com",
    siteName: COMPANY.name,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: `${COMPANY.name} Logo`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} — Global Logistics. Simplified.`,
    description: "Reliable global shipping and freight solutions across 220+ countries. End-to-end logistics support including air express, air freight, sea freight, customs clearance, and tailor-made solutions.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${inter.variable}`}
    >
      <body>
        <SmoothScroll />
        <WhatsappButton />
        <ScrollToTopButton />
        <Navbar />
        <PageFlowPath />
        <main style={{ flex: 1, paddingTop: "88px" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
