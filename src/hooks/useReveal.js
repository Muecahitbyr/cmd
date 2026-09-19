import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useReveal(scope, deps = []) {
  useEffect(() => {
    const root = typeof scope === 'string' ? document.querySelector(scope) : scope?.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.reveal', root);
      items.forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: (i % 6) * 0.08,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      const scales = gsap.utils.toArray('.reveal-scale', root);
      scales.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      const fades = gsap.utils.toArray('.reveal-fade', root);
      fades.forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          duration: 1.2,
          delay: (i % 6) * 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, deps);
}
