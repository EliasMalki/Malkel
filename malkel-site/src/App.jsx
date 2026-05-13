import AuroraSweep from './components/AuroraSweep';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TrustMarquee from './components/TrustMarquee';
import AgitationSection from './components/AgitationSection';
import EcosystemBento from './components/EcosystemBento';
import Process from './components/Process';
import WhyMalkEl from './components/WhyMalkEl';
import FAQAccordion from './components/FAQAccordion';
import Projects from './components/Projects';
import InTheWorks from './components/InTheWorks';
import AuditForm from './components/AuditForm';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <AuroraSweep />
      <Navigation />
      <main>
        {/* 1. Hero */}
        <Hero />

        {/* 2. Agitation */}
        <AgitationSection />

        {/* 3. Ecosystem */}
        <EcosystemBento />

        {/* 4. Recent Deployments */}
        <Projects />

        {/* 5. Comparison */}
        <WhyMalkEl />

        {/* 6. Audit Form */}
        <AuditForm />

        {/* Hidden sections */}
        {/* <TrustMarquee /> */}
        {/* <Process /> */}
        {/* <FAQAccordion /> */}
        {/* <InTheWorks /> */}
      </main>
      <Footer />
    </>
  );
}

export default App;
