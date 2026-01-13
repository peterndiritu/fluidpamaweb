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
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-4 overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_70%)]"></div>
        
        {/* Animated Background Gradients */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          
          {/* Main Hero Header with Logo - Updated to Sentence Case */}
          <div className="flex flex-col items-center animate-fade-in-up">
            <div className="flex items-center gap-6 mb-2">
              <div className="w-16 h-16 md:w-24 md:h-24 text-white p-2 animate-pulse-slow drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                {FLUID_LOGO_SVG}
              </div>
              <h1 className="text-7xl md:text-[11rem] font-black text-white tracking-tighter leading-none italic">
                Fluid
              </h1>
            </div>

            {/* Tagline Block - Updated to Sentence Case & Gradient Sync */}
            <div className="space-y-0 mt-4">
              <h2 className="text-3xl md:text-7xl font-black tracking-tighter leading-tight italic text-fluid-gradient">
                Store. spend. host.
              </h2>
              <h3 className="text-5xl md:text-9xl font-black tracking-tighter leading-none italic text-white mb-8">
                Infinitely.
              </h3>
            </div>

            {/* Description Block */}
            <div className="max-w-3xl space-y-4 mb-10 px-4">
              <p className="text-lg md:text-2xl font-bold text-slate-300 tracking-tight leading-relaxed">
                The first Layer-1 blockchain delivering <span className="text-white">2M+ TPS</span> with <span className="text-white italic">zero-downtime hosting</span>. 
                Secure, multichain non-custodial crypto wallet.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => onNavigate('token')}
                className="group px-14 py-6 bg-white text-slate-950 font-black rounded-3xl text-sm uppercase tracking-[0.4em] shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:scale-105 transition-all flex items-center gap-4"
              >
                Buy FLUID <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('blockchain')}
                className="px-14 py-6 bg-slate-900/40 backdrop-blur-3xl border border-white/10 text-white font-black rounded-3xl text-sm uppercase tracking-[0.4em] hover:bg-slate-800 transition-all shadow-xl"
              >
                Network Specs
              </button>
            </div>
          </div>
        </div>

        {/* Visual Engine - Now using Synchronized Gradient */}
        <div className="mt-8 w-full max-w-5xl px-4 relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative aspect-[21/6] rounded-[3.5rem] overflow-hidden bg-slate-900/50 border border-white/5 backdrop-blur-3xl p-6 flex items-center justify-between shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
               <div className="absolute inset-0 bg-tech-grid opacity-[0.03]"></div>
               
               <div className="flex-1 flex flex-col gap-4">
                  <div className="flex items-center gap-4 group">
                     <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform"><Layers size={20}/></div>
                     <div>
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Throughput Capacity</span>
                        <span className="text-md font-black text-white italic">2.4M TPS / SHARDED</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                     <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform"><Star size={20}/></div>
                     <div>
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Revenue Model</span>
                        <span className="text-md font-black text-white italic">Programmatic Yield</span>
                     </div>
                  </div>
               </div>

               {/* Center Spinner with Brand Gradient */}
               <div className="relative w-28 h-28 md:w-40 md:h-40 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-dashed border-cyan-500/20 rounded-full animate-[spin_30s_linear_infinite]"></div>
                  <div className="absolute inset-3 border border-white/5 rounded-full"></div>
                  <div className="w-14 h-14 rounded-[1.2rem] bg-fluid-gradient animate-gradient-x flex items-center justify-center text-white shadow-[0_0_60px_rgba(34,211,238,0.3)] group hover:scale-110 transition-transform cursor-pointer">
                     <TrendingUp size={24} />
                  </div>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                    <div key={deg} className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,1)]" style={{ transform: `rotate(${deg}deg) translate(50px)` }}></div>
                  ))}
               </div>

               <div className="flex-1 flex flex-col gap-4 items-end">
                  <div className="text-right group">
                     <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Settlement Finality</span>
                     <span className="text-md font-black text-white italic">Deterministic ~600ms</span>
                  </div>
                  <div className="text-right group">
                     <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Node Security</span>
                     <span className="text-md font-black text-white italic">Proof-of-Useful-Storage</span>
                  </div>
               </div>
            </div>
        </div>
      </section>

      {/* Revenue Section */}
      <section className="py-16 bg-white dark:bg-slate-950 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div className="space-y-8">
                <div>
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6">
                     <Workflow size={12} /> The blockenable mechanism
                   </div>
                   <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-none mb-4">
                      Ecosystem <br/><span className="text-fluid-gradient">Revenue Flow</span>.
                   </h2>
                   <p className="text-slate-400 text-lg leading-relaxed font-medium">
                      Fluid isn't just another speculative asset. It's a high-frequency financial engine that programmatically siphons fees from the DEX, Card Network, and Parmaweb Storage, distributing them directly to its core supporters.
                   </p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                   <div className="p-6 bg-slate-900/50 rounded-[2rem] border border-white/5 group hover:border-cyan-500/20 transition-all shadow-xl">
                      <div className="w-10 h-10 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-4 shadow-inner"><Star size={20}/></div>
                      <h4 className="text-white font-black uppercase italic text-sm mb-2">Genesis Status</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">Own FLUID during presale to lock-in your perpetual dividend rights. 40% of global fee volume flows to this pool.</p>
                   </div>
                   <div className="p-6 bg-slate-900/50 rounded-[2rem] border border-white/5 group hover:border-emerald-500/20 transition-all shadow-xl">
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-4 shadow-inner"><Cpu size={20}/></div>
                      <h4 className="text-white font-black uppercase italic text-sm mb-2">Node Rewards</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">Nodes earn 60% of commercial profits plus native block emissions, ensuring the most robust security in L1 history.</p>
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
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-950 border border-white/5 rounded-2xl shadow-inner group">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform"><item.icon size={16}/></div>
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

      {/* Feature Grid */}
      <section className="py-16 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase italic leading-none">Unrivaled Infrastructure</h2>
            <p className="text-slate-500 font-black tracking-[0.4em] text-[10px] uppercase leading-relaxed">Scaling human digital interaction</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Edge Storage", desc: "Instant retrieval from sharded clusters globally. Zero latency for decentralized hosting.", icon: Cpu, pillar: "Infrastructure" },
              { title: "Fluid Wallet", desc: "Secure non-custodial management for crypto and fiat with integrated banking rails.", icon: ShieldCheck, pillar: "Sovereignty" },
              { title: "Global Card", desc: "Spend your crypto anywhere with physical and virtual cards. Real-time fiat bridges.", icon: CreditCard, pillar: "Payments" },
              { title: "Infinite Scale", desc: "A sharded Layer-1 built to handle 2M+ TPS with absolute mathematical finality.", icon: Zap, pillar: "Protocol" }
            ].map((feature, idx) => (
              <div key={idx} className="scroll-card p-6 rounded-[2rem] bg-slate-900/40 border border-white/5 flex flex-col h-full transition-all group hover:border-cyan-500/20 shadow-xl">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-slate-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-all shadow-inner">
                  <feature.icon size={20} />
                </div>
                <h3 className="text-lg font-black text-white mb-3 uppercase italic">{feature.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-grow font-medium tracking-tight">{feature.desc}</p>
                <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">{feature.pillar}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* CTA */}
      <section className="py-20 bg-slate-950 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">Initialize <br/><span className="text-fluid-gradient">Genesis</span>.</h2>
          <p className="text-slate-400 text-lg mb-10 font-medium leading-relaxed max-w-xl mx-auto">
            Become a founding member of the first sharded Layer-1 with integrated profit sharing and permanent hosting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('token')}
              className="px-10 py-5 bg-white text-slate-950 font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              Secure Dividend Rights
            </button>
            <button 
              onClick={() => onNavigate('docs')}
              className="px-10 py-5 bg-transparent border border-white/20 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
            >
              Read Whitepaper
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
