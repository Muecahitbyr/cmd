# CMD Industrielle Reinigung — Website

Neu aufgebaute Website (React + Vite) als Ersatz für die bisherige AI-Baukasten-Version. Inhalte, Bilder und Rechtstexte sind 1:1 von der bestehenden Domain übernommen; Design und Code sind komplett neu.

## Setup

```bash
npm install
npm run dev       # lokale Entwicklung, http://localhost:5173
npm run build     # Produktions-Build nach dist/
npm run preview   # Build lokal testen
```

## Struktur

```
src/
  components/   # Navbar, Hero, Servicebereiche, Leistungen, Galerie, Footer, ...
  pages/        # Home, Impressum, Datenschutz
  data/         # content.js – alle Texte/Inhalte zentral
  assets/images # alle Bilder (lokal, nicht mehr vom alten Anbieter abhängig)
  styles/       # ein CSS pro Komponente
  lib/          # Smooth Scroll (Lenis) + Bild-Loader
  hooks/        # Scroll-Reveal-Animationen (GSAP ScrollTrigger)
```

## Inhalte ändern

Alle Texte (Leistungen, Servicebereiche, Bewertungen, Statistiken, Kontaktdaten) liegen zentral in `src/data/content.js` – dort anpassen, keine Suche durch die Komponenten nötig.

Neue Bilder: Datei in `src/assets/images/` ablegen und den Dateinamen in `content.js` eintragen.

## Deployment

Statischer Build (`npm run build` → `dist/`), lauffähig auf jedem Static Hosting (z.B. Netlify, Vercel, eigener Webspace per FTP). Kein Node-Server nötig, nur die `dist/`-Dateien hochladen.

## Offene Punkte

- „Termin buchen“-Buttons öffnen aktuell `mailto:`/`tel:` — bei Bedarf später gegen ein echtes Buchungsformular oder -tool austauschen.
- Produkte/Shop-Seite wurde bewusst nicht übernommen (auf Wunsch entfernt).
