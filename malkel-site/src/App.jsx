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
        <Hero />
        <TrustMarquee />
        <AgitationSection />
        <EcosystemBento />
        <Process />
        <WhyMalkEl />
        <FAQAccordion />
        <Projects />
        <InTheWorks />
        <AuditForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
