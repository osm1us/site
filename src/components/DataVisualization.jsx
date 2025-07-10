import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const generateData = (numPoints, centers, chaosFactor = 80) => {
  const data = [];
  for (let i = 0; i < numPoints; i++) {
    const center = centers[i % centers.length];
    data.push({
      id: i,
      x: center.x + (Math.random() - 0.5) * chaosFactor,
      y: center.y + (Math.random() - 0.5) * chaosFactor,
      cluster: null,
    });
  }
  return data;
};

const centers = [
  { x: 70, y: 60, color: '#38bdf8' }, // neon-cyan
  { x: 230, y: 90, color: '#ec4899' }, // neon-pink
  { x: 150, y: 150, color: '#34d399' }, // neon-green
];

const DataVisualization = ({ isActive }) => {
  const initialData = useMemo(() => generateData(60, centers), []);
  const [data, setData] = useState(initialData);
  const controls = useAnimation();
  const isAnimating = useRef(false);

  const runVisualization = async () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const clusteredData = data.map(point => {
      let minDistance = Infinity;
      let clusterIndex = 0;
      centers.forEach((center, i) => {
        const distance = Math.sqrt(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2));
        if (distance < minDistance) {
          minDistance = distance;
          clusterIndex = i;
        }
      });
      return { ...point, cluster: clusterIndex };
    });

    setData(clusteredData);
    await controls.start(i => ({
      cx: centers[clusteredData[i].cluster].x + (Math.random() - 0.5) * 30,
      cy: centers[clusteredData[i].cluster].y + (Math.random() - 0.5) * 30,
      fill: centers[clusteredData[i].cluster].color,
      transition: { duration: 1.5, ease: 'easeInOut', delay: i * 0.02 },
    }));

    isAnimating.current = false;
  };

  const resetVisualization = () => {
    controls.stop();
    setData(initialData);
    controls.set(i => ({
        cx: initialData[i].x,
        cy: initialData[i].y,
        fill: '#4a5568',
    }));
    isAnimating.current = false;
  };

  useEffect(() => {
    if (isActive) {
      runVisualization();
    } else {
      resetVisualization();
    }
  }, [isActive]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 300 200" className="w-full h-full">
        {data.map((point, i) => (
          <motion.circle
            key={point.id}
            custom={i}
            initial={{ cx: point.x, cy: point.y, fill: '#4a5568' }}
            animate={controls}
            r="3"
          />
        ))}
      </svg>
    </div>
  );
};

export default DataVisualization;
