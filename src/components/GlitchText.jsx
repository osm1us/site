import React from 'react';

const GlitchText = ({ children, className }) => {
  return (
    <div className={`glitch-container ${className || ''}`}>
      <div className="glitch-text" data-text={children}>
        {children}
      </div>
    </div>
  );
};

export default GlitchText;
