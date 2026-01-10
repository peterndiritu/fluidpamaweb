import React from 'react';
import { Rocket, Zap, Layers, ShieldCheck, Globe, Milestone, Clock } from 'lucide-react';

const roadmapData = [
  {
    phase: 1,
    stage: 1,
    quarter: "Q1 to Q4 - 2026",
    title: "Token Presale & Ecosystem Genesis",
    items: [
      "Launch of the FLUID multi-stage presale with cross-chain support (ETH, BNB, SOL).",
      "Comprehensive security audits of the FLUID genesis token and vault contracts.",
      "Global 'Fluid Shift' marketing initiative targeting 100k+ early adopters.",
      "Strategic partnership finalization with major liquidity providers and market makers.",
      "Release of the Fluid whitepaper V2 outlining sharded hosting economics."
    ]
  },
  {
    phase: 2,
    stage: 2,
    quarter: "Q2 - 2027",
    title: "Mainnet V2 & Sharding Expansion",
    items: [
      "End of Presale and initiation of the 1:1 token swap to native FLUID coins.",
      "Dynamic shard splitting optimization for 5M+ TPS peak capacity.",
      "Activation of the secondary validation layer for cross-shard consistency.",
      "Launch of the native FLUID explorer with real-time shard health monitoring.",
      "Integration of Zero-Knowledge proofs for private vault transactions."
    ]
  },
  {
    phase: 3,
    stage: 3,
    quarter: "Q3 - 2027",
    title: "Fiat-to-Node Payouts & Institutional Vaults",
    items: [
      "Implementation of direct fiat node incentive payouts via bank bridge.",
      "Launch of Institutional Vaults with multi-signature hardware support.",
      "Global expansion of the Fluid Fiat Gateway to 40+ local currencies.",
      "Integration of advanced AML/KYC modules for corporate compliance.",
      "Release of the Fluid Mobile App V2 with native biometric passkey sync."
    ]
  },
  {
    phase: 4,
    stage: 4,
    quarter: "Q4 - 2027",
    title: "Parmaweb CDN & Edge Delivery",
    items: [
      "Global rollout of Edge Storage Nodes for sub-100ms content delivery.",
      "Implementation of the Permaweb CDN protocol for permanent static sites.",
      "Partnership with major decentralized storage providers for cross-redundancy.",
      "Launch of the Fluid Domains (FNS) Marketplace for premium identities.",
      "Beta testing of the 'One-Click Site Deploy' CLI for developers."
    ]
  },
  {
    phase: 5,
    stage: 5,
    quarter: "Q1 - 2028",
    title: "Cross-Chain Liquid Staking",
    items: [
      "Introduction of Liquid Staking (stFLUID) for enhanced ecosystem liquidity.",
      "Release of the DEX Aggregator bridging Fluid L1 with major EVM chains.",
      "Implementation of atomic cross-chain swaps without external bridges.",
      "Integration of Chainlink CCIP for hardened cross-chain messaging.",
      "Activation of the Fluid Yield Optimizer for automated vault returns."
    ]
  },
  {
    phase: 6,
    stage: 6,
    quarter: "Q2 - 2028",
    title: "Global Physical Card Rollout",
    items: [
      "Shipment of premium metal Fluid Cards to approved regions (EU/US/APAC).",
      "Full integration with Apple Pay and Google Pay for instant spending.",
      "Launch of the Fluid Rewards program with up to 5% crypto cashback.",
      "Implementation of AI-driven fraud detection for the Card Network.",
      "Integration of disposable virtual cards for enhanced online privacy."
    ]
  },
  {
    phase: 7,
    stage: 7,
    quarter: "H2 - 2028",
    title: "Autonomous DAO & Sovereign Identity",
    items: [
      "Full transition of protocol governance to the FLUID DAO.",
      "Launch of the Sovereign Identity (SID) protocol for on-chain reputation.",
      "Integration of SID with physical card transactions for unified data.",
      "Initiation of the $50M Ecosystem Grant fund for Parmaweb projects.",
      "Permanent hosting of the first fully autonomous government dApp."
    ]
  }
];

const Roadmap: React.FC = () => {
  return (
    <div className="relative max-w-5xl mx-auto px-4 py-12">
      {/* Commitment Disclaimer */}
      <div className="mb-20 text-center animate-fade-in-up">
        <div className="inline-flex flex-col items-center gap-4 px-8 py-6 rounded-[2.5rem] bg-slate-900/50 border border-white/5 backdrop-blur-xl max-w-2xl mx-auto shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none"></div>
          <div className="flex items-center gap-3 text-cyan-400">
            <Clock size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Protocol</span>
          </div>
          <p className="text-xs md:text-sm font-medium text-slate-400 leading-relaxed italic">
            "Projected milestones are subject to agile optimization; however, we remain committed to high-velocity execution and the shortest possible delivery cycles."
          </p>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Vertical Line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 transform md:-translate-x-1/2"></div>
      
      {roadmapData.map((item, index) => (
        <div key={index} className={`relative flex flex-col md:flex-row gap-8 mb-24 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
          
          {/* Content Card */}
          <div className="flex-1 ml-16 md:ml-0 group">
            <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-2xl relative transition-all group-hover:border-cyan-500/30 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
               <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none rounded-[2.5rem]"></div>
               
               <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.stage === 1 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]'}`}>
                    Stage {item.stage}
                  </div>
                  <span className="text-slate-500 font-bold text-[10px] tracking-widest uppercase">{item.quarter}</span>
               </div>

               <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight relative z-10 leading-tight">
                  {item.title}
               </h3>

               <ul className={`space-y-4 text-slate-600 dark:text-slate-400 text-sm relative z-10 ${index % 2 === 0 ? 'pl-0' : 'md:pl-0'} transition-colors`}>
                 {item.items.map((point, i) => (
                   <li key={i} className={`flex gap-3 leading-relaxed font-medium ${index % 2 !== 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                      <div className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full ${item.stage === 1 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]'}`}></div>
                      <span>{point}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          {/* Timeline Marker */}
          <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
             <div className="w-16 h-16 rounded-full bg-slate-950 border-4 border-slate-800 flex items-center justify-center z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-slate-950 font-black text-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all ${item.stage === 1 ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-cyan-500 shadow-cyan-500/20'}`}>
                  {item.phase}
                </div>
             </div>
          </div>

          {/* Spacer */}
          <div className="flex-1 hidden md:block"></div>
        </div>
      ))}

      {/* Infinite Horizon Callout */}
      <div className="text-center mt-20 relative z-10">
         <div className="inline-block p-10 rounded-[3rem] bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-tech-grid opacity-[0.05] pointer-events-none"></div>
            <div className="w-24 h-24 bg-cyan-500/10 rounded-[2.5rem] flex items-center justify-center text-cyan-400 mx-auto mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
              <Rocket size={48} className="animate-bounce-slow" />
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">The Sky is the Limit</h3>
            <p className="text-slate-500 text-sm mt-3 font-medium max-w-xs mx-auto leading-relaxed">
              Fluid evolution continues beyond H2 2028 with sharded AI node integration and deep space storage protocols.
            </p>
         </div>
      </div>
    </div>
  );
};

export default Roadmap;