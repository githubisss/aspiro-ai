import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard, HolographicButton } from '../components/UI';
import { geminiService } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { 
  BookOpen, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  MessageSquare,
  Zap,
  GraduationCap,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function CourseHubScreen({ roadmap }: { roadmap: any }) {
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [tutorMessage, setTutorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'simple' | 'interview'>('simple');

  const subjects = roadmap?.subjects || [
    { name: 'Data Structures', description: 'Core fundamentals of data organization.', skills: ['Arrays', 'Linked Lists', 'Trees'], projects: ['Library System'] },
    { name: 'Operating Systems', description: 'Understanding kernel and resource management.', skills: ['Process Sync', 'Memory Mgmt'], projects: ['Shell Emulator'] },
    { name: 'Database Management', description: 'SQL and NoSQL database design.', skills: ['Normalization', 'Indexing'], projects: ['E-commerce DB'] },
  ];

  const handleAskTutor = async (concept: string) => {
    setLoading(true);
    setTutorMessage(null);
    try {
      const response = await geminiService.getTutorResponse(selectedSubject.name, concept, mode);
      setTutorMessage(response || "I'm sorry, I couldn't generate an explanation right now.");
    } catch (error) {
      console.error("Tutor error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (selectedSubject) {
    return (
      <div className="space-y-8">
        <button 
          onClick={() => {
            setSelectedSubject(null);
            setTutorMessage(null);
          }}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Roadmap
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subject Info */}
          <div className="lg:col-span-1 space-y-6">
            <GlassCard glow>
              <h2 className="text-2xl font-bold mb-2">{selectedSubject.name}</h2>
              <p className="text-white/60 text-sm mb-6">{selectedSubject.description}</p>
              
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-aspiro-blue">Core Concepts</h4>
                <div className="space-y-2">
                  {selectedSubject.skills.map((skill: string, i: number) => (
                    <button 
                      key={i}
                      onClick={() => handleAskTutor(skill)}
                      className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-aspiro-blue/10 rounded-xl border border-white/5 hover:border-aspiro-blue/30 transition-all group"
                    >
                      <span className="text-sm">{skill}</span>
                      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-aspiro-blue" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-aspiro-purple">Recommended Project</h4>
                <div className="p-4 bg-aspiro-purple/10 rounded-xl border border-aspiro-purple/20">
                  <p className="text-sm font-bold">{selectedSubject.projects[0]}</p>
                  <p className="text-xs text-white/40 mt-1">Build this to master the concepts.</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* AI Tutor Area */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="min-h-[500px] flex flex-col">
              <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-aspiro-blue/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-aspiro-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold">AI Learning Assistant</h3>
                    <p className="text-xs text-white/40">Powered by Aspiro Intelligence</p>
                  </div>
                </div>
                <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                  <button 
                    onClick={() => setMode('simple')}
                    className={cn(
                      "px-3 py-1.5 text-xs rounded-md transition-all",
                      mode === 'simple' ? "bg-aspiro-blue text-white shadow-lg" : "text-white/40 hover:text-white"
                    )}
                  >
                    Explain Simply
                  </button>
                  <button 
                    onClick={() => setMode('interview')}
                    className={cn(
                      "px-3 py-1.5 text-xs rounded-md transition-all",
                      mode === 'interview' ? "bg-aspiro-purple text-white shadow-lg" : "text-white/40 hover:text-white"
                    )}
                  >
                    Interview Level
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-50">
                    <div className="w-12 h-12 border-4 border-aspiro-blue/20 border-t-aspiro-blue rounded-full animate-spin" />
                    <p className="text-sm animate-pulse">Synthesizing knowledge...</p>
                  </div>
                ) : tutorMessage ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="prose prose-invert prose-sm max-w-none"
                  >
                    <ReactMarkdown>{tutorMessage}</ReactMarkdown>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-40">
                    <MessageSquare className="w-12 h-12" />
                    <p className="text-sm max-w-xs">Select a concept from the left to start learning with your AI tutor.</p>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Your Learning <span className="text-gradient">Roadmap</span></h2>
          <p className="text-white/60">Step-by-step guide to master your engineering subjects.</p>
        </div>
        <div className="flex items-center gap-2 bg-aspiro-blue/10 px-4 py-2 rounded-full border border-aspiro-blue/20">
          <GraduationCap className="w-4 h-4 text-aspiro-blue" />
          <span className="text-sm font-bold text-aspiro-blue">Level 4 Explorer</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject: any, i: number) => (
          <GlassCard key={i} className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-aspiro-blue" />
              </div>
              <div className="flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded text-[10px] font-bold text-green-400 border border-green-500/20">
                <CheckCircle2 className="w-3 h-3" />
                {Math.floor(Math.random() * 100)}% DONE
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
            <p className="text-white/60 text-sm mb-6 flex-1 line-clamp-2">{subject.description}</p>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {subject.skills.slice(0, 3).map((skill: string, j: number) => (
                  <span key={j} className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/5 text-white/40">
                    {skill}
                  </span>
                ))}
              </div>
              <HolographicButton 
                variant="secondary" 
                className="w-full"
                onClick={() => setSelectedSubject(subject)}
              >
                <Play className="w-4 h-4 fill-current" />
                Resume Learning
              </HolographicButton>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
