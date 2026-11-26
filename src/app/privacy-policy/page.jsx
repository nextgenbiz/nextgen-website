import LegalPage from "@/components/legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy | NextGen Business Consultancy India",
  description:
    "Explore how NextGen Business Consultancy collects, uses, stores, and protects your personal data in compliance with Indian laws and industry best practices.",
  alternates: { canonical: `${SITE.url}/privacy-policy` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy | NextGen Business Consultancy",
    description: "Understand how your personal information is handled, protected, and used responsibly by NextGen Business Consultancy.",
    url: `${SITE.url}/privacy-policy`,
    siteName: "NextGen Business Consultancy",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | NextGen Business Consultancy",
    description: "Learn how NextGen Business Consultancy safeguards your personal data and privacy.",
  },
};

const sections = [
  {
    heading: "Information We Collect",
    blocks: [
      { type: "p", text: "We may collect your name, contact details, and browsing data when you interact with our website or services." },
    ],
  },
  {
    heading: "How We Use Your Information",
    blocks: [
      { type: "p", text: "Your information is used to:" },
      {
        type: "ul",
        items: [
          "Provide and improve our services",
          "Process payments securely",
          "Send important service updates",
          "Fulfill legal and regulatory requirements",
        ],
      },
    ],
  },
  {
    heading: "How We Protect Your Data",
    blocks: [
      {
        type: "ul",
        items: [
          "We store personal information securely and adopt industry-standard security measures.",
          "Unauthorized access, disclosure, or misuse of data is actively prevented through technical and administrative safeguards.",
        ],
      },
    ],
  },
  {
    heading: "Sharing of Information",
    blocks: [
      {
        type: "ul",
        items: [
          "We do not sell or trade your personal information.",
          "Limited sharing may occur with trusted third parties (such as payment gateways, government portals, or service execution partners) only when necessary to complete your requested service.",
        ],
      },
    ],
  },
  {
    heading: "Cookies & Tracking",
    blocks: [
      {
        type: "p",
        text: "Our website may use cookies and tracking technologies to enhance user experience and analyze traffic. You may choose to disable cookies in your browser settings.",
      },
    ],
  },
  {
    heading: "Your Rights",
    blocks: [
      {
        type: "ul",
        items: [
          "Request access to the personal information we hold about you",
          "Correct inaccurate details",
          "Request deletion of your data, subject to applicable laws",
        ],
      },
    ],
  },
  {
    heading: "Legal Jurisdiction",
    blocks: [
      {
        type: "p",
        text: "All privacy-related matters are governed by the Information Technology Act, 2000 (as amended) and relevant Indian laws.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lead="We are committed to safeguarding your personal information and ensuring transparency in how we collect, use, and protect your data."
      updated="Last updated: 2025"
      crumb="Privacy Policy"
      docName="Privacy Policy"
      sections={sections}
    />
  );
}
