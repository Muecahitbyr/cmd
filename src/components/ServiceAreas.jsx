import { img } from '../lib/images.js';
import { SERVICE_AREAS } from '../data/content.js';
import '../styles/service-areas.css';

export default function ServiceAreas() {
  return (
    <section className="service-areas" id="bereiche">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal">Einsatzbereiche</span>
          <h2 className="reveal">Räume, die wir zum Glänzen bringen</h2>
          <p className="reveal">
            Von Büros bis zur Industriehalle – wir sorgen in jedem Umfeld für makellose Sauberkeit.
          </p>
        </div>

        <div className="areas-grid">
          {SERVICE_AREAS.map((area) => (
            <div className="area-card reveal-scale" key={area.title}>
              <div className="area-card-media">
                <img src={img(area.image)} alt={area.title} loading="lazy" />
              </div>
              <div className="area-card-label">
                <i className={area.icon} />
                <span>{area.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
