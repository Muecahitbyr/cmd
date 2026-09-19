import { useEffect, useState, useCallback } from 'react';
import { img } from '../lib/images.js';
import { GALLERY_IMAGES } from '../data/content.js';
import '../styles/gallery.css';

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length),
    [],
  );
  const next = useCallback(() => setLightboxIndex((i) => (i + 1) % GALLERY_IMAGES.length), []);

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
          <figure onClick={(e) => e.stopPropagation()}>
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
