import { Link, useLocation, useNavigate } from 'react-router-dom';
import { img } from '../lib/images.js';
import { CONTACT } from '../data/content.js';
import { scrollToTarget } from '../lib/smoothScroll.js';
import '../styles/footer.css';

const LEISTUNGEN = ['Wöchentliche Reinigung', 'Tägliche Reinigung', 'Einmalige Reinigung', 'Spezialreinigung'];

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLeistungenClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/#leistungen');
      return;
    }
    scrollToTarget('#leistungen');
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src={img('logo.png')} alt="CMD Industrielle Reinigung" />
          </Link>
          <p>
            Professionelle Reinigungslösungen für Unternehmen und Gewerbe. Makellose Sauberkeit mit
            modernster Technologie.
          </p>
        </div>

        <div className="footer-col">
          <h4>Unsere Leistungen</h4>
          <ul>
            {LEISTUNGEN.map((l) => (
              <li key={l}>
                <a href="#leistungen" onClick={handleLeistungenClick}>{l}</a>
              </li>
            ))}
            <li>
              <Link to="/shop">Reinigungsprodukte</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Kontakt</h4>
          <ul className="footer-contact">
            <li>
              <a href={CONTACT.phoneHref}>
                <i className="ri-phone-line" /> {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={CONTACT.mailHref}>
                <i className="ri-mail-line" /> {CONTACT.email}
              </a>
            </li>
            <li>
              <i className="ri-map-pin-line" /> {CONTACT.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 CMD Industrielle Reinigung. Alle Rechte vorbehalten.</span>
        <div className="footer-legal">
          <Link to="/impressum">Impressum</Link>
          <Link to="/datenschutz">Datenschutz</Link>
        </div>
      </div>
    </footer>
  );
}
