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
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      pillar: "Store"
    },
    {
      title: "Global Spending",
      desc: "Fluid Cards bridged to global bank rails with 0% fee ramps for seamless liquidity.",
      icon: CreditCard,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      pillar: "Spend"
    },
    {
      title: "Yield Engine",
      desc: "Earn passive rewards via native staking and endowment-backed liquidity incentives.",
      icon: Zap,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      pillar: "Earn"
    },
    {
      title: "Atomic Swaps",
      desc: "Sub-second finality on the fastest Layer-1 DEX bridging all major networks instantly.",
      icon: RefreshCw,
      color: "text-indigo-400",
      bg: "bg-indigo-400/10",
      pillar: "Swap"
    },
    {
      title: "Perm. Hosting",
      desc: "Eternally hosted dApps on Parmaweb. One-time payment for zero-downtime infra.",
      icon: Database,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      pillar: "Host"
    }
  ];

  return (
    <div className="flex flex-col gap-0 selection:bg-cyan-500/30">
        <section className="relative bg-transparent pt-48 pb-16 overflow-hidden text-center flex flex-col items-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[140px] animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-slate-900/80 border border-white/10 mb-10 backdrop-blur-xl animate-fade-in-up">
                    <div className="w-4 h-4 text-cyan-400">{FLUID_LOGO_SVG}</div>
                    <span className="text-white text-[10px] font-bold tracking-widest uppercase">Ecosystem under Development</span>
                </div>

                <div className="mb-10 animate-fade-in-up delay-100">
                    <h1 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                        Store <span className="text-slate-700">.</span> Spend <span className="text-slate-700">.</span> Earn <span className="text-slate-700">.</span> Swap <span className="text-slate-700">.</span> Host
                    </h1>
                    <h2 className="text-4xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 tracking-tighter leading-[1.1] mt-2">
                        Securely <br className="hidden md:block" /> Infinitely & Eternally.
                    </h2>
                </div>

                <p className="text-base md:text-xl text-slate-400 mb-14 max-w-4xl mx-auto leading-relaxed font-medium animate-fade-in-up delay-200 tracking-tight">
                    The first Layer-1 blockchain delivering <span className="text-white font-bold">2M+ TPS</span> with zero-downtime hosting. 
                    Multichain non-custodial sovereignty.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-300">
                    <button 
                        onClick={() => onNavigate('buy')} 
                        className="group w-full sm:w-auto px-10 py-4 bg-white text-slate-950 font-black rounded-lg hover:bg-cyan-50 transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
                    >
                        Join presale <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                        onClick={() => onNavigate('blockchain')} 
                        className="w-full sm:w-auto px-10 py-4 bg-slate-900/50 backdrop-blur-md border border-white/10 text-white font-black rounded-lg hover:bg-slate-800 transition-all text-xs uppercase tracking-widest"
                    >
                        View technology
                    </button>
                </div>
            </div>
        </section>

        <section className="py-24 bg-slate-950/40 relative border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight uppercase">Ecosystem pillars</h2>
                    <p className="text-slate-600 font-bold tracking-[0.2em] text-[10px] uppercase">Integrated solutions for institutional finance</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div key={idx} className="scroll-card p-8 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/20 transition-all group relative overflow-hidden flex flex-col h-full">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                <feature.icon size={120} />
                            </div>
                            <div className="flex justify-between items-start mb-10">
                                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform shadow-2xl border border-white/5`}>
                                    <feature.icon size={24} />
                                </div>
                                <span className="text-[9px] font-black text-slate-700 bg-white/5 px-2 py-1 rounded border border-white/5 tracking-widest uppercase">{feature.pillar}</span>
                            </div>
                            <h3 className="text-lg font-black text-white mb-4 tracking-tight">{feature.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium mb-8 flex-grow tracking-tight">{feature.desc}</p>
                            <button className="flex items-center gap-2 text-cyan-400 font-bold text-[10px] uppercase group/btn hover:text-cyan-300 transition-colors tracking-widest">
                                Protocol Docs <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </button>
                        </div>
                    ))}
                    
                    <div className="lg:col-span-1 p-8 rounded-2xl bg-gradient-to-br from-indigo-600/10 to-cyan-600/10 border border-indigo-500/10 flex flex-col justify-center text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-tech-grid opacity-10"></div>
                        <h3 className="text-2xl font-black text-white mb-4 tracking-tighter relative z-10">2M+ TPS</h3>
                        <p className="text-indigo-400/80 font-bold text-[11px] relative z-10 mb-8 uppercase tracking-widest">Sharded mainnet throughput</p>
                        <button onClick={() => onNavigate('wallet')} className="bg-white text-slate-950 py-3 rounded-lg font-black text-[10px] uppercase tracking-widest relative z-10 hover:bg-indigo-50 transition-colors shadow-xl">Launch explorer</button>
                    </div>
                </div>
            </div>
        </section>

        <HowItWorks />

        <section className="py-40 bg-transparent relative text-center overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none"></div>
            
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight uppercase">
                    The <span className="text-cyan-400">Fluid</span> shift.
                </h2>
                <p className="text-slate-500 text-lg md:text-xl mb-14 font-medium leading-relaxed tracking-tight">
                    Secure your place in the first sharded Layer-1 with integrated permanent hosting.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                    <button onClick={() => onNavigate('buy')} className="px-10 py-4 bg-cyan-600 text-white font-black rounded-lg hover:bg-cyan-500 transition-all text-[10px] tracking-widest uppercase shadow-2xl shadow-cyan-900/40">
                        Enter presale
                    </button>
                    <button onClick={() => onNavigate('docs')} className="px-10 py-4 bg-slate-900 border border-slate-800 text-white font-black rounded-lg hover:bg-slate-800 transition-all text-[10px] tracking-widest uppercase">
                        Technical Papers
                    </button>
                </div>
            </div>
        </section>
    </div>
  );
};

export default Home;