import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface LiquidButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
}

export function LiquidButton({
  onClick,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
}: LiquidButtonProps) {
  const baseStyles =
    size === 'sm'
      ? 'px-4 py-2 text-sm'
      : 'px-6 py-3 text-sm';

  const gradients = {
    primary: {
      background: 'linear-gradient(135deg, #F9A8D4, #C4B5FD, #93C5FD)',
      hoverBackground: 'linear-gradient(135deg, #F472B6, #A78BFA, #60A5FA)',
    },
    secondary: {
      background: 'linear-gradient(135deg, #E9D5FF, #FBCFE8)',
      hoverBackground: 'linear-gradient(135deg, #DDD6FE, #F9A8D4)',
    },
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.03,
        background: gradients[variant].hoverBackground,
      }}
      whileTap={{ scale: 0.85 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 15,
        mass: 0.5,
      }}
      className={`rounded-full font-semibold text-white cursor-pointer
        flex items-center justify-center gap-2 ${baseStyles} ${className}`}
      style={{
        background: gradients[variant].background,
        boxShadow: '0 4px 15px rgba(244, 114, 182, 0.3)',
        border: 'none',
        outline: 'none',
      }}
    >
      {children}
    </motion.button>
  );
}
