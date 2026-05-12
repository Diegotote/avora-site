import { useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IntroScreen from './sections/IntroScreen';
import TransitionScreen from './sections/TransitionScreen';
import Navigation from './components/Navigation';
import InicioPage from './sections/InicioPage';
import MetodologiaPage from './sections/MetodologiaPage';
import ServiciosPage from './sections/ServiciosPage';
import MembresiasPage from './sections/MembresiasPage';
import DiagnosticoPage from './sections/DiagnosticoPage';
import FaqPage from './sections/FaqPage';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';

gsap.registerPlugin(ScrollTrigger);

type AppPhase = 'intro' | 'transition' | 'main';
type MainSection = 'inicio' | 'metodologia' | 'servicios' | 'membresias' | 'diagnostico' | 'faq';

function App() {
  const [phase, setPhase] = useState<AppPhase>('intro');
  const [activeSection, setActiveSection] = useState<MainSection>('inicio');
  const [showContent, setShowContent] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMembershipForForm, setSelectedMembershipForForm] = useState<string>('');

  // Initial intro animation
  useEffect(() => {
    if (phase === 'intro') {
      document.body.style.overflow = 'hidden';
    } else if (phase === 'transition') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [phase]);

  const handleIntroClick = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPhase('transition');
      setIsTransitioning(false);
    }, 800);
  }, []);

  const handleEnterSite = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPhase('main');
      setShowContent(true);
      setIsTransitioning(false);
      // Initialize scroll reveals after content mounts
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, 800);
  }, []);

  const handleLogoClick = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPhase('intro');
      setActiveSection('inicio');
      setShowContent(false);
      setIsTransitioning(false);
      window.scrollTo(0, 0);
    }, 400);
  }, []);

  const handleNavClick = useCallback((section: MainSection) => {
    if (section === activeSection) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSection(section);
      window.scrollTo(0, 0);
      setIsTransitioning(false);
      setMobileMenuOpen(false);
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, 400);
  }, [activeSection]);

  const scrollToSection = useCallback((section: MainSection) => {
    handleNavClick(section);
  }, [handleNavClick]);

  const requestDiagnostic = useCallback((membership?: string) => {
    if (membership) setSelectedMembershipForForm(membership);
    setActiveSection('diagnostico');
    setMobileMenuOpen(false);
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }, []);

  return (
    <div className="relative min-h-screen bg-avora-base">
      {/* Background Effects - only on main site */}
      {phase === 'main' && <BackgroundEffects />}

      {/* Intro Screen */}
      {phase === 'intro' && (
        <IntroScreen
          onClick={handleIntroClick}
          isTransitioning={isTransitioning}
        />
      )}

      {/* Transition Screen */}
      {phase === 'transition' && (
        <TransitionScreen
          onEnter={handleEnterSite}
          isTransitioning={isTransitioning}
        />
      )}

      {/* Main Site */}
      {phase === 'main' && (
        <>
          <Navigation
            activeSection={activeSection}
            onNavClick={handleNavClick}
            onLogoClick={handleLogoClick}
            scrollToSection={scrollToSection}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />

          <main
            className={`page-zoom-enter transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}
          >
            {showContent && (
              <>
                {activeSection === 'inicio' && <InicioPage onNavClick={handleNavClick} />}
                {activeSection === 'metodologia' && <MetodologiaPage />}
                {activeSection === 'servicios' && <ServiciosPage onNavClick={handleNavClick} />}
                {activeSection === 'membresias' && <MembresiasPage onRequestDiagnostic={requestDiagnostic} />}
                {activeSection === 'diagnostico' && <DiagnosticoPage selectedMembership={selectedMembershipForForm} />}
                {activeSection === 'faq' && <FaqPage />}
              </>
            )}
          </main>

          {showContent && <Footer onNavClick={handleNavClick} />}
        </>
      )}
    </div>
  );
}

export default App;
