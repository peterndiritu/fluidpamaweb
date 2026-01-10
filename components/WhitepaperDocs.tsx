import React, { useState, useEffect } from 'react';
import { 
  Layers, Shield, Zap, Database, Lock, Repeat, TrendingUp, Cpu, 
  Globe, Activity, Smartphone, Star, ShieldCheck, HardDrive, 
  Network, Coins, ShieldAlert, Gauge, Fingerprint, Landmark, 
  Infinity as InfinityIcon, ChevronRight, Server, Box, GitMerge,
  Cpu as CpuIcon, ArrowRight, Share2, RefreshCw, PieChart, ArrowDownRight,
  TrendingDown, DollarSign, Code, FileCode, CheckCircle2, Workflow,
  ArrowUpRight, BarChart3, Binary, Building2, Terminal, Info, 
  AlertCircle, ChevronDown, CheckCircle, Scale, CreditCard, ArrowRightLeft,
  Key, Eye, MousePointer2, Link, Layout, Users
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell, PieChart as RePie, 
  Pie, Legend, LineChart, Line 
} from 'recharts';

// --- TECHNICAL DATA FLOW SCHEMAS & SIMULATIONS ---

const MathBlock = ({ children }: { children?: React.ReactNode }) => (
  <div className="my-8 p-8 bg-slate-100 dark:bg-slate-900/80 rounded-[2rem] border-l-8 border-blue-600 dark:border-cyan-500 font-mono text-xs md:text-sm overflow-x-auto selection:bg-cyan-500/40 shadow-inner">
    <div className="flex items-center gap-2 mb-4 text-slate-500 dark:text-slate-400">
        <Scale size={14} />
        <span className="text-[10px] font-black uppercase tracking-widest">Formal Notation</span>
    </div>
    {children}
  </div>
);

const RevenueFlowSchema = () => (
  <div className="my-12 p-10 bg-slate-950 border border-white/5 rounded-[3rem] relative overflow-hidden group">
    <div className="absolute inset-0 bg-tech-grid opacity-[0.05] pointer-events-none"></div>
    <h5 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-12 text-center">Fig 8.0: Distributed Revenue Protocol (DRP) Data Flow</h5>
    
    <div className="flex flex-col items-center gap-6 relative z-10">
      {/* Sources */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
        {[
          { label: "DEX FEE (0.3%)", icon: ArrowRightLeft, desc: "Atomic Swaps" },
          { label: "HOST RENT", icon: Server, desc: "Parmaweb Storage" },
          { label: "CARD FX (0.1%)", icon: CreditCard, desc: "Fiat Network" }
        ].map((s, i) => (
          <div key={i} className="p-4 bg-slate-900 rounded-2xl border border-white/5 flex flex-col items-center text-center">
            <s.icon size={18} className="text-emerald-500 mb-2" />
            <span className="text-[9px] font-black text-white uppercase mb-1">{s.label}</span>
            <span className="text-[8px] text-slate-500 font-bold uppercase">{s.desc}</span>
          </div>
        ))}
      </div>

      <div className="h-10 w-px bg-emerald-500/30 animate-pulse"></div>

      {/* Collector */}
      <div className="px-12 py-6 bg-slate-900 border-2 border-emerald-500/30 rounded-3xl flex flex-col items-center shadow-[0_0_30px_rgba(16,185,129,0.1)]">
        <Workflow className="text-emerald-400 mb-2" size={24} />
        <span className="text-[10px] font-black text-white uppercase tracking-widest">DRP SMART CONTRACT</span>
        <span className="text-[8px] text-emerald-600 font-bold mt-1 italic">Real-Time Siphoning</span>
      </div>

      <div className="flex w-full max-w-lg items-start justify-between gap-8 pt-4">
        <div className="flex flex-col items-center text-center flex-1">
          <div className="h-8 w-px bg-blue-500/30 mb-2"></div>
          <div className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-2xl w-full">
            <Star className="text-blue-400 mx-auto mb-2" size={20} />
            <span className="text-[10px] font-black text-white block uppercase">40% GENESIS</span>
            <span className="text-[8px] text-blue-500 font-bold uppercase italic">Buyers Dividend</span>
          </div>
        </div>
        <div className="flex flex-col items-center text-center flex-1">
          <div className="h-8 w-px bg-cyan-500/30 mb-2"></div>
          <div className="p-5 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl w-full">
            <Cpu className="text-cyan-400 mx-auto mb-2" size={20} />
            <span className="text-[10px] font-black text-white block uppercase">60% NODES</span>
            <span className="text-[8px] text-cyan-500 font-bold uppercase italic">Validator Reward</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SocialShardingSchema = () => (
  <div className="my-10 p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] relative overflow-hidden">
     <h5 className="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em] mb-10 text-center">Social Key Recovery (Shamir Secret Sharing)</h5>
     <div className="flex flex-col items-center gap-8 relative z-10">
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-950 shadow-2xl mb-2">
                <Key size={32} />
            </div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Master Key</span>
        </div>
        
        <div className="flex items-center gap-12">
            {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col items-center gap-3">
                    <div className="h-10 w-px bg-gradient-to-b from-rose-500 to-transparent"></div>
                    <div className="p-4 bg-slate-800 border border-white/10 rounded-xl">
                        <Share2 size={16} className="text-rose-400" />
                    </div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Share {i}</span>
                </div>
            ))}
        </div>
        
        <div className="mt-4 p-5 bg-slate-950 border border-rose-500/20 rounded-2xl text-center">
            <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest">Threshold reached: 2/3 shares</p>
            <p className="text-[11px] text-slate-400 mt-2 italic font-medium">"Automatic Vault Reconstruction Activated"</p>
        </div>
     </div>
  </div>
);

const ShardHeatmap = () => {
    const [activeNodes, setActiveNodes] = useState<number[]>([]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveNodes(Array.from({ length: 64 }, () => Math.random() > 0.7 ? 1 : 0));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="my-10 p-8 bg-slate-950 rounded-[3rem] border border-white/5 relative overflow-hidden group no-print">
            <div className="absolute inset-0 bg-tech-grid opacity-[0.05] pointer-events-none"></div>
            <h5 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-8 text-center">Fig 6.0: Global Validator Shard Entropy (Live Simulation)</h5>
            
            <div className="grid grid-cols-8 gap-2 max-w-xs mx-auto">
                {activeNodes.length > 0 ? activeNodes.map((active, i) => (
                    <div 
                        key={i} 
                        className={`aspect-square rounded-md transition-all duration-700 ${
                            active ? 'bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-slate-800'
                        }`}
                    ></div>
                )) : Array.from({ length: 64 }).map((_, i) => <div key={i} className="aspect-square rounded-md bg-slate-800"></div>)}
            </div>
            
            <div className="mt-8 flex justify-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    <span className="text-[8px] font-black text-slate-500 uppercase">Committing</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                    <span className="text-[8px] font-black text-slate-500 uppercase">Idle / Standby</span>
                </div>
            </div>
        </div>
    );
};

const EmissionGraph = () => {
  const data = Array.from({ length: 21 }, (_, i) => {
    const t = i * 10; 
    const emission = 90 * (1 - Math.exp(-0.02 * t)); 
    return { year: t, supply: parseFloat(emission.toFixed(2)) };
  });

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSupply" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.1} />
          <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} label={{ value: 'Years', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#64748b' }} />
          <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} unit="M" />
          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '1rem', fontSize: '10px' }} />
          <Area type="monotone" dataKey="supply" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorSupply)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- MAIN WHITEPAPER COMPONENT ---

const WhitepaperDocs: React.FC = () => {
  return (
    <div className="space-y-48 py-12 docs-section selection:bg-cyan-500/30">
      
      {/* 01. Purpose and Scope */}
      <section id="wp-abstract" className="animate-fade-in-up">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-1.5 w-16 bg-blue-600 dark:bg-cyan-500 rounded-full"></div>
          <span className="text-sm font-black text-blue-600 dark:text-cyan-400 uppercase tracking-[0.5em]">01.00</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-16 leading-none">The Systemic <br/><span className="text-blue-600 dark:text-cyan-500">Constraint</span></h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 text-xl leading-relaxed space-y-12">
          <p className="text-3xl font-medium text-slate-800 dark:text-slate-200 italic border-l-8 border-cyan-500 pl-10 py-6 bg-slate-50 dark:bg-slate-900/50 rounded-r-[3rem] shadow-xl">
            "Fluid Protocol defines a non-monolithic Layer-1 architecture where the cost of network state is neutralized by programmatic yield."
          </p>
          <p>
            Current distributed ledgers suffer from the <strong>Decentralization Bottleneck</strong>: as state grows, validator hardware requirements increase, leading to node consolidation. Fluid solves this via <strong>State Partitioning σ(A)</strong>, which routes account data into ephemeral, redundant clusters.
          </p>
        </div>
      </section>

      {/* 02. Formal Consensus Theory */}
      <section id="wp-blockchain" className="animate-fade-in-up">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-1.5 w-16 bg-blue-600 dark:bg-cyan-500 rounded-full"></div>
          <span className="text-sm font-black text-blue-600 dark:text-cyan-400 uppercase tracking-[0.5em]">02.00</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-20 leading-none">Blockchain <br/><span className="text-blue-600 dark:text-cyan-400">Features</span></h2>
        
        <div className="space-y-16">
          <div className="grid md:grid-cols-2 gap-12">
             <div className="space-y-6">
                <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">2.1 Proof-of-Fluidity (PoF)</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                   A gossip-optimized BFT model leveraging Torrent-style propagation. Let {'$V$'} be the total validator set:
                </p>
                <MathBlock>
                    {`f < |V| / 3`}<br/>
                    {`Q = ⌊ 2/3 * |V| ⌋ + 1`}<br/>
                    {`Throughput(B) ∝ log(N_total)`}
                </MathBlock>
             </div>
             <div className="space-y-6">
                <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">2.2 Dynamic Sharding</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                   The network autonomously partitions state into 1,024 shards. Each shard maintains its own independent mempool and execution thread.
                </p>
                <div className="p-6 bg-slate-900 border border-white/5 rounded-3xl">
                   <div className="flex justify-between items-end mb-4">
                      <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">Shard #842 Load</span>
                      <span className="text-lg font-black text-white">82%</span>
                   </div>
                   <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 w-[82%] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                   </div>
                </div>
             </div>
          </div>

          <ShardHeatmap />
        </div>
      </section>

      {/* 03. Wallet Ecosystem */}
      <section id="wp-wallet" className="animate-fade-in-up">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-1.5 w-16 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
          <span className="text-sm font-black text-purple-600 dark:text-purple-400 uppercase tracking-[0.5em]">03.00</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-20 leading-none">Wallet <br/><span className="text-purple-600 dark:text-purple-400">Ecosystem</span></h2>
        
        <div className="grid md:grid-cols-2 gap-12">
           <div className="space-y-6">
              <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">3.1 Hardware-Isolated Vault</h4>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                 Fluid Vault utilizes Device Enclave (TEE) signatures. Keys are never exposed to the OS layer, ensuring immunity to malware-based extraction.
              </p>
              <div className="p-8 bg-slate-900 border border-white/5 rounded-3xl flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400"><ShieldCheck size={24}/></div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">TEE Signed</span>
                 </div>
                 <div className="h-px flex-1 bg-slate-800 mx-4"></div>
                 <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[9px] font-black text-emerald-500 uppercase">Verified</div>
              </div>
           </div>
           
           <div className="space-y-6">
              <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">3.2 Fiat Integration (Fluid Card)</h4>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                 Our card bridge allows real-time liquidation of on-chain assets for POS terminals via the <strong>Liquidity-to-Fiat (L2F)</strong> relay.
              </p>
              <div className="p-6 bg-slate-950 border border-white/5 rounded-3xl space-y-3">
                 {[
                    { s: "Merchant", d: "Auth Request" },
                    { s: "Shard Oracle", d: "Balance Check" },
                    { s: "Settlement", d: "Fiat Payout" }
                 ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase">
                       <span className="text-slate-500">{item.s}</span>
                       <ArrowRight size={12} className="text-cyan-500" />
                       <span className="text-white">{item.d}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 pt-12">
            <div className="space-y-6">
                <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">3.3 Atomic DEX & dApp Portal</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                   Fluid DEX enables cross-shard swaps with zero slippage via <strong>Intent-Based Routing</strong>. The dApp browser sandboxes third-party code for total safety.
                </p>
                <MathBlock>
                   {`Swap(x, y) = batch_exec(σ_842, σ_101)`}<br/>
                   {`Slippage = 0 ∀ batch_volume < Shard_Liquidity`}
                </MathBlock>
            </div>
            <div className="space-y-6">
                <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">3.4 Enhanced Security</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                   Beyond TEE, we implement <strong>Post-Quantum Signature Schemes (Dilithium)</strong> and Social Key Sharding.
                </p>
                <SocialShardingSchema />
            </div>
        </div>
      </section>

      {/* 04. Parmaweb & Endowment */}
      <section id="wp-hosting" className="animate-fade-in-up">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-400 rounded-full"></div>
          <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.5em]">04.00</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-20 leading-none">Endowment <br/><span className="text-indigo-600 dark:text-indigo-400">Economy</span></h2>
        
        <div className="space-y-16">
          <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-xl">
            Fluid achieves digital permanence via the <strong>Endowment Principle</strong>. One-time payments fund programmatic yield that pays nodes indefinitely.
          </p>
          
          <MathBlock>
             {`Principal_P = Host_Fee(D)`}<br/>
             {`Yield_Y(t) = Principal_P * ROI(t)`}<br/>
             {`Constraint: Yield_Y(t) > Node_Rent(t) ∀ t > 0`}
          </MathBlock>

          <RevenueFlowSchema />
        </div>
      </section>

      {/* 05. Tokenomics */}
      <section id="wp-tokenomics" className="animate-fade-in-up">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-1.5 w-16 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
          <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.5em]">05.00</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-20 leading-none">Emission <br/><span className="text-emerald-600 dark:text-emerald-400">Dynamics</span></h2>
        
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-10">
            <h4 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight leading-none">Asymptotic Decay</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg">
              Fluid supply converges to 100M units. 90M are minted over 200 years to sustain network security indefinitely.
            </p>
            <MathBlock>
              {`E(t) = E_0 * e^{-λt}`}<br/>
              {`∫₀^∞ E(t) dt = 90,000,000`}
            </MathBlock>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-2xl">
             <EmissionGraph />
          </div>
        </div>
      </section>

      {/* Final Statement */}
      <section className="mt-32 p-20 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-cyan-500 dark:to-blue-600 rounded-[6rem] text-white shadow-2xl relative overflow-hidden group text-center">
         <div className="absolute top-0 right-0 p-16 opacity-20 pointer-events-none group-hover:scale-110 transition-transform"><CpuIcon size={300} /></div>
         <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-12 leading-none">Build on <br/>Permanence.</h3>
         <p className="text-white/90 text-2xl md:text-3xl font-medium max-w-5xl mx-auto leading-relaxed mb-16">
           Join the genesis of a sharded, sovereign internet.
         </p>
         <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-16 py-6 bg-white text-slate-950 font-black rounded-3xl text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-cyan-50 active:scale-95 transition-all">
           Initialize Shard Genesis
         </button>
      </section>
    </div>
  );
};

export default WhitepaperDocs;