"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".reveal-item", {
        onEnter: (elements) => {
          gsap.to(elements, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.12,
          });
        },
        once: true,
      });

      gsap.set(".reveal-item", { autoAlpha: 0, y: 40 });
      
      // Animate the text sweeps
      gsap.utils.toArray<HTMLElement>('.about-text').forEach((element) => {
        ScrollTrigger.create({
          trigger: element,
          start: "top 80%",
          onEnter: () => {
            gsap.to(element, { opacity: 1, duration: 0.5 });
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-[#0A0A0A] pt-32 min-h-screen">
      <Navbar />

      <main className="w-full pb-32">
        <section className="w-full px-6 md:px-10 overflow-hidden relative max-w-[1440px] mx-auto mt-20">
          <div className="flex flex-col lg:flex-row gap-0 relative">
            
            {/* Left Column */}
            <div className="lg:w-1/3 md:pr-10 lg:pr-24 mb-12 lg:mb-0 reveal-item">
              <div className="lg:sticky top-1/3 overflow-hidden py-4">
                <span className="section-label mb-4 text-accent">About Flowmatic</span>
                <h1 className="text-[60px] md:text-[80px] text-hollow leading-none origin-bottom-left font-black tracking-tighter">
                  WHO WE <br /> ARE
                </h1>
              </div>
            </div>
            
            {/* Center Timeline Track (Desktop Only) */}
            <div className="hidden lg:block absolute left-1/3 top-0 bottom-0 w-[1px] bg-white/10 z-0 reveal-item">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-[3px] h-32 bg-accent shadow-[0_0_20px_#2563EB] z-10 animate-pulse" />
            </div>

            {/* Right Column */}
            <div className="lg:w-2/3 flex flex-col relative border-t lg:border-t-0 border-white/10 pl-0 lg:pl-16">
              {[
                { 
                  num: "SYS.01",
                  title: "Engineered for Scale", 
                  desc: "Flowmatic is a technical, builder-first automation agency. We don't sell generic advice, empty consulting hours, or fluffy marketing strategies. We build engines." 
                },
                { 
                  num: "SYS.02",
                  title: "Our Philosophy", 
                  desc: "We are engineers, system architects, and growth strategists. Our team focuses strictly on what works: deploying raw, uncompromised automation that directly impacts your bottom line. We learn by doing, and we only deploy battle-tested pipelines." 
                },
                { 
                  num: "SYS.03",
                  title: "Why We Do This", 
                  desc: "We noticed agency owners losing countless hours to manual reporting, slow lead follow-ups, and tedious onboarding data entry. We engineer systems to eliminate those bottlenecks entirely, so you can stop doing administrative work and focus purely on closing deals." 
                }
              ].map((item, i) => (
                <div key={i} className="about-text group flex flex-col md:flex-row gap-8 lg:gap-16 opacity-0 py-16 border-b border-white/10 transition-colors duration-500 relative overflow-hidden cursor-pointer">
                  {/* Hover Background Sweep */}
                  <div className="absolute left-0 top-0 w-0 h-full bg-white/5 group-hover:w-[120%] -translate-x-[10%] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                  
                  <span className="font-heading text-xl text-accent w-24 shrink-0 transform group-hover:translate-x-4 transition-transform duration-500 ease-out z-10">{item.num}</span>
                  
                  <div className="flex flex-col gap-6 z-10">
                    <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tight uppercase transform group-hover:translate-x-4 transition-transform duration-500 delay-75 ease-out">{item.title}</h3>
                    <p className="text-white/70 text-lg leading-relaxed max-w-2xl transform group-hover:translate-x-4 transition-transform duration-500 delay-150 ease-out">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
