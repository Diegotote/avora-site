import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  threshold?: number;
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Safe reveal: avoids the old GSAP/ScrollTrigger issue where content stayed invisible
    // after route/tab transitions or refreshes.
    const targets = options.stagger && options.stagger > 0
      ? Array.from(element.children) as HTMLElement[]
      : [element];

    targets.forEach((target, index) => {
      target.style.opacity = '0';
      target.style.transform = `translateY(${options.y ?? 22}px) scale(.985)`;
      target.style.transition = `opacity ${options.duration ?? 0.55}s ease, transform ${options.duration ?? 0.55}s ease`;
      target.style.transitionDelay = `${(options.delay ?? 0) + (options.stagger ?? 0) * index}s`;
    });

    const reveal = () => {
      targets.forEach((target) => {
        target.style.opacity = '1';
        target.style.transform = 'translateY(0) scale(1)';
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      });
    }, { threshold: Math.min(options.threshold ?? 0.16, 0.25), rootMargin: '0px 0px -8% 0px' });

    observer.observe(element);
    const fallback = window.setTimeout(reveal, 900);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return ref;
}

export default useScrollReveal;
