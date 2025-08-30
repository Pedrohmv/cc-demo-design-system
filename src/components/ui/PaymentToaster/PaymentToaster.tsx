import React from 'react';
import { cn } from '@/utils/cn';

export interface PaymentToasterProps {
  message?: string;
  className?: string;
  onClick?: () => void;
}

export const PaymentToaster = React.forwardRef<
  HTMLDivElement,
  PaymentToasterProps
>(({ message = "Somente serão aceitos depósitos realizados pelo mesmo titular do CPF cadastrado no Rei.", className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-start px-4 py-3 rounded-lg border border-yellow-200 bg-yellow-50",
        "w-full max-w-sm text-yellow-800 text-xs leading-relaxed",
        "focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2",
        className
      )}
      role="alert"
      aria-live="polite"
      {...props}
    >
      <div className="flex-shrink-0 mr-3">
        <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      <p className="text-xs font-normal leading-4">{message}</p>
    </div>
  );
});

PaymentToaster.displayName = 'PaymentToaster';

export default PaymentToaster;