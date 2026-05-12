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
      target.style.transform = `translateY(${options.y ?? 38}px) scale(.94)`;
      target.style.filter = 'blur(8px)';
      target.style.transition = `opacity ${options.duration ?? 0.72}s cubic-bezier(.16,1,.3,1), transform ${options.duration ?? 0.72}s cubic-bezier(.16,1,.3,1), filter ${options.duration ?? 0.72}s cubic-bezier(.16,1,.3,1)`;
      target.style.transitionDelay = `${(options.delay ?? 0) + (options.stagger ?? 0) * index}s`;
      target.style.willChange = 'opacity, transform, filter';
    });

    const reveal = () => {
      targets.forEach((target) => {
        target.style.opacity = '1';
        target.style.transform = 'translateY(0) scale(1)';
        target.style.filter = 'blur(0)';
        window.setTimeout(() => {
          target.style.willChange = 'auto';
        }, 900);
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
