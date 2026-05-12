import { Building2, Mail, Phone, Instagram, UserRound } from 'lucide-react';
import Logo from './Logo';

type MainSection = 'inicio' | 'metodologia' | 'servicios' | 'membresias' | 'diagnostico' | 'faq';

interface FooterProps {
  onNavClick: (section: MainSection) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const navLinks: { label: string; value: MainSection }[] = [
    { label: 'Inicio', value: 'inicio' },
    { label: 'Metodología', value: 'metodologia' },
    { label: 'Servicios', value: 'servicios' },
    { label: 'Membresías', value: 'membresias' },
    { label: 'Diagnóstico', value: 'diagnostico' },
    { label: 'FAQ', value: 'faq' },
  ];

  return (
    <footer className="bg-avora-surface border-t border-[rgba(200,169,126,0.1)]">
      <div className="container-avora py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div>
            <div className="mb-4">
              <Logo size="footer" />
            </div>
            <p className="font-body text-sm text-avora-text-secondary leading-relaxed">
              Crecimiento empresarial para hoteles con potencial.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="label-avora mb-4 tracking-[0.1em]">Navegación</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.value}>
                  <button
                    onClick={() => onNavClick(link.value)}
                    className="font-body text-sm text-avora-text-secondary hover:text-avora-text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="label-avora mb-4 tracking-[0.1em]">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-avora-gold flex-shrink-0" />
                <a
                  href="mailto:avora.contacto@gmail.com"
                  className="font-body text-sm text-avora-text-secondary hover:text-avora-gold transition-colors"
                >
                  avora.contacto@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-avora-gold flex-shrink-0" />
                <a
                  href="https://wa.me/525639472727"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-avora-text-secondary hover:text-avora-gold transition-colors"
                >
                  56 39 47 2727
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-avora-gold flex-shrink-0" />
                <a
                  href="https://www.instagram.com/avora_bg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-avora-text-secondary hover:text-avora-gold transition-colors"
                >
                  @avora_bg
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-avora-gold flex-shrink-0" />
                <a
                  href="https://www.facebook.com/profile.php?id=61589765904611"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-avora-text-secondary hover:text-avora-gold transition-colors"
                >
                  @AVORA Business Growth
                </a>
              </li>
            </ul>
          </div>

          {/* Founder Column */}
          <div>
            <h4 className="label-avora mb-4 tracking-[0.1em]">Fundador</h4>
            <div className="space-y-3">
              <p className="font-body text-sm text-avora-text-secondary leading-relaxed">
                Hombre líder, seguro y auténtico.
              </p>
              <div>
                <p className="font-body text-sm font-medium text-avora-text-primary">Diego Castellón</p>
                <p className="font-body text-xs text-avora-text-muted">CEO de AVORA Business Growth</p>
              </div>
              <a
                href="https://www.instagram.com/_diego.castell/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm text-avora-text-secondary hover:text-avora-gold transition-colors"
              >
                <UserRound className="w-4 h-4 text-avora-gold" />
                @_diego.castell
              </a>
            </div>
          </div>

          {/* Disclaimer Column */}
          <div>
            <h4 className="label-avora mb-4 tracking-[0.1em]">Aviso</h4>
            <p className="font-body text-[13px] text-avora-text-muted leading-relaxed">
              AVORA Business Growth no es una financiera y no promete aprobación de créditos. Su función es estratégica, operativa y de vinculación con aliados cuando sea viable.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(255,255,255,0.05)] mt-12 pt-6 text-center">
          <p className="font-body text-xs text-avora-text-muted">
            AVORA Business Growth &middot; Fundado por Diego Castellón
          </p>
        </div>
      </div>
    </footer>
  );
}
