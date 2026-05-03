import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Vote, ShieldCheck, Info, AlertCircle, ArrowRight, Smartphone, GraduationCap, Sprout, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

export const VotingDemo: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const candidates = [
    { 
      id: 1, 
      name: "Sachin Nagraj", 
      slogan: "Championing Digital Literacy & Tech Infrastructure for all citizens.", 
      icon: <Smartphone className="w-8 h-8" />,
      color: "bg-blue-400" 
    },
    { 
      id: 2, 
      name: "Tejas Yadav", 
      slogan: "Prioritizing Youth Empowerment & Modern Vocational Education.", 
      icon: <GraduationCap className="w-8 h-8" />,
      color: "bg-pink-400" 
    },
    { 
      id: 3, 
      name: "Srichandan Lal", 
      slogan: "Sustainable Agriculture & Rural Development for a greener future.", 
      icon: <Sprout className="w-8 h-8" />,
      color: "bg-green-400" 
    },
    { 
      id: 4, 
      name: "Utamesh Raj Nandan", 
      slogan: "Universal Healthcare & Urban Safety through community-first policies.", 
      icon: <Heart className="w-8 h-8" />,
      color: "bg-yellow-400" 
    },
  ];

  const handleVote = () => {
    if (selected === null) return;
    setIsVerifying(true);
    
    // Simulate encryption/recording
    setTimeout(() => {
      setIsVerifying(false);
      setHasVoted(true);
      
      // Auto-advance to next stage after the user has time to see their candidate
      setTimeout(() => {
        onComplete();
      }, 5000);
    }, 2200);
  };

  const selectedCandidate = candidates.find(c => c.id === selected);

  return (
    <div className={cn(
      "w-full max-w-4xl mx-auto bg-white border-4 border-slate-900 shadow-[16px_16px_0px_#000] relative transition-all duration-700",
      hasVoted ? "overflow-visible scale-102" : "overflow-hidden"
    )}>
      <AnimatePresence mode="wait">
        {isVerifying ? (
          <motion.div
            key="recording"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] bg-blue-600 flex flex-col items-center justify-center text-white p-10"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 0.9, 1.1, 1],
                rotate: [0, 10, -10, 5, 0]
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="bg-white p-8 border-4 border-slate-900 shadow-[8px_8px_0px_#000] mb-8"
            >
              <Vote className="w-20 h-20 text-slate-900" />
            </motion.div>
            <h3 className="text-5xl font-black uppercase italic tracking-tighter mb-2 text-center">Encrypting Ballot...</h3>
            <p className="font-mono text-xs uppercase tracking-widest opacity-80">Connected to secure civic node</p>
            
            <div className="w-64 h-8 border-4 border-slate-900 bg-white mt-10 overflow-hidden relative">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-full h-full bg-pink-400"
              />
            </div>
          </motion.div>
        ) : hasVoted ? (
          <motion.div
            key="confetti"
            className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center"
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1.2, 0], 
                  x: (Math.random() - 0.5) * 1200, 
                  y: (Math.random() - 0.5) * 1200,
                  rotate: Math.random() * 720
                }}
                transition={{ 
                  duration: 2.5, 
                  ease: [0.23, 1, 0.32, 1], 
                  delay: (i % 5) * 0.1 
                }}
                className={cn(
                  "absolute w-16 h-16 border-4 border-slate-900",
                  i % 4 === 0 ? "bg-pink-400 rounded-full" : 
                  i % 4 === 1 ? "bg-yellow-400" : 
                  i % 4 === 2 ? "bg-blue-400 rotate-12" : 
                  "bg-green-400 -rotate-12"
                )}
              />
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="bg-slate-900 p-8 text-white flex justify-between items-center border-b-4 border-slate-900">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic">Official Demo Ballot</h2>
          <p className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em] font-bold mt-1">Simulated Secure Session #2026-X</p>
        </div>
        <ShieldCheck className="w-12 h-12 text-green-400" />
      </div>

      <div className="p-10">
        {!hasVoted ? (
          <div className="space-y-8">
            <div className="bg-yellow-100 border-2 border-slate-900 p-4 flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-slate-900 shrink-0 mt-1" />
              <p className="text-sm font-bold text-slate-800 leading-tight">
                INSTRUCTIONS: Select ONE candidate from the list below. This is a non-binding educational simulation based on real-world local election scenarios in India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {candidates.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelected(c.id)}
                  disabled={isVerifying}
                  className={cn(
                    "relative p-6 border-4 text-left transition-all group",
                    selected === c.id 
                      ? "border-slate-900 bg-white ring-4 ring-blue-500 shadow-none translate-x-1 translate-y-1" 
                      : "border-slate-900 bg-white shadow-[6px_6px_0px_#000] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_#000]"
                  )}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-16 h-16 border-4 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#000]", c.color)}>
                        {c.icon}
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-black uppercase text-slate-400">Option #{c.id}</span>
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">{c.name}</h3>
                      </div>
                    </div>
                    {selected === c.id && (
                      <div className="w-8 h-8 bg-blue-600 border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#000]">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs font-bold italic leading-tight mt-2 border-l-2 border-slate-200 pl-3">
                    {c.slogan}
                  </p>
                </button>
              ))}
            </div>

            <div className="pt-8 border-t-2 border-slate-100 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full animate-pulse", selected !== null ? "bg-green-500" : "bg-yellow-500")} />
                  <span className="text-sm font-bold">{selected !== null ? 'Selection Ready' : 'Pending Selection'}</span>
                </div>
              </div>
              
              <button
                onClick={handleVote}
                disabled={selected === null || isVerifying}
                className={cn(
                  "w-full md:w-auto px-12 py-5 font-black uppercase text-xl border-4 border-slate-900 transition-all flex items-center justify-center gap-3",
                  selected === null 
                    ? "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed" 
                    : "bg-blue-600 text-white shadow-[8px_8px_0px_#000] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#000] active:translate-y-[2px]"
                )}
              >
                {isVerifying ? 'Sealing Ballot...' : 'Cast My Ballot'}
                {!isVerifying && <Vote className="w-6 h-6" />}
              </button>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              rotate: 0,
            }}
            transition={{ 
              type: "spring", 
              damping: 12, 
              stiffness: 200,
              bounce: 0.6,
              duration: 0.6
            }}
            className="text-center py-12 space-y-8"
          >
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-32 h-32 bg-green-400 border-4 border-slate-900 rounded-full flex items-center justify-center mx-auto shadow-[12px_12px_0px_#000]"
            >
              <ShieldCheck className="w-16 h-16 text-slate-900" />
            </motion.div>
            
            <div className="space-y-4">
              <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.8] text-slate-900">
                Ballot <br /><span className="text-blue-600">Locked!</span>
              </h2>
              <div className="flex flex-col items-center gap-4 mt-8">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={cn("w-32 h-32 border-4 border-slate-900 shadow-[8px_8px_0px_#000] flex items-center justify-center p-4", selectedCandidate?.color)}
                >
                  {selectedCandidate?.icon}
                </motion.div>
                <div className="bg-pink-400 border-2 border-slate-900 px-4 py-1 rotate-[-2deg] shadow-[3px_3px_0px_#000] mb-2">
                  <span className="font-black uppercase text-xs">Official Receipt</span>
                </div>
                <p className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic max-w-lg mx-auto">
                  {selectedCandidate?.name} <span className="text-slate-400">Received +1</span>
                </p>
              </div>
            </div>

            <div className="bg-slate-100 border-2 border-slate-900 p-6 max-w-md mx-auto text-left relative">
               <div className="absolute -top-3 -right-3 bg-blue-600 text-white px-2 py-0.5 text-[10px] font-black italic border-2 border-slate-900 uppercase">Audit Trail</div>
               <p className="font-mono text-[10px] font-bold text-slate-500 break-all leading-tight">
                 TX_ID: {Math.random().toString(36).substring(2, 15).toUpperCase()} <br />
                 TIMESTAMP: {new Date().toISOString()} <br />
                 VERIFICATION_HASH: 0x{Math.random().toString(16).substring(2, 12)}...
               </p>
            </div>

            <button
              onClick={onComplete}
              className="mt-12 bg-slate-900 text-white px-10 py-5 font-black uppercase text-lg inline-flex items-center gap-3 shadow-[8px_8px_0px_#3b82f6] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#3b82f6] active:translate-y-[2px] transition-all"
            >
              Finish the Journey <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </div>

      <div className="bg-slate-50 p-6 border-t-4 border-slate-900 flex items-center gap-3">
        <Info className="w-5 h-5 text-blue-600" />
        <p className="text-xs font-bold text-slate-400 italic">
          In a real election, this record would be encrypted and anonymous. You would receive a tracking number to verify your vote was included in the final tally without revealing who you voted for.
        </p>
      </div>
    </div>
  );
};
