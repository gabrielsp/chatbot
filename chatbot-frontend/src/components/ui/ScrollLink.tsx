import React from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

interface ScrollLinkProps extends LinkProps {
  offset?: number;
}

const ScrollLink: React.FC<ScrollLinkProps> = ({ to, offset = 0, children, ...props }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    
    if (typeof to === 'string') {
      const targetId = to.replace(/^#/, '');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = document.getElementById('fixedHeader')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Atualizar a URL
        window.history.pushState(null, '', to);
      }
    }
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default ScrollLink;