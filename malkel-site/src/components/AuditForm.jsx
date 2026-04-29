import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function AuditForm() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Grabs all named input fields from the form automatically
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // We route the request asynchronously to an email-sending API
      // REPLACE "your_email@malkel.com" WITH YOUR ACTUAL EMAIL ADDRESS
      const response = await fetch("https://formsubmit.co/ajax/your_email@malkel.com", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to send request. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    }
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: 'var(--color-overlay-04)',
    border: '1px solid var(--color-overlay-08)',
    borderRadius: '8px',
    padding: '16px 20px',
    color: 'var(--color-text-primary)',
    fontSize: '17px',
    fontFamily: 'inherit',
    transition: 'border-color 200ms ease, background-color 200ms ease',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    color: 'var(--color-overlay-60)'
  };

  return (
    <section id="audit" className="section container" ref={ref} style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className={`reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div className="text-eyebrow" style={{ marginBottom: '24px' }}>
          Start the conversation
        </div>
        <h2 className="text-section-title" style={{ marginBottom: '24px' }}>
          Request a <span className="text-success">Free Infrastructure Audit</span>
        </h2>
        <p className="text-body-large" style={{ color: 'var(--color-overlay-60)' }}>
          Tell us where you are. We'll tell you exactly what it would take to seal your pipeline, <strong style={{color: 'var(--color-text-primary)', fontWeight: 500}}>at zero cost</strong>.
        </p>
      </div>

      <div className={`reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms', width: '100%' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '64px 0', backgroundColor: 'var(--color-overlay-03)', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>Request Received</h3>
            <p style={{ color: 'var(--color-overlay-60)' }}>We'll review your details and be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div className="form-row" style={{ display: 'flex', gap: '24px' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="name" style={labelStyle}>Name</label>
                <input required type="text" id="name" name="name" className="form-input" style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="company" style={labelStyle}>Company</label>
                <input required type="text" id="company" name="company" className="form-input" style={inputStyle} />
              </div>
            </div>

            <div className="form-row" style={{ display: 'flex', gap: '24px' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input required type="email" id="email" name="email" className="form-input" style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="volume" style={labelStyle}>Monthly Lead Volume</label>
                <select id="volume" name="volume" required className="form-input" style={{ ...inputStyle, appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}>
                  <option value="" disabled selected>Select volume...</option>
                  <option value="<100">&lt;100</option>
                  <option value="100-500">100–500</option>
                  <option value="500-2K">500–2K</option>
                  <option value="2K+">2K+</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="bottleneck" style={labelStyle}>Biggest Bottleneck</label>
              <select id="bottleneck" name="bottleneck" required className="form-input" style={{ ...inputStyle, appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}>
                <option value="" disabled selected>Select bottleneck...</option>
                <option value="Slow lead follow-up">Slow lead follow-up</option>
                <option value="Disconnected tools">Disconnected tools</option>
                <option value="Manual ops">Manual ops</option>
                <option value="Poor conversion">Poor conversion</option>
                <option value="No pipeline visibility">No pipeline visibility</option>
                <option value="All of the above">All of the above</option>
              </select>
            </div>

            <div>
              <label htmlFor="revenue" style={labelStyle}>Target Revenue Goal</label>
              <select id="revenue" name="revenue" required className="form-input" style={{ ...inputStyle, appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}>
                <option value="" disabled selected>Select revenue goal...</option>
                <option value="$500K–$1M">$500K–$1M</option>
                <option value="$1M–$5M">$1M–$5M</option>
                <option value="$5M–$20M">$5M–$20M</option>
                <option value="$20M+">$20M+</option>
              </select>
            </div>

            <div>
              <label htmlFor="context" style={labelStyle}>Context</label>
              <textarea id="context" name="context" className="form-input" placeholder="Brief context on your business and what you're trying to solve..." style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}></textarea>
            </div>

            <button type="submit" className="btn btn-success" style={{ marginTop: '16px', width: '100%', fontSize: '17px', padding: '24px' }}>
              Claim Your Free Audit
            </button>
            <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-overlay-40)', marginTop: '8px' }}>
              We review every submission personally. No spam, no outsourced sales calls.
            </p>
            {/* Disable auto-nav to Captcha */}
            <input type="hidden" name="_captcha" value="false" />
          </form>
        )}
      </div>

      <style>{`
        .form-input:focus {
          border-color: var(--color-overlay-30) !important;
        }
        select option {
          background-color: var(--color-surface);
          color: var(--color-text-primary);
        }
        @media (max-width: 768px) {
          .form-row {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
