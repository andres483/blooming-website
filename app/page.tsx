function BloomSymbol({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="10" cy="20" rx="10" ry="4.5" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="30" cy="20" rx="10" ry="4.5" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="20" cy="10" rx="4.5" ry="10" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="20" cy="30" rx="4.5" ry="10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6">
      <div className="flex items-center gap-3">
        <BloomSymbol className="w-6 h-6 text-negro" />
        <span className="font-sans font-[300] text-xs tracking-[0.25em] uppercase text-negro">Blooming</span>
      </div>
      <a href="mailto:hello@weareblooming.co" className="font-sans font-[300] text-xs tracking-wide text-tierra hover:text-negro transition-colors duration-300">
        hello@weareblooming.co
      </a>
    </nav>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-end pb-24 px-8 md:px-16 pt-32">
      <div className="mb-12 flex flex-col gap-1">
        <p className="font-display italic font-[300] text-base text-negro">Growth that matters.</p>
        <p className="font-display italic font-[300] text-base text-tierra">Crecimiento que importa.</p>
        <p className="font-display italic font-[300] text-base text-bosque">Une croissance qui compte.</p>
      </div>
      <h1 className="font-display font-[300] text-display-xl text-negro mb-10 max-w-5xl">
        We help<br />organizations <em className="text-bosque">grow.</em>
      </h1>
      <p className="font-sans font-[300] text-base md:text-lg text-negro/70 max-w-xl leading-relaxed">
        A collective of four. Growth strategists, event producers, community builders. Based in San Francisco — bridging LATAM and the French tech ecosystem.
      </p>
      <div className="mt-20 flex items-center gap-3">
        <div className="w-8 h-px bg-tierra" />
        <span className="font-sans font-[300] text-xs tracking-[0.2em] uppercase text-tierra">Scroll</span>
      </div>
    </section>
  );
}

function Divider() {
  return <div className="w-full h-px bg-negro/10" />;
}

const services = [
  { number: "01", name: "Event Production", description: "Side events, hackathons, meetups, conference activations. Turnkey execution — venue, logistics, community, follow-up. You focus on your product." },
  { number: "02", name: "Community Growth", description: "We turn events into ecosystems. Attendee database, segmentation, post-event nurture. The relationship doesn't end when the venue closes." },
  { number: "03", name: "Go-to-Market Strategy", description: "Market entry, digital positioning, growth frameworks. For companies building in SF, expanding to LATAM, or bridging both markets." },
];

function Services() {
  return (
    <section className="px-8 md:px-16 py-32">
      <p className="font-sans font-[500] text-xs tracking-[0.25em] uppercase text-tierra mb-16">What we do</p>
      <div className="grid md:grid-cols-3 gap-12 md:gap-8">
        {services.map((s) => (
          <div key={s.number} className="group">
            <span className="font-sans font-[300] text-xs tracking-widest text-negro/30 block mb-4">{s.number}</span>
            <h3 className="font-display font-[400] text-2xl md:text-3xl text-negro mb-4 group-hover:text-bosque transition-colors duration-300">{s.name}</h3>
            <p className="font-sans font-[300] text-sm text-negro/60 leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const founders = [
  { name: "Andrés Villagrán", role: "GTM Strategy & Leadership", detail: "Head of Marketing, Wheel the World" },
  { name: "Alison Granger", role: "Event Production & Community", detail: "80+ AI events in SF · Google, NVIDIA, Intercom" },
  { name: "Juan Ignacio Contreras", role: "Growth Strategy & Analysis", detail: "Growth, Wheel the World · Reforge" },
  { name: "Claudio Soto", role: "Marketing, CRO & Design", detail: "Full-Stack Marketer · Reforge · Santiago" },
];

function Team() {
  return (
    <section className="px-8 md:px-16 py-32 bg-negro">
      <p className="font-sans font-[500] text-xs tracking-[0.25em] uppercase text-tierra mb-16">Who we are</p>
      <div className="grid md:grid-cols-2 gap-px bg-white/10">
        {founders.map((f) => (
          <div key={f.name} className="bg-negro p-10 md:p-12 hover:bg-white/5 transition-colors duration-300">
            <p className="font-sans font-[300] text-2xl mb-1 text-cream">{f.name}</p>
            <p className="font-sans font-[500] text-xs tracking-wide uppercase text-tierra mb-2">{f.role}</p>
            <p className="font-sans font-[300] text-xs text-cream/40">{f.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="px-8 md:px-16 py-32 md:py-48">
      <div className="max-w-3xl">
        <h2 className="font-display font-[300] italic text-display-lg text-negro leading-tight mb-12">
          "The most meaningful growth<br />comes from generosity."
        </h2>
        <div className="flex flex-col gap-2">
          <p className="font-sans font-[300] text-sm text-negro/50">We think together.</p>
          <p className="font-sans font-[300] text-sm text-negro/50">We build together.</p>
          <p className="font-sans font-[300] text-sm text-negro/50">We grow together.</p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="px-8 md:px-16 py-32 bg-cream-dark">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
        <div>
          <p className="font-sans font-[500] text-xs tracking-[0.25em] uppercase text-tierra mb-8">Let's work together</p>
          <h2 className="font-display font-[300] text-display-lg text-negro">
            This is what we found.<br />This is what we'd do.<br /><em className="text-bosque">What do you think?</em>
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          <a href="mailto:hello@weareblooming.co" className="font-sans font-[300] text-lg text-negro hover:text-bosque transition-colors duration-300">hello@weareblooming.co</a>
          <p className="font-sans font-[300] text-sm text-negro/40">San Francisco · Santiago · Paris</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-8 md:px-16 py-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <BloomSymbol className="w-5 h-5 text-negro/30" />
        <span className="font-sans font-[300] text-xs tracking-[0.2em] uppercase text-negro/30">Blooming</span>
      </div>
      <p className="font-sans font-[300] text-xs text-negro/30">© 2026</p>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Divider />
      <Services />
      <Divider />
      <Team />
      <Manifesto />
      <Divider />
      <Contact />
      <Footer />
    </main>
  );
}
