import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCenterHover } from '../hooks/useCenterHover';
import { Marquee } from './ui/marquee';

export default function WhyMalkEl() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  const testimonials = [
    { 
      quote: "MalkEl didn't just build us a site, they re-architected how we make money. Our lead response dropped from hours to seconds.", 
      author: "James T.", 
      role: "$5M+ Agency Operator" 
    },
    { 
      quote: "The only tech partner we've used where we don't have to manage them. They function like an embedded CTO.", 
      author: "Sarah W.", 
      role: "SaaS Founder" 
    },
    { 
      quote: "Every other agency wanted to sell us tools. MalkEl audited our pipeline and built an automated asset that compounds.", 
      author: "David L.", 
      role: "Operations Director" 
    },
    {
      quote: "They gave us one operating layer instead of another pile of disconnected automations.",
      author: "Maya R.",
      role: "Growth Lead"
    },
    {
      quote: "The audit alone surfaced revenue leaks our internal team had stopped seeing.",
      author: "Omar K.",
      role: "Founder, Home Services Group"
    },
    {
      quote: "Clean build, clear thinking, and the backend actually matches how our team works.",
      author: "Lena P.",
      role: "Clinic Operator"
    }
  ];

  const comparisonRows = [
    {
      con: "Six or more disconnected vendors and unmanaged API bridges.",
      pro: "One dedicated engineering partner mapping the entire architecture."
    },
    {
      con: "Manual follow-ups and heavily delayed lead response times.",
      pro: "Autonomous AI response handling inquiries in under 60 seconds."
    },
    {
      con: "Expensive rigid software that behaves strictly like an expense column.",
      pro: "Bespoke operational software engineered as a yielding capital asset."
    },
    {
      con: "Agencies build a static project and immediately disappear.",
      pro: "Embedded long-term infrastructural support iterating on live results."
    },
    {
      con: "Dashboards that report problems after the revenue is already gone.",
      pro: "Live systems that route, qualify, and trigger the next move automatically."
    },
    {
      con: "Strategy, design, automations, and apps pulling in different directions.",
      pro: "A single operating system where every touchpoint compounds the next one."
    }
  ];

  const comparisonStats = [
    { value: "01", label: "Architecture" },
    { value: "60s", label: "Lead response target" },
    { value: "24/7", label: "System coverage" }
  ];

  const ComparisonRow = ({ con, pro, index }) => {
    const [rowRef, isCenterHovered] = useCenterHover();
    return (
      <div ref={rowRef} className={`vs-row ${isCenterHovered ? 'mobile-active' : ''}`} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', gap: '20px', alignItems: 'stretch', width: '100%' }}>
        
        <div className="legacy-card" style={{ backgroundColor: 'var(--color-panel-bg)', border: '1px dashed var(--color-panel-border)', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', minHeight: '58px', minWidth: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.8 }}><path d="M18 6L6 18M6 6l12 12"/></svg>
          <span style={{ color: 'var(--color-overlay-60)', fontSize: '14px', lineHeight: 1.35 }}>{con}</span>
        </div>
        
        <div className="vs-bridge" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 8px', position: 'relative' }}>
          <span style={{ width: '34px', height: '34px', borderRadius: '999px', border: '1px solid var(--color-overlay-10)', backgroundColor: 'var(--color-bg)', display: 'grid', placeItems: 'center', color: 'var(--color-overlay-40)', fontSize: '12px', fontWeight: 600 }}>{String(index + 1).padStart(2, '0')}</span>
        </div>

        <div className="pro-card" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', overflow: 'hidden', transition: 'all 400ms ease', minHeight: '58px', minWidth: 0 }}>
           <div className="pro-glow" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at right, rgba(16, 185, 129, 0.2) 0%, transparent 60%)', pointerEvents: 'none', opacity: 0, transition: 'opacity 400ms ease' }}></div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M20 6L9 17l-5-5"/></svg>
          <span style={{ color: 'var(--color-text-primary)', fontSize: '14px', lineHeight: 1.35, fontWeight: 600, position: 'relative', zIndex: 1 }}>{pro}</span>
        </div>
      </div>
    );
  };

  const TestimonialCard = ({ testimonial }) => (
    <div className="testimonial-card" style={{
      width: '100%',
      minHeight: '156px',
      backgroundColor: 'var(--color-panel-bg)',
      border: '1px solid var(--color-panel-border)',
      borderRadius: '14px',
      padding: '18px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '14px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'var(--color-panel-shadow)',
      backdropFilter: 'blur(18px) saturate(120%)',
      WebkitBackdropFilter: 'blur(18px) saturate(120%)'
    }}>
      <div className="review-shine" />
      <div style={{ display: 'flex', gap: '6px', color: '#D4A056', position: 'relative', zIndex: 1 }}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <span key={idx} aria-hidden="true" style={{ fontSize: '14px', lineHeight: 1 }}>★</span>
        ))}
      </div>
      <p className="text-body" style={{ color: 'var(--color-text-primary)', fontStyle: 'italic', position: 'relative', zIndex: 1, fontSize: '14px', lineHeight: 1.4 }}>
        <span style={{ position: 'absolute', top: '-14px', left: '-10px', fontSize: '40px', color: 'var(--color-overlay-10)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>"</span>
        {testimonial.quote}
      </p>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: '15px' }}>{testimonial.author}</div>
        <div style={{ color: '#10B981', fontSize: '13px', marginTop: '4px' }}>{testimonial.role}</div>
      </div>
    </div>
  );

  return (
    <section id="why-malkel" className="section container why-section-fit" ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div className={`reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div className="text-eyebrow" style={{ marginBottom: '12px' }}>
          Why MalkEl
        </div>
        <h2 className="text-section-title" style={{ fontSize: 'clamp(34px, 4vw, 54px)' }}>
          Built by operators, for operators.
        </h2>
        <p className="text-body-large" style={{ color: 'var(--color-overlay-60)', maxWidth: '720px', margin: '14px auto 0', fontSize: '15px', lineHeight: 1.4 }}>
          The difference is not another feature list. It is the shift from scattered legacy execution to one operating layer built around revenue, response speed, and compounding infrastructure.
        </p>
      </div>

      <div className="why-content-grid">
        <div className={`comparison-panel reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ 
          transitionDelay: '200ms', 
          width: '100%', 
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div className="comparison-labels" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', gap: '20px', alignItems: 'center', marginBottom: '8px' }}>
            <div className="text-eyebrow" style={{ color: '#ff7777', paddingLeft: '28px' }}>Legacy model</div>
            <div style={{ width: '50px' }}></div>
            <div className="text-eyebrow" style={{ color: '#10B981', paddingLeft: '28px' }}>The MalkEl Way</div>
          </div>

          {comparisonRows.map((row, index) => (
            <ComparisonRow key={row.con} con={row.con} pro={row.pro} index={index} />
          ))}

          <div className="comparison-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px', marginTop: '10px' }}>
            {comparisonStats.map((stat) => (
              <div key={stat.label} style={{ border: '1px solid var(--color-panel-border)', borderRadius: '10px', padding: '12px 16px', backgroundColor: 'var(--color-panel-bg)', boxShadow: 'var(--color-panel-shadow)' }}>
                <div style={{ color: '#10B981', fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1 }}>{stat.value}</div>
                <div className="text-body-small" style={{ color: 'var(--color-overlay-60)', marginTop: '4px', fontSize: '12px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className={`reviews-wrap reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ transitionDelay: '400ms', width: '100%', overflow: 'hidden' }}>
          <div style={{ textAlign: 'left', marginBottom: '14px' }}>
            <div className="text-eyebrow" style={{ color: 'var(--color-overlay-60)', marginBottom: '8px' }}>Operator reviews</div>
            <h3 style={{ fontSize: 'clamp(24px, 2vw, 32px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Quiet systems. Loud outcomes.
            </h3>
          </div>
          <Marquee vertical pauseOnHover repeat={3} className="review-marquee [--duration:34s] [--gap:0.75rem]" style={{
            height: 'min(530px, calc(100svh - 260px))',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
            maskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)'
          }}>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={`${testimonial.author}-${testimonial.role}`} testimonial={testimonial} />
            ))}
          </Marquee>
        </div>
      </div>

      <style>{`
        .why-section-fit {
          min-height: 100svh;
          padding-top: clamp(72px, 8vh, 96px) !important;
          padding-bottom: clamp(48px, 6vh, 72px) !important;
        }
        .why-content-grid {
          width: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 340px);
          gap: 22px;
          align-items: start;
        }
        .pro-card:hover, .vs-row.mobile-active .pro-card {
          background-color: rgba(16, 185, 129, 0.1) !important;
          border-color: rgba(16, 185, 129, 0.6) !important;
          box-shadow: 0 0 30px -10px rgba(16, 185, 129, 0.4);
          transform: translateX(4px);
        }
        .pro-card:hover .pro-glow, .vs-row.mobile-active .pro-glow {
          opacity: 1 !important;
        }
        .legacy-card {
          transition: border-color 300ms ease, background-color 300ms ease;
        }
        .vs-row:hover .legacy-card, .vs-row.mobile-active .legacy-card {
          border-color: rgba(255, 85, 85, 0.35) !important;
          background-color: rgba(255, 85, 85, 0.035) !important;
        }
        .vs-bridge::before {
          content: '';
          position: absolute;
          top: -10px;
          bottom: -10px;
          left: 50%;
          width: 1px;
          transform: translateX(-50%);
          background: linear-gradient(to bottom, transparent, var(--color-overlay-10), transparent);
          z-index: -1;
        }
        .testimonial-card {
          transition: transform 300ms ease, border-color 300ms ease, background-color 300ms ease;
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
          border-color: rgba(16, 185, 129, 0.28) !important;
          background-color: var(--color-overlay-04) !important;
        }
        .review-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 0%, transparent 36%, rgba(255, 255, 255, 0.05) 50%, transparent 64%, transparent 100%);
          transform: translateX(-100%);
          animation: review-shine 7s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes review-shine {
          0%, 55% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @media (max-height: 780px) and (min-width: 900px) {
          .why-section-fit {
            padding-top: 58px !important;
            padding-bottom: 42px !important;
          }
          .testimonial-card {
            min-height: 160px !important;
          }
        }
        @media (max-width: 820px) {
          .why-content-grid {
            grid-template-columns: 1fr;
          }
          .reviews-wrap > div:first-child {
            text-align: center !important;
          }
          .review-marquee {
            height: 420px !important;
          }
          .vs-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .comparison-labels {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
          .comparison-labels > div:nth-child(2) {
            display: none;
          }
          .comparison-labels > div {
            padding-left: 0 !important;
            text-align: center;
          }
          .comparison-stats {
            grid-template-columns: 1fr !important;
          }
          .vs-bridge {
            padding: 0 !important;
          }
          .vs-bridge::before {
            display: none;
          }
        }
        @media (max-width: 768px) {
          .why-section-fit {
            min-height: auto;
            padding-top: 120px !important;
            padding-bottom: 120px !important;
          }
          .testimonial-card {
            width: min(320px, calc(100vw - 48px)) !important;
            min-height: 240px !important;
            padding: 26px !important;
          }
          .pro-card:hover, .vs-row.mobile-active .pro-card {
            transform: translateY(4px);
          }
        }
      `}</style>
    </section>
  );
}
