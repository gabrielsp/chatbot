import React, { useEffect } from 'react';
import type { ReactNode } from 'react';

interface FloatingIconsProps {
  children?: ReactNode;
}

const FloatingIcons: React.FC<FloatingIconsProps> = ({ children }) => {
  useEffect(() => {
    const floatingIcons = document.getElementById('floatingIcons');
    if (!floatingIcons) return;

    const icons = [
      {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>',
        position: { top: '15%', left: '5%' },
        class: 'float-1'
      },
      {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586A1.994 1.994 0 017 16V8a1.994 1.994 0 011.414-1.414A1.994 1.994 0 019 6h6a1.994 1.994 0 011.414.586A1.994 1.994 0 0117 8z" /></svg>',
        position: { top: '30%', right: '7%' },
        class: 'float-2'
      },
      {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>',
        position: { top: '60%', left: '8%' },
        class: 'float-3'
      },
      {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>',
        position: { top: '75%', right: '10%' },
        class: 'float-4'
      },
      {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>',
        position: { top: '45%', left: '15%' },
        class: 'float-5'
      }
    ];
    
    icons.forEach(icon => {
      const iconElement = document.createElement('div');
      iconElement.className = `floating-icon ${icon.class}`;
      iconElement.innerHTML = icon.svg;
      
      Object.keys(icon.position).forEach(pos => {
        (iconElement.style as any)[pos] = icon.position[pos as keyof typeof icon.position];
      });
      
      floatingIcons.appendChild(iconElement);
    });
  }, []);

  return (
    <>
      <div id="floatingIcons" className="fixed inset-0 pointer-events-none z-10"></div>
      {children}
    </>
  );
};

export default FloatingIcons;