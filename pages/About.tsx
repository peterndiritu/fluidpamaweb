import React from 'react';
import { Shield, Rocket, Target, Eye, Heart, Globe, Cpu, Zap, ArrowRight, Layers, Sparkles, Compass, Milestone } from 'lucide-react';

const FLUID_LOGO_SVG = (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
    <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
  </svg>
);

const AboutPage: React.FC = () => {
  const values = [
    {
      title: "Unyielding Security",
      desc: "We believe security isn't just a feature—it's a fundamental human right. Fluid is built on zero-trust architecture and absolute non-custodial sovereignty.",
      icon: Shield,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10"
    },
    {
      title: "Radical Transparency",
      desc: "Trust is earned through openness. Our code, treasury models, and roadmap are visible to all, ensuring we remain accountable to our community.",
      icon: Eye,
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      title: "User Sovereignty",
      desc: "You own your data. You own your keys. You own your identity. Fluid provides the rails, but you maintain the power over your digital life.",
      icon: Heart,
      color: "text-rose-400",
      bg: "bg-rose-400/10"
    },
    {
      title: "Inclusion by Design",
      desc: "Finance should not have borders. We bridge the gap between traditional banking and the sharded internet for everyone, everywhere.",
      icon: Globe,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10"
    }
  ];

  const possibilities = [
    {
      title: "Sovereign Nations",
      desc: "Enabling decentralized governance and public services that are permanent and impossible to censor.",
      icon: Compass
    },
    {
      title: "Eternal Archives",
      desc: "Preserving human history and scientific data on a network that exists as long as the internet itself.",
      icon: Layers
    },
    {
      title: "Universal Finance",
      desc: "A world where cross-border payments are as instant and free as sending a text message.",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 selection:bg-cyan-500/30">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 text-center mb-32 relative flex flex-col items-center">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -z-10"></div>
         
         <div className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-slate-900/80 border border-white/10 mb-10 backdrop-blur-xl animate-fade-in-up">
            <div className="w-4 h-4 text-cyan-400">{FLUID_LOGO_SVG}</div>
            <span className="text-white text-[10px] font-bold tracking-widest uppercase italic">The Fluid Philosophy</span>
         </div>

         <h1 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter uppercase leading-none">
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Permanence</span>.
         </h1>
         <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed tracking-tight">
            We are more than a blockchain. We are the foundation for an unstoppable, self-sufficient digital future.
         </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-4 mb-32">
        <div className="grid md:grid-cols-2 gap-8">
            <div className="scroll-card p-12 bg-slate-900/40 border border-white/5 rounded-[3rem] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 text-cyan-500/10 group-hover:scale-110 transition-transform"><Target size={120} /></div>
               <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-4">
                  <span className="w-10 h-1 bg-cyan-500 rounded-full"></span> Our Mission
               </h2>
               <p className="text-slate-400 text-xl leading-relaxed font-medium relative z-10">
                  To democratize access to the world's most advanced financial and hosting infrastructure. We are building the rails for a truly decentralized internet where high-performance commerce and permanent data storage coexist seamlessly.
               </p>
            </div>
            <div className="scroll-card p-12 bg-slate-900/40 border border-white/5 rounded-[3rem] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 text-blue-500/10 group-hover:scale-110 transition-transform"><Eye size={120} /></div>
               <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-4">
                  <span className="w-10 h-1 bg-blue-500 rounded-full"></span> Our Vision
               </h2>
               <p className="text-slate-400 text-xl leading-relaxed font-medium relative z-10">
                  A world where individuals have absolute control over their digital destiny. We envision an internet that is owned by no one and accessible to everyone—an ecosystem where code is law and data is eternal.
               </p>
            </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 mb-40">
         <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter italic">The Core Pillars</h2>
            <p className="text-slate-500 font-bold text-[10px] tracking-[0.3em] uppercase">What drives every line of code we write</p>
         </div>
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
                <div key={idx} className="scroll-card p-8 rounded-[2.5rem] bg-slate-900/20 border border-white/5 hover:border-white/10 transition-all flex flex-col h-full group">
                    <div className={`w-14 h-14 ${value.bg} ${value.color} rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform`}>
                        <value.icon size={28} />
                    </div>
                    <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight leading-none">{value.title}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed tracking-tight flex-grow">{value.desc}</p>
                </div>
            ))}
         </div>
      </section>

      {/* Future Plan & Possibilities */}
      <section className="max-w-7xl mx-auto px-4 mb-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="bg-slate-900/60 border border-white/5 rounded-[4rem] p-12 md:p-20 relative z-10 overflow-hidden">
            <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none"><Milestone size={300} /></div>
            
            <div className="max-w-3xl mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[9px] font-black uppercase tracking-widest mb-8">
                    <Sparkles size={12} /> The Path Ahead
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter leading-none">The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Fluid Intelligence</span>.</h2>
                <p className="text-slate-400 text-xl leading-relaxed font-medium">
                    Fluid isn't just about surviving the next market cycle; it's about defining the next century of digital interaction. Our focus is shifting towards integrated AI agents that manage your sovereignty autonomously.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
                {possibilities.map((p, i) => (
                    <div key={i} className="group cursor-default">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 mb-6 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 transition-all">
                            <p.icon size={24} />
                        </div>
                        <h4 className="text-lg font-black text-white mb-3 uppercase tracking-tight">{p.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium tracking-tight">
                            {p.desc}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h5 className="text-white font-black text-xl mb-2 uppercase tracking-tight">Join the evolution</h5>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Early adoption is open for visionaries</p>
                </div>
                <button className="px-10 py-5 bg-white text-slate-950 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-cyan-50 transition-all flex items-center gap-3">
                    Partner with Fluid <ArrowRight size={16} />
                </button>
            </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;