"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Bot, Zap, MessageSquare, Database, CheckCircle2, Star } from "lucide-react";
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
              
              <div className="flex flex-col gap-3 mb-10 border-l-2 border-accent/30 pl-4">
                <p className="text-lg md:text-xl text-white font-medium">
                  ✅ AI Lead Follow-ups
                </p>
                <p className="text-lg md:text-xl text-white font-medium">
                  ✅ Automated Client Reporting
                </p>
                <p className="text-lg md:text-xl text-white font-medium">
                  ✅ Instant Client Onboarding
                </p>
              </div>

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

            {/* Right Column: Live Activity Feed */}
            <div className="hidden lg:flex flex-col relative w-full h-[600px] justify-center z-10 reveal-item pl-10">
               {/* 4 Cards that show step-by-step automation */}
               <div className="flex flex-col gap-5 relative">
                  {/* Vertical connecting line */}
                  <div className="absolute left-[27px] top-10 bottom-10 w-[2px] bg-accent/20 z-0">
                    <div className="w-full h-1/4 bg-accent animate-[slideDown_3s_linear_infinite]" />
                  </div>

                  {/* Card 1 */}
                  <div className="glass-card p-5 pr-8 flex items-center gap-4 z-10 w-fit shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border-white/10">
                    <div className="w-14 h-14 rounded-full bg-[#1877F2]/10 flex items-center justify-center border border-[#1877F2]/30 shrink-0">
                      <Database className="w-6 h-6 text-[#1877F2]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">Trigger</span>
                      <span className="text-base font-semibold text-white">Meta Ads Lead Captured</span>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="glass-card p-5 pr-8 flex items-center gap-4 z-10 w-fit ml-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border-white/10">
                    <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/30 shrink-0">
                      <Bot className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">AI Processing</span>
                      <span className="text-base font-semibold text-white">ChatGPT Personalizes Email</span>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="glass-card p-5 pr-8 flex items-center gap-4 z-10 w-fit ml-16 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border-white/10">
                    <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30 shrink-0">
                      <MessageSquare className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">Action</span>
                      <span className="text-base font-semibold text-white">Email Sent via Gmail API</span>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="glass-card p-5 pr-8 flex items-center gap-4 z-10 w-fit ml-24 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border-white/10">
                    <div className="w-14 h-14 rounded-full bg-[#E01E5A]/10 flex items-center justify-center border border-[#E01E5A]/30 shrink-0">
                      <Zap className="w-6 h-6 text-[#E01E5A]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">Sync & Notify</span>
                      <span className="text-base font-semibold text-white">Hubspot Updated + Slack Alert</span>
                    </div>
                  </div>
               </div>
               
               <style dangerouslySetInnerHTML={{__html: `
                 @keyframes slideDown {
                   0% { transform: translateY(-100%); opacity: 0; }
                   20% { opacity: 1; }
                   80% { opacity: 1; }
                   100% { transform: translateY(400%); opacity: 0; }
                 }
               `}} />
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
            7. THE COST OF DOING IT MANUALLY
        ========================================== */}
        <section className="w-full py-24 md:py-32 bg-[#050505]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="flex flex-col items-center text-center mb-16 reveal-item">
              <span className="section-label mb-4">The Problem</span>
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-4xl uppercase font-heading">
                THE COST OF DOING IT MANUALLY
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  stat: "20 Hours", 
                  label: "Lost every week to manual reporting", 
                  desc: "Your team pulls the same numbers from the same platforms every Monday. For every client." 
                },
                { 
                  stat: "78%", 
                  label: "Of leads go cold within 24 hours", 
                  desc: "Because no one followed up fast enough. Your competitor did." 
                },
                { 
                  stat: "4 Hours", 
                  label: "Wasted onboarding every new client", 
                  desc: "Same emails. Same folder setup. Same checklist. Done manually every single time." 
                }
              ].map((item, i) => (
                <div key={i} className="relative group bg-[#0D0D0D] border border-red-500/30 p-10 flex flex-col gap-4 reveal-item hover:-translate-y-2 transition-all duration-300">
                  {/* Pulsing red background glow */}
                  <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute -inset-[1px] bg-red-500/20 blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <span className="text-5xl md:text-6xl text-white font-heading font-bold tracking-tight z-10">
                    {item.stat}
                  </span>
                  <span className="text-red-500 font-bold text-lg leading-tight z-10">
                    {item.label}
                  </span>
                  <p className="text-white/60 text-sm leading-relaxed mt-2 z-10">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            8. OLD WAY VS NEW WAY
        ========================================== */}
        <section className="w-full py-24 md:py-32 bg-black border-y border-white/5">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="flex flex-col items-center text-center mb-16 reveal-item">
              <span className="section-label mb-4">The Flowmatic Edge</span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl">
                Manual Chaos vs. Automated Clarity
              </h2>
            </div>
            
            <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-8 reveal-item">
              {/* Left: Old Way (Messy) */}
              <div className="glass-card p-10 border-red-500/20 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                <div className="absolute inset-0 bg-red-500/5 pointer-events-none" />
                <span className="absolute top-6 left-6 text-red-500 font-bold uppercase tracking-wider text-sm bg-red-500/10 px-3 py-1 rounded">The Old Way</span>
                
                <div className="relative w-full h-full flex items-center justify-center">
                   {/* Messy scattered nodes */}
                   <div className="absolute top-[10%] left-[20%] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 animate-[wiggle_3s_ease-in-out_infinite]"><Database className="w-5 h-5"/></div>
                   <div className="absolute bottom-[20%] left-[10%] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 animate-[wiggle_4s_ease-in-out_infinite]"><MessageSquare className="w-5 h-5"/></div>
                   <div className="absolute top-[30%] right-[20%] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 animate-[wiggle_2.5s_ease-in-out_infinite]"><Bot className="w-5 h-5"/></div>
                   <div className="absolute bottom-[10%] right-[30%] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 animate-[wiggle_3.5s_ease-in-out_infinite]"><Zap className="w-5 h-5"/></div>
                   <div className="absolute top-[0%] right-[40%] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 animate-[wiggle_2s_ease-in-out_infinite]"><CheckCircle2 className="w-5 h-5"/></div>
                   
                   {/* Tangled chaotic SVG lines */}
                   <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                     <path d="M 80,80 Q 150,180 250,130 T 350,230 T 150,280" stroke="#ef4444" strokeWidth="2" fill="none" />
                     <path d="M 350,80 Q 200,30 150,130 T 250,230 T 80,280" stroke="#ef4444" strokeWidth="2" fill="none" />
                   </svg>
                   
                   <div className="z-10 bg-[#0A0A0A] px-6 py-3 rounded-full border border-red-500/30 text-white font-medium shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                     Data Silos & Copy-Pasting
                   </div>
                </div>
              </div>

              {/* Right: New Way (Automated) */}
              <div className="glass-card p-10 border-accent/30 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
                <span className="absolute top-6 left-6 text-accent font-bold uppercase tracking-wider text-sm bg-accent/10 px-3 py-1 rounded">The Flowmatic Way</span>
                
                <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 mt-4">
                   {/* Clean straight line pipeline */}
                   <div className="flex items-center justify-between w-full px-4 relative z-10">
                     <div className="w-14 h-14 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/50 flex items-center justify-center z-10"><Database className="w-6 h-6 text-[#1877F2]"/></div>
                     <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/50 flex items-center justify-center z-10"><Bot className="w-6 h-6 text-purple-400"/></div>
                     <div className="w-14 h-14 rounded-full bg-[#E01E5A]/10 border border-[#E01E5A]/50 flex items-center justify-center z-10"><Zap className="w-6 h-6 text-[#E01E5A]"/></div>
                   </div>

                   {/* Straight flowing SVG line */}
                   <svg className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[40px] pointer-events-none z-0 -mt-8">
                     <line x1="10%" y1="20" x2="90%" y2="20" stroke="#2563EB" strokeWidth="3" strokeDasharray="6 6" className="animate-[dash_2s_linear_infinite]" opacity="0.5" />
                   </svg>

                   <div className="z-10 bg-accent/10 backdrop-blur px-6 py-3 rounded-full border border-accent/30 text-white font-medium shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                     Seamless Automated Pipeline
                   </div>
                </div>
              </div>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes wiggle {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(5px, 5px) rotate(5deg); }
                50% { transform: translate(0, 10px) rotate(0deg); }
                75% { transform: translate(-5px, 5px) rotate(-5deg); }
              }
            `}} />
          </div>
        </section>

        {/* ==========================================
            9. TOOLS WE AUTOMATE
        ========================================== */}
        <section className="w-full py-24 md:py-32 bg-[#050505] overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="flex flex-col items-center text-center mb-16 reveal-item">
              <span className="section-label mb-4">Integrations</span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl">
                We connect the tools you already use.
              </h2>
            </div>
            
            <div className="relative w-full max-w-5xl mx-auto flex flex-wrap justify-center gap-4 reveal-item">
              {[
                { name: "HubSpot", color: "text-[#FF7A59]", bg: "bg-[#FF7A59]/10", border: "border-[#FF7A59]/20" },
                { name: "GoHighLevel", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                { name: "Meta Ads", color: "text-[#1877F2]", bg: "bg-[#1877F2]/10", border: "border-[#1877F2]/20" },
                { name: "Google Ads", color: "text-[#EA4335]", bg: "bg-[#EA4335]/10", border: "border-[#EA4335]/20" },
                { name: "Slack", color: "text-[#E01E5A]", bg: "bg-[#E01E5A]/10", border: "border-[#E01E5A]/20" },
                { name: "ChatGPT", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
                { name: "Apollo.io", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
                { name: "Gmail", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
                { name: "Stripe", color: "text-[#635BFF]", bg: "bg-[#635BFF]/10", border: "border-[#635BFF]/20" },
                { name: "Airtable", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                { name: "Make / n8n", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
                { name: "Calendly", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" }
              ].map((tool, i) => (
                <div key={i} className={`flex items-center gap-3 px-6 py-4 rounded-full border ${tool.border} ${tool.bg} hover:scale-105 transition-transform duration-300 cursor-default`}>
                  <div className={`w-2 h-2 rounded-full ${tool.bg.replace('/10', '')} shadow-[0_0_8px_currentColor] ${tool.color}`} />
                  <span className={`font-semibold text-lg ${tool.color}`}>{tool.name}</span>
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
