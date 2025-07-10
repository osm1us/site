import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const RoboticArmDemo = ({ isActive }) => {
  const armControls = useAnimation();
  const gripperControls = useAnimation();
  const isAnimating = useRef(false);

  const CUBE_SIZE = 20;
  const ARM_BASE_X = 150;
  const ARM_BASE_Y = 120;
  const ARM_LENGTH = 80;
  const GRIPPER_Y_OFFSET = -ARM_LENGTH;

  const runSimulation = async () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const sequence = [
      // 1. Поворот к складу
      { controls: armControls, props: { rotate: -90, y: 0 }, transition: { duration: 1, ease: 'easeInOut' } },
      // 2. Опускание за кубом
      { controls: armControls, props: { y: 10 }, transition: { duration: 0.5, ease: 'easeOut' } },
      // 3. Захват
      { controls: gripperControls, props: { pathLength: 1 }, transition: { duration: 0.3, ease: 'easeIn' } },
      // 4. Подъем с кубом
      { controls: armControls, props: { y: 0 }, transition: { duration: 0.5, ease: 'easeIn' } },
      // 5. Поворот к конвейеру
      { controls: armControls, props: { rotate: 90 }, transition: { duration: 2, ease: 'easeInOut' } },
      // 6. Опускание на конвейер
      { controls: armControls, props: { y: 10 }, transition: { duration: 0.5, ease: 'easeOut' } },
      // 7. Разжатие
      { controls: gripperControls, props: { pathLength: 0.5 }, transition: { duration: 0.3, ease: 'easeOut' } },
      // 8. Подъем пустой руки
      { controls: armControls, props: { y: 0 }, transition: { duration: 0.5, ease: 'easeIn' } },
      // 9. Возврат в исходное положение
      { controls: armControls, props: { rotate: 0 }, transition: { duration: 1, ease: 'easeInOut' } },
    ];

    for (const step of sequence) {
      await step.controls.start(step.props, step.transition);
    }

    isAnimating.current = false;
  };

  const resetSimulation = () => {
    isAnimating.current = false;
    armControls.stop();
    gripperControls.stop();
    armControls.set({ rotate: 0, y: 0 });
    gripperControls.set({ pathLength: 0.5 });
  };

  useEffect(() => {
    if (isActive) {
      runSimulation();
    } else {
      resetSimulation();
    }
  }, [isActive]);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg viewBox="0 0 300 150" className="w-full h-full" overflow="visible">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <text x="25" y="145" fill="#4a5568" fontSize="10" fontFamily="monospace">Склад</text>
        <text x="210" y="145" fill="#4a5568" fontSize="10" fontFamily="monospace">Конвейер</text>
        
        <rect x="10" y="120" width="80" height="10" fill="#2d3748" />
        <rect x="190" y="120" width="80" height="10" fill="#2d3748" />

        {/* Робо-рука */}
        <g transform={`translate(${ARM_BASE_X}, ${ARM_BASE_Y})`}>
          <motion.g animate={armControls} style={{ transformOrigin: '0px 0px' }}>
            <path d={`M 0 0 L 0 ${GRIPPER_Y_OFFSET}`} stroke="#718096" strokeWidth="10" />
            <g transform={`translate(0, ${GRIPPER_Y_OFFSET})`}>
              <motion.path d="M -15 0 C -15 -10, 0 -15, 0 -25" stroke="#cbd5e0" strokeWidth="4" fill="none" initial={{ pathLength: 0.5 }} animate={gripperControls} />
              <motion.path d="M 15 0 C 15 -10, 0 -15, 0 -25" stroke="#cbd5e0" strokeWidth="4" fill="none" initial={{ pathLength: 0.5 }} animate={gripperControls} />
              
              {/* Куб всегда является частью захвата */}
              <motion.rect
                  x={-CUBE_SIZE / 2}
                  y={-CUBE_SIZE / 2 - 10}
                  width={CUBE_SIZE}
                  height={CUBE_SIZE}
                  fill="#81e6d9"
                  filter="url(#glow)"
                />
            </g>
          </motion.g>
        </g>
        <circle cx={ARM_BASE_X} cy={ARM_BASE_Y} r="15" fill="#4a5568" />
      </svg>
    </div>
  );
};

export default RoboticArmDemo;
