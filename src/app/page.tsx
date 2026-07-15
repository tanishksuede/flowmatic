"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Star, ArrowRight, Bot, Workflow, MessageSquare, Database, Zap, X, Check, Laptop, Briefcase, Home as HomeIcon, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // ABOUT SECTION REMOVED (Legacy)

      // GLOBAL WRENCH REMOVED (Legacy)
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const scrollToContact = () => {
    const subject = encodeURIComponent("Booking a Strategy Call");
    const body = encodeURIComponent("Hi Flowmatic Team,\n\nI'd like to book a strategy call to discuss automating my business systems.\n\nMy website/business is: ");
    window.location.href = `mailto:hello@flowmatic.io?subject=${subject}&body=${body}`;
  };

  return (
    <div ref={containerRef} className="relative">
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
                We design and deploy AI-powered workflows that eliminate reporting, lead follow-ups, client onboarding, data entry, and repetitive operations specifically for marketing agencies.
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

                {/* SVG Connecting Lines with glowing particles (Removed drop-shadow for 120 FPS performance) */}
                <svg className="absolute inset-0 w-full h-full z-10 opacity-40">
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
            7. WHO WE HELP
        ========================================== */}
        <section className="w-full py-24 md:py-32 bg-[#050505]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="flex flex-col items-center text-center mb-16 reveal-item">
              <span className="section-label mb-4">Target Industries</span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl">
                We engineer automated systems for complex operations.
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: TrendingUp, 
                  title: "Paid Media Agencies", 
                  problems: ["Manual ROAS reporting", "Delayed lead routing", "Repetitive ad account setups"] 
                },
                { 
                  icon: Laptop, 
                  title: "SEO Agencies", 
                  problems: ["Incomplete keyword tracking", "Manual backlink outreach", "Disjointed rank reporting"] 
                },
                { 
                  icon: Briefcase, 
                  title: "Lead Gen Agencies", 
                  problems: ["Manual lead enrichment", "Disjointed cold outreach", "Dropped follow-ups"] 
                },
                { 
                  icon: HomeIcon, 
                  title: "Creative Agencies", 
                  problems: ["Asset approval delays", "Manual invoice chasing", "Messy client onboarding"] 
                }
              ].map((industry, i) => (
                <div key={i} className="glass-card p-8 flex flex-col gap-6 reveal-item hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/20">
                     <industry.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl text-white font-semibold">{industry.title}</h3>
                  <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
                    {industry.problems.map((problem, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent/70 mt-0.5 shrink-0" />
                        <span className="text-body text-sm leading-tight">{problem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            8. WHY FLOWMATIC (COMPARISON)
        ========================================== */}
        <section className="w-full py-24 md:py-32 bg-black border-y border-white/5">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="flex flex-col items-center text-center mb-16 reveal-item">
              <span className="section-label mb-4">The Flowmatic Edge</span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl">
                Why businesses choose custom systems over DIY Zapier scripts.
              </h2>
            </div>
            
            <div className="w-full max-w-4xl mx-auto glass-panel overflow-hidden reveal-item">
              <div className="grid grid-cols-3 bg-[#0A0A0A] p-6 border-b border-white/10">
                <div className="text-body font-semibold uppercase tracking-wider text-sm">Feature</div>
                <div className="text-white/50 font-semibold uppercase tracking-wider text-sm text-center">DIY / Freelancers</div>
                <div className="text-accent font-semibold uppercase tracking-wider text-sm text-center flex items-center justify-center gap-2">
                  <Star className="w-4 h-4 fill-accent" />
                  Flowmatic
                </div>
              </div>
              
              <div className="flex flex-col">
                {[
                  { feature: "Strategic Approach", bad: "Band-aid fixes", good: "Full architecture audits" },
                  { feature: "Workflows", bad: "Fragile & unscalable", good: "Stress-tested & resilient" },
                  { feature: "Documentation", bad: "None", good: "Comprehensive logic maps" },
                  { feature: "Team Training", bad: "Figure it out yourself", good: "Dedicated onboarding calls" },
                  { feature: "Support", bad: "Ghosted after payment", good: "Ongoing SLA & maintenance" },
                  { feature: "Business ROI", bad: "Unknown", good: "Guaranteed hours saved" }
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-3 p-6 items-center ${i !== 5 ? 'border-b border-white/5' : ''} hover:bg-white/5 transition-colors`}>
                    <div className="text-white font-medium">{row.feature}</div>
                    <div className="flex items-center justify-center gap-2 text-white/50">
                      <X className="w-4 h-4 text-red-500/50" />
                      <span className="text-sm">{row.bad}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-white font-medium">
                      <Check className="w-4 h-4 text-accent" />
                      <span className="text-sm">{row.good}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            9. OUR PROCESS
        ========================================== */}
        <section className="w-full py-24 md:py-32 bg-[#050505]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="flex flex-col items-start mb-16 reveal-item">
              <span className="section-label mb-4">Enterprise Implementation</span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
                From discovery to deployment.
              </h2>
            </div>
            
            <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-4 reveal-item">
              {/* SVG Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[5%] right-[5%] h-[2px] bg-white/10 z-0">
                <div className="h-full bg-accent w-1/3 animate-pulse" />
              </div>

              {[
                { step: "01", title: "Discovery", desc: "Deep dive into your operational bottlenecks." },
                { step: "02", title: "Blueprint", desc: "Detailed logic maps and architecture design." },
                { step: "03", title: "Development", desc: "Building the engine in a staging environment." },
                { step: "04", title: "Deployment", desc: "Going live and onboarding your team." },
                { step: "05", title: "Optimization", desc: "Ongoing monitoring and SLA maintenance." }
              ].map((phase, i) => (
                <div key={i} className="flex flex-col gap-4 relative z-10 bg-[#050505] p-2 md:w-1/5">
                  <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center text-3xl font-heading text-white border-accent/30 shadow-[0_0_30px_rgba(47,107,255,0.1)]">
                    {phase.step}
                  </div>
                  <h3 className="text-xl text-white font-semibold mt-2">{phase.title}</h3>
                  <p className="text-body text-sm leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            10. FINAL POSITIONING
        ========================================== */}
        <section className="w-full py-32 bg-accent text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }} />
          <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center gap-8 reveal-item">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-tight">
              We don&apos;t just sell automations.<br />
              We build reliable business systems.
            </h2>
            <p className="text-xl text-white/90 max-w-2xl font-medium">
              Eliminate repetitive operations. Reclaim hundreds of hours. Scale your business without scaling headcount.
            </p>
            <button onClick={scrollToContact} className="mt-8 px-10 py-5 bg-white text-accent font-bold tracking-wider uppercase text-sm rounded-none hover:bg-black hover:text-white transition-colors duration-300">
              Transform Your Operations
            </button>
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
