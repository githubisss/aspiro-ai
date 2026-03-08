import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/UI';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';
import { 
  TrendingUp, 
  Award, 
  Zap, 
  Target, 
  AlertCircle,
  ChevronRight,
  Flame
} from 'lucide-react';

const radarData = [
  { subject: 'Technical', A: 85, fullMark: 100 },
  { subject: 'Problem Solving', A: 70, fullMark: 100 },
  { subject: 'Communication', A: 60, fullMark: 100 },
  { subject: 'Projects', A: 90, fullMark: 100 },
  { subject: 'System Design', A: 45, fullMark: 100 },
  { subject: 'HR/Soft Skills', A: 75, fullMark: 100 },
];

export default function DashboardScreen({ user, roadmap }: { user: any, roadmap: any }) {
  const readinessScore = roadmap?.placementReadiness || 65;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, <span className="text-gradient">{user?.name}</span>!</h2>
          <p className="text-white/60">You're making great progress towards becoming a {user?.goal}.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass-panel px-4 py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-aspiro-blue/20 flex items-center justify-center">
              <Flame className="w-4 h-4 text-aspiro-blue" />
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase font-bold">Current Streak</p>
              <p className="text-lg font-bold">12 Days</p>
            </div>
          </div>
          <div className="glass-panel px-4 py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-aspiro-purple/20 flex items-center justify-center">
              <Award className="w-4 h-4 text-aspiro-purple" />
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase font-bold">Rank</p>
              <p className="text-lg font-bold">Elite II</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Readiness Score */}
        <GlassCard className="lg:col-span-1 flex flex-col items-center justify-center text-center p-10" glow>
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-white/5"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={502.4}
                initial={{ strokeDashoffset: 502.4 }}
                animate={{ strokeDashoffset: 502.4 - (502.4 * readinessScore) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-aspiro-blue"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">{readinessScore}%</span>
              <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Readiness</span>
            </div>
          </div>
          <p className="mt-6 text-sm text-white/60">
            Your placement readiness has increased by <span className="text-aspiro-blue font-bold">+5%</span> this week.
          </p>
        </GlassCard>

        {/* Skill Radar */}
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-aspiro-blue" />
              Skill Analysis
            </h3>
            <button className="text-xs text-aspiro-blue hover:underline">View Detailed Report</button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#00d2ff"
                  fill="#00d2ff"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Daily Recommendation */}
        <GlassCard className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h3 className="font-bold">Daily AI Mission</h3>
          </div>
          <p className="text-white/80 text-sm flex-1">
            {roadmap?.dailyRecommendation || "Complete the 'System Design' module to boost your readiness score by 8%."}
          </p>
          <button className="mt-6 w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
            Start Mission
            <ChevronRight className="w-4 h-4" />
          </button>
        </GlassCard>

        {/* Weak Areas */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <h3 className="font-bold">Weak Areas Detected</h3>
          </div>
          <div className="space-y-3">
            {(roadmap?.weakAreas || ['Dynamic Programming', 'System Design', 'Communication']).map((area: string, i: number) => (
              <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                <span className="text-sm">{area}</span>
                <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-red-400" style={{ width: '30%' }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Achievement Badges */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-aspiro-purple" />
            <h3 className="font-bold">Recent Achievements</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: '🚀', label: 'Fast Learner' },
              { icon: '💻', label: 'Code Ninja' },
              { icon: '🗣️', label: 'Orator' },
              { icon: '🎯', label: 'Goal Getter' },
            ].map((badge, i) => (
              <div key={i} className="group relative">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl group-hover:bg-aspiro-blue/20 group-hover:border-aspiro-blue/50 transition-all cursor-help">
                  {badge.icon}
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-aspiro-dark border border-white/10 px-2 py-1 rounded text-[10px] whitespace-nowrap z-20">
                  {badge.label}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
