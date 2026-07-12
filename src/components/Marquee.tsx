import React from "react";
import clsx from "clsx";

export default function Marquee({
  children,
  className,
  speed = "20s",
}: {
  children: React.ReactNode;
  className?: string;
  speed?: string;
}) {
  return (
    <div className={clsx("w-full overflow-hidden flex relative", className)}>
      <div 
        className="flex whitespace-nowrap will-change-transform items-center shrink-0" 
        style={{ animation: `marquee ${speed} linear infinite` }}
      >
        {children}
      </div>
      <div 
        className="flex whitespace-nowrap will-change-transform items-center shrink-0" 
        style={{ animation: `marquee ${speed} linear infinite` }}
        aria-hidden="true"
      >
        {children}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
