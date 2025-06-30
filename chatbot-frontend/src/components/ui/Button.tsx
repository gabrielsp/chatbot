import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '',
  onClick,
  disabled = false
}) => {
  const baseClasses = "px-8 py-3 rounded-lg font-medium shadow-sm transition-all duration-300";
  
  const variantClasses = variant === 'primary' 
    ? "btn-primary text-gray-700 pulse-effect" 
    : "bg-white/30 text-gray-700 border border-white/40 hover:bg-white/40";
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;