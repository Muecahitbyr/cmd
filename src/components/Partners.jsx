import { img } from '../lib/images.js';
import { PARTNERS } from '../data/content.js';
import '../styles/partners.css';

export default function Partners() {
  return (
    <section className="partners">
      <div className="container partners-inner reveal">
        <span className="partners-label tag">Vertraut von</span>
        <div className="partners-row">
          {PARTNERS.map((p) => (
            <img key={p.name} src={img(p.image)} alt={p.name} />
          ))}
          <span className="partners-text">Bender Hausmeisterservice</span>
        </div>
      </div>
    </section>
  );
}
