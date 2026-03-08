import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  Mic2, 
  Code2, 
  FileText, 
  User,
  Settings,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import { AIAssistant } from './components/AIAssistant';
import { GlassCard, HolographicButton } from './components/UI';
import { cn } from './lib/utils';

// Screens (to be implemented in separate files or as components)
import LandingScreen from './screens/LandingScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import DashboardScreen from './screens/DashboardScreen';
import CourseHubScreen from './screens/CourseHubScreen';
import PlacementScreen from './screens/PlacementScreen';
import InterviewScreen from './screens/InterviewScreen';
import CodingScreen from './screens/CodingScreen';
import ResumeScreen from './screens/ResumeScreen';
import ProfileScreen from './screens/ProfileScreen';

type Screen = 'landing' | 'onboarding' | 'dashboard' | 'courses' | 'placements' | 'interviews' | 'coding' | 'resume' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [user, setUser] = useState<any>(null);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load user from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('aspiro_user');
    const savedRoadmap = localStorage.getItem('aspiro_roadmap');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        if (savedRoadmap) setRoadmap(JSON.parse(savedRoadmap));
        setCurrentScreen('dashboard');
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  const handleOnboardingComplete = (userData: any, roadmapData: any) => {
    setUser(userData);
    setRoadmap(roadmapData);
    localStorage.setItem('aspiro_user', JSON.stringify(userData));
    localStorage.setItem('aspiro_roadmap', JSON.stringify(roadmapData));
    setCurrentScreen('dashboard');
  };

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'courses', icon: BookOpen, label: 'Course Hub' },
    { id: 'placements', icon: Briefcase, label: 'Placements' },
    { id: 'interviews', icon: Mic2, label: 'Interviews' },
    { id: 'coding', icon: Code2, label: 'Coding' },
    { id: 'resume', icon: FileText, label: 'Resume' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing': return <LandingScreen onStart={() => setCurrentScreen('onboarding')} />;
      case 'onboarding': return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case 'dashboard': return <DashboardScreen user={user} roadmap={roadmap} />;
      case 'courses': return <CourseHubScreen roadmap={roadmap} />;
      case 'placements': return <PlacementScreen user={user} />;
      case 'interviews': return <InterviewScreen user={user} />;
      case 'coding': return <CodingScreen />;
      case 'resume': return <ResumeScreen user={user} />;
      case 'profile': return <ProfileScreen user={user} roadmap={roadmap} />;
      default: return <DashboardScreen user={user} roadmap={roadmap} />;
    }
  };

  const showNav = currentScreen !== 'landing' && currentScreen !== 'onboarding';

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-aspiro-dark text-white">
      {/* Sidebar Navigation */}
      <AnimatePresence>
        {showNav && (
          <>
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden fixed top-4 left-4 z-50 p-2 glass-panel"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className={cn(
                "fixed md:relative z-50 h-full w-64 glass-panel border-r border-white/10 flex flex-col transition-transform duration-300",
                !isSidebarOpen && "-translate-x-full md:translate-x-0"
              )}
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-aspiro-blue rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,210,255,0.5)]">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                  <h1 className="text-2xl font-bold tracking-tighter text-gradient">Aspiro</h1>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentScreen(item.id as Screen);
                      setIsSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                      currentScreen === item.id 
                        ? "bg-aspiro-blue/20 text-aspiro-blue border border-aspiro-blue/30" 
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className={cn(
                      "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                      currentScreen === item.id ? "text-aspiro-blue" : "text-white/40"
                    )} />
                    <span className="font-medium">{item.label}</span>
                    {currentScreen === item.id && (
                      <motion.div 
                        layoutId="activeNav"
                        className="ml-auto w-1.5 h-1.5 bg-aspiro-blue rounded-full shadow-[0_0_8px_rgba(0,210,255,0.8)]"
                      />
                    )}
                  </button>
                ))}
              </nav>

              <div className="p-6 border-t border-white/10">
                <div className="flex items-center gap-3 p-3 glass-panel hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aspiro-purple to-aspiro-blue p-0.5">
                    <div className="w-full h-full rounded-full bg-aspiro-dark flex items-center justify-center overflow-hidden">
                      <User className="w-6 h-6 text-white/60" />
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold truncate">{user?.name || 'Guest'}</p>
                    <p className="text-xs text-white/40 truncate">{user?.goal || 'Career Explorer'}</p>
                  </div>
                  <Settings className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto h-screen">
        {/* Global AI Assistant (Floating) */}
        {showNav && (
          <div className="fixed bottom-8 right-8 z-40">
            <AIAssistant 
              className="scale-75 origin-bottom-right" 
              mood={currentScreen === 'interviews' ? 'talking' : 'idle'}
            />
          </div>
        )}

        {/* Top Header (Dashboard Only) */}
        {showNav && (
          <header className="sticky top-0 z-30 px-8 py-4 flex items-center justify-between bg-aspiro-dark/50 backdrop-blur-md border-b border-white/5">
            <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/10 w-full max-w-md">
              <Search className="w-4 h-4 text-white/40" />
              <input 
                type="text" 
                placeholder="Search skills, jobs, or concepts..." 
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 glass-panel relative group">
                <Bell className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-aspiro-blue rounded-full shadow-[0_0_5px_rgba(0,210,255,0.8)]" />
              </button>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white/60">Streak:</span>
                <div className="flex items-center gap-1 bg-aspiro-blue/10 px-2 py-1 rounded-lg border border-aspiro-blue/20">
                  <span className="text-aspiro-blue font-bold">🔥 12</span>
                </div>
              </div>
            </div>
          </header>
        )}

        <div className={cn("relative", showNav ? "p-8" : "")}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
