import { useState, useEffect } from 'react';
import { ArrowUpRight, Building2, Layers3, Package, X } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCenterHover } from '../hooks/useCenterHover';
import { FlickeringGrid } from './ui/FlickeringGrid';
import { ShineBorder } from './ui/shine-border';

export default function Projects() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark');
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const customerDeployments = [
    {
      customer: 'Group SLM',
      industry: 'Contracting & Renovations',
      work: 'Digital presence & custom CRM backend',
      brief: 'A family-owned contracting firm needed an operational upgrade. We created an online digital presence and built a complete CRM and backend system, enabling them to scale their business into an enterprise.',
      outcome: 'Scaled from a family-owned business to an enterprise operation.',
      technologies: ['Web Platform', 'CRM', 'Backend Infrastructure'],
      color: '#00D4FF'
    },
    {
      customer: 'Nexus Logistics',
      industry: 'Supply chain operations',
      work: 'System audit and performance refactor',
      brief: 'A failing monolithic codebase was audited, profiled, and refactored around cleaner service boundaries and cloud cost controls.',
      outcome: '800ms lower latency and 40% less monthly AWS overhead.',
      technologies: ['Performance', 'AWS', 'Refactoring', 'Observability'],
      color: '#10B981'
    },
    {
      customer: 'Mabrook Realty',
      industry: 'Real estate',
      work: 'AI inbound sales automation',
      brief: 'Inbound property leads now qualify, receive proposal context, and enter SMS follow-up in under a minute without manual handoff.',
      outcome: 'Sub-60-second response window with zero-delay follow-up.',
      technologies: ['AI/LLMs', 'Node.js', 'Twilio', 'CRM APIs'],
      color: '#D4A056'
    }
  ];

  const inHouseProducts = [
    {
      product: 'ClyxAI',
      focus: 'Lead response and qualification',
      does: 'Engages inbound prospects, qualifies fit, routes the lead, and triggers the next sales action before the team opens a dashboard.',
      built: 'Designed the conversation flow, scoring logic, routing layer, and multi-channel follow-up engine.',
      technologies: ['LLMs', 'Twilio', 'Workflow engine', 'CRM sync'],
      color: '#2C9F94'
    },
    {
      product: 'Cobalt',
      focus: 'Workforce clock-in and geofencing',
      does: 'Tracks employee clock-ins, clock-outs, job-site presence, and shift compliance with geofencing rules built into the workflow.',
      built: 'Built the mobile workforce flow, location rule system, attendance records, manager review states, and operational reporting layer.',
      technologies: ['React', 'Geofencing', 'Supabase', 'Role access'],
      color: '#3b82f6'
    },
    {
      product: 'Audit Engine',
      focus: 'Infrastructure opportunity mapping',
      does: 'Turns a business intake into a scored map of revenue leaks, automation opportunities, system gaps, and priority fixes.',
      built: 'Built the audit logic, scoring framework, report outputs, and recommendation model.',
      technologies: ['Data scoring', 'Reports', 'Automation maps', 'Rules engine'],
      color: '#D4A056'
    }
  ];

  const CustomerCard = ({ project }) => {
    const [cardRef, isHovered] = useCenterHover();

    return (
      <article ref={cardRef} onClick={() => setActiveId(project.customer)} className={`deployment-card customer-card ${isHovered ? 'mobile-active' : ''}`} style={{ '--accent': project.color }}>
        <div className="card-topline">
          <div className="identity-mark">
            <Building2 size={16} />
          </div>
          <div>
            <div className="deployment-name">{project.customer}</div>
            <div className="deployment-meta">{project.industry}</div>
          </div>
        </div>

        <div>
          <div className="text-eyebrow deployment-eyebrow">What we did</div>
          <h3 className="deployment-title">{project.work}</h3>
        </div>

        <div className="briefing-block hide-on-short">
          <div className="briefing-label">Briefing</div>
          <p>{project.brief}</p>
        </div>

        <div className="outcome-box">
          <span>Outcome</span>
          <strong>{project.outcome}</strong>
        </div>

        <div className="hide-on-short">
          <TechList technologies={project.technologies} />
        </div>
        
        <div className="expand-hint">Click to expand details</div>
      </article>
    );
  };

  const ProductCard = ({ product, index }) => {
    const [cardRef, isHovered] = useCenterHover();

    return (
      <article ref={cardRef} onClick={() => setActiveId(product.product)} className={`deployment-card product-card ${isHovered ? 'mobile-active' : ''}`}>
        <ShineBorder 
          borderWidth={1.5}
          duration={12}
          shineColor={product.color}
          style={{ animationDelay: `-${index * 3}s` }}
        />
        <div className="product-card-bg">
          <FlickeringGrid 
            squareSize={3}
            gridGap={5}
            flickerChance={0.05}
            color={product.color}
            maxOpacity={theme === 'dark' ? 0.45 : 0.55}
          />
        </div>

        <div className="card-topline">
          <div className="identity-mark">
            <Package size={16} />
          </div>
          <div>
            <div className="deployment-name" style={{ color: product.color }}>{product.product}</div>
            <div className="deployment-meta">{product.focus}</div>
          </div>
        </div>

        <div className="product-copy">
          <div>
            <div className="text-eyebrow deployment-eyebrow">What it does</div>
            <p className="card-truncatable-text">{product.does}</p>
          </div>
          <div className="hide-on-short">
            <div className="text-eyebrow deployment-eyebrow">What we built</div>
            <p>{product.built}</p>
          </div>
        </div>

        <div className="hide-on-short">
          <TechList technologies={product.technologies} />
        </div>
        
        <div className="expand-hint">Click to expand details</div>
      </article>
    );
  };

  const TechList = ({ technologies }) => (
    <div className="tech-row">
      {technologies.map((tech) => (
        <span key={tech}>{tech}</span>
      ))}
    </div>
  );

  return (
    <section id="deployments" className="section container deployments-section" ref={ref}>
      <div className={`reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="text-eyebrow" style={{ marginBottom: '12px' }}>Recent Deployments</div>
        <h2 className="text-section-title" style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}>Engineered to scale.</h2>
      </div>

      <div className={`deployments-group reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
        <div className="section-heading-row">
          <div>
            <div className="text-eyebrow muted-eyebrow">Customer work</div>
            <h3>Recent deployments for customers</h3>
          </div>
          <ArrowUpRight size={20} />
        </div>

        <div className="deployment-grid customer-grid">
          {customerDeployments.map((project) => (
            <CustomerCard key={project.customer} project={project} />
          ))}
        </div>
      </div>

      <div className={`deployments-group reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ transitionDelay: '320ms' }}>
        <div className="section-heading-row">
          <div>
            <div className="text-eyebrow muted-eyebrow">Owned products</div>
            <h3>In-house products</h3>
          </div>
          <Layers3 size={20} />
        </div>

        <div className="deployment-grid product-grid">
          {inHouseProducts.map((product, index) => (
            <ProductCard key={product.product} product={product} index={index} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeId && (
          (() => {
            const activeCustomer = customerDeployments.find(p => p.customer === activeId);
            const activeProduct = inHouseProducts.find(p => p.product === activeId);
            const activeItem = activeCustomer || activeProduct;
            const isProduct = !!activeProduct;
            
            if (!activeItem) return null;
            
            return (
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="eco-modal-overlay"
                style={{
                  position: 'fixed', inset: 0, zIndex: 9999,
                  backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
                }}
                onClick={() => setActiveId(null)}
              >
                <Motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: '100%', maxWidth: '600px', backgroundColor: 'var(--color-bg)',
                    border: `1px solid ${activeItem.color}40`, borderRadius: '16px', padding: '32px',
                    position: 'relative', overflow: 'hidden', boxShadow: `0 30px 60px ${activeItem.color}20`
                  }}
                >
                  <button 
                    onClick={() => setActiveId(null)} 
                    style={{ 
                      position: 'absolute', top: '24px', right: '24px', background: 'var(--color-overlay-05)', 
                      border: '1px solid var(--color-overlay-10)', borderRadius: '50%', color: 'var(--color-text-primary)', 
                      cursor: 'pointer', padding: '8px', zIndex: 10 
                    }}
                  >
                    <X size={20} />
                  </button>
                  
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: `${activeItem.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeItem.color }}>
                        {isProduct ? <Package size={24} /> : <Building2 size={24} />}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                          {isProduct ? activeItem.product : activeItem.customer}
                        </h3>
                        <div style={{ fontSize: '14px', color: activeItem.color, fontWeight: 600, marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {isProduct ? activeItem.focus : activeItem.industry}
                        </div>
                      </div>
                    </div>

                    {isProduct ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                          <div className="text-eyebrow deployment-eyebrow" style={{ marginBottom: '8px' }}>What it does</div>
                          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.5 }}>{activeItem.does}</p>
                        </div>
                        <div>
                          <div className="text-eyebrow deployment-eyebrow" style={{ marginBottom: '8px' }}>What we built</div>
                          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.5 }}>{activeItem.built}</p>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                          <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '12px' }}>{activeItem.work}</h4>
                          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.5 }}>{activeItem.brief}</p>
                        </div>
                        <div style={{ padding: '16px', borderRadius: '12px', background: `linear-gradient(135deg, ${activeItem.color}15, transparent)`, border: `1px solid ${activeItem.color}30` }}>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: activeItem.color, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0' }}>Outcome</div>
                          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.4 }}>{activeItem.outcome}</div>
                        </div>
                      </div>
                    )}

                    <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--color-overlay-10)' }}>
                      <div className="text-eyebrow deployment-eyebrow" style={{ marginBottom: '12px' }}>Core Technologies</div>
                      <TechList technologies={activeItem.technologies} />
                    </div>
                  </div>
                </Motion.div>
              </Motion.div>
            );
          })()
        )}
      </AnimatePresence>

      <style>{`
        .deployments-section {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: stretch;
          gap: clamp(32px, 5vh, 48px);
          padding-top: clamp(72px, 8vh, 96px) !important;
          padding-bottom: clamp(48px, 6vh, 72px) !important;
        }
        .deployments-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }
        .section-heading-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          border-bottom: 1px solid var(--color-overlay-08);
          padding-bottom: 12px;
        }
        .section-heading-row h3 {
          font-size: clamp(28px, 3vw, 42px);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .section-heading-row svg {
          color: var(--color-overlay-40);
          flex-shrink: 0;
        }
        .muted-eyebrow {
          color: var(--color-overlay-50);
          margin-bottom: 8px;
        }
        .deployment-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .deployment-card {
          min-width: 0;
          min-height: clamp(260px, 35vh, 340px);
          display: flex;
          flex-direction: column;
          gap: 18px;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          border: 1px solid var(--color-panel-border);
          border-radius: 16px;
          padding: 20px;
          background:
            linear-gradient(145deg, var(--color-overlay-04), transparent 65%),
            var(--color-panel-bg);
          transition: transform 320ms ease, border-color 320ms ease, background-color 320ms ease, box-shadow 320ms ease;
          box-shadow: var(--color-panel-shadow);
        }
        .deployment-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, var(--color-overlay-10), transparent 48%);
          opacity: 0;
          transition: opacity 320ms ease;
          pointer-events: none;
        }
        .deployment-card:hover,
        .deployment-card.mobile-active {
          transform: translateY(-4px);
          border-color: var(--color-overlay-20);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.16), var(--color-panel-shadow);
        }
        .deployment-card:hover::before,
        .deployment-card.mobile-active::before {
          opacity: 1;
        }
        .customer-card::before {
          background: radial-gradient(circle at top right, color-mix(in srgb, var(--accent), transparent 68%), transparent 50%);
        }
        .customer-card:hover,
        .customer-card.mobile-active {
          border-color: color-mix(in srgb, var(--accent), var(--color-overlay-20) 55%);
        }
        .customer-card .identity-mark {
          color: var(--accent);
          border-color: color-mix(in srgb, var(--accent), transparent 72%);
          background: color-mix(in srgb, var(--accent), transparent 92%);
        }
        .card-topline {
          display: flex;
          gap: 12px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .identity-mark {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          color: var(--color-text-primary);
          background: var(--color-field-bg);
          border: 1px solid var(--color-panel-border);
          flex-shrink: 0;
        }
        .deployment-name {
          font-size: 15px;
          font-weight: 700;
          color: var(--color-text-primary);
        }
        .deployment-meta {
          font-size: 13px;
          color: var(--color-overlay-50);
          margin-top: 2px;
        }
        .deployment-eyebrow {
          color: var(--color-overlay-50);
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }
        .deployment-title {
          font-size: 24px;
          font-weight: 600;
          line-height: 1.14;
          letter-spacing: -0.02em;
          color: var(--color-text-primary);
          position: relative;
          z-index: 1;
        }
        .briefing-block {
          position: relative;
          z-index: 1;
          border-left: 1px solid var(--color-overlay-20);
          padding-left: 16px;
        }
        .briefing-label {
          font-size: 13px;
          font-weight: 700;
          color: var(--color-text-primary);
          margin-bottom: 8px;
        }
        .briefing-block p,
        .product-copy p {
          color: var(--color-overlay-60);
          font-size: 14px;
          line-height: 1.5;
        }
        .outcome-box {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px;
          border-radius: 12px;
          background: var(--color-field-bg);
          border: 1px solid var(--color-panel-border);
        }
        .customer-card .outcome-box {
          border-color: color-mix(in srgb, var(--accent), transparent 72%);
          background: linear-gradient(135deg, color-mix(in srgb, var(--accent), transparent 92%), var(--color-overlay-05));
        }
        .outcome-box span {
          color: var(--color-overlay-50);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .outcome-box strong {
          color: var(--color-text-primary);
          font-size: 15px;
          line-height: 1.35;
        }
        .tech-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .tech-row span {
          padding: 6px 10px;
          border-radius: 8px;
          background: var(--color-overlay-05);
          border: 1px solid var(--color-overlay-08);
          color: var(--color-overlay-80);
          font-size: 12px;
          font-weight: 500;
        }
        .customer-card .tech-row span {
          border-color: color-mix(in srgb, var(--accent), transparent 80%);
        }
        .product-card {
          min-height: clamp(240px, 30vh, 320px);
        }
        .product-copy {
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          z-index: 1;
        }
        .product-card-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 1;
          mask-image: radial-gradient(circle at center, black, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at center, black, transparent 80%);
        }
        [data-theme="light"] .product-card-bg {
          opacity: 0.7;
        }
        .expand-hint {
          display: none;
        }
        @media (max-width: 1080px) {
          .deployment-grid {
            grid-template-columns: 1fr;
          }
          .deployment-card,
          .product-card {
            min-height: auto;
          }
        }
        @media (max-width: 640px) {
          .deployments-section {
            gap: 56px;
          }
          .section-heading-row {
            align-items: flex-start;
          }
          .deployment-card {
            padding: 22px;
            gap: 20px;
          }
          .deployment-title {
            font-size: 22px;
          }
        }
        @media (max-height: 1000px) {
          .deployments-section {
            justify-content: flex-start !important;
            gap: 12px;
            padding-top: 24px !important;
            padding-bottom: 20px !important;
          }
          .deployment-card {
            min-height: 140px !important;
            padding: 16px !important;
            gap: 12px !important;
            cursor: pointer;
            transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          }
          .deployment-card:hover {
            transform: translateY(-4px);
            border-color: var(--color-overlay-20);
            background: var(--color-overlay-05);
          }
          .hide-on-short {
            display: none !important;
          }
          .expand-hint {
            display: block;
            margin-top: auto;
            color: var(--color-overlay-40);
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 600;
          }
          .deployment-card:hover .expand-hint {
            color: var(--color-text-primary);
          }
          .product-card {
            min-height: 140px !important;
          }
          .deployment-title {
            font-size: 16px !important;
            margin-bottom: 0 !important;
          }
          .section-heading-row h3 {
            font-size: 18px;
          }
          .section-heading-row {
            padding-bottom: 4px;
            margin-bottom: 0;
          }
          .text-eyebrow {
            margin-bottom: 2px;
          }
          .text-section-title {
            font-size: clamp(24px, 3vw, 36px) !important;
          }
          .card-truncatable-text {
            font-size: 12px !important;
            line-height: 1.3 !important;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}</style>
    </section>
  );
}
