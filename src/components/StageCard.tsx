import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Lightbulb, Users, Clock, Info, ShieldCheck, Sparkles } from 'lucide-react';
import { ElectionStage } from '../lib/electionData';
import { cn } from '../lib/utils';

interface StageCardProps {
  stage: ElectionStage;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const StageCard: React.FC<StageCardProps> = ({ stage, onNext, isLast }) => {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-none border-4 border-slate-900 shadow-[12px_12px_0px_#000] overflow-hidden">
      {/* Header */}
      <div className={cn("p-10 border-b-4 border-slate-900 flex flex-col md:flex-row items-center gap-6", stage.color)}>
        <div className="bg-white border-4 border-slate-900 p-6 rounded-none text-5xl shadow-[4px_4px_0px_#000]">
          {stage.emoji}
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.8] text-slate-900 italic">
            {stage.title}
          </h2>
          <div className="inline-block bg-slate-900 text-white px-3 py-1 font-mono text-xs uppercase tracking-widest mt-4">
            Phase Active
          </div>
        </div>
      </div>

      <div className="p-8 grid md:grid-cols-2 gap-12">
        {/* Main Content */}
        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-black italic rounded">?</span>
              <h3 className="font-black text-2xl uppercase tracking-tighter">What Happens</h3>
            </div>
            <p className="text-slate-700 leading-tight text-xl font-bold italic border-l-8 border-slate-200 pl-6 py-2">
              "{stage.whatHappens}"
            </p>
          </section>

          <div className="grid grid-cols-1 gap-4">
            <section className="bg-slate-100 border-2 border-slate-900 p-4 shadow-[4px_4px_0px_#000]">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-black uppercase text-xs tracking-widest">
                <Users className="w-4 h-4" /> Who is Involved
              </div>
              <p className="text-slate-600 font-bold leading-none">{stage.whoIsInvolved}</p>
            </section>
            <section className="bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_0px_#000]">
              <div className="flex items-center gap-2 mb-2 text-slate-900 font-black uppercase text-xs tracking-widest">
                <Clock className="w-4 h-4 text-blue-600" /> Standard Timeline
              </div>
              <p className="text-slate-600 font-bold leading-none">{stage.timeline}</p>
            </section>
          </div>

          <div className="bg-pink-400 border-2 border-slate-900 p-6 shadow-[6px_6px_0px_#000] rotate-[-1deg]">
            <div className="flex items-center gap-2 mb-2 text-slate-900 font-black uppercase text-sm tracking-wider">
              <Lightbulb className="w-5 h-5" /> Vital Takeaway
            </div>
            <p className="text-slate-900 font-black leading-tight text-lg">
              {stage.takeaway}
            </p>
          </div>
        </div>

        {/* Interactive Column */}
        <div className="space-y-8">
          {/* Checklist */}
          {stage.checklist && (
            <div className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_#3b82f6]">
              <h3 className="font-black text-2xl uppercase tracking-tighter mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-black rounded italic">!</span>
                Checklist
              </h3>
              <div className="space-y-4">
                {stage.checklist.map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className="flex items-center gap-4 w-full text-left group"
                  >
                    <div className={cn(
                      "w-7 h-7 border-4 border-slate-900 flex items-center justify-center transition-all",
                      checklist[item.id] ? "bg-green-400 shadow-none" : "bg-white shadow-[2px_2px_0px_#000]"
                    )}>
                      {checklist[item.id] && <CheckCircle2 className="w-5 h-5 text-slate-900" />}
                    </div>
                    <span className={cn(
                      "text-base font-bold transition-all",
                      checklist[item.id] ? "text-slate-400 line-through" : "text-slate-800"
                    )}>
                      {item.task}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Expert Tips / Best Practices */}
          {stage.tips && (
            <div className="bg-yellow-400 border-4 border-slate-900 p-6 shadow-[8px_8px_0px_#000]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-2xl uppercase tracking-tighter flex items-center gap-2">
                   Expert Tips
                </h3>
                <Sparkles className="w-6 h-6 text-slate-900" />
              </div>
              <div className="space-y-4">
                {stage.tips.map((tip, idx) => (
                  <div 
                    key={idx}
                    className="bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_0px_#000] relative"
                  >
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white border-2 border-slate-900 flex items-center justify-center font-black text-xs italic">
                      {idx + 1}
                    </div>
                    <p className="text-slate-900 text-sm font-bold leading-tight pl-2">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Nav */}
      <div className="p-8 bg-white border-t-4 border-slate-900 flex justify-between items-center">
        <div className="font-mono text-xs font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" /> VERIFIED PROCESS
        </div>
        {!isLast && (
          <button
            onClick={onNext}
            className={cn(
              "flex items-center gap-4 px-10 py-5 rounded-none border-4 border-slate-900 text-slate-900 font-black uppercase text-lg shadow-[6px_6px_0px_#000] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_#000] active:translate-y-[2px] active:shadow-none transition-all",
              stage.color
            )}
          >
            Next Stage <ArrowRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};
