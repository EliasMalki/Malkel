export default function Footer() {
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{ 
      borderTop: '1px solid var(--color-overlay-08)', 
      paddingTop: '80px', 
      paddingBottom: '40px',
      backgroundColor: 'var(--color-bg)'
    }}>
      <div className="container">
        <div className="grid-12" style={{ gap: '48px', marginBottom: '80px' }}>
          
          <div className="footer-brand-col" style={{ gridColumn: 'span 4' }}>
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '17px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                marginBottom: '16px',
                cursor: 'pointer'
              }}
            >
              MALKEL
            </div>
            <p className="text-body-small" style={{ color: 'var(--color-text-tertiary)', lineHeight: '1.6' }}>
              Full-service software & business agency. Strategy, engineering, automation, and operations — under one roof, engineered for yield.
            </p>
          </div>

          <div style={{ gridColumn: 'span 3' }}>
            <div className="text-eyebrow" style={{ marginBottom: '24px', color: 'var(--color-text-primary)' }}>Services</div>
            <ul className="footer-links">
              <li onClick={() => scrollToId('ecosystem')}>Websites</li>
              <li onClick={() => scrollToId('ecosystem')}>Apps</li>
              <li onClick={() => scrollToId('ecosystem')}>Custom Systems</li>
              <li onClick={() => scrollToId('ecosystem')}>AI & Automation</li>
            </ul>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <div className="text-eyebrow" style={{ marginBottom: '24px', color: 'var(--color-text-primary)' }}>Company</div>
            <ul className="footer-links">
              <li onClick={() => scrollToId('ecosystem')}>Ecosystem</li>
              <li onClick={() => scrollToId('deployments')}>Deployments</li>
              <li onClick={() => scrollToId('why-malkel')}>Why Us</li>
              <li onClick={() => scrollToId('audit')}>Book an Audit</li>
            </ul>
          </div>

          <div style={{ gridColumn: 'span 3' }}>
            <div className="text-eyebrow" style={{ marginBottom: '24px', color: 'var(--color-text-primary)' }}>Contact</div>
            <ul className="footer-links">
              <li onClick={() => scrollToId('audit')}>Book an Audit</li>
              <li><a href="mailto:hello@malkel.com" style={{ transition: 'color 200ms ease' }}>hello@malkel.com</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom-row" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          paddingTop: '32px',
          borderTop: '1px solid var(--color-overlay-08)',
          fontSize: '14px',
          color: 'var(--color-text-tertiary)'
        }}>
          <div>&copy; {new Date().getFullYear()} MalkEl Solutions. All rights reserved.</div>
          <div className="footer-legal">
            <span>Privacy Policy</span>
            <span style={{ margin: '0 16px' }}>•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
          font-size: 14px;
        }
        .footer-links li, .footer-legal span {
          color: var(--color-text-tertiary);
          cursor: pointer;
          transition: color 200ms ease;
        }
        .footer-links li:hover, .footer-links li a:hover, .footer-legal span:hover {
          color: var(--color-text-primary);
        }
        @media (max-width: 1024px) {
          .grid-12 > div { grid-column: span 6 !important; }
        }
        @media (max-width: 768px) {
          footer {
            padding-top: 60px !important;
            padding-bottom: 40px !important;
            text-align: center;
          }
          .grid-12 {
            gap: 36px !important;
            margin-bottom: 60px !important;
          }
          .grid-12 > div { 
            grid-column: span 12 !important; 
          }
          .footer-links {
            align-items: center;
            gap: 12px;
          }
          .footer-bottom-row {
            flex-direction: column !important;
            align-items: center !important;
            gap: 16px !important;
          }
          .footer-brand-col p {
            max-width: 320px;
            margin: 0 auto;
          }
        }
      `}</style>
    </footer>
  );
}
