import React, { useState, useEffect } from 'react';
import GeminiImageEditor from '../components/GeminiImageEditor';
import FluidAssistant from '../components/FluidAssistant';
import HowItWorks from '../components/HowItWorks';
import { Wallet, ArrowRight, CreditCard, ArrowLeftRight, Server, Lock, Repeat, Zap, Globe, ShieldCheck, Database, Layers, ChevronDown, Sparkles, ArrowUpRight, ArrowDownLeft, Plus, Fingerprint, Bell } from 'lucide-react';

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
  const [isLoadingPartners, setIsLoadingPartners] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingPartners(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: "Non-Custodial Wallet",
      desc: "True ownership. Your private keys are encrypted on your device. Support for 10+ chains including ETH, SOL, and BTC.",
      icon: ShieldCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "2M+ TPS Blockchain",
      desc: "Fluid Chain delivers sub-second finality and infinite scalability via dynamic sharding architecture.",
      icon: Zap,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Parmaweb Hosting",
      desc: "Censorship-resistant permanent hosting. Pay once in FLUID tokens and store your dApps forever.",
      icon: Server,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      title: "Endowment Economy",
      desc: "A revolutionary economic model where storage fees generate yield to sustain network costs indefinitely.",
      icon: Database,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "Transparent & Efficient",
      desc: "Zero hidden fees. Real-time on-chain transparency for all transactions and hosting allocations.",
      icon: Layers,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10"
    },
    {
      title: "Global Fiat Ramp",
      desc: "Seamlessly move between crypto and fiat. Spend globally with virtual cards and instant bank transfers.",
      icon: Globe,
      color: "text-pink-500",
      bg: "bg-pink-500/10"
    }
  ];

  return (
    <div className="flex flex-col gap-0 selection:bg-cyan-500/30">
        {/* ==========================================
            1. HERO LAYER
           ========================================== */}
        <div className="relative bg-transparent pt-16 pb-6 flex flex-col justify-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[150px] animate-pulse"></div>
              <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse delay-700"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-cyan-500/20 mb-3 animate-fade-in-up backdrop-blur-md shadow-lg">
                    <Sparkles size={12} className="text-cyan-400" />
                    <span className="text-cyan-400 text-[9px] font-black tracking-[0.2em] uppercase">Super Vault Access</span>
                  </div>

                  <div className="flex items-center justify-center gap-3 mb-3 animate-fade-in-up">
                    <svg width="36" height="36" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-slate-900 dark:text-white">
                        <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
                        <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
                        <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
                    </svg>
                    <h1 className="font-black text-4xl md:text-5xl tracking-tighter text-slate-900 dark:text-white leading-none">Fluid</h1>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter animate-fade-in-up leading-tight max-w-3xl">
                    Store. Spend. Host.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">Infinitely & Eternally.</span>
                  </h2>

                  <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto leading-relaxed animate-fade-in-up font-medium">
                    Integrated <span className="text-white font-bold">DEX</span>, <span className="text-white font-bold">Fiat Ramps</span>, <span className="text-white font-bold">RWA</span>, <span className="text-white font-bold">Cards</span> and <span className="text-white font-bold">Hosting</span> in one advanced non-custodial hub.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 w-full justify-center animate-fade-in-up">
                      <button 
                        onClick={() => onNavigate('buy')}
                        className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-base hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 uppercase tracking-wider"
                      >
                        Buy FLUID <ArrowRight size={18} strokeWidth={3} />
                      </button>
                      <button 
                         onClick={() => onNavigate('blockchain')}
                         className="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-black text-base hover:bg-white/10 hover:border-cyan-500/50 transition-all uppercase tracking-wider"
                      >
                        Protocol
                      </button>
                  </div>
              </div>
            </div>
        </div>

        {/* ==========================================
            2. INTERACTIVE WALLET SECTION (LINKED)
           ========================================== */}
        <section className="relative py-4 flex flex-col items-center group/wallet-section">
            <div className="max-w-7xl mx-auto px-4 w-full flex flex-col items-center relative z-10">
                <div 
                    onClick={() => onNavigate('wallet')} 
                    className="relative cursor-pointer transition-all duration-700 hover:scale-[1.01] active:scale-95 perspective-2000 scale-[0.8] md:scale-[0.85] origin-top"
                >
                    <div className="absolute -top-12 -left-12 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl animate-pulse delay-700"></div>

                    <div className="relative w-full max-w-[340px] h-[580px] bg-slate-950 border-[8px] border-slate-900 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden transition-transform duration-500 hover:rotate-x-1">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-b-xl z-50 flex items-center justify-center">
                            <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
                        </div>

                        <div className="h-full w-full bg-slate-950 flex flex-col p-5 pt-10">
                             <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 text-white">{FLUID_LOGO_SVG}</div>
                                    <span className="font-black text-xs italic text-white uppercase">fluid</span>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500"><Bell size={12}/></div>
                                    <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500"><Fingerprint size={12}/></div>
                                </div>
                             </div>

                             <div className="text-center mb-6">
                                <p className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1">Vault Assets</p>
                                <p className="text-3xl font-black text-white tracking-tighter">$125,440.00</p>
                                <div className="flex items-center justify-center gap-1 mt-1 text-emerald-400 text-[8px] font-bold">
                                    <ArrowUpRight size={10} /> +12.4%
                                </div>
                             </div>

                             <div className="flex justify-center gap-3 mb-6">
                                <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center text-slate-950 shadow-lg"><ArrowUpRight size={16}/></div>
                                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white"><ArrowDownLeft size={16}/></div>
                                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white"><Plus size={16}/></div>
                             </div>

                             <div className="space-y-2 flex-1 overflow-hidden opacity-40 scale-95 origin-top">
                                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-lg bg-slate-950"></div>
                                        <div className="flex flex-col">
                                            <div className="w-12 h-2 bg-slate-800 rounded-full mb-1"></div>
                                            <div className="w-8 h-1.5 bg-slate-900 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="w-10 h-4 bg-slate-900 rounded-lg"></div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* ==========================================
            3. FEATURES SECTION
           ========================================== */}
        <section className="py-24 bg-transparent relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter uppercase italic">The Fluid <span className="text-cyan-500 not-italic">Edge</span></h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">Advanced infrastructure for the decentralized future.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group">
                            <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ==========================================
            4. AI TOOLS & INFRASTRUCTURE
           ========================================== */}
        <GeminiImageEditor />
        <FluidAssistant />
        <HowItWorks />

        {/* ==========================================
            5. FINAL CTA
           ========================================== */}
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem] shadow-2xl">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase">Ready to enter the <span className="text-cyan-400">Vault?</span></h2>
                    <p className="text-slate-400 mb-10 text-lg font-medium">Join the next generation of finance and data sovereignty today.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => onNavigate('buy')} className="px-10 py-4 bg-cyan-500 text-slate-950 font-black rounded-2xl hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20 uppercase tracking-widest text-sm">Get Started</button>
                        <button onClick={() => onNavigate('docs')} className="px-10 py-4 bg-transparent border border-white/20 text-white font-black rounded-2xl hover:bg-white/5 transition-all uppercase tracking-widest text-sm">Read Docs</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};

export default Home;