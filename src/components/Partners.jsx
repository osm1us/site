import React from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

const Partners = () => {
  const sectionRef = useAnimateOnScroll({ threshold: 0.1 });
  const partners = [
    { src: '/federal_academy.png', alt: 'Федеральная Академия Вождения' },
    { src: '/mma_union.png', alt: 'Союз ММА России' },
    { src: '/champion_club.png', alt: 'Sport Club Champion' },
    { src: '/fcb_center.png', alt: 'ФЦБ - Федеральный Центр Банкротства' },
    { src: '/gazprom.png', alt: 'Газпром Добыча Уренгой Профсоюз' },
    { src: '/charity_fund.png', alt: 'Благотворительный Фонд Павленковой Чулпан' },
  ];

  return (
    <section id="partners" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Наши Партнеры</h2>
        <p className="section-subtitle">Мы гордимся сотрудничеством с ведущими технологическими и общественными организациями</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-12">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center p-4 bg-light-navy/40 rounded-lg transition-all duration-300 transform hover:scale-110 hover:bg-light-navy/80">
              <img 
                src={partner.src} 
                alt={partner.alt} 
                className="max-h-20 object-contain filter grayscale brightness-75 transition-all duration-300 hover:grayscale-0 hover:brightness-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
