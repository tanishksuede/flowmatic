"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "work" },
    { name: "Services", href: "services" },
    { name: "About", href: "about" },
    { name: "Contact", href: "contact" },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header 
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
        scrolled 
          ? "bg-bg-base/80 backdrop-blur-md border-b border-muted py-4" 
          : "bg-transparent border-b border-transparent py-6"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-10 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group interactive">
          <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-150 transition-transform duration-300" />
          <span className="font-heading text-2xl font-black uppercase tracking-tighter text-text-base">
            FLOWMATIC
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-[13px] font-bold text-text-base uppercase tracking-widest hover:text-accent transition-colors interactive"
            >
              {link.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
