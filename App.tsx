import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WalletPage from './pages/Wallet';
import HostPage from './pages/Host';
import AboutPage from './pages/About';
import TokenPage from './pages/TokenPage';
import RoadmapPage from './pages/RoadmapPage';
import FaqPage from './pages/FaqPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import BlockchainPage from './pages/BlockchainPage';
import SupportPage from './pages/SupportPage';
import DocsPage from './pages/DocsPage';
import WhitepaperPage from './pages/WhitepaperPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateToWhitepaper = () => {
    setCurrentPage('whitepaper');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} onOpenWhitepaper={navigateToWhitepaper} />;
      case 'buy': 
      case 'token': return <TokenPage onNavigate={setCurrentPage} onOpenWhitepaper={navigateToWhitepaper} />;
      case 'blockchain': return <BlockchainPage onOpenWhitepaper={navigateToWhitepaper} />;
      case 'whitepaper': return <WhitepaperPage />;
      case 'wallet': return <WalletPage />;
      case 'host': return <HostPage />;
      case 'about': return <AboutPage />;
      case 'roadmap': return <RoadmapPage />;
      case 'docs': return <DocsPage />;
      case 'faq': return <FaqPage />;
      case 'terms': return <TermsPage />;
      case 'privacy': return <PrivacyPage />;
      case 'support': return <SupportPage />;
      default: return <Home onNavigate={setCurrentPage} onOpenWhitepaper={navigateToWhitepaper} />;
    }
  };

  return (
    <div 
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-cyan-500/30 transition-colors duration-300 relative"
    >
      
      {/* Technological Hosting Grid Background */}
      <div className="fixed inset-0 bg-tech-grid pointer-events-none z-0 opacity-100"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />

        <main className="flex-grow">
          {renderPage()}
        </main>

        <Footer onNavigate={setCurrentPage} />
      </div>
    </div>
  );
}

export default App;