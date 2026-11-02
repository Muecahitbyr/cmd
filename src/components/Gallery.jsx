import { useEffect, useState, useCallback, useRef } from 'react';
import { img } from '../lib/images.js';
import { GALLERY_IMAGES } from '../data/content.js';
import '../styles/gallery.css';

const SWIPE_THRESHOLD = 50;

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [direction, setDirection] = useState(1);
  const touchStart = useRef(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => {
    setDirection(-1);
    setLightboxIndex((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, []);
  const next = useCallback(() => {
    setDirection(1);
    setLightboxIndex((i) => (i + 1) % GALLERY_IMAGES.length);
  }, []);

  const handleTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, close, prev, next]);

  return (
    <section className="gallery" id="galerie">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal">Unsere Galerie</span>
          <h2 className="reveal">Echte Projekte, echte Ergebnisse</h2>
          <p className="reveal">Alle Bilder zeigen echte Projekte von CMD Industrielle Reinigung.</p>
        </div>

        <div className="gallery-grid">
          {GALLERY_IMAGES.map((item, i) => (
            <button
              type="button"
              className="gallery-item reveal-scale"
              key={item.image}
              onClick={() => setLightboxIndex(i)}
            >
              <img src={img(item.image)} alt={item.caption} loading="lazy" />
              <span className="gallery-item-caption">
                <i className="ri-zoom-in-line" />
                {item.caption}
              </span>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="lightbox" onClick={close}>
          <button type="button" className="lightbox-close" onClick={close} aria-label="Schließen">
            <i className="ri-close-line" />
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Vorheriges Bild"
          >
            <i className="ri-arrow-left-s-line" />
          </button>
          <figure
            key={lightboxIndex}
            className={direction > 0 ? 'lightbox-enter-next' : 'lightbox-enter-prev'}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img src={img(GALLERY_IMAGES[lightboxIndex].image)} alt={GALLERY_IMAGES[lightboxIndex].caption} />
            <figcaption>{GALLERY_IMAGES[lightboxIndex].caption}</figcaption>
          </figure>
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Nächstes Bild"
          >
            <i className="ri-arrow-right-s-line" />
          </button>
        </div>
      )}
    </section>
  );
}
