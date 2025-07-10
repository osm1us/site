import { useState, useEffect, useRef } from 'react';

const useCustomCursor = (cursorRef) => {
  const [isHovering, setIsHovering] = useState(false);
  const animationFrameId = useRef();

  useEffect(() => {
    const updatePosition = (e) => {
      if (cursorRef.current) {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        animationFrameId.current = requestAnimationFrame(() => {
          // We subtract half the cursor's size (16px / 2 = 8px) to center it.
          cursorRef.current.style.transform = `translate3d(${e.clientX - 8}px, ${e.clientY - 8}px, 0)`;
        });
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Hide cursor initially
    if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate3d(-100px, -100px, 0)';
    }

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [cursorRef]);

  return { isHovering };
};

export default useCustomCursor;
