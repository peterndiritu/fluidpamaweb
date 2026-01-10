import React, { useState, useEffect, useRef } from 'react';
import WhitepaperDocs from '../components/WhitepaperDocs';
import { FileText, ChevronRight, Download, Share2, Printer, Loader2 } from 'lucide-react';

const WhitepaperPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('wp-abstract');
  const [isDownloading, setIsDownloading] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['wp-abstract', 'wp-blockchain', 'wp-tokenomics', 'wp-hosting', 'wp-wallet', 'wp-endowment'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 500;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  };

  const handleDownloadPDF = async () => {
    if (!pdfRef.current || isDownloading) return;
    
    setIsDownloading(true);
    const element = pdfRef.current;
    const worker = (window as any).html2pdf();
    
    const opt = {
      margin:       [0.5, 0.5, 0.5, 0.5],
      filename:     'Fluid-Technical-Whitepaper.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      await worker.set(opt).from(element).save();
    } catch (err) {
      console.error('PDF Generation failed:', err);
      // Fallback to native print if library fails
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Fluid Protocol Technical Whitepaper',
        text: 'Review the technical specifications of the Fluid Layer-1 ecosystem.',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Whitepaper URL copied to clipboard!');
    }
  };

  const menuItems = [
    { id: 'wp-abstract', label: '01. Abstract' },
    { id: 'wp-blockchain', label: '02. Infrastructure' },
    { id: 'wp-tokenomics', label: '03. Tokenomics' },
    { id: 'wp-hosting', label: '04. Permanent Hosting' },
    { id: 'wp-wallet', label: '05. Sovereign Wallet' },
    { id: 'wp-endowment', label: '06. Economic Engine' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="mb-20 animate-fade-in-up no-print">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-200 dark:border-white/5">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 dark:text-cyan-400 text-[10px] font-black uppercase tracking-widest">
                Technical Documentation
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
                White<span className="text-blue-600 dark:text-cyan-500">paper</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">
                Protocol Genesis Specification • Version 2.4.0-FINAL
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                title="Download as PDF"
                className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 rounded-2xl transition-all shadow-xl hover:scale-105 disabled:opacity-50"
              >
                {isDownloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
              </button>
              <button 
                onClick={handlePrint}
                title="Print Document"
                className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 rounded-2xl transition-all shadow-xl hover:scale-105"
              >
                <Printer size={20} />
              </button>
              <button 
                onClick={handleShare}
                title="Share Whitepaper"
                className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 rounded-2xl transition-all shadow-xl hover:scale-105"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sticky Navigation Sidebar */}
          <aside className="lg:w-80 shrink-0 no-print">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-tech-grid opacity-[0.02] pointer-events-none"></div>
                <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mb-8">Table of Contents</h4>
                <nav className="space-y-1 relative z-10">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-left font-bold transition-all group ${
                        activeSection === item.id 
                        ? 'bg-blue-600 dark:bg-cyan-500 text-white shadow-lg scale-[1.02]' 
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span className="text-xs uppercase tracking-widest">{item.label}</span>
                      <ChevronRight size={14} className={`transition-transform duration-300 ${activeSection === item.id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-10 bg-slate-900 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-tech-grid opacity-[0.05]"></div>
                <div className="relative z-10">
                  <FileText className="text-cyan-400 mb-6" size={32} />
                  <h5 className="text-white font-black uppercase tracking-tight italic mb-3">Protocol Verified</h5>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">All technical parameters defined in this document have been peer-reviewed and mathematically validated for sharded mainnet launch.</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Detailed Document Content */}
          <main className="flex-1 max-w-4xl" ref={pdfRef}>
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-[4rem] p-8 md:p-16 lg:p-24 shadow-2xl relative overflow-hidden print:p-0 print:border-none print:bg-transparent">
               {/* Print-only title section for PDF generation */}
               <div className="hidden print:block mb-20 text-center border-b pb-10">
                  <h1 className="text-4xl font-black uppercase mb-4 text-slate-900">Fluid Technical Whitepaper</h1>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Protocol Genesis Specification • Version 2.4.0-FINAL</p>
                  <p className="text-xs text-slate-400 mt-4 italic">Copyright © 2024 Fluid Protocol. All rights reserved.</p>
               </div>
               
               <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none no-print"></div>
               <WhitepaperDocs />
            </div>
            
            <div className="mt-20 p-12 bg-slate-900 dark:bg-slate-900 border border-white/5 rounded-[3rem] text-center shadow-2xl no-print">
               <h4 className="text-white font-black uppercase tracking-tighter italic mb-4">Legacy in the Making</h4>
               <p className="text-slate-400 text-sm font-medium mb-8">This document is preserved eternally on Fluid Shard #001 as the foundational constitution of the Parmaweb protocol.</p>
               <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="px-10 py-4 bg-white text-slate-950 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-cyan-50 transition-all"
                  >
                    Back to Top
                  </button>
                  <button 
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-500 transition-all flex items-center gap-3 disabled:opacity-50"
                  >
                    {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />} 
                    {isDownloading ? 'Generating PDF...' : 'Download PDF'}
                  </button>
               </div>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default WhitepaperPage;