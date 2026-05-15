import { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const faqs = [
  {
    q: 'What does "one roof" actually mean?',
    a: 'It means you have one partner accountable for every layer of your digital infrastructure — from the website visitors first see, to the AI that responds to their inquiry, to the CRM that routes them to close, to any custom internal tooling your ops team needs. No hand-offs. No finger-pointing between vendors.'
  },
  {
    q: 'What size business is MalkEl built for?',
    a: "We work best with businesses generating $500K–$10M+ in annual revenue that are scaling and feeling the friction of a fragmented tech stack. If you're manually handling tasks that should be automated, or managing more than three separate tools that don't talk to each other, you're a strong fit."
  },
  {
    q: 'How long does a typical engagement take?',
    a: 'Initial deployment — from audit to live system — typically runs 6 to 12 weeks depending on scope. After that, most clients move to an ongoing retainer for optimization, scaling, and new feature development.'
  },
  {
    q: 'How is MalkEl different from a dev agency?',
    a: 'A dev agency takes a brief and builds to spec. We take ownership of outcomes. We audit your pipeline, architect the right solution, and stay accountable for results. We think like a CTO, not a contractor.'
  }
];

function AccordionItem({ item, isOpen, onClick }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div style={{ borderBottom: '1px solid var(--color-overlay-08)' }}>
      <button
        onClick={onClick}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: 'clamp(16px, 3vh, 32px) 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '21px',
          fontWeight: 400
        }}
      >
        <span>{item.q}</span>
        <span style={{
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          fontSize: '24px',
          fontWeight: 300,
          color: 'var(--color-overlay-50)'
        }}>
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: `${height}px`,
          overflow: 'hidden',
          transition: 'max-height 400ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div ref={contentRef} style={{ paddingBottom: '32px', color: 'var(--color-overlay-60)', lineHeight: 1.55 }}>
          {item.a}
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section container" ref={ref} style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className={`reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ marginBottom: 'clamp(32px, 5vh, 64px)' }}>
        <div className="text-eyebrow" style={{ marginBottom: '24px' }}>
          Questions
        </div>
        <h2 className="text-section-title">
          Worth answering up front.
        </h2>
      </div>

      <div className={`reveal ${isIntersecting ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms', borderTop: '1px solid var(--color-overlay-08)' }}>
        {faqs.map((item, index) => (
          <AccordionItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
}
