import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCenterHover } from '../hooks/useCenterHover';

export default function InTheWorks() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  const marketingGradient = `linear-gradient(135deg, #FF0055 0%, #FFAA00 50%, #FF00FF 100%)`;
  const salesGradient = `linear-gradient(135deg, #00EAFF 0%, #39FF14 50%, #7B2CBF 100%)`;

  const WorksCard = ({ title, eyebrow, body, gradient, gradientId }) => {
    const [cardRef, isHovered] = useCenterHover();
    
    return (
      <div ref={cardRef} className={`works-card ${isHovered ? 'mobile-active' : ''}`} style={{
        gridColumn: 'span 6',
        position: 'relative',
        borderRadius: '24px',
        // This outer div acts as the gradient border container
        padding: '2px',
        transition: 'all 500ms ease',
        transform: 'translateY(0)',
        minHeight: '400px'
      }}>
        {/* The Deep Ambient Glow Ring */}
        <div className="gradient-border-bg" style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: gradient,
          backgroundSize: '200% 200%',
          borderRadius: '24px',
          opacity: 0.5, // Massive neon bleed!
          filter: 'blur(16px)', 
          zIndex: 0
        }}></div>

        {/* The Animated Gradient Border Background */}
        <div className="gradient-border-bg" style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: gradient,
          backgroundSize: '200% 200%',
          borderRadius: '24px',
          opacity: 1, // Constantly active!
          zIndex: 0
        }}></div>

        {/* The Inner Box */}
        <div style={{
          position: 'relative',
          backgroundColor: 'var(--color-surface)', // Fluid theme color

          borderRadius: '23px',
          width: '100%',
          height: '100%',
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1,
          overflow: 'hidden'
        }}>
          
          {/* Internal Massive Multi-Glow */}
          <div className="internal-glow" style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `radial-gradient(circle at center, ${gradientId === 'marketing' ? 'rgba(255,100,50,0.25)' : 'rgba(0,250,255,0.25)'} 0%, transparent 60%)`,
            opacity: 1, // Constantly active!
            pointerEvents: 'none'
          }}></div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="animated-text-gradient" style={{ 
              display: 'inline-block',
              background: gradient,
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 700,
              marginBottom: '24px'
            }}>
              {eyebrow}
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '24px', lineHeight: 1.1 }}>{title}</h3>
            <p style={{ color: 'var(--color-overlay-60)', fontSize: '18px', lineHeight: 1.6 }}>{body}</p>
          </div>
          
          <div style={{ marginTop: 'auto', paddingTop: '32px', position: 'relative', zIndex: 2 }}>
             <div className="status-badge" style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '8px 16px', 
                backgroundColor: 'var(--color-overlay-03)', 
                border: '1px solid var(--color-overlay-10)',
                borderRadius: '100px',
                fontSize: '13px',
                color: 'var(--color-overlay-80)',
                letterSpacing: '0.05em'
             }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-text-primary)', animation: 'pulse 2s infinite' }}></div>
                IN DEVELOPMENT
             </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <section id="roadmap" className="section container" ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className={`reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div className="text-eyebrow" style={{ marginBottom: '24px' }}>Ecosystem Expansion</div>
        <h2 className="text-section-title">In the works.</h2>
        <p className="text-body-large" style={{ marginTop: '24px', maxWidth: '600px', margin: '24px auto 0' }}>
          We are currently engineering the proprietary infrastructure needed to scale outbound revenue natively through MalkEl architecture.
        </p>
      </div>

      <div className={`grid-12 reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms', width: '100%' }}>
        <WorksCard 
          eyebrow="Phase 4"
          title="MalkEl Marketing"
          body="A complete suite of engineered traffic systems. We are building programmatic ad-bidding integrations, algorithmic content pipelines, and multi-channel attribution grids that feed directly into your custom pipeline infrastructure."
          gradient={marketingGradient}
          gradientId="marketing"
        />
        <WorksCard 
          eyebrow="Phase 5"
          title="MalkEl Sales"
          body="Scaling revenue past the infrastructure. Deploying fully trained outbound SDR talent, autonomous AI voice dialing systems, and predictive lead-scoring models built directly into the core MalkEl SaaS instance."
          gradient={salesGradient}
          gradientId="sales"
        />
      </div>

      <style>{`
        .gradient-border-bg, .animated-text-gradient {
          animation: gradientPan 6s ease infinite;
        }
        
        .works-card:hover, .works-card.mobile-active {
          transform: translateY(-8px) scale(1.02) !important;
          box-shadow: 0 40px 80px -20px rgba(0,0,0,0.5);
        }
        
        @keyframes gradientPan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 var(--color-overlay-40); }
          70% { box-shadow: 0 0 0 6px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }

        @media (max-width: 1024px) {
          .grid-12 > div.works-card {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
