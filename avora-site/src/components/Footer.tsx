import { Mail, Phone, Instagram } from 'lucide-react';
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <div className="mb-4">
              <Logo size="small" />
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
                <span className="font-body text-sm text-avora-text-secondary">avora.contacto@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-avora-gold flex-shrink-0" />
                <span className="font-body text-sm text-avora-text-secondary">56 39 47 2727</span>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-avora-gold flex-shrink-0" />
                <span className="font-body text-sm text-avora-text-secondary">@_diego.castell</span>
              </li>
            </ul>
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
