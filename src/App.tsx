import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Send,
  X,
  Database,
  AlertTriangle,
  MessageCircle } from
'lucide-react';
import { RansomwareFamily } from './data/ransomware';
import { useScreenInit } from './useScreenInit';
import { Breaches } from './pages/Breaches';
import { Victims } from './pages/Victims';
import { Contact } from './pages/Contact';
import { MirrorTor } from './pages/MirrorTor';
import { BreachForums } from './pages/BreachForums';
import { downloadText, downloadZipFile } from './utils/download';
const TELEGRAM = '@normalhunters0x';

function detailStatus(family: RansomwareFamily) {
  if (family.status === 'Soon') {
    return { label: 'Upcoming', className: 'border border-white/40 text-white animate-pulse' };
  }
  if (family.pricing === 'Free') {
    return { label: 'Leaked', className: 'clip-corner bg-red-600 text-black' };
  }
  return { label: 'For Sale', className: 'clip-corner border border-red-600 text-red-500' };
}


type Tab = 'breaches' | 'victims' | 'mirror' | 'forums' | 'contact';

function ForumsHero() {
  return (
    <section className="relative overflow-hidden border-b border-red-900/40 bg-black">
      <div className="absolute inset-0 breach-grid" />
      <div className="absolute inset-0 crt-static" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-red-500">
            <span className="inline-block w-2 h-2 bg-red-600 animate-pulse" />
            root@breachforum:~# status
          </p>
          <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.35em]">
            <span className="text-red-500">$</span> whoami // moderator
          </p>
        </div>

        <div className="mb-6">
          <img
            src="/images/breachforums-logo.png"
            alt="BreachForums logo"
            className="w-14 h-14 sm:w-20 sm:h-20 object-contain mb-5 opacity-90"
          />
          <h1
            className="glitch-text flicker text-5xl sm:text-7xl font-black tracking-tight text-white uppercase"
            data-text="BREACHFORUM">
            BREACH<span className="text-red-600">FORUM</span>
          </h1>
          <p className="mt-4 text-[11px] sm:text-sm uppercase tracking-[0.5em] text-white/50">
            The network is <span className="text-green-500 font-bold">Up</span> // we are not //
          </p>
        </div>
      </div>
    </section>
  );
}

export function App() {
  useScreenInit();
  const [activeTab, setActiveTab] = useState<Tab>('breaches');
  const [selectedFamily, setSelectedFamily] = useState<RansomwareFamily | null>(
    null
  );

  return (
    <div className="hacker-bg scanline min-h-screen w-full text-white/80 font-hack pb-16 selection:bg-red-500/30">
      {/* Nav Bar */}
      <header className="sticky top-0 z-40 border-b border-red-900/40 bg-black/80 backdrop-blur">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="p-2 border border-red-700/60 bg-red-950/40 glow-red">
              <img src="/images/logo.jpg" alt="root0x logo" className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <span className="text-lg font-bold text-red-500 glow-text tracking-widest">
                DYSPHOR1A
              </span>
              <p className="text-[10px] text-white/40 tracking-[0.3em] uppercase">
                Normal Hunters
              </p>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-white/50">
            <button
              onClick={() => setActiveTab('breaches')}
              className={`hover:text-red-400 transition-colors ${activeTab === 'breaches' ? 'text-red-400' : ''}`}>
              Victims
            </button>
            <button
              onClick={() => setActiveTab('victims')}
              className={`hover:text-red-400 transition-colors ${activeTab === 'victims' ? 'text-red-400' : ''}`}>
              Leaked
            </button>
            <button
              onClick={() => setActiveTab('mirror')}
              className={`hover:text-red-400 transition-colors ${activeTab === 'mirror' ? 'text-red-400' : ''}`}>
              Mirror-Tor
            </button>
            <button
              onClick={() => setActiveTab('forums')}
              className={`hover:text-red-400 transition-colors ${activeTab === 'forums' ? 'text-red-400' : ''}`}>
              BreachForums
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`hover:text-red-400 transition-colors ${activeTab === 'contact' ? 'text-red-400' : ''}`}>
              Contact
            </button>
            <a
              href="#contact"
              className="flex items-center gap-2 px-3 py-1.5 border border-red-700/60 text-red-400 hover:bg-red-950/40 hover:glow-red transition-all">

              <Send className="w-3.5 h-3.5" />
              {TELEGRAM}
            </a>
          </div>
        </nav>
      </header>

      {/* Tab Content */}
      {activeTab === 'forums' && <ForumsHero />}

      {/* Tab Content */}
      <div id="content">
        {activeTab === 'breaches' && (
          <Breaches onCardClick={setSelectedFamily} />
        )}
        {activeTab === 'victims' && (
          <Victims />
        )}
        {activeTab === 'mirror' && (
          <MirrorTor />
        )}
        {activeTab === 'forums' && (
          <BreachForums />
        )}
        {activeTab === 'contact' && (
          <Contact />
        )}
      </div>


      {/* Detail Modal */}
      <AnimatePresence>
        {selectedFamily &&
        <motion.div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}>
          
            <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={() => setSelectedFamily(null)} />
          
            <motion.div
            role="dialog"
            aria-modal="true"
            initial={{
              scale: 0.95,
              y: 20,
              opacity: 0
            }}
            animate={{
              scale: 1,
              y: 0,
              opacity: 1
            }}
            exit={{
              scale: 0.95,
              y: 20,
              opacity: 0
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 26
            }}
            className="corner-brackets relative w-full max-w-2xl my-8 bg-black border border-white/10 glow-red">
            
              <div className={`h-1 w-full ${selectedFamily.warning ? 'bg-red-600' : 'bg-white/10'}`} />

              <div className="flex items-start justify-between gap-4 p-6 border-b border-white/10 bg-white/[0.04]">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 border border-red-700/50 bg-red-950/40 text-red-500 shrink-0">
                      {selectedFamily.logo ? (
                        <img src={selectedFamily.logo} alt={selectedFamily.name} className="w-5 h-5 object-contain" />
                      ) : (
                        <Database className="w-5 h-5" />
                      )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide truncate">
                      {selectedFamily.name}
                    </h2>
                  </div>
                  <div className="flex items-center flex-wrap gap-2">
                    <span
                    className={`px-2 py-0.5 text-[10px] uppercase tracking-wider inline-block ${detailStatus(selectedFamily).className}`}>
                    
                      {detailStatus(selectedFamily).label}
                    </span>
                    <span
                    className={`px-2 py-0.5 text-[10px] uppercase tracking-wider border ${selectedFamily.severity === 'Critical' ? 'border-red-600 text-red-500 bg-red-950/30' : 'border-white/40 text-white/60'}`}>
                    
                      {selectedFamily.severity}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider border border-white/15 text-white/60">
                      {selectedFamily.country}
                    </span>
                    {selectedFamily.warning && (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-red-400">
                        <AlertTriangle className="w-3 h-3" />
                        Warning // Forced Leak
                      </span>
                    )}
                  </div>
                </div>
                <button
                onClick={() => setSelectedFamily(null)}
                aria-label="Close"
                className="p-2 text-white/40 hover:text-red-400 hover:bg-red-950/40 transition-colors">
                
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-6 py-3 border-b border-white/10 bg-red-950/20">
                <span className="text-[10px] text-red-500 tracking-[0.3em] uppercase font-bold">
                  ID_{selectedFamily.id.toUpperCase()}
                </span>
                <span className="text-white/20">|</span>
                <span className="text-[10px] text-white/50 tracking-[0.3em] uppercase">
                  Detected {selectedFamily.year}
                </span>
                <span className="text-white/20">|</span>
                <span className="text-[10px] text-white/50 tracking-[0.3em] uppercase">
                  Target // {selectedFamily.target}
                </span>
              </div>

              <div className="p-6 space-y-8 max-h-[60vh] overflow-y-auto">
                <section>
                  <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-red-500 mb-3">
                    <span className="inline-block w-1.5 h-3.5 bg-red-600" />
                    Description
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {selectedFamily.description}
                  </p>
                </section>

                {selectedFamily.warnContent && (
                  <section>
                    <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-red-500 mb-3">
                      <span className="inline-block w-1.5 h-3.5 bg-red-600" />
                      Warning
                    </h3>
                    <div className="border border-red-600/60 bg-red-950/30 p-4">
                      <p className="text-sm text-red-400 font-bold whitespace-pre-line leading-relaxed">
                        {selectedFamily.warnContent}
                      </p>
                    </div>
                  </section>
                )}

                <section>
                  <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-red-500 mb-3">
                    <span className="inline-block w-1.5 h-3.5 bg-red-600" />
                    Infection Mechanism
                  </h3>
                  <div className="bg-black border-l-2 border-red-600/70 p-4 text-sm text-white/60 leading-relaxed">
                    {selectedFamily.mechanism}
                  </div>
                </section>

                <section>
                  <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-red-500 mb-3">
                    <span className="inline-block w-1.5 h-3.5 bg-red-600" />
                    Notable Attack
                  </h3>
                  <p className="text-sm text-white/60 italic border-l-2 border-red-600/70 pl-4 py-1">
                    {selectedFamily.notableAttack}
                  </p>
                </section>

                {selectedFamily.accountSummary && (
                  <section>
                    <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-red-500 mb-3">
                      <span className="inline-block w-1.5 h-3.5 bg-red-600" />
                      Account Summary
                    </h3>
                    <div className="bg-black border-l-2 border-red-600/70 p-4 text-sm text-white/60 leading-relaxed whitespace-pre">
                      {selectedFamily.accountSummary}
                    </div>
                  </section>
                )}

                {selectedFamily.exampleCompromised && (
                  <section>
                    <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-red-500 mb-3">
                      <span className="inline-block w-1.5 h-3.5 bg-red-600" />
                      Example Compromised
                    </h3>
                    <div className="bg-black border-l-2 border-red-600/70 p-4 text-sm text-white/60 leading-relaxed whitespace-pre">
                      {selectedFamily.exampleCompromised}
                    </div>
                  </section>
                )}

                {selectedFamily.downloadSourceUrl && (
                  <section>
                    <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-red-500 mb-3">
                      <span className="inline-block w-1.5 h-3.5 bg-red-600" />
                      Download Source
                    </h3>
                    <a
                      href={selectedFamily.downloadSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-black border-l-2 border-red-600/70 p-4 text-sm text-red-400 hover:text-red-300 underline decoration-red-500/50 hover:decoration-red-400 transition-colors"
                    >
                      {selectedFamily.downloadSourceUrl}
                    </a>
                  </section>
                )}

                {selectedFamily.imageLinks && selectedFamily.imageLinks.length > 0 && (
                  <section>
                    <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-red-500 mb-3">
                      <span className="inline-block w-1.5 h-3.5 bg-red-600" />
                      Evidence Images
                    </h3>
                    <div className="space-y-2">
                      {selectedFamily.imageLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm text-red-400 hover:text-red-300 underline decoration-red-500/50 hover:decoration-red-400 transition-colors"
                        >
                          {link.split('/').pop()}
                        </a>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end p-6 border-t border-white/10 bg-white/[0.03]">
                <button
                onClick={() => {
                  if (selectedFamily.id === 'netim') {
                    downloadText(
                      'lastchance.txt',
                      `SAMPLE DATA // ${selectedFamily.name}\n\nThis is a sample file for testing purposes only.\nContact on Session for full data access.`
                    );
                  } else if (selectedFamily.downloadSourceUrl) {
                    window.open(selectedFamily.downloadSourceUrl, '_blank');
                  } else if (selectedFamily.id === 'jobnet') {
                    downloadZipFile(
                      '/download/Free/Job Net.COM.MM ( User Account ).zip',
                      'Job Net.COM.MM (User Account).zip'
                    );
                  } else if (selectedFamily.id === 'yoma-fleet') {
                    downloadZipFile(
                      '/download/Free/yoma-fleet/Data-Minimum-DYSPHOR1A.zip',
                      'Data-Minimum-DYSPHOR1A.zip'
                    );
                  } else {
                    downloadText(
                      `${selectedFamily.id}_sample_root0x.txt`,
                      `SAMPLE DATA // ${selectedFamily.name}\n\nThis is a sample file for testing purposes only.\nContact on Session for full data access.`
                    );
                  }
                }}
                className="clip-corner flex items-center justify-center gap-2 px-5 py-2.5 border border-red-600/70 text-red-400 hover:bg-red-950/40 text-sm uppercase tracking-wider transition-colors">
                  <Download className="w-4 h-4" />
                  Download Sample
                </button>
                <button
                onClick={() => window.open('session://05f4077494f42fa2d884bab6dbcaebf58baf89b474a6dd4187dc31474e1bb9004a', '_blank')}
                className="clip-corner flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-red-500 text-black font-bold text-sm uppercase tracking-wider transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  Contact Us On Session
                </button>
                <button
                onClick={() => setSelectedFamily(null)}
                className="clip-corner px-5 py-2.5 bg-red-600 hover:bg-red-500 text-black font-bold text-sm uppercase tracking-wider transition-colors">
                
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}