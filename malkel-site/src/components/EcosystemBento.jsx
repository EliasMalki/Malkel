import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTheme } from '../hooks/useTheme';

const cardsData = [
  {
    id: "websites",
    overline: "THE FRONT DOOR",
    title: "Websites",
    image: "/filesimages1/01-websites.svg",
    color: "#00D4FF",
    offerings: "Landing Pages • Booking Portals • Sales Funnels",
    tagline: "Built to convert. Wired to your pipeline.",
    description: "We don't build digital brochures. We engineer conversion infrastructure — high-speed assets that filter unqualified traffic and drive bookings into your pipeline.",
    expandedObjective: "We don't build digital brochures; we engineer conversion infrastructure. Your website should be a high-speed asset that captures attention, filters out unqualified traffic, and drives high-intent bookings directly into your pipeline.",
    expandedExamples: [
      "Service & Booking Portals: High-end web presences for service-based businesses featuring integrated, zero-friction scheduling flows.",
      "Lead-Capture Funnels: Landing pages engineered with progressive qualification forms to ensure you only talk to leads who fit your ideal customer profile.",
      "Property & Real Estate Front-Ends: Lightning-fast digital storefronts optimized to handle heavy visual assets without sacrificing load speed."
    ]
  },
  {
    id: "apps",
    overline: "THE DAILY TOOLS",
    title: "Apps",
    image: "/filesimages1/02-apps.svg",
    color: "#A855F7",
    offerings: "Internal Tools • Client Portals • Dashboards",
    tagline: "Software that fits your operation.",
    description: "Custom digital products that eliminate the gap between office and field. Workforce platforms, client portals, internal dashboards — built to fit your operation.",
    expandedObjective: "Custom digital products that eliminate the gap between your office and the field. We build the exact tools your team needs to execute daily operations flawlessly, or the portals your clients use to interact with your brand.",
    expandedExamples: [
      "Workforce Management Platforms: Enterprise-grade internal apps featuring dynamic QR clock-ins, biometric authentication, and GPS geo-perimeter tracking.",
      "Custom Financial Dashboards: Algorithmic data applications that codify complex logic into a clean, mobile-friendly interface.",
      "Client Service Portals: Secure web apps where clients can log in to view project statuses, manage high-ticket invoices, or review documentation."
    ]
  },
  {
    id: "systems",
    overline: "THE INTERNAL ENGINE",
    title: "Custom Systems",
    image: "/filesimages1/03-systems.svg",
    color: "#10B981",
    offerings: "Bespoke CRMs • Workflow Systems • API Bridges",
    tagline: "You own the data. You own the logic.",
    description: "The central nervous system of your business. We replace the duct tape between your SaaS subscriptions with a unified, bespoke database that you actually own.",
    expandedObjective: "The central nervous system of your business. We rip out the 'duct tape' holding your off-the-shelf SaaS subscriptions together and replace them with a unified database that you actually own.",
    expandedExamples: [
      "Bespoke CRM Architectures: Systems that automatically catch leads from your front door, assign them to the right team member, and track the pipeline without manual data entry.",
      "Operational & Quoting Engines: Custom logic built specifically for your profit margins, such as automated material calculators for high-margin services.",
      "API Bridges: Custom middleware that forces legacy software to communicate seamlessly with the rest of your modern tech stack."
    ]
  },
  {
    id: "ai",
    overline: "THE LEVERAGE LAYER",
    title: "AI & Automation",
    image: "/filesimages1/04-ai.svg",
    color: "#D4A056",
    offerings: "Lead Routing • Automated Follow-ups • Data Enrichment",
    tagline: "60-second response. 24/7. No humans needed.",
    description: "Asymmetric output deployed as ruthless operational leverage. MalkelAI lead triage, sub-60-second response, autonomous data enrichment.",
    expandedObjective: "Asymmetric output. We don't use AI as a gimmick; we deploy it as a ruthless operational lever to handle repetitive tasks, accelerate response times, and recover hidden yield.",
    expandedExamples: [
      "Autonomous Lead Triage (ClyxAI): Proprietary task-bots that instantly engage inbound inquiries, qualify their budget, and lock them into your calendar.",
      "Zero-Delay Follow-Up Pipelines: Automated SMS and email sequences triggered instantly, guaranteeing a sub-60-second response time.",
      "Data Enrichment: Workflows that automatically scrape and attach missing company data to incoming leads before your sales team even opens the file."
    ]
  }
];

/**
 * SVG component that renders inline SVG and injects the 'light' class via classList.
 */
function ThemedSvg({ src, alt, theme }) {
  const [svgContent, setSvgContent] = useState('');

  // Fetch the SVG content once
  useEffect(() => {
    fetch(src)
      .then(res => res.text())
      .then(text => setSvgContent(text))
      .catch(() => {});
  }, [src]);

  return (
    <div
      className={theme === 'light' ? 'light' : ''}
      aria-label={alt}
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}


export default function EcosystemBento() {
  const [activeId, setActiveId] = useState(null);
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const [hoveredId, setHoveredId] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('dark');

  // Sync with document theme attribute
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      setCurrentTheme(theme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // Initial check
    setCurrentTheme(document.documentElement.getAttribute('data-theme') || 'dark');

    return () => observer.disconnect();
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeId]);

  const scrollToAudit = () => {
    setActiveId(null);
    setTimeout(() => {
      const el = document.getElementById('audit');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // Wait for modal close animation
  };

  const activeCard = cardsData.find((c) => c.id === activeId);

  // Unified transition for premium weighted feel
  const premiumTransition = {
    type: "spring",
    stiffness: 260,
    damping: 32,
    mass: 1
  };

  return (
    <section id="ecosystem" className="section container" ref={ref} style={{ position: 'relative' }}>
      <div className={`reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ marginBottom: '80px', textAlign: 'center' }}>
        <div className="text-eyebrow" style={{ marginBottom: '18px', fontSize: '11px', letterSpacing: '0.16em' }}>
          The MalkEl Ecosystem
        </div>
        <h2 className="text-section-title" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: '18px' }}>
          One roof. Every solution.
        </h2>
        <p style={{ fontSize: '17px', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          Strategy, software, automation, and operations — engineered as a single unified system, not a stack of vendors.
        </p>
      </div>

      <div 
        className={`eco-grid reveal ${isIntersecting ? 'is-visible' : ''}`} 
        style={{ transitionDelay: '200ms' }}
      >
        {cardsData.map((card, index) => {
          const isHovered = hoveredId === card.id;
          const glowIntensity = isHovered ? 1 : 0;

          return (
            <motion.div
              layoutId={`card-${card.id}`}
              key={card.id}
              onClick={() => setActiveId(card.id)}
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="eco-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                borderColor: isHovered
                  ? `color-mix(in srgb, var(--color-overlay-08), ${card.color} 40%)`
                  : undefined,
                transform: isHovered ? 'translateY(-6px)' : undefined,
                boxShadow: isHovered ? `0 ${20}px 40px ${card.color}22` : 'none',
              }}
            >
              {/* Internal radial glow — Process section style */}
              <div style={{
                position: 'absolute',
                top: '-30px',
                left: '-30px',
                width: '200px',
                height: '200px',
                background: `radial-gradient(circle, ${card.color} 0%, transparent 60%)`,
                opacity: glowIntensity * 0.12,
                pointerEvents: 'none',
                zIndex: 0,
                transition: 'opacity 300ms ease'
              }} />

              {/* Full-bleed SVG illustration */}
              <motion.div layoutId={`image-container-${card.id}`} className="eco-card-img">
                <ThemedSvg src={card.image} alt={card.title} theme={currentTheme} />
              </motion.div>

              {/* Card body */}
              <div className="eco-card-body">
                <motion.div layoutId={`overline-${card.id}`} className="eco-card-overline" style={{
                  color: isHovered
                    ? `color-mix(in srgb, var(--color-text-secondary), ${card.color} 60%)`
                    : undefined,
                  transition: 'color 300ms ease'
                }}>
                  {card.overline}
                </motion.div>
                <motion.h3 layoutId={`title-${card.id}`} className="eco-card-title">
                  {card.title}
                </motion.h3>
                <motion.p layoutId={`description-${card.id}`} className="eco-card-desc">
                  {card.description}
                </motion.p>
                <motion.div layoutId={`tagline-${card.id}`} className="eco-card-tag" style={{
                  color: isHovered
                    ? `color-mix(in srgb, var(--color-text-primary), ${card.color} 30%)`
                    : undefined,
                  transition: 'color 300ms ease'
                }}>
                  {card.tagline}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeId && activeCard && (
          <React.Fragment>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveId(null)}
              className="eco-modal-backdrop"
            />
            <div className="eco-modal-wrapper">
              <motion.div
                layoutId={`card-${activeCard.id}`}
                className="eco-modal"
                transition={premiumTransition}
                style={{
                  borderColor: `color-mix(in srgb, var(--color-overlay-20), ${activeCard.color} 30%)`
                }}
              >
                {/* Modal internal glow */}
                <div style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '-40px',
                  width: '250px',
                  height: '250px',
                  background: `radial-gradient(circle, ${activeCard.color} 0%, transparent 60%)`,
                  opacity: 0.1,
                  pointerEvents: 'none',
                  zIndex: 0
                }} />

                <button
                  onClick={() => setActiveId(null)}
                  className="eco-modal-close"
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-overlay-20)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-overlay-10)'}
                >
                  <X size={20} />
                </button>

                {/* Modal Header */}
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
                  <motion.div layoutId={`image-container-${activeCard.id}`} className="eco-modal-img">
                    <ThemedSvg src={activeCard.image} alt={activeCard.title} theme={currentTheme} />
                  </motion.div>
                  
                  <motion.div layoutId={`overline-${activeCard.id}`} className="eco-card-overline" style={{ color: activeCard.color, marginBottom: '12px' }}>
                    {activeCard.overline}
                  </motion.div>
                  <motion.h3 layoutId={`title-${activeCard.id}`} style={{ fontSize: '36px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                    {activeCard.title}
                  </motion.h3>

                  <motion.div layoutId={`tagline-${activeCard.id}`} style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                    opacity: 0.85,
                    marginBottom: '8px',
                    letterSpacing: '-0.005em'
                  }}>
                    {activeCard.tagline}
                  </motion.div>

                  <motion.div layoutId={`description-${activeCard.id}`} style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    backgroundColor: `${activeCard.color}18`,
                    border: `1px solid ${activeCard.color}33`,
                    borderRadius: '8px',
                    color: activeCard.color,
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    width: 'fit-content'
                  }}>
                    {activeCard.offerings}
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', zIndex: 1 }}
                >
                  <div>
                    <h4 className="eco-modal-heading">
                      The Objective
                    </h4>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
                      {activeCard.expandedObjective}
                    </p>
                  </div>

                  <div>
                    <h4 className="eco-modal-heading">
                      Deployment Examples
                    </h4>
                    <ul style={{ listStyleType: 'none', padding: 0, color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '16px', lineHeight: 1.7, fontSize: '15px' }}>
                      {activeCard.expandedExamples.map((example, index) => (
                        <li key={index} style={{ paddingLeft: '20px', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: activeCard.color, fontWeight: 600 }}>→</span>
                          <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>
                            {example.split(':')[0]}:
                          </span>
                          {example.split(':').slice(1).join(':')}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: '16px' }}>
                    <button onClick={scrollToAudit} className="btn btn-success" style={{ display: 'inline-block', width: '100%', textAlign: 'center', padding: '16px' }}>
                      Book a Free Infrastructure Audit
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </React.Fragment>
        )}
      </AnimatePresence>

      <style>{`
        .eco-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          max-width: 1120px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .eco-grid {
            grid-template-columns: 1fr;
          }
        }

        .eco-card {
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          background: var(--color-overlay-03);
          border: 1px solid var(--color-overlay-08);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: background 0.25s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        [data-theme="dark"] .eco-card {
          background: rgba(255,255,255,0.03);
        }
        [data-theme="dark"] .eco-card:hover {
          background: rgba(255,255,255,0.05);
        }
        [data-theme="light"] .eco-card {
          background: #F5F5F7;
        }
        [data-theme="light"] .eco-card:hover {
          background: #EEEEF1;
        }

        .eco-card-img {
          aspect-ratio: 600 / 380;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          padding: 20px;
        }

        .eco-card-body {
          padding: 32px 28px 30px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .eco-card-overline {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 500;
          color: var(--color-text-secondary);
          opacity: 0.5;
          transition: color 300ms ease;
        }

        .eco-card-title {
          font-size: 24px;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: var(--color-text-primary);
        }

        .eco-card-desc {
          font-size: 14px;
          line-height: 1.6;
          font-weight: 400;
          letter-spacing: -0.005em;
          color: var(--color-text-secondary);
          opacity: 0.7;
          margin-top: 4px;
        }

        .eco-card-tag {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: -0.005em;
          color: var(--color-text-primary);
          opacity: 0.85;
          margin-top: auto;
          padding-top: 6px;
          transition: color 300ms ease;
        }

        /* Modal styles */
        .eco-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 999;
        }
        .eco-modal-wrapper {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 24px;
          pointer-events: none;
        }
        .eco-modal {
          background: var(--color-surface, #0A0A0A);
          border: 1px solid var(--color-overlay-20);
          border-radius: 24px;
          padding: 48px;
          width: 100%;
          max-width: 700px;
          max-height: 90vh;
          overflow-y: auto;
          overflow-x: hidden;
          position: relative;
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          gap: 32px;
          box-shadow: 0 24px 48px rgba(0,0,0,0.5);
        }
        .eco-modal-close {
          position: absolute;
          top: 24px;
          right: 24px;
          background: var(--color-overlay-10);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-primary);
          cursor: pointer;
          transition: background 200ms ease;
          z-index: 10;
        }
        .eco-modal-img {
          width: 100%;
          height: 300px;
          overflow: hidden;
          border-radius: 16px;
          position: relative;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-overlay-05);
        }
        .eco-modal-heading {
          font-size: 18px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 12px;
          border-bottom: 1px solid var(--color-overlay-10);
          padding-bottom: 8px;
        }

        /* Modal Scrollbar */
        .eco-modal::-webkit-scrollbar {
          width: 8px;
        }
        .eco-modal::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
        }
        .eco-modal::-webkit-scrollbar-thumb {
          background: var(--color-overlay-20);
          border-radius: 8px;
        }
        .eco-modal::-webkit-scrollbar-thumb:hover {
          background: var(--color-overlay-30);
        }
      `}</style>
    </section>
  );
}
