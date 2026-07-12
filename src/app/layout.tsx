import type { Metadata } from "next";
import { Inter, Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroller from "@/components/SmoothScroller";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });
// Syne is also available per prompt, but Space Grotesk was the primary choice.
// We'll include both variables just in case.
const syne = Syne({ subsets: ["latin"], variable: "--font-heading-alt" });

export const metadata: Metadata = {
  title: "Flowmatic | Premium Automation Agency",
  description: "We build automation systems for marketing agencies that eliminate manual work and compound results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${syne.variable}`}>
      <body className="antialiased overflow-x-hidden selection:bg-accent selection:text-white">
        <SmoothScroller>
          <CustomCursor />
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
