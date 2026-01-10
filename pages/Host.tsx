import React, { useState, useEffect, useRef } from 'react';
import { Server, Database, Lock, Terminal, Cpu, Globe, ArrowRight, Search, Check, Loader2, Zap, Rocket, Activity, ShieldCheck } from 'lucide-react';

interface TerminalLine {
  type: 'command' | 'output';
  content: string | string[];
}

const FLUID_LOGO_SVG = (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
    <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
  </svg>
);

const HostPage: React.FC = () => {
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [domainQuery, setDomainQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<'idle' | 'available' | 'taken'>('idle');
  const [deployStage, setDeployStage] = useState<number>(0);
  const [latency, setLatency] = useState(582);
  const [blocks, setBlocks] = useState(12450892);

  useEffect(() => {
    const interval = setInterval(() => {
        setLatency(prev => Math.max(400, Math.min(800, prev + (Math.random() * 20 - 10))));
        setBlocks(prev => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const script = [
    { type: 'command', text: 'npm install -g fluid-cli', delay: 500 },
    { type: 'output', content: ['<span class="text-slate-400">+ fluid-cli@1.0.4</span>', '<span class="text-slate-400">added 12 packages in 2s</span>'], delay: 400 },
    { type: 'command', text: 'fluid init', delay: 800 },
    { type: 'output', content: ['Project name: <span class="text-white">awesome-dapp</span>', 'Framework: <span class="text-white">React / Next.js</span>', 'Storage: <span class="text-white">Permanent (Parmaweb)</span>'], delay: 600 },
    { type: 'command', text: 'fluid deploy', delay: 800 },
    { type: 'output', content: ['Building project...', 'Uploading assets...', 'Verifying integrity...'], delay: 600 },
    { type: 'output', content: ['<span class="text-emerald-400 font-bold">✔ Deployment successful!</span>', 'Access at: <span class="underline text-blue-400">https://fluid.link/awesome-dapp</span>'], delay: 400 }
  ];

  useEffect(() => {
    let timeoutId: any;
    let isMounted = true;
    const processStep = async () => {
      if (stepIndex >= script.length) {
         timeoutId = setTimeout(() => { if (isMounted) { setTerminalHistory([]); setStepIndex(0); } }, 8000);
         return;
      }
      const step = script[stepIndex];
      if (step.type === 'command') {
        if (isMounted) setIsTyping(true);
        let charIndex = 0;
        const typeChar = () => {
          if (!isMounted) return;
          if (charIndex <= (step.text as string).length) {
            setCurrentLine((step.text as string).slice(0, charIndex));
            charIndex++;
            timeoutId = setTimeout(typeChar, 40);
          } else {
            setIsTyping(false);
            timeoutId = setTimeout(() => { if (isMounted) { setTerminalHistory(prev => [...prev, { type: 'command', content: step.text as string }]); setCurrentLine(''); setStepIndex(prev => prev + 1); } }, 300);
          }
        };
        typeChar();
      } else {
        timeoutId = setTimeout(() => { if (isMounted) { setTerminalHistory(prev => [...prev, { type: 'output', content: step.content as string[] }]); setStepIndex(prev => prev + 1); } }, step.delay);
      }
    };
    if (!isTyping) processStep();
    return () => { isMounted = false; clearTimeout(timeoutId); };
  }, [stepIndex]);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [terminalHistory, currentLine]);

  return (
    <div className="min-h-screen pt-28 pb-16">
      <section className="max-w-7xl mx-auto px-4 text-center mb-20 relative flex flex-col items-center">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] -z-10"></div>
         <div className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-slate-900/80 border border-white/10 mb-10 backdrop-blur-xl animate-fade-in-up">
            <div className="w-4 h-4 text-indigo-400">{FLUID_LOGO_SVG}</div>
            <span className="text-white text-[10px] font-bold tracking-widest uppercase">Parmaweb under Development</span>
         </div>
         <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
            Eternally hosted. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">Unstoppable code.</span>
         </h1>
         <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 font-medium tracking-tight">
            The world's first endowment-backed hosting layer. Deploy full-stack dApps to Fluid Chain and pay once for <span className="text-white font-bold">100+ years</span> of guaranteed uptime.
         </p>
         <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button className="px-10 py-5 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-3 shadow-2xl tracking-tight">
                <Globe size={20} /> Claim identity
             </button>
             <button className="px-10 py-5 bg-transparent border-2 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-black rounded-3xl hover:bg-slate-900/50 transition-all flex items-center justify-center gap-3 tracking-tight">
                <Terminal size={20} /> Developer CLI
             </button>
         </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mb-32">
         <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden text-sm relative">
            <div className="bg-slate-800/80 px-6 py-4 flex items-center justify-between">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
               </div>
               <div className="text-slate-500 text-[10px] font-black uppercase tracking-tight flex items-center gap-2">
                 <Terminal size={12}/> fluid-deploy.sh
               </div>
               <div className="w-12"></div>
            </div>
            <div ref={scrollRef} className="p-8 text-slate-300 space-y-2 h-[400px] overflow-y-auto font-medium tracking-tight">
               {terminalHistory.map((item, index) => (
                   <div key={index} className="animate-fade-in-up">
                       {item.type === 'command' ? (
                           <div className="flex flex-wrap items-center">
                               <span className="text-indigo-400 mr-3 font-black">➜</span>
                               <span className="text-slate-400 mr-2">~/fluid-dapp</span>
                               <span className="text-white font-black">{item.content as string}</span>
                           </div>
                       ) : (
                           <div className="flex flex-col pl-7 opacity-80">
                               {Array.isArray(item.content) ? item.content.map((line, i) => (<div key={i} dangerouslySetInnerHTML={{ __html: line }} className="py-0.5" />)) : (<div dangerouslySetInnerHTML={{ __html: item.content as string }} />)}
                           </div>
                       )}
                   </div>
               ))}
               {isTyping && (
                   <div className="flex items-center">
                       <span className="text-indigo-400 mr-3 font-black">➜</span>
                       <span className="text-slate-400 mr-2">~/fluid-dapp</span>
                       <span className="text-white font-black">{currentLine}</span>
                       <span className="animate-pulse bg-indigo-500 w-2 h-5 inline-block ml-1"></span>
                   </div>
               )}
            </div>
         </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 mb-32 relative">
          <div className="text-center mb-12 relative z-10">
             <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter">Reserve your identity</h2>
             <p className="text-slate-500 font-bold text-xs tracking-tight">Decentralized domains managed by Fluid Name Service (FNS)</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
             <form className="relative mb-10 group" onSubmit={e => e.preventDefault()}>
                <input 
                  type="text" 
                  value={domainQuery}
                  onChange={(e) => setDomainQuery(e.target.value.toLowerCase())}
                  placeholder="name-your-dapp"
                  className="w-full bg-slate-950 border border-slate-800 rounded-3xl py-6 pl-8 pr-40 text-2xl font-black text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-900 tracking-tighter"
                />
                <button className="absolute right-3 top-3 bottom-3 bg-white text-slate-950 px-8 rounded-2xl font-black transition-all hover:bg-indigo-500 hover:text-white text-xs tracking-tight">Check</button>
             </form>
             <div className="flex flex-col items-center justify-center py-16 text-slate-700 border-4 border-dashed border-slate-800 rounded-[2.5rem] bg-slate-950/50">
                <Globe size={64} className="mb-6 opacity-10" />
                <p className="font-black text-[10px] tracking-tight">Secure your .fluid tld instantly</p>
             </div>
          </div>
      </section>
    </div>
  );
};

export default HostPage;