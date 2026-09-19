import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { img } from '../lib/images.js';
import { NAV_LINKS, CONTACT } from '../data/content.js';
import { scrollToTarget } from '../lib/smoothScroll.js';
import { useBookingModal } from '../context/BookingModalContext.jsx';
import '../styles/navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openBooking } = useBookingModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    scrollToTarget(href);
  };

  const renderLink = (link) =>
    link.type === 'route' ? (
      <Link key={link.href} to={link.href} onClick={() => setOpen(false)}>
        {link.label}
      </Link>
    ) : (
      <a key={link.href} href={link.href} onClick={(e) => handleAnchorClick(e, link.href)}>
        {link.label}
      </a>
    );

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <img src={img('logo.png')} alt="CMD Industrielle Reinigung" />
        </Link>

        <nav className="navbar-links">{NAV_LINKS.map(renderLink)}</nav>

        <div className="navbar-actions">
          <a href={CONTACT.phoneHref} className="navbar-icon-link" aria-label="Anrufen">
            <i className="ri-phone-line" />
          </a>
          <button type="button" className="btn btn-primary navbar-cta" onClick={() => openBooking()}>
            Termin buchen
          </button>
        </div>

        <button className="navbar-burger" onClick={() => setOpen((v) => !v)} aria-label="Menü">
          <span />
          <span />
          <span />
        </button>
      </div>

      {createPortal(
        <div className={`navbar-mobile ${open ? 'is-open' : ''}`}>
          <nav>{NAV_LINKS.map(renderLink)}</nav>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setOpen(false);
              openBooking();
            }}
          >
            Termin buchen
          </button>
          <a href={CONTACT.phoneHref} className="navbar-mobile-phone">
            <i className="ri-phone-line" /> {CONTACT.phoneDisplay}
          </a>
        </div>,
        document.body,
      )}
    </header>
  );
}
