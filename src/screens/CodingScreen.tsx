import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard, HolographicButton } from '../components/UI';
import { 
  Code2, 
  Play, 
  Save, 
  Sparkles, 
  Bug, 
  Terminal,
  CheckCircle2,
  ChevronRight,
  Settings
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function CodingScreen() {
  const [code, setCode] = useState(`function findMax(arr) {\n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}\n\nconsole.log(findMax([1, 5, 3, 9, 2]));`);
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [aiHint, setAiHint] = useState<string | null>(null);

  const handleRun = () => {
    setIsExecuting(true);
    setOutput('');
    
    // Simple simulation of code execution
    setTimeout(() => {
      try {
        // This is a very basic simulation, in a real app we'd use a proper sandbox
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args) => logs.push(args.map(a => JSON.stringify(a)).join(' '));
        
        eval(code);
        
        console.log = originalLog;
        setOutput(logs.join('\n') || 'Program executed successfully (no output).');
      } catch (e: any) {
        setOutput(`Error: ${e.message}`);
      } finally {
        setIsExecuting(false);
      }
    }, 1000);
  };

  const handleAiDebug = () => {
    setAiHint("I've analyzed your code. It looks efficient! Consider adding a check for empty arrays to make it more robust.");
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Coding <span className="text-gradient">Platform</span></h2>
          <p className="text-white/60">Solve challenges with real-time AI debugging assistance.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            JavaScript
          </div>
          <HolographicButton variant="secondary" size="sm">
            <Settings className="w-4 h-4" />
          </HolographicButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
        {/* Editor Area */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <GlassCard className="flex-1 p-0 overflow-hidden flex flex-col" glow>
            <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="ml-4 text-xs font-mono text-white/40">solution.js</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleAiDebug} className="p-2 hover:bg-aspiro-blue/10 rounded-lg text-aspiro-blue transition-colors group relative">
                  <Bug className="w-4 h-4" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-aspiro-dark border border-white/10 px-2 py-1 rounded text-[10px] whitespace-nowrap z-20">AI Debug</span>
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 transition-colors">
                  <Save className="w-4 h-4" />
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-transparent p-6 font-mono text-sm outline-none resize-none text-aspiro-blue/90 selection:bg-aspiro-blue/20"
              spellCheck={false}
            />
            <div className="bg-aspiro-dark/50 px-6 py-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <HolographicButton size="sm" onClick={handleRun} loading={isExecuting}>
                  <Play className="w-4 h-4 fill-current" />
                  Run Code
                </HolographicButton>
                <HolographicButton variant="secondary" size="sm">
                  Submit Solution
                </HolographicButton>
              </div>
              <div className="text-[10px] text-white/20 font-mono">
                UTF-8 | LF | JavaScript
              </div>
            </div>
          </GlassCard>

          <GlassCard className="h-48 p-0 overflow-hidden flex flex-col">
            <div className="bg-white/5 px-6 py-2 border-b border-white/10 flex items-center gap-2">
              <Terminal className="w-3 h-3 text-white/40" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Console Output</span>
            </div>
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto bg-black/20">
              {output ? (
                <pre className="text-green-400/80">{output}</pre>
              ) : (
                <p className="text-white/20 italic">Run your code to see output here...</p>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Sidebar / AI Hints */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard glow className="bg-aspiro-blue/5 border-aspiro-blue/20">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-aspiro-blue" />
              AI Assistant
            </h3>
            <AnimatePresence mode="wait">
              {aiHint ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <p className="text-sm text-aspiro-blue/80 leading-relaxed italic">
                    "{aiHint}"
                  </p>
                  <button 
                    onClick={() => setAiHint(null)}
                    className="text-xs text-white/40 hover:text-white transition-colors"
                  >
                    Dismiss
                  </button>
                </motion.div>
              ) : (
                <p className="text-sm text-white/40 italic">
                  I'm watching your code. Ask for a hint or debug help anytime!
                </p>
              )}
            </AnimatePresence>
          </GlassCard>

          <GlassCard>
            <h3 className="font-bold mb-4">Problem Statement</h3>
            <div className="space-y-4">
              <p className="text-sm font-bold">Find Maximum in Array</p>
              <p className="text-xs text-white/60 leading-relaxed">
                Write a function that takes an array of numbers and returns the largest element.
              </p>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] font-bold text-white/40 mb-1 uppercase">Example</p>
                <code className="text-[10px] text-aspiro-blue">{"[1, 5, 3] -> 5"}</code>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-bold mb-4">Skill Progress</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span>Arrays</span>
                  <span className="text-aspiro-blue">85%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-aspiro-blue" style={{ width: '85%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span>Loops</span>
                  <span className="text-aspiro-purple">92%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-aspiro-purple" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
