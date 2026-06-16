import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const getButtonStyles = () => {
    const baseStyles = 'px-4 py-2 rounded-lg transition-all font-medium flex items-center gap-2';
    
    switch (variant) {
      case 'primary':
        return {
          className: `${baseStyles} ${className}`,
          style: { backgroundColor: '#023047', color: '#f6f6f6' }
        };
      case 'accent':
        return {
          className: `${baseStyles} ${className}`,
          style: { backgroundColor: '#FFC300', color: '#023047' }
        };
      case 'secondary':
        return {
          className: `${baseStyles} ${className}`,
          style: { backgroundColor: 'transparent', border: '1px solid #6f6f6f', color: '#f6f6f6' }
        };
      case 'ghost':
        return {
          className: `${baseStyles} ${className}`,
          style: { backgroundColor: 'transparent', color: '#f6f6f6' }
        };
      default:
        return {
          className: `${baseStyles} ${className}`,
          style: { backgroundColor: '#023047', color: '#f6f6f6' }
        };
    }
  };

  const buttonStyles = getButtonStyles();

  return (
    <button
      {...props}
      className={buttonStyles.className}
      style={buttonStyles.style}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = '#FFC300';
          e.currentTarget.style.color = '#023047';
        } else if (variant === 'accent') {
          e.currentTarget.style.backgroundColor = '#023047';
          e.currentTarget.style.color = '#f6f6f6';
        } else if (variant === 'secondary' || variant === 'ghost') {
          e.currentTarget.style.backgroundColor = '#6f6f6f';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = '#023047';
          e.currentTarget.style.color = '#f6f6f6';
        } else if (variant === 'accent') {
          e.currentTarget.style.backgroundColor = '#FFC300';
          e.currentTarget.style.color = '#023047';
        } else if (variant === 'secondary' || variant === 'ghost') {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      {children}
    </button>
  );
}