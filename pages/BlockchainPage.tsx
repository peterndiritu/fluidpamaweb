
import React, { useState } from 'react';
import { Zap, Shield, Layers, Code2, Globe, Cpu, CheckCircle, Wifi, Copy, Check, Wallet } from 'lucide-react';

const FLUID_LOGO_SVG = (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
    <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
  </svg>
);

// Fix: Added props interface to support onOpenWhitepaper navigation
interface BlockchainPageProps {
  onOpenWhitepaper: () => void;
}

const BlockchainPage: React.FC<BlockchainPageProps> = ({ onOpenWhitepaper }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      <section className="text-center px-4 mb-24">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-slate-900/80 border border-white/10 mb-10 backdrop-blur-xl animate-fade-in-up">
            <div className="w-4 h-4 text-blue-400">{FLUID_LOGO_SVG}</div>
            <span className="text-white text-[10px] font-bold tracking-widest uppercase">Layer-1 under Development</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
           The backbone of the <br/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">New internet</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium tracking-tight">
           Fluid Chain is a high-performance Layer-1 blockchain designed for infinite scalability, sub-second finality, and zero-downtime decentralized hosting.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button className="px-8 py-4 bg-blue-600 text-white font-black rounded-full hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/25 tracking-tight">
                Start building
             </button>
             {/* Fix: Added onClick handler to trigger whitepaper navigation */}
             <button 
                onClick={onOpenWhitepaper}
                className="px-8 py-4 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-black rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors tracking-tight"
             >
                Read whitepaper
             </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
                { val: "2M+", label: "TPS capacity" },
                { val: "~600ms", label: "Time to finality" },
                { val: "$0.0001", label: "Avg fee" },
                { val: "150+", label: "Global nodes" }
            ].map((stat, i) => (
                <div key={i} className="text-center p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                    <div className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">{stat.val}</div>
                    <div className="text-sm font-bold text-slate-500 tracking-tight">{stat.label}</div>
                </div>
            ))}
         </div>
      </section>

      <section className="bg-white dark:bg-slate-900/50 py-24 border-y border-slate-200 dark:border-slate-800 mb-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-center mb-16 text-slate-900 dark:text-white tracking-tighter uppercase">Technical innovations</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { icon: Layers, color: "text-blue-500", title: "Dynamic sharding", desc: "The network automatically partitions into shards based on load, allowing for linear scalability." },
                 { icon: Code2, color: "text-emerald-500", title: "EVM compatibility", desc: "Deploy existing Ethereum smart contracts instantly with no code changes required." },
                 { icon: Shield, color: "text-purple-500", title: "Proof of Fluidity", desc: "A novel consensus mechanism combining Proof-of-Stake with Proof-of-History." },
                 { icon: Cpu, color: "text-orange-500", title: "Parallel execution", desc: "Transactions are processed in parallel, utilizing multi-core architectures for maximum throughput." },
                 { icon: Globe, color: "text-cyan-500", title: "Global state sync", desc: "Advanced gossip protocols ensure the global state is synchronized in milliseconds." },
                 { icon: Zap, color: "text-pink-500", title: "Native oracles", desc: "Built-in oracle services provide reliable real-world data feeds directly to smart contracts." }
               ].map((f, i) => (
                 <div key={i} className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all group">
                    <div className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 ${f.color} group-hover:scale-110 transition-transform shadow-lg`}>
                       <f.icon size={24} />
                    </div>
                    <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white tracking-tighter">{f.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium tracking-tight">{f.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mb-24">
         <h2 className="text-3xl font-black text-center mb-12 text-slate-900 dark:text-white tracking-tighter">Performance comparison</h2>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold text-xs uppercase tracking-tight">
                     <th className="py-4 px-6">Metric</th>
                     <th className="py-4 px-6 text-blue-500 font-black">Fluid Chain</th>
                     <th className="py-4 px-6">Ethereum</th>
                     <th className="py-4 px-6">Solana</th>
                  </tr>
               </thead>
               <tbody className="text-slate-600 dark:text-slate-300 font-medium tracking-tight">
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                     <td className="py-4 px-6 font-black">Throughput (TPS)</td>
                     <td className="py-4 px-6 text-blue-400 font-black">2,000,000+</td>
                     <td className="py-4 px-6">~30</td>
                     <td className="py-4 px-6">~65,000</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                     <td className="py-4 px-6 font-black">Finality</td>
                     <td className="py-4 px-6 text-blue-400 font-black">~600ms</td>
                     <td className="py-4 px-6">~12 min</td>
                     <td className="py-4 px-6">~400ms</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                     <td className="py-4 px-6 font-black">Avg. fee</td>
                     <td className="py-4 px-6 text-blue-400 font-black">$0.0001</td>
                     <td className="py-4 px-6">$5.00+</td>
                     <td className="py-4 px-6">$0.0002</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </section>

      <section className="text-center px-4">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl">
             <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter uppercase">Ready to build the future?</h2>
             <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto font-medium tracking-tight">
                Join thousands of developers building the next generation of decentralized applications on Fluid Chain.
             </p>
             <button className="px-10 py-4 bg-white text-blue-600 font-black rounded-full hover:bg-blue-50 transition-all shadow-lg tracking-tight">
                Developer documentation
             </button>
          </div>
      </section>
    </div>
  );
};

export default BlockchainPage;
