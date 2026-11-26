"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import ContactUs from "./ContactUs";

const ContactModalContext = createContext({ open: () => {}, close: () => {} });

export function useContactModal() {
  return useContext(ContactModalContext);
}

/** Wrap the app once; any client component can call useContactModal().open("Service name"). */
export default function ContactModalProvider({ children }) {
  const [state, setState] = useState({ isOpen: false, service: "" });

  const open = useCallback((service = "") => setState({ isOpen: true, service }), []);
  const close = useCallback(() => setState((s) => ({ ...s, isOpen: false })), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      {state.isOpen && <ContactUs onClose={close} selectedService={state.service} />}
    </ContactModalContext.Provider>
  );
}
