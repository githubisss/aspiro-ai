import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard, HolographicButton } from '../components/UI';
import { geminiService } from '../services/geminiService';
import { 
  Mic2, 
  MicOff, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp,
  MessageSquare,
  Volume2,
  BrainCircuit,
  Settings
} from 'lucide-react';
import { cn } from '../lib/utils';

const modes = [
  { id: 'HR', label: 'HR Interview', icon: MessageSquare },
  { id: 'Technical', label: 'Technical', icon: BrainCircuit },
  { id: 'Coding', label: 'Coding Logic', icon: Settings },
  { id: 'System Design', label: 'System Design', icon: TrendingUp },
];

export default function InterviewScreen({ user }: { user: any }) {
  const [activeMode, setActiveMode] = useState('HR');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("Tell me about a challenging project you've worked on.");

  // Web Speech API
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setTranscript(prev => prev + event.results[i][0].transcript + ' ');
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      setFeedback(null);
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleSubmit = async () => {
    if (!transcript) return;
    setLoading(true);
    try {
      const result = await geminiService.analyzeInterview(transcript, activeMode);
      setFeedback(result);
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Interview <span className="text-gradient">Simulator</span></h2>
          <p className="text-white/60">Practice with voice-based real-time analysis.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          {modes.map((mode) => (
            <button 
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={cn(
                "px-4 py-2 text-xs rounded-lg transition-all flex items-center gap-2",
                activeMode === mode.id ? "bg-aspiro-blue text-white shadow-lg" : "text-white/40 hover:text-white"
              )}
            >
              <mode.icon className="w-3 h-3" />
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interview Area */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="min-h-[400px] flex flex-col items-center justify-center p-12 text-center" glow>
            <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10 max-w-lg relative">
              <div className="absolute -top-3 left-6 px-2 bg-aspiro-dark text-[10px] font-bold text-aspiro-blue uppercase tracking-widest">AI Interviewer</div>
              <p className="text-xl font-medium italic">"{currentQuestion}"</p>
              <button className="absolute -bottom-4 right-6 w-8 h-8 rounded-full bg-aspiro-blue flex items-center justify-center shadow-lg">
                <Volume2 className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="w-full max-w-xl space-y-6">
              <div className={cn(
                "min-h-[120px] p-6 bg-aspiro-blue/5 border rounded-2xl transition-all duration-500",
                isRecording ? "border-aspiro-blue shadow-[0_0_20px_rgba(0,210,255,0.2)]" : "border-white/10"
              )}>
                {transcript ? (
                  <p className="text-lg text-white/80">{transcript}</p>
                ) : (
                  <p className="text-white/20 italic">Your response will appear here as you speak...</p>
                )}
                {isRecording && (
                  <div className="mt-4 flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="w-1 bg-aspiro-blue rounded-full"
                        animate={{ height: [8, 24, 8] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4">
                <HolographicButton 
                  onClick={toggleRecording}
                  variant={isRecording ? 'secondary' : 'primary'}
                  className={cn("w-48", isRecording && "border-red-500/50 text-red-400")}
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic2 className="w-5 h-5" />}
                  {isRecording ? "Stop Recording" : "Start Answering"}
                </HolographicButton>
                
                {transcript && !isRecording && (
                  <HolographicButton 
                    onClick={handleSubmit}
                    loading={loading}
                    className="w-48"
                  >
                    Analyze Answer
                  </HolographicButton>
                )}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Feedback Area */}
        <div className="lg:col-span-1 space-y-6">
          <AnimatePresence mode="wait">
            {feedback ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <GlassCard glow>
                  <h3 className="font-bold mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Performance Score
                  </h3>
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                        <circle cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={339.12} strokeDashoffset={339.12 - (339.12 * feedback.score) / 100} className="text-aspiro-blue" strokeLinecap="round" />
                      </svg>
                      <span className="absolute text-3xl font-bold">{feedback.score}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/5 rounded-xl">
                      <p className="text-[10px] text-white/40 uppercase font-bold">Accuracy</p>
                      <p className="text-lg font-bold text-aspiro-blue">{feedback.technicalAccuracy}%</p>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-xl">
                      <p className="text-[10px] text-white/40 uppercase font-bold">Confidence</p>
                      <p className="text-lg font-bold text-aspiro-purple">{feedback.confidence}%</p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard>
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    Filler Words
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {feedback.fillerWords.map((word: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-red-400/10 text-red-400 border border-red-400/20 rounded text-xs font-bold">
                        {word}
                      </span>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard>
                  <h3 className="font-bold mb-4">AI Suggestion</h3>
                  <p className="text-sm text-white/60 italic mb-4">"{feedback.suggestions[0]}"</p>
                  <HolographicButton variant="secondary" size="sm" className="w-full">
                    <RotateCcw className="w-4 h-4" />
                    Re-attempt Question
                  </HolographicButton>
                </GlassCard>
              </motion.div>
            ) : (
              <GlassCard className="h-full flex flex-col items-center justify-center text-center p-12 opacity-30">
                <Mic2 className="w-12 h-12 mb-4" />
                <p className="text-sm">Complete an answer to see AI analysis and feedback.</p>
              </GlassCard>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
