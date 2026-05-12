import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

type MainSection = 'inicio' | 'metodologia' | 'servicios' | 'membresias' | 'diagnostico' | 'faq';
type Language = 'es' | 'en';

interface NavigationProps {
  activeSection: MainSection;
  onNavClick: (section: MainSection) => void;
  onLogoClick: () => void;
  scrollToSection: (section: MainSection) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  language: Language;
  setLanguage: (language: Language) => void;
}

const navLabels: Record<Language, { label: string; value: MainSection }[]> = {
  es: [
    { label: 'Inicio', value: 'inicio' },
    { label: 'Metodología', value: 'metodologia' },
    { label: 'Servicios', value: 'servicios' },
    { label: 'Membresías', value: 'membresias' },
    { label: 'FAQ', value: 'faq' },
    { label: 'Diagnóstico', value: 'diagnostico' },
  ],
  en: [
    { label: 'Home', value: 'inicio' },
    { label: 'Methodology', value: 'metodologia' },
    { label: 'Services', value: 'servicios' },
    { label: 'Memberships', value: 'membresias' },
    { label: 'FAQ', value: 'faq' },
    { label: 'Diagnostic', value: 'diagnostico' },
  ],
};

export default function Navigation({
  activeSection,
  onNavClick,
  onLogoClick,
  scrollToSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  language,
  setLanguage,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const navItems = navLabels[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(23,23,23,0.9)] backdrop-blur-xl border-b border-[rgba(200,169,126,0.08)]'
            : 'bg-[rgba(12,12,12,0.62)] backdrop-blur-md'
        }`}
        style={{ height: '96px' }}
      >
        <div className="container-avora h-full flex items-center justify-between">
          {/* Logo oficial: al hacer clic regresa a la experiencia inicial */}
          <button
            onClick={onLogoClick}
            className="group cursor-pointer flex items-center"
            aria-label="Regresar al inicio AVORA"
          >
            <Logo size="nav" className="transition-transform duration-300 group-hover:scale-[1.03]" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavClick(item.value)}
                className={`relative font-body text-[13px] font-medium uppercase tracking-[0.06em] transition-colors duration-200 ${
                  activeSection === item.value
                    ? 'text-avora-gold'
                    : 'text-avora-text-secondary hover:text-avora-gold'
                }`}
              >
                {item.label}
                {activeSection === item.value && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-avora-gold" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Language Selector - placeholder */}
            <div className="hidden sm:flex items-center gap-1 font-body text-xs font-medium text-avora-text-muted">
              <button
                type="button"
                onClick={() => setLanguage('es')}
                className={`transition-colors ${language === 'es' ? 'text-avora-gold' : 'hover:text-avora-gold'}`}
                aria-pressed={language === 'es'}
              >
                ES
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`transition-colors ${language === 'en' ? 'text-avora-gold' : 'hover:text-avora-gold'}`}
                aria-pressed={language === 'en'}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('diagnostico')}
              className="hidden md:inline-flex btn-primary text-xs py-2 px-4 shimmer"
            >
              {language === 'es' ? 'Solicitar diagnóstico' : 'Request diagnostic'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-avora-gold" />
              ) : (
                <Menu className="w-5 h-5 text-avora-gold" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[rgba(12,12,12,0.98)] backdrop-blur-xl pt-20 px-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavClick(item.value)}
                className={`text-left font-body text-lg font-medium py-3 border-b border-[rgba(200,169,126,0.1)] transition-colors ${
                  activeSection === item.value
                    ? 'text-avora-gold'
                    : 'text-avora-text-primary hover:text-avora-gold'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                scrollToSection('diagnostico');
                setMobileMenuOpen(false);
              }}
              className="btn-primary mt-4 w-full justify-center"
            >
              {language === 'es' ? 'Solicitar diagnóstico' : 'Request diagnostic'}
            </button>
            <div className="mt-5 flex justify-center gap-3 text-sm">
              <button
                type="button"
                onClick={() => setLanguage('es')}
                className={language === 'es' ? 'text-avora-gold' : 'text-avora-text-secondary'}
              >
                ES
              </button>
              <span className="text-avora-text-muted">/</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'text-avora-gold' : 'text-avora-text-secondary'}
              >
                EN
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
