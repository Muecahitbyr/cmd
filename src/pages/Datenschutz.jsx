import { useEffect } from 'react';
import { CONTACT } from '../data/content.js';
import '../styles/legal.css';

export default function Datenschutz() {
  useEffect(() => {
    document.title = 'Datenschutzerklärung | CMD Industrielle Reinigung';
  }, []);

  return (
    <main className="legal-page">
      <div className="container legal-container">
        <h1>Datenschutzerklärung</h1>

        <section>
          <h2>1. Datenschutz auf einen Blick</h2>
          <h3>Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
            personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten
            sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche
            Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten
            Datenschutzerklärung.
          </p>

          <h3>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
          <p>
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
            Kontaktdaten finden Sie im Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser
            Datenschutzerklärung.
          </p>

          <h3>Wie erfassen wir Ihre Daten?</h3>
          <p>
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, z. B. über ein
            Kontaktformular oder per E-Mail. Andere Daten werden automatisch oder nach Ihrer
            Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem
            technische Daten wie Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs.
          </p>

          <h3>Wofür nutzen wir Ihre Daten?</h3>
          <p>
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
            gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
          </p>

          <h3>Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
          <p>
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck
            Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die
            Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum
            Thema Datenschutz können Sie sich jederzeit an uns wenden. Des Weiteren steht Ihnen ein
            Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
          </p>
        </section>

        <section>
          <h2>2. Hinweis zur verantwortlichen Stelle</h2>
          <p>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            <br />
            <br />
            CMD Industriell Gebäudereinigung
            <br />
            Mücahit Dogru
            <br />
            Bahnhofstr. 6
            <br />
            86925 Fuchstal
            <br />
            Deutschland
            <br />
            <br />
            Telefon: <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            <br />
            E-Mail: <a href={CONTACT.mailHref}>{CONTACT.email}</a>
          </p>
          <p>
            Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
            gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen
            Daten entscheidet.
          </p>
        </section>

        <section>
          <h2>3. Speicherdauer</h2>
          <p>
            Ihre personenbezogenen Daten verbleiben bei uns, bis der Zweck für die Datenverarbeitung
            entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung
            zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen
            rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.
          </p>
        </section>

        <section>
          <h2>4. Allgemeine Hinweise zu den Rechtsgrundlagen</h2>
          <p>
            Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre
            personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO. Bei der Erfüllung
            eines Vertrags erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
            gleiches gilt für vorvertragliche Anfragen. Zur Erfüllung einer rechtlichen Verpflichtung
            verarbeiten wir Ihre Daten auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Auf Grundlage
            berechtigter Interessen nach Art. 6 Abs. 1 lit. f DSGVO kann die Verarbeitung erfolgen, um
            unsere berechtigten Interessen zu wahren.
          </p>
        </section>

        <section>
          <h2>5. Widerruf Ihrer Einwilligung zur Datenverarbeitung</h2>
          <p>
            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich.
            Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der
            bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
          </p>
        </section>

        <section>
          <h2>6. Beschwerderecht bei der zuständigen Aufsichtsbehörde</h2>
          <p>
            Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
            Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts,
            ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. Das Beschwerderecht besteht
            unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
          </p>
        </section>

        <section>
          <h2>7. Recht auf Datenübertragbarkeit</h2>
          <p>
            Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung
            eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen,
            maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der
            Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch
            machbar ist.
          </p>
        </section>

        <section>
          <h2>8. Auskunft, Löschung und Berichtigung</h2>
          <p>
            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf
            unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft
            und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder
            Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten
            können Sie sich jederzeit an uns wenden.
          </p>
        </section>

        <section>
          <h2>9. Recht auf Einschränkung der Verarbeitung</h2>
          <p>
            Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
            verlangen, etwa wenn Sie die Richtigkeit der Daten bestreiten, die Verarbeitung
            unrechtmäßig ist, wir die Daten nicht mehr benötigen, Sie sie aber zur Geltendmachung
            rechtlicher Ansprüche benötigen, oder wenn Sie Widerspruch nach Art. 21 DSGVO eingelegt
            haben.
          </p>
        </section>

        <section>
          <h2>10. SSL- bzw. TLS-Verschlüsselung</h2>
          <p>
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
            Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
            daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem
            Schloss-Symbol in Ihrer Browserzeile.
          </p>
        </section>

        <p className="legal-footnote">© 2026 CMD Industriell Gebäudereinigung. Alle Rechte vorbehalten.</p>
      </div>
    </main>
  );
}
