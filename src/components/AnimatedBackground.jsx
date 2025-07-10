import React, { useRef, useEffect } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Устанавливаем размер canvas равным размеру окна
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Массив для хранения частиц
    let particlesArray = [];
    const numberOfParticles = 100;

    // Класс для создания частиц
    class Particle {
      constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight; // Скорость движения
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        this.size -= 0.05;
        if (this.size < 0) {
          this.x = (Math.random() * canvas.width);
          this.y = (Math.random() * canvas.height);
          this.size = (Math.random() * 1.5) + 1;
          this.weight = (Math.random() * 0.5) - 0.2;
        }
        this.y += this.weight;
        this.weight += 0.01;

        // Возвращаем частицу наверх, если она ушла за пределы экрана
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.x = (Math.random() * canvas.width);
            this.weight = (Math.random() * 0.5) - 0.2;
        }
      }
    }

    function init() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = (Math.random() * 1.5) + 1;
        const color = 'rgba(100, 255, 218, 0.5)'; // neon-cyan с прозрачностью
        const weight = (Math.random() * 0.5) - 0.2; // Скорость и направление
        particlesArray.push(new Particle(x, y, size, color, weight));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, background: '#0A192F' }} />;
};

export default AnimatedBackground;
