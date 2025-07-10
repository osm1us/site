import { useEffect, useRef } from 'react';

export const useAnimateOnScroll = (options, onVisible) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (element) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            if (onVisible) {
              onVisible(element);
            }
            observer.unobserve(element);
          }
        });
      }, options);

      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      observer.observe(element);

      return () => observer.disconnect();
    }
  }, [options]);

  return ref;
};
