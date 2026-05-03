import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Vote, ArrowLeft, RotateCcw, Share2, MapPin } from 'lucide-react';
import { ELECTION_STAGES } from './lib/electionData';
import { StageCard } from './components/StageCard';
import { VotingDemo } from './components/VotingDemo';
import { AssistantChat } from './components/AssistantChat';
import { cn } from './lib/utils';

export default function App() {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const currentStage = ELECTION_STAGES[currentStageIdx] || ELECTION_STAGES[0];
  const progress = ((currentStageIdx + 1) / ELECTION_STAGES.length) * 100;

  const handleNext = () => {
    if (currentStageIdx < ELECTION_STAGES.length - 1) {
      setCurrentStageIdx(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStageIdx > 0) {
      setCurrentStageIdx(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setCurrentStageIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-40 bg-white border-b-4 border-slate-900 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full border-2 border-slate-900 flex items-center justify-center font-black text-2xl shadow-[4px_4px_0px_#000]">
              V
            </div>
            <div>
              <h1 className="font-black text-3xl tracking-tighter uppercase leading-none italic">
                Voter<span className="text-blue-600">Base</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse border border-slate-900" />
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] leading-none">Election Lifecycle v1.0</p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-4">
              <span className="font-mono font-black text-sm uppercase tracking-widest text-slate-400">Progress</span>
              <div className="flex gap-1.5">
                {ELECTION_STAGES.map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-4 h-4 rounded-full border-2 border-slate-900 transition-all",
                      i <= currentStageIdx ? "bg-blue-600 shadow-[2px_2px_0px_#000]" : "bg-slate-200"
                    )}
                  />
                ))}
              </div>
              <span className="font-mono font-black text-sm uppercase ml-2">
                Stage {String(currentStageIdx + 1).padStart(2, '0')} <span className="text-slate-400">/ {ELECTION_STAGES.length}</span>
              </span>
            </div>
            <button 
              onClick={handleReset}
              className="bg-white border-2 border-slate-900 p-2 shadow-[3px_3px_0px_#000] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] active:translate-y-[1px] active:shadow-none transition-all"
              title="Reset Journey"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section (Only on first stage) */}
      <AnimatePresence mode="wait">
        {currentStageIdx === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-5xl mx-auto pt-20 px-8 mb-20"
          >
            <div className="relative inline-block mb-6">
              <h2 className="text-7xl md:text-[140px] font-black tracking-tighter text-slate-900 leading-[0.8] uppercase italic">
                Master the<br />
                <span className="text-blue-600">Machine.</span>
              </h2>
              <div className="absolute -right-8 top-0 md:-right-20 rotate-12 bg-yellow-400 border-4 border-slate-900 px-6 py-2 shadow-[6px_6px_0px_#000]">
                <span className="font-black uppercase tracking-tighter text-xl">Start Here</span>
              </div>
            </div>
            <div className="max-w-2xl mt-8">
              <p className="text-slate-500 text-2xl font-bold leading-tight mb-10 italic">
                From registration to results. A uncompromising, nonpartisan guide to how your vote actually works.
              </p>
              <div className="flex gap-4">
                <div className="bg-pink-400 border-2 border-slate-900 px-6 py-3 shadow-[4px_4px_0px_#000] font-black uppercase text-xs tracking-widest flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Localized Data Active
                </div>
                <div className="bg-white border-2 border-slate-900 px-6 py-3 shadow-[4px_4px_0px_#000] font-black uppercase text-xs tracking-widest flex items-center gap-2 italic">
                  Scroll or Select Stage
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-8 py-20 flex flex-col md:flex-row gap-16 relative">
        {/* Stages Sidebar (Desktop) */}
        <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-40 h-fit space-y-3">
          <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
             <div className="w-4 h-1 bg-slate-400" /> The Process
          </div>
          {ELECTION_STAGES.map((stage, idx) => (
            <button
              key={stage.id}
              onClick={() => setCurrentStageIdx(idx)}
              className={cn(
                "w-full text-left p-4 border-2 transition-all flex items-center gap-4 group relative",
                idx === currentStageIdx 
                  ? "bg-slate-900 border-slate-900 text-white shadow-[6px_6px_0px_#3b82f6] translate-x-2" 
                  : "bg-white border-slate-200 text-slate-400 hover:border-slate-900 hover:text-slate-900 hover:shadow-[4px_4px_0px_#000]"
              )}
            >
              <div className="font-mono font-black text-xs opacity-50">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <span className="text-sm font-black uppercase tracking-tight">{stage.title}</span>
              {idx === currentStageIdx && (
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rotate-45 border-2 border-slate-900" />
              )}
            </button>
          ))}
          
          <div className="mt-12 p-6 bg-yellow-400 border-2 border-slate-900 shadow-[4px_4px_0px_#000] rotate-2">
            <h5 className="font-black uppercase text-xs tracking-widest mb-2 italic">Quick Help</h5>
            <p className="text-sm font-bold text-slate-900 leading-tight">
              Unsure about a step? Use the AI Assistant in the bottom corner.
            </p>
          </div>
        </aside>

        {/* Stage Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            >
              {currentStageIdx > 0 && (
                <button
                  onClick={handlePrev}
                  className="mb-10 flex items-center gap-2 bg-white border-2 border-slate-900 px-4 py-2 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#000] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] active:translate-y-[1px] active:shadow-none transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to {ELECTION_STAGES[currentStageIdx-1].title}
                </button>
              )}
              
              {currentStage.id === 'voting-demo' ? (
                <VotingDemo onComplete={handleNext} />
              ) : (
                <StageCard
                  stage={currentStage}
                  onNext={handleNext}
                  isFirst={currentStageIdx === 0}
                  isLast={currentStageIdx === ELECTION_STAGES.length - 1}
                />
              )}

              {currentStageIdx === ELECTION_STAGES.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="mt-20 p-16 bg-slate-900 border-[6px] border-blue-600 text-white text-center shadow-[16px_16px_0px_#000] relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <Vote className="w-24 h-24 mx-auto mb-10 text-blue-400" />
                    <h3 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.8] mb-8">
                      Your Voice <br /><span className="text-blue-500">Is Verified.</span>
                    </h3>
                    <p className="text-slate-400 max-w-xl mx-auto mb-12 text-xl font-bold italic leading-tight">
                      The cycle is complete. You are now equipped with the technical knowledge of the democratic process. Go forth and vote.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                      <button 
                        onClick={handleReset}
                        className="bg-white text-slate-900 px-10 py-5 font-black uppercase text-base border-4 border-slate-900 shadow-[6px_6px_0px_#3b82f6] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_#3b82f6] active:translate-y-[2px] transition-all"
                      >
                        Reset Guide
                      </button>
                      <button className="bg-blue-600 text-white px-10 py-5 font-black uppercase text-base border-4 border-slate-900 shadow-[6px_6px_0px_#fff] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_#fff] active:translate-y-[2px] transition-all flex items-center gap-3">
                        <Share2 className="w-6 h-6 text-white" /> Share Civic Knowledge
                      </button>
                    </div>
                  </div>
                  
                  {/* Decorative mesh */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Assistant */}
      <AssistantChat currentStage={currentStage.title} />

      {/* Mobile Nav Progress (Bottom Sticky) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t-4 border-slate-900 p-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <div className={cn("w-12 h-12 border-2 border-slate-900 flex items-center justify-center text-2xl shadow-[4px_4px_0px_#000]", currentStage.color, "text-white")}>
            {currentStage.emoji}
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">Stage {currentStageIdx + 1}</p>
            <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight italic">{currentStage.title}</h4>
          </div>
        </div>
        <div className="w-24 h-3 bg-slate-200 border-2 border-slate-900 shadow-[2px_2px_0px_#000] overflow-hidden">
          <motion.div 
            animate={{ width: `${progress}%` }}
            className="h-full bg-blue-600"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-8 py-32 text-center border-t-4 border-slate-900 space-y-6">
        <div className="flex justify-center gap-12 text-slate-900 font-black text-xs uppercase tracking-[0.4em] italic">
          <span>Nonpartisan</span>
          <span className="text-blue-600">Verified</span>
          <span>Open Process</span>
        </div>
        <p className="text-slate-500 text-sm font-bold max-w-2xl mx-auto leading-tight italic">
          Building a more transparent democracy, one educator at a time. This tool is purely for educational purposes and provides a high-level overview of complex legal processes.
        </p>
      </footer>
    </div>
  );
}
