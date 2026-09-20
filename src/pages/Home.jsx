import { useEffect } from 'react';
import VideoHero from '../components/VideoHero.jsx';
import Partners from '../components/Partners.jsx';
import CleaningTypes from '../components/CleaningTypes.jsx';
import Stats from '../components/Stats.jsx';
import DetailedServices from '../components/DetailedServices.jsx';
import Gallery from '../components/Gallery.jsx';
import Testimonial from '../components/Testimonial.jsx';
import CTASection from '../components/CTASection.jsx';
import useReveal from '../hooks/useReveal.js';

export default function Home() {
  useEffect(() => {
    document.title = 'CMD Reinigungsservice | Professionelle Gebäudereinigung Augsburg';
  }, []);

  useReveal('#home-page');

  return (
    <main id="home-page">
      <VideoHero />
      <Partners />
      <CleaningTypes />
      <Stats />
      <Testimonial />
      <DetailedServices />
      <Gallery />
      <CTASection />
    </main>
  );
}
