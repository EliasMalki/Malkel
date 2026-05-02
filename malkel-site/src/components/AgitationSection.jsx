import React, { useRef, Suspense, lazy, Component } from 'react';
import { motion, useInView } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, Dot, BarChart, Bar, Cell, CartesianGrid, ReferenceDot, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { NumberTicker } from '@/components/ui/number-ticker';
import { AnimatedList } from '@/components/ui/animated-list';
const World = lazy(() => import('@/components/ui/globe').then(m => ({ default: m.World })));

class GlobeErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.08) 0%, transparent 70%)' }}>
          <div style={{ width: '200px', height: '200px', borderRadius: '50%', border: '1px solid var(--color-overlay-20)', background: 'radial-gradient(ellipse at 30% 30%, rgba(56,189,248,0.15), transparent 70%)', boxShadow: '0 0 60px rgba(56,189,248,0.1)' }} />
        </div>
      );
    }
    return this.props.children;
  }
}

const toolInvoices = [
  { name: 'Salesforce', cost: 150, color: '#00A1E0' },
  { name: 'HubSpot', cost: 120, color: '#FF7A59' },
  { name: 'Slack', cost: 15, color: '#E01E5A' },
  { name: 'Zoom', cost: 20, color: '#2D8CFF' },
  { name: 'Monday.com', cost: 35, color: '#FF3D57' },
  { name: 'DocuSign', cost: 40, color: '#FFE000' },
  { name: 'Notion', cost: 25, color: '#000000' },
  { name: 'Zendesk', cost: 90, color: '#03363D' },
  { name: 'Asana', cost: 30, color: '#F06A6A' },
  { name: 'Mailchimp', cost: 45, color: '#FFE01B' },
  { name: 'Zapier', cost: 60, color: '#FF4A00' },
];

const adminData = [{ name: 'Time', admin: 16, core: 24 }];

const monthlyBarData = [
  { month: 'Jan', bounced: 97, converted: 3 },
  { month: 'Feb', bounced: 96, converted: 4 },
  { month: 'Mar', bounced: 98, converted: 2 },
  { month: 'Apr', bounced: 95, converted: 5 },
  { month: 'May', bounced: 97, converted: 3 },
  { month: 'Jun', bounced: 96, converted: 4 },
];

const speedData = [
  { time: '5m', lost: 0 },
  { time: '30m', lost: 55 },
  { time: '1hr', lost: 81.2 },
  { time: '12hr', lost: 90 },
  { time: '24hr', lost: 92 },
  { time: '47hr', lost: 95 },
];

const gapData = [
  { year: '2023', ai: 10, legacy: 8 },
  { year: '2023.5', ai: 35, legacy: 10 },
  { year: '2024', ai: 65, legacy: 12 },
  { year: '2024.5', ai: 90, legacy: 13 },
  { year: '2025', ai: 120, legacy: 14 },
  { year: '2025.5', ai: 140, legacy: 14.5 },
  { year: '2026', ai: 170, legacy: 15 }
];

const globeArcs = [
  { order: 1, startLat: 40.7128, startLng: -74.006, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.3, color: '#ef4444' },
  { order: 2, startLat: 35.6762, startLng: 139.6503, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.2, color: '#ef4444' },
  { order: 3, startLat: -33.8688, startLng: 151.2093, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.3, color: '#ef4444' },
  { order: 4, startLat: 48.8566, startLng: 2.3522, endLat: 25.2048, endLng: 55.2708, arcAlt: 0.3, color: '#ef4444' },
  { order: 5, startLat: 34.0522, startLng: -118.2437, endLat: 19.4326, endLng: -99.1332, arcAlt: 0.2, color: '#ef4444' },
  { order: 6, startLat: 55.7558, startLng: 37.6173, endLat: 28.6139, endLng: 77.209, arcAlt: 0.4, color: '#ef4444' },
];

const globeConfig = {
  pointSize: 4,
  globeColor: '#0a0a12',
  showAtmosphere: true,
  atmosphereColor: '#ffffff',
  atmosphereAltitude: 0.1,
  emissive: '#0a0a12',
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: 'rgba(255,255,255,0.15)',
  ambientLight: '#38bdf8',
  directionalLeftLight: '#ffffff',
  directionalTopLight: '#ffffff',
  pointLight: '#ffffff',
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};


const GapDot = (props) => {
  const { cx, cy, payload, dataKey } = props;
  if (payload.year === '2025') {
    if (dataKey === 'ai') {
      return (
        <g>
          <circle cx={cx} cy={cy} r={4} fill="var(--color-text-primary)" />
          <text x={cx + 12} y={cy + 4} fill="var(--color-text-primary)" fontSize="14" fontWeight="700" textAnchor="start">+147%</text>
        </g>
      );
    }
    if (dataKey === 'legacy') {
      return (
        <g>
          <circle cx={cx} cy={cy} r={4} fill="var(--color-overlay-30)" />
          <text x={cx + 12} y={cy + 4} fill="var(--color-text-secondary)" fontSize="14" fontWeight="700" textAnchor="start">+11%</text>
        </g>
      );
    }
  }
  return null;
};

export default function AgitationSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const cardStyle = {
    backgroundColor: 'var(--color-overlay-05)',
    border: '1px solid var(--color-overlay-10)',
    borderRadius: '16px',
    padding: '48px',
    display: 'flex',
    flexDirection: 'column',
    height: '460px',
  };

  const topHalf = {
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const bottomHalf = {
    height: '50%',
    display: 'flex',
    alignItems: 'flex-end',
    position: 'relative'
  };

  const headlineStyle = {
    fontSize: '28px', 
    fontWeight: 600, 
    color: 'var(--color-text-primary)', 
    fontFamily: 'var(--font-display)', 
    letterSpacing: '-0.02em',
    lineHeight: 1.1
  };

  const heroStyle = {
    fontSize: '56px', 
    fontWeight: 700, 
    fontFamily: 'var(--font-display)', 
    lineHeight: 1, 
    letterSpacing: '-0.03em',
    background: 'linear-gradient(to right, #ff4d4d, #ef4444, #991b1b, #dc2626, #ff4d4d)',
    backgroundSize: '300% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
    animation: 'redGradient 6s linear infinite'
  };

  const heroSecondaryStyle = {
    fontSize: '24px', 
    color: 'var(--color-text-secondary)', 
    letterSpacing: '0',
    WebkitTextFillColor: 'var(--color-text-secondary)',
    fontWeight: 500,
    verticalAlign: 'baseline',
    marginLeft: '4px'
  };

  return (
    <section className="section container" style={{ position: 'relative' }}>
      <div className={`reveal ${isInView ? 'is-visible' : ''}`} style={{ marginBottom: '80px' }}>
        <h2 className="text-section-title" style={{ color: 'var(--color-text-primary)' }}>
          Friction is stealing your revenue.
        </h2>
      </div>

      <div 
        ref={containerRef}
        className={`reveal ${isInView ? 'is-visible' : ''}`}
        style={{
          transitionDelay: '100ms',
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(1, 1fr)'
        }}
      >
        <style>{`
          @keyframes redGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @media (min-width: 1024px) {
            .agitation-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}</style>

        <div className="agitation-grid" style={{ display: 'grid', gap: '24px', gridTemplateColumns: '1fr' }}>
          
          {/* Card 1: Storefront Leaks */}
          <div style={cardStyle}>
            <div style={topHalf}>
              <h3 style={headlineStyle}>Storefront leaks</h3>
              <div style={heroStyle}>
                <NumberTicker value={97} />%
              </div>
              <p className="text-body" style={{ color: 'var(--color-text-secondary)', maxWidth: '400px' }}>
                Most traffic never converts because the storefront feels like a brochure.
              </p>
            </div>
            
            <div style={{...bottomHalf, width: '100%', position: 'relative'}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyBarData} margin={{ top: 12, right: 8, left: -20, bottom: 0 }} stackOffset="expand" barCategoryGap="20%">
                  <CartesianGrid vertical={false} stroke="var(--color-overlay-10)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} dy={6} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--color-overlay-05)', border: '1px solid var(--color-overlay-10)', borderRadius: '8px', color: 'var(--color-text-primary)' }} formatter={(value, name) => [`${value}%`, name === 'bounced' ? 'Bounced' : 'Converted']} labelStyle={{ color: 'var(--color-text-secondary)' }} />
                  <Bar dataKey="bounced" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} isAnimationActive={isInView} animationDuration={1500} />
                  <Bar dataKey="converted" stackId="a" fill="var(--color-text-primary)" radius={[4, 4, 0, 0]} isAnimationActive={isInView} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Card 2: Speed-to-lead */}
          <div style={cardStyle}>
            <div style={topHalf}>
              <h3 style={headlineStyle}>The speed-to-lead penalty</h3>
              <div style={heroStyle}>
                <NumberTicker value={81.2} decimalPlaces={1} />% <span style={heroSecondaryStyle}>LOST</span>
              </div>
              <p className="text-body" style={{ color: 'var(--color-text-secondary)', maxWidth: '400px' }}>
                While your team is busy, slow response windows silently hand deals to faster competitors.
              </p>
            </div>
            
            <div style={{...bottomHalf, width: '100%'}}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={speedData} margin={{ top: 24, left: -20, right: 16, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="var(--color-overlay-10)" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} 
                    tickMargin={10} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} 
                    tickFormatter={(value) => `${value}%`} 
                    reversed={true}
                  />
                  <Tooltip 
                    cursor={{ stroke: 'var(--color-overlay-20)', strokeWidth: 2 }}
                    contentStyle={{ backgroundColor: 'var(--color-overlay-05)', border: '1px solid var(--color-overlay-10)', borderRadius: '8px', color: 'var(--color-text-primary)' }}
                    itemStyle={{ color: '#ef4444', fontWeight: 600 }}
                    formatter={(value) => [`${value}% Lost`, 'Leads']}
                    labelStyle={{ color: 'var(--color-text-secondary)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lost" 
                    stroke="#ef4444" 
                    strokeWidth={3} 
                    dot={false}
                    activeDot={{ r: 6, fill: '#ef4444', stroke: 'var(--color-text-primary)', strokeWidth: 2 }}
                    isAnimationActive={isInView} 
                    animationDuration={1500}
                  />
                  <ReferenceDot x="1hr" y={81.2} r={5} fill="#ef4444" stroke="var(--color-text-primary)" strokeWidth={2} isFront={true} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Card 3: The operational tax (Spans full width) */}
          <div style={{ ...cardStyle, gridColumn: '1 / -1', height: 'auto', minHeight: '460px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', textAlign: 'center' }}>
              <h3 style={headlineStyle}>The operational tax</h3>
            </div>

            {/* Content Split */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '48px', alignItems: 'flex-start' }}>
              
              {/* Left Side: Subscription Sprawl */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span className="text-eyebrow" style={{ color: 'var(--color-text-primary)' }}>SUBSCRIPTION SPRAWL</span>
                  <div style={heroStyle}>
                    ~<NumberTicker value={6400} /><span style={heroSecondaryStyle}>/mo</span>
                  </div>
                  <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                    Recurring spend on overlapping tools and unused seats (20-person team).
                  </p>
                </div>
                
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative', maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
                  <AnimatedList delay={1500}>
                    {toolInvoices.map((tool, idx) => {
                      const randomMins = [5, 12, 15, 22, 34, 45, 50, 58];
                      const randomHours = [1, 2, 3, 4, 5];
                      const timeStr = tool.cost > 50 ? `${randomMins[idx % randomMins.length]} mins ago` : `${randomHours[idx % randomHours.length]} hour${randomHours[idx % randomHours.length] > 1 ? 's' : ''} ago`;
                      
                      return (
                      <div key={idx} style={{ padding: '16px 20px', background: 'var(--color-overlay-05)', borderRadius: '12px', border: '1px solid var(--color-overlay-10)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', width: '100%', maxWidth: '380px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: tool.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                            {tool.name.charAt(0)}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: 'var(--color-text-primary)', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>INVOICE</span>
                              <span style={{ color: 'var(--color-text-secondary)', fontSize: '11px' }}>{timeStr}</span>
                            </div>
                            <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: '14px' }}>{tool.name}</span>
                          </div>
                        </div>
                        <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '16px' }}>-${tool.cost}</span>
                      </div>
                    )})}
                  </AnimatedList>
                </div>
              </div>

              {/* Right Side: Human Capital Drain */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span className="text-eyebrow" style={{ color: 'var(--color-text-primary)' }}>HUMAN CAPITAL DRAIN</span>
                  <div style={heroStyle}>
                    <NumberTicker value={40} />%
                  </div>
                  <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                    Of your team's week lost to admin a system should handle.
                  </p>
                </div>

                <div style={{ height: '240px', width: '100%', position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                      innerRadius="50%" 
                      outerRadius="100%" 
                      data={adminData} 
                      startAngle={180} 
                      endAngle={0}
                      cy="60%"
                    >
                      <PolarAngleAxis type="number" domain={[0, 40]} angleAxisId={0} tick={false} />
                      <RadialBar dataKey="core" stackId="a" fill="var(--color-overlay-20)" cornerRadius={6} />
                      <RadialBar dataKey="admin" stackId="a" fill="#ef4444" cornerRadius={6} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                      <span className="text-eyebrow" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>Admin (16 hrs)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-overlay-30)' }} />
                      <span className="text-eyebrow" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>Core (24 hrs)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: The Intelligence Gap */}
          <div style={cardStyle}>
            <div style={topHalf}>
              <h3 style={headlineStyle}>The intelligence gap</h3>
              <div style={heroStyle}>
                <NumberTicker value={2.5} decimalPlaces={1} />x
              </div>
              <p className="text-body" style={{ color: 'var(--color-text-secondary)', maxWidth: '400px' }}>
                Those who adapt are pulling away at exponential rates while legacy businesses flatline.
              </p>
            </div>
            
            <div style={{...bottomHalf, width: '100%'}}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={gapData} margin={{ top: 12, right: 16, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="aiStrokeGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#F59E0B">
                        <animate attributeName="stop-color" values="#F59E0B;#3B82F6;#8B5CF6;#10B981;#F59E0B" dur="4s" repeatCount="indefinite" />
                      </stop>
                      <stop offset="33%" stopColor="#3B82F6">
                        <animate attributeName="stop-color" values="#3B82F6;#8B5CF6;#10B981;#F59E0B;#3B82F6" dur="4s" repeatCount="indefinite" />
                      </stop>
                      <stop offset="66%" stopColor="#8B5CF6">
                        <animate attributeName="stop-color" values="#8B5CF6;#10B981;#F59E0B;#3B82F6;#8B5CF6" dur="4s" repeatCount="indefinite" />
                      </stop>
                      <stop offset="100%" stopColor="#10B981">
                        <animate attributeName="stop-color" values="#10B981;#F59E0B;#3B82F6;#8B5CF6;#10B981" dur="4s" repeatCount="indefinite" />
                      </stop>
                    </linearGradient>
                    <linearGradient id="aiFillGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="legacyFillGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-overlay-20)" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="var(--color-overlay-20)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="var(--color-overlay-10)" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} dy={6} ticks={['2023', '2024', '2025', '2026']} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--color-overlay-05)', border: '1px solid var(--color-overlay-10)', borderRadius: '8px', color: 'var(--color-text-primary)' }} formatter={(value, name) => [`${value}%`, name === 'ai' ? 'AI-Adopters' : 'Legacy']} labelStyle={{ color: 'var(--color-text-secondary)' }} />
                  <Area type="monotone" dataKey="legacy" stroke="var(--color-overlay-30)" strokeWidth={2} fill="url(#legacyFillGradient)" dot={false} isAnimationActive={isInView} animationDuration={2500} />
                  <Area type="monotone" dataKey="ai" stroke="url(#aiStrokeGradient)" strokeWidth={3} fill="url(#aiFillGradient)" dot={false} isAnimationActive={isInView} animationDuration={2500} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Card 5: Competing locally */}
          <div style={{...cardStyle, position: 'relative', overflow: 'hidden'}}>
            <div style={{...topHalf, zIndex: 2, position: 'relative'}}>
              <h3 style={headlineStyle}>You are competing locally, not globally</h3>
              <p className="text-body" style={{ color: 'var(--color-text-secondary)', maxWidth: '400px' }}>
                While you optimize for your city, AI-native competitors are capturing markets across continents — 24/7, in every language.
              </p>
            </div>
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.85 }}>
              <GlobeErrorBoundary>
                <Suspense fallback={<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)' }}>Loading globe...</div>}>
                  <World globeConfig={globeConfig} data={globeArcs} />
                </Suspense>
              </GlobeErrorBoundary>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
