export default function Footer() {
  return (
    <footer style={{ 
      borderTop: '1px solid var(--color-overlay-08)', 
      paddingTop: '80px', 
      paddingBottom: '40px' 
    }}>
      <div className="container">
        <div className="grid-12" style={{ gap: '48px', marginBottom: '80px' }}>
          
          <div style={{ gridColumn: 'span 4' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '17px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              marginBottom: '16px'
            }}>
              MALKEL
            </div>
            <p className="text-body-small" style={{ color: 'var(--color-text-tertiary)' }}>
              Full-service software & business agency. Strategy, engineering, automation, and operations — under one roof, engineered for yield.
            </p>
          </div>

          <div style={{ gridColumn: 'span 3' }}>
            <div className="text-eyebrow" style={{ marginBottom: '24px', color: 'var(--color-text-primary)' }}>Services</div>
            <ul className="footer-links">
              <li>ClyxAI Automation</li>
              <li>Digital Storefronts</li>
              <li>Core CRM Build</li>
              <li>Custom Engineering</li>
              <li>Workforce Platform</li>
            </ul>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <div className="text-eyebrow" style={{ marginBottom: '24px', color: 'var(--color-text-primary)' }}>Company</div>
            <ul className="footer-links">
              <li>About</li>
              <li>Process</li>
              <li>FAQ</li>
              <li>Case Studies</li>
            </ul>
          </div>

          <div style={{ gridColumn: 'span 3' }}>
            <div className="text-eyebrow" style={{ marginBottom: '24px', color: 'var(--color-text-primary)' }}>Contact</div>
            <ul className="footer-links">
              <li>Book an Audit</li>
              <li>hello@malkel.com</li>
              <li>LinkedIn</li>
              <li>Instagram</li>
            </ul>
          </div>

        </div>

        <div style={{ 
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
        .footer-links li:hover, .footer-legal span:hover {
          color: var(--color-text-primary);
        }
        @media (max-width: 1024px) {
          .grid-12 > div { grid-column: span 6 !important; }
        }
        @media (max-width: 768px) {
          .grid-12 > div { grid-column: span 12 !important; }
        }
      `}</style>
    </footer>
  );
}
