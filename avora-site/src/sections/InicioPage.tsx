import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Zap, Users, Globe, Percent, Smartphone, GraduationCap, Search, ClipboardList, Cpu, Handshake, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

type MainSection = 'inicio' | 'metodologia' | 'servicios' | 'membresias' | 'diagnostico' | 'faq';
type Language = 'es' | 'en';

interface InicioPageProps {
  onNavClick: (section: MainSection) => void;
  language?: Language;
}

const problemCards = [
  { icon: Zap, title: 'Operación reactiva', desc: 'Se resuelve lo urgente, pero no se construye una mejora constante.' },
  { icon: Users, title: 'Falta de seguimiento', desc: 'Prospectos, huéspedes y oportunidades se pierden por no tener sistema.' },
  { icon: Globe, title: 'Poca presencia digital', desc: 'El valor del hotel no se comunica con claridad en canales digitales.' },
  { icon: Percent, title: 'Dependencia de OTAs', desc: 'Las reservas llegan, pero una parte importante se va en comisiones.' },
  { icon: Smartphone, title: 'Tecnología poco aplicada', desc: 'Herramientas simples como WhatsApp Business, CRM o formularios no están aprovechadas.' },
  { icon: GraduationCap, title: 'Equipo sin capacitación', desc: 'El personal puede mejorar atención, ventas, seguimiento y experiencia del huésped.' },
];

const miniServices = [
  { icon: Search, title: 'Diagnóstico de crecimiento hotelero' },
  { icon: ClipboardList, title: 'Plan básico de mejora operativa' },
  { icon: GraduationCap, title: 'Capacitación de personal' },
  { icon: Cpu, title: 'Tecnología simple y automatización' },
  { icon: Handshake, title: 'Vinculación con aliados estratégicos' },
  { icon: TrendingUp, title: 'Acompañamiento y seguimiento' },
];

export default function InicioPage({ onNavClick }: InicioPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCtasRef = useRef<HTMLDivElement>(null);
  const heroMetricsRef = useRef<HTMLDivElement>(null);
  const heroLabelRef = useRef<HTMLSpanElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const problemTitleRef = useScrollReveal<HTMLDivElement>({ threshold: 0.9 });
  const problemGridRef = useScrollReveal<HTMLDivElement>({ stagger: 0.15, threshold: 0.8 });
  const queEsRef = useScrollReveal<HTMLDivElement>({ threshold: 0.9 });
  const ideaRef = useScrollReveal<HTMLDivElement>({ stagger: 0.2, threshold: 0.8 });
  const miniServRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1, threshold: 0.8 });
  const ctaRef = useScrollReveal<HTMLDivElement>({ threshold: 0.9 });

  // Hero entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    
    if (heroLabelRef.current) {
      tl.fromTo(heroLabelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0);
    }
    if (heroTitleRef.current) {
      tl.fromTo(heroTitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.2);
    }
    if (heroSubtitleRef.current) {
      tl.fromTo(heroSubtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.4);
    }
    if (heroCtasRef.current) {
      tl.fromTo(heroCtasRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.6);
    }
    if (heroMetricsRef.current) {
      tl.fromTo(heroMetricsRef.current.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: 'power2.out' }, 0.8);
    }
  }, []);

  // Hero parallax
  useEffect(() => {
    if (!imgRef.current || !heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative z-10">
      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background Image */}
        <div ref={imgRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <img
            src="/images/hero-hotel.jpg"
            alt="Luxury hotel corridor"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(12,12,12,0.95) 0%, rgba(12,12,12,0.7) 60%, rgba(12,12,12,0.4) 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="container-avora relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="lg:col-span-3">
              <span
                ref={heroLabelRef}
                className="label-avora tracking-[0.15em] text-avora-gold"
              >
                CONSULTORÍA HOTELERA DE ALTO NIVEL
              </span>

              <h1
                ref={heroTitleRef}
                className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl text-avora-text-primary leading-[1.05] tracking-tight"
              >
                Crecimiento hotelero con método, dirección y ejecución
              </h1>

              <p
                ref={heroSubtitleRef}
                className="mt-6 font-body text-base md:text-lg font-light text-avora-text-secondary leading-relaxed max-w-lg"
              >
                AVORA Business Growth acompaña a hoteles pequeños y medianos a entender su contexto, ordenar sus procesos, fortalecer su presencia y avanzar con acciones concretas.
              </p>

              <div ref={heroCtasRef} className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavClick('diagnostico')}
                  className="btn-primary shimmer"
                >
                  Solicitar diagnóstico
                </button>
                <button
                  onClick={() => onNavClick('metodologia')}
                  className="btn-secondary"
                >
                  Ver metodología
                </button>
              </div>

              <p className="mt-4 font-body text-[13px] text-avora-text-muted">
                Diagnóstico inicial &middot; Ruta de crecimiento &middot; Tecnología simple &middot; Seguimiento real
              </p>
            </div>

            {/* Right Column - Metrics */}
            <div ref={heroMetricsRef} className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-card p-5 text-center">
                  <p className="font-display text-4xl text-avora-gold">20%</p>
                  <p className="mt-2 font-body text-[13px] text-avora-text-secondary">Potencial de recuperación en comisiones OTA</p>
                </div>
                <div className="glass-card p-5 text-center">
                  <p className="font-display text-4xl text-avora-gold">A.V.O.R.A.</p>
                  <p className="mt-2 font-body text-[13px] text-avora-text-secondary">Metodología propia</p>
                </div>
                <div className="glass-card p-5 text-center sm:col-span-2">
                  <p className="font-display text-4xl text-avora-gold">360&deg;</p>
                  <p className="mt-2 font-body text-[13px] text-avora-text-secondary">Diagnóstico de contexto hotelero</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROBLEMA SECTION ===== */}
      <section className="py-20 md:py-32">
        <div className="container-avora">
          <div ref={problemTitleRef} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-avora-text-primary">
              Tu hotel puede estar perdiendo oportunidades sin verlo
            </h2>
            <p className="mt-6 font-body text-base md:text-lg font-light text-avora-text-secondary max-w-2xl mx-auto leading-relaxed">
              Muchos hoteles no están detenidos por falta de ganas. Están detenidos porque operan sin una ruta clara. Tienen habitaciones, ubicación, experiencia y clientes, pero les falta estructura para convertir todo eso en crecimiento real.
            </p>
          </div>

          <div ref={problemGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemCards.map((card, i) => (
              <div
                key={i}
                className="glass-card p-8 group cursor-default spotlight-card"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
              >
                <card.icon className="w-6 h-6 text-avora-gold mb-4" />
                <h3 className="font-body text-lg font-medium text-avora-text-primary mb-2">
                  {card.title}
                </h3>
                <p className="font-body text-[15px] font-light text-avora-text-secondary leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUE ES AVORA SECTION ===== */}
      <section className="py-20 md:py-32">
        <div className="container-avora max-w-3xl">
          <div ref={queEsRef} className="text-center">
            <h2 className="font-display text-3xl md:text-4xl text-avora-text-primary">
              ¿Qué es AVORA?
            </h2>
            <p className="mt-8 font-body text-base md:text-lg font-light text-avora-text-secondary leading-relaxed">
              AVORA Business Growth es una propuesta de crecimiento empresarial para hoteles pequeños y medianos. No llegamos a imponer soluciones genéricas. Entramos a entender el negocio, visualizar su contexto, ordenar prioridades y construir una ruta de mejora que pueda ejecutarse paso a paso.
            </p>
            <p className="mt-6 font-body text-base text-avora-text-secondary leading-relaxed">
              Combinamos visión empresarial, diagnóstico operativo, capacitación, herramientas simples de tecnología y vinculación con aliados estratégicos cuando el hotel requiere capital, remodelación, expansión o liquidez.
            </p>

            {/* Disclaimer Block */}
            <div className="mt-8 glass-card p-6 border-[rgba(200,169,126,0.3)]">
              <p className="font-body text-sm text-avora-text-muted leading-relaxed">
                AVORA no promete créditos, no autoriza financiamientos y no actúa como financiera. Su papel es estratégico: ordenar la información, entender la necesidad, preparar el perfil inicial y canalizar el caso con aliados cuando sea viable.
              </p>
            </div>

            <button
              onClick={() => onNavClick('metodologia')}
              className="mt-8 btn-secondary"
            >
              Conocer metodología
            </button>
          </div>
        </div>
      </section>

      {/* ===== IDEA CENTRAL SECTION ===== */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(200,169,126,0.04) 0%, transparent 70%)',
          }}
        />
        <div className="container-avora relative z-10 text-center">
          <div ref={ideaRef} className="space-y-4">
            <p className="font-display text-2xl md:text-3xl text-avora-text-primary">
              Dejar de operar en automático.
            </p>
            <p className="font-display text-2xl md:text-3xl text-avora-text-primary">
              Entender el contexto.
            </p>
            <div className="py-2">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-avora-gold to-transparent mx-auto" />
            </div>
            <p className="font-display text-2xl md:text-3xl text-avora-text-primary">
              Ordenar el crecimiento.
            </p>
            <p className="font-display text-2xl md:text-3xl text-avora-text-primary">
              Avanzar con acciones concretas.
            </p>
          </div>
          <p className="mt-10 font-body text-lg text-avora-gold">
            Eso es AVORA.
          </p>
        </div>
      </section>

      {/* ===== MINI SERVICIOS SECTION ===== */}
      <section className="py-20 md:py-32">
        <div className="container-avora">
          <h2 className="font-display text-3xl md:text-4xl text-avora-text-primary text-center mb-16">
            Cómo ayudamos a tu hotel
          </h2>
          <div ref={miniServRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {miniServices.map((service, i) => (
              <div
                key={i}
                className="glass-card p-8 text-center group cursor-default spotlight-card"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
              >
                <service.icon className="w-7 h-7 text-avora-gold mx-auto mb-4" />
                <h3 className="font-body text-base font-medium text-avora-text-primary">
                  {service.title}
                </h3>
                <button
                  onClick={() => onNavClick('servicios')}
                  className="mt-4 font-body text-[13px] text-avora-gold hover:underline"
                >
                  Ver más
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA INICIO SECTION ===== */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(200,169,126,0.06) 0%, transparent 70%)',
          }}
        />
        <div ref={ctaRef} className="container-avora relative z-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-avora-text-primary">
            Tu hotel no necesita más ruido. Necesita dirección.
          </h2>
          <p className="mt-6 font-body text-base md:text-lg font-light text-avora-text-secondary max-w-xl mx-auto leading-relaxed">
            Solicita un diagnóstico inicial y descubre qué área puede generar más claridad, orden y crecimiento para tu negocio.
          </p>
          <button
            onClick={() => onNavClick('diagnostico')}
            className="mt-8 btn-primary shimmer text-base px-10 py-4"
          >
            Solicitar diagnóstico
          </button>
        </div>
      </section>
    </div>
  );
}
