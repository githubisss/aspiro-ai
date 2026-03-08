import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard, HolographicButton } from '../components/UI';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Building2, 
  Search, 
  Filter,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

const jobs = [
  { id: 1, company: 'Google', role: 'Software Engineer', location: 'Mountain View, CA', salary: '$150k - $220k', match: 92, missing: ['System Design', 'Go'], logo: 'G' },
  { id: 2, company: 'Meta', role: 'Frontend Engineer', location: 'Menlo Park, CA', salary: '$140k - $210k', match: 88, missing: ['GraphQL'], logo: 'M' },
  { id: 3, company: 'Amazon', role: 'Backend Developer', location: 'Seattle, WA', salary: '$130k - $190k', match: 75, missing: ['AWS', 'Java', 'Distributed Systems'], logo: 'A' },
  { id: 4, company: 'Netflix', role: 'Full Stack Engineer', location: 'Los Gatos, CA', salary: '$200k - $300k', match: 65, missing: ['Node.js', 'PostgreSQL', 'Redis'], logo: 'N' },
  { id: 5, company: 'Microsoft', role: 'Cloud Engineer', location: 'Redmond, WA', salary: '$135k - $200k', match: 82, missing: ['Azure', 'C#'], logo: 'MS' },
];

export default function PlacementScreen({ user }: { user: any }) {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [filter, setFilter] = useState('All');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Placement <span className="text-gradient">Intelligence</span></h2>
          <p className="text-white/60">Live hiring feed tailored to your skill profile.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            {['All', 'Remote', 'Top Tier', 'Startup'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 text-xs rounded-lg transition-all",
                  filter === f ? "bg-aspiro-blue text-white shadow-lg" : "text-white/40 hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job List */}
        <div className="lg:col-span-2 space-y-4">
          {jobs.map((job) => (
            <GlassCard 
              key={job.id} 
              className="flex items-center gap-6 p-4 hover:bg-white/10 transition-all cursor-pointer group"
              onClick={() => setSelectedJob(job)}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-2xl font-bold text-gradient">
                {job.logo}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold group-hover:text-aspiro-blue transition-colors">{job.role}</h3>
                  <div className="flex items-center gap-1 text-aspiro-blue font-bold text-sm">
                    <TrendingUp className="w-4 h-4" />
                    {job.match}% Match
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/40">
                  <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {job.company}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {job.salary}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-aspiro-blue group-hover:translate-x-1 transition-all" />
            </GlassCard>
          ))}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard glow>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-aspiro-blue" />
              Your Ranking
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Global Rank</span>
                <span className="text-xl font-bold">#1,245</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">College Rank</span>
                <span className="text-xl font-bold text-aspiro-blue">#12</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-aspiro-blue to-aspiro-purple" style={{ width: '85%' }} />
              </div>
              <p className="text-xs text-white/40 text-center italic">Top 5% of all engineering students globally.</p>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              Hiring Trends
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <p className="text-xs font-bold text-aspiro-blue mb-1">HOT SKILL</p>
                <p className="text-sm">Rust is up 45% in job requirements this month.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <p className="text-xs font-bold text-aspiro-purple mb-1">MARKET INSIGHT</p>
                <p className="text-sm">Remote roles for Junior Devs increased by 12%.</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-aspiro-dark/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl glass-panel p-8 overflow-hidden"
            >
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-bold text-gradient">
                  {selectedJob.logo}
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{selectedJob.role}</h2>
                  <p className="text-xl text-aspiro-blue font-medium">{selectedJob.company}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="space-y-1">
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Location</p>
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-aspiro-blue" /> {selectedJob.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Salary Range</p>
                  <p className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-aspiro-blue" /> {selectedJob.salary}</p>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div>
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Why you're a good fit
                  </h4>
                  <p className="text-sm text-white/60">
                    Your expertise in React, Node.js, and Cloud Architecture matches 90% of the core requirements for this role.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold mb-3 flex items-center gap-2 text-yellow-400">
                    <AlertCircle className="w-5 h-5" />
                    Missing Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.missing.map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 rounded-full text-xs font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-white/40 mt-3 italic">Aspiro can help you learn these in ~2 weeks.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <HolographicButton className="flex-1" size="lg">
                  Apply Now
                </HolographicButton>
                <HolographicButton variant="secondary" className="flex-1" size="lg">
                  Save for Later
                </HolographicButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
