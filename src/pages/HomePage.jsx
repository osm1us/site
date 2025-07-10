import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Achievements from '../components/Achievements';
import About from '../components/About';
import Partners from '../components/Partners';
import Contact from '../components/Contact';
import AnimatedSection from '../components/AnimatedSection';

const HomePage = () => {
  return (
    <main>
      <AnimatedSection>
        <Hero />
      </AnimatedSection>
      <AnimatedSection>
        <Services />
      </AnimatedSection>
      <AnimatedSection>
        <Achievements />
      </AnimatedSection>
      <AnimatedSection>
        <About />
      </AnimatedSection>
      <AnimatedSection>
        <Partners />
      </AnimatedSection>
      <AnimatedSection>
        <Contact />
      </AnimatedSection>
    </main>
  );
};

export default HomePage;
