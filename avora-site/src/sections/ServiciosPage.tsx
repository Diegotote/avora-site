import { useState } from 'react';
import { Search, ClipboardList, GraduationCap, Cpu, Handshake, TrendingUp, ChevronDown, Check } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const services = [
  {
    icon: Search,
    title: 'Diagnóstico de crecimiento hotelero',
    content: 'Es el punto de entrada. Revisamos el contexto del hotel: operación, ventas, ocupación aproximada, atención al huésped, seguimiento, procesos internos, necesidades de capital, equipo y tecnología. El objetivo no es juzgar al negocio, sino entenderlo con claridad para saber qué requiere primero.',
    deliverables: ['Reporte breve de diagnóstico', 'Mapa de oportunidades', 'Prioridades de acción'],
    hasCta: true,
  },
  {
    icon: ClipboardList,
    title: 'Plan básico de mejora operativa',
    content: 'Después del diagnóstico, AVORA propone una ruta práctica para mejorar áreas específicas: recepción, seguimiento a prospectos, atención al huésped, comunicación interna, procesos administrativos, control de tareas, tiempos de respuesta o experiencia del cliente.',
    deliverables: ['Plan de acción de 30 días', 'Prioridades', 'Responsables', 'Herramientas', 'Seguimiento'],
    hasCta: false,
  },
  {
    icon: GraduationCap,
    title: 'Capacitación de personal',
    content: 'Capacitaciones sencillas, humanas y aplicables para que el equipo mejore sin sentirse atacado. Se puede trabajar atención al huésped, ventas, seguimiento por WhatsApp, manejo de objeciones, experiencia del cliente, comunicación y cultura de servicio.',
    deliverables: ['Sesión de capacitación', 'Guía práctica', 'Checklist de servicio', 'Evaluación básica'],
    hasCta: false,
  },
  {
    icon: Cpu,
    title: 'Tecnología simple y automatización',
    content: 'La tecnología no se plantea como algo complicado ni caro. AVORA ayuda a implementar herramientas accesibles para ordenar la operación y mejorar el seguimiento.',
    tools: ['WhatsApp Business', 'Respuestas rápidas', 'Formularios de diagnóstico', 'CRM básico en Google Sheets', 'Tablero de seguimiento', 'Chatbot inicial', 'Landing page simple', 'Automatizaciones ligeras'],
    deliverables: ['Herramienta configurada', 'Instrucciones de uso', 'Sistema básico de seguimiento'],
    hasCta: false,
  },
  {
    icon: Handshake,
    title: 'Vinculación con aliados estratégicos',
    content: 'Cuando el hotel requiere capital, remodelación, expansión o liquidez, AVORA puede preparar el caso y canalizarlo con aliados especializados. Esto no significa prometer aprobación ni actuar como financiera. Significa ordenar información, entender la necesidad y acompañar el proceso de vinculación.',
    deliverables: ['Perfil inicial del hotel', 'Necesidad financiera estimada', 'Documentos requeridos', 'Canalización con aliado'],
    hasWarning: true,
    hasCta: false,
  },
  {
    icon: TrendingUp,
    title: 'Acompañamiento y seguimiento',
    content: 'El crecimiento requiere seguimiento. AVORA acompaña la ejecución de acciones durante un periodo determinado, revisando avances, obstáculos, prioridades y siguientes pasos.',
    deliverables: ['Reuniones de seguimiento', 'Tablero de avances', 'Cierre de resultados', 'Próximos pasos'],
    hasCta: false,
  },
];

const tools = [
  'Formulario de diagnóstico hotelero',
  'Base de prospectos',
  'Guion de llamada y WhatsApp',
  'Presentación comercial',
  'Checklist de operación hotelera',
  'Plantilla de plan de acción de 30 días',
  'CRM básico en Google Sheets',
  'Chatbot o formulario de captación',
  'Guía de capacitación',
  'Documento para vinculación con aliados',
];

const packages = [
  { title: 'Diagnóstico AVORA', desc: 'Sesión inicial para entender el contexto del hotel, detectar áreas de oportunidad y entregar una ruta breve de prioridades.' },
  { title: 'Ruta de crecimiento 30 días', desc: 'Diagnóstico + plan operativo + seguimiento semanal para implementar mejoras concretas durante un mes.' },
  { title: 'Capacitación Express', desc: 'Sesión práctica para recepción, ventas, atención al huésped o seguimiento por WhatsApp.' },
  { title: 'Digitalización Básica', desc: 'Configuración de WhatsApp Business, formulario, CRM simple o sistema de seguimiento de prospectos y huéspedes.' },
  { title: 'Perfilamiento para aliados financieros', desc: 'Orden inicial de información y canalización con aliados estratégicos cuando el hotel requiera explorar soluciones financieras.' },
];

type MainSection = 'inicio' | 'metodologia' | 'servicios' | 'membresias' | 'diagnostico' | 'faq';

interface ServiciosPageProps {
  onNavClick?: (section: MainSection) => void;
}

export default function ServiciosPage({ onNavClick }: ServiciosPageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toolsRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08, threshold: 0.8 });
  const packagesRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1, threshold: 0.8 });

  return (
    <div className="relative z-10 pt-24">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="container-avora max-w-3xl text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-avora-text-primary leading-tight">
            Servicios AVORA
          </h1>
          <p className="mt-6 font-body text-base md:text-lg font-light text-avora-text-secondary leading-relaxed">
            Cada servicio puede funcionar de forma independiente, pero juntos forman una ruta completa de crecimiento empresarial para hoteles.
          </p>
        </div>
      </section>

      {/* Services Accordion */}
      <section className="py-8 md:py-12">
        <div className="container-avora max-w-3xl">
          {services.map((service, i) => (
            <div key={i} className="mb-4">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full flex items-center justify-between p-6 text-left transition-all duration-300 rounded-lg ${
                  openIndex === i
                    ? 'bg-[rgba(200,169,126,0.03)] border-t-2 border-avora-gold'
                    : 'hover:bg-[rgba(200,169,126,0.03)] border-b border-[rgba(255,255,255,0.05)]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <service.icon className="w-5 h-5 text-avora-gold flex-shrink-0" />
                  <span className="font-body text-base md:text-lg font-medium text-avora-text-primary">
                    {service.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-avora-gold transition-transform duration-300 flex-shrink-0 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-all duration-400 ${
                  openIndex === i ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-2 space-y-4">
                  <p className="font-body text-[15px] text-avora-text-secondary leading-relaxed">
                    {service.content}
                  </p>

                  {/* Tools list */}
                  {'tools' in service && service.tools && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {service.tools.map((tool, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 text-xs font-body text-avora-text-secondary bg-[rgba(200,169,126,0.08)] rounded-full border border-[rgba(200,169,126,0.15)]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Deliverables */}
                  {service.deliverables.length > 0 && (
                    <div className="mt-4">
                      <p className="font-body text-xs uppercase tracking-wider text-avora-gold mb-2">Entrega sugerida</p>
                      <ul className="space-y-1">
                        {service.deliverables.map((del, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-avora-gold mt-0.5 flex-shrink-0" />
                            <span className="font-body text-sm text-avora-text-secondary">{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Warning */}
                  {'hasWarning' in service && service.hasWarning && (
                    <div className="mt-4 border-l-2 border-avora-gold pl-4">
                      <p className="font-body text-[13px] font-medium text-avora-gold">
                        AVORA no es una financiera, no promete créditos y no autoriza financiamientos.
                      </p>
                    </div>
                  )}

                  {/* CTA */}
                  {'hasCta' in service && service.hasCta && onNavClick && (
                    <button
                      onClick={() => onNavClick('diagnostico')}
                      className="mt-4 btn-primary text-sm py-2 px-5"
                    >
                      Solicitar diagnóstico
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Herramientas */}
      <section className="py-16 md:py-24">
        <div className="container-avora">
          <h2 className="font-display text-3xl md:text-4xl text-avora-text-primary text-center mb-16">
            Herramientas que podemos construir para tu hotel
          </h2>

          <div ref={toolsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {tools.map((tool, i) => (
              <div
                key={i}
                className="glass-card p-4 text-center group cursor-default"
              >
                <p className="font-body text-sm text-avora-text-secondary group-hover:text-avora-text-primary transition-colors duration-200">
                  {tool}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Propuestas Comerciales */}
      <section className="py-16 md:py-24">
        <div className="container-avora">
          <h2 className="font-display text-3xl md:text-4xl text-avora-text-primary text-center mb-16">
            Formas simples de comenzar
          </h2>

          <div ref={packagesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className="glass-card p-6 flex flex-col"
              >
                <h3 className="font-body text-base font-medium text-avora-text-primary mb-3">
                  {pkg.title}
                </h3>
                <p className="font-body text-sm font-light text-avora-text-secondary leading-relaxed flex-1">
                  {pkg.desc}
                </p>
                <button
                  onClick={() => onNavClick?.('diagnostico')}
                  className="mt-4 btn-secondary text-xs py-2 px-4 w-full justify-center"
                >
                  Solicitar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
