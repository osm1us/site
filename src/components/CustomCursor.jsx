import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import useCustomCursor from '../hooks/useCustomCursor';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const { isHovering } = useCustomCursor(cursorRef);

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(100, 255, 218, 0.8)', // neon-cyan
      border: 'none',
    },
    hover: {
      scale: 1.5,
      backgroundColor: 'rgba(100, 255, 218, 0.2)',
      border: '2px solid #64FFDA',
    },
  };

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50"
      variants={cursorVariants}
      animate={isHovering ? 'hover' : 'default'}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  );
};

export default CustomCursor;
