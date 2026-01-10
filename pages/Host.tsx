
import React, { useState, useEffect, useRef } from 'react';
// Fix: Added Wallet as WalletIcon to the lucide-react imports to resolve 'Cannot find name WalletIcon' error.
import { Server, Database, Lock, Terminal, Cpu, Globe, ArrowRight, Search, Check, Loader2, Zap, Rocket, Activity, ShieldCheck, Globe2, Infinity as InfinityIcon, HardDrive, Wallet as WalletIcon } from 'lucide-react';

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
    <div className="min-h-screen pt-28 pb-16 bg-slate-950 text-white selection:bg-indigo-500/30">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 text-center mb-24 relative flex flex-col items-center">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-500/5 rounded-full blur-[140px] -z-10"></div>
         
         <div className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-slate-900/80 border border-white/10 mb-12 backdrop-blur-xl animate-fade-in-up">
            <div className="w-4 h-4 text-indigo-400">{FLUID_LOGO_SVG}</div>
            <span className="text-white text-[10px] font-bold tracking-widest uppercase italic">Parmaweb Protocol V2</span>
         </div>

         <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
            Eternally Hosted. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600 italic">Unstoppable Code.</span>
         </h1>
         
         <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-14 font-medium leading-relaxed tracking-tight">
            The world's first endowment-backed hosting layer. Deploy full-stack dApps to Fluid Chain and pay once for <span className="text-white font-bold">100+ years</span> of guaranteed uptime. Built for the sharded internet.
         </p>

         <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button className="px-10 py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-3 shadow-2xl text-[10px] uppercase tracking-[0.2em]">
                <Globe size={18} /> Register Identity
             </button>
             <button className="px-10 py-5 bg-transparent border border-white/10 text-white font-black rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em]">
                <Terminal size={18} /> Developer CLI
             </button>
         </div>
      </section>

      {/* Network Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-slate-900/40 border border-white/5 rounded-[3rem] backdrop-blur-xl">
            <div className="text-center group">
               <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-2 group-hover:text-indigo-400 transition-colors">Global Nodes</span>
               <span className="text-2xl font-black text-white">150+ ACTIVE</span>
            </div>
            <div className="text-center group border-l border-white/5">
               <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-2 group-hover:text-indigo-400 transition-colors">Avg Latency</span>
               <span className="text-2xl font-black text-indigo-400">{latency}ms</span>
            </div>
            <div className="text-center group border-l border-white/5">
               <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-2 group-hover:text-indigo-400 transition-colors">Storage Redundancy</span>
               <span className="text-2xl font-black text-white">24 SHARDS</span>
            </div>
            <div className="text-center group border-l border-white/5">
               <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-2 group-hover:text-indigo-400 transition-colors">Blocks Stored</span>
               <span className="text-2xl font-black text-white">{blocks.toLocaleString()}</span>
            </div>
         </div>
      </section>

      {/* Terminal Section */}
      <section className="max-w-5xl mx-auto px-4 mb-40 scroll-card">
         <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter italic">One Command. Forever.</h2>
            <p className="text-slate-500 font-bold text-[10px] tracking-[0.3em] uppercase">Built for high-velocity engineering teams</p>
         </div>
         
         <div className="bg-slate-900 rounded-[3rem] border border-slate-800 shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden text-sm relative group">
            <div className="absolute inset-0 bg-tech-grid opacity-[0.05] pointer-events-none"></div>
            <div className="bg-slate-800/80 px-8 py-5 flex items-center justify-between border-b border-slate-700/50">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
               </div>
               <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                 <Terminal size={14} className="text-indigo-400"/> ~/fluid-deploy.sh
               </div>
               <div className="w-12"></div>
            </div>
            
            <div ref={scrollRef} className="p-10 text-slate-300 space-y-4 h-[450px] overflow-y-auto font-mono tracking-tight bg-slate-950/50 relative z-10 scrollbar-hide">
               {terminalHistory.map((item, index) => (
                   <div key={index} className="animate-fade-in-up">
                       {item.type === 'command' ? (
                           <div className="flex flex-wrap items-center">
                               <span className="text-indigo-400 mr-3 font-black">➜</span>
                               <span className="text-slate-500 mr-2">~/fluid-dapp</span>
                               <span className="text-white font-bold">{item.content as string}</span>
                           </div>
                       ) : (
                           <div className="flex flex-col pl-7 opacity-80 leading-relaxed">
                               {Array.isArray(item.content) ? item.content.map((line, i) => (<div key={i} dangerouslySetInnerHTML={{ __html: line }} className="py-0.5" />)) : (<div dangerouslySetInnerHTML={{ __html: item.content as string }} />)}
                           </div>
                       )}
                   </div>
               ))}
               {isTyping && (
                   <div className="flex items-center">
                       <span className="text-indigo-400 mr-3 font-black">➜</span>
                       <span className="text-slate-500 mr-2">~/fluid-dapp</span>
                       <span className="text-white font-bold">{currentLine}</span>
                       <span className="animate-pulse bg-indigo-500 w-2 h-5 inline-block ml-1"></span>
                   </div>
               )}
            </div>
            
            <div className="absolute bottom-6 right-10 flex gap-4 pointer-events-none opacity-20">
               <HardDrive size={64} className="text-indigo-500" />
               <Globe2 size={64} className="text-indigo-400" />
            </div>
         </div>
      </section>

      {/* Identity Registry */}
      <section className="max-w-4xl mx-auto px-4 mb-40 relative">
          <div className="text-center mb-16 relative z-10">
             <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase leading-none">The Permanent <br/><span className="text-indigo-400">Registry</span>.</h2>
             <p className="text-slate-500 font-bold text-[10px] tracking-[0.3em] uppercase mt-6">Decentralized domains via Fluid Name Service (FNS)</p>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none"></div>
             
             <form className="relative mb-12" onSubmit={e => e.preventDefault()}>
                <div className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-700">
                   <Search size={32} />
                </div>
                <input 
                  type="text" 
                  value={domainQuery}
                  onChange={(e) => setDomainQuery(e.target.value.toLowerCase())}
                  placeholder="name-your-dapp"
                  className="w-full bg-slate-950 border border-slate-800 rounded-3xl py-8 pl-20 pr-48 text-3xl font-black text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-900 tracking-tighter"
                />
                <button className="absolute right-4 top-4 bottom-4 bg-white text-slate-950 px-10 rounded-2xl font-black transition-all hover:bg-indigo-500 hover:text-white text-xs uppercase tracking-widest shadow-xl">Search</button>
             </form>

             <div className="grid md:grid-cols-3 gap-6 relative z-10">
                {[
                   { title: 'Censorship Proof', desc: 'Immutable records stored on the sharded L1.', icon: ShieldCheck },
                   { title: 'Sub-Second Resolve', desc: 'Optimized gossip routing for instant DNS.', icon: Zap },
                   { title: 'Wallet Integrated', desc: 'Send assets directly to your .fluid name.', icon: WalletIcon }
                ].map((item, i) => (
                   <div key={i} className="p-6 bg-slate-950/50 rounded-[2rem] border border-white/5 group-hover:border-indigo-500/20 transition-all">
                      <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-6"><item.icon size={20}/></div>
                      <h4 className="text-sm font-black text-white uppercase tracking-tight mb-2">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-widest">{item.desc}</p>
                   </div>
                ))}
             </div>
          </div>
      </section>

      {/* Final CTA */}
      <section className="text-center px-4 relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] -z-10"></div>
         <div className="max-w-4xl mx-auto p-16 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-[4rem] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
            <InfinityIcon className="w-16 h-16 mx-auto text-indigo-400 mb-8 animate-bounce-slow" />
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 italic leading-tight">Your digital legacy starts here.</h3>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-medium">Join 12,000+ developers hosting the future of the internet on Parmaweb.</p>
            <button className="px-12 py-5 bg-white text-slate-950 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all">
               Get Started for 0 FLD
            </button>
         </div>
      </section>
    </div>
  );
};

export default HostPage;
