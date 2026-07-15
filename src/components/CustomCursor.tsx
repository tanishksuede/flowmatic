"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Fast follower for the dot (almost instant)
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3" });
    
    // Slower follower for the ring (creates the smooth trailing effect)
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const interactables = document.querySelectorAll("a, button, .interactive");
    
    const handleMouseEnter = () => {
      gsap.to(ring, { 
        scale: 1.5, 
        borderColor: "rgba(255,255,255,0.8)", 
        backgroundColor: "rgba(255,255,255,0.1)", 
        duration: 0.3, 
        ease: "power2.out" 
      });
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
    };
    
    const handleMouseLeave = () => {
      gsap.to(ring, { 
        scale: 1, 
        borderColor: "rgba(37,99,235,0.5)", 
        backgroundColor: "transparent", 
        duration: 0.3, 
        ease: "power2.out" 
      });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
    };

    // Very basic magnetic pull (shift center)
    const handleMagneticMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const relX = mouseEvent.clientX - rect.left - rect.width / 2;
      const relY = mouseEvent.clientY - rect.top - rect.height / 2;
      
      gsap.to(target, { x: relX * 0.2, y: relY * 0.2, duration: 0.3, ease: "power2.out" });
    };

    const handleMagneticLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    };

    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
      
      if (el.tagName.toLowerCase() === "button" || el.classList.contains("btn-outline")) {
        el.addEventListener("mousemove", handleMagneticMove);
        el.addEventListener("mouseleave", handleMagneticLeave);
      }
    });

    return () => {
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        if (el.tagName.toLowerCase() === "button" || el.classList.contains("btn-outline")) {
          el.removeEventListener("mousemove", handleMagneticMove);
          el.removeEventListener("mouseleave", handleMagneticLeave);
        }
      });
    };
  }, [pathname]);

  return (
    <>
      {/* The Trailing Ring */}
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-accent/50 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
      {/* The Fast Dot */}
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
    </>
  );
}
