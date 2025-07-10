import React, { useEffect, useRef } from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import Button from './Button';

const StatCounter = ({ target, suffix = '', title }) => {
  const numberRef = useRef(null);

  const startAnimation = React.useCallback(() => {
    const element = numberRef.current;
    if (!element) return;

    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, 40);

    return () => clearInterval(timer);
  }, [target, suffix]);

  const statRef = useAnimateOnScroll({ threshold: 0.5 }, startAnimation);

  return (
    <div ref={statRef} className="text-center">
      <h3 ref={numberRef} className="font-mono text-4xl md:text-5xl font-bold text-neon-pink mb-2">0{suffix}</h3>
      <p className="font-sans text-slate tracking-widest uppercase text-sm">{title}</p>
    </div>
  );
};

const Hero = () => {
  const sectionRef = useAnimateOnScroll({ threshold: 0.1 });
  const titleRef = useRef(null);

  // Typing Effect for Hero Title
  useEffect(() => {
    const element = titleRef.current;
    if (element) {
      const fullText = 'Будущее ИИ и Робототехники уже здесь';
      const highlight = 'ИИ и Робототехники';
      element.innerHTML = '';
      let i = 0;
      const type = () => {
        if (i < fullText.length) {
          let part = fullText.substring(0, i + 1);
          element.setAttribute('data-text', fullText);
          element.innerHTML = part.replace(highlight, `<span class="text-neon-cyan">${highlight}</span>`);
          i++;
          setTimeout(type, 50);
        }
      };
      setTimeout(type, 500);
    }
  }, []);

  return (
    <section 
      id="home" 
      ref={sectionRef} 
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 bg-dark-navy"
    >
      {/* Эффекты фона */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-40"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2032%2032%22%20width=%2232%22%20height=%2232%22%20fill=%22none%22%20stroke=%22%230a192f%22%3e%3cpath%20d=%22M0%20.5H31.5V32%22/%3e%3c/svg%3e')] opacity-100 mix-blend-soft-light"></div>
      </div>

      <div className="container z-10 text-center">
        <h1 ref={titleRef} className="glitch font-mono text-4xl sm:text-5xl md:text-7xl font-bold text-lightest-slate mb-6 leading-tight min-h-[100px] md:min-h-[168px]" data-text=""></h1>
        <p className="font-sans text-lg md:text-xl text-slate max-w-3xl mx-auto mb-10">
          Мы создаем интеллектуальные решения для бизнеса, разрабатываем роботов нового поколения и внедряем технологии искусственного интеллекта в реальные проекты.
        </p>
        <div className="flex justify-center items-center gap-4 mb-20">
          <Button href="#services" className="bg-neon-cyan text-dark-navy font-bold px-8 py-3 rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">Начать работу</Button>
          <Button className="border-2 border-neon-pink text-neon-pink font-bold px-8 py-3 rounded-full hover:bg-neon-pink hover:text-dark-navy transition-all duration-300 transform hover:scale-105">Демо видео</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <StatCounter target={50} suffix="+" title="Проектов" />
          <StatCounter target={24} suffix="/7" title="Поддержка" />
          <StatCounter target={100} suffix="%" title="Инновации" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
