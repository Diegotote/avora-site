import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Logo from '../components/Logo';

interface TransitionScreenProps {
  onEnter: () => void;
  isTransitioning: boolean;
}

export default function TransitionScreen({ onEnter, isTransitioning }: TransitionScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    
    if (logoRef.current) {
      tl.fromTo(logoRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0);
    }
    if (titleRef.current) {
      tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.2);
    }
    if (descRef.current) {
      tl.fromTo(descRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.4);
    }
    if (btnRef.current) {
      tl.fromTo(btnRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.6);
    }
  }, []);

  useEffect(() => {
    if (isTransitioning && containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
      });
    }
  }, [isTransitioning]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6"
      style={{ background: '#0C0C0C' }}
    >
      {/* Subtle radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(200,169,126,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
        {/* Small Logo oficial */}
        <div ref={logoRef} className="mb-8">
          <Logo size="large" />
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display text-3xl md:text-5xl text-avora-text-primary leading-tight"
        >
          Crecimiento empresarial con método
        </h2>

        {/* Description */}
        <p
          ref={descRef}
          className="mt-6 font-body text-base md:text-lg font-light text-avora-text-secondary leading-relaxed max-w-lg"
        >
          AVORA Business Growth nace para acompañar a hoteles pequeños y medianos que tienen potencial, pero necesitan claridad, estructura y ejecución para convertir ese potencial en crecimiento real.
        </p>

        {/* Enter Button */}
        <button
          ref={btnRef}
          onClick={onEnter}
          className="mt-10 btn-primary shimmer text-base px-8 py-3"
        >
          Entrar a AVORA
        </button>
      </div>
    </div>
  );
}
