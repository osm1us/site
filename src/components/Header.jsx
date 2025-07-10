import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isHeaderScrolled, setHeaderScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  const navLinks = [
    { href: '#home', text: 'Главная' },
    { href: '#services', text: 'Услуги' },
    { href: '#achievements', text: 'Достижения' },
    { href: '#partners', text: 'Партнеры' },
    { href: '#about', text: 'О нас' },
    { href: '#contact', text: 'Контакты' },
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
    exit: { opacity: 0, y: -20 },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isHeaderScrolled || isMenuOpen ? 'bg-navy/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <a href="#home" onClick={handleNavClick} className="flex items-center gap-2 z-50">
          <i className="fas fa-robot text-neon-cyan text-3xl"></i>
          <span className="font-mono text-2xl font-bold text-lightest-slate">AIMY</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-8" onMouseLeave={() => setHoveredLink(null)}>
            {navLinks.map(link => (
              <motion.li key={link.href} className="relative" onHoverStart={() => setHoveredLink(link.href)}>
                <a href={link.href} onClick={handleNavClick} className="font-sans text-light-slate hover:text-neon-cyan transition-colors duration-300">
                  {link.text}
                </a>
                {hoveredLink === link.href && (
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-[2px] bg-neon-cyan" 
                    layoutId="underline" 
                    initial={{ opacity: 0}} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}/>
                )}
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <button onClick={() => setMenuOpen(!isMenuOpen)} className="text-lightest-slate focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            className="md:hidden bg-light-navy absolute top-0 left-0 w-full pt-20 pb-4"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.ul className="flex flex-col items-center">
              {navLinks.map(link => (
                <motion.li key={link.href} variants={mobileLinkVariants} className='w-full text-center'>
                  <a href={link.href} onClick={handleNavClick} className="block py-3 font-sans text-light-slate hover:text-neon-cyan hover:bg-navy transition-colors duration-300">
                    {link.text}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
