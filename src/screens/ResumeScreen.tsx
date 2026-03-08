import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard, HolographicButton } from '../components/UI';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  Layout,
  Type,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function ResumeScreen({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState('editor');
  const [atsScore, setAtsScore] = useState(78);

  const templates = [
    { id: 1, name: 'Modern Tech', color: 'bg-aspiro-blue' },
    { id: 2, name: 'Executive', color: 'bg-aspiro-purple' },
    { id: 3, name: 'Creative', color: 'bg-pink-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Resume <span className="text-gradient">Builder</span></h2>
          <p className="text-white/60">Generate company-specific resumes with ATS optimization.</p>
        </div>
        <div className="flex items-center gap-4">
          <HolographicButton variant="secondary" size="sm">
            <Eye className="w-4 h-4" />
            Preview
          </HolographicButton>
          <HolographicButton size="sm">
            <Download className="w-4 h-4" />
            Export PDF
          </HolographicButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Editor Controls */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Layout className="w-4 h-4 text-aspiro-blue" />
              Templates
            </h3>
            <div className="space-y-3">
              {templates.map((t) => (
                <button 
                  key={t.id}
                  className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all group"
                >
                  <div className={cn("w-8 h-10 rounded-sm shadow-lg", t.color)} />
                  <span className="text-sm font-medium">{t.name}</span>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard glow>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-aspiro-blue" />
              ATS Score
            </h3>
            <div className="flex flex-col items-center py-4">
              <div className="text-4xl font-bold text-aspiro-blue mb-2">{atsScore}</div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-aspiro-blue shadow-[0_0_10px_rgba(0,210,255,0.5)]" style={{ width: `${atsScore}%` }} />
              </div>
              <p className="text-[10px] text-white/40 text-center uppercase tracking-widest font-bold">Good Progress</p>
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex items-start gap-2 text-xs text-green-400">
                <CheckCircle2 className="w-3 h-3 mt-0.5" />
                <span>Keywords match Google's SWE role.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-yellow-400">
                <AlertCircle className="w-3 h-3 mt-0.5" />
                <span>Add more quantifiable metrics.</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Main Editor */}
        <div className="lg:col-span-3">
          <GlassCard className="min-h-[800px] p-12 bg-white flex flex-col text-slate-800 shadow-2xl">
            {/* Resume Content Simulation */}
            <div className="border-b-2 border-slate-200 pb-8 mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">{user?.name || 'Your Name'}</h1>
              <div className="flex gap-4 mt-2 text-slate-500 text-sm">
                <span>{user?.branch || 'Engineering Student'}</span>
                <span>•</span>
                <span>{user?.year || 'Final Year'}</span>
                <span>•</span>
                <span>{user?.goal || 'Software Engineer'}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-12 flex-1">
              <div className="col-span-2 space-y-10">
                <section>
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-aspiro-blue" />
                    EXPERIENCE
                  </h3>
                  <div className="space-y-6">
                    <div className="relative pl-4 border-l-2 border-slate-100">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-aspiro-blue" />
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-800">Software Engineering Intern</h4>
                        <span className="text-xs text-slate-400 font-bold">SUMMER 2025</span>
                      </div>
                      <p className="text-sm text-aspiro-blue font-bold mb-2">TechCorp Solutions</p>
                      <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
                        <li>Developed a real-time dashboard using React and WebSockets.</li>
                        <li>Optimized database queries, reducing latency by 40%.</li>
                        <li>Collaborated with cross-functional teams in an Agile environment.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-aspiro-blue" />
                    PROJECTS
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-slate-800">Aspiro - AI Career Platform</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Built a comprehensive career development app using React, Gemini AI, and Framer Motion. 
                        Features include voice-based interview simulation and personalized roadmaps.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <div className="col-span-1 space-y-10">
                <section>
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 mb-4 flex items-center gap-2">
                    <Type className="w-4 h-4 text-aspiro-blue" />
                    SKILLS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'SQL', 'Git'].map((s) => (
                      <span key={s} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-aspiro-blue" />
                    EDUCATION
                  </h3>
                  <div>
                    <h4 className="font-bold text-slate-800">{user?.degree || 'B.Tech'}</h4>
                    <p className="text-sm text-slate-600">{user?.branch || 'Computer Science'}</p>
                    <p className="text-xs text-slate-400 mt-1">GPA: 3.9/4.0</p>
                  </div>
                </section>
              </div>
            </div>

            {/* AI Floating Suggestion */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-24 -right-8 w-64 glass-panel p-4 shadow-2xl border-aspiro-blue/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-aspiro-blue" />
                <span className="text-xs font-bold text-aspiro-blue">AI Suggestion</span>
              </div>
              <p className="text-xs text-white/80 italic">
                "Quantify your impact at TechCorp. Instead of 'Optimized queries', try 'Reduced query latency by 40% using indexing'."
              </p>
              <button className="mt-3 text-[10px] text-aspiro-blue hover:underline font-bold">Apply Fix</button>
            </motion.div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
