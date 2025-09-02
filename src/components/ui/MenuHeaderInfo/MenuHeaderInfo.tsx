import React from 'react';
import { cn } from '@/utils/cn';

export interface MenuHeaderInfoProps {
  title?: string;
  subtitle?: string;
  description?: string;
  variant?: 'default' | 'compact' | 'detailed';
  alignment?: 'left' | 'center' | 'right';
  showDivider?: boolean;
  className?: string;
}

export const MenuHeaderInfo = React.forwardRef<
  HTMLDivElement,
  MenuHeaderInfoProps
>(({ 
  title = "Menu Information",
  subtitle,
  description,
  variant = 'default',
  alignment = 'left',
  showDivider = false,
  className,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-2 p-4",
        {
          'text-left': alignment === 'left',
          'text-center': alignment === 'center',
          'text-right': alignment === 'right',
        },
        {
          'py-2': variant === 'compact',
          'py-4': variant === 'default',
          'py-6': variant === 'detailed',
        },
        {
          'border-b border-gray-200': showDivider,
        },
        className
      )}
      role="banner"
      {...props}
    >
      <h2 
        className={cn(
          "font-semibold text-gray-900",
          {
            'text-lg': variant === 'compact',
            'text-xl': variant === 'default',
            'text-2xl': variant === 'detailed',
          }
        )}
      >
        {title}
      </h2>
      
      {subtitle && (
        <h3 
          className={cn(
            "font-medium text-gray-700",
            {
              'text-sm': variant === 'compact',
              'text-base': variant === 'default',
              'text-lg': variant === 'detailed',
            }
          )}
        >
          {subtitle}
        </h3>
      )}
      
      {description && (
        <p 
          className={cn(
            "text-gray-600",
            {
              'text-xs': variant === 'compact',
              'text-sm': variant === 'default',
              'text-base': variant === 'detailed',
            }
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
});

MenuHeaderInfo.displayName = 'MenuHeaderInfo';

export default MenuHeaderInfo;