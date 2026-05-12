import { useEffect } from 'react';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ScrollKinetics() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let lastY = window.scrollY;
    let lastTime = performance.now();
    let raf = 0;
    let settleTimer = 0;

    const reset = () => {
      document.body.classList.remove('scroll-kinetic-active');
      document.documentElement.style.setProperty('--scroll-force', '0');
      document.documentElement.style.setProperty('--scroll-tilt', '0deg');
      document.documentElement.style.setProperty('--scroll-wide', '0px');
      document.documentElement.style.setProperty('--scroll-blur', '0px');
      document.documentElement.style.setProperty('--scroll-scale-x', '1');
      document.documentElement.style.setProperty('--scroll-scale-y', '1');
      document.documentElement.style.setProperty('--scroll-shadow-a', '0px');
      document.documentElement.style.setProperty('--scroll-shadow-b', '0px');
    };

    const update = () => {
      raf = 0;
      const now = performance.now();
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      const elapsed = Math.max(now - lastTime, 16);
      const velocity = delta / elapsed;
      const force = clamp(Math.abs(velocity) * 2.8, 0, 1);
      const direction = velocity >= 0 ? 1 : -1;

      document.body.classList.add('scroll-kinetic-active');
      document.documentElement.style.setProperty('--scroll-force', force.toFixed(3));
      document.documentElement.style.setProperty('--scroll-tilt', `${(direction * force * -2.2).toFixed(3)}deg`);
      document.documentElement.style.setProperty('--scroll-wide', `${(force * 1.7).toFixed(3)}px`);
      document.documentElement.style.setProperty('--scroll-blur', `${(force * 1.15).toFixed(3)}px`);
      document.documentElement.style.setProperty('--scroll-scale-x', (1 + force * 0.055).toFixed(4));
      document.documentElement.style.setProperty('--scroll-scale-y', (1 - force * 0.025).toFixed(4));
      document.documentElement.style.setProperty('--scroll-shadow-a', `${(force * 16).toFixed(3)}px`);
      document.documentElement.style.setProperty('--scroll-shadow-b', `${(force * -12).toFixed(3)}px`);

      lastY = currentY;
      lastTime = now;

      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(reset, 140);
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
      reset();
    };
  }, []);

  return null;
}
