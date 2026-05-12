import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Logo from '../components/Logo';

interface IntroScreenProps {
  onClick: () => void;
  isTransitioning: boolean;
}

export default function IntroScreen({ onClick, isTransitioning }: IntroScreenProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Logo entrance animation
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.9, filter: 'brightness(0.5)' },
        { opacity: 1, scale: 1, filter: 'brightness(1)', duration: 1.2, ease: 'power3.out' }
      );
    }
    // Text entrance
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.5 }
      );
    }
  }, []);

  useEffect(() => {
    if (isTransitioning && containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 15,
        opacity: 0,
        duration: 1.4,
        ease: 'power2.in',
      });
    }
  }, [isTransitioning]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer"
      style={{ background: '#0C0C0C' }}
      onClick={onClick}
    >
      {/* Subtle radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(200,169,126,0.03) 0%, transparent 70%)',
        }}
      />

      {/* Logo oficial AVORA */}
      <div ref={logoRef} className="relative z-10 group">
        <Logo size="hero" />
      </div>

      {/* Invitation text */}
      <p
        ref={textRef}
        className="mt-10 font-body text-sm md:text-base font-light text-avora-text-secondary animate-breathe"
      >
        Haz clic para descubrir AVORA
      </p>

      <style>{`
        @keyframes shimmer-slide {
          0% { transform: skewX(-20deg) translateX(-100%); }
          100% { transform: skewX(-20deg) translateX(200%); }
        }
      `}</style>
    </div>
  );
}
