import React, { createContext, useContext, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface AOSContextType {
  refresh: () => void;
}

const AOSContext = createContext<AOSContextType>({
  refresh: () => {}
});

export const useAOS = () => useContext(AOSContext);

export const AOSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      AOS.init({
        once: true,
        offset: 100,
        duration: 800,
        easing: 'ease-in-out',
        disable: window.innerWidth < 640
      });
      setInitialized(true);
    }
  }, [initialized]);

  const refresh = () => {
    if (initialized) {
      AOS.refreshHard();
    }
  };

  return (
    <AOSContext.Provider value={{ refresh }}>
      {children}
    </AOSContext.Provider>
  );
};