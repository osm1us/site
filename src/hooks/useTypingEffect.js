import { useState, useEffect } from 'react';

export const useTypingEffect = (text, speed = 50, onComplete) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!text) return;

    setDisplayText(''); // Reset on new text
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return displayText;
};
