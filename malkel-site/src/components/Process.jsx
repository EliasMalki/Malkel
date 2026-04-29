import { useRef, useEffect, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Process() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.05 });
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const pixelsScrolledIntoWrapper = -rect.top;
      const scrollableDistance = rect.height - windowHeight;
      
      let p = pixelsScrolledIntoWrapper / scrollableDistance;
      p = Math.max(0, Math.min(1, p)); // clamp 0 to 1
      
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    { num: '01', title: 'Audit', color: '#00D4FF', body: "We map every leak in your current stack and quantify the exact capital you're losing." },
    { num: '02', title: 'Architect', color: '#A855F7', body: "We design your unified revenue ecosystem — custom-fit to your business model, team size, and growth targets." },
    { num: '03', title: 'Deploy', color: '#10B981', body: "We build, integrate, and automate everything. Front-end, back-end, AI layer, CRM — delivered as a single unified system." },
    { num: '04', title: 'Compound', color: '#D4A056', body: "We optimize and scale your infrastructure over time. The longer we work together, the higher your yield." }
  ];

  return (
    <section id="process" ref={(el) => { ref.current = el; wrapperRef.current = el; }} style={{ height: '300vh', position: 'relative' }}>
        
      <div className={`container reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ 
        position: 'sticky', 
        top: '20vh', 
        height: 'auto' 
      }}>
        
        <div style={{ marginBottom: '80px', textAlign: 'center' }}>
          <div className="text-eyebrow" style={{ marginBottom: '24px' }}>
            How it works
          </div>
          <h2 className="text-section-title">
            From fragmented to compounding.
          </h2>
        </div>

        <div style={{ position: 'relative', marginTop: '60px' }}>
          
          {/* Track Line placed ABOVE the cards completely, no overlap */}
          <div style={{
            position: 'absolute',
            top: '-40px',
            left: 0,
            width: '100%',
            height: '2px',
            backgroundColor: 'var(--color-overlay-05)',
            zIndex: 0
          }} className="progress-track" />

          {/* Active Gradient Line */}
          <div style={{
            position: 'absolute',
            top: '-40px',
            left: 0,
            height: '2px',
            // Uses a gradient blending all 4 colors up to the current progress
            background: 'linear-gradient(90deg, #00D4FF 0%, #A855F7 33%, #10B981 66%, #D4A056 100%)',
            width: `${progress * 100}%`,
            boxShadow: '0 0 12px var(--color-overlay-20)',
            transition: 'width 75ms linear',
            zIndex: 1
          }} className="progress-fill" />

          <div className="grid-12" style={{ position: 'relative', zIndex: 2 }}>
            {steps.map((step, idx) => {
              // Interpolation calculations for "glow more the more you go through"
              // Starts glowing when line hits it (startThreshold), hits max glow when line passes (endThreshold),
              // and slowly scales the shadow/opacity up continuously.
              const startThreshold = idx * 0.25;
              const endThreshold = (idx + 1) * 0.25;
              
              let localIntensity = 0;
              if (progress > startThreshold) {
                // localIntensity goes from 0 to 1 dynamically
                localIntensity = Math.min(1, (progress - startThreshold) / (endThreshold - startThreshold));
              }

              return (
                <div key={idx} style={{ 
                  gridColumn: 'span 3', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '24px',
                  backgroundColor: 'var(--color-overlay-03)',
                  border: `1px solid var(--color-overlay-08)`,
                  borderColor: `color-mix(in srgb, var(--color-overlay-08), ${step.color} ${localIntensity * 40}%)`,
                  borderRadius: '16px',
                  padding: '40px 32px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 75ms linear, transform 200ms ease, box-shadow 75ms linear',
                  transform: localIntensity > 0 ? `translateY(-${localIntensity * 8}px)` : 'translateY(0)',
                  boxShadow: localIntensity > 0 ? `0 ${localIntensity * 20}px 40px ${step.color}22` : 'none'
                }}>
                  
                  {/* Internal Card Background glow mapping to localIntensity */}
                  <div style={{
                    position: 'absolute',
                    top: '-50px',
                    left: '-50px',
                    width: '150px',
                    height: '150px',
                    background: `radial-gradient(circle, ${step.color} 0%, transparent 60%)`,
                    opacity: localIntensity * 0.15,
                    pointerEvents: 'none',
                    zIndex: 0
                  }}></div>

                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '80px',
                    fontWeight: 500,
                    // Blends from flat grey to fully saturated color continuously
                    color: `color-mix(in srgb, var(--color-overlay-10), ${step.color} ${localIntensity * 100}%)`,
                    textShadow: `0 0 ${localIntensity * 32}px ${step.color}66`,
                    lineHeight: 1,
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {step.num}
                  </div>
                  
                  <div style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: `color-mix(in srgb, var(--color-overlay-40), var(--color-text-primary) ${localIntensity * 100}%)`,
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {step.title}
                  </div>
                  
                  <p className="text-body-small" style={{ 
                    color: `color-mix(in srgb, var(--color-overlay-30), var(--color-overlay-80) ${localIntensity * 100}%)`,
                    position: 'relative',
                    zIndex: 1,
                    lineHeight: 1.6
                  }}>
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .grid-12 > div {
            grid-column: span 6 !important;
            margin-bottom: 24px;
          }
          .progress-track, .progress-fill {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .grid-12 > div {
            grid-column: span 12 !important;
            margin-bottom: 24px;
          }
        }
      `}</style>
    </section>
  );
}
