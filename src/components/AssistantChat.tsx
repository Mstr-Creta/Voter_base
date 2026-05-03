import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, ShieldAlert, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { askElectionAssistant } from '../lib/gemini';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AssistantChat: React.FC<{ currentStage?: string }> = ({ currentStage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m your Election Process Assistant. Nonpartisan, factual, and happy to help you understand how elections work. What can I clarify for you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const response = await askElectionAssistant(userMessage, currentStage);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-24 right-0 w-[420px] max-w-[95vw] h-[600px] bg-white border-4 border-slate-900 shadow-[12px_12px_0px_#000] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-yellow-400 border-b-4 border-slate-900 text-slate-900 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 text-white border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#000]">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-black text-lg uppercase tracking-tighter italic">Civic AI Assistant</h3>
                  <div className="flex items-center gap-2 text-[10px] text-slate-900 uppercase tracking-widest font-black opacity-60">
                    <ShieldAlert className="w-3 h-3" /> Neutral / Fact-Only
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 border-2 border-slate-900 bg-white hover:bg-slate-100 shadow-[2px_2px_0px_#000] transition-all active:translate-y-[1px]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50"
              style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 0)', backgroundSize: '24px 24px' }}
            >
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex flex-col max-w-[90%]",
                    m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "p-4 border-2 border-slate-900 text-sm font-bold leading-tight",
                    m.role === 'user' 
                      ? "bg-blue-600 text-white shadow-[4px_4px_0px_#000]" 
                      : "bg-white text-slate-900 shadow-[4px_4px_0px_#000]"
                  )}>
                    <div className="prose prose-slate prose-sm max-w-none prose-headings:font-black prose-headings:uppercase">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 uppercase font-black tracking-widest">
                    {m.role === 'user' ? 'Citizen' : 'Verified AI'}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-slate-900 text-xs font-black uppercase italic">
                  <div className="w-3 h-3 bg-blue-600 border border-slate-900 animate-spin" />
                  Fact-checking...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t-4 border-slate-900 flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about registration..."
                className="flex-1 bg-slate-100 border-2 border-slate-900 px-4 py-3 text-sm font-bold focus:bg-white transition-all outline-none"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-slate-900 text-white p-4 border-2 border-slate-900 hover:bg-blue-600 disabled:opacity-50 transition-all shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000]"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, rotate: 3 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-slate-900 text-yellow-400 border-4 border-slate-900 shadow-[8px_8px_0px_#3b82f6] flex items-center justify-center group relative group"
      >
        <MessageCircle className="w-10 h-10 transition-transform group-hover:scale-110" />
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-500 border-4 border-slate-900 animate-bounce" />
      </motion.button>
    </div>
  );
};
