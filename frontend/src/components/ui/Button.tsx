import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
  fullWidth?: boolean;
}

export default function Button({
  variant = 'solid',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base =
    'py-4 px-8 text-sm tracking-widest uppercase transition-colors cursor-pointer';
  const variants = {
    solid: 'bg-black text-white hover:bg-neutral-800',
    outline: 'border border-black text-black hover:bg-black hover:text-white',
  };

  return (
    <button
      className={[base, variants[variant], fullWidth ? 'w-full' : '', className].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
