import { useEffect } from 'react';
import { img } from '../../lib/images.js';

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!product) return null;

  const mailHref = `mailto:info@cmd-industriell.de?subject=${encodeURIComponent(
    `Anfrage: ${product.name}`,
  )}&body=${encodeURIComponent(`Hallo,\n\nich interessiere mich für den Artikel "${product.name}" und hätte gerne weitere Informationen.\n\nViele Grüße`)}`;

  return (
    <div className="product-modal" onClick={onClose}>
      <div className="product-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="product-modal-close" onClick={onClose} aria-label="Schließen">
          <i className="ri-close-line" />
        </button>
        <div className="product-modal-media">
          <img src={img(product.image)} alt={product.name} />
        </div>
        <div className="product-modal-body">
          <span className="tag">{product.category}</span>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <ul className="product-features">
            {product.features.map((f) => (
              <li key={f}>
                <i className="ri-check-line" />
                {f}
              </li>
            ))}
          </ul>
          <a href={mailHref} className="btn btn-primary">
            Anfrage senden
          </a>
        </div>
      </div>
    </div>
  );
}
