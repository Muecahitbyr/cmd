import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useBookingModal } from '../context/BookingModalContext.jsx';
import '../styles/cta-section.css';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const { openBooking } = useBookingModal();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        xPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="cta-section" id="kontakt" ref={sectionRef}>
      <div className="cta-glow" ref={glowRef} />
      <div className="container cta-inner reveal">
        <h2>Ihr Erfolg beginnt mit unserer Reinigung</h2>
        <p>Kontaktieren Sie uns für ein unverbindliches Angebot</p>
        <button type="button" className="btn btn-primary" onClick={() => openBooking()}>
          Jetzt Termin vereinbaren
        </button>
      </div>
    </section>
  );
}
