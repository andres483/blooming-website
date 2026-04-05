"use client";

import { useState } from "react";

function BloomSymbol({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse cx="10" cy="20" rx="10" ry="4.5" stroke="currentColor" strokeWidth="0.75" />
      <ellipse cx="30" cy="20" rx="10" ry="4.5" stroke="currentColor" strokeWidth="0.75" />
      <ellipse cx="20" cy="10" rx="4.5" ry="10" stroke="currentColor" strokeWidth="0.75" />
      <ellipse cx="20" cy="30" rx="4.5" ry="10" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 md:px-20 py-8">
        <div className="flex items-center gap-3">
          <BloomSymbol className="w-5 h-5 text-negro" />
          <span className="font-sans font-[300] text-xs tracking-[0.3em] uppercase text-negro">
            Blooming
          </span>
        </div>
        <span className="font-sans font-[300] text-xs text-negro/30 tracking-wide hidden md:block">
          San Francisco · Santiago · Paris
        </span>
      </nav>

      {/* Main content — two columns on desktop */}
      <div className="flex-1 flex flex-col md:flex-row items-center px-8 md:px-20 pb-16">

        {/* Left: text content */}
        <div className="flex-1 flex flex-col justify-center py-12 md:py-0">
          <div className="max-w-xl">

            {/* Status indicator */}
            <div className="flex items-center gap-2 mb-12">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bosque opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-bosque" />
              </span>
              <span className="font-sans font-[300] text-xs tracking-[0.25em] uppercase text-bosque">
                Something is growing
              </span>
            </div>

            {/* Trilingual taglines */}
            <div className="flex flex-col gap-1 mb-10">
              <p className="font-display italic font-[300] text-sm text-negro/60">
                Growth that matters.
              </p>
              <p className="font-display italic font-[300] text-sm text-tierra">
                Crecimiento que importa.
              </p>
              <p className="font-display italic font-[300] text-sm text-bosque">
                Une croissance qui compte.
              </p>
            </div>

            {/* Headline */}
            <h1 className="font-display font-[300] text-display-xl text-negro mb-10 leading-[0.95]">
              We help<br />
              organizations{" "}
              <em className="text-bosque">grow.</em>
            </h1>

            {/* Positioning — visible only on mobile */}
            <p className="font-sans font-[300] text-base text-negro/55 max-w-lg leading-relaxed mb-14 md:hidden">
              A collective of four. We bridge San Francisco, Latin America, and
              the French tech ecosystem — through events, community, and
              go-to-market strategy.
            </p>

            {/* Email capture */}
            {!sent ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-sans font-[300] text-xs tracking-[0.15em] uppercase text-negro/40">
                    Stay in touch
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSubscribe(); }}
                    className="font-sans font-[300] text-sm bg-transparent border-b border-negro/20 focus:border-negro outline-none py-2 w-60 placeholder:text-negro/25 transition-colors duration-200"
                  />
                </div>
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="font-sans font-[400] text-xs tracking-[0.2em] uppercase bg-negro text-cream px-7 py-3 hover:bg-bosque transition-colors duration-300 mb-0.5 disabled:opacity-50"
                >
                  {loading ? "..." : "Let's connect"}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-4 h-px bg-bosque" />
                <p className="font-sans font-[300] text-sm text-bosque">
                  We&apos;ll be in touch. Thank you.
                </p>
              </div>
            )}

          </div>
        </div>

        {/* Right: isotipo + positioning + cities */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center gap-16">
          <BloomSymbol className="w-[22rem] h-[22rem] text-negro/[0.06]" />
          <div className="flex flex-col items-center gap-6 max-w-sm text-center">
            <p className="font-sans font-[300] text-base text-negro/50 leading-relaxed">
              A collective of four. We bridge San Francisco, Latin America, and
              the French tech ecosystem — through events, community, and
              go-to-market strategy.
            </p>
            <p className="font-sans font-[300] text-xs tracking-[0.25em] uppercase text-negro/25">
              San Francisco · Santiago · Paris
            </p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="px-8 md:px-20 py-7 flex items-center justify-between border-t border-negro/5">
        <a
          href="mailto:hello@weareblooming.co"
          className="font-sans font-[300] text-xs text-negro/35 hover:text-negro transition-colors duration-200"
        >
          hello@weareblooming.co
        </a>
        <p className="font-sans font-[300] text-xs text-negro/25">© 2026</p>
      </footer>

    </main>
  );
}
