import { img } from '../../lib/images.js';

export default function ProductCard({ product, onDetails }) {
  const mailHref = `mailto:info@cmd-industriell.de?subject=${encodeURIComponent(
    `Anfrage: ${product.name}`,
  )}&body=${encodeURIComponent(`Hallo,\n\nich interessiere mich für den Artikel "${product.name}" und hätte gerne weitere Informationen.\n\nViele Grüße`)}`;

  return (
    <div className="product-card reveal">
      <div className="product-card-media">
        <img src={img(product.image)} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card-body">
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
        <div className="product-card-actions">
          <button type="button" className="btn btn-ghost" onClick={() => onDetails(product)}>
            Details
          </button>
          <a href={mailHref} className="btn btn-primary">
            Anfrage
          </a>
        </div>
      </div>
    </div>
  );
}
