import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className, href, type = 'button', ...props }) => {
  const motionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  };

  const Tag = href ? motion.a : motion.button;

  const tagSpecificProps = href ? { href } : { type };

  return (
    <Tag
      className={`btn ${className || ''}`}
      onClick={onClick}
      {...tagSpecificProps}
      {...motionProps}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Button;
