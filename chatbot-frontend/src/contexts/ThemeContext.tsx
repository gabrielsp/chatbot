import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ThemeContextType = {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    if (storedTheme) {
      setTheme(storedTheme);
      setResolvedTheme(storedTheme === 'system' ? systemPreference : storedTheme);
    } else {
      setTheme('system');
      setResolvedTheme(systemPreference);
    }
  }, []);

  useEffect(() => {
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      }
    };

    const systemMedia = window.matchMedia('(prefers-color-scheme: dark)');
    systemMedia.addEventListener('change', handleSystemChange);
    
    return () => systemMedia.removeEventListener('change', handleSystemChange);
  }, [theme]);

  useEffect(() => {
    // Atualizar o tema aplicado
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
      setResolvedTheme(systemTheme);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      setResolvedTheme(theme);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = 
      theme === 'light' ? 'dark' : 
      theme === 'dark' ? 'system' : 
      'light';
    
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};