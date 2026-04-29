import React, { useEffect, useRef, useState } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Box, Database, Globe, Layout, Smartphone, Cloud, Shield, Server, Cpu, Layers, HardDrive, Wifi } from 'lucide-react';

const AnimatedCounter = ({ from = 0, to, duration = 2.5, startAnimation = false, format = (v) => v }) => {
  const nodeRef = useRef(null);
  useEffect(() => {
    if (!startAnimation) return;
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(from, to, {
      duration: duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = format(value);
      }
    });
    return () => controls.stop();
  }, [from, to, duration, startAnimation, format]);
  return <span ref={nodeRef}>{format(from)}</span>;
};

// Card 1: 97% Massive Number
const Card1 = ({ isInView }) => (
  <div className="bento-card card-span-2">
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3 className="bento-title">Your visitors are leaving</h3>
      <p className="bento-subtitle" style={{ maxWidth: '400px' }}>
        Most traffic never becomes a lead, because the storefront feels like a brochure, not a conversion engine.
      </p>
      <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
        <div style={{ fontSize: 'clamp(80px, 10vw, 140px)', fontWeight: 700, lineHeight: 0.9, color: '#FFFFFF', letterSpacing: '-0.04em' }}>
          <AnimatedCounter startAnimation={isInView} from={0} to={97} format={(v) => Math.round(v) + '%'} />
        </div>
        <div style={{ color: 'var(--color-overlay-40)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '12px' }}>
          of visitors never convert on an average site
        </div>
      </div>
    </div>
  </div>
);

// Card 2: 47 Hours
const Card2 = ({ isInView }) => (
  <div className="bento-card card-span-1">
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3 className="bento-title">You're answering too late</h3>
      <p className="bento-subtitle">
        While your team is busy, a 47-hour response window silently hands deals to faster competitors.
      </p>
      <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
        <div style={{ fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 700, lineHeight: 1, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
          <AnimatedCounter startAnimation={isInView} from={0} to={47} duration={3} format={(v) => Math.round(v)} />
          <span style={{ fontSize: '32px', color: 'var(--color-overlay-60)', marginLeft: '8px' }}>hrs</span>
        </div>
        <motion.div 
          initial={{ width: 0 }}
          animate={isInView ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
          style={{ height: '2px', background: 'var(--color-accent)', marginTop: '16px', position: 'relative' }}
        >
          {/* Tick marks */}
          <div style={{ position: 'absolute', right: 0, top: '-4px', width: '2px', height: '10px', background: 'var(--color-accent)' }} />
          <div style={{ position: 'absolute', left: 0, top: '-4px', width: '2px', height: '10px', background: 'var(--color-accent)' }} />
        </motion.div>
        <div style={{ color: 'var(--color-overlay-40)', fontSize: '12px', marginTop: '12px' }}>
          Average B2B lead response time
        </div>
      </div>
    </div>
  </div>
);

// Card 3: 78% First Responder
const Card3 = ({ isInView }) => {
  return (
    <div className="bento-card card-span-2" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background flare */}
      <motion.div 
        animate={isInView ? { opacity: [0.1, 0.3, 0.1] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} 
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 1 }}>
        <h3 className="bento-title">First call, first close</h3>
        <p className="bento-subtitle" style={{ maxWidth: '400px' }}>
          Speed to lead isn’t just nice to have—78% of buyers will pick the company that answers first.
        </p>
        
        <div style={{ marginTop: 'auto', paddingTop: '40px', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <motion.div 
            animate={isInView ? { 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            } : {}}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            style={{ 
              fontSize: 'clamp(64px, 8vw, 96px)', 
              fontWeight: 700, 
              lineHeight: 1, 
              letterSpacing: '-0.02em',
              background: 'linear-gradient(90deg, #FFFFFF, var(--color-accent), #FFFFFF)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            <AnimatedCounter startAnimation={isInView} from={0} to={78} format={(v) => Math.round(v) + '%'} />
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1, duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent)' }} />
              <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 500 }}>First Responder Win Rate</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-overlay-20)' }} />
              <span style={{ color: 'var(--color-overlay-40)', fontSize: '14px' }}>Second Responder Win Rate</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Card 4: 81.2% Donut Chart
const Card4 = ({ isInView }) => {
  const data = [
    { name: 'Lost', value: 81.2 },
    { name: 'Retained', value: 18.8 }
  ];
  return (
    <div className="bento-card card-span-1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <h3 className="bento-title" style={{ width: '100%' }}>The 60-minute penalty</h3>
      <p className="bento-subtitle" style={{ width: '100%' }}>
        If your team waits longer than an hour, most leads are already gone.
      </p>
      
      <div style={{ width: '100%', height: '160px', marginTop: '24px', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <linearGradient id="colorLost" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#D4A056" />
              </linearGradient>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={75}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              isAnimationActive={isInView}
              animationDuration={1500}
            >
              <Cell fill="url(#colorLost)" />
              <Cell fill="var(--color-overlay-10)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#FFFFFF', fontSize: '24px', fontWeight: 700 }}>
          <AnimatedCounter startAnimation={isInView} from={0} to={81.2} format={(v) => v.toFixed(1) + '%'} />
        </div>
      </div>
      <div style={{ color: '#EF4444', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '16px' }}>
        Leads lost after 1 hour
      </div>
    </div>
  );
};

// Card 5: 106+ Apps Grid
const Card5 = ({ isInView }) => {
  const icons = [Box, Database, Globe, Layout, Smartphone, Cloud, Shield, Server, Cpu, Layers, HardDrive, Wifi];
  
  return (
    <div className="bento-card card-span-1">
      <h3 className="bento-title">You're juggling 106+ tools</h3>
      <p className="bento-subtitle">
        The average scaling business manages over 100 disconnected apps, each eating time and clarity.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '32px' }}>
        {icons.map((Icon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 + (i * 0.05), type: 'spring', stiffness: 200, damping: 10 }}
            style={{
              aspectRatio: '1',
              backgroundColor: 'var(--color-overlay-05)',
              border: '1px solid var(--color-overlay-10)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-overlay-40)'
            }}
          >
            <Icon size={16} />
          </motion.div>
        ))}
      </div>
      <div style={{ color: 'var(--color-overlay-40)', fontSize: '12px', marginTop: '24px', textAlign: 'center', fontWeight: 500 }}>
        + 94 more running in the background
      </div>
    </div>
  );
};

// Card 6: 87% Custom Bar
const Card6 = ({ isInView }) => (
  <div className="bento-card card-span-2">
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3 className="bento-title">Your tech isn't paying off</h3>
      <p className="bento-subtitle">
        Despite the licenses and integrations, 87% of operations leaders say their stack fails to deliver the expected ROI.
      </p>
      
      <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ color: '#EF4444', fontSize: '14px', fontWeight: 600 }}>Underdelivers ROI</div>
          <div style={{ color: 'var(--color-accent)', fontSize: '14px', fontWeight: 600 }}>Successful</div>
        </div>
        
        {/* Progress Bar Container */}
        <div style={{ width: '100%', height: '24px', backgroundColor: 'var(--color-overlay-10)', borderRadius: '12px', overflow: 'hidden', display: 'flex' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={isInView ? { width: '87%' } : {}}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
            style={{ height: '100%', backgroundColor: '#EF4444' }}
          />
          <motion.div 
            initial={{ width: 0 }}
            animate={isInView ? { width: '13%' } : {}}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
            style={{ height: '100%', backgroundColor: 'var(--color-accent)' }}
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#FFFFFF' }}>
            <AnimatedCounter startAnimation={isInView} from={0} to={87} delay={0.5} format={(v) => Math.round(v) + '%'} />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#FFFFFF' }}>
            <AnimatedCounter startAnimation={isInView} from={0} to={13} delay={0.5} format={(v) => Math.round(v) + '%'} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function AgitationSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section className="section container" style={{ padding: '120px 0' }}>
      
      <div className="text-eyebrow" style={{ textAlign: 'center', marginBottom: '24px' }}>
        The Reality Check
      </div>
      <h2 className="text-section-title" style={{ textAlign: 'center', marginBottom: '64px' }}>
        Friction is stealing your revenue.
      </h2>

      <div 
        ref={containerRef}
        className="bento-grid-wrapper"
      >
        <Card1 isInView={isInView} />
        <Card4 isInView={isInView} />
        <Card2 isInView={isInView} />
        <Card3 isInView={isInView} />
        <Card5 isInView={isInView} />
        <Card6 isInView={isInView} />
      </div>

      <style>{`
        .bento-grid-wrapper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          width: 100%;
        }

        .bento-card {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 40px;
          transition: background-color 300ms ease, border-color 300ms ease;
        }

        .bento-card:hover {
          background-color: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .bento-title {
          font-size: 24px;
          font-weight: 600;
          color: #FFFFFF;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .bento-subtitle {
          color: #9CA3AF;
          font-size: 15px;
          line-height: 1.6;
        }

        .card-span-2 {
          grid-column: span 2;
        }
        .card-span-1 {
          grid-column: span 1;
        }

        @media (max-width: 1024px) {
          .bento-grid-wrapper {
            grid-template-columns: repeat(2, 1fr);
          }
          .card-span-2, .card-span-1 {
            grid-column: span 1; /* Reset logic for tablet */
          }
          /* Custom tablet logic */
          .bento-grid-wrapper > :nth-child(1) { grid-column: span 2; }
          .bento-grid-wrapper > :nth-child(4) { grid-column: span 2; }
          .bento-grid-wrapper > :nth-child(6) { grid-column: span 2; }
        }

        @media (max-width: 768px) {
          .bento-grid-wrapper {
            grid-template-columns: 1fr;
          }
          .bento-grid-wrapper > * {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
