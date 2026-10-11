import type { Metadata, Viewport } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const title = "TideSafe | King Tide Flood Risk Assessments for Newport Harbor Homes";
const description =
  "An 8-foot king tide could reach Newport Harbor on December 24. TideSafe surveys your bayfront property's elevations, finds where water will enter, and shows you how to protect your home. Assessments from $800.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  keywords: [
    "Newport Beach king tide",
    "Newport Harbor flood risk assessment",
    "bayfront elevation survey",
    "king tide flood protection",
    "Balboa Island flooding",
    "Kelvin wave sea level California",
  ],
  openGraph: {
    title: "Is your Newport Harbor home ready for an 8-foot king tide?",
    description,
    url: site.url,
    siteName: "TideSafe",
    images: [{ url: "/og.jpg", width: 1200, height: 675, alt: "Sandbag barrier holding back an 8-foot tide on Newport Harbor" }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#071a2c" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "TideSafe",
  url: site.url,
  telephone: site.phoneDisplay,
  email: site.email,
  image: `${site.url}/og.jpg`,
  logo: `${site.url}/logo.png`,
  description,
  founder: { "@type": "Person", name: site.founder },
  areaServed: { "@type": "City", name: "Newport Beach, CA" },
  makesOffer: [
    { "@type": "Offer", name: "Property Elevation Assessment", price: "800", priceCurrency: "USD" },
    { "@type": "Offer", name: "Certified Survey Elevation and Flood Risk Assessment", price: "3100", priceCurrency: "USD" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${sourceSerif.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
