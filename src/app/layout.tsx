import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/ui";
import { company } from "@/data/company";
import "./globals.css";
const sans = localFont({
  src: "../../public/fonts/dm-sans-latin.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 1000",
});
const serif = localFont({
  src: "../../public/fonts/newsreader-italic-latin.woff2",
  variable: "--font-serif",
  display: "swap",
  style: "italic",
  weight: "200 800",
});
export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: "PM Industries | Heat Shrinkable Cable Accessories",
    template: "%s | PM Industries",
  },
  description:
    "Heat shrinkable cable terminations, straight-through joints, molded components and polymer insulators. Manufactured in Solapur since 2011.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${serif.variable}`}>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": company.url + "/#organization",
            name: company.name,
            url: company.url,
            foundingDate: company.established,
            telephone: company.phone,
            email: company.emails[0],
            address: {
              "@type": "PostalAddress",
              streetAddress:
                company.address.line1 + ", " + company.address.line2,
              addressLocality: "Solapur",
              addressRegion: "Maharashtra",
              postalCode: "413003",
              addressCountry: "IN",
            },
          }}
        />
      </body>
    </html>
  );
}
