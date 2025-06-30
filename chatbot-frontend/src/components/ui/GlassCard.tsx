import React from 'react';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`glass-card rounded-xl p-6 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;