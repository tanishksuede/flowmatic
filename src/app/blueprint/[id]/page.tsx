import { CASE_STUDIES } from "../../../data/caseStudies";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";

export default async function BlueprintPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = parseInt(id, 10);
  
  if (isNaN(index) || index < 0 || index >= CASE_STUDIES.length) {
    notFound();
  }

  const study = CASE_STUDIES[index];

  return (
    <div className="min-h-screen bg-bg-base text-text-base font-body selection:bg-accent selection:text-white flex flex-col">
      {/* Sleek top navigation */}
      <nav className="w-full border-b border-muted p-6 md:px-12 flex justify-between items-center bg-[#050505]">
        <Link href="/" className="font-heading text-xl font-black uppercase tracking-tighter hover:text-accent transition-colors">
          FLOWMATIC
        </Link>
        <Link href="/work#work" className="text-body hover:text-accent font-bold uppercase tracking-widest text-sm transition-colors">
          [ BACK TO WORK ]
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-6 md:p-12 lg:p-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Title & Impact */}
          <div className="lg:w-1/2 flex flex-col">
            <span className="text-accent font-bold tracking-widest text-sm mb-6 uppercase">
              {study.ind}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-base leading-[0.9] tracking-tighter mb-12">
              {study.title}
            </h1>
            
            <div className="mt-8 pt-8 border-t border-muted">
              <span className="section-label text-text-base mb-4 block">QUANTIFIABLE IMPACT</span>
              <div className="text-5xl md:text-7xl font-black text-accent tracking-tighter">
                {study.res}
              </div>
            </div>
          </div>

          {/* Right Column: Workflow */}
          <div className="lg:w-1/2 flex flex-col">
            <h2 className="section-label text-text-base mb-8">WORKFLOW & FEATURES</h2>
            <div className="text-body text-xl leading-relaxed whitespace-pre-wrap">
              {study.architecture}
            </div>
            
            <div className="mt-16 pt-8 border-t border-muted">
              <p className="text-body text-lg mb-8">
                Ready to deploy a similar system and reclaim your hours?
              </p>
              <a href="mailto:hello@flowmatic.io?subject=Booking%20a%20Strategy%20Call&body=Hi%20Flowmatic%20Team%2C%0D%0A%0D%0AI'd%20like%20to%20book%20a%20strategy%20call%20to%20discuss%20automating%20my%20business%20systems.%0D%0A%0D%0AMy%20website%2Fbusiness%20is%3A%20" className="btn-outline interactive inline-block text-center">
                BUILD A SIMILAR SYSTEM
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
