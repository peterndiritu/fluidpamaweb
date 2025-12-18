import React, { useState, useEffect, useRef } from 'react';
import { Server, Database, Cloud, Lock, Terminal, Cpu, Globe, ArrowRight, Search, Check, Loader2, Zap, Rocket, Activity, BarChart3, ShieldCheck } from 'lucide-react';

interface TerminalLine {
  type: 'command' | 'output';
  content: string | string[];
}

const HostPage: React.FC = () => {
  // --- Terminal State ---
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- Domain Search State ---
  const [domainQuery, setDomainQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<'idle' | 'available' | 'taken'>('idle');
  const [deployStage, setDeployStage] = useState<number>(0); // 0: Idle, 1: Minting, 2: Storage, 3: Success

  // --- Network Stats ---
  const [latency, setLatency] = useState(582);
  const [blocks, setBlocks] = useState(12450892);

  useEffect(() => {
    const interval = setInterval(() => {
        setLatency(prev => Math.max(400, Math.min(800, prev + (Math.random() * 20 - 10))));
        setBlocks(prev => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // --- Terminal Script Logic ---
  const script = [
    { type: 'command', text: 'npm install -g fluid-cli', delay: 500 },
    { type: 'output', content: ['<span class="text-slate-400">+ fluid-cli@1.0.4</span>', '<span class="text-slate-400">added 12 packages in 2s</span>'], delay: 400 },
    { type: 'command', text: 'fluid init', delay: 800 },
    { type: 'output', content: ['<span class="text-blue-400">?</span> Project name: <span class="text-white">awesome-dapp</span>', '<span class="text-blue-400">?</span> Framework: <span class="text-white">React / Next.js</span>', '<span class="text-blue-400">?</span> Storage: <span class="text-white">Permanent (Parmaweb)</span>'], delay: 600 },
    { type: 'command', text: 'fluid deploy', delay: 800 },
    { type: 'output', content: ['<span class="text-slate-300">> Building project...</span>', '<span class="text-slate-300">> Uploading assets to Primary Node...</span>', '<span class="text-slate-300">> Replicating to Global Network...</span>', '<span class="text-slate-300">> Verifying integrity...</span>'], delay: 600 },
    { type: 'output', content: ['<span class="text-emerald-400 font-bold">✔ Deployment Successful!</span>', 'Access your app at: <span class="underline text-blue-400 cursor-pointer hover:text-blue-300">https://fluid.link/awesome-dapp</span>'], delay: 400 }
  ];

  useEffect(() => {
    let timeoutId: any;
    let isMounted = true;

    const processStep = async () => {
      if (stepIndex >= script.length) {
         timeoutId = setTimeout(() => {
            if (isMounted) {
                setTerminalHistory([]);
                setStepIndex(0);
            }
         }, 8000);
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
            timeoutId = setTimeout(typeChar, 50 + Math.random() * 30);
          } else {
            setIsTyping(false);
            timeoutId = setTimeout(() => {
               if (isMounted) {
                   setTerminalHistory(prev => [...prev, { type: 'command', content: step.text as string }]);
                   setCurrentLine('');
                   setStepIndex(prev => prev + 1);
               }
            }, 300);
          }
        };
        typeChar();
      } else {
        timeoutId = setTimeout(() => {
           if (isMounted) {
               setTerminalHistory(prev => [...prev, { type: 'output', content: step.content as string[] }]);
               setStepIndex(prev => prev + 1);
           }
        }, step.delay);
      }
    };

    if (!isTyping) processStep();

    return () => {
        isMounted = false;
        clearTimeout(timeoutId);
    };
  }, [stepIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalHistory, currentLine]);

  // --- Domain Logic ---
  const handleDomainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainQuery) return;
    
    setIsSearching(true);
    setSearchResult('idle');
    setDeployStage(0);

    // Simulate API search
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult('available');
    }, 1200);
  };

  const handleDeployProcess = () => {
    setDeployStage(1);
    
    // Simulate steps
    setTimeout(() => setDeployStage(2), 2000);
    setTimeout(() => setDeployStage(3), 4500);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 selection:bg-indigo-500/30">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center relative">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] -z-10"></div>
         <div className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-6 animate-pulse">
            <span className="text-indigo-500 font-black uppercase tracking-widest text-xs">Parmaweb Protocol V1 • Permanent Web</span>
         </div>
         <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
            Eternally Hosted. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600">Unstoppable Code.</span>
         </h1>
         <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 font-medium">
            The world's first endowment-backed hosting layer. Deploy full-stack dApps to Fluid Chain and pay once for <span className="text-white font-bold">100+ years</span> of guaranteed uptime.
         </p>
         <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button 
                onClick={() => document.getElementById('domain-search')?.scrollIntoView({ behavior: 'smooth'})}
                className="px-10 py-5 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/25 uppercase tracking-widest text-sm"
             >
                <Globe size={20} /> Claim Parma-Domain
             </button>
             <button className="px-10 py-5 bg-transparent border-2 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-black rounded-3xl hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm">
                <Terminal size={20} /> Developer CLI
             </button>
         </div>
      </section>

      {/* Network Vitals Integration */}
      <section className="max-w-7xl mx-auto px-4 mb-24 grid md:grid-cols-3 gap-6">
          <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] flex flex-col items-center text-center group hover:border-indigo-500/30 transition-all">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform shadow-lg"><Activity size={28}/></div>
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Global Latency</h4>
              <p className="text-4xl font-black text-white">{latency.toFixed(0)}<span className="text-xs text-slate-600 ml-1">ms</span></p>
              <div className="mt-4 flex gap-1 h-8 items-end">
                  {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1.5 bg-indigo-500/30 rounded-full" style={{ height: `${20 + Math.random() * 80}%` }}></div>
                  ))}
              </div>
          </div>
          <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] flex flex-col items-center text-center group hover:border-emerald-500/30 transition-all">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform shadow-lg"><Database size={28}/></div>
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">On-Chain Data</h4>
              <p className="text-4xl font-black text-white">{blocks.toLocaleString()}<span className="text-xs text-slate-600 ml-1">blocks</span></p>
              <p className="text-[10px] text-emerald-500 font-bold uppercase mt-2">~4.2 TB Stored Permanently</p>
          </div>
          <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] flex flex-col items-center text-center group hover:border-blue-500/30 transition-all">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform shadow-lg"><Globe size={28}/></div>
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Validator Nodes</h4>
              <p className="text-4xl font-black text-white">150+<span className="text-xs text-slate-600 ml-1">active</span></p>
              <p className="text-[10px] text-blue-500 font-bold uppercase mt-2">Distributed Across 42 Countries</p>
          </div>
      </section>

      {/* Terminal Visual */}
      <section className="max-w-6xl mx-auto px-4 mb-32 relative">
         <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>
         <div className="bg-slate-900/90 backdrop-blur-md rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm relative">
            <div className="bg-slate-800/80 px-6 py-4 flex items-center justify-between border-b border-slate-700/50">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-rose-500 shadow-lg shadow-rose-500/20"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/20"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20"></div>
               </div>
               <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                 <Terminal size={12}/> fluid-deploy-v1.0.4.sh
               </div>
               <div className="w-12"></div>
            </div>
            <div 
                ref={scrollRef}
                className="p-8 text-slate-300 space-y-2 h-[400px] overflow-y-auto scroll-smooth custom-scrollbar"
            >
               {terminalHistory.map((item, index) => (
                   <div key={index} className="animate-fade-in-up">
                       {item.type === 'command' ? (
                           <div className="flex flex-wrap items-center">
                               <span className="text-indigo-400 mr-3 font-black">➜</span>
                               <span className="text-slate-400 mr-2">~/my-fluid-dapp</span>
                               <span className="text-white font-bold">{item.content as string}</span>
                           </div>
                       ) : (
                           <div className="flex flex-col pl-7 opacity-80">
                               {Array.isArray(item.content) ? (
                                   item.content.map((line, i) => (
                                       <div key={i} dangerouslySetInnerHTML={{ __html: line }} className="py-0.5" />
                                   ))
                               ) : (
                                   <div dangerouslySetInnerHTML={{ __html: item.content as string }} />
                               )}
                           </div>
                       )}
                   </div>
               ))}
               {isTyping && (
                   <div className="flex flex-wrap items-center">
                       <span className="text-indigo-400 mr-3 font-black">➜</span>
                       <span className="text-slate-400 mr-2">~/my-fluid-dapp</span>
                       <span className="text-white font-bold">{currentLine}</span>
                       <span className="animate-pulse bg-indigo-500 w-2 h-5 inline-block ml-1 align-middle"></span>
                   </div>
               )}
               {!isTyping && stepIndex < script.length && (
                   <div className="flex pl-7"><span className="animate-pulse bg-indigo-500/50 w-2 h-5 inline-block align-middle mt-1"></span></div>
               )}
               {!isTyping && stepIndex >= script.length && (
                   <div className="flex items-center">
                       <span className="text-indigo-400 mr-3 font-black">➜</span>
                       <span className="animate-pulse bg-indigo-500 w-2 h-5 inline-block align-middle mt-1"></span>
                   </div>
               )}
            </div>
         </div>
      </section>

      {/* Domain Acquisition Section */}
      <section id="domain-search" className="max-w-4xl mx-auto px-4 mb-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-[100px] pointer-events-none"></div>
          
          <div className="text-center mb-12 relative z-10">
             <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">Reserve Your Identity</h2>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Decentralized domains managed by Fluid Name Service (FNS)</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 shadow-2xl relative z-10 overflow-hidden">
             
             {/* Search Input */}
             <form onSubmit={handleDomainSearch} className="relative mb-10 group">
                <div className="absolute inset-0 bg-indigo-500/5 blur-xl group-focus-within:bg-indigo-500/10 transition-all"></div>
                <input 
                  type="text" 
                  value={domainQuery}
                  onChange={(e) => setDomainQuery(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="name-your-dapp"
                  className="w-full bg-slate-950 border border-slate-800 rounded-3xl py-6 pl-8 pr-40 text-2xl font-black text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-800 shadow-inner relative z-10"
                />
                <button 
                  type="submit"
                  disabled={isSearching || !domainQuery}
                  className="absolute right-3 top-3 bottom-3 bg-white hover:bg-indigo-500 hover:text-white text-slate-950 px-8 rounded-2xl font-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 z-20 uppercase text-xs tracking-widest"
                >
                  {isSearching ? <Loader2 className="animate-spin" size={16}/> : <Search size={16}/>}
                  Check
                </button>
             </form>

             {/* Results Area */}
             <div className="space-y-4 min-h-[220px]">
                
                {isSearching && (
                   <div className="flex flex-col items-center justify-center py-16 text-slate-600">
                      <div className="w-16 h-16 border-4 border-slate-800 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
                      <p className="font-black uppercase tracking-widest text-[10px]">Scanning FNS Nodes...</p>
                   </div>
                )}

                {!isSearching && searchResult === 'idle' && (
                    <div className="flex flex-col items-center justify-center py-16 text-slate-700 border-4 border-dashed border-slate-800 rounded-[2.5rem] bg-slate-950/50">
                       <Globe size={64} className="mb-6 opacity-10" />
                       <p className="font-black uppercase tracking-widest text-[10px]">Secure your .fluid TLD instantly</p>
                    </div>
                )}

                {!isSearching && searchResult === 'available' && deployStage === 0 && (
                   <div className="animate-fade-in-up space-y-4">
                      
                      {/* Fluid Domain (FREE) */}
                      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-emerald-500/10 via-indigo-500/5 to-slate-900 border border-emerald-500/30 rounded-[2.5rem] relative overflow-hidden group hover:scale-[1.01] transition-transform">
                         <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[9px] font-black px-4 py-1 rounded-bl-2xl uppercase tracking-widest">Protocol Preferred</div>
                         <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-lg">
                               <Check size={28} />
                            </div>
                            <div>
                               <h3 className="text-2xl font-black text-white tracking-tight">{domainQuery}<span className="text-indigo-400">.fluid</span></h3>
                               <p className="text-[10px] text-emerald-400 font-black flex items-center gap-2 uppercase tracking-widest mt-1">
                                  <Zap size={10} /> Parmaweb Compatible
                               </p>
                            </div>
                         </div>
                         <div className="text-right flex items-center gap-6">
                            <div>
                               <div className="text-[10px] text-slate-600 line-through font-black uppercase tracking-widest">$25.00/yr</div>
                               <div className="text-2xl font-black text-white">FREE</div>
                            </div>
                            <button 
                               onClick={handleDeployProcess}
                               className="bg-white text-slate-950 px-6 py-4 rounded-2xl font-black hover:bg-emerald-400 transition-all shadow-xl uppercase text-xs tracking-widest active:scale-95"
                            >
                               Claim Identity
                            </button>
                         </div>
                      </div>

                      {/* Comparison Info */}
                      <p className="text-[9px] text-slate-700 font-black uppercase tracking-[0.2em] text-center mt-6">Alternative Chain Status</p>
                      <div className="grid grid-cols-2 gap-4 opacity-50">
                          <div className="flex items-center justify-between p-5 bg-slate-950 border border-slate-800 rounded-3xl">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 font-bold">E</div>
                                <span className="text-xs font-bold text-slate-400">{domainQuery}.eth</span>
                             </div>
                             <span className="text-xs font-black text-slate-600">$180+</span>
                          </div>
                          <div className="flex items-center justify-between p-5 bg-slate-950 border border-slate-800 rounded-3xl">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 font-bold">S</div>
                                <span className="text-xs font-bold text-slate-400">{domainQuery}.sol</span>
                             </div>
                             <span className="text-xs font-black text-slate-600">$20+</span>
                          </div>
                      </div>

                   </div>
                )}

                {/* Deployment Animation State */}
                {deployStage > 0 && (
                    <div className="py-12 px-6 bg-black/40 rounded-[2.5rem] border border-indigo-500/20 text-center animate-fade-in-up relative overflow-hidden">
                        <div className="absolute inset-0 bg-indigo-500/5 animate-pulse pointer-events-none"></div>
                        {deployStage < 3 ? (
                            <div className="flex flex-col items-center relative z-10">
                                <div className="relative w-24 h-24 mb-8">
                                    <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                                    <Rocket className="absolute inset-0 m-auto text-indigo-400 animate-pulse" size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">Propagating Identity</h3>
                                <div className="space-y-3">
                                    <div className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full border transition-all ${deployStage >= 1 ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' : 'text-slate-700 border-transparent'}`}>
                                       <Check size={14} className={deployStage >= 1 ? "opacity-100" : "opacity-0"} />
                                       Minting FNS Entry: {domainQuery}.fluid
                                    </div>
                                    <div className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full border transition-all ${deployStage >= 2 ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' : 'text-slate-700 border-transparent'}`}>
                                       <Check size={14} className={deployStage >= 2 ? "opacity-100" : "opacity-0"} />
                                       Allocating Perpetual Storage (12/12 Nodes)
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center animate-fade-in-up relative z-10">
                                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(16,185,129,0.3)] border-8 border-slate-900">
                                    <ShieldCheck size={48} className="text-black" />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-2 tracking-tight uppercase">Permanently Live</h3>
                                <p className="text-slate-500 font-bold mb-8 text-sm px-10">Your decentralized Parmaweb instance is now immutable and globally redundant.</p>
                                <div className="bg-slate-950 p-6 rounded-3xl border border-indigo-500/30 flex items-center gap-4 group cursor-pointer hover:border-indigo-500 transition-all shadow-2xl">
                                    <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:bg-indigo-400 group-hover:text-black transition-colors"><Globe size={20} /></div>
                                    <div className="text-left">
                                        <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Live URL</p>
                                        <span className="text-blue-400 font-black text-lg underline-offset-4 underline group-hover:text-white transition-colors">
                                            https://{domainQuery}.fluid.link
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

             </div>
          </div>
      </section>

      {/* Interactive Network Vitals Panel */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
          <div className="p-10 bg-gradient-to-br from-indigo-950/20 to-slate-950 border border-slate-800 rounded-[3.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px]"></div>
              <div className="flex flex-col lg:flex-row gap-16 items-center">
                  <div className="lg:w-1/2 space-y-8">
                      <div className="space-y-4">
                        <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Hosting Vitals & <br/>Network Health</h2>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed">
                            Fluid Chain uses a decentralized <span className="text-white">Proof-of-Useful-Storage</span> mechanism. Every Parmaweb site is automatically replicated across 12 high-uptime validator nodes.
                        </p>
                      </div>
                      <div className="space-y-4">
                          <div className="flex items-center gap-4 p-5 bg-slate-900 border border-slate-800 rounded-3xl group hover:border-emerald-500/30 transition-all">
                              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:bg-emerald-400 group-hover:text-black transition-colors"><Zap size={20}/></div>
                              <div>
                                  <p className="text-xs font-black text-white uppercase tracking-widest">Self-Healing Storage</p>
                                  <p className="text-[11px] text-slate-500 font-bold mt-0.5">Automated recovery if nodes disconnect.</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-4 p-5 bg-slate-900 border border-slate-800 rounded-3xl group hover:border-cyan-500/30 transition-all">
                              <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-colors"><ShieldCheck size={20}/></div>
                              <div>
                                  <p className="text-xs font-black text-white uppercase tracking-widest">DDoS Immunity</p>
                                  <p className="text-[11px] text-slate-500 font-bold mt-0.5">Native multi-layered protection on every infrastructure node.</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="lg:w-1/2 w-full">
                      <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative">
                          <div className="flex justify-between items-center mb-4">
                              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Network Map</h4>
                              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span className="text-[8px] font-black text-emerald-400 uppercase">Synced</span></div>
                          </div>
                          <div className="grid grid-cols-4 gap-4">
                              {[...Array(12)].map((_, i) => (
                                  <div key={i} className="flex flex-col items-center gap-2">
                                      <div className="w-full aspect-square bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center group hover:border-indigo-500/50 transition-all cursor-default">
                                          <div className={`w-3 h-3 rounded-full transition-all ${Math.random() > 0.1 ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-rose-500/30'}`}></div>
                                      </div>
                                      <span className="text-[7px] text-slate-700 font-black uppercase tracking-widest">Node {i + 1}</span>
                                  </div>
                              ))}
                          </div>
                          <div className="pt-4 border-t border-slate-800 flex justify-between text-[8px] font-black uppercase tracking-[0.2em] text-slate-600">
                              <span>Total Hosts: 12,450</span>
                              <span>Network Uptime: 100%</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

    </div>
  );
};

export default HostPage;