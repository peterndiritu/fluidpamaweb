import React from 'react';
import { 
  Layers, Shield, Zap, Database, Lock, Repeat, TrendingUp, Cpu, 
  Globe, Activity, Smartphone, Star, ShieldCheck, HardDrive, 
  Network, Coins, ShieldAlert, Gauge, Fingerprint, Landmark, 
  Infinity as InfinityIcon, ChevronRight, Server, Box, GitMerge,
  Cpu as CpuIcon, ArrowRight, Share2, RefreshCw
} from 'lucide-react';

// --- Internal Visual Components for the Whitepaper ---

const NetworkTopologyDiagram = () => (
  <div className="my-12 p-8 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-inner relative overflow-hidden">
    <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none"></div>
    <div className="relative z-10">
      <h5 className="text-[10px] font-black text-blue-600 dark:text-cyan-400 uppercase tracking-[0.3em] mb-8 text-center">Fig 1.0: Layered Sharding Topology</h5>
      <div className="flex flex-col items-center gap-6">
        {/* Coordination Layer */}
        <div className="w-full max-w-md p-4 bg-white dark:bg-slate-800 rounded-2xl border-2 border-blue-500/30 text-center shadow-xl">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Layer 0</span>
          <span className="text-xs font-black text-slate-900 dark:text-white uppercase italic">Global Coordination Layer (Beacon)</span>
        </div>
        
        <div className="h-8 w-px bg-gradient-to-b from-blue-500 to-cyan-500"></div>

        {/* Shard Clusters */}
        <div className="flex justify-center gap-4 w-full overflow-x-auto pb-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col items-center gap-4 min-w-[120px]">
              <div className="p-3 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-white/10 text-center w-full">
                <span className="text-[8px] font-black text-cyan-500 block">SHARD {i}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map(n => (
                  <div key={n} className="w-6 h-6 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center text-slate-400 font-black text-xl px-4">...</div>
          <div className="flex flex-col items-center gap-4 min-w-[120px]">
            <div className="p-3 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-white/10 text-center w-full">
              <span className="text-[8px] font-black text-cyan-500 block">SHARD 1024</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
               {[1, 2, 3, 4].map(n => (
                  <div key={n} className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text-[9px] text-slate-500 text-center mt-6 uppercase font-bold tracking-widest">Protocol-Enforced Asynchronous Linear Scaling</p>
    </div>
  </div>
);

const DataFlowSchema = () => (
  <div className="my-12 flex flex-col items-center gap-4">
    <h5 className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-4">Fig 2.0: Parmaweb Persistence Pipeline</h5>
    <div className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-between gap-4">
       {[
         { icon: Lock, label: 'Client Encryption', color: 'text-blue-500' },
         { icon: GitMerge, label: 'Reed-Solomon Splitting', color: 'text-indigo-500' },
         { icon: Share2, label: 'Gossip Distribution', color: 'text-purple-500' },
         { icon: ShieldCheck, label: 'ZK-Proof Validation', color: 'text-emerald-500' }
       ].map((step, i, arr) => (
         <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl shadow-lg w-full md:w-40 hover:scale-105 transition-transform">
               <div className={`w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center ${step.color} shadow-inner`}>
                  <step.icon size={20} />
               </div>
               <span className="text-[8px] font-black text-slate-500 uppercase text-center leading-tight tracking-widest">{step.label}</span>
            </div>
            {i < arr.length - 1 && (
              <div className="hidden md:block">
                 <ArrowRight size={20} className="text-slate-300 dark:text-slate-700" />
              </div>
            )}
         </React.Fragment>
       ))}
    </div>
  </div>
);

const EndowmentCycleDiagram = () => (
  <div className="my-12 p-10 bg-slate-950 rounded-[4rem] border border-white/5 relative overflow-hidden group">
    <div className="absolute inset-0 bg-tech-grid opacity-10"></div>
    <div className="relative z-10 flex flex-col items-center">
       <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          {/* Circular Path */}
          <div className="absolute inset-0 border-[3px] border-dashed border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
          
          {/* Center */}
          <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex flex-col items-center justify-center text-slate-950 shadow-[0_0_50px_rgba(34,211,238,0.3)] group-hover:scale-110 transition-transform">
             <Landmark size={32} />
             <span className="text-[10px] font-black uppercase mt-1">Protocol Pool</span>
          </div>

          {/* Satellites */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-slate-900 border border-white/10 rounded-2xl flex flex-col items-center gap-1 shadow-2xl">
             <Coins size={16} className="text-emerald-400" />
             <span className="text-[8px] font-black text-white uppercase tracking-widest">Entry Fee</span>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-4 bg-slate-900 border border-white/10 rounded-2xl flex flex-col items-center gap-1 shadow-2xl">
             <TrendingUp size={16} className="text-cyan-400" />
             <span className="text-[8px] font-black text-white uppercase tracking-widest">Yield Gen</span>
          </div>
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-slate-900 border border-white/10 rounded-2xl flex flex-col items-center gap-1 shadow-2xl">
             <Zap size={16} className="text-yellow-400" />
             <span className="text-[8px] font-black text-white uppercase tracking-widest">Node Payout</span>
          </div>
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 p-4 bg-slate-900 border border-white/10 rounded-2xl flex flex-col items-center gap-1 shadow-2xl">
             <Box size={16} className="text-purple-400" />
             <span className="text-[8px] font-black text-white uppercase tracking-widest">Storage Provision</span>
          </div>
       </div>
       <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-16">Fig 3.0: Perpetual Yield Equilibrium</h5>
    </div>
  </div>
);

const WhitepaperDocs: React.FC = () => {
  return (
    <div className="space-y-32 py-12 docs-section selection:bg-cyan-500/30">
      {/* 01. Abstract */}
      <section id="wp-abstract">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-12 bg-blue-600 dark:bg-cyan-500"></div>
          <span className="text-sm font-black text-blue-600 dark:text-cyan-500 uppercase tracking-[0.4em]">01.00</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-12">Abstract</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 text-lg leading-relaxed space-y-6">
          <p className="text-2xl font-medium text-slate-800 dark:text-slate-200 italic border-l-4 border-cyan-500 pl-8 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-r-3xl">
            "Fluid Protocol introduces a hyper-scalable, sharded Layer-1 blockchain ecosystem designed to unify decentralized storage with institutional-grade financial liquidity."
          </p>
          <p>
            The protocol addresses the 'State Bloat' and 'Centralized Gateway' problems pervasive in legacy L1/L2 solutions. By implementing <strong>Dynamic State Sharding</strong> and the <strong>Parmaweb</strong> persistent hosting layer, Fluid ensures that both transaction data and application front-ends are hosted natively within the consensus layer, backed by a perpetual economic endowment.
          </p>
        </div>
      </section>

      {/* 02. Blockchain Architecture & Features */}
      <section id="wp-blockchain">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-12 bg-blue-600 dark:bg-cyan-500"></div>
          <span className="text-sm font-black text-blue-600 dark:text-cyan-500 uppercase tracking-[0.4em]">02.00</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-12">Blockchain <br/><span className="text-blue-600 dark:text-cyan-500">Infrastructure</span></h2>
        
        <div className="space-y-12">
          <div className="p-10 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform"><Network size={160} /></div>
             <div className="relative z-10">
                <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase mb-6 italic tracking-tight leading-none">Torrent BFT Consensus</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Fluid utilizes <strong>Torrent BFT</strong>, a proprietary high-fidelity gossip protocol that optimizes block propagation across thousands of nodes. It integrates <strong>BLS Multi-Signatures</strong> to reduce bandwidth requirements for shard-to-shard validation.
                </p>
                
                <NetworkTopologyDiagram />

                <div className="grid md:grid-cols-2 gap-6 mt-12">
                   <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-white/5 shadow-inner">
                      <span className="text-[10px] font-black text-blue-600 dark:text-cyan-400 uppercase tracking-widest block mb-2">Throughput Pipelining</span>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Fluid achieves a peak capacity of 2M+ TPS through asynchronous transaction batching and non-blocking state execution.</p>
                   </div>
                   <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-white/5 shadow-inner">
                      <span className="text-[10px] font-black text-blue-600 dark:text-cyan-400 uppercase tracking-widest block mb-2">Finality Guarantee</span>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Deterministic finality is reached within 600ms, secured by a slashable stake-weighted validator set across 1,024 shards.</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
             {[
               { icon: Activity, title: "Adaptive Sharding", desc: "Shards autonomously split and merge based on computational pressure, ensuring consistent gas fees regardless of global volume." },
               { icon: Gauge, title: "Linear Scalability", desc: "Network capacity increases 1:1 with node addition, eliminating the bottleneck of single-threaded sequencers found in L2s." },
               { icon: ShieldCheck, title: "ZK-State Snapshots", desc: "Recursive Zero-Knowledge proofs enable instant state verification for mobile clients without downloading the full transaction history." }
             ].map((item, i) => (
               <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 rounded-[2.5rem] hover:border-blue-500 transition-all shadow-md group">
                  <div className="text-blue-600 dark:text-cyan-400 mb-6 group-hover:scale-110 transition-transform"><item.icon size={28} /></div>
                  <h5 className="font-black text-slate-900 dark:text-white uppercase italic text-sm mb-3 tracking-tight">{item.title}</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 03. Tokenomics */}
      <section id="wp-tokenomics">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-12 bg-blue-600 dark:bg-cyan-500"></div>
          <span className="text-sm font-black text-blue-600 dark:text-cyan-500 uppercase tracking-[0.4em]">03.00</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-12">Token <br/><span className="text-emerald-600 dark:text-emerald-400">Economics</span></h2>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">Hard Cap: 100M FLD</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Fluid implements a highly restrictive <strong>10/90 Supply Model</strong>. This architecture ensures that 90% of all tokens are earned through contribution rather than speculation.
            </p>
            <div className="bg-slate-950 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none"></div>
               <h5 className="text-white font-black uppercase text-xs tracking-widest mb-6 relative z-10 flex items-center gap-2">
                 <InfinityIcon size={14} className="text-cyan-400" /> Perpetual Block Rewards
               </h5>
               <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                 90% of the total supply (90,000,000 $FLUID) is emitted infinitely through native block rewards over a 200-year decaying curve. This guarantees node incentives and network security for multiple generations.
               </p>
            </div>
            <ul className="space-y-4">
               <li className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                  10M Genesis Supply (10% Total)
               </li>
               <li className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                  90M Native Emissions (90% Total)
               </li>
               <li className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                  Automatic burn mechanism on transaction fees.
               </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-slate-900/60 p-10 border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-2xl space-y-8">
             <h5 className="text-slate-900 dark:text-white font-black uppercase text-sm italic tracking-widest">Genesis Allocation Matrix</h5>
             <div className="space-y-6">
                {[
                  { label: 'Public Presale', val: '30%', color: 'bg-emerald-500' },
                  { label: 'Ecosystem Incentives', val: '40%', color: 'bg-cyan-500' },
                  { label: 'Market Liquidity', val: '10%', color: 'bg-blue-600' },
                  { label: 'Team (10-yr Vesting)', val: '10%', color: 'bg-indigo-600' },
                  { label: 'Protocol Treasury', val: '10%', color: 'bg-slate-500' }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                       <span>{item.label}</span>
                       <span className="text-slate-900 dark:text-white">{item.val}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                       <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: item.val }}></div>
                    </div>
                  </div>
                ))}
             </div>
             <p className="text-[9px] text-slate-400 font-bold uppercase text-center tracking-widest leading-relaxed">Genesis figures represent the initial 10% supply phase only.</p>
          </div>
        </div>
      </section>

      {/* 04. Parmaweb Hosting Protocol */}
      <section id="wp-hosting">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-12 bg-blue-600 dark:bg-cyan-500"></div>
          <span className="text-sm font-black text-blue-600 dark:text-cyan-500 uppercase tracking-[0.4em]">04.00</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-12">Parmaweb <br/><span className="text-indigo-600 dark:text-indigo-400">Eternal Hosting</span></h2>
        
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 mb-16">
          <p className="text-lg leading-relaxed">
            Parmaweb is an on-chain, content-addressed storage layer. It utilizes <strong>Reed-Solomon Erasure Coding</strong> to split data into 32 redundant shards, requiring only 12 shards for full data reconstruction.
          </p>
        </div>

        <DataFlowSchema />

        <div className="grid md:grid-cols-2 gap-8 mb-16 mt-20">
           <div className="p-10 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl group">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-8 shadow-inner group-hover:scale-110 transition-transform">
                 <HardDrive size={32} />
              </div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase mb-4 italic tracking-tight">Zero-Knowledge Storage Proofs</h4>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                Nodes must continuously provide <strong>Proof-of-Retrievability (PoR)</strong> every 10 blocks. These proofs are compressed via ZK-SNARKs and verified by the shard's validator set to ensure 100% data availability.
              </p>
           </div>
           <div className="p-10 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-[3rem] shadow-xl group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-cyan-400 mb-8 shadow-inner group-hover:scale-110 transition-transform">
                 <Globe size={32} />
              </div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase mb-4 italic tracking-tight">Censorship-Resistant DNS</h4>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                Fluid Name Service (FNS) maps immutable Content-IDs to readable domains. Since resolution happens within the sharded gossip layer, front-ends cannot be taken down by traditional ISP blocks.
              </p>
           </div>
        </div>
      </section>

      {/* 05. Vault Wallet Architecture */}
      <section id="wp-wallet">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-12 bg-blue-600 dark:bg-cyan-500"></div>
          <span className="text-sm font-black text-blue-600 dark:text-cyan-500 uppercase tracking-[0.4em]">05.00</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-12">Fluid Vault <br/><span className="text-blue-600 dark:text-cyan-400">Sovereign OS</span></h2>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="p-12 bg-slate-950 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-tech-grid opacity-[0.05] pointer-events-none"></div>
             <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-[2.5rem] flex items-center justify-center text-slate-950 mb-10 shadow-2xl group-hover:rotate-6 transition-transform">
                   <Lock size={48} />
                </div>
                <h4 className="text-2xl font-black text-white uppercase italic mb-4">Secure TEE Isolation</h4>
                <p className="text-slate-400 text-sm text-center leading-relaxed mb-8 font-medium">
                  The Fluid Vault leverages <strong>Trusted Execution Environments (TEE)</strong> to sign transactions. Private keys are never exposed to the application layer or memory.
                </p>
                <div className="grid grid-cols-2 gap-8 w-full border-t border-white/10 pt-8">
                   <div className="text-center">
                      <Fingerprint className="text-cyan-400 mx-auto mb-2" size={32} />
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Biometric FIDO2</span>
                   </div>
                   <div className="text-center">
                      <Smartphone className="text-cyan-400 mx-auto mb-2" size={32} />
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">MPC Recovery</span>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="space-y-10">
            <div>
               <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight mb-4 flex items-center gap-3">
                 <ShieldAlert size={24} className="text-blue-600 dark:text-cyan-400" /> Multi-Shard Guardians
               </h4>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                 Fluid replaces seed phrases with <strong>Social Recovery Shards</strong>. Keys are split into 5 encrypted components distributed across user-selected guardians and cloud providers.
               </p>
            </div>
            <div>
               <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight mb-4 flex items-center gap-3">
                 <Landmark size={24} className="text-blue-600 dark:text-cyan-400" /> Native IBAN Bridging
               </h4>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                 Direct mapping of crypto balances to <strong>Virtual Euro/Dollar IBANs</strong>. Spend $FLD at any VISA/Mastercard terminal via the integrated off-ramp engine.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06. Endowment Economy */}
      <section id="wp-endowment">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-12 bg-blue-600 dark:bg-cyan-500"></div>
          <span className="text-sm font-black text-blue-600 dark:text-cyan-500 uppercase tracking-[0.4em]">06.00</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-12">Endowment <br/><span className="text-cyan-600 dark:text-cyan-400">Perpetual Yield Engine</span></h2>
        
        <div className="p-12 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-[4rem] shadow-2xl relative overflow-hidden">
           <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none"></div>
           <div className="max-w-4xl space-y-12 relative z-10">
              <p className="text-xl font-medium text-slate-700 dark:text-slate-300 italic border-l-4 border-cyan-500 pl-8 leading-relaxed">
                "The 'Pay Once, Host Forever' model is sustained by the <strong>Kryder's Law Balancing Algorithm</strong>. One-time fees generate yield that outpaces storage depreciation."
              </p>
              
              <EndowmentCycleDiagram />

              <div className="grid md:grid-cols-2 gap-12">
                 <div className="space-y-6">
                    <h5 className="font-black text-slate-900 dark:text-white uppercase text-sm italic tracking-widest flex items-center gap-2">
                      <Star size={16} className="text-cyan-500" /> Capital Preservation (CP)
                    </h5>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      95% of storage fees are locked in the <strong>Protocol Endowment Pool (PEP)</strong>. This principal is programmatically deployed into delta-neutral staking yield strategies.
                    </p>
                 </div>
                 <div className="space-y-6">
                    <h5 className="font-black text-slate-900 dark:text-white uppercase text-sm italic tracking-widest flex items-center gap-2">
                      <TrendingUp size={16} className="text-cyan-500" /> Yield-Cost Differential
                    </h5>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      Nodes are paid exclusively from generated yield. As hardware costs drop (avg. 20% annually), the endowment's safety margin increases, ensuring infinite sustainability.
                    </p>
                 </div>
              </div>

              <div className="p-8 bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/10 rounded-[2.5rem] shadow-inner text-center">
                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-4">Sustainability Formula</p>
                 <p className="text-slate-900 dark:text-white font-bold text-lg italic">
                   "Endowment Sustainability Ratio (ESR) = (Portfolio Yield % + Cost Deflation %) / Node OpEx. Current ESR Projection: 4.8x."
                 </p>
              </div>
           </div>
        </div>

        <div className="mt-32 p-16 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-cyan-500 dark:to-blue-600 rounded-[5rem] text-white shadow-2xl relative overflow-hidden group text-center">
           <div className="absolute top-0 right-0 p-12 opacity-20 pointer-events-none group-hover:scale-110 transition-transform"><CpuIcon size={240} /></div>
           <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-8">Eternity is the Benchmark.</h3>
           <p className="text-white/90 text-lg md:text-2xl font-medium max-w-4xl mx-auto leading-relaxed mb-12">
             Fluid Protocol is the definitive realization of the permanent internet. By aligning institutional finance with immortal data, we empower humanity to build on a foundation that truly lasts.
           </p>
           <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-5 bg-white text-slate-950 font-black rounded-3xl text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-cyan-50 active:scale-95 transition-all">
             Start Your Genesis Journey
           </button>
        </div>
      </section>
    </div>
  );
};

export default WhitepaperDocs;
