import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-bg-base border-t border-muted pt-32 pb-12 px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 pb-32 border-b border-muted">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 w-fit interactive">
              <div className="w-3 h-3 bg-accent rounded-full" />
              <span className="font-heading text-4xl font-black uppercase tracking-tighter text-text-base">
                FLOWMATIC
              </span>
            </Link>
            <p className="text-body max-w-sm">
              "We Automate the Work. You Close the Deals."<br/><br/>
              Engineered in Indore, deployed globally.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <span className="section-label text-text-base mb-4">SITEMAP</span>
            <Link href="#work" className="text-body hover:text-accent transition-colors w-fit interactive">Work</Link>
            <Link href="#services" className="text-body hover:text-accent transition-colors w-fit interactive">Services</Link>
            <Link href="#about" className="text-body hover:text-accent transition-colors w-fit interactive">About</Link>
            <Link href="#contact" className="text-body hover:text-accent transition-colors w-fit interactive">Contact</Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <span className="section-label text-text-base mb-4">CONNECT</span>
            <a href="mailto:hello@flowmatic.io" className="text-body hover:text-accent transition-colors interactive">
              hello@flowmatic.io
            </a>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center">
          <p className="text-sm text-body">
            © {new Date().getFullYear()} Flowmatic. Built to automate.
          </p>
        </div>
      </div>
    </footer>
  );
}
