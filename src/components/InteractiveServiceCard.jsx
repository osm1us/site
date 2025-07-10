import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Terminal from './Terminal';
import RoboticArmDemo from './RoboticArmDemo';
import DataVisualization from './DataVisualization';

const InteractiveServiceCard = ({ icon: Icon, title, description, demoType }) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderDemo = () => {
    switch (demoType) {
      case 'terminal':
        return <Terminal isActive={isHovered} />;
      case 'robotics':
        return <RoboticArmDemo isActive={isHovered} />;
      case 'data-viz':
        return <DataVisualization isActive={isHovered} />;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="relative bg-dark-blue p-6 rounded-xl border border-neon-cyan/20 shadow-lg shadow-neon-cyan/5 overflow-hidden h-[300px] flex flex-col justify-between"
      variants={{ 
        hidden: { opacity: 0, y: 50 }, 
        visible: { opacity: 1, y: 0 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="w-full h-full"
          animate={{ opacity: isHovered ? 0.6 : 0.05, scale: isHovered ? 1 : 1 }} 
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {renderDemo()}
        </motion.div>
      </div>
      
      <motion.div 
        className="relative z-10 flex flex-col h-full"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <div className="flex items-center mb-4">
          <Icon className="w-8 h-8 text-neon-cyan mr-4" />
          <h3 className="text-xl font-bold text-light-slate font-orbitron">{title}</h3>
        </div>
        <p className="text-slate-400 flex-grow">{description}</p>
      </motion.div>

    </motion.div>
  );
};

export default InteractiveServiceCard;
