import React from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import Button from './Button';

const About = () => {
  const sectionRef = useAnimateOnScroll({ threshold: 0.1 });
  return (
    <section id="about" ref={sectionRef}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="section-title">О Нас</h2>
            <p className="section-subtitle">
              Мы — команда экспертов в области искусственного интеллекта и робототехники, создающая инновационные решения для бизнеса.
            </p>
            <p className="font-sans text-slate mb-8">
              Наша миссия — сделать передовые технологии доступными для каждой компании, помогая им оптимизировать процессы, повышать эффективность и открывать новые горизонты роста. Мы верим, что будущее за интеллектуальными системами, и стремимся быть на переднем крае этой технологической революции.
            </p>
            <Button href="#contact" className="bg-neon-cyan text-dark-navy font-bold px-8 py-3 rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">
              Связаться с нами
            </Button>
          </div>
          <div className="order-1 md:order-2 group relative">
            <div className="relative rounded-lg p-4 border border-slate/20 transition-all duration-300 group-hover:border-neon-cyan group-hover:shadow-[0_0_20px_rgba(100,255,218,0.3)]">
              <img src="/multimodal.webp" alt="Команда Aimy" className="rounded-lg w-full h-auto" />
              <div className="absolute inset-0 bg-dark-navy/30 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
