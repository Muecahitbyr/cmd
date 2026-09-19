import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { img } from '../lib/images.js';
import { scrollToTarget } from '../lib/smoothScroll.js';
import { useBookingModal } from '../context/BookingModalContext.jsx';
import '../styles/hero.css';

gsap.registerPlugin(ScrollTrigger);

const BADGES = [
  { icon: 'ri-flashlight-line', label: 'Schnelle Reaktion' },
  { icon: 'ri-shield-check-line', label: '100% Qualität' },
  { icon: 'ri-time-line', label: '24/7 Verfügbar' },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const { openBooking } = useBookingModal();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        yPercent: 18,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '65% top',
          scrub: true,
        },
      });

      const tl = gsap.timeline({ delay: 0.3, defaults: { ease: 'power3.out' } });
      tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8 })
        .to('.hero-title span', { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, '-=0.5')
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.9 }, '-=0.6')
        .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.9 }, '-=0.6')
        .to('.hero-badge', { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, '-=0.5')
        .to('.hero-scroll-cue', { opacity: 1, duration: 0.8 }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="start" ref={sectionRef}>
      <div className="hero-bg" ref={bgRef}>
        <img src={img('hero-bg.jpeg')} alt="CMD Industrielle Reinigung" />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content container" ref={contentRef}>
        <span className="hero-eyebrow eyebrow">Hygiene auf höchstem Niveau</span>
        <h1 className="hero-title">
          <span>Ihr Erfolg beginnt</span>
          <span>mit unserer Reinigung</span>
        </h1>
        <p className="hero-subtitle">
          Professionelle Gebäudereinigung für Unternehmen und Gewerbe in Augsburg, Landsberg am Lech,
          Kaufbeuren und Umgebung.
        </p>

        <div className="hero-ctas">
          <button type="button" className="btn btn-primary" onClick={() => openBooking()}>
            Angebot erhalten
          </button>
          <button
            type="button"
            className="btn btn-ghost-light"
            onClick={() => scrollToTarget('#leistungen')}
          >
            Unsere Services
          </button>
        </div>

        <div className="hero-badges">
          {BADGES.map((b) => (
            <div className="hero-badge" key={b.label}>
              <i className={b.icon} />
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="hero-scroll-cue"
        onClick={() => scrollToTarget('#leistungen')}
        aria-label="Nach unten scrollen"
      >
        <span />
        <i className="ri-arrow-down-s-line" />
      </button>
    </section>
  );
}
