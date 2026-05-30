import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function AuditForm() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [formDataState, setFormDataState] = useState({
    name: '',
    company: '',
    bottleneck: '',
    revenue: '',
    context: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataState(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formDataState.email && !formDataState.phone) {
      alert("Please provide either an email or a phone number.");
      return;
    }

    try {
      // Use FormData which is often more reliable for CORS than JSON
      const formData = new FormData();
      Object.keys(formDataState).forEach(key => {
        formData.append(key, formDataState[key]);
      });
      
      // Add meta fields
      formData.append("_subject", `New Audit Request from ${formDataState.name}`);
      formData.append("_template", "table");
      formData.append("_captcha", "false");

      const response = await fetch("https://formsubmit.co/ajax/info@malkel.com", {
        method: "POST",
        body: formData,
        mode: 'cors',
        cache: 'no-cache'
      });
      
      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonErr) {
        const text = await response.text();
        throw new Error(text || `HTTP error! Status: ${response.status}`);
      }

      if (response.ok && (responseData.success === true || responseData.success === "true")) {
        setSubmitted(true);
      } else {
        throw new Error(responseData.message || "Form submission failed.");
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
      alert(error.message || "An unexpected error occurred. Please try again later.");
    }
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: 'var(--color-field-bg)',
    border: '1px solid var(--color-panel-border)',
    borderRadius: '8px',
    padding: '16px 20px',
    color: 'var(--color-text-primary)',
    fontSize: '17px',
    fontFamily: 'inherit',
    transition: 'border-color 200ms ease, background-color 200ms ease',
    outline: 'none'
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: 'var(--select-arrow-icon)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    backgroundSize: '16px'
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
        ) : step === 1 ? (
          <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div className="form-row" style={{ display: 'flex', gap: '24px' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="name" style={labelStyle}>Name</label>
                <input required type="text" id="name" name="name" value={formDataState.name} onChange={handleInputChange} className="form-input" style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="company" style={labelStyle}>Company</label>
                <input required type="text" id="company" name="company" value={formDataState.company} onChange={handleInputChange} className="form-input" style={inputStyle} />
              </div>
            </div>

            <div>
              <label htmlFor="revenue" style={labelStyle}>Target Revenue Goal</label>
              <select id="revenue" name="revenue" value={formDataState.revenue} onChange={handleInputChange} required className="form-input" style={selectStyle}>
                <option value="" disabled>Select revenue goal...</option>
                <option value="10K to 50K">10K to 50K</option>
                <option value="50K to 100K">50K to 100K</option>
                <option value="100K to 500K">100K to 500K</option>
                <option value="500K to 2,000,000">500K to 2,000,000</option>
              </select>
            </div>

            <div>
              <label htmlFor="context" style={labelStyle}>Detailed Summary</label>
              <textarea id="context" name="context" value={formDataState.context} onChange={handleInputChange} className="form-input" placeholder="Brief context on your business and what you're trying to solve..." style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}></textarea>
            </div>

            <button type="submit" className="btn btn-success" style={{ marginTop: '16px', width: '100%', fontSize: '17px', padding: '24px' }}>
              Claim Your Free Audit
            </button>
            <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-overlay-40)', marginTop: '8px' }}>
              We review every submission personally. No spam, no outsourced sales calls.
            </p>
          </form>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <div>
              <label htmlFor="bottleneck" style={labelStyle}>Biggest Bottleneck</label>
              <select id="bottleneck" name="bottleneck" value={formDataState.bottleneck} onChange={handleInputChange} required className="form-input" style={selectStyle}>
                <option value="" disabled>Select bottleneck...</option>
                <option value="Slow lead follow-up">Slow lead follow-up</option>
                <option value="Disconnected tools">Disconnected tools</option>
                <option value="Manual ops">Manual ops</option>
                <option value="Poor conversion">Poor conversion</option>
                <option value="No pipeline visibility">No pipeline visibility</option>
                <option value="No digital presence or in need of a website">No digital presence or in need of a website</option>
                <option value="Other">Other</option>
                <option value="All of the above">All of the above</option>
              </select>
            </div>

            <div className="form-row" style={{ display: 'flex', gap: '24px' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="email" style={labelStyle}>Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formDataState.email} 
                  onChange={handleInputChange} 
                  className="form-input" 
                  placeholder="name@company.com"
                  style={inputStyle} 
                />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="phone" style={labelStyle}>
                  Phone Number <span style={{ fontSize: '12px', color: 'var(--color-overlay-40)', fontWeight: 'normal', marginLeft: '4px' }}>(Available on WhatsApp)</span>
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formDataState.phone} 
                  onChange={handleInputChange} 
                  className="form-input" 
                  placeholder="(555) 000-0000"
                  style={inputStyle} 
                />
              </div>
            </div>
            
            <p style={{ fontSize: '14px', color: 'var(--color-overlay-60)', textAlign: 'center', marginTop: '-8px' }}>
              Please provide at least one method of contact.
            </p>

            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
              <button type="button" onClick={() => setStep(1)} className="btn" style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid var(--color-panel-border)', color: 'var(--color-text-primary)', fontSize: '17px', padding: '24px' }}>
                Back
              </button>
              <button type="submit" className="btn btn-success" style={{ flex: 2, fontSize: '17px', padding: '24px' }}>
                Submit Request
              </button>
            </div>
            
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
        @media (max-height: 1000px) {
          .form-input {
            padding: 10px 14px !important;
            font-size: 14px !important;
          }
          #context {
            min-height: 80px !important;
          }
          .btn-success, .btn {
            padding: 16px !important;
            margin-top: 8px !important;
          }
          form {
            gap: 14px !important;
          }
          .form-row {
            gap: 14px !important;
          }
          .text-section-title {
            margin-bottom: 12px !important;
            font-size: clamp(32px, 4vw, 48px) !important;
          }
          .text-body-large {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}

