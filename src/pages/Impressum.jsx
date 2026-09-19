import { useEffect } from 'react';
import { CONTACT } from '../data/content.js';
import '../styles/legal.css';

export default function Impressum() {
  useEffect(() => {
    document.title = 'Impressum | CMD Industrielle Reinigung';
  }, []);

  return (
    <main className="legal-page">
      <div className="container legal-container">
        <h1>Impressum</h1>

        <section>
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            CMD Industrielle Reinigung
            <br />
            Mücahit Dogru
            <br />
            Bahnhofstr. 6
            <br />
            86925 Fuchstal
            <br />
            Deutschland
          </p>
        </section>

        <section>
          <h2>Kontakt</h2>
          <p>
            Telefon: <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            <br />
            E-Mail: <a href={CONTACT.mailHref}>{CONTACT.email}</a>
          </p>
        </section>

        <section>
          <h2>Umsatzsteuer-ID</h2>
          <p>Steuernummer: DE 455 943479</p>
        </section>

        <section>
          <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            Mücahit Dogru
            <br />
            Hafnergraben 1b
            <br />
            86830 Schwabmünchen
            <br />
            Deutschland
          </p>
        </section>

        <section>
          <h2>Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach
            den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
            jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
            hinweisen.
          </p>
        </section>

        <section>
          <h2>Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
            Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
            Seiten verantwortlich.
          </p>
        </section>

        <section>
          <h2>Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
            dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
            des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>

        <section>
          <h2>Verbraucherstreitbeilegung</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <p className="legal-footnote">
          © 2026 CMD Industrielle Reinigung. Alle Rechte vorbehalten.
          <br />
          Website erstellt von BAYAR-SOLUTIONS.
        </p>
      </div>
    </main>
  );
}
