import React, { useEffect, useState, useRef } from 'react';

interface StatCounterProps {
  target: number;
  suffix?: string;
  delay?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({ target, suffix, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // ms
    const startTime = Date.now();
    const startValue = 0;
    const endValue = target;
    
    const animateCounter = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const currentValue = Math.floor(progress * (endValue - startValue) + startValue);
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      }
    };

    // Iniciar animação após o delay
    const timer = setTimeout(() => {
      requestAnimationFrame(animateCounter);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, target, delay]);

  return (
    <div ref={counterRef} className="flex items-center justify-center">
      <span className="stat-counter text-4xl font-bold text-gray-800">
        {count}
      </span>
      {suffix && <span className="text-xl ml-1">{suffix}</span>}
    </div>
  );
};

export default StatCounter;