import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";
import WhatsappButton from "@/components/whatsapp-button";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import PageFlowPath from "@/components/page-flow-path";
import { COMPANY, SOCIAL_LINKS, GEO_COORDS, FAQS } from "@/lib/site-data";
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
    "Global shipping & freight solutions across 220+ countries. Air express, air freight, sea freight, customs clearance — end-to-end logistics support.",
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
    "logistics company India",
    "freight forwarding Vapi Gujarat",
    "international courier services",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${COMPANY.name} — Global Logistics. Simplified.`,
    description: "Global shipping & freight solutions across 220+ countries. Air express, air freight, sea freight, customs clearance — end-to-end logistics support.",
    url: "https://www.squareworldlogistics.com",
    siteName: COMPANY.name,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: `${COMPANY.name} — Global Logistics Provider`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} — Global Logistics. Simplified.`,
    description: "Global shipping & freight solutions across 220+ countries. Air express, air freight, sea freight, customs clearance — end-to-end logistics support.",
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

/* ── Structured Data (JSON-LD) ──────────────────── */

function getOrganizationSchema() {
  const socialLinks = Object.values(SOCIAL_LINKS).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    url: "https://www.squareworldlogistics.com",
    logo: "https://www.squareworldlogistics.com/logo.png",
    description: "Global logistics and freight forwarding provider offering air express, air freight, sea freight, customs clearance, and customized logistics solutions across 220+ countries.",
    foundingDate: "2023",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY.phone,
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "C-16, M-CUBE THE BUSINESS HUB, N H NO.48, SERVICE ROAD",
      addressLocality: "Vapi",
      addressRegion: "Gujarat",
      postalCode: "396191",
      addressCountry: "IN",
    },
    sameAs: socialLinks,
  };
}

function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.squareworldlogistics.com/#localbusiness",
    name: COMPANY.name,
    image: "https://www.squareworldlogistics.com/logo.png",
    url: "https://www.squareworldlogistics.com",
    telephone: COMPANY.phone,
    email: COMPANY.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "C-16, M-CUBE THE BUSINESS HUB, N H NO.48, SERVICE ROAD, OPP. TALUKA SEVA SADAN, BALITHA",
      addressLocality: "Vapi",
      addressRegion: "Gujarat",
      postalCode: "396191",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO_COORDS.latitude,
      longitude: GEO_COORDS.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "18:00",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: GEO_COORDS.latitude,
        longitude: GEO_COORDS.longitude,
      },
      geoRadius: "50000",
    },
  };
}

function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY.name,
    url: "https://www.squareworldlogistics.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.squareworldlogistics.com/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemas = [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getWebSiteSchema(),
    getFAQSchema(),
  ];

  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${inter.variable}`}
    >
      <head>
        {/* Google Analytics 4 — Replace G-XXXXXXXXXX with your actual Measurement ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        /> */}

        {/* Structured Data — JSON-LD */}
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body>
        <SmoothScroll />
        <WhatsappButton />
        <ScrollToTopButton />
        <Navbar />
        <PageFlowPath />
        <main id="main-content" role="main" style={{ flex: 1, paddingTop: "88px" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
