import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { img } from '../lib/images.js';
import { DETAILED_SERVICES } from '../data/content.js';
import { useBookingModal } from '../context/BookingModalContext.jsx';
import '../styles/detailed-services.css';

gsap.registerPlugin(ScrollTrigger);

export default function DetailedServices() {
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);
  const [active, setActive] = useState(0);
  const { openBooking } = useBookingModal();

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        ScrollTrigger.create({
          trigger: row,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });

        gsap.fromTo(
          row,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%' },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="detailed-services" id="leistungen" ref={sectionRef}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal">Unsere Leistungen</span>
          <h2 className="reveal">Maßgeschneiderte Reinigungslösungen</h2>
          <p className="reveal">
            Neun spezialisierte Leistungsbereiche – jeder mit eigenem Ablauf, eigener Ausrüstung und
            klaren Qualitätsstandards.
          </p>
        </div>

        <div className="services-layout">
          <div className="services-list">
            {DETAILED_SERVICES.map((service, i) => (
              <div
                className={`service-row ${active === i ? 'is-active' : ''}`}
                key={service.number}
                ref={(el) => (rowRefs.current[i] = el)}
              >
                <span className="service-row-number">{service.number}</span>
                <div className="service-row-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-row-tags">
                    {service.services.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <img className="service-row-image-mobile" src={img(service.image)} alt={service.title} loading="lazy" />
                  <button
                    type="button"
                    className="btn btn-ghost service-row-cta"
                    onClick={() => openBooking(service.title)}
                  >
                    Termin buchen
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="services-sticky">
            <div className="services-sticky-frame">
              {DETAILED_SERVICES.map((service, i) => (
                <img
                  key={service.number}
                  src={img(service.image)}
                  alt={service.title}
                  className="services-sticky-image"
                  style={{ opacity: active === i ? 1 : 0 }}
                  loading="lazy"
                />
              ))}
              <div className="services-sticky-overlay" />
              <span className="services-sticky-number">{DETAILED_SERVICES[active].number}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
