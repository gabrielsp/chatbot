import React, { useEffect } from 'react';
import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingIcons from '../animations/FloatingIcons';
import BackToTop from '../animations/BackToTop';
import { useAOS } from '../../contexts/AOSContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { refresh } = useAOS();
  
  useEffect(() => {
    refresh();
    
    const handleScroll = () => {
      refresh();
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [refresh]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <FloatingIcons />
      <div className="flex flex-col flex-grow relative z-10">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
};

export default Layout;