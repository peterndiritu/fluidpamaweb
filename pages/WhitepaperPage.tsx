
import React, { useState, useEffect, useRef } from 'react';
import WhitepaperDocs from '../components/WhitepaperDocs';
import { Download, Share2, Printer, Loader2, ChevronUp } from 'lucide-react';

const WhitepaperPage: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadPDF = async () => {
    if (!pdfRef.current || isDownloading) return;
    
    setIsDownloading(true);
    const element = pdfRef.current;
    
    if (!(window as any).html2pdf) {
        console.warn('html2pdf library not loaded, falling back to print');
        window.print();
        setIsDownloading(false);
        return;
    }

    const worker = (window as any).html2pdf();
    
    const opt = {
      margin:       [0.5, 0.5, 0.5, 0.5],
      filename:     'Fluid-Protocol-Specification.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { 
          scale: 1.5,
          useCORS: true, 
          letterRendering: true,
          logging: false 
      },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      await worker.set(opt).from(element).save();
    } catch (err) {
      console.error('PDF Generation failed:', err);
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
        title: 'Fluid Protocol Technical Whitepaper v1.0',
        text: 'Detailed technical specification for the Fluid Layer-1 blockchain and Parmaweb storage protocol.',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Whitepaper URL copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Title Header - Now Full Width */}
        <div className="mb-12 animate-fade-in-up no-print max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-slate-200 dark:border-white/5">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 dark:text-cyan-400 text-[10px] font-black uppercase tracking-widest">
                Protocol Specification V1.0
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
                White<span className="text-blue-600 dark:text-cyan-500">paper</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">
                Protocol Genesis Documentation • May 2024 Release
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

        <div className="flex flex-col items-center">
          {/* Main Content Area - Expanded to Full Width with Max-7xl for Readability */}
          <main className="w-full max-w-7xl" id="whitepaper-content" ref={pdfRef}>
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-[4rem] p-8 md:p-16 lg:p-24 shadow-2xl relative overflow-hidden print:p-0 print:border-none print:bg-transparent">
               {/* Print-only title section for PDF generation */}
               <div className="hidden print:block mb-20 text-center border-b pb-10">
                  <h1 className="text-4xl font-black uppercase mb-4 text-slate-900">Fluid Technical Whitepaper v1.0</h1>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Official Genesis Specification Document</p>
                  <p className="text-xs text-slate-400 mt-4 italic">Copyright © 2024 Fluid Finance Protocol. All rights reserved.</p>
               </div>
               
               <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none no-print"></div>
               <WhitepaperDocs />
            </div>
            
            {/* Action Footer */}
            <div className="mt-20 p-12 bg-slate-900 dark:bg-slate-900 border border-white/5 rounded-[3rem] text-center shadow-2xl no-print">
               <h4 className="text-white font-black uppercase tracking-tighter italic mb-4">Unstoppable Infrastructure</h4>
               <p className="text-slate-400 text-sm font-medium mb-8">This document represents the immutable foundation of the Fluid sharded ecosystem.</p>
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
                    {isDownloading ? 'Generating PDF...' : 'Download PDF v1.0'}
                  </button>
               </div>
            </div>
          </main>
        </div>
      </div>

      {/* Floating Scroll to Top - for long technical reads */}
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-4 bg-blue-600 dark:bg-cyan-500 text-white rounded-full shadow-2xl z-50 animate-fade-in-up transition-transform hover:scale-110 active:scale-95 no-print"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default WhitepaperPage;
