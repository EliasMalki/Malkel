import React, { useState } from 'react';
import { useScroll } from '../hooks/useScroll';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const scrollY = useScroll();
  const isScrolled = scrollY > 50;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav style={{
      position: 'fixed',
      top: isScrolled ? '16px' : '0',
      left: 0,
      right: 0,
      zIndex: 100,
      pointerEvents: 'none',
      padding: isScrolled ? '0 16px' : '0',
      transition: 'top 400ms cubic-bezier(0.16, 1, 0.3, 1), padding 400ms cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <div className="container" style={{
        position: 'relative',
        pointerEvents: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isScrolled ? '12px 24px' : '16px 32px',
        backgroundColor: isScrolled ? 'var(--color-nav-bg)' : 'color-mix(in srgb, var(--color-nav-bg), transparent 20%)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        border: '1px solid var(--color-nav-border)',
        boxShadow: isScrolled ? '0 8px 32px 0 var(--color-overlay-05)' : 'var(--color-panel-shadow)',
        borderRadius: '980px',
        transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        margin: '0 auto',
        width: 'fit-content',
        minWidth: 'min(90vw, 800px)',
        gap: '40px'
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '17px',
          fontWeight: 600,
          letterSpacing: '0.08em'
        }}>
          MALKEL
        </div>
        
        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`} style={{
          display: 'flex',
          gap: '32px',
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--color-text-secondary)',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          flex: 1,
          justifyContent: 'center'
        }}>
          <li className="nav-item" onClick={() => scrollToId('ecosystem')}>Ecosystem</li>
          <li className="nav-item" onClick={() => scrollToId('deployments')}>Deployments</li>
          <li className="nav-item" onClick={() => scrollToId('why-malkel')}>Why Us</li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="btn btn-success audit-btn" onClick={() => scrollToId('audit')} style={{ padding: '12px 24px', fontSize: '14px' }}>
            Book a Free Audit
          </button>
          <ThemeToggle />
          
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
              padding: '8px',
              color: 'var(--color-text-primary)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .nav-item {
          cursor: pointer;
          transition: color 200ms ease;
        }
        .nav-item:hover {
          color: var(--color-text-primary);
        }
        
        @media (max-width: 900px) {
          .mobile-menu-btn {
            display: block !important;
          }
          .audit-btn {
            display: none !important;
          }
          
          .nav-links {
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            width: 100%;
            background-color: var(--color-nav-bg);
            backdrop-filter: blur(40px) saturate(180%);
            -webkit-backdrop-filter: blur(40px) saturate(180%);
            border: 1px solid var(--color-nav-border);
            border-radius: 24px;
            flex-direction: column;
            padding: 0;
            gap: 0 !important;
            max-height: 0;
            overflow: hidden;
            transition: max-height 300ms ease, padding 300ms ease;
          }
          
          .nav-links.mobile-open {
            max-height: 400px;
            padding: 16px 0 !important;
          }
          
          .nav-links .nav-item {
            padding: 16px 24px;
            width: 100%;
            border-bottom: 1px solid var(--color-overlay-05);
          }
          .nav-links .nav-item:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </nav>
  );
}
