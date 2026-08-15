"use client";

import { useEffect, useState } from "react";

// Mirrors Tailwind's default breakpoints so component internals can branch
// on the same thresholds consumers style against.
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

/** Returns whether the viewport is at or above the given breakpoint. */
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const query = `(min-width: ${BREAKPOINTS[breakpoint]}px)`;
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", listener);
    setMatches(mql.matches);
    return () => mql.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
