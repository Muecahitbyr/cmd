import { useState } from 'react';
import { PRODUCTS, CONTACT } from '../../data/content.js';

const EMPTY = { firstName: '', lastName: '', email: '', phone: '', company: '', message: '' };

export default function InquiryForm() {
  const [fields, setFields] = useState(EMPTY);
  const [selected, setSelected] = useState([]);
  const [sent, setSent] = useState(false);

  const update = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const toggleProduct = (name) => {
    setSelected((s) => (s.includes(name) ? s.filter((p) => p !== name) : [...s, name]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = [
      `Name: ${fields.firstName} ${fields.lastName}`,
      `E-Mail: ${fields.email}`,
      fields.phone && `Telefon: ${fields.phone}`,
      fields.company && `Firma: ${fields.company}`,
      selected.length > 0 && `Interessiert an: ${selected.join(', ')}`,
      '',
      fields.message,
    ].filter(Boolean);

    const mailHref = `${CONTACT.mailHref.split('?')[0]}?subject=${encodeURIComponent(
      'Produktanfrage',
    )}&body=${encodeURIComponent(lines.join('\n'))}`;

    window.location.href = mailHref;
    setSent(true);
  };

  return (
    <form className="inquiry-form reveal" onSubmit={handleSubmit}>
      <div className="inquiry-grid">
        <label>
          Vorname
          <input type="text" required value={fields.firstName} onChange={update('firstName')} />
        </label>
        <label>
          Nachname
          <input type="text" required value={fields.lastName} onChange={update('lastName')} />
        </label>
        <label>
          E-Mail
          <input type="email" required value={fields.email} onChange={update('email')} />
        </label>
        <label>
          Telefon
          <input type="tel" value={fields.phone} onChange={update('phone')} />
        </label>
        <label className="inquiry-full">
          Firma
          <input type="text" value={fields.company} onChange={update('company')} />
        </label>
      </div>

      <div className="inquiry-products">
        <span className="inquiry-label">Interessiert an</span>
        <div className="inquiry-checkboxes">
          {PRODUCTS.map((p) => (
            <label key={p.slug} className="inquiry-checkbox">
              <input
                type="checkbox"
                checked={selected.includes(p.name)}
                onChange={() => toggleProduct(p.name)}
              />
              {p.name}
            </label>
          ))}
        </div>
      </div>

      <label className="inquiry-full">
        Nachricht
        <textarea rows="4" value={fields.message} onChange={update('message')} />
      </label>

      <button type="submit" className="btn btn-primary">
        Anfrage senden
      </button>

      {sent && <p className="inquiry-note">Ihr E-Mail-Programm öffnet sich mit der ausgefüllten Anfrage.</p>}
    </form>
  );
}
