"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { CheckCircle2, Star, ArrowRight, Bot, Workflow, MessageSquare, Database, Zap, Quote, Code, Unlock, BookOpen, Users, LifeBuoy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CASE_STUDIES } from "../data/caseStudies";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const caseStudiesRef = useRef<HTMLElement>(null);
  const caseStudiesWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ANIMATION 1: BATCH REVEALS
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

    // HERO PARALLAX REMOVED (Replaced by CSS animations in Enterprise Redesign)

    // ANIMATION 8: ABOUT SECTION
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      // 1. Title entry
      gsap.fromTo(".about-title", 
        { y: 150, opacity: 0, rotateZ: 5 }, 
        { y: 0, opacity: 1, rotateZ: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: aboutSection, start: "top 70%" } }
      );
      
      // 2. Center Pointer Animation
      gsap.fromTo(".about-pointer", 
        { top: "0%" },
        { 
          top: "100%", 
          ease: "none",
          scrollTrigger: {
            trigger: aboutSection,
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        }
      );

      // 4. Scrubbed entry for the text rows relative to the whole section
      const aboutTexts = gsap.utils.toArray(".about-text");
      aboutTexts.forEach((text: unknown, index: number) => {
        // Calculate dynamic start point based on index so they appear one by one as the pointer moves down
        const startPercentage = 30 + (index * 15); 
        
        gsap.fromTo(text as Element, 
          { x: 100, opacity: 0 }, 
          { 
            x: 0, 
            opacity: 1, 
            ease: "none",
            scrollTrigger: {
              trigger: aboutSection,
              start: `top ${100 - startPercentage}%`,
              end: `top ${85 - startPercentage}%`,
              scrub: 1,
            }
          }
        );
      });
    }

    // ANIMATION 7: CASE STUDIES HORIZONTAL SCROLL
    if (caseStudiesRef.current && caseStudiesWrapperRef.current) {
      const wrapper = caseStudiesWrapperRef.current;
      
      const getScrollAmount = () => {
        const totalWidth = wrapper.scrollWidth + wrapper.offsetLeft;
        // Provide a massive buffer (half the screen width) to guarantee the 3rd card is fully visible
        const padding = window.innerWidth * 0.5;
        return -(totalWidth - window.innerWidth + padding);
      };

      const tween = gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: caseStudiesRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });
    }

    // ANIMATION 9: GLOBAL WRENCH
    const wrenchTl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    wrenchTl
      .to(".global-wrench", { x: "-70vw", y: "20vh", rotateZ: -90, scale: 1.5, duration: 1 })
      .to(".global-wrench", { x: "-10vw", y: "40vh", rotateZ: 180, scale: 0.8, duration: 1 })
      .to(".global-wrench", { x: "-40vw", y: "60vh", rotateZ: 360, scale: 4, opacity: 0.1, duration: 1 })
      .to(".global-wrench", { x: "-40vw", y: "80vh", rotateZ: 720, scale: 1, opacity: 0.5, duration: 1 });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const scrollToContact = () => {
    const subject = encodeURIComponent("Booking a Strategy Call");
    const body = encodeURIComponent("Hi Flowmatic Team,\n\nI'd like to book a strategy call to discuss automating my business systems.\n\nMy website/business is: ");
    window.location.href = `mailto:hello@flowmatic.io?subject=${subject}&body=${body}`;
  };

  return (
    <div ref={containerRef} className="relative">
      {/* GLOBAL WRENCH */}
      <div className="global-wrench fixed top-32 right-10 md:right-20 z-[5] pointer-events-none text-accent/30 hidden md:block">
        <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      </div>

      <Navbar />

      <main className="w-full">
        {/* ==========================================
            2. HERO SECTION
        ========================================== */}
        <section ref={heroRef} className="relative w-full min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden">
          {/* Subtle Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/20 rounded-full blur-[120px] pointer-events-none opacity-50 z-0" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none z-0" />

          <div className="max-w-[1440px] mx-auto w-full px-6 md:px-10 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Messaging Hierarchy */}
            <div className="flex flex-col z-20 reveal-item">
              <span className="text-accent font-semibold tracking-[0.2em] text-xs uppercase mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-accent"></span>
                Custom AI Automation Agency
              </span>
              
              <h1 className="text-[48px] md:text-[64px] lg:text-[72px] font-semibold leading-[1.05] tracking-tight mb-8">
                Replace 20+ Hours of Weekly Operations with Custom AI Automation.
              </h1>
              
              <p className="text-lg md:text-xl text-body max-w-[560px] mb-10 leading-relaxed">
                We design and deploy AI-powered workflows that eliminate reporting, lead follow-ups, client onboarding, data entry, and repetitive operations for marketing agencies and growing businesses.
              </p>

              <div className="flex flex-col gap-4 mb-10">
                {[
                  "Save 10–30 hours every week",
                  "Deploy in 2–4 weeks",
                  "Works with your existing tools",
                  "No-code interface for your team"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <span className="text-text-base/90 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button onClick={scrollToContact} className="btn-primary flex items-center justify-center gap-2">
                  Book Free Automation Audit
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })} className="btn-secondary">
                  View Case Studies
                </button>
              </div>

              {/* Trust Signals */}
              <div className="pt-8 border-t border-white/10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-text-base/80">Trusted by growing agencies</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm font-medium text-body">
                  <div className="flex flex-col"><span className="text-white text-xl font-semibold">20+</span> Workflows Delivered</div>
                  <div className="flex flex-col"><span className="text-white text-xl font-semibold">98%</span> Client Satisfaction</div>
                  <div className="flex flex-col"><span className="text-white text-xl font-semibold">20hrs</span> Avg. Saved/Week</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Architecture Visualization */}
            <div className="hidden lg:flex relative w-full h-[700px] items-center justify-center pointer-events-none z-10 reveal-item">
              <div className="relative w-full max-w-[600px] h-full">
                
                {/* Central Orchestrator (n8n) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-panel p-6 flex flex-col items-center gap-3 z-30 shadow-[0_0_40px_rgba(47,107,255,0.2)] border-accent/30">
                  <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/50">
                    <Workflow className="w-8 h-8 text-accent" />
                  </div>
                  <span className="font-semibold text-white tracking-wide">Orchestrator Engine</span>
                  <div className="flex gap-1.5 items-center bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-xs text-green-400 font-medium">Processing 24/7</span>
                  </div>
                </div>

                {/* Top Node (Trigger / Webhook) */}
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 glass-card p-4 flex items-center gap-4 z-20">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-body uppercase tracking-wider">Trigger</span>
                    <span className="font-medium text-white">Lead Captured</span>
                  </div>
                </div>

                {/* Bottom Left Node (AI Processing / OpenAI) */}
                <div className="absolute bottom-[20%] left-[5%] glass-card p-4 flex items-center gap-4 z-20">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-body uppercase tracking-wider">AI Core</span>
                    <span className="font-medium text-white">Data Enrichment</span>
                  </div>
                </div>

                {/* Bottom Right Node (CRM / Slack) */}
                <div className="absolute bottom-[20%] right-[5%] glass-card p-4 flex items-center gap-4 z-20">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-body uppercase tracking-wider">Action</span>
                    <span className="font-medium text-white">Team Notified</span>
                  </div>
                </div>
                
                {/* Top Right Node (Database / Hubspot) */}
                <div className="absolute top-[25%] right-[0%] glass-card p-4 flex items-center gap-4 z-20">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Database className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-body uppercase tracking-wider">Sync</span>
                    <span className="font-medium text-white">CRM Updated</span>
                  </div>
                </div>

                {/* SVG Connecting Lines with glowing particles */}
                <svg className="absolute inset-0 w-full h-full z-10 opacity-40" style={{ filter: "drop-shadow(0 0 8px rgba(47,107,255,0.5))" }}>
                  {/* From Trigger down to Orchestrator */}
                  <path d="M300,140 L300,310" stroke="url(#blue-gradient)" strokeWidth="2" strokeDasharray="4 4" fill="none" className="animate-[dash_20s_linear_infinite]" />
                  {/* From Orchestrator to AI */}
                  <path d="M260,390 L130,510" stroke="url(#blue-gradient)" strokeWidth="2" strokeDasharray="4 4" fill="none" className="animate-[dash_20s_linear_infinite]" />
                  {/* From Orchestrator to Action */}
                  <path d="M340,390 L470,510" stroke="url(#blue-gradient)" strokeWidth="2" strokeDasharray="4 4" fill="none" className="animate-[dash_20s_linear_infinite]" />
                  {/* From Orchestrator to Sync */}
                  <path d="M340,310 L470,220" stroke="url(#blue-gradient)" strokeWidth="2" strokeDasharray="4 4" fill="none" className="animate-[dash_20s_linear_infinite]" />
                  
                  <defs>
                    <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2F6BFF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#2F6BFF" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>

                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes dash {
                    to {
                      stroke-dashoffset: -1000;
                    }
                  }
                `}} />

              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            3. TRUSTED BY LOGO STRIP
        ========================================== */}
        <section className="w-full bg-[#050505] py-10 border-b border-white/5">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold">Powering operations for industry leaders</span>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {["ACME CORP", "GLOBALTECH", "NEXUS", "ELEVATE", "QUANTUM"].map((logo) => (
                <span key={logo} className="font-heading font-bold text-xl md:text-2xl text-white tracking-widest">{logo}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            4. BUSINESS IMPACT METRICS
        ========================================== */}
        <section className="w-full bg-black py-24 border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: "50+", label: "Automations Delivered" },
              { stat: "1,200+", label: "Hours Saved / Month" },
              { stat: "14 Days", label: "Avg. Deployment Time" },
              { stat: "99.9%", label: "Workflow Reliability" }
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 flex flex-col items-center text-center gap-2 reveal-item">
                <span className="text-4xl md:text-5xl font-semibold text-white tracking-tight">{item.stat}</span>
                <span className="text-body text-sm uppercase tracking-wider">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            5. MINI CASE STUDIES
        ========================================== */}
        <section id="services" className="w-full py-24 md:py-32 bg-[#050505]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="flex flex-col items-center text-center mb-16 reveal-item">
              <span className="section-label mb-4">Proven ROI</span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl">
                We turn operational bottlenecks into invisible, automated systems.
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                {
                  industry: "B2B SaaS",
                  problem: "Sales reps spent 15 hours/week manually enriching leads, resulting in delayed follow-ups and lost deals.",
                  solution: "Deployed an n8n webhook that catches new signups, triggers OpenAI to summarize the prospect's company website, and pushes structured data to HubSpot & Slack instantly.",
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
            6. TESTIMONIALS
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
                    <span className="text-body text-sm">VP Operations, Nexus SaaS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            6.5. WHY CHOOSE FLOWMATIC
        ========================================== */}
        <section className="w-full py-24 md:py-32 bg-[#050505]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="flex flex-col items-center text-center mb-16 reveal-item">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                An enterprise-grade partnership.
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Code, title: "Custom-Built Systems", desc: "No cookie-cutter templates. We architect solutions specifically for your unique tech stack and operational bottlenecks." },
                { icon: Unlock, title: "No Vendor Lock-In", desc: "You own the infrastructure. We build on transparent platforms like n8n so you have full control over your data." },
                { icon: Zap, title: "Fast Deployment", desc: "We deploy MVPs in days, not months. You start seeing ROI and time savings almost immediately." },
                { icon: BookOpen, title: "Full Documentation", desc: "Every workflow comes with comprehensive technical documentation and a plain-English logic map." },
                { icon: Users, title: "Team Training", desc: "We don't just hand over the keys. We train your team on how to manage, monitor, and scale the automation." },
                { icon: LifeBuoy, title: "Ongoing Support", desc: "APIs change. Processes evolve. We provide ongoing maintenance to ensure 99.9% workflow reliability." }
              ].map((feature, i) => (
                <div key={i} className="p-8 border border-white/5 rounded-xl hover:bg-white/5 transition-colors reveal-item">
                  <feature.icon className="w-8 h-8 text-accent mb-6" />
                  <h3 className="text-xl text-white font-semibold mb-3">{feature.title}</h3>
                  <p className="text-body leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            7. CASE STUDIES (HORIZ SCROLL)
        ========================================== */}
        <section id="work" ref={caseStudiesRef} className="w-full h-[80vh] md:h-screen bg-[#0A0A0A] flex items-center overflow-hidden">
          <div className="px-6 md:px-10 shrink-0 w-[80vw] md:w-[400px]">
            <h2 className="text-[40px] md:text-[60px] leading-none mb-4">SYSTEM<br/>DEPLOYMENTS</h2>
            <p className="text-body mb-8">Scroll to explore recent automated pipelines.</p>
            <a href="/analytics.pdf" download className="btn-outline interactive inline-block text-sm border-text-base">
              DOWNLOAD SAMPLE REPORT
            </a>
          </div>
          
          <div ref={caseStudiesWrapperRef} className="flex gap-6 md:gap-10 px-6 md:px-10 h-[50vh] md:h-[60vh] min-h-[400px] pl-[50px] md:pl-[100px]">
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

        {/* ==========================================
            8. ABOUT US
        ========================================== */}
        <section id="about" className="w-full py-[120px] md:py-[180px] px-6 md:px-10 bg-[#0A0A0A] overflow-hidden border-t border-muted relative">
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-0 relative">
            
            {/* Left Column */}
            <div className="lg:w-1/3 md:pr-10 lg:pr-24 mb-12 lg:mb-0">
              <div className="lg:sticky top-1/3 overflow-hidden py-4">
                <h2 className="about-title text-[50px] md:text-[80px] text-hollow leading-none origin-bottom-left">
                  WHO WE <br /> ARE
                </h2>
              </div>
            </div>
            
            {/* Center Timeline Track (Desktop Only) */}
            <div className="hidden lg:block absolute left-1/3 top-0 bottom-0 w-[1px] bg-muted transform -translate-x-1/2 z-0">
              <div className="about-pointer absolute left-1/2 transform -translate-x-1/2 w-[3px] h-32 bg-accent shadow-[0_0_20px_#2563EB] z-10" />
            </div>

            {/* Right Column */}
            <div className="lg:w-2/3 flex flex-col relative border-t lg:border-t-0 border-muted pl-0 lg:pl-16">
              {[
                { 
                  num: "SYS.01",
                  title: "Engineered for Scale", 
                  desc: "Flowmatic is a technical, builder-first automation agency based out of Indore, India. We don't sell generic advice, empty consulting hours, or fluffy marketing strategies." 
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
                <div key={i} className="about-text group flex flex-col md:flex-row gap-8 lg:gap-16 opacity-0 py-16 border-b border-muted transition-colors duration-500 relative overflow-hidden cursor-pointer">
                  {/* Hover Background Sweep */}
                  <div className="absolute left-0 top-0 w-0 h-full bg-[#0f0f0f] group-hover:w-[120%] -translate-x-[10%] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                  
                  <span className="font-heading text-xl text-accent w-24 shrink-0 transform group-hover:translate-x-4 transition-transform duration-500 ease-out z-10">{item.num}</span>
                  
                  <div className="flex flex-col gap-6 z-10">
                    <h3 className="text-3xl lg:text-4xl font-black text-text-base tracking-tight uppercase transform group-hover:translate-x-4 transition-transform duration-500 delay-75 ease-out">{item.title}</h3>
                    <p className="text-body text-lg leading-relaxed max-w-2xl transform group-hover:translate-x-4 transition-transform duration-500 delay-150 ease-out">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            9. CTA SECTION
        ========================================== */}
        <section id="contact" className="w-full min-h-screen relative flex flex-col justify-center items-center text-center px-6 md:px-10 pt-[120px] md:pt-[200px]">
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
            <svg viewBox="0 0 1440 120" className="w-full h-auto fill-[#0A0A0A]">
              <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
            </svg>
          </div>

          <div className="reveal-item flex flex-col items-center z-10 w-full">
            <h2 className="text-[40px] md:text-[8vw] leading-none mb-8">
              READY TO <br/><span className="text-accent">AUTOMATE?</span>
            </h2>
            <p className="text-body text-xl max-w-2xl mb-8 leading-relaxed">
              Book a zero-fluff architecture call with our system engineers. We&apos;ll map out exactly where your business is bleeding time.
            </p>
            <button onClick={scrollToContact} className="bg-accent text-white px-12 py-6 font-heading text-2xl uppercase tracking-wider interactive hover:bg-white hover:text-[#050505] transition-colors duration-300">
              BOOK STRATEGY CALL
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
