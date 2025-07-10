import React from 'react';

const Footer = () => {
  const socialLinks = [
    { href: "https://t.me/Gyurik5", icon: "fab fa-telegram" },
    { href: "https://www.instagram.com/golovkoyuriy", icon: "fab fa-instagram" },
    { href: "#", icon: "fab fa-github" },
    { href: "#", icon: "fab fa-linkedin-in" },
  ];

  return (
    <footer className="bg-dark-navy/50 border-t border-slate/20 mt-20">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="font-sans text-slate text-sm text-center md:text-left">
            © {new Date().getFullYear()} Aimy. Все права защищены.
          </p>
          <div className="flex items-center space-x-6">
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate hover:text-neon-cyan transition-colors duration-300 transform hover:-translate-y-1"
              >
                <i className={`${link.icon} text-2xl`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
