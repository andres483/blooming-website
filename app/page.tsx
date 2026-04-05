export default function Home() {
  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      {/* Petal Symbol */}
      <div className="mb-10">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Blooming symbol"
        >
          {/* Top petal */}
          <ellipse
            cx="32"
            cy="18"
            rx="7"
            ry="16"
            fill="#5C6B5A"
            fillOpacity="0.85"
          />
          {/* Bottom petal */}
          <ellipse
            cx="32"
            cy="46"
            rx="7"
            ry="16"
            fill="#5C6B5A"
            fillOpacity="0.85"
          />
          {/* Left petal */}
          <ellipse
            cx="18"
            cy="32"
            rx="16"
            ry="7"
            fill="#8B7D6B"
            fillOpacity="0.75"
          />
          {/* Right petal */}
          <ellipse
            cx="46"
            cy="32"
            rx="16"
            ry="7"
            fill="#8B7D6B"
            fillOpacity="0.75"
          />
          {/* Center */}
          <circle cx="32" cy="32" r="5" fill="#1A1A1A" />
        </svg>
      </div>

      {/* Wordmark */}
      <h1 className="font-display text-[3.5rem] sm:text-[5rem] font-light tracking-[0.25em] text-negro uppercase mb-10 leading-none">
        BLOOMING
      </h1>

      {/* Trilingual tagline */}
      <div className="flex flex-col items-center gap-1 mb-14">
        <p className="font-body text-sm sm:text-base tracking-widest text-negro uppercase">
          Growth that matters.
        </p>
        <p className="font-body text-sm sm:text-base tracking-widest text-hongo uppercase">
          Crecimiento que importa.
        </p>
        <p className="font-body text-sm sm:text-base tracking-widest text-tierra uppercase">
          Une croissance qui compte.
        </p>
      </div>

      {/* CTA */}
      <a
        href="mailto:hello@weareblooming.co"
        className="font-body text-xs tracking-[0.2em] uppercase border border-negro text-negro px-8 py-3 hover:bg-negro hover:text-cream transition-colors duration-300"
      >
        hello@weareblooming.co
      </a>
    </main>
  );
}
