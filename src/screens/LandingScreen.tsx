import React from 'react';
import { motion } from 'motion/react';
import { AIAssistant } from '../components/AIAssistant';
import { HolographicButton } from '../components/UI';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LandingScreenProps {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-aspiro-blue/10 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aspiro-purple/10 blur-[120px] rounded-full animate-pulse" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center"
      >
        <AIAssistant 
          message="Hello! I'm Aspiro, your personal AI career companion." 
          className="mb-12"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Your Journey from <br />
            <span className="text-gradient">Subject → Skill → Job</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            The futuristic AI-powered platform designed to guide engineering students 
            through every step of their professional evolution.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <HolographicButton size="lg" onClick={onStart}>
            Begin Your Evolution
            <ArrowRight className="w-5 h-5" />
          </HolographicButton>
          
          <HolographicButton variant="secondary" size="lg">
            <Sparkles className="w-5 h-5 text-aspiro-blue" />
            Explore Features
          </HolographicButton>
        </motion.div>

        {/* Stats/Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16"
        >
          {[
            { label: 'AI Mentors', value: '24/7' },
            { label: 'Skill Paths', value: '500+' },
            { label: 'Mock Interviews', value: 'Unlimited' },
            { label: 'Placement Rate', value: '98%' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Particles (Decorative) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-aspiro-blue/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random()
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
      </div>
    </div>
  );
}
