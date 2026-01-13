
import React, { useState, useEffect } from 'react';
import { 
  Globe2, Activity, ShieldCheck, Zap, Server, Database, CheckCircle, Network
} from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [latency, setLatency] = useState(28);
  const [blocks, setBlocks] = useState(12450892);
  const [activeLocations, setActiveLocations] = useState(154);
  const [recentVerifications, setRecentVerifications] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.max(12, Math.min(45, prev + (Math.random() * 4 - 2))));
      setBlocks(prev => prev + 1);
      
      const shardId = Math.floor(Math.random() * 1024);
      const newLog = { 
        id: Date.now(), 
        shard: shardId, 
        node: `Node_${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        status: 'VERIFIED'
      };
      setRecentVerifications(prev => [newLog, ...prev].slice(0, 5));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hosting" className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-6">
            <Activity size={12} className="animate-pulse" /> Network Operations: Optimal
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter uppercase italic leading-none">
            Truly Global <br/><span className="text-fluid-gradient">Infrastructure</span>.
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 bg-slate-900/40 border border-white/5 rounded-[3.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none"></div>
            
            <div className="flex flex-col items-center gap-12 relative z-10">
              <div className="relative">
                 <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center shadow-[0_0_100px_rgba(6,182,212,0.1)] relative overflow-hidden ring-1 ring-white/5">
                    <Globe2 className="w-32 h-32 md:w-40 md:h-40 text-cyan-400/20 animate-pulse-slow" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Mainnet State</span>
                        <span className="text-xl font-black text-white tracking-tighter">{blocks.toLocaleString()}</span>
                    </div>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-10 w-full mt-8">
                 {[
                   { icon: ShieldCheck, title: "Data Integrity", desc: "Every block is verified across multiple clusters.", color: "text-emerald-400" },
                   { icon: Zap, title: "Edge Finality", desc: "Sub-second block confirmation via optimized gossip.", color: "text-cyan-400" },
                   { icon: Globe2, title: "Global Payouts", desc: "Validators receive rewards instantly anywhere.", color: "text-blue-400" }
                 ].map((item, idx) => (
                    <div key={idx} className="text-center group">
                       <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-white/10 transition-all shadow-inner">
                          <item.icon size={28} className={`${item.color}`} />
                       </div>
                       <h3 className="text-sm font-black text-white uppercase tracking-tight mb-3 italic">{item.title}</h3>
                       <p className="text-slate-500 text-[11px] leading-relaxed font-medium uppercase tracking-widest">{item.desc}</p>
                    </div>
                 ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-white/5 rounded-[3.5rem] p-8 flex flex-col shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-tech-grid opacity-[0.03]"></div>
             <header className="mb-8 border-b border-white/5 pb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Shard Live Feed</span>
                    <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                </div>
             </header>

             <div className="flex-1 space-y-4">
                {recentVerifications.map((log) => (
                    <div key={log.id} className="p-4 bg-slate-950 border border-white/5 rounded-2xl flex items-center justify-between group/item hover:border-cyan-500/30 transition-all animate-fade-in-up">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 border border-cyan-500/20">
                                <Network size={14} />
                            </div>
                            <div>
                                <span className="text-[9px] font-black text-white block uppercase leading-none mb-1">Shard #{log.shard}</span>
                                <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{log.node}</span>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-[8px] font-black text-emerald-500 uppercase border border-emerald-500/20">
                                <CheckCircle size={8} /> Verified
                             </div>
                        </div>
                    </div>
                ))}
             </div>

             <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex justify-between items-center text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    <span>Protocol Finality</span>
                    <span className="text-fluid-gradient font-black">~600ms</span>
                </div>
                <div className="mt-4 w-full h-1.5 bg-slate-950 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-fluid-gradient animate-gradient-x" style={{ width: '60%' }}></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
