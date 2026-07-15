"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CASE_STUDIES } from "../../data/caseStudies";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLElement>(null);
  const caseStudiesWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // BATCH REVEALS
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

      // ANIMATION 7: CASE STUDIES HORIZONTAL SCROLL
      if (caseStudiesRef.current && caseStudiesWrapperRef.current) {
        const wrapper = caseStudiesWrapperRef.current;
        
        const getScrollAmount = () => {
          const scrollWidth = wrapper.scrollWidth;
          // Add enough padding so the last card completely clears the right edge of the screen
          return -(scrollWidth - window.innerWidth + 400);
        };

        const tween = gsap.to(wrapper, {
          x: getScrollAmount,
          ease: "none"
        });

        ScrollTrigger.create({
          trigger: caseStudiesRef.current,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true,
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black pt-32">
      <Navbar />

      <main className="w-full">
        {/* ==========================================
            1. MINI CASE STUDIES
        ========================================== */}
        <section className="w-full py-16 bg-[#050505]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="flex flex-col items-center text-center mb-16 reveal-item">
              <span className="section-label mb-4">Proven ROI</span>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-2xl">
                We turn operational bottlenecks into invisible, automated systems.
              </h1>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                {
                  industry: "Lead Gen Agency",
                  problem: "Account executives spent 15 hours/week manually enriching prospect lists, resulting in delayed follow-ups and lost deals.",
                  solution: "Deployed an n8n webhook that catches new Apollo prospects, triggers OpenAI to summarize the prospect's recent company news, and pushes personalized icebreakers to HubSpot & Slack instantly.",
                  outcome: "35% Increase in Meeting Bookings",
                  time: "15 Hours Saved / Week",
                  tools: ["n8n", "OpenAI", "HubSpot", "Slack"]
                },
                {
                  industry: "Marketing Agency",
                  problem: "Account managers wasted 3 days at the end of every month manually pulling ad metrics for client reports.",
                  solution: "Built a scheduled workflow that extracts Meta & Google Ad data, generates a plain-English AI performance summary, and auto-drafts the email.",
                  outcome: "100% Elimination of Reporting Time",
                  time: "24 Hours Saved / Month",
                  tools: ["Meta Ads", "Google Ads", "Claude AI", "Gmail"]
                }
              ].map((study, i) => (
                <div key={i} className="glass-card p-8 md:p-10 flex flex-col gap-8 reveal-item hover:border-accent/40 transition-colors">
                  <div className="flex justify-between items-start">
                    <span className="text-accent text-sm font-semibold tracking-wider uppercase bg-accent/10 px-3 py-1 rounded-full">{study.industry}</span>
                  </div>
                  
                  <div className="flex flex-col gap-6">
                    <div>
                      <span className="text-body text-xs uppercase tracking-wider mb-2 block">The Problem</span>
                      <p className="text-white/90 leading-relaxed">{study.problem}</p>
                    </div>
                    <div>
                      <span className="text-body text-xs uppercase tracking-wider mb-2 block">The Automation</span>
                      <p className="text-white/90 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                    <div className="flex flex-col">
                      <span className="text-body text-xs uppercase tracking-wider mb-1 block">Outcome</span>
                      <span className="text-white font-semibold">{study.outcome}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-body text-xs uppercase tracking-wider mb-1 block">Time Saved</span>
                      <span className="text-white font-semibold">{study.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {study.tools.map(t => (
                      <span key={t} className="text-xs font-medium text-body bg-white/5 border border-white/10 px-2 py-1 rounded-md">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            2. TESTIMONIALS
        ========================================== */}
        <section className="w-full bg-black py-24 border-y border-white/5">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-panel p-10 flex flex-col gap-6 reveal-item relative">
                <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5" />
                <p className="text-xl text-white/90 leading-relaxed italic relative z-10">
                  &quot;Flowmatic didn&apos;t just give us software; they completely rebuilt how we operate. We used to drown in data entry and manual follow-ups. Now, our systems run on autopilot and our team focuses entirely on strategy.&quot;
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center border border-accent/50 text-accent font-bold">JD</div>
                  <div className="flex flex-col">
                    <span className="text-white font-semibold">James Davies</span>
                    <span className="text-body text-sm">Founder, Elevate Marketing</span>
                  </div>
                </div>
              </div>
              <div className="glass-panel p-10 flex flex-col gap-6 reveal-item relative">
                <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5" />
                <p className="text-xl text-white/90 leading-relaxed italic relative z-10">
                  &quot;The ROI was obvious within the first month. The custom lead enrichment workflow they built saves my SDRs 15 hours a week and our response times dropped from hours to literally seconds.&quot;
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/50 text-purple-400 font-bold">SC</div>
                  <div className="flex flex-col">
                    <span className="text-white font-semibold">Sarah Chen</span>
                    <span className="text-body text-sm">VP Operations, Nexus Growth Agency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            3. CASE STUDIES (HORIZ SCROLL)
        ========================================== */}
        <section id="work" ref={caseStudiesRef} className="w-full h-[80vh] md:h-screen bg-[#0A0A0A] flex items-center overflow-hidden">
          <div className="px-6 md:px-10 shrink-0 w-[80vw] md:w-[400px]">
            <h2 className="text-[40px] md:text-[60px] leading-none mb-4">SYSTEM<br/>DEPLOYMENTS</h2>
            <p className="text-body mb-8">Scroll to explore recent automated pipelines.</p>
            <a href="/analytics.pdf" download className="btn-outline interactive inline-block text-sm border-text-base">
              DOWNLOAD SAMPLE REPORT
            </a>
          </div>
          
          <div ref={caseStudiesWrapperRef} className="flex gap-6 md:gap-10 px-6 md:px-10 h-[50vh] md:h-[60vh] min-h-[400px] pl-[50px] md:pl-[100px]" style={{ willChange: "transform" }}>
            {CASE_STUDIES.map((cs, i) => (
              <div key={i} className="group w-[80vw] md:w-[600px] h-full bg-[#050505] border border-muted hover:border-accent transition-colors duration-300 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shrink-0">
                <div className="flex justify-between items-start">
                  <span className="section-label text-body">{cs.ind}</span>
                  <div className="w-4 h-4 bg-muted group-hover:bg-accent transition-colors duration-300" />
                </div>
                
                <div>
                  <h3 className="text-[50px] leading-none mb-6 group-hover:text-accent transition-colors duration-300">{cs.res}</h3>
                  <p className="text-body mb-8 text-lg">{cs.title}</p>
                  <Link 
                    href={`/blueprint/${i}`}
                    className="uppercase font-bold tracking-widest text-sm border-b border-text-base pb-1 interactive hover:text-accent transition-colors duration-300 w-fit"
                  >
                    View Architecture
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
