"use client";

import dynamic from "next/dynamic";

// The funding-finder chatbot is large; load it after the page is interactive.
const FundingChatbot = dynamic(() => import("./FundingChatbot"), { ssr: false });

export default function ChatbotLoader() {
  return <FundingChatbot />;
}
