import React from 'react';
import { motion } from 'motion/react';
import { GlassCard, HolographicButton } from '../components/UI';
import { 
  User, 
  Mail, 
  Github, 
  Linkedin, 
  Globe, 
  Award, 
  Zap, 
  CheckCircle2,
  ExternalLink,
  Edit3,
  Share2
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function ProfileScreen({ user, roadmap }: { user: any, roadmap: any }) {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <GlassCard className="p-0 overflow-hidden" glow>
        <div className="h-32 bg-gradient-to-r from-aspiro-blue/20 via-aspiro-purple/20 to-aspiro-blue/20" />
        <div className="px-8 pb-8 -mt-12 flex flex-col md:flex-row items-end gap-6">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-aspiro-blue to-aspiro-purple p-1 shadow-2xl">
            <div className="w-full h-full rounded-[22px] bg-aspiro-dark flex items-center justify-center overflow-hidden">
              <User className="w-16 h-16 text-white/20" />
            </div>
          </div>
          <div className="flex-1 mb-2">
            <h2 className="text-4xl font-bold tracking-tight">{user?.name || 'Aspiro User'}</h2>
            <p className="text-aspiro-blue font-medium">{user?.goal || 'Aspiring Professional'}</p>
          </div>
          <div className="flex gap-3 mb-2">
            <HolographicButton variant="secondary" size="sm">
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </HolographicButton>
            <HolographicButton size="sm">
              <Share2 className="w-4 h-4" />
              Share Profile
            </HolographicButton>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info & Links */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard>
            <h3 className="font-bold mb-4">About</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              {user?.year} {user?.branch} student at Engineering Excellence Institute. 
              Passionate about building scalable systems and AI-driven solutions.
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-white/40">
                <Mail className="w-4 h-4" />
                <span>{user?.name?.toLowerCase().replace(' ', '.')}@email.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <Github className="w-4 h-4" />
                <span>github.com/aspiro-dev</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <Linkedin className="w-4 h-4" />
                <span>linkedin.com/in/aspiro</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-bold mb-4">Placement Readiness</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Overall Score</span>
              <span className="text-xl font-bold text-aspiro-blue">{roadmap?.placementReadiness || 65}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-aspiro-blue" style={{ width: `${roadmap?.placementReadiness || 65}%` }} />
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Technical Skills</span>
                <span className="text-green-400 font-bold">EXCELLENT</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Communication</span>
                <span className="text-yellow-400 font-bold">IMPROVING</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Projects</span>
                <span className="text-aspiro-purple font-bold">TOP 5%</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Experience & Projects */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard>
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-aspiro-blue" />
              Skill Badges
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'React Pro', icon: '⚛️', color: 'bg-blue-500/10 text-blue-400' },
                { name: 'Node Master', icon: '🟢', color: 'bg-green-500/10 text-green-400' },
                { name: 'AI Expert', icon: '🤖', color: 'bg-purple-500/10 text-purple-400' },
                { name: 'Cloud Arch', icon: '☁️', color: 'bg-cyan-500/10 text-cyan-400' },
              ].map((badge, i) => (
                <div key={i} className={cn("p-4 rounded-2xl border border-white/5 flex flex-col items-center gap-2 text-center", badge.color)}>
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{badge.name}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Featured Projects
              </h3>
              <HolographicButton variant="secondary" size="sm">Add Project</HolographicButton>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Aspiro AI', desc: 'Futuristic career development platform with AI integration.', tags: ['React', 'Gemini', 'Tailwind'] },
                { name: 'EcoTrack', desc: 'IoT-based environmental monitoring system.', tags: ['Python', 'Arduino', 'Firebase'] },
              ].map((project, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-aspiro-blue/30 transition-all group">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-bold group-hover:text-aspiro-blue transition-colors">{project.name}</h4>
                    <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-sm text-white/60 mb-4">{project.desc}</p>
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-1 bg-white/5 rounded border border-white/5 text-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              Networking Feed
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-aspiro-blue/20 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm"><span className="font-bold">Sarah Chen</span> shared a new project: <span className="text-aspiro-blue">Quantum Ledger</span></p>
                  <p className="text-xs text-white/20">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-aspiro-purple/20 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm"><span className="font-bold">Alex Rivera</span> endorsed you for <span className="text-aspiro-purple">System Design</span></p>
                  <p className="text-xs text-white/20">5 hours ago</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
