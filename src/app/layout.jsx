import "./globals.css";
import Script from "next/script";
import { Figtree } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactModalProvider from "@/components/forms/ContactModalProvider";
import ChatbotLoader from "@/components/chatbot/ChatbotLoader";
import MobileActionBar from "@/components/layout/MobileActionBar";
import JsonLd from "@/components/seo/JsonLd";
import { PopClipDefs } from "@/components/illustrations/PeepScene";
import { SITE } from "@/lib/site";

// Brand display face: Gilroy ExtraBold (800) for headlines and key numbers, per the brand guideline.
// Only this weight was supplied, so body/UI text uses the stand-in below until the other Gilroy
// weights (Regular, Medium, SemiBold, Bold) are added. See src/app/fonts/README.md.
const gilroy = localFont({
  src: "./fonts/Gilroy-ExtraBold.woff2",
  weight: "800",
  style: "normal",
  display: "swap",
  variable: "--font-display",
});

// Stand-in for the remaining Gilroy weights.
const standIn = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-standin",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101D32",
};

const OG_IMAGE = `${SITE.url}/brand/og-image.png`;

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: "NEXT-GEN BUSINESS CONSULTANCY",
  description: SITE.description,
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE.url}/` },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Nextgen Business" },
  formatDetection: { telephone: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: "NEXT-GEN BUSINESS CONSULTANCY",
    description: SITE.description,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXT-GEN BUSINESS CONSULTANCY",
    description: SITE.description,
    images: [OG_IMAGE],
    creator: SITE.twitter,
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: "NEXT-GEN BUSINESS CONSULTANCY",
  alternateName: SITE.legalName,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/brand/logo.png`,
  description: SITE.description,
  sameAs: [
    SITE.socials.facebook,
    SITE.socials.linkedin,
    SITE.socials.instagram,
    "https://www.instagram.com/next_gen_business_consultancy/",
    SITE.socials.youtube,
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+919033149731",
      contactType: "customer service",
      email: SITE.email,
      areaServed: "IN",
      availableLanguage: ["en", "hi", "gu"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Drive in Road",
    addressLocality: "Ahmedabad",
    postalCode: "380051",
    addressCountry: "IN",
  },
};

const professionalServiceLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#professionalservice`,
  name: SITE.legalName,
  image: `${SITE.url}/brand/logo.png`,
  url: `${SITE.url}/`,
  description: SITE.description,
  telephone: "+919898298149",
  priceRange: "$$",
  address: organizationLd.address,
  geo: { "@type": "GeoCoordinates", latitude: 23.047053163750352, longitude: 72.52960824232856 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: organizationLd.sameAs,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Business Consultancy Services",
    itemListElement: [
      "Startup India Registration",
      "MSME Registration",
      "Tax Exemption Services",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${standIn.variable} ${gilroy.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <JsonLd data={organizationLd} />
        <JsonLd data={professionalServiceLd} />
      </head>
      <body>
        <PopClipDefs />
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-white px-5 py-3 font-semibold text-champion shadow-lift focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <ContactModalProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileActionBar />
          <ChatbotLoader />
        </ContactModalProvider>

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZPW2HYC5BE" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-ZPW2HYC5BE', { page_path: window.location.pathname });`}
        </Script>
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "t8xl6gfz2s");`}
        </Script>
      </body>
    </html>
  );
}
