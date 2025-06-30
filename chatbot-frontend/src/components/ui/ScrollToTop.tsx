import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Rolagem suave para o topo
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Forçar rolagem imediata se necessário
    setTimeout(() => {
      if (window.scrollY > 0) {
        window.scrollTo(0, 0);
      }
    }, 100);
  }, [pathname]);

  return null;
};

export default ScrollToTop;