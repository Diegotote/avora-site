import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Crown, X, Check } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Membership {
  name: string;
  badge: string;
  purpose: string;
  detail?: string;
  includes?: string[];
  result?: string;
  warning?: string;
  idealProfile?: string;
  strategicUse?: string;
  isElite?: boolean;
  isCombo?: boolean;
  comboDetail?: string;
}

const insightMembership: Membership = {
  name: 'AVORA Insight',
  badge: 'Puerta de entrada · Diagnóstico 360°',
  purpose: 'Identificar los puntos de quiebre del negocio mediante un diagnóstico inicial basado en la fase de Alto.',
  includes: [
    'Análisis rápido de visibilidad digital',
    'Salud operativa básica',
    'Detección de fugas financieras por comisiones de terceros',
    'Primer mapa de claridad',
    'Recomendaciones iniciales',
  ],
  result: 'El hotel entiende dónde está parado y qué debería atender primero.',
};

const baseMemberships: Membership[] = [
  {
    name: 'AVORA Capital',
    badge: 'Estructura financiera',
    purpose: 'Inyectar el combustible necesario para el crecimiento mediante una lectura clara del contexto financiero del hotel.',
    detail: 'Servicio especializado en perfilar al hotel para soluciones de crédito empresarial, capital de trabajo o financiamiento para remodelación.',
    includes: ['Perfil inicial del hotel', 'Necesidad financiera estimada', 'Orden de información', 'Documentos requeridos', 'Canalización con aliados financieros cuando sea viable'],
    result: 'Conexión con la red de aliadas financieras más adecuada al perfil del hotel.',
    warning: 'AVORA no promete aprobación ni actúa como financiera.',
  },
  {
    name: 'AVORA Tec',
    badge: 'Automatización operativa',
    purpose: 'Organizar ideas operativas mediante tecnología simple y de implementación rápida.',
    detail: 'Implementación de chatbot de WhatsApp, motor de reservas directo por mensajería y un CRM básico en la nube para gestión de huéspedes.',
    includes: ['WhatsApp Business optimizado', 'Respuestas rápidas', 'CRM básico', 'Seguimiento de prospectos', 'Flujo inicial de reservas', 'Sistema simple para recuperar oportunidades'],
    result: 'Reducción de dependencia de aplicaciones externas y recuperación potencial de comisiones por reserva.',
  },
  {
    name: 'AVORA Tec Plus',
    badge: 'Soberanía digital',
    purpose: 'Centralizar el mando del negocio en una infraestructura tecnológica propia.',
    detail: 'Incluye el sistema Tec más el desarrollo de una página web profesional con motor de reservas integrado y un CRM personalizado que vincula todos los canales digitales.',
    includes: ['Página web profesional', 'Motor de reservas', 'CRM personalizado', 'Integración de canales', 'Base de datos de consultas', 'Automatizaciones'],
    result: 'Omnicanalidad: consultas de Facebook, Instagram, Web y WhatsApp mejor organizadas para convertirse en reservas.',
  },
  {
    name: 'AVORA People',
    badge: 'Capacitación y liderazgo',
    purpose: 'Profesionalizar el factor humano bajo una metodología de liderazgo práctico, servicio y seguimiento.',
    detail: 'Programas de capacitación para personal en atención al cliente, ventas, recursos humanos y mantenimiento.',
    includes: ['Capacitación para recepción', 'Capacitación de ventas y seguimiento', 'Manejo de objeciones', 'Atención al huésped', 'Comunicación interna', 'Cultura de servicio'],
    result: 'Un equipo más alineado a la visión del dueño, capaz de mejorar atención, elevar ticket promedio y fortalecer reseñas.',
  },
];

const comboMemberships: Membership[] = [
  {
    name: 'AVORA Duo',
    badge: 'Combo estratégico flexible',
    purpose: 'Atacar los dos dolores más grandes del hotelero a un precio preferencial.',
    comboDetail: 'El cliente selecciona dos membresías base para iniciar su transformación. Ejemplo: Capital + Tec, People + Tec, Capital + People.',
    result: 'Una ruta flexible para resolver prioridades sin contratar todo el ecosistema desde el inicio.',
    isCombo: true,
  },
  {
    name: 'AVORA Essentials',
    badge: 'La base del éxito',
    purpose: 'Transformación integral sin requerir todavía una infraestructura web centralizada.',
    detail: 'El Power Trio: Capital + Tec + People. Resuelve falta de dinero, desorden operativo y capacitación del personal en un solo paquete.',
    includes: ['Estructura financiera', 'Automatización operativa básica', 'Capacitación de personal', 'Seguimiento inicial'],
    result: 'El hotel gana orden, equipo más preparado y herramientas para operar mejor.',
    isCombo: true,
  },
];

const legendMembership: Membership = {
  name: 'AVORA Legend',
  badge: 'ELITE · La cúspide del crecimiento',
  purpose: 'Implementación total de la Metodología AVORA para hoteles que aspiran al liderazgo de su sector.',
  detail: 'Es la membresía All-Inclusive que abarca el sistema completo: diagnóstico continuo, estrategia financiera permanente, ecosistema digital Tec Plus, CRM Pro y capacitación de alto nivel.',
  includes: [
    'Diagnóstico continuo trimestral',
    'Estrategia financiera permanente',
    'Ecosistema digital Tec Plus',
    'Web profesional',
    'CRM Pro',
    'Chatbot y automatizaciones',
    'Capacitación de alto impacto',
    'Acompañamiento prioritario',
    'Reportes ejecutivos',
    'Seguimiento de resultados',
  ],
  result: 'Hotel posicionado como referente de su categoría, con operación, marca y resultados de nivel elite.',
  idealProfile: 'Hoteles ambiciosos que quieren convertir crecimiento en liderazgo de mercado.',
  strategicUse: 'El compromiso máximo con la metodología AVORA para abrir camino al brazo ejecutivo del hotel.',
  isElite: true,
};

export default function MembresiasPage({ onRequestDiagnostic }: { onRequestDiagnostic?: (membership?: string) => void }) {
  const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null);

  const insightRef = useScrollReveal<HTMLDivElement>({ threshold: 0.85 });
  const baseRef = useScrollReveal<HTMLDivElement>({ stagger: 0.15, threshold: 0.8 });
  const comboRef = useScrollReveal<HTMLDivElement>({ stagger: 0.15, threshold: 0.8 });

  useEffect(() => {
    if (!selectedMembership) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedMembership]);

  return (
    <div className="relative z-10 pt-24">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="container-avora max-w-3xl text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-avora-text-primary leading-tight">
            Ecosistema de Membresías AVORA
          </h1>
          <p className="mt-6 font-body text-base md:text-lg font-light text-avora-text-secondary leading-relaxed">
            Nuestras membresías están diseñadas para acompañar al hotelero en cada etapa de su crecimiento, permitiendo una escalabilidad orgánica y resultados desde el primer nivel de intervención.
          </p>
        </div>
      </section>

      {/* Categoria 1: Puerta de Entrada */}
      <section className="py-8 md:py-12">
        <div className="container-avora">
          <span className="label-avora tracking-[0.2em] text-avora-gold mb-6 block">
            PUERTA DE ENTRADA
          </span>

          <div ref={insightRef} className="glass-card p-8 md:p-10">
            <span className="inline-block px-3 py-1 text-xs font-body text-avora-gold border border-avora-gold/30 rounded mb-4">
              {insightMembership.badge}
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-avora-text-primary mb-4">
              {insightMembership.name}
            </h3>
            <p className="font-body text-base text-avora-text-secondary leading-relaxed mb-6">
              {insightMembership.purpose}
            </p>

            {insightMembership.includes && (
              <ul className="space-y-2 mb-6">
                {insightMembership.includes.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-avora-gold mt-0.5 flex-shrink-0" />
                    <span className="font-body text-sm text-avora-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-l-2 border-avora-gold pl-4 mb-6">
              <p className="font-body text-sm font-medium text-avora-gold">
                {insightMembership.result}
              </p>
            </div>

            <button
              onClick={() => setSelectedMembership(insightMembership)}
              className="btn-secondary text-sm"
            >
              Ver detalle
            </button>
          </div>
        </div>
      </section>

      {/* Categoria 2: Membresias Base */}
      <section className="py-8 md:py-12">
        <div className="container-avora">
          <span className="label-avora tracking-[0.2em] text-avora-gold mb-6 block">
            MEMBRESÍAS BASE
          </span>

          <div ref={baseRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {baseMemberships.map((membership, i) => (
              <div key={i} className="glass-card p-6 md:p-8">
                <span className="inline-block px-3 py-1 text-xs font-body text-avora-gold border border-avora-gold/30 rounded mb-4">
                  {membership.badge}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-avora-text-primary mb-3">
                  {membership.name}
                </h3>
                <p className="font-body text-sm text-avora-text-secondary leading-relaxed mb-4">
                  {membership.purpose}
                </p>
                <button
                  onClick={() => setSelectedMembership(membership)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Ver detalle
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categoria 3: Combos */}
      <section className="py-8 md:py-12">
        <div className="container-avora">
          <span className="label-avora tracking-[0.2em] text-avora-gold mb-6 block">
            COMBOS ESTRATÉGICOS
          </span>

          <div ref={comboRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comboMemberships.map((membership, i) => (
              <div key={i} className="glass-card p-6 md:p-8">
                <span className="inline-block px-3 py-1 text-xs font-body text-avora-gold border border-avora-gold/30 rounded mb-4">
                  {membership.badge}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-avora-text-primary mb-3">
                  {membership.name}
                </h3>
                <p className="font-body text-sm text-avora-text-secondary leading-relaxed mb-4">
                  {membership.purpose}
                </p>
                <button
                  onClick={() => setSelectedMembership(membership)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Ver detalle
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categoria 4: Membresia Elite - AVORA Legend */}
      <section className="py-8 md:py-12 pb-20 md:pb-32">
        <div className="container-avora">
          <span className="label-avora tracking-[0.2em] text-avora-gold mb-6 block">
            MEMBRESÍA ELITE
          </span>

          <div className="relative">
            {/* Animated border glow */}
            <div
              className="absolute -inset-px rounded-2xl opacity-60 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(200,169,126,0.3) 0%, transparent 30%, transparent 70%, rgba(200,169,126,0.2) 100%)',
                animation: 'pulse 3s ease-in-out infinite',
              }}
            />

            <div
              className="relative p-8 md:p-12 rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #171717 0%, rgba(200,169,126,0.04) 50%, #171717 100%)',
                border: '2px solid rgba(200, 169, 126, 0.4)',
                boxShadow: '0 8px 60px rgba(200, 169, 126, 0.15), 0 0 100px rgba(200, 169, 126, 0.05)',
              }}
            >
              {/* Elite Badge */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-2 bg-avora-gold px-4 py-1.5 rounded">
                  <Crown className="w-4 h-4 text-avora-text-dark" />
                  <span className="font-accent text-xs font-bold uppercase tracking-[0.2em] text-avora-text-dark">
                    {legendMembership.badge}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-3xl md:text-4xl text-avora-gold-bright mb-4">
                {legendMembership.name}
              </h3>

              <p className="font-body text-lg font-light text-avora-text-secondary leading-relaxed mb-6 max-w-2xl">
                {legendMembership.purpose}
              </p>

              <p className="font-body text-base text-avora-text-secondary leading-relaxed mb-8 max-w-2xl">
                {legendMembership.detail}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {legendMembership.includes?.map((item, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-avora-gold flex-shrink-0" />
                    <span className="font-body text-sm text-avora-text-primary">{item}</span>
                  </div>
                ))}
              </div>

              <div className="border-l-2 border-avora-gold pl-4 mb-6">
                <p className="font-body text-base font-medium text-avora-gold">
                  {legendMembership.result}
                </p>
              </div>

              {legendMembership.idealProfile && (
                <p className="font-body text-sm text-avora-text-muted italic mb-8">
                  {legendMembership.idealProfile}
                </p>
              )}

              <button
                onClick={() => setSelectedMembership(legendMembership)}
                className="btn-primary shimmer text-base px-8 py-4"
                style={{
                  boxShadow: '0 0 30px rgba(200, 169, 126, 0.3)',
                }}
              >
                Solicitar AVORA Legend
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Modal */}
      {selectedMembership && createPortal(
        <div
          className="fixed inset-0 z-[200] modal-center-shell"
          onClick={() => setSelectedMembership(null)}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-lg"
            style={{ animation: 'fade-in 0.3s ease-out forwards' }}
          />

          {/* Modal */}
          <div
            className={`relative modal-panel-fixed modal-scroll rounded-2xl ${selectedMembership.isElite ? 'modal-panel-elite' : ''}`}
            style={{
              background: '#171717',
              border: '1px solid rgba(200, 169, 126, 0.3)',
              boxShadow: '0 24px 80px rgba(0, 0, 0, 0.8)',
              animation: 'zoom-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#171717] z-10 flex items-center justify-between p-6 border-b border-[rgba(200,169,126,0.1)]">
              <div>
                {selectedMembership.isElite && (
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-4 h-4 text-avora-gold" />
                    <span className="font-accent text-xs font-bold uppercase tracking-[0.2em] text-avora-gold">
                      ELITE
                    </span>
                  </div>
                )}
                <h3 className="font-display text-xl md:text-2xl text-avora-text-primary">
                  {selectedMembership.name}
                </h3>
                <span className="text-xs font-body text-avora-gold mt-1 block">
                  {selectedMembership.badge}
                </span>
              </div>
              <button
                onClick={() => setSelectedMembership(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(200,169,126,0.1)] transition-colors"
              >
                <X className="w-5 h-5 text-avora-text-secondary" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              <p className="font-body text-base text-avora-text-secondary leading-relaxed">
                {selectedMembership.purpose}
              </p>

              {selectedMembership.detail && (
                <p className="font-body text-sm text-avora-text-secondary leading-relaxed">
                  {selectedMembership.detail}
                </p>
              )}

              {selectedMembership.comboDetail && (
                <p className="font-body text-sm text-avora-text-secondary leading-relaxed">
                  {selectedMembership.comboDetail}
                </p>
              )}

              {selectedMembership.includes && (
                <div>
                  <p className="label-avora mb-3">Incluye</p>
                  <ul className="space-y-2">
                    {selectedMembership.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-avora-gold mt-0.5 flex-shrink-0" />
                        <span className="font-body text-sm text-avora-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedMembership.warning && (
                <div className="border-l-2 border-avora-gold pl-4">
                  <p className="font-body text-sm font-medium text-avora-gold">
                    {selectedMembership.warning}
                  </p>
                </div>
              )}

              {selectedMembership.result && (
                <div className="border-l-2 border-avora-gold pl-4">
                  <p className="font-body text-sm font-medium text-avora-gold">
                    {selectedMembership.result}
                  </p>
                </div>
              )}

              {selectedMembership.strategicUse && (
                <p className="font-body text-sm text-avora-text-muted italic">
                  {selectedMembership.strategicUse}
                </p>
              )}

              {selectedMembership.idealProfile && (
                <p className="font-body text-sm text-avora-text-muted italic">
                  {selectedMembership.idealProfile}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[#171717] p-6 border-t border-[rgba(200,169,126,0.1)]">
              <button
                className="btn-primary w-full justify-center shimmer"
                onClick={() => {
                  const membershipName = selectedMembership.name;
                  setSelectedMembership(null);
                  onRequestDiagnostic?.(membershipName);
                }}
              >
                Solicitar {selectedMembership.name}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
