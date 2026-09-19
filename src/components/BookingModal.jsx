import { useEffect, useRef, useState } from 'react';
import { DETAILED_SERVICES, CONTACT } from '../data/content.js';
import { useBookingModal } from '../context/BookingModalContext.jsx';
import '../styles/booking-modal.css';

const EMPTY = { name: '', email: '', phone: '', service: '', date: '', time: '', message: '' };
const MAX_MESSAGE = 500;

export default function BookingModal() {
  const { isOpen, presetService, closeBooking } = useBookingModal();
  const [fields, setFields] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setFields((f) => ({ ...EMPTY, service: presetService || f.service }));
      setSent(false);
    }
  }, [isOpen, presetService]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && closeBooking();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeBooking]);

  if (!isOpen) return null;

  const update = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = [
      `Name: ${fields.name}`,
      `E-Mail: ${fields.email}`,
      `Telefon: ${fields.phone}`,
      fields.service && `Dienstleistung: ${fields.service}`,
      fields.date && `Wunschdatum: ${fields.date}`,
      fields.time && `Uhrzeit: ${fields.time}`,
      '',
      fields.message,
    ].filter(Boolean);

    const mailHref = `${CONTACT.mailHref.split('?')[0]}?subject=${encodeURIComponent(
      'Terminanfrage',
    )}&body=${encodeURIComponent(lines.join('\n'))}`;

    window.location.href = mailHref;
    setSent(true);
  };

  return (
    <div className="booking-backdrop" onClick={closeBooking}>
      <div className="booking-panel" ref={panelRef} onClick={(e) => e.stopPropagation()}>
        <div className="booking-header">
          <h3>Termin buchen</h3>
          <button type="button" className="booking-close" onClick={closeBooking} aria-label="Schließen">
            <i className="ri-close-line" />
          </button>
        </div>

        {sent ? (
          <div className="booking-success">
            <i className="ri-checkbox-circle-fill" />
            <h4>Anfrage bereit zum Versand</h4>
            <p>Ihr E-Mail-Programm öffnet sich mit der ausgefüllten Terminanfrage an {CONTACT.email}.</p>
            <button type="button" className="btn btn-primary" onClick={closeBooking}>
              Schließen
            </button>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            <label>
              <span className="booking-label-text">Name <span>*</span></span>
              <input type="text" required placeholder="Ihr Name" value={fields.name} onChange={update('name')} />
            </label>

            <label>
              <span className="booking-label-text">E-Mail <span>*</span></span>
              <input
                type="email"
                required
                placeholder="ihre.email@beispiel.de"
                value={fields.email}
                onChange={update('email')}
              />
            </label>

            <label>
              <span className="booking-label-text">Telefon <span>*</span></span>
              <input
                type="tel"
                required
                placeholder="+49 123 456789"
                value={fields.phone}
                onChange={update('phone')}
              />
            </label>

            <label>
              <span className="booking-label-text">Dienstleistung <span>*</span></span>
              <select required value={fields.service} onChange={update('service')}>
                <option value="" disabled>
                  Bitte wählen
                </option>
                {DETAILED_SERVICES.map((s) => (
                  <option key={s.number} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </label>

            <div className="booking-row">
              <label>
                <span className="booking-label-text">Wunschdatum <span>*</span></span>
                <input type="date" required value={fields.date} onChange={update('date')} />
              </label>
              <label>
                <span className="booking-label-text">Uhrzeit <span>*</span></span>
                <input type="time" required value={fields.time} onChange={update('time')} />
              </label>
            </div>

            <label>
              Nachricht
              <textarea
                rows="4"
                maxLength={MAX_MESSAGE}
                placeholder="Zusätzliche Informationen (max. 500 Zeichen)"
                value={fields.message}
                onChange={update('message')}
              />
              <span className="booking-counter">
                {fields.message.length}/{MAX_MESSAGE} Zeichen
              </span>
            </label>

            <button type="submit" className="btn btn-primary booking-submit">
              Termin anfragen <i className="ri-send-plane-fill" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
