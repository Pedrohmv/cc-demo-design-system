import React from 'react';
import { cn } from '@/utils/cn';

export interface CassinoButtonProps {
  label?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const CassinoButton = React.forwardRef<
  HTMLButtonElement,
  CassinoButtonProps
>(({ 
  label = "Abrir aplicativo do banco", 
  className, 
  disabled = false,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "w-full px-6 py-3 rounded-full text-sm font-bold text-white",
        "bg-green-600 hover:bg-green-700 active:bg-green-800",
        "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
        "transition-colors duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
});

CassinoButton.displayName = 'CassinoButton';

export default CassinoButton;