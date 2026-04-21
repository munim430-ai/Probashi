import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Badge = ({ label, className, variant = 'default' }) => {
  const variants = {
    default: 'bg-neutral-100 text-neutral-600',
    success: 'bg-brand-green-50 text-brand-green-600',
    warning: 'bg-brand-gold-50 text-brand-gold-600',
    danger:  'bg-brand-red-50 text-brand-red-600',
    brand:   'bg-brand-green-600 text-white',
  };

  return (
    <span 
      className={twMerge(
        'text-[10px] font-bold px-2 py-[2px] rounded-full whitespace-nowrap',
        variants[variant],
        className
      )}
    >
      {label}
    </span>
  );
};
