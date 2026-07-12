"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // QuickSetter for high-performance GSAP updates
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      // Lerp effect is handled by quickTo's duration/ease
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Add magnetic pull to buttons and scaling
    const interactables = document.querySelectorAll("a, button, .interactive");
    
    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      
      if (target.classList.contains("hero-headline")) {
        gsap.to(cursor, { scale: 4, filter: "blur(2px)", rotation: 45, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: "power2.out", mixBlendMode: "difference" });
      }
    };
    
    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, filter: "blur(0px)", rotation: 0, duration: 0.3, ease: "power2.out", mixBlendMode: "normal" });
    };

    // Very basic magnetic pull (shift center)
    const handleMagneticMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const relX = mouseEvent.clientX - rect.left - rect.width / 2;
      const relY = mouseEvent.clientY - rect.top - rect.height / 2;
      
      // Move target slightly towards mouse
      gsap.to(target, {
        x: relX * 0.2,
        y: relY * 0.2,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMagneticLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    };

    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
      
      // Only apply magnetic pull to specific buttons, not standard text links
      if (el.classList.contains("btn-outline") || el.tagName.toLowerCase() === "button") {
        el.addEventListener("mousemove", handleMagneticMove);
        el.addEventListener("mouseleave", handleMagneticLeave);
      }
    });

    return () => {
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        if (el.classList.contains("btn-outline") || el.tagName.toLowerCase() === "button") {
          el.removeEventListener("mousemove", handleMagneticMove);
          el.removeEventListener("mouseleave", handleMagneticLeave);
        }
      });
    };
  }, [pathname]);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-5 h-5 bg-accent rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center"
      style={{ mixBlendMode: "normal" }}
    />
  );
}
