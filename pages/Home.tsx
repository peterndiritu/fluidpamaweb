import React, { useState, useEffect } from 'react';
import GeminiImageEditor from '../components/GeminiImageEditor';
import FluidAssistant from '../components/FluidAssistant';
import HowItWorks from '../components/HowItWorks';
import { ArrowRight, Zap, Globe, ShieldCheck, Database, Layers, Sparkles, ArrowUpRight, ArrowDownLeft, Plus, Fingerprint, Bell, ChevronDown } from 'lucide-react';

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
      title: "Non-custodial wallet",
      desc: "True ownership. Your private keys are encrypted on your device. Support for 10+ chains including ETH, SOL, and BTC.",
      icon: ShieldCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "2M+ TPS blockchain",
      desc: "Fluid Chain delivers sub-second finality and infinite scalability via dynamic sharding architecture.",
      icon: Zap,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Parmaweb hosting",
      desc: "Censorship-resistant permanent hosting. Pay once in Fluid tokens and store your dApps forever.",
      icon: Database,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    }
  ];

  return (
    <div className="flex flex-col gap-0 selection:bg-cyan-500/30">
        <section className="relative bg-transparent pt-24 pb-12 overflow-hidden text-center">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-cyan-500/20 mb-6 backdrop-blur-md">
                    <Sparkles size={12} className="text-cyan-400" />
                    <span className="text-cyan-400 text-[9px] font-black tracking-[0.2em] uppercase">Fluid super vault access</span>
                </div>

                <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-tight italic">
                    Store. Spend. Host.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600 not-italic">Infinitely and eternally.</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Integrated dex, fiat ramps, RWA, cards and hosting in one advanced non-custodial hub. The most complete multichain ecosystem on the market.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => onNavigate('buy')} className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm shadow-xl shadow-cyan-500/20">
                        Buy Fluid <ArrowRight size={20} />
                    </button>
                    <button onClick={() => onNavigate('wallet')} className="px-10 py-5 bg-slate-900 border border-slate-800 text-white font-black rounded-2xl hover:bg-slate-800 transition-all uppercase tracking-widest text-sm">
                        Access vault
                    </button>
                </div>
            </div>
        </section>

        <section className="py-24 bg-transparent relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase italic">The Fluid <span className="text-cyan-500 not-italic">advantage</span></h2>
                    <p className="text-slate-400 max-w-2xl mx-auto font-medium">Next-generation infrastructure for the decentralized future.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group">
                            <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <GeminiImageEditor />
        <FluidAssistant />
        <HowItWorks />
    </div>
  );
};

export default Home;