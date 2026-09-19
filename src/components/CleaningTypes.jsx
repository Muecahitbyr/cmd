import { CLEANING_TYPES } from '../data/content.js';
import '../styles/cleaning-types.css';

export default function CleaningTypes() {
  return (
    <section className="cleaning-types">
      <div className="container">
        <div className="types-grid">
          {CLEANING_TYPES.map((type) => (
            <div className="type-card reveal" key={type.title}>
              <div className="type-icon">
                <i className={type.icon} />
              </div>
              <h3>{type.title}</h3>
              <p>{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
