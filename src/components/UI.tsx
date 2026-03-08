import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  hoverable = true,
  glow = false,
  onClick
}) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -5, scale: 1.01 } : {}}
      onClick={onClick}
      className={cn(
        "glass-panel p-6 relative overflow-hidden group",
        glow && "hologram-glow",
        className
      )}
    >
      {/* Animated Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

interface HolographicButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const HolographicButton: React.FC<HolographicButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  ...props
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-aspiro-blue to-aspiro-cyan text-white shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:shadow-[0_0_30px_rgba(0,210,255,0.6)]",
    secondary: "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20",
    outline: "bg-transparent border border-aspiro-blue text-aspiro-blue hover:bg-aspiro-blue/10"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-bold"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={loading}
      className={cn(
        "rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : children}
    </motion.button>
  );
};
