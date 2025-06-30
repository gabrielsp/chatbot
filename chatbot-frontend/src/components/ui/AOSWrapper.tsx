import React, { useEffect } from 'react';
import type { ReactNode } from 'react';
import AOS from 'aos';

interface AOSWrapperProps {
  children: ReactNode;
  animation?: string;
  delay?: number;
  duration?: number;
  offset?: number;
  className?: string;
}

const AOSWrapper: React.FC<AOSWrapperProps> = ({ 
  children, 
  animation = 'fade-up', 
  delay = 0,
  duration = 800,
  offset = 100,
  className = ''
}) => {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 100,
      duration: 800,
      easing: 'ease-in-out',
      disable: window.innerWidth < 640
    });
    
    // Atualizar AOS quando componentes são renderizados
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      data-aos={animation}
      data-aos-delay={delay}
      data-aos-duration={duration}
      data-aos-offset={offset}
      className={className}
    >
      {children}
    </div>
  );
};

export default AOSWrapper;