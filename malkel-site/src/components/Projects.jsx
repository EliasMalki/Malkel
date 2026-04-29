import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCenterHover } from '../hooks/useCenterHover';

export default function Projects() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  const projectsData = [
    {
      company: "Apex Financial",
      title: "Venture-Backed FinTech Platform",
      category: "Architecture Build",
      description: "Re-engineered a static legacy dashboard into a fully responsive, real-time reactive SaaS product utilizing massive web-socket infrastructure leading to a $20M Series A.",
      tags: ["React", "Go", "WebSockets"],
      color: "#00D4FF"
    },
    {
      company: "Nexus Logistics",
      title: "Global Supply Chain Audit",
      category: "System Refactor",
      description: "Audited a failing monolithic codebase suffering from extreme memory leaks. Deployed structural refactors dropping latency by 800ms and saving 40% in monthly AWS overhead.",
      tags: ["Performance", "AWS", "Refactoring"],
      color: "#10B981"
    },
    {
      company: "OmniProp Realty",
      title: "Real Estate AI Automation",
      category: "Internal Tooling",
      description: "Built a fully autonomous inbound pipeline that dynamically qualifies leads, generates property proposals, and manages SMS follow-ups under 60 seconds with zero human capital footprint.",
      tags: ["AI/LLMs", "Node.js", "Twilio"],
      color: "#A855F7"
    }
  ];

  const ProjectCard = ({ project }) => {
    const [cardRef, isHovered] = useCenterHover();
    return (
      <div ref={cardRef} className={`project-wrapper ${isHovered ? 'mobile-active' : ''}`} style={{ gridColumn: 'span 4', position: 'relative' }}>
        
        {/* Massive Ambient Blur Ring */}
        <div className="project-ambient-ring" style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: project.color,
          opacity: 0,
          borderRadius: '16px',
          filter: 'blur(24px)',
          transition: 'all 400ms ease',
          pointerEvents: 'none',
          zIndex: 0
        }}></div>

        <div className="bento-card project-card" style={{
          backgroundColor: 'var(--color-overlay-03)',
          border: '1px solid var(--color-overlay-08)',
          borderRadius: '16px',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '32px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 400ms ease',
          '--theme-color': project.color,
          minHeight: '360px',
          zIndex: 1,
          height: '100%'
        }}>
          <div className="project-glow" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `radial-gradient(circle at top right, var(--theme-color)22 0%, transparent 70%)`, opacity: 0, transition: 'opacity 400ms ease', pointerEvents: 'none' }}></div>
          
          <div>
            <div className="text-eyebrow" style={{ color: 'var(--theme-color)', marginBottom: '16px' }}>
              <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{project.company}</span> &mdash; {project.category}
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.2, marginBottom: '16px', color: 'var(--color-text-primary)', position: 'relative', zIndex: 1 }}>{project.title}</h3>
            <p className="text-body" style={{ color: 'var(--color-overlay-60)', position: 'relative', zIndex: 1, fontSize: '15px' }}>{project.description}</p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            {project.tags.map((tag, i) => (
              <span key={i} style={{ padding: '6px 12px', backgroundColor: 'var(--color-overlay-05)', borderRadius: '8px', fontSize: '12px', color: 'var(--color-overlay-80)', fontWeight: 500, border: '1px solid var(--color-overlay-05)' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="deployments" className="section container" ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className={`reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div className="text-eyebrow" style={{ marginBottom: '24px' }}>Recent Deployments</div>
        <h2 className="text-section-title">Engineered to scale.</h2>
      </div>

      <div className={`grid-12 reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms', width: '100%' }}>
        {projectsData.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>

      <style>{`
        .project-wrapper:hover .project-ambient-ring, .project-wrapper.mobile-active .project-ambient-ring {
          opacity: 0.6 !important;
          transform: translateY(-6px);
        }
        .project-wrapper:hover .project-card, .project-wrapper.mobile-active .project-card {
          border-color: var(--theme-color) !important;
          box-shadow: 0 0 40px -10px var(--theme-color);
          transform: translateY(-6px);
        }
        .project-wrapper:hover .project-glow, .project-wrapper.mobile-active .project-glow {
          opacity: 1 !important;
        }
        @media (max-width: 1024px) {
          .grid-12 > div.project-wrapper {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
