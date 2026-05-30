import React, { useState, useEffect, useId } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/**
 * GrainientBg — animated grainy gradient background.
 * First-iteration keyframes (translate only). 3 blobs + extra lighter shade.
 */
function GrainientBg({ color }) {
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, borderRadius: 'inherit',
      overflow: 'hidden', zIndex: 0, pointerEvents: 'none'
    }}>
      {/* Base layer */}
      <div style={{ 
        position: 'absolute', inset: 0, 
        background: 'var(--gb-base)', 
        borderRadius: 'inherit'
      }} />

      {/* Blob 1 — Primary Card Color */}
      <div className="gb-blob gb-blob-primary" style={{
        position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
        background: `radial-gradient(circle at 30% 35%, color-mix(in srgb, ${color} calc(var(--gb-card-opacity) * 100%), transparent), transparent 50%)`,
        animation: 'gbBlob1 14s ease-in-out infinite',
      }} />

      {/* Blob 2 — Secondary Card Color (slightly offset) */}
      <div className="gb-blob gb-blob-primary" style={{
        position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
        background: `radial-gradient(circle at 70% 65%, color-mix(in srgb, ${color} calc(var(--gb-card-opacity) * 100%), transparent), transparent 50%)`,
        animation: 'gbBlob2 18s ease-in-out infinite',
      }} />

      {/* Blob 3 — Theme State Color 1 (e.g. White or Pure Black) */}
      <div className="gb-blob gb-blob-accent" style={{
        position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
        background: 'radial-gradient(circle at 70% 30%, var(--gb-accent-1), transparent 55%)',
        animation: 'gbBlob3 22s ease-in-out infinite',
      }} />

      {/* Blob 4 — Theme State Color 2 (e.g. Soft Indigo or Deep Grey) */}
      <div className="gb-blob gb-blob-accent" style={{
        position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
        background: 'radial-gradient(circle at 20% 70%, var(--gb-accent-2), transparent 55%)',
        animation: 'gbBlob4 26s ease-in-out infinite',
      }} />

      {/* Grain overlay */}
      <div className="gb-grain" style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px',
        mixBlendMode: 'overlay',
        opacity: 'var(--gb-grain-opacity)',
        transition: 'opacity 300ms ease'
      }} />
    </div>
  );
}

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

function ThemedSvg({ src, alt }) {
  const [svgContent, setSvgContent] = useState('');
  useEffect(() => {
    fetch(src).then(res => res.text()).then(text => setSvgContent(text)).catch(() => {});
  }, [src]);
  return (
    <div
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

  const scrollToAudit = () => {
    setActiveId(null);
    setTimeout(() => {
      const el = document.getElementById('audit');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const activeCard = cardsData.find((c) => c.id === activeId);

  // Simple, fast transition — no spring lag on close
  const modalTransition = { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] };

  return (
    <section id="ecosystem" className="section container eco-section-fit" ref={ref} style={{ position: 'relative' }}>
      <div className={`reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ marginBottom: '28px', textAlign: 'center' }}>
        <div className="text-eyebrow" style={{ marginBottom: '12px', fontSize: '11px', letterSpacing: '0.16em' }}>
          The MalkEl Ecosystem
        </div>
        <h2 className="text-section-title" style={{ fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: '12px' }}>
          One roof. Every solution.
        </h2>
        <p style={{ fontSize: '15px', maxWidth: '560px', margin: '0 auto', lineHeight: 1.45, color: 'var(--color-text-secondary)' }}>
          Strategy, software, automation, and operations — engineered as a single unified system, not a stack of vendors.
        </p>
      </div>

      <div className={`eco-grid reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
        {cardsData.map((card, index) => {
          const isHovered = hoveredId === card.id;
          return (
            <Motion.div
              key={card.id}
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="eco-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                borderColor: isHovered ? `${card.color}70` : undefined,
                transform: isHovered ? 'translateY(-6px)' : undefined,
                boxShadow: isHovered ? `0 20px 48px ${card.color}20` : 'none',
              }}
            >
              <GrainientBg color={card.color} />

              {/* SVG image — rounded directly, no inner wrapper */}
              <div className="eco-card-img">
                <ThemedSvg src={card.image} alt={card.title} />
              </div>

              {/* Card body */}
              <div className="eco-card-body">
                <div className="eco-card-overline" style={{
                  color: isHovered ? card.color : undefined,
                  transition: 'color 300ms ease'
                }}>
                  {card.overline}
                </div>
                <h3 className="eco-card-title">{card.title}</h3>
                <p className="eco-card-desc">{card.description}</p>
                
                {/* Full Objective for wide screens */}
                <div className="eco-card-objective-wide">
                  <div className="eco-card-objective-heading" style={{ color: card.color }}>The Objective</div>
                  <p className="eco-card-objective-text">{card.expandedObjective}</p>
                </div>

                {/* Full Examples for wide screens */}
                <div className="eco-card-examples-wide">
                  <div className="eco-card-objective-heading" style={{ color: card.color, marginTop: '8px' }}>Deployment Examples</div>
                  <ul className="eco-card-examples-list">
                    {card.expandedExamples.map((example, i) => (
                      <li key={i}>
                        <span style={{ color: card.color }}>→</span>
                        <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}> {example.split(':')[0]}:</span>
                        {example.split(':').slice(1).join(':')}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="eco-card-tag" style={{
                  color: isHovered ? `color-mix(in srgb, var(--color-text-primary), ${card.color} 30%)` : undefined,
                  transition: 'color 300ms ease'
                }}>
                  {card.tagline}
                </div>

                {/* Two action buttons */}
                <div className="eco-card-actions">
                  <button
                    className="eco-btn-learn"
                    style={{
                      background: card.color,
                      boxShadow: isHovered ? `0 0 20px ${card.color}55` : 'none',
                    }}
                    onClick={(e) => { e.stopPropagation(); setActiveId(card.id); }}
                  >
                    Learn More
                  </button>
                  <button
                    className="eco-btn-audit"
                    onClick={(e) => { e.stopPropagation(); scrollToAudit(); }}
                  >
                    Book Audit
                  </button>
                </div>
              </div>
            </Motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeId && activeCard && (
          <React.Fragment>
            <Motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={modalTransition}
              onClick={() => setActiveId(null)}
              className="eco-modal-backdrop"
            />
            <div className="eco-modal-wrapper">
              <Motion.div
                key={`modal-${activeCard.id}`}
                className="eco-modal"
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                transition={modalTransition}
                style={{ borderColor: `${activeCard.color}40` }}
              >
                {/* Modal glow */}
                <div style={{
                  position: 'absolute', top: '-40px', left: '-40px',
                  width: '250px', height: '250px',
                  background: `radial-gradient(circle, ${activeCard.color} 0%, transparent 60%)`,
                  opacity: 0.1, pointerEvents: 'none', zIndex: 0
                }} />

                <button
                  onClick={() => setActiveId(null)}
                  className="eco-modal-close"
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-overlay-20)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-overlay-10)'}
                >
                  <X size={20} />
                </button>

                {/* Header */}
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
                  <div className="eco-modal-img">
                    <ThemedSvg src={activeCard.image} alt={activeCard.title} />
                  </div>

                  <div className="eco-card-overline" style={{ color: activeCard.color, marginBottom: '12px' }}>
                    {activeCard.overline}
                  </div>
                  <h3 style={{ fontSize: '36px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                    {activeCard.title}
                  </h3>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-text-primary)', opacity: 0.85, marginBottom: '8px', letterSpacing: '-0.005em' }}>
                    {activeCard.tagline}
                  </div>
                  <div style={{
                    display: 'inline-block', padding: '8px 16px',
                    backgroundColor: `${activeCard.color}18`,
                    border: `1px solid ${activeCard.color}33`,
                    borderRadius: '8px', color: activeCard.color,
                    fontSize: '13px', fontWeight: 500, letterSpacing: '0.02em', width: 'fit-content'
                  }}>
                    {activeCard.offerings}
                  </div>
                </div>

                {/* Body */}
                <Motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', zIndex: 1 }}
                >
                  <div>
                    <h4 className="eco-modal-heading">The Objective</h4>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
                      {activeCard.expandedObjective}
                    </p>
                  </div>

                  <div>
                    <h4 className="eco-modal-heading">Deployment Examples</h4>
                    <ul style={{ listStyleType: 'none', padding: 0, color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '16px', lineHeight: 1.7, fontSize: '15px' }}>
                      {activeCard.expandedExamples.map((example, index) => (
                        <li key={index} style={{ paddingLeft: '20px', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: activeCard.color, fontWeight: 600 }}>→</span>
                          <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{example.split(':')[0]}:</span>
                          {example.split(':').slice(1).join(':')}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: '8px' }}>
                    <button onClick={scrollToAudit} className="btn btn-success" style={{ display: 'block', width: '100%', textAlign: 'center', padding: '16px' }}>
                      Book a Free Infrastructure Audit
                    </button>
                  </div>
                </Motion.div>
              </Motion.div>
            </div>
          </React.Fragment>
        )}
      </AnimatePresence>

      <style>{`
        /* Blob animations */
        @keyframes gbBlob1 {
          0%, 100% { transform: translate(0, 0); }
          33%      { transform: translate(40px, -30px); }
          66%      { transform: translate(-25px, 40px); }
        }
        @keyframes gbBlob2 {
          0%, 100% { transform: translate(0, 0); }
          40%      { transform: translate(-40px, 30px); }
          75%      { transform: translate(25px, -40px); }
        }
        @keyframes gbBlob3 {
          0%, 100% { transform: translate(0, 0); }
          50%      { transform: translate(-30px, 35px); }
        }
        @keyframes gbBlob4 {
          0%, 100% { transform: translate(0, 0); }
          50%      { transform: translate(35px, -30px); }
        }

        .eco-section-fit {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: clamp(48px, 6vh, 72px) !important;
          padding-bottom: clamp(32px, 5vh, 52px) !important;
          max-width: 1800px !important; /* Allow section to span much wider on large monitors */
        }
        .eco-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          max-width: 100%; /* Take up the full allowed width of the expanded section */
          margin: 0 auto;
          align-items: stretch;
        }
        @media (max-width: 1360px) {
          .eco-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            max-width: 1120px;
          }
        }
        @media (max-width: 768px) {
          .eco-grid { grid-template-columns: 1fr; }
        }

        /* iOS Safari kills tabs when too many GPU compositor layers stack.
           Each card was contributing: 4 animated blob layers (200% × 200%),
           a mixBlendMode grain overlay, AND a backdrop-filter sampling the
           already-blurred AuroraSweep canvas behind it. Four cards = the
           crash. On mobile/tablet we strip the heaviest layers but keep the
           colored-card aesthetic via the two primary brand-colored blobs. */
        @media (max-width: 1024px) {
          .eco-card {
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            background: var(--color-panel-bg, rgba(255,255,255,0.04));
          }
          .gb-blob-accent { display: none; }
          .gb-blob-primary {
            width: 130% !important;
            height: 130% !important;
            top: -15% !important;
            left: -15% !important;
          }
          .gb-grain {
            mix-blend-mode: normal !important;
            opacity: 0.03 !important;
          }
        }

        .eco-card {
          border-radius: 20px;
          overflow: hidden;
          cursor: default;
          background: transparent;
          border: 1px solid var(--color-panel-border);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          min-width: 0;
          min-height: clamp(280px, 35vh, 420px);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .eco-card-img {
          aspect-ratio: 4 / 3;
          width: calc(100% - 24px);
          margin: 12px 12px 0;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          background: var(--color-field-bg);
        }
        [data-theme="light"] .eco-card-img {
          background: rgba(255,255,255,0.5);
        }

        .eco-card-body {
          padding: 18px 20px 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
          position: relative;
          z-index: 1;
          min-width: 0;
        }

        .eco-card-overline {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 500;
          color: var(--color-text-secondary);
          opacity: 0.5;
          transition: color 300ms ease, opacity 300ms ease;
        }
        .eco-card:hover .eco-card-overline { opacity: 1; }

        .eco-card-title {
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: var(--color-text-primary);
        }

        .eco-card-desc {
          font-size: 12.5px;
          line-height: 1.42;
          font-weight: 400;
          letter-spacing: -0.005em;
          color: var(--color-text-secondary);
          opacity: 0.75;
          margin-top: 2px;
        }

        .eco-card-objective-wide,
        .eco-card-examples-wide {
          display: none;
        }

        .eco-card-tag {
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: -0.005em;
          color: var(--color-text-primary);
          opacity: 0.8;
          transition: color 300ms ease;
        }

        .eco-card-actions {
          display: flex;
          gap: 8px;
          margin-top: auto;
          padding-top: 12px;
          flex-wrap: wrap;
        }

        .eco-btn-learn {
          flex: 1 1 0;
          min-width: 0;
          padding: 10px 8px;
          border: none;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: opacity 0.2s ease, box-shadow 0.3s ease, transform 0.2s ease;
        }
        .eco-btn-learn:hover { opacity: 0.88; transform: translateY(-1px); }
        .eco-btn-learn:active { transform: translateY(0); opacity: 1; }

        .eco-btn-audit {
          flex: 1 1 0;
          min-width: 0;
          padding: 10px 8px;
          border: 1px solid var(--color-overlay-15);
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-primary);
          background: var(--color-field-bg);
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .eco-btn-audit:hover {
          background: var(--color-overlay-10);
          border-color: var(--color-overlay-25);
          transform: translateY(-1px);
        }
        .eco-btn-audit:active { transform: translateY(0); }
        @media (max-height: 780px) and (min-width: 900px) {
          .eco-section-fit {
            padding-top: 38px !important;
            padding-bottom: 32px !important;
          }
          .eco-grid {
            gap: 14px;
          }
          .eco-card-img {
            aspect-ratio: 4 / 2.8;
          }
          .eco-card-body {
            padding: 14px 16px 14px;
          }
          .eco-card-desc {
            font-size: 12px;
            line-height: 1.35;
          }
        }
        @media (min-width: 1500px) and (min-height: 1000px) {
          .eco-card-desc {
            display: none; /* Hide the short description on wide screens */
          }
          .eco-card-objective-wide {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-top: 4px;
            margin-bottom: 6px;
          }
          .eco-card-objective-heading {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            opacity: 0.9;
          }
          .eco-card-objective-text {
            font-size: 13px;
            line-height: 1.5;
            color: var(--color-text-secondary);
            opacity: 0.85;
          }
          .eco-card-examples-wide {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-bottom: 8px;
          }
          .eco-card-examples-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
            font-size: 12.5px;
            line-height: 1.45;
            color: var(--color-text-secondary);
            opacity: 0.85;
          }
          .eco-card-examples-list li {
            padding-left: 14px;
            position: relative;
          }
          .eco-card-examples-list li > span:first-child {
            position: absolute;
            left: 0;
            top: 0;
            font-weight: 600;
          }
        }
        @media (max-width: 640px) {
          .eco-section-fit {
            min-height: auto;
            padding-top: 120px !important;
            padding-bottom: 120px !important;
          }
          .eco-card-body {
            padding: 22px 22px 24px;
          }
          .eco-card-img {
            aspect-ratio: 600 / 360;
          }
          .eco-card-actions {
            flex-direction: row;
            padding-top: 10px;
          }
          .eco-btn-learn,
          .eco-btn-audit {
            flex: 1 1 0;
            width: auto;
            font-size: 12px;
            padding: 10px 8px;
          }
          .eco-modal {
            padding: 28px 20px;
            border-radius: 18px;
          }
          .eco-modal-img {
            height: 220px;
            margin-bottom: 24px;
          }
        }

        /* Modal */
        .eco-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
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
          border: 1px solid var(--color-panel-border);
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
          box-shadow: 0 24px 48px rgba(0,0,0,0.24), var(--color-panel-shadow);
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
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-field-bg);
        }
        .eco-modal-heading {
          font-size: 18px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 12px;
          border-bottom: 1px solid var(--color-overlay-10);
          padding-bottom: 8px;
        }
        .eco-modal::-webkit-scrollbar { width: 8px; }
        .eco-modal::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 8px; }
        .eco-modal::-webkit-scrollbar-thumb { background: var(--color-overlay-20); border-radius: 8px; }
        .eco-modal::-webkit-scrollbar-thumb:hover { background: var(--color-overlay-30); }

        /* Internal SVG Background Transparency */
        .eco-card-img svg .bg-card,
        .eco-modal-img svg .bg-card {
          fill: none !important;
        }

        @media (max-height: 1000px) {
          .eco-section-fit {
            justify-content: flex-start !important;
            padding-top: 24px !important;
            padding-bottom: 24px !important;
          }
          .eco-card {
            min-height: auto !important;
            max-height: 55vh !important;
          }
          .eco-card-img {
            aspect-ratio: 14 / 9 !important;
            margin: 8px 8px 0 !important;
            width: calc(100% - 16px) !important;
          }
          .eco-card-body {
            padding: 14px 16px 14px !important;
            gap: 6px !important;
          }
          .eco-card-title {
            font-size: 16px !important;
          }
          .eco-card-desc {
            display: none !important;
          }
          .eco-card-objective-wide {
            display: flex !important;
            flex-direction: column;
            gap: 2px;
            margin-top: 2px;
          }
          .eco-card-objective-heading {
            font-size: 11px !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.1em !important;
          }
          .eco-card-objective-text {
            font-size: 12.5px !important;
            line-height: 1.35 !important;
            color: var(--color-text-secondary) !important;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin: 0 !important;
          }
          .eco-card-overline {
            font-size: 10px !important;
            margin-bottom: 4px !important;
          }
          .eco-btn-learn, .eco-btn-audit {
            padding: 8px 6px !important;
            font-size: 12px !important;
            margin-top: 4px !important;
          }
          .text-section-title {
            font-size: clamp(26px, 3.5vw, 40px) !important;
            margin-bottom: 8px !important;
          }
          .text-eyebrow {
             margin-bottom: 6px !important;
          }
        }
      `}</style>
    </section>
  );
}
