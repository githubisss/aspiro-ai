import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AIAssistant } from '../components/AIAssistant';
import { GlassCard, HolographicButton } from '../components/UI';
import { geminiService } from '../services/geminiService';
import { GraduationCap, BookOpen, Calendar, Target, Sparkles } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: (user: any, roadmap: any) => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    degree: '',
    branch: '',
    year: '',
    goal: ''
  });

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        const roadmap = await geminiService.generateRoadmap(formData);
        onComplete(formData, roadmap);
      } catch (error) {
        console.error("Onboarding error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const steps = [
    {
      title: "Who are you?",
      description: "Let's start with the basics so I can personalize your experience.",
      fields: [
        { name: 'name', label: 'Full Name', placeholder: 'Enter your name', icon: Sparkles },
        { name: 'degree', label: 'Degree', placeholder: 'e.g. B.Tech, M.Tech', icon: GraduationCap }
      ]
    },
    {
      title: "Academic Details",
      description: "Tell me about your current studies.",
      fields: [
        { name: 'branch', label: 'Branch / Specialization', placeholder: 'e.g. Computer Science', icon: BookOpen },
        { name: 'year', label: 'Current Year', placeholder: 'e.g. 3rd Year', icon: Calendar }
      ]
    },
    {
      title: "Career Goal",
      description: "What's your ultimate professional target?",
      fields: [
        { name: 'goal', label: 'Dream Role', placeholder: 'e.g. Full Stack Developer at Google', icon: Target }
      ]
    }
  ];

  const currentStepData = steps[step - 1];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-8">
          <AIAssistant 
            message={loading ? "Analyzing your profile... Generating your custom roadmap." : "Tell me a bit about yourself!"} 
            isThinking={loading}
          />
        </div>

        <GlassCard className="p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight">{currentStepData.title}</h2>
              <p className="text-white/60">{currentStepData.description}</p>
            </div>
            <div className="text-right">
              <span className="text-aspiro-blue font-bold text-xl">{step}</span>
              <span className="text-white/20 text-xl"> / 3</span>
            </div>
          </div>

          <div className="space-y-6">
            {currentStepData.fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                  <field.icon className="w-4 h-4" />
                  {field.label}
                </label>
                <input
                  type="text"
                  value={(formData as any)[field.name]}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-aspiro-blue/50 transition-colors"
                />
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-between items-center">
            <button 
              onClick={() => step > 1 && setStep(step - 1)}
              className={step === 1 ? "invisible" : "text-white/40 hover:text-white transition-colors"}
            >
              Back
            </button>
            <HolographicButton 
              size="lg" 
              onClick={handleNext}
              loading={loading}
              disabled={Object.values(formData).some(v => !v) && step === 3}
            >
              {step === 3 ? "Generate Roadmap" : "Continue"}
            </HolographicButton>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
            <motion.div 
              className="h-full bg-aspiro-blue shadow-[0_0_10px_rgba(0,210,255,0.8)]"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
