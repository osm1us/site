import React, { useEffect, useRef } from 'react';
import './index.css';

const App = () => {
  // Mobile Menu Toggle
  useEffect(() => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    const handleToggle = () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    };

    if (navToggle) {
      navToggle.addEventListener('click', handleToggle);
    }

    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    return () => {
      if (navToggle) {
        navToggle.removeEventListener('click', handleToggle);
      }
    };
  }, []);

  // Smooth Scrolling
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  // Header Background on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (header) {
        if (window.scrollY > 100) {
          header.style.background = 'rgba(255, 255, 255, 0.98)';
          header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
          header.style.background = 'rgba(255, 255, 255, 0.95)';
          header.style.boxShadow = 'none';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });

    document.querySelectorAll('.service-card').forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });

    document.querySelectorAll('.feature, .tech-item').forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Typing Effect for Hero Title
  useEffect(() => {
    const heroTitleElement = document.querySelector('.hero-title');
    if (heroTitleElement) {
      const fullText = 'Будущее ИИ и Робототехники уже здесь';
      const gradientText = 'ИИ и Робототехники';
      
      heroTitleElement.innerHTML = ''; // Clear content initially

      let index = 0;
      const typeWriter = () => {
        if (index < fullText.length) {
          const currentText = fullText.substring(0, index + 1);
          
          // Replace the gradient part with styled span
          if (currentText.includes(gradientText)) {
            const beforeGradient = currentText.substring(0, currentText.indexOf(gradientText));
            const gradientPart = currentText.substring(currentText.indexOf(gradientText), currentText.indexOf(gradientText) + gradientText.length);
            const afterGradient = currentText.substring(currentText.indexOf(gradientText) + gradientText.length);
            
            heroTitleElement.innerHTML = beforeGradient + '<span class="gradient-text">' + gradientPart + '</span>' + afterGradient;
          } else {
            heroTitleElement.textContent = currentText;
          }
          
          index++;
          setTimeout(typeWriter, 50);
        }
      };
      setTimeout(typeWriter, 1000);
    }
  }, []);

  // Counter Animation for Stats
  useEffect(() => {
    const animateCounter = (element, target) => {
      let current = 0;
      const increment = target / 50;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target === 50 ? '+' : target === 100 ? '%' : '');
      }, 50);
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector('h3');
          const text = statNumber.textContent;
          const number = parseInt(text);

          if (number) {
            statNumber.textContent = '0';
            animateCounter(statNumber, number);
          }
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat').forEach(stat => {
      statsObserver.observe(stat);
    });

    return () => statsObserver.disconnect();
  }, []);

  // Parallax Effect for Hero
  useEffect(() => {
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  // Button Click Effects (Ripple)
  useEffect(() => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      const handleClick = function (e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        setTimeout(() => {
          ripple.remove();
        }, 600);
      };
      btn.addEventListener('click', handleClick);
      return () => btn.removeEventListener('click', handleClick);
    });
  }, []);

  // Achievements Slider
  useEffect(() => {
    const track = document.getElementById('achievementsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (track && prevBtn && nextBtn && dotsContainer) {
      const cards = track.querySelectorAll('.achievement-card');
      const totalCards = cards.length;
      let currentIndex = 0;
      const cardsToShow = window.innerWidth <= 768 ? 1 : 3;
      const maxIndex = Math.max(0, totalCards - cardsToShow);

      // Create dots
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }

      const updateSlider = () => {
        const translateX = -(currentIndex * (100 / cardsToShow));
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dotsContainer.querySelectorAll('.slider-dot').forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
      };

      const goToSlide = (index) => {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateSlider();
      };

      const nextSlide = () => {
        goToSlide(currentIndex + 1);
      };

      const prevSlide = () => {
        goToSlide(currentIndex - 1);
      };

      prevBtn.addEventListener('click', prevSlide);
      nextBtn.addEventListener('click', nextSlide);

      // Auto-play
      const autoPlay = setInterval(nextSlide, 5000);

      return () => {
        clearInterval(autoPlay);
        prevBtn.removeEventListener('click', prevSlide);
        nextBtn.removeEventListener('click', nextSlide);
      };
    }
  }, []);

  // Contact Form Handler
  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Отправляется...';
    submitBtn.disabled = true;

    try {
      const response = await fetch('/api/submit_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
        form.reset();
      } else {
        alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке формы. Пожалуйста, проверьте ваше интернет-соединение.');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  };

  return (
    <div className="App">
      <header className="header">
        <nav className="nav">
          <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-robot"></i>
              <span>AIMY Expert</span>
            </div>
            <ul className="nav-menu">
              <li><a href="#home">Главная</a></li>
              <li><a href="#services">Услуги</a></li>
              <li><a href="#achievements">Достижения</a></li>
              <li><a href="#partners">Партнеры</a></li>
              <li><a href="#about">О нас</a></li>
              <li><a href="#contact">Контакты</a></li>
            </ul>
            <div className="nav-toggle">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </nav>
      </header>

      <section id="home" className="hero">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">Будущее <span className="gradient-text">ИИ и Робототехники</span> уже здесь</h1>
              <p className="hero-subtitle">Мы создаем интеллектуальные решения для бизнеса, разрабатываем роботов нового поколения и внедряем технологии искусственного интеллекта в реальные проекты.</p>
              <div className="hero-buttons">
                <button className="btn btn-primary">Начать проект</button>
                <button className="btn btn-secondary">Демо видео</button>
              </div>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <h3>50+</h3>
                <p>Проектов</p>
              </div>
              <div className="stat">
                <h3>24</h3>
                <p>Поддержка</p>
              </div>
              <div className="stat">
                <h3>100%</h3>
                <p>Инновации</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title">Наши Услуги</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>Искусственный Интеллект</h3>
              <p>Разработка и внедрение ИИ систем для автоматизации бизнес-процессов, анализа данных и принятия решений.</p>
              <ul>
                <li>Машинное обучение</li>
                <li>Компьютерное зрение</li>
                <li>Обработка языка</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h3>Робототехника</h3>
              <p>Проектирование и создание робототехнических систем для промышленности, медицины и бытового использования.</p>
              <ul>
                <li>Промышленные роботы</li>
                <li>Сервисные роботы</li>
                <li>Системы управления</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-microphone"></i>
              </div>
              <h3>Голосовые Технологии</h3>
              <p>Системы распознавания и синтеза речи, голосовые ассистенты и интерактивные голосовые интерфейсы.</p>
              <ul>
                <li>Голосовые боты</li>
                <li>Распознавание речи</li>
                <li>Синтез речи</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-eye"></i>
              </div>
              <h3>Компьютерное Зрение</h3>
              <p>Системы анализа изображений, распознавания объектов и автоматического контроля качества.</p>
              <ul>
                <li>Анализ изображений</li>
                <li>Детекция объектов</li>
                <li>Контроль качества</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="achievements" className="achievements">
        <div className="container">
          <h2 className="section-title">Наши Достижения</h2>
          <p className="section-subtitle">Благодарственные письма и дипломы, подтверждающие нашу экспертизу</p>
          <div className="achievements-slider">
            <div className="slider-container">
              <div className="slider-track" id="achievementsTrack">
                <div className="achievement-card">
                  <img src="/Diplome1.jpg" alt="Диплом 1" />
                  <div className="achievement-overlay">
                    <h4>Диплом за инновации в ИИ</h4>
                    <p>Признание достижений в области искусственного интеллекта</p>
                  </div>
                </div>
                <div className="achievement-card">
                  <img src="/Diplome2.jpg" alt="Диплом 2" />
                  <div className="achievement-overlay">
                    <h4>Сертификат качества</h4>
                    <p>Подтверждение высокого качества наших решений</p>
                  </div>
                </div>
                <div className="achievement-card">
                  <img src="/Diplome3.jpg" alt="Диплом 3" />
                  <div className="achievement-overlay">
                    <h4>Награда за технологические достижения</h4>
                    <p>Признание в области робототехники</p>
                  </div>
                </div>
                <div className="achievement-card">
                  <img src="/Diplome4.jpg" alt="Диплом 4" />
                  <div className="achievement-overlay">
                    <h4>Благодарственное письмо</h4>
                    <p>За успешную реализацию проектов</p>
                  </div>
                </div>
                <div className="achievement-card">
                  <img src="./image.png" alt="Благодарственное письмо" />
                  <div className="achievement-overlay">
                    <h4>Благодарность от клиента</h4>
                    <p>За качественное выполнение работ</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="slider-controls">
              <button className="slider-btn prev-btn" id="prevBtn">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="slider-btn next-btn" id="nextBtn">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            <div className="slider-dots" id="sliderDots"></div>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>О AIMY Expert</h2>
              <p>Мы — команда экспертов в области искусственного интеллекта и робототехники, которая создает технологии будущего уже сегодня.</p>
              <div className="features">
                <div className="feature">
                  <i className="fas fa-rocket"></i>
                  <div>
                    <h4>Инновации</h4>
                    <p>Используем самые передовые технологии ИИ</p>
                  </div>
                </div>
                <div className="feature">
                  <i className="fas fa-users"></i>
                  <div>
                    <h4>Экспертиза</h4>
                    <p>Команда из 20+ специалистов высокого уровня</p>
                  </div>
                </div>
                <div className="feature">
                  <i className="fas fa-shield-alt"></i>
                  <div>
                    <h4>Надежность</h4>
                    <p>Гарантируем качество и поддержку 24/7</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="tech-stack">
                <div className="tech-item">Python</div>
                <div className="tech-item">TensorFlow</div>
                <div className="tech-item">OpenCV</div>
                <div className="tech-item">ROS</div>
                <div className="tech-item">PyTorch</div>
                <div className="tech-item">CUDA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="partners" className="partners">
        <div className="container">
          <h2 className="section-title">Наши Партнеры</h2>
          <p className="section-subtitle">Мы гордимся сотрудничеством с ведущими технологическими компаниями</p>
          <div className="partners-grid">
            <div className="partner-item">
              <img src="./federal_academy.png" alt="Федеральная Академия Вождения" />
            </div>
            <div className="partner-item">
              <img src="./mma_union.png" alt="Союз ММА России" />
            </div>
            <div className="partner-item">
              <img src="./champion_club.png" alt="Sport Club Champion" />
            </div>
            <div className="partner-item">
              <img src="./fcb_center.png" alt="ФЦБ - Федеральный Центр Банкротства" />
            </div>
            <div className="partner-item">
              <img src="./gazprom.png" alt="Газпром Добыча Уренгой Профсоюз" />
            </div>
            <div className="partner-item">
              <img src="./charity_fund.png" alt="Благотворительный Фонд Павленковой Чулпан" />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Свяжитесь с нами</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Начните свой проект уже сегодня</h3>
              <p>Готовы внедрить ИИ и робототехнику в ваш бизнес? Свяжитесь с нами для бесплатной консультации.</p>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>info@aimyexpert.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+7 (999) 123-45-67</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Москва, Россия</span>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleContactFormSubmit}>
              <div className="form-group">
                <input type="text" name="name" placeholder="Ваше имя" required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <input type="tel" name="phone" placeholder="Телефон" />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="Опишите ваш проект" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Отправить заявку</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <i className="fas fa-robot"></i>
                <span>AIMY Expert</span>
              </div>
              <p>Технологии искусственного интеллекта и робототехники для вашего успеха</p>
            </div>
            <div className="footer-section">
              <h4>Услуги</h4>
              <ul>
                <li><a href="#">Искусственный интеллект</a></li>
                <li><a href="#">Робототехника</a></li>
                <li><a href="#">Компьютерное зрение</a></li>
                <li><a href="#">Голосовые технологии</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Компания</h4>
              <ul>
                <li><a href="#">О нас</a></li>
                <li><a href="#">Команда</a></li>
                <li><a href="#">Карьера</a></li>
                <li><a href="#">Блог</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Следите за нами</h4>
              <div className="social-links">
                <a href="https://t.me/Gyurik5" target="_blank" rel="noopener noreferrer"><i className="fab fa-telegram"></i></a>
                <a href="https://www.instagram.com/golovkoyuriy" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-github"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 AIMY Expert. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

