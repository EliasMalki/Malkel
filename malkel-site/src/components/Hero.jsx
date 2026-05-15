import { useScroll } from '../hooks/useScroll';

export default function Hero() {
  const scrollY = useScroll();

  const translateY = scrollY * 0.18;
  const opacity = Math.max(0, 1 - scrollY / 500);

  return (
    <section style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      paddingTop: '80px', // offset for nav
      overflow: 'hidden'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transform: `translateY(${translateY}px)`,
        opacity: opacity,
        willChange: 'transform, opacity'
      }}>
        <div className="text-eyebrow" style={{ marginBottom: '24px' }}>
          Full-service software & business agency
        </div>
        
        <h1 className="text-hero" style={{ maxWidth: '900px', marginBottom: '24px' }}>
          MalkEl Solutions
        </h1>
        <h2 style={{ 
          fontSize: 'clamp(28px, 4vw, 42px)', 
          fontWeight: 500, 
          color: 'var(--color-overlay-80)', 
          maxWidth: '900px', 
          marginBottom: '32px', 
          lineHeight: 1.2, 
          letterSpacing: '-0.02em' 
        }}>
          The only software partner your business will ever need.
        </h2>
        
        <p className="text-body-large" style={{ maxWidth: '640px', color: 'var(--color-overlay-60)', marginBottom: '48px' }}>
          We engineer end-to-end optimization and effortless scaling. Your dedicated CTO and full engineering team, under one roof.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => document.getElementById('ecosystem')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore the Ecosystem
          </button>
          <button className="btn btn-success" onClick={() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })}>
            Book a Free Audit
          </button>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: opacity,
        gap: '8px'
      }}>
        <div style={{
          width: '1px',
          height: '40px',
          backgroundColor: 'var(--color-overlay-20)'
        }}></div>
        <div className="text-eyebrow" style={{ fontSize: '11px', color: 'var(--color-overlay-40)' }}>
          Scroll
        </div>
      </div>
    </section>
  );
}
