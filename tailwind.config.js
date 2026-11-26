/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Nextgen brand palette (Brand Guidelines v1.0, Nov 2026)
        impact: {
          DEFAULT: "#0F42C0", // Impact Blue: primary, leads
          50: "#EEF3FD",
          100: "#DCE6FB",
          600: "#0C3699",
          700: "#092B7A",
        },
        champion: {
          DEFAULT: "#101D32", // Champion Blue: grounds layouts, carries text
          800: "#16263F",
          700: "#1E3150",
          600: "#2B4166",
        },
        heaven: {
          DEFAULT: "#7A9FF9", // Heavenly Blue: accent, never body text on white
          200: "#C7D7FC",
          100: "#E3EBFE",
        },
        surface: "#F4F6FA",
        line: "#E3E8F0",
        mute: "#5B6B85", // grey-blue for captions
      },
      fontFamily: {
        // Body / UI: stand-in until the other Gilroy weights are available.
        // (Don't list "Gilroy" here: the loaded face only has weight 800 and would be matched for body text.)
        sans: ["var(--font-standin)", "Arial", "Helvetica", "sans-serif"],
        // Headlines + key numbers: Gilroy ExtraBold (800).
        display: ["var(--font-display)", "var(--font-standin)", "Arial", "Helvetica", "sans-serif"],
      },
      fontSize: {
        // Website type scale from the brand guideline (desktop / mobile)
        h1: ["clamp(2.25rem, 1.4rem + 3.4vw, 3.5rem)", { lineHeight: "1.1", fontWeight: "800" }],
        h2: ["clamp(1.75rem, 1.2rem + 2.2vw, 2.5rem)", { lineHeight: "1.15", fontWeight: "700" }],
        h3: ["clamp(1.375rem, 1.1rem + 1vw, 1.75rem)", { lineHeight: "1.2", fontWeight: "600" }],
        h4: ["clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)", { lineHeight: "1.3", fontWeight: "600" }],
        stat: ["clamp(2rem, 1.4rem + 2.4vw, 3rem)", { lineHeight: "1", fontWeight: "800" }],
      },
      maxWidth: { content: "76rem" },
      boxShadow: {
        card: "0 1px 2px rgba(16,29,50,.04), 0 8px 24px -12px rgba(16,29,50,.12)",
        lift: "0 2px 4px rgba(16,29,50,.06), 0 18px 40px -16px rgba(16,29,50,.22)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        rise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
        ring: {
          "0%": { transform: "scale(1)", opacity: ".45" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 50s linear infinite",
        rise: "rise .6s cubic-bezier(.2,.7,.2,1) both",
        ring: "ring 2.4s ease-out infinite",
      },
    },
  },
  // .container is defined in globals.css (one fixed 80rem width that .edge-pad lines up with)
  corePlugins: { container: false },
  plugins: [],
};
