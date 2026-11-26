# Fonts

**Gilroy ExtraBold (800)** is loaded from `Gilroy-ExtraBold.woff2` in `src/app/layout.jsx` and drives the
headlines (H1, H2) and key numbers, as the brand guideline specifies for those roles.

It was converted from the supplied `Gilroy-ExtraBold.otf` to WOFF2 (format conversion only; outlines are
untouched). The Gilroy free licence (`Gilroy-EULA.pdf`, clause h) allows web use via @font-face and forbids
modifying the font, so do not edit or synthesise weights.

## Still on a stand-in
The free pack only included ExtraBold and Light. The guideline's other web weights are not available, so body
text, navigation, buttons and card titles use **Figtree** as a stand-in:

| Weight | Role in the guideline |
| --- | --- |
| 400 Regular | body, forms, captions |
| 500 Medium | navigation, buttons, labels |
| 600 SemiBold | H3/H4, card titles, eyebrows |
| 700 Bold | section headings |

To go fully Gilroy, add those four `.woff2` files here, declare them with `localFont` in `layout.jsx`
(`src: [{ path, weight }, ...]`) and point `fontFamily.sans` in `tailwind.config.js` at that variable.
(Gilroy Light 300 is only for large decorative text per the guideline, so it is not loaded.)
