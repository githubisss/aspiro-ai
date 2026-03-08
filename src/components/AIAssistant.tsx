import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface AIAssistantProps {
  message?: string;
  isThinking?: boolean;
  className?: string;
  mood?: 'happy' | 'thinking' | 'talking' | 'idle';
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ 
  message, 
  isThinking = false, 
  className,
  mood = 'idle'
}) => {
  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* Robot Body */}
      <motion.div 
        className="relative w-32 h-32"
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-aspiro-blue/20 blur-3xl rounded-full animate-pulse-glow" />
        
        {/* Main Head */}
        <div className="absolute inset-0 bg-gradient-to-br from-aspiro-blue/40 to-aspiro-cyan/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center overflow-hidden">
          {/* Eyes Container */}
          <div className="flex gap-4">
            <Eye isThinking={isThinking} mood={mood} />
            <Eye isThinking={isThinking} mood={mood} />
          </div>
          
          {/* Inner Circuits (Subtle) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <path d="M10 50 Q 50 10 90 50" stroke="white" fill="none" strokeWidth="0.5" />
              <path d="M10 50 Q 50 90 90 50" stroke="white" fill="none" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" stroke="white" fill="none" strokeWidth="0.5" />
            </svg>
          </div>
        </div>

        {/* Floating Ears/Antennas */}
        <motion.div 
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-12 bg-aspiro-blue/30 backdrop-blur-sm rounded-full border border-white/10"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-12 bg-aspiro-blue/30 backdrop-blur-sm rounded-full border border-white/10"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Speech Bubble */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="mt-6 glass-panel p-4 max-w-xs text-center relative"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/5 border-l border-t border-white/10 rotate-45" />
            <p className="text-sm font-medium text-aspiro-blue">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Eye: React.FC<{ isThinking: boolean; mood: string }> = ({ isThinking, mood }) => {
  return (
    <motion.div 
      className="w-4 h-6 bg-aspiro-blue rounded-full shadow-[0_0_10px_rgba(0,210,255,0.8)]"
      animate={isThinking ? {
        scaleY: [1, 0.1, 1],
        opacity: [1, 0.5, 1]
      } : {
        scaleY: [1, 1, 0.1, 1],
      }}
      transition={{ 
        duration: isThinking ? 0.5 : 3, 
        repeat: Infinity,
        times: isThinking ? [0, 0.5, 1] : [0, 0.9, 0.95, 1]
      }}
    />
  );
};
