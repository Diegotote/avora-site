import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Target, Monitor, TrendingUp, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    letter: 'A',
    title: 'Alto',
    label: 'Pausa estratégica',
    desc: 'Antes de vender, cambiar o pedir financiamiento, el hotel necesita hacer una pausa. Alto significa detener la operación en automático por un momento y mirar qué está pasando de verdad.',
    applied: 'En esta fase escuchamos al dueño o administrador, identificamos qué le preocupa, qué quiere lograr y qué siente que ya no está funcionando. No llegamos a imponer soluciones; llegamos a entender el negocio.',
    data: ['Tipo de hotel', 'Número de habitaciones', 'Ocupación aproximada', 'Principales dolores', 'Situación de ventas', 'Atención al huésped', 'Procesos internos', 'Necesidades de crecimiento'],
    output: 'Claridad inicial del problema y definición de prioridades de diagnóstico.',
  },
  {
    letter: 'V',
    title: 'Visualiza tu contexto',
    label: 'Mapa de realidad',
    desc: 'Un hotel no puede crecer si solo mira una parte de su realidad. Visualizar el contexto significa observar el panorama completo: números, equipo, procesos, clientes, herramientas, ubicación, competencia, temporadas, reputación, flujo de caja y oportunidades no aprovechadas.',
    applied: 'No basta con preguntar si el hotel necesita dinero. Se requiere entender para qué lo necesita, qué lo frena, qué área puede mejorar primero y qué capacidad tiene para sostener el crecimiento.',
    data: [],
    output: 'Mapa de contexto del hotel y oportunidades reales de mejora.',
  },
  {
    letter: 'O',
    title: 'Organiza tus ideas',
    label: 'Plan de acción',
    desc: 'Después de ver el contexto, el siguiente paso es ordenar. Organizar significa poner claridad donde hay ruido: prioridades, documentos, procesos, tareas, responsables, canales de venta y herramientas.',
    applied: 'En esta fase convertimos el diagnóstico en una ruta simple: qué se atiende primero, qué se deja para después, qué documentos hacen falta, qué proceso se mejora, qué capacitación se requiere y qué herramienta tecnológica puede ayudar.',
    data: [],
    output: 'Plan de acción, lista de prioridades, documentos requeridos y estructura de seguimiento.',
  },
  {
    letter: 'R',
    title: 'Rompe tu esquema',
    label: 'Cambio con estructura',
    desc: 'Romper el esquema no significa hacer cambios irresponsables. Significa dejar de repetir una forma de operar que ya limita al negocio.',
    applied: 'AVORA acompaña al hotel a cambiar con estructura, no con caos.',
    data: ['Responder tarde', 'No dar seguimiento', 'Vender solo por costumbre', 'Capacitar sin método', 'No medir resultados', 'Tener miedo a implementar tecnología', 'Depender totalmente de plataformas externas'],
    output: 'Propuesta de mejora, acciones de cambio y herramientas a implementar.',
  },
  {
    letter: 'A',
    title: 'Avanza',
    label: 'Ejecución medible',
    desc: 'Avanza significa convertir la claridad en movimiento. No se trata de tener un documento bonito; se trata de implementar acciones, medir avances y sostener el crecimiento con seguimiento.',
    applied: 'Esta fase se vive con acompañamiento, llamadas de seguimiento, tablero de avances, revisión de pendientes, ajustes y cierre de resultados.',
    data: [],
    output: 'Ejecución, seguimiento, evidencia de avances y próximos pasos.',
  },
];

const pilares = [
  { icon: Search, title: 'Claridad y diagnóstico', desc: 'Entendemos el punto de partida real del hotel.' },
  { icon: Target, title: 'Estrategia', desc: 'Definimos rumbo, prioridades y enfoque.' },
  { icon: Monitor, title: 'Presencia digital', desc: 'Comunicamos mejor el valor de la marca.' },
  { icon: TrendingUp, title: 'Impulso comercial', desc: 'Convertimos interés en oportunidades reales.' },
  { icon: CheckCircle, title: 'Ejecución y seguimiento', desc: 'Medimos, ajustamos y sostenemos el crecimiento.' },
];

const timelineSteps = [
  'Contacto inicial por WhatsApp, llamada, referencia o visita.',
  'Conversación breve para conocer contexto y detectar oportunidad real.',
  'Diagnóstico AVORA: operación, ventas, equipo, seguimiento, tecnología y necesidades financieras.',
  'Entrega de mapa de oportunidades: qué urge, qué conviene, qué puede esperar y qué puede generar crecimiento.',
  'Propuesta de servicio: capacitación, mejora operativa, digitalización, ruta de crecimiento o vinculación con aliados.',
  'Ejecución de acciones concretas con seguimiento.',
  'Cierre de resultados y definición del siguiente paso.',
];

function PhaseBlock({ phase }: { phase: (typeof phases)[number] }) {
  const phaseRef = useScrollReveal<HTMLDivElement>({ threshold: 0.85 });

  return (
    <div ref={phaseRef}>
      <span className="label-avora tracking-[0.15em]">{phase.label}</span>
      <h3 className="mt-3 font-display text-2xl md:text-3xl text-avora-text-primary">
        {phase.letter} &mdash; {phase.title}
      </h3>
      <p className="mt-4 font-body text-base text-avora-text-secondary leading-[1.7]">
        {phase.desc}
      </p>
      <p className="mt-4 font-body text-base text-avora-text-secondary leading-[1.7]">
        {phase.applied}
      </p>
      {phase.data.length > 0 && (
        <ul className="mt-4 space-y-1">
          {phase.data.map((item, j) => (
            <li key={j} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-avora-gold mt-2 flex-shrink-0" />
              <span className="font-body text-sm text-avora-text-muted">{item}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 border-l-2 border-avora-gold pl-4">
        <p className="font-body text-sm font-medium text-avora-gold">
          Salida de la fase: {phase.output}
        </p>
      </div>
    </div>
  );
}

function TimelineStep({ step, index }: { step: string; index: number }) {
  const stepRef = useScrollReveal<HTMLDivElement>({ threshold: 0.9 });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={stepRef}
      className={`relative flex items-start gap-6 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-avora-gold flex items-center justify-center z-10">
        <span className="font-display text-sm text-avora-text-dark">{index + 1}</span>
      </div>

      <div
        className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
          isLeft ? 'md:pr-8' : 'md:pl-8'
        }`}
      >
        <div className="glass-card p-5">
          <p className="font-body text-sm text-avora-text-secondary leading-relaxed">
            {step}
          </p>
        </div>
      </div>

      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
    </div>
  );
}

export default function MetodologiaPage() {
  const lettersRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1, threshold: 0.8 });
  const pillarsRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12, threshold: 0.8 });
  const timelineLineRef = useRef<HTMLDivElement>(null);

  // Timeline line animation
  useEffect(() => {
    if (!timelineLineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        timelineLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineLineRef.current?.parentElement,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative z-10 pt-24">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="container-avora max-w-3xl text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-avora-text-primary leading-tight">
            La Metodología A.V.O.R.A.
          </h1>
          <p className="mt-6 font-body text-base md:text-lg font-light text-avora-text-secondary leading-relaxed">
            Cinco fases para transformar la operación de un hotel sin caos: escuchamos, observamos, ordenamos, rompemos esquemas y ejecutamos.
          </p>
        </div>
      </section>

      {/* AVORA Letters Display */}
      <section className="py-12 md:py-16 bg-avora-surface/50 border-y border-[rgba(200,169,126,0.08)]">
        <div ref={lettersRef} className="container-avora flex justify-center items-center gap-4 md:gap-8">
          {['A', 'V', 'O', 'R', 'A'].map((letter, i) => (
            <div key={i} className="flex items-center gap-4 md:gap-8">
              <span className="font-accent text-5xl md:text-7xl lg:text-[80px] text-avora-gold tracking-[0.15em] hover:text-shadow-[0_0_20px_rgba(200,169,126,0.5)] hover:scale-105 transition-all duration-300 cursor-default">
                {letter}
              </span>
              {i < 4 && (
                <span className="text-avora-gold/40 text-xl md:text-2xl">&middot;</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Fases */}
      <section className="py-16 md:py-24">
        <div className="container-avora max-w-3xl space-y-16 md:space-y-24">
          {phases.map((phase) => (
            <PhaseBlock key={`${phase.letter}-${phase.title}`} phase={phase} />
          ))}
        </div>
      </section>

      {/* 5 Pilares */}
      <section className="py-16 md:py-24">
        <div className="container-avora">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-avora-text-primary">
              La metodología se aplica en 5 pilares ejecutables
            </h2>
            <p className="mt-4 font-body text-base md:text-lg font-light text-avora-text-secondary">
              A.V.O.R.A. ordena el pensamiento. Los pilares convierten esa claridad en operación.
            </p>
          </div>

          <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {pilares.map((pilar, i) => (
              <div
                key={i}
                className="glass-card p-6 text-center group cursor-default spotlight-card hover:-translate-y-1 transition-transform duration-300"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
              >
                <pilar.icon className="w-8 h-8 text-avora-gold mx-auto mb-4" />
                <h3 className="font-body text-base font-medium text-avora-text-primary mb-2">
                  {pilar.title}
                </h3>
                <p className="font-body text-sm font-light text-avora-text-secondary">
                  {pilar.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 font-body text-lg font-light text-avora-text-secondary text-center italic">
            Estos pilares funcionan porque conectan análisis, dirección, comunicación, ventas y acción.
          </p>
        </div>
      </section>

      {/* Proceso Real Timeline */}
      <section className="py-16 md:py-24">
        <div className="container-avora">
          <h2 className="font-display text-3xl md:text-4xl text-avora-text-primary text-center mb-16">
            Cómo se vive AVORA en un proceso real
          </h2>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical Line */}
            <div
              ref={timelineLineRef}
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-avora-gold/30 origin-top"
            />

            {/* Steps */}
            <div className="space-y-8">
              {timelineSteps.map((step, i) => (
                <TimelineStep key={step} step={step} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
