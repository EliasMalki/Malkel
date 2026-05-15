import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Marquee } from './ui/marquee';

export default function WhyMalkEl() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  const testimonials = [
    {
      quote: "MalkEl didn't just build us a site, they re-architected how we make money. Our lead response dropped from hours to seconds.",
      author: "Felipe H",
      industry: "Finance",
      role: "Portfolio manager 2M+",
      action: "Revenue Architecture",
      color: "#3B82F6"
    },
    {
      quote: "The only tech partner we've used where we don't have to manage them. They function like an embedded CTO.",
      author: "Sarah W.",
      industry: "Cloud Software",
      role: "SaaS Founder",
      action: "Embedded Technical Operations",
      color: "#06B6D4"
    },
    {
      quote: "The audit alone surfaced revenue leaks our internal team had stopped seeing.",
      author: "Omar ALG.",
      industry: "Restauration",
      role: "Founder, Franchisor",
      action: "Operational Audit",
      color: "#F97316"
    },
    {
      quote: "Every other agency wanted to sell us tools. MalkEl audited our pipeline and built an automated asset that compounds.",
      author: "Richard S",
      industry: "Contractors",
      role: "Manager",
      action: "Pipeline Automation",
      color: "#EAB308"
    },
    {
      quote: "They gave us one operating layer instead of another pile of disconnected automations.",
      author: "David M",
      industry: "Security",
      role: "Head of Group",
      action: "System Unification",
      color: "#10B981"
    },
    {
      quote: "The precision of their engineering is unmatched. They understand high-stakes infrastructure.",
      author: "Benoit G",
      industry: "Aerospace",
      role: "Head of Verification and Validation",
      action: "Systems Optimization",
      color: "#8B5CF6"
    },
    {
      quote: "Clean build, clear thinking, and the backend actually matches how our team works.",
      author: "Khaled A-M",
      industry: "Automotive",
      role: "CEO",
      action: "Backend Development",
      color: "#EF4444"
    },
    {
      quote: "They automated our patient intake and follow-ups. We're seeing more patients with less administrative friction.",
      author: "Dr. Aris S.",
      industry: "Dental",
      role: "Chief of Surgery",
      action: "Clinical Automation",
      color: "#14B8A6"
    },
    {
      quote: "Building a digital asset that handles property intake and agent distribution at scale has completely changed our firm's velocity.",
      author: "Jonathan S",
      industry: "Real Estate",
      role: "President of firm",
      action: "Platform Infrastructure",
      color: "#EC4899"
    }
  ];

  const comparisonRows = [
    {
      con: "Too many tools, too many handoffs.",
      pro: "One operating partner, one connected system."
    },
    {
      con: "Slow replies, manual follow-up, missed intent.",
      pro: "AI-first response and qualification in real time."
    },
    {
      con: "Software shipped once, then left behind.",
      pro: "Infrastructure supported, refined, and expanded over time."
    },
    {
      con: "Build for output.",
      pro: "Build for revenue leverage."
    },
    {
      con: "Dashboards that describe what went wrong.",
      pro: "Live systems that decide what happens next."
    }
  ];

  const ComparisonRow = ({ con, pro, index }) => {
    return (
      <div className="vs-row" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', gap: '20px', alignItems: 'stretch', width: '100%', position: 'relative' }}>

        <div className="legacy-card" style={{ backgroundColor: 'rgba(255, 85, 85, 0.035)', border: '1px dashed rgba(255, 85, 85, 0.35)', borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', minHeight: '58px', minWidth: 0, position: 'relative' }}>
          <div className="mobile-vs-label legacy" style={{ display: 'none', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ff7777', width: '100%', paddingBottom: '4px', borderBottom: '1px solid rgba(255, 85, 85, 0.15)' }}>Legacy Model</div>
          <div className="card-content" style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.8 }}><path d="M18 6L6 18M6 6l12 12" /></svg>
            <span style={{ color: 'var(--color-text-primary)', fontSize: '14px', lineHeight: 1.35 }}>{con}</span>
          </div>
        </div>

        <div className="vs-bridge" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 8px', position: 'relative' }}>
          <span style={{ width: '34px', height: '34px', borderRadius: '999px', border: '1px solid var(--color-overlay-10)', backgroundColor: 'var(--color-bg)', display: 'grid', placeItems: 'center', color: 'var(--color-overlay-40)', fontSize: '12px', fontWeight: 600 }}>{String(index + 1).padStart(2, '0')}</span>
        </div>

        {/* Mobile Arrow */}
        <div className="mobile-arrow" style={{ display: 'none' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-overlay-40)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
        </div>

        <div className="pro-card" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.6)', borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', overflow: 'hidden', minHeight: '58px', minWidth: 0, boxShadow: '0 0 30px -10px rgba(16, 185, 129, 0.4)' }}>
          <div className="mobile-vs-label pro" style={{ display: 'none', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#10B981', width: '100%', paddingBottom: '4px', borderBottom: '1px solid rgba(16, 185, 129, 0.2)', position: 'relative', zIndex: 2 }}>The MalkEl Way</div>
          <div className="pro-glow" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at right, rgba(16, 185, 129, 0.2) 0%, transparent 60%)', pointerEvents: 'none', opacity: 1 }}></div>
          <div className="pro-shine" style={{ position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.2), transparent)', pointerEvents: 'none', animation: 'shine 7s ease-in-out infinite' }}></div>
          <div className="card-content" style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', position: 'relative', zIndex: 1 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M20 6L9 17l-5-5" /></svg>
            <span style={{ color: 'var(--color-text-primary)', fontSize: '14px', lineHeight: 1.35, fontWeight: 600 }}>{pro}</span>
          </div>
        </div>
      </div>
    );
  };

  const TestimonialCard = ({ testimonial }) => (
    <div className="testimonial-card" style={{
      width: '340px',
      minHeight: '180px',
      backgroundColor: 'var(--color-panel-bg)',
      border: '1px solid var(--color-panel-border)',
      borderRadius: '14px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'var(--color-panel-shadow)',
      backdropFilter: 'blur(18px) saturate(120%)',
      WebkitBackdropFilter: 'blur(18px) saturate(120%)'
    }}>
      {/* Top: Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1, borderBottom: '1px solid var(--color-overlay-10)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-text-primary)' }}>{testimonial.author}</div>
          <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px', fontWeight: 500 }}>{testimonial.role}</div>
        </div>

        <div style={{
          color: testimonial.color,
          fontSize: '10px',
          fontWeight: 700,
          backgroundColor: `${testimonial.color}15`,
          padding: '4px 10px',
          borderRadius: '999px',
          border: `1px solid ${testimonial.color}30`,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {testimonial.industry}
        </div>
      </div>

      {/* Bottom: Action, Review, and Stars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#10B981', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {testimonial.action}
          </div>
          <div style={{ display: 'flex', gap: '4px', color: '#D4A056' }}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <span key={idx} aria-hidden="true" style={{ fontSize: '14px', lineHeight: 1 }}>★</span>
            ))}
          </div>
        </div>

        <p className="text-body" style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
          "{testimonial.quote}"
        </p>
      </div>
    </div>
  );

  return (
    <section id="why-malkel" className="section container why-section-fit" ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <div className={`why-header reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div className="text-eyebrow" style={{ marginBottom: '12px' }}>
          Why MalkEl
        </div>
        <h2 className="text-section-title" style={{ fontSize: 'clamp(34px, 4vw, 54px)' }}>
          Built by operators, for operators.
        </h2>
        <p className="why-header-desc text-body-large" style={{ color: 'var(--color-overlay-60)', maxWidth: '720px', margin: '14px auto 0', fontSize: '15px', lineHeight: 1.4 }}>
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
        </div>

        {/* Testimonials */}
        <div className={`reviews-wrap reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ transitionDelay: '400ms', width: '100%', overflow: 'hidden' }}>
          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            <div className="text-eyebrow" style={{ color: 'var(--color-overlay-60)', marginBottom: '8px' }}>Operator reviews</div>
            <h3 style={{ fontSize: 'clamp(24px, 2vw, 32px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Quiet systems. Loud outcomes.
            </h3>
          </div>
          <Marquee pauseOnHover repeat={4} className="review-marquee [--duration:40s] [--gap:1.5rem]" style={{
            width: '100%',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            padding: '10px 0'
          }}>
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={`${testimonial.author}-${idx}`} testimonial={testimonial} />
            ))}
          </Marquee>
        </div>
      </div>

      <style>{`
        .why-section-fit {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: clamp(72px, 8vh, 96px) !important;
          padding-bottom: clamp(48px, 6vh, 72px) !important;
          max-width: 1400px;
        }
        .why-content-grid {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 4vh, 60px);
          align-items: stretch;
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
        @keyframes shine {
          0%, 55% { left: -100%; }
          100% { left: 100%; }
        }
        .testimonial-card {
          transition: transform 300ms ease, border-color 300ms ease, background-color 300ms ease;
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
          border-color: rgba(16, 185, 129, 0.28) !important;
          background-color: var(--color-overlay-04) !important;
        }
        @media (max-width: 820px) {
          .mobile-vs-label {
            display: block !important;
          }
          .comparison-labels {
            display: none !important;
          }
          .vs-row {
            display: flex !important;
            flex-direction: column !important;
            gap: 12px !important;
            padding-top: 16px;
            padding-bottom: 24px;
            border-bottom: 1px solid var(--color-overlay-05);
          }
          .vs-row:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          .vs-bridge {
            order: 1;
            margin: 0 auto;
            padding: 0 !important;
          }
          .legacy-card {
            order: 2;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
            padding: 16px 20px !important;
          }
          .mobile-arrow {
            display: flex !important;
            order: 3;
            justify-content: center;
            color: var(--color-overlay-40);
            margin: 4px 0;
          }
          .pro-card {
            order: 4;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
            padding: 16px 20px !important;
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
        }
        @media (max-height: 1000px) {
          .why-section-fit {
            justify-content: flex-start !important;
            padding-top: 10px !important;
            padding-bottom: 24px !important;
          }
          .why-header {
            margin-bottom: 20px !important;
          }
          .why-header-desc {
            margin-top: 8px !important;
            font-size: 14px !important;
            line-height: 1.4 !important;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .why-content-grid {
            gap: 20px;
          }
          .comparison-labels {
            margin-bottom: 8px !important;
          }
          .vs-row {
            padding: 4px 8px !important;
            gap: 16px !important;
          }
          .legacy-card, .pro-card {
            padding: 10px 14px !important;
            min-height: 52px !important;
            gap: 12px !important;
          }
          .legacy-card .card-content span, .pro-card .card-content span {
            font-size: 13px !important;
            line-height: 1.3 !important;
          }
          .testimonial-card {
            min-height: 120px !important;
            padding: 16px !important;
            gap: 12px !important;
          }
          .text-eyebrow {
            margin-bottom: 4px !important;
            font-size: 12px !important;
          }
          .text-section-title {
            font-size: clamp(26px, 3.5vw, 40px) !important;
            margin-bottom: 8px !important;
          }
          .reviews-wrap h3 {
             font-size: 20px !important;
             margin-bottom: 8px !important;
          }
          .reviews-wrap > div {
             margin-bottom: 8px !important;
          }
          .review-marquee {
            padding: 0 !important;
            margin-top: 12px !important;
          }
          .vs-bridge {
             margin: -2px auto !important;
          }
          .vs-bridge span {
             width: 30px !important;
             height: 30px !important;
             font-size: 11px !important;
          }
          .testimonial-author-name {
             font-size: 14px !important;
          }
          .testimonial-author-role {
             font-size: 12px !important;
          }
          .testimonial-quote {
             font-size: 13px !important;
             line-height: 1.4 !important;
             display: -webkit-box;
             -webkit-line-clamp: 3;
             -webkit-box-orient: vertical;
             overflow: hidden;
          }
        }
      `}</style>
    </section>
  );
}
