import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

/* Shared section-level styles used across multiple components */
const SharedStyles = () => (
  <style>{`
    .section-tag {
      display: inline-block;
      background: var(--color-primary-xlight);
      color: var(--color-primary-dark);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 6px 14px;
      border-radius: 999px;
      margin-bottom: 20px;
      border: 1px solid var(--color-primary-light);
    }
    .section-title {
      font-family: var(--font-display);
      font-size: clamp(30px, 4vw, 44px);
      font-weight: 800;
      line-height: 1.1;
      color: var(--color-dark);
      margin-bottom: 16px;
    }
    .section-title .accent { color: var(--color-primary); }
  `}</style>
);

export default function App() {
  return (
    <>
      <SharedStyles />
      <Header />
      <main>
        <Hero />
        <About />
        <Programs />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
