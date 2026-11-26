import LegalPage from "@/components/legal/LegalPage";
import { SITE } from "@/lib/site";

// Wording is carried over from the previous site. Review items flagged in the handover notes
// (the "Applicability" list is empty in the source text).

export const metadata = {
  title: "Terms & Conditions | NextGen Business Consultancy India",
  description:
    "Read the official Terms & Conditions of NextGen Business Consultancy. Understand service usage, legal obligations, limitations of liability, refunds, and governing laws applicable in India.",
  alternates: { canonical: `${SITE.url}/terms-condition` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Terms & Conditions | NextGen Business Consultancy",
    description: "Official Terms and Conditions governing the use of services provided by NextGen Business Consultancy.",
    url: `${SITE.url}/terms-condition`,
    siteName: "NextGen Business Consultancy",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | NextGen Business Consultancy",
    description: "Official Terms and Conditions of NextGen Business Consultancy.",
  },
};

const sections = [
  {
    heading: "Purpose",
    blocks: [{ type: "p", text: "By using our website, you agree to act in accordance with the following terms:" }],
  },
  {
    heading: "Applicability",
    blocks: [{ type: "p", text: "We shall be entitled to use your user information for the following purposes:" }],
  },
  {
    heading: "Scope of Services",
    blocks: [
      {
        type: "p",
        text: "We provide business consultancy and advisory services, as listed on our website or mutually agreed in writing.",
      },
    ],
  },
  {
    heading: "User Responsibilities",
    blocks: [
      {
        type: "ul",
        items: [
          "Provide accurate and complete information at all times.",
          "Comply with applicable laws and avoid misuse of our website or services.",
        ],
      },
    ],
  },
  {
    heading: "Intellectual Property",
    blocks: [
      {
        type: "p",
        text: "All website content, including text, graphics, designs, and logos, belongs exclusively to NEXT-GEN BUSINESS CONSULTANCY PRIVATE LIMITED.",
      },
      { type: "p", text: "No material may be copied, modified, or reproduced without prior written permission." },
    ],
  },
  {
    heading: "Limitation of Liability",
    blocks: [
      {
        type: "p",
        text: "We are not liable for indirect or consequential damages, technical issues, or actions of third parties beyond our control.",
      },
    ],
  },
  {
    heading: "Termination of Services",
    blocks: [
      {
        type: "p",
        text: "We reserve the right to suspend or terminate services/accounts in case of misuse, policy violations, or unlawful activities.",
      },
    ],
  },
  {
    heading: "Governing Law & Jurisdiction",
    blocks: [
      { type: "p", text: "These Terms shall be governed by the laws of India." },
      { type: "p", text: "Any disputes shall be subject to the exclusive jurisdiction of the courts of Ahmedabad, Gujarat, India." },
    ],
  },
  {
    heading: "Our Commitment",
    blocks: [
      {
        type: "p",
        text: 'At NEXT-GEN BUSINESS CONSULTANCY PRIVATE LIMITED ("Company," "we," "our," or "us"), we are committed to maintaining transparency and fairness in all our dealings with clients, visitors, and stakeholders. The following policies explain how we manage Refunds & Cancellations, how we protect your Privacy, the Terms & Conditions of using our website and services, and our Pricing Disclosure practices.',
      },
      { type: "p", text: "By accessing or using our website, you agree to these policies in full." },
    ],
  },
  {
    heading: "Refund & Cancellation Policy",
    blocks: [
      { type: "p", text: "We value the trust you place in us and aim to ensure a smooth and fair process in case of refunds or cancellations." },
      { type: "h3", text: "Eligibility for Refunds" },
      {
        type: "p",
        text: "Refunds are only processed after a thorough review and assessment of the service in question. Eligibility will depend on the terms stated in signed documents such as Agreements, Undertakings, or any other binding contracts between the Service Provider and the Service Receiver.",
      },
      { type: "h3", text: "Non-Refundable Services" },
      { type: "p", text: "Please note that some services cannot be refunded. These include, but are not limited to:" },
      { type: "ul", items: ["Application filing charges", "Statutory/government fees"] },
      { type: "h3", text: "Cancellation by Customer" },
      {
        type: "ul",
        items: [
          "If you wish to cancel a service, you must submit your request in writing before the service begins.",
          "Once a service has started, no refund or cancellation will be possible.",
        ],
      },
      { type: "h3", text: "Cancellation by Company" },
      {
        type: "p",
        text: "If we are required to cancel a service due to internal or unavoidable circumstances, you will receive a full refund for the amount paid.",
      },
      { type: "h3", text: "Processing Timelines" },
      { type: "p", text: "Approved refunds will be credited to the original mode of payment within 45 working days." },
    ],
  },
  {
    heading: "Pricing Disclosure",
    blocks: [
      { type: "p", text: "To maintain complete transparency with our clients:" },
      {
        type: "ul",
        items: [
          "All prices are displayed in Indian Rupees (INR, ₹).",
          "Prices will clearly mention whether they are inclusive or exclusive of GST and other applicable taxes.",
          'All payments for our services must be made exclusively in the name of one of the following entities: NEXT-GEN BUSINESS CONSULTANCY PRIVATE LIMITED. Payments are to be made only to designated "Current Accounts" via NEFT, IMPS, RTGS, or through authorized digital payment gateways such as Cash Free, Razorpay, or Aggrepay. We do not accept any payments into personal accounts or under any other name.',
          "Any additional government fees or statutory charges will be communicated separately and transparently.",
          "Prices shall be determined on a case-to-case and service-specific basis; therefore, standardized pricing will not be published on the website.",
        ],
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lead="Our Terms of Service outline the rules and guidelines for using our platform, ensuring a safe, transparent, and reliable experience for all users."
      updated="Last updated: 2025"
      crumb="Terms of Service"
      docName="Terms of Service"
      sections={sections}
    />
  );
}
