import { useEffect, type ReactNode } from "react";
import { useReveals } from "../hooks/useReveals";
import { prefersReducedMotion } from "../hooks/useReducedMotion";
import { startLoop } from "../lib/scroll";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout({ current, children }: { current: string; children: ReactNode }) {
  useEffect(() => startLoop(prefersReducedMotion()), []);
  useReveals();

  return (
    <>
      <Header current={current} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}

/** The paper sheet that slides up over a sticky PageHero. */
export function Sheet({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative z-10 -mt-10 rounded-t-[2rem] bg-paper md:rounded-t-[3rem] ${className}`}>{children}</div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[110rem] px-5 md:px-10 ${className}`}>{children}</div>;
}

export function SectionTitle({
  eyebrow,
  children,
  className = "",
}: {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-reveal className={className}>
      {eyebrow && <p className="eyebrow text-rose-deep">{eyebrow}</p>}
      <h2 className="mt-3 text-title uppercase text-wine">{children}</h2>
    </div>
  );
}
