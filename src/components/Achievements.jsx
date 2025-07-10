import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const achievementsData = [
  { img: '/Diplome1.jpg', title: 'Диплом за инновации в ИИ', description: 'Признание достижений в области искусственного интеллекта' },
  { img: '/Diplome2.jpg', title: 'Сертификат по робототехнике', description: 'Подтверждение квалификации в разработке роботов' },
  { img: '/Diplome3.jpg', title: 'Награда за лучший проект', description: 'Победа в конкурсе технологических стартапов' },
  { img: '/Diplome4.jpg', title: 'Благодарность от клиента', description: 'Отзыв о успешном внедрении системы' },
  { img: '/Diplome5.jpg', title: 'Патент на технологию', description: 'Регистрация уникального алгоритма машинного обучения' },
];

const Achievements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    if (trackRef.current) {
      const track = trackRef.current;
      setTrackWidth(track.scrollWidth);
      setCardWidth(track.children[0].offsetWidth);
    }
  }, []);

  const handleNext = () => {
    setCurrentIndex(prev => (prev === achievementsData.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? achievementsData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  const cardVariants = {
    hover: {
      borderColor: '#FF64DA', // neon-pink
      boxShadow: '0px 0px 20px rgba(255, 100, 218, 0.3)',
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  return (
    <section id="achievements">
      <div className="container">
        <h2 className="section-title">Наши Достижения</h2>
        <p className="section-subtitle">Благодарственные письма и дипломы, подтверждающие нашу экспертизу</p>
        
        <div className="relative w-full max-w-5xl mx-auto mt-12">
          <div className="overflow-hidden">
            <motion.div 
              ref={trackRef} 
              className="flex"
              animate={{ x: -currentIndex * cardWidth }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {achievementsData.map((item, index) => (
                <div key={index} className="w-full md:w-1/3 flex-shrink-0 px-4" style={{ flex: '0 0 33.333333%' }}>
                  <motion.div 
                    className="group relative bg-light-navy/60 backdrop-blur-sm border border-slate/20 rounded-lg p-4"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <img src={item.img} alt={item.title} className="w-full h-auto rounded-md" />
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h4 className="font-mono text-lg font-bold text-lightest-slate mb-2">{item.title}</h4>
                      <p className="font-sans text-slate text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          <button onClick={handlePrev} className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-dark-navy/50 text-neon-pink w-14 h-14 rounded-full flex items-center justify-center hover:bg-neon-pink hover:text-dark-navy transition-all duration-300 z-10">
            <i className="fas fa-chevron-left text-2xl"></i>
          </button>
          <button onClick={handleNext} className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-dark-navy/50 text-neon-pink w-14 h-14 rounded-full flex items-center justify-center hover:bg-neon-pink hover:text-dark-navy transition-all duration-300 z-10">
            <i className="fas fa-chevron-right text-2xl"></i>
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-3">
          {achievementsData.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-neon-pink scale-125' : 'bg-slate/50 hover:bg-slate/80'}`}>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
