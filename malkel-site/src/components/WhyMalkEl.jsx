import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCenterHover } from '../hooks/useCenterHover';

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
    }
  ];

  const ComparisonRow = ({ con, pro }) => {
    const [rowRef, isCenterHovered] = useCenterHover();
    return (
      <div ref={rowRef} className={`vs-row ${isCenterHovered ? 'mobile-active' : ''}`} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', gap: '20px', alignItems: 'center', width: '100%' }}>
        
        <div style={{ backgroundColor: 'var(--color-overlay-02)', border: '1px dashed var(--color-overlay-10)', borderRadius: '12px', padding: '24px 32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff5555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.8 }}><path d="M18 6L6 18M6 6l12 12"/></svg>
          <span style={{ color: 'var(--color-overlay-60)', fontSize: '18px' }}>{con}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0 10px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-overlay-20)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 300ms ease' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>

        <div className="pro-card" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '24px 32px', display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', overflow: 'hidden', transition: 'all 400ms ease' }}>
           <div className="pro-glow" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at right, rgba(16, 185, 129, 0.2) 0%, transparent 60%)', pointerEvents: 'none', opacity: 0, transition: 'opacity 400ms ease' }}></div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M20 6L9 17l-5-5"/></svg>
          <span style={{ color: 'white', fontSize: '18px', fontWeight: 600, position: 'relative', zIndex: 1 }}>{pro}</span>
        </div>
      </div>
    );
  };

  const WhyCard = ({ title, body, color }) => {
    const [cardRef, isCenterHovered] = useCenterHover();
    return (
      <div ref={cardRef} className={`why-card ${isCenterHovered ? 'mobile-active' : ''}`} style={{ gridColumn: 'span 4', backgroundColor: 'var(--color-overlay-03)', border: '1px solid var(--color-overlay-08)', borderRadius: '16px', padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: '20px', transition: 'all 400ms ease', position: 'relative', overflow: 'hidden', '--theme-color': color }}>
        <div className="hover-glow" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `radial-gradient(circle at top, var(--theme-color)22 0%, transparent 60%)`, opacity: 0, transition: 'opacity 400ms ease', pointerEvents: 'none' }}></div>
        <div className="text-eyebrow" style={{ color: 'var(--theme-color)' }}>{title}</div>
        <p className="text-body" style={{ color: 'var(--color-overlay-80)', position: 'relative', zIndex: 1, fontSize: '18px' }}>
          {body}
        </p>
      </div>
    );
  };

  return (
    <section id="why-malkel" className="section container" ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div className={`reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div className="text-eyebrow" style={{ marginBottom: '24px' }}>
          Why MalkEl
        </div>
        <h2 className="text-section-title">
          Built by operators, for operators.
        </h2>
      </div>

      <div className={`grid-12 reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms', width: '100%', marginBottom: '100px' }}>
        
        <WhyCard 
          title="Phase 1: The Premise"
          color="#00D4FF"
          body="MalkEl was founded on a simple premise: the businesses that scale fastest aren't the ones with the biggest budgets — they're the ones whose software works as hard as they do."
        />
        
        <WhyCard 
          title="Phase 2: The Partnership"
          color="#A855F7"
          body="We don't sell websites and disappear. We become the engineering infrastructure behind your business — strategy, software, automation, and operations, all under one roof."
        />

        <WhyCard 
          title="Phase 3: The Process"
          color="#10B981"
          body="Every engagement starts with an audit. Every solution is engineered for yield. Every system is built to reliably compound and multiply over time."
        />

      </div>

      <div className={`reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ 
        transitionDelay: '400ms', 
        width: '100%', 
        maxWidth: '1000px', 
        margin: '0 auto', 
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        marginBottom: '120px'
      }}>
        <div className="text-eyebrow" style={{ textAlign: 'center', marginBottom: '16px' }}>The standard model vs. The MalkEl Way</div>
        <ComparisonRow con="Six or more disconnected vendors and unmanaged API bridges." pro="One dedicated engineering partner mapping the entire architecture." />
        <ComparisonRow con="Manual follow-ups and heavily delayed lead response times." pro="Autonomous AI response handling inquiries in under 60 seconds." />
        <ComparisonRow con="Expensive rigid software that behaves strictly like an expense column." pro="Bespoke operational software engineered purely as a yielding capital asset." />
        <ComparisonRow con="Agencies build a static project and immediately disappear." pro="Embedded long-term infrastructural support iterating on live results." />
      </div>

      {/* Testimonials */}
      <div className={`grid-12 reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ transitionDelay: '600ms', width: '100%' }}>
        {testimonials.map((t, idx) => (
          <div key={idx} style={{ 
            gridColumn: 'span 4',
            backgroundColor: 'var(--color-overlay-03)',
            border: '1px solid var(--color-overlay-05)',
            borderRadius: '16px',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '32px'
          }}>
            <p className="text-body" style={{ color: 'var(--color-text-primary)', fontStyle: 'italic', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '-16px', left: '-16px', fontSize: '48px', color: 'var(--color-overlay-10)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>"</span>
              {t.quote}
            </p>
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px' }}>{t.author}</div>
              <div style={{ color: '#10B981', fontSize: '13px', marginTop: '4px' }}>{t.role}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .why-card:hover, .why-card.mobile-active {
          border-color: var(--theme-color) !important;
          transform: translateY(-4px);
          box-shadow: 0 0 40px -10px var(--theme-color);
        }
        .why-card:hover .hover-glow, .why-card.mobile-active .hover-glow {
          opacity: 1 !important;
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
        @media (max-width: 1024px) {
          .grid-12 > div.why-card, .grid-12 > div.bento-card {
            grid-column: span 12 !important;
          }
        }
        @media (max-width: 768px) {
          .vs-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .vs-row > div:nth-child(2) svg {
            transform: rotate(90deg);
          }
          .pro-card:hover, .vs-row.mobile-active .pro-card {
            transform: translateY(4px);
          }
        }
      `}</style>
    </section>
  );
}
