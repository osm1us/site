import React, { useState } from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import Button from './Button';

const Contact = () => {
  const sectionRef = useAnimateOnScroll({ threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Имитация задержки сети
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Закомментировано для демонстрации, т.к. эндпоинт /api/submit_form не существует
      // const response = await fetch('/api/submit_form', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      // if (response.ok) {
      //   alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
      //   form.reset();
      // } else {
      //   alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
      // }

      // Демонстрационный код
      console.log('Form data submitted:', data);
      alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время. (Это демонстрация)');
      form.reset();

    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке формы. Пожалуйста, проверьте ваше интернет-соединение.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "w-full bg-light-navy/60 border border-slate/30 rounded-md py-3 px-4 text-lightest-slate placeholder-slate/60 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all duration-300";

  return (
    <section id="contact" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Свяжитесь с нами</h2>
        <p className="section-subtitle">Готовы начать проект или есть вопросы? Заполните форму, и мы ответим вам в ближайшее время.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          <div className="md:col-span-1 space-y-6">
            <h3 className="font-mono text-2xl font-bold text-lightest-slate">Контактная информация</h3>
            <p className="font-sans text-slate">Мы всегда на связи, чтобы обсудить ваши идеи и предложить лучшие решения для вашего бизнеса.</p>
            <div className="flex items-center">
              <i className="fas fa-envelope text-2xl text-neon-cyan w-8"></i>
              <span className="font-sans text-light-slate ml-4">info@aimy.com</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-phone-alt text-2xl text-neon-cyan w-8"></i>
              <span className="font-sans text-light-slate ml-4">+7 (999) 123-45-67</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt text-2xl text-neon-cyan w-8"></i>
              <span className="font-sans text-light-slate ml-4">Москва, Россия</span>
            </div>
          </div>

          <form onSubmit={handleContactFormSubmit} className="md:col-span-2 space-y-6">
            <input type="text" name="name" placeholder="Ваше имя" required className={inputStyles} />
            <input type="email" name="email" placeholder="Email" required className={inputStyles} />
            <input type="tel" name="phone" placeholder="Телефон" className={inputStyles} />
            <textarea name="message" placeholder="Опишите ваш проект..." rows="5" required className={inputStyles}></textarea>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-neon-cyan text-dark-navy font-bold px-8 py-4 rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 disabled:bg-slate/50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
