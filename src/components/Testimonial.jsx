import { TESTIMONIALS } from '../data/content.js';
import '../styles/testimonial.css';

function Stars() {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className="ri-star-fill" />
      ))}
    </div>
  );
}

export default function Testimonial() {
  return (
    <section className="testimonial">
      <div className="section-head container">
        <span className="eyebrow reveal">Kundenstimmen</span>
        <h2 className="reveal">Was unsere Kunden sagen</h2>
      </div>

      <div className="testimonial-marquee reveal-fade">
        <div className="testimonial-track">
          {TESTIMONIALS.map((t) => (
            <div className="testimonial-card" key={t.author}>
              <Stars />
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{t.author}</span>
                {t.meta && <span className="testimonial-meta">{t.meta}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
