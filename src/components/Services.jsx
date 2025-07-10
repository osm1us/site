import React from 'react';
import InteractiveServiceCard from './InteractiveServiceCard';
import RoboticArmDemo from './RoboticArmDemo';
import { BrainCircuit, Bot, MicVocal, Cpu } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Bot,
      title: 'Генеративный ИИ',
      description: 'Создаем ИИ-ассистентов, которые автоматизируют задачи, генерируют контент и персонализируют пользовательский опыт.',
      demoType: 'terminal',
    },
    {
      icon: Cpu,
      title: 'Робототехника и Автоматизация',
      description: 'Проектируем и внедряем роботизированные системы для оптимизации производственных и логистических процессов.',
      demoType: 'robotics',
    },
    {
      icon: BrainCircuit,
      title: 'Машинное обучение',
      description: 'Разрабатываем предиктивные модели и системы анализа данных, которые помогают принимать решения на основе больших данных.',
      demoType: 'data-viz',
    },
  ];

  return (
    <section id="services">
      <div className="container">
        <h2 className="section-title">Наши Услуги</h2>
        <p className="section-subtitle">
          Мы превращаем сложные технологии в эффективные инструменты для вашего бизнеса, открывая новые горизонты для роста и инноваций.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <InteractiveServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
