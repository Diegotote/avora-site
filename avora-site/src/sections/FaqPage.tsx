import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const faqs = [
  {
    q: '¿Qué hace diferente a AVORA de otras consultoras?',
    a: 'Tres cosas: la metodología A.V.O.R.A., el enfoque práctico y el ecosistema integral. No vendemos ideas infladas; construimos rutas ejecutables paso a paso, conectando diagnóstico, estrategia, tecnología, capacitación, seguimiento y aliados.',
  },
  {
    q: '¿AVORA es una financiera?',
    a: 'No. AVORA no es una financiera, no promete créditos y no autoriza financiamientos. Podemos ayudarte a ordenar tu información, entender tu necesidad y canalizarte con aliados estratégicos cuando sea viable.',
  },
  {
    q: '¿Con qué tipo de hoteles trabaja AVORA?',
    a: 'Trabajamos inicialmente con hoteles pequeños y medianos, independientes, familiares, boutique o de tamaño medio que tienen operación activa y buscan crecer con más estructura.',
  },
  {
    q: '¿Mi hotel es muy pequeño para AVORA?',
    a: 'No necesariamente. Si tienes operación activa, intención de mejorar y apertura para ordenar procesos, podemos iniciar con un diagnóstico para saber qué ruta tiene sentido.',
  },
  {
    q: '¿Cuánto puedo recuperar realmente en comisiones de OTAs?',
    a: 'Depende del hotel, su volumen de reservas, canales actuales y capacidad de implementar alternativas. AVORA no promete una cifra exacta, pero sí puede ayudarte a detectar fugas y construir canales más directos.',
  },
  {
    q: '¿Cuánto tiempo toma la implementación?',
    a: 'Depende de la membresía y del punto de partida del hotel. Algunas acciones pueden ordenarse en días; otras requieren seguimiento de 30, 60 o 90 días.',
  },
  {
    q: '¿Necesito conocimientos técnicos para usar la tecnología?',
    a: 'No. La intención de AVORA es implementar tecnología simple y usable: WhatsApp Business, formularios, CRM básico, chatbot o tableros claros. La tecnología debe facilitar la operación, no complicarla.',
  },
  {
    q: '¿Puedo iniciar solo con diagnóstico?',
    a: 'Sí. AVORA Insight funciona como puerta de entrada para entender el contexto del hotel y definir qué conviene hacer primero.',
  },
  {
    q: '¿Puedo combinar membresías?',
    a: 'Sí. AVORA Duo permite combinar dos membresías base según tus prioridades. AVORA Essentials y AVORA Legend integran soluciones más completas.',
  },
  {
    q: '¿Qué pasa después del diagnóstico?',
    a: 'Recibes claridad inicial, prioridades de acción y una recomendación de ruta. Después puedes decidir si quieres avanzar con capacitación, tecnología, plan operativo, vinculación financiera o acompañamiento.',
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqRef = useScrollReveal<HTMLDivElement>({ stagger: 0.06, threshold: 0.16 });

  return (
    <div className="relative z-10 pt-24">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="container-avora max-w-3xl text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-avora-text-primary leading-tight">
            Resolvemos tus dudas
          </h1>
          <p className="mt-6 font-body text-base md:text-lg font-light text-avora-text-secondary leading-relaxed">
            Lo que más preguntan los hoteleros antes de iniciar.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="pb-12 md:pb-16">
        <div className="container-avora max-w-3xl">
          <div ref={faqRef} className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-lg overflow-hidden border border-[rgba(200,169,126,0.13)] bg-[rgba(18,18,18,0.7)] transition-all duration-300 ${
                  openIndex === i ? 'bg-[rgba(200,169,126,0.03)]' : 'hover:bg-[rgba(200,169,126,0.02)]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                >
                  <span className="font-body text-base font-medium text-avora-text-primary leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-avora-gold flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-400 ${
                    openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5 flex gap-4">
                    {/* Gold line indicator */}
                    <div className="w-[3px] bg-avora-gold rounded-full flex-shrink-0 self-stretch" />
                    <p className="font-body text-[15px] font-light text-avora-text-secondary leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-32">
        <div className="container-avora text-center">
          <p className="font-body text-lg text-avora-text-secondary mb-6">
            ¿Tienes otra duda?
          </p>
          <a
            href="https://wa.me/525639472727"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shimmer inline-flex"
          >
            Escríbenos
          </a>
        </div>
      </section>
    </div>
  );
}
