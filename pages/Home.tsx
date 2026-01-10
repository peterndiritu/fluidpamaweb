import React from 'react';
import HowItWorks from '../components/HowItWorks';
import { ArrowRight, Zap, Globe, ShieldCheck, Database, RefreshCw, CreditCard, ArrowUpRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const FLUID_LOGO_SVG = (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
    <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
  </svg>
);

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const features = [
    {
      title: "Secure Storage",
      desc: "Vault-grade multichain sovereignty over your assets with institutional-grade security protocols.",
      icon: ShieldCheck,
      color: "text-blue-600 dark:text-cyan-400",
      bg: "bg-blue-600/10 dark:bg-cyan-400/10",
      pillar: "Store"
    },
    {
      title: "Global Spending",
      desc: "Fluid Cards bridged to global bank rails with 0% fee ramps for seamless liquidity.",
      icon: CreditCard,
      color: "text-indigo-600 dark:text-blue-400",
      bg: "bg-indigo-600/10 dark:bg-blue-400/10",
      pillar: "Spend"
    },
    {
      title: "Yield Engine",
      desc: "Earn passive rewards via native staking and endowment-backed liquidity incentives.",
      icon: Zap,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-600/10 dark:bg-emerald-400/10",
      pillar: "Earn"
    },
    {
      title: "Atomic Swaps",
      desc: "Sub-second finality on the fastest Layer-1 DEX bridging all major networks instantly.",
      icon: RefreshCw,
      color: "text-purple-600 dark:text-indigo-400",
      bg: "bg-purple-600/10 dark:bg-indigo-400/10",
      pillar: "Swap"
    },
    {
      title: "Perm. Hosting",
      desc: "Eternally hosted dApps on Parmaweb. One-time payment for zero-downtime infra.",
      icon: Database,
      color: "text-pink-600 dark:text-purple-400",
      bg: "bg-pink-600/10 dark:bg-purple-400/10",
      pillar: "Host"
    }
  ];

  return (
    <div className="flex flex-col gap-0 selection:bg-blue-500/30 dark:selection:bg-cyan-500/30 transition-colors duration-300">
        <section className="relative bg-transparent pt-48 pb-16 overflow-hidden text-center flex flex-col items-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 dark:bg-cyan-500/5 rounded-full blur-[140px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 dark:bg-indigo-600/5 rounded-full blur-[140px] animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 mb-10 backdrop-blur-xl animate-fade-in-up shadow-lg">
                    <div className="w-4 h-4 text-blue-600 dark:text-cyan-400">{FLUID_LOGO_SVG}</div>
                    <span className="text-slate-900 dark:text-white text-[10px] font-black tracking-widest uppercase italic leading-none">Ecosystem Live Alpha</span>
                </div>

                <div className="mb-12 animate-fade-in-up delay-100">
                    <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-tight uppercase">
                        Store <span className="text-slate-300 dark:text-slate-700">.</span> Spend <span className="text-slate-300 dark:text-slate-700">.</span> Earn <span className="text-slate-300 dark:text-slate-700">.</span> Swap <span className="text-slate-300 dark:text-slate-700">.</span> Host
                    </h1>
                    <h2 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 dark:from-cyan-400 dark:via-blue-500 dark:to-indigo-600 tracking-tighter leading-[1.1] mt-2 italic">
                        Securely <br className="hidden md:block" /> Infinitely & Eternally.
                    </h2>
                </div>

                <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 mb-16 max-w-4xl mx-auto leading-relaxed font-medium animate-fade-in-up delay-200 tracking-tight">
                    The first Layer-1 blockchain delivering <span className="text-slate-900 dark:text-white font-black italic underline decoration-blue-500 dark:decoration-cyan-400 underline-offset-8">2M+ TPS</span> with zero-downtime hosting. 
                    Multichain non-custodial sovereignty.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-300 pb-20">
                    <button 
                        onClick={() => onNavigate('token')} 
                        className="group w-full sm:w-auto px-12 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em] shadow-2xl"
                    >
                        Enter presale <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                    <button 
                        onClick={() => onNavigate('blockchain')} 
                        className="w-full sm:w-auto px-12 py-5 bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-xs uppercase tracking-[0.2em] shadow-lg"
                    >
                        View technology
                    </button>
                </div>
            </div>
        </section>

        <section className="py-32 bg-white dark:bg-slate-950/40 relative border-y border-slate-100 dark:border-white/5 transition-colors">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-24">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter uppercase italic leading-none">Ecosystem pillars</h2>
                    <p className="text-slate-400 dark:text-slate-600 font-black tracking-[0.4em] text-[10px] uppercase leading-relaxed">High-performance solutions for sovereign finance</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="scroll-card p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 hover:border-blue-500 dark:hover:border-cyan-500/20 transition-all group relative overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-500">
                                <feature.icon size={140} />
                            </div>
                            <div className="flex justify-between items-start mb-12">
                                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform shadow-xl border border-white/10`}>
                                    <feature.icon size={28} />
                                </div>
                                <span className="text-[10px] font-black text-slate-400 dark:text-slate-700 bg-white dark:bg-white/5 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-white/5 tracking-[0.2em] uppercase">{feature.pillar}</span>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight uppercase italic">{feature.title}</h3>
                            <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed font-medium mb-10 flex-grow tracking-tight">{feature.desc}</p>
                            <button className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-black text-[10px] uppercase group/btn hover:opacity-80 transition-opacity tracking-widest leading-none">
                                Technical Paper <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                    
                    <div className="lg:col-span-1 p-10 rounded-[3rem] bg-gradient-to-br from-blue-600/10 to-indigo-600/10 dark:from-indigo-600/10 dark:to-cyan-600/10 border border-blue-500/10 dark:border-indigo-500/10 flex flex-col justify-center text-center relative overflow-hidden group shadow-lg">
                        <div className="absolute inset-0 bg-tech-grid opacity-[0.05] dark:opacity-10"></div>
                        <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter relative z-10 italic">2M+ TPS</h3>
                        <p className="text-blue-600 dark:text-indigo-400 font-black text-[10px] relative z-10 mb-10 uppercase tracking-[0.3em]">Sharded mainnet capacity</p>
                        <button onClick={() => onNavigate('blockchain')} className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] relative z-10 hover:opacity-90 transition-all shadow-2xl">Fluid Explorer</button>
                    </div>
                </div>
            </div>
        </section>

        <HowItWorks />

        <section className="py-48 bg-transparent relative text-center overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 dark:bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none"></div>
            
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter uppercase italic leading-none">
                    The <span className="text-blue-600 dark:text-cyan-400">Fluid</span> shift.
                </h2>
                <p className="text-slate-500 dark:text-slate-500 text-xl md:text-2xl mb-16 font-medium leading-relaxed tracking-tight">
                    Secure your place in the first sharded Layer-1 with integrated permanent hosting.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button onClick={() => onNavigate('token')} className="px-12 py-5 bg-blue-600 dark:bg-cyan-600 text-white font-black rounded-2xl hover:opacity-90 transition-all text-xs tracking-[0.2em] uppercase shadow-2xl shadow-blue-500/30">
                        Join Presale
                    </button>
                    <button onClick={() => onNavigate('docs')} className="px-12 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-black rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-xs tracking-[0.2em] uppercase shadow-lg">
                        Technical Specs
                    </button>
                </div>
            </div>
        </section>
    </div>
  );
};

export default Home;