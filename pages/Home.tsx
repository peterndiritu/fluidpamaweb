
import React from 'react';
import HowItWorks from '../components/HowItWorks';
import { 
  ArrowRight, Zap, Globe, ShieldCheck, Database, RefreshCw, 
  CreditCard, ArrowUpRight, Cpu, TrendingUp, PieChart, Star, 
  Layers, Workflow, Landmark
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
  onOpenWhitepaper: () => void;
}

const FLUID_LOGO_SVG = (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
    <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
  </svg>
);

const Home: React.FC<HomeProps> = ({ onNavigate, onOpenWhitepaper }) => {
  return (
    <div className="flex flex-col bg-slate-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
        {/* Background blobs matching the reference image */}
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/[0.02] rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          
          {/* Main Hero Header with Logo */}
          <div className="flex flex-col items-center animate-fade-in-up">
            <div className="flex items-center gap-4 mb-0">
              <div className="w-16 h-16 text-white p-2">
                {FLUID_LOGO_SVG}
              </div>
              <h1 className="text-8xl md:text-[9rem] font-black text-white tracking-tighter leading-none">
                Fluid
              </h1>
            </div>

            {/* Tagline Block */}
            <div className="space-y-0 -mt-2">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-white">
                Store. spend. host.
              </h2>
              <h3 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-white mb-6">
                Infinitely.
              </h3>
            </div>

            {/* Description Block - More compact */}
            <div className="max-w-xl space-y-4 mb-8 px-4">
              <p className="text-sm md:text-base font-bold text-white tracking-tight leading-relaxed">
                The first Layer-1 blockchain delivering <span className="text-white">2M+ TPS</span> with <span className="text-white">zero-downtime hosting</span>. Secure, multichain non-custodial crypto wallet.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => onNavigate('token')}
                className="group px-8 py-4 bg-white text-slate-950 font-black rounded-full text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
              >
                Buy FLUID <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('blockchain')}
                className="px-8 py-4 bg-slate-900/40 backdrop-blur-3xl border border-white/10 text-white font-black rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl"
              >
                Network Specs
              </button>
            </div>
          </div>
        </div>

        {/* Visual Engine - Compressed and matching the screenshot layout */}
        <div className="mt-12 w-full max-w-4xl px-4 relative animate-fade-in-up">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900/50 border border-white/5 backdrop-blur-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-2xl">
               <div className="flex flex-col gap-4 mb-6 md:mb-0">
                  <div className="flex items-center gap-4 group">
                     <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20"><Layers size={16}/></div>
                     <div>
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Throughput Capacity</span>
                        <span className="text-xs font-black text-white uppercase italic">2.4M TPS / SHARDED</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                     <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20"><Star size={16}/></div>
                     <div>
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Revenue Model</span>
                        <span className="text-xs font-black text-white uppercase italic">Programmatic Yield</span>
                     </div>
                  </div>
               </div>

               {/* Small Center Spinner */}
               <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-dashed border-cyan-500/10 rounded-full animate-[spin_30s_linear_infinite]"></div>
                  <div className="w-10 h-10 rounded-xl bg-fluid-gradient animate-gradient-x flex items-center justify-center text-white shadow-2xl">
                     <TrendingUp size={16} />
                  </div>
               </div>

               <div className="flex flex-col gap-4 items-end">
                  <div className="text-right group">
                     <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Settlement Finality</span>
                     <span className="text-xs font-black text-white uppercase italic">Deterministic ~600ms</span>
                  </div>
                  <div className="text-right group">
                     <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Node Security</span>
                     <span className="text-xs font-black text-white uppercase italic">Proof-of-Useful-Storage</span>
                  </div>
               </div>
            </div>
        </div>
      </section>

      {/* Revenue Section */}
      <section className="py-24 bg-slate-950 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div className="space-y-8">
                <div>
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6">
                     <Workflow size={12} /> The blockenable mechanism
                   </div>
                   <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none mb-4">
                      Ecosystem <br/><span className="text-fluid-gradient">Revenue Flow</span>.
                   </h2>
                   <p className="text-slate-400 text-lg leading-relaxed font-medium">
                      Fluid isn't just another speculative asset. It's a high-frequency financial engine that programmatically siphons fees from the DEX, Card Network, and Parmaweb Storage.
                   </p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                   <div className="p-6 bg-slate-900/50 rounded-[2rem] border border-white/5 shadow-xl">
                      <div className="w-10 h-10 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-4"><Star size={20}/></div>
                      <h4 className="text-white font-black uppercase italic text-sm mb-2">Genesis Status</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">Own FLUID during presale to lock-in your perpetual dividend rights.</p>
                   </div>
                   <div className="p-6 bg-slate-900/50 rounded-[2rem] border border-white/5 shadow-xl">
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-4"><Cpu size={20}/></div>
                      <h4 className="text-white font-black uppercase italic text-sm mb-2">Node Rewards</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">Nodes earn 60% of commercial profits plus native block emissions.</p>
                   </div>
                </div>
             </div>

             <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/10 blur-[150px] rounded-full animate-pulse"></div>
                <div className="relative p-8 bg-slate-900 border border-white/10 rounded-[3rem] shadow-2xl">
                   <h3 className="text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8">Revenue flow architecture</h3>
                   <div className="space-y-4">
                      {[
                        { label: 'DEX Trading Fees', val: '0.3% per tx', icon: RefreshCw },
                        { label: 'Card FX Margins', val: '0.1% spread', icon: Landmark },
                        { label: 'Host Storage Fees', val: 'One-time fee', icon: Database }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-950 border border-white/5 rounded-2xl">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-emerald-500"><item.icon size={16}/></div>
                              <span className="text-[10px] font-black text-white uppercase tracking-tight">{item.label}</span>
                           </div>
                           <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{item.val}</span>
                        </div>
                      ))}
                      <div className="flex justify-center py-2">
                         <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-cyan-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="p-5 bg-fluid-gradient animate-gradient-x rounded-2xl text-center shadow-2xl">
                         <span className="text-[9px] font-black text-white/70 uppercase tracking-[0.3em] block mb-1">Blockenable distribution</span>
                         <span className="text-xl font-black text-white uppercase italic tracking-tighter">Automated Payouts</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <HowItWorks />
    </div>
  );
};

export default Home;
