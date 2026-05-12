import { useEffect } from 'react';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ScrollKinetics() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ticking = false;

    const updateEdgeFade = () => {
      ticking = false;
      const viewport = window.innerHeight || 1;
      const topZone = viewport * 0.18;
      const bottomZone = viewport * 0.18;

      document.querySelectorAll<HTMLElement>('main h1, main h2, main h3, main .glass-card, main .label-avora').forEach((element) => {
        const rect = element.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const topForce = clamp((topZone - center) / topZone, 0, 1);
        const bottomForce = clamp((center - (viewport - bottomZone)) / bottomZone, 0, 1);
        const force = Math.max(topForce, bottomForce);

        element.style.setProperty('--edge-fade', force.toFixed(3));
        element.classList.toggle('edge-scroll-item', true);
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateEdgeFade);
      }
    };

    updateEdgeFade();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.querySelectorAll<HTMLElement>('.edge-scroll-item').forEach((element) => {
        element.classList.remove('edge-scroll-item');
        element.style.removeProperty('--edge-fade');
      });
    };
  }, []);

  return null;
}
