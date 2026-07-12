"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const tools = ["n8n", "Supabase", "Twilio", "Groq", "Google Sheets", "Claude", "Apify", "OpenAI"];

const CASE_STUDIES = [
  { 
    ind: "Marketing Agency (US)", 
    res: "20hrs saved per week", 
    title: "Automated client reporting pipeline pulling Meta/Google Ads data into plain-English emails.",
    architecture: "We deployed a cron-triggered n8n workflow that authenticates with Meta Ads and Google Ads APIs via OAuth. Data is aggregated weekly into a structured JSON payload, which is then fed into Claude 3.5 Sonnet to generate a highly personalized, jargon-free executive summary. The final output is automatically formatted into an HTML email template and dispatched via SendGrid to 40+ clients every Monday morning."
  },
  { 
    ind: "B2B SaaS (UK)", 
    res: "45% higher reply rate", 
    title: "Hyper-personalized cold outreach sequence using intent-based scraping.",
    architecture: "This pipeline utilizes Apify to scrape LinkedIn and Twitter for specific buying intent signals (e.g., companies asking for recommendations). The raw data is routed through an n8n webhook into Supabase. A background worker uses the Claude API to analyze the prospect's recent posts and generate a highly contextual opening line. The lead is then pushed directly into Instantly.ai campaigns via API, completely eliminating manual lead research."
  },
  { 
    ind: "D2C E-commerce (AU)", 
    res: "Zero manual data entry", 
    title: "Unified CRM pipeline automation executing flawlessly in the background.",
    architecture: "Built an event-driven architecture connecting Shopify webhooks to HubSpot. When a high-ticket cart is abandoned, n8n intercepts the payload, cross-references the customer's LTV in Supabase, and dynamically assigns a priority score. VIP customers instantly trigger a Slack alert to a human sales rep for a phone call, while standard customers enter an automated multi-step SMS recovery sequence via Twilio."
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const bgNoiseRef = useRef<HTMLDivElement>(null);
  const heroHollowRef = useRef<HTMLHeadingElement>(null);
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLElement>(null);
  const caseStudiesWrapperRef = useRef<HTMLDivElement>(null);
  
  const [activeModal, setActiveModal] = useState<number | null>(null);

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

    // ANIMATION 4: HERO PARALLAX
    if (heroRef.current && bgNoiseRef.current && heroHollowRef.current) {
      gsap.to(bgNoiseRef.current, {
        yPercent: 10, 
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      gsap.to(heroHollowRef.current, {
        yPercent: 25, 
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });
      
      gsap.to(shape1Ref.current, {
        y: -150,
        rotate: 5,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 }
      });
      gsap.to(shape2Ref.current, {
        y: -250,
        x: -20,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 }
      });
      gsap.to(shape3Ref.current, {
        y: -80,
        rotate: -5,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 0.5 }
      });
    }

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

      // 3. Scrubbed entry for the text rows
      const aboutTexts = gsap.utils.toArray(".about-text");
      aboutTexts.forEach((text: any) => {
        gsap.fromTo(text, 
          { x: 100, opacity: 0 }, 
          { 
            x: 0, 
            opacity: 1, 
            ease: "none",
            scrollTrigger: {
              trigger: text,
              start: "top 65%",
              end: "top 45%",
              scrub: 1,
            }
          }
        );
      });
    }

    // ANIMATION 7: CASE STUDIES HORIZONTAL SCROLL
    if (caseStudiesRef.current && caseStudiesWrapperRef.current) {
      const wrapper = caseStudiesWrapperRef.current;
      
      let getScrollAmount = () => {
        let wrapperWidth = wrapper.scrollWidth;
        // The side text is 400px, window width minus 400 is the visible area for cards.
        // We add some extra padding to ensure the 3rd card fully clears the right edge.
        return -(wrapperWidth - (window.innerWidth - 450) + 200); 
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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative">
      <Navbar />

      <main className="w-full">
        {/* ==========================================
            2. HERO SECTION
        ========================================== */}
        <section ref={heroRef} className="relative w-full h-screen min-h-[800px] flex flex-col justify-center px-10 overflow-hidden">
          <div ref={bgNoiseRef} className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }} />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent rounded-full blur-[120px] opacity-[0.15] pointer-events-none z-0" />

          <div className="max-w-[1440px] mx-auto w-full relative z-10 flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-[70px] md:text-[130px] leading-[0.85] tracking-tighter w-full max-w-4xl z-20 hero-headline">
                WE AUTOMATE<br />
                THE WORK.<br />
              </h1>
              
              <h2 ref={heroHollowRef} className="absolute top-[80px] left-[20px] text-[100px] md:text-[180px] leading-[0.8] text-hollow-thick opacity-40 z-10 select-none pointer-events-none">
                FLOWMATIC
              </h2>

              <p className="mt-12 text-[18px] max-w-[520px] z-20">
                You close the deals. We build AI-powered systems for marketing agencies and forward-thinking enterprises that eliminate manual repetitive tasks and compound your revenue.
              </p>

              <div className="mt-12 z-20 w-fit">
                <button onClick={scrollToContact} className="btn-outline interactive">
                  BOOK A DEMO
                </button>
              </div>
            </div>

            <div className="hidden lg:block relative w-[500px] h-[500px] pointer-events-none z-10">
              {/* Shape 1 */}
              <div ref={shape1Ref} className="absolute top-[10%] right-[15%] w-[200px] h-[240px] border border-accent bg-[#0A0A0A] p-5 flex flex-col justify-between shadow-2xl">
                <div className="w-10 h-10 bg-accent" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-text-base/40 uppercase tracking-widest">Trigger</span>
                  <span className="font-heading text-lg text-text-base">WEBHOOK_IN</span>
                </div>
              </div>
              
              {/* Shape 2 */}
              <div ref={shape2Ref} className="absolute top-[40%] left-[5%] w-[260px] h-[160px] border border-muted bg-[#050505] p-5 flex flex-col justify-between z-10 shadow-[8px_8px_0_#2563EB]">
                <div className="flex justify-between items-start w-full">
                  <span className="text-[10px] text-text-base/40 uppercase tracking-widest">Processing</span>
                  <div className="w-2 h-2 bg-accent animate-pulse" />
                </div>
                <span className="font-heading text-4xl text-text-base text-hollow tracking-tighter">LLM_CORE</span>
              </div>
              
              {/* Shape 3 */}
              <div ref={shape3Ref} className="absolute bottom-[15%] right-[25%] px-6 py-3 bg-text-base text-[#050505] font-bold text-sm uppercase tracking-widest flex items-center gap-3">
                <div className="w-2 h-2 bg-[#050505] animate-pulse" />
                SYSTEM.ACTIVE
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            3. MARQUEE BAR
        ========================================== */}
        <section className="w-full bg-[#0D0D0D] py-6 overflow-hidden flex flex-col gap-4 border-y border-muted">
          <div className="flex w-[200%] animate-marquee-left">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`top-${i}`} className="flex items-center whitespace-nowrap px-8 gap-8">
                {tools.map(tool => (
                  <div key={tool} className="flex items-center gap-8">
                    <span className="font-heading text-4xl text-text-base/80">{tool}</span>
                    <div className="w-3 h-3 bg-accent" />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex w-[200%] animate-marquee-right" style={{ transform: "translateX(-50%)" }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`bottom-${i}`} className="flex items-center whitespace-nowrap px-8 gap-8">
                {tools.reverse().map(tool => (
                  <div key={tool} className="flex items-center gap-8">
                    <span className="font-heading text-4xl text-text-base/40 text-hollow">{tool}</span>
                    <div className="w-3 h-3 bg-muted" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            4. SERVICES
        ========================================== */}
        <section id="services" className="w-full py-[180px] px-10">
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3">
              <h2 className="text-[60px] md:text-[80px] text-hollow leading-none sticky top-32">
                WHAT <br /> WE BUILD
              </h2>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-t border-muted">
              {[
                { num: "01", title: "Client Reporting Automation", desc: "Pulls data from Meta & Google Ads, generates a plain-English AI summary, and emails it to clients automatically." },
                { num: "02", title: "Lead Follow-Up Sequence", desc: "New leads get personalized emails immediately, plus strategic follow-ups on days 3 and 7 via Claude AI." },
                { num: "03", title: "Content Repurposing Pipeline", desc: "Turn one YouTube video into short scripts, Twitter threads, LinkedIn posts, and blogs automatically." },
                { num: "04", title: "Client Onboarding Workflow", desc: "New client signs? Google Drive folders, contracts, onboarding forms, and Slack alerts are created instantly." }
              ].map((svc) => (
                <div key={svc.num} className="reveal-item p-12 border-r border-b border-muted bg-[#050505] hover:bg-[#0A0A0A] transition-colors duration-300">
                  <span className="text-accent font-heading text-xl mb-8 block">{svc.num}</span>
                  <h3 className="text-2xl mb-4 leading-tight">{svc.title}</h3>
                  <p className="text-body">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            5. WHY FLOWMATIC
        ========================================== */}
        <section className="w-full py-[180px] overflow-hidden bg-[#0A0A0A]">
          <div className="max-w-[1440px] mx-auto px-10">
            <h2 className="text-[8vw] leading-none text-hollow whitespace-nowrap reveal-item">
              THE FLOWMATIC EDGE
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
              {[
                { stat: "48hrs", label: "Average deployment speed" },
                { stat: "20hrs", label: "Reclaimed per week on reporting" },
                { stat: "Zero", label: "Technical knowledge required" }
              ].map((item, i) => (
                <div key={i} className="reveal-item flex flex-col gap-6">
                  <span className="font-heading text-[80px] text-text-base leading-none">{item.stat}</span>
                  <div className="h-[1px] w-full bg-muted relative">
                    <div className="absolute left-0 top-0 h-full w-1/3 bg-accent" />
                  </div>
                  <p className="text-body text-lg uppercase tracking-wider">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            6. PROCESS
        ========================================== */}
        <section className="w-full py-[180px] px-10">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-[60px] md:text-[80px] leading-none mb-24 reveal-item">
              HOW IT <span className="text-hollow">WORKS</span>
            </h2>
            
            <div className="flex flex-col border-t border-muted">
              {[
                { num: "01", title: "Discovery & Architecture" },
                { num: "02", title: "System Engineering" },
                { num: "03", title: "Stress Testing & QA" },
                { num: "04", title: "Deployment & Training" }
              ].map((step) => (
                <div key={step.num} className="reveal-item group flex items-center gap-12 py-12 border-b border-muted cursor-pointer relative overflow-hidden">
                  <span className="font-heading text-4xl text-body group-hover:text-accent transition-colors duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]">
                    {step.num}
                  </span>
                  <h3 className="text-4xl md:text-6xl transform group-hover:translate-x-[6px] transition-transform duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]">
                    {step.title}
                  </h3>
                  
                  <div className="absolute bottom-0 left-0 h-[1px] bg-accent w-0 group-hover:w-full transition-all duration-300 ease-out" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            7. CASE STUDIES (HORIZ SCROLL)
        ========================================== */}
        <section id="work" ref={caseStudiesRef} className="w-full h-screen bg-[#0A0A0A] flex items-center overflow-hidden">
          <div className="px-10 shrink-0 w-[400px]">
            <h2 className="text-[60px] leading-none mb-4">SYSTEM<br/>DEPLOYMENTS</h2>
            <p className="text-body">Scroll to explore recent automated pipelines.</p>
          </div>
          
          <div ref={caseStudiesWrapperRef} className="flex gap-10 px-10 h-[60vh] min-h-[400px] pl-[100px]">
            {CASE_STUDIES.map((cs, i) => (
              <div key={i} className="group w-[600px] h-full bg-[#050505] border border-muted hover:border-accent transition-colors duration-300 p-12 flex flex-col justify-between relative overflow-hidden shrink-0">
                <div className="flex justify-between items-start">
                  <span className="section-label text-body">{cs.ind}</span>
                  <div className="w-4 h-4 bg-muted group-hover:bg-accent transition-colors duration-300" />
                </div>
                
                <div>
                  <h3 className="text-[50px] leading-none mb-6 group-hover:text-accent transition-colors duration-300">{cs.res}</h3>
                  <p className="text-body mb-8 text-lg">{cs.title}</p>
                  <button 
                    onClick={() => setActiveModal(i)}
                    className="uppercase font-bold tracking-widest text-sm border-b border-text-base pb-1 interactive hover:text-accent transition-colors duration-300"
                  >
                    View Architecture
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            8. ABOUT US
        ========================================== */}
        <section id="about" className="w-full py-[180px] px-10 bg-[#0A0A0A] overflow-hidden border-t border-muted relative">
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-0 relative">
            
            {/* Left Column */}
            <div className="lg:w-1/3 pr-10 lg:pr-24">
              <div className="sticky top-1/3 overflow-hidden py-4">
                <h2 className="about-title text-[60px] md:text-[80px] text-hollow leading-none origin-bottom-left">
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
        <section id="contact" className="w-full min-h-screen relative flex flex-col justify-center items-center text-center px-10 pt-[200px]">
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
            <svg viewBox="0 0 1440 120" className="w-full h-auto fill-[#0A0A0A]">
              <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
            </svg>
          </div>

          <div className="reveal-item flex flex-col items-center z-10">
            <h2 className="text-[8vw] leading-none mb-8">
              READY TO <br/><span className="text-accent">AUTOMATE?</span>
            </h2>
            <p className="text-body text-xl mb-12 max-w-lg">
              Book a zero-fluff architecture call with our system engineers. We'll map out exactly where your business is bleeding time.
            </p>
            <button onClick={scrollToContact} className="bg-accent text-white px-12 py-6 font-heading text-2xl uppercase tracking-wider interactive hover:bg-white hover:text-[#050505] transition-colors duration-300">
              BOOK STRATEGY CALL
            </button>
          </div>
        </section>
      </main>

      <Footer />

      {/* ==========================================
          CASE STUDY MODAL OVERLAY
      ========================================== */}
      {activeModal !== null && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-10 bg-bg-base/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="max-w-3xl w-full bg-[#050505] border border-accent p-12 relative">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-8 right-8 text-body hover:text-accent font-bold uppercase tracking-widest text-sm interactive transition-colors"
            >
              [ CLOSE ]
            </button>
            <span className="text-accent font-heading text-2xl mb-4 block">ARCHITECTURE LOG: {CASE_STUDIES[activeModal].ind}</span>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">{CASE_STUDIES[activeModal].title}</h2>
            
            <div className="h-[1px] w-full bg-muted mb-8" />
            
            <h3 className="section-label text-text-base mb-4">TECHNICAL DEPLOYMENT</h3>
            <p className="text-body text-lg leading-relaxed">
              {CASE_STUDIES[activeModal].architecture}
            </p>
            
            <div className="mt-12">
              <button 
                onClick={() => {
                  setActiveModal(null);
                  scrollToContact();
                }}
                className="btn-outline interactive w-full md:w-auto"
              >
                BUILD A SIMILAR SYSTEM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
