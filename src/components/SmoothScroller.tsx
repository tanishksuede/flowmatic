"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import gsap from "gsap";

export default function SmoothScroller({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Prevent GSAP lag spikes
    gsap.ticker.lagSmoothing(0);
  }, []);

  return (
    <ReactLenis root options={{ duration: 1.0, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
      {children}
    </ReactLenis>
  );
}
