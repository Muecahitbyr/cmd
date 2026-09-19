import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { img } from '../lib/images.js';
import { scrollToTarget } from '../lib/smoothScroll.js';
import '../styles/video-hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function VideoHero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.video-hero-clip', { scale: 1.18 });
      gsap.set('.video-hero-media', { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power3.out' } });
      tl.to('.video-hero-media', { opacity: 1, duration: 1.3 })
        .to('.video-hero-clip', { scale: 1, duration: 2.4 }, '<')
        .to('.video-hero-eyebrow', { opacity: 1, y: 0, duration: 0.8 }, '-=1.6')
        .to('.video-hero-title', { opacity: 1, y: 0, duration: 1 }, '-=0.55')
        .to('.video-hero-cue', { opacity: 1, duration: 0.8 }, '-=0.4');

      gsap.to(sectionRef.current, {
        scale: 0.92,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="video-hero" ref={sectionRef}>
      <div className="video-hero-media">
        <video className="video-hero-clip" muted loop autoPlay playsInline poster={img('baustelle1-poster.jpg')}>
          <source src="/videos/baustelle1.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="video-hero-overlay" />

      <div className="video-hero-content container">
        <span className="video-hero-eyebrow eyebrow">CMD Industrielle Reinigung</span>
        <h2 className="video-hero-title">Echte Einsätze. Echte Ergebnisse.</h2>
      </div>

      <button
        type="button"
        className="hero-scroll-cue video-hero-cue"
        onClick={() => scrollToTarget('#start')}
        aria-label="Nach unten scrollen"
      >
        <span />
        <i className="ri-arrow-down-s-line" />
      </button>
    </section>
  );
}
