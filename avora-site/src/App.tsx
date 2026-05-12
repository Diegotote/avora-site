import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
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
import ScrollKinetics from './components/ScrollKinetics';
import { useAutoTranslate, type Language } from './lib/i18n';

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
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = window.localStorage.getItem('avora-language');
      if (savedLanguage === 'es' || savedLanguage === 'en') return savedLanguage;
    }
    if (typeof navigator === 'undefined') return 'es';
    return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es';
  });

  useAutoTranslate(language);

  useEffect(() => {
    window.localStorage.setItem('avora-language', language);
  }, [language]);

  const scrollToTop = useCallback((behavior: ScrollBehavior = 'auto') => {
    window.scrollTo({ top: 0, left: 0, behavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const hardScrollToTop = useCallback(() => {
    scrollToTop('auto');
    const timings = [0, 16, 48, 100, 180, 320];
    timings.forEach((delay) => {
      window.setTimeout(() => scrollToTop('auto'), delay);
    });
    window.requestAnimationFrame(() => {
      scrollToTop('auto');
      window.requestAnimationFrame(() => scrollToTop('auto'));
    });
  }, [scrollToTop]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    if (phase === 'main') hardScrollToTop();
  }, [activeSection, phase, hardScrollToTop]);

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
      hardScrollToTop();
      // Initialize scroll reveals after content mounts
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, 800);
  }, [hardScrollToTop]);

  const handleLogoClick = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPhase('intro');
      setActiveSection('inicio');
      setShowContent(false);
      setIsTransitioning(false);
      hardScrollToTop();
    }, 400);
  }, [hardScrollToTop]);

  const handleNavClick = useCallback((section: MainSection) => {
    if (section === activeSection) {
      hardScrollToTop();
      setMobileMenuOpen(false);
      return;
    }
    setIsTransitioning(true);
    hardScrollToTop();
    setTimeout(() => {
      setActiveSection(section);
      hardScrollToTop();
      setIsTransitioning(false);
      setMobileMenuOpen(false);
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, 400);
  }, [activeSection, hardScrollToTop]);

  const scrollToSection = useCallback((section: MainSection) => {
    handleNavClick(section);
  }, [handleNavClick]);

  const requestDiagnostic = useCallback((membership?: string) => {
    if (membership) setSelectedMembershipForForm(membership);
    hardScrollToTop();
    setActiveSection('diagnostico');
    setMobileMenuOpen(false);
    window.setTimeout(() => {
      hardScrollToTop();
    }, 50);
  }, [hardScrollToTop]);

  return (
    <div className="relative min-h-screen bg-avora-base">
      {/* Background Effects - only on main site */}
      {phase === 'main' && <BackgroundEffects />}
      {phase === 'main' && <ScrollKinetics />}

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
            language={language}
            setLanguage={setLanguage}
          />

          <main
            className={`page-zoom-enter transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}
          >
            {showContent && (
              <>
                {activeSection === 'inicio' && <InicioPage onNavClick={handleNavClick} language={language} />}
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
