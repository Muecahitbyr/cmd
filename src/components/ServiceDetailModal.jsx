import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { img } from '../lib/images.js';
import '../styles/service-modal.css';

export default function ServiceDetailModal({ service, onClose, onBook }) {
  const panelRef = useRef(null);
  const imageRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(panelRef.current, { opacity: 0, y: 24, scale: 0.94 });
      gsap.set(imageRef.current, { scale: 1.18 });

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(panelRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.5 })
        .to(imageRef.current, { scale: 1, duration: 1.2 }, '<');
    });
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!mediaRef.current || !imageRef.current) return;
    const rect = mediaRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(imageRef.current, { xPercent: x * 8, yPercent: y * 8, duration: 0.6, ease: 'power3.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, { xPercent: 0, yPercent: 0, duration: 0.6, ease: 'power3.out' });
  };

  if (!service) return null;

  return (
    <div className="service-modal" onClick={onClose}>
      <div className="service-modal-panel" ref={panelRef} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="service-modal-close" onClick={onClose} aria-label="Schließen">
          <i className="ri-close-line" />
        </button>

        <div
          className="service-modal-media"
          ref={mediaRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img ref={imageRef} src={img(service.image)} alt={service.title} />
          <span className="service-modal-number">{service.number}</span>
        </div>

        <div className="service-modal-body">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <ul className="service-modal-tags">
            {service.services.map((s) => (
              <li key={s}>
                <i className="ri-check-line" />
                {s}
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-primary service-modal-book" onClick={onBook}>
            Termin buchen <i className="ri-send-plane-fill" />
          </button>
        </div>
      </div>
    </div>
  );
}
