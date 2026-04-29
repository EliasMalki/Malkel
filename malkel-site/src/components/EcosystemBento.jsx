import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const cardsData = [
  {
    id: "websites",
    overline: "THE FRONT DOOR",
    title: "Websites",
    image: "/images/ecosystem/websites.png",
    offerings: "Landing Pages • Booking Portals • Sales Funnels",
    description: "High-speed, conversion-focused business sites engineered for first impressions and immediate lead capture.",
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
    image: "/images/ecosystem/apps.png",
    offerings: "Internal Tools • Client Portals • Dashboards",
    description: "Custom web or mobile applications built directly around your team to streamline operations and elevate client experience.",
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
    image: "/images/ecosystem/systems.png",
    offerings: "Bespoke CRMs • Workflow Systems • API Bridges",
    description: "Operational databases that unify your data, eliminate friction, and replace disconnected off-the-shelf SaaS tools.",
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
    image: "/images/ecosystem/ai.png",
    offerings: "Lead Routing • Automated Follow-ups • Data Enrichment",
    description: "Intelligent workflow acceleration deployed strictly where it creates measurable asymmetric ROI.",
    expandedObjective: "Asymmetric output. We don't use AI as a gimmick; we deploy it as a ruthless operational lever to handle repetitive tasks, accelerate response times, and recover hidden yield.",
    expandedExamples: [
      "Autonomous Lead Triage (ClyxAI): Proprietary task-bots that instantly engage inbound inquiries, qualify their budget, and lock them into your calendar.",
      "Zero-Delay Follow-Up Pipelines: Automated SMS and email sequences triggered instantly, guaranteeing a sub-60-second response time.",
      "Data Enrichment: Workflows that automatically scrape and attach missing company data to incoming leads before your sales team even opens the file."
    ]
  }
];

export default function EcosystemBento() {
  const [activeId, setActiveId] = useState(null);
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

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

  const activeCard = cardsData.find((c) => c.id === activeId);

  return (
    <section id="ecosystem" className="section container" ref={ref} style={{ position: 'relative' }}>
      <div className={`reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ marginBottom: '64px', textAlign: 'center' }}>
        <div className="text-eyebrow" style={{ marginBottom: '24px' }}>
          The MalkEl Ecosystem
        </div>
        <h2 className="text-section-title">
          One roof. Every solution.
        </h2>
      </div>

      <div 
        className={`bento-grid reveal ${isIntersecting ? 'is-visible' : ''}`} 
        style={{ 
          transitionDelay: '200ms',
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}
      >
        {cardsData.map((card) => (
          <motion.div
            layoutId={`card-${card.id}`}
            key={card.id}
            onClick={() => setActiveId(card.id)}
            className="bento-card-interactive"
            style={{
              backgroundColor: 'var(--color-overlay-05)',
              border: '1px solid var(--color-overlay-10)',
              borderRadius: '16px',
              padding: '0',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}
            whileHover={{ y: -4, borderColor: 'var(--color-overlay-20)', backgroundColor: 'var(--color-overlay-08)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Card Image Wrapper */}
            <motion.div layoutId={`image-container-${card.id}`} style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative' }}>
              <motion.img 
                layoutId={`image-${card.id}`}
                src={card.image} 
                alt={card.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, var(--color-surface) 0%, transparent 100%)',
                opacity: 0.8
              }} />
            </motion.div>

            {/* Card Content Wrapper */}
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              <motion.div layoutId={`overline-${card.id}`} className="text-eyebrow" style={{ color: 'var(--color-accent)' }}>
                {card.overline}
              </motion.div>
              <motion.h3 layoutId={`title-${card.id}`} style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {card.title}
              </motion.h3>
              
              <motion.div layoutId={`offerings-${card.id}`} style={{
                display: 'inline-block',
                padding: '6px 12px',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '8px',
                color: 'var(--color-accent)',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.02em'
              }}>
                {card.offerings}
              </motion.div>

              <motion.p layoutId={`description-${card.id}`} style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginTop: 'auto' }}>
                {card.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeId && activeCard && (
          <React.Fragment>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveId(null)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                zIndex: 999
              }}
            />
            <div style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '24px',
              pointerEvents: 'none'
            }}>
              <motion.div
                layoutId={`card-${activeCard.id}`}
                style={{
                  backgroundColor: '#0A0A0A',
                  border: '1px solid var(--color-overlay-20)',
                  borderRadius: '24px',
                  padding: '48px',
                  width: '100%',
                  maxWidth: '700px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  position: 'relative',
                  pointerEvents: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.5)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <button
                  onClick={() => setActiveId(null)}
                  style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    background: 'var(--color-overlay-10)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-primary)',
                    cursor: 'pointer',
                    transition: 'background 200ms ease',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-overlay-20)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-overlay-10)'}
                >
                  <X size={20} />
                </button>

                {/* Modal Header containing Image and Title */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <motion.div layoutId={`image-container-${activeCard.id}`} style={{ width: '100%', height: '240px', overflow: 'hidden', borderRadius: '16px', position: 'relative', marginBottom: '32px' }}>
                    <motion.img 
                      layoutId={`image-${activeCard.id}`}
                      src={activeCard.image} 
                      alt={activeCard.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10, 10, 10, 1) 0%, transparent 100%)'
                    }} />
                  </motion.div>
                  
                  <motion.div layoutId={`overline-${activeCard.id}`} className="text-eyebrow" style={{ color: 'var(--color-accent)', marginBottom: '12px' }}>
                    {activeCard.overline}
                  </motion.div>
                  <motion.h3 layoutId={`title-${activeCard.id}`} style={{ fontSize: '36px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '16px' }}>
                    {activeCard.title}
                  </motion.h3>

                  <motion.div layoutId={`offerings-${activeCard.id}`} style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: '8px',
                    color: 'var(--color-accent)',
                    fontSize: '14px',
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
                  style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                >
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '12px', borderBottom: '1px solid var(--color-overlay-10)', paddingBottom: '8px' }}>
                      The Objective
                    </h4>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                      {activeCard.expandedObjective}
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '12px', borderBottom: '1px solid var(--color-overlay-10)', paddingBottom: '8px' }}>
                      Deployment Examples
                    </h4>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '24px', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '12px', lineHeight: 1.6 }}>
                      {activeCard.expandedExamples.map((example, index) => (
                        <li key={index}>
                          <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>
                            {example.split(':')[0]}:
                          </span>
                          {example.split(':')[1]}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: '16px' }}>
                    <a href="#contact" onClick={() => setActiveId(null)} className="btn btn-primary" style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                      Book an Infrastructure Audit
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </React.Fragment>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        .bento-card-interactive::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 300ms ease;
          pointer-events: none;
        }
        .bento-card-interactive:hover::before {
          opacity: 1;
        }
        
        /* Modal Scrollbar Styling */
        div::-webkit-scrollbar {
          width: 8px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
        }
        div::-webkit-scrollbar-thumb {
          background: var(--color-overlay-20);
          border-radius: 8px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: var(--color-overlay-30);
        }
      `}</style>
    </section>
  );
}
