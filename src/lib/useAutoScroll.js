"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Endless, slowly drifting horizontal scroller.
 *
 * The scroller (`ref`) holds several identical copies of its items; the first copy (`loopRef`) is one full "loop".
 * Every frame we advance scrollLeft, and wrap by exactly one loop width so the motion never jumps. It is still a
 * normal scroll container, so swiping, trackpads and the arrow buttons keep working. It pauses while the mouse is
 * over it, while something inside has keyboard focus or a video is playing, while a finger is down, and for a
 * moment after any manual scroll. Visitors who prefer reduced motion get no auto-scroll (manual only).
 *
 * Returns `nudge(dir)` for the prev/next buttons.
 */
export default function useAutoScroll({ speed = 36 } = {}) {
  const ref = useRef(null);
  const loopRef = useRef(null);
  const state = useRef({ hover: false, focus: false, touch: false, holdUntil: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const s = state.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let last = 0;
    let pos = el.scrollLeft;
    let lastSet = pos;

    const hold = (ms = 2500) => {
      s.holdUntil = performance.now() + ms;
    };
    const onEnter = (e) => { if (e.pointerType === "mouse") s.hover = true; };
    const onLeave = (e) => { if (e.pointerType === "mouse") s.hover = false; };
    const onDown = (e) => { if (e.pointerType !== "mouse") s.touch = true; };
    const onUp = () => { if (s.touch) { s.touch = false; hold(); } };
    const onFocusIn = () => { s.focus = true; };
    const onFocusOut = () => { s.focus = false; };
    const onWheel = () => hold(1500);

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    el.addEventListener("wheel", onWheel, { passive: true });

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(now - (last || now), 64);
      last = now;
      const loop = loopRef.current?.offsetWidth || 0;
      const busy =
        reduce.matches || document.hidden || s.hover || s.focus || s.touch || now < s.holdUntil || !!el.querySelector("iframe");
      if (busy || !loop) {
        pos = el.scrollLeft; // follow whatever the visitor did
        lastSet = pos;
        // manual scrolling past the first copy: wrap silently (the copies are identical)
        if (loop && pos >= loop * 2) { pos -= loop; el.scrollLeft = pos; lastSet = pos; }
        return;
      }
      // something other than us moved it (scrollbar drag, keyboard, script): treat as manual, pause briefly
      if (Math.abs(el.scrollLeft - lastSet) > 3) {
        pos = el.scrollLeft;
        lastSet = pos;
        hold(2000);
        return;
      }
      pos += (speed * dt) / 1000;
      if (pos >= loop) pos -= loop;
      el.scrollLeft = pos;
      lastSet = el.scrollLeft;
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
      el.removeEventListener("wheel", onWheel);
    };
  }, [speed]);

  const nudge = useCallback((dir, amount = 360) => {
    const el = ref.current;
    if (!el) return;
    state.current.holdUntil = performance.now() + 2500;
    const loop = loopRef.current?.offsetWidth || 0;
    // going back from the very start: jump (invisibly) one loop forward first, so "previous" never dead-ends
    if (dir < 0 && loop && el.scrollLeft < amount) el.scrollLeft += loop;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  return { ref, loopRef, nudge };
}
