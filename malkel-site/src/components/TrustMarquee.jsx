export default function TrustMarquee() {
  const partners = [
    "GoHighLevel", "HubSpot", "OpenAI", "Stripe", "Vercel",
    "Twilio", "Zapier", "Calendly", "AWS", "Supabase"
  ];

  // Double the array to ensure seamless looping
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="section" style={{ paddingTop: '80px', paddingBottom: '80px', overflow: 'hidden' }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 'var(--layout-max-width)',
        margin: '0 auto',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}>
        <div className="marquee-container" style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          width: 'max-content'
        }}>
          {duplicatedPartners.map((partner, index) => (
            <span key={index} style={{
              display: 'inline-block',
              padding: '0 48px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-overlay-20)'
            }}>
              {partner} ·
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); } /* Translate half since array is doubled */
        }
        .marquee-container {
          animation: marquee-scroll 30s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
