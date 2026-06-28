import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Send,
  Terminal,
  X,
  AlertCircle } from
'lucide-react';
import { ransomwareData, RansomwareFamily } from './data/ransomware';
import { useScreenInit } from './useScreenInit';
import { Breaches } from './pages/Breaches';
import { Victims } from './pages/Victims';
import { Contact } from './pages/Contact';
import { downloadText, downloadZipFile } from './utils/download';
const TELEGRAM = '@normalhunters0x';

function severityColor(severity: string) {
  switch (severity) {
    case 'Critical':
      return 'text-red-400 border-red-500/50 bg-red-500/10';
    case 'Medium':
      return 'text-orange-300 border-orange-500/40 bg-orange-500/10';
    default:
      return 'text-zinc-300 border-zinc-500/40 bg-zinc-500/10';
  }
}

function pricingColor(pricing: string) {
  switch (pricing) {
    case 'Paid':
      return 'text-green-400 border-green-500/50 bg-green-500/10';
    case 'Free':
      return 'text-blue-400 border-blue-500/50 bg-blue-500/10';
    default:
      return 'text-zinc-300 border-zinc-500/40 bg-zinc-500/10';
  }
}

function buildReport(family: RansomwareFamily) {
  return [
  '==================================================',
  `  THREAT INTELLIGENCE REPORT // ${family.name}`,
  '  Source: ThreatIntel Database — operated by root0x',
  '==================================================',
  '',
  `Threat Name    : ${family.name}`,
  `First Detected : ${family.year}`,
  `Severity Level : ${family.severity}`,
  `Pricing Model  : ${family.pricing}`,
  `Warning Status : ${family.warning ? 'ACTIVE' : 'INACTIVE'}`,
  `Target Sector  : ${family.target}`,
  '',
  '-- THREAT DESCRIPTION --',
  family.description,
  '',
  '-- ATTACK VECTOR --',
  family.mechanism,
  '',
  '-- NOTABLE INCIDENT --',
  family.notableAttack,
  '',
  '-- COUNTERMEASURES --',
  ...family.prevention.map((p) => ` - ${p}`),
  '',
  'INTELLIGENCE GATHERING PURPOSE ONLY. No malicious code included.',
  ''].
  join('\n');
}
export function App() {
  useScreenInit();
  const [activeTab, setActiveTab] = useState<'breaches' | 'victims' | 'contact'>('breaches');
  const [selectedFamily, setSelectedFamily] = useState<RansomwareFamily | null>(
    null
  );
  
  const downloadAll = () => {
    const all = ransomwareData.map(buildReport).join('\n\n');
    downloadText('threatintel_dataset_root0x.txt', all);
  };
  return (
    <div className="hacker-bg scanline min-h-screen w-full text-zinc-200 font-hack pb-16 selection:bg-red-500/30">
      {/* Nav Bar */}
      <header className="sticky top-0 z-40 border-b border-red-900/40 bg-black/80 backdrop-blur">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="p-2 border border-red-700/60 bg-red-950/40 glow-red">
              <img src="/src/images/logo.jpg" alt="root0x logo" className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <span className="text-lg font-bold text-red-500 glow-text tracking-widest">
               DYSPHOR1A
              </span>
              <p className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase">
                Normal Hunters
              </p>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-zinc-400">
            <button
              onClick={() => setActiveTab('breaches')}
              className={`hover:text-red-400 transition-colors ${activeTab === 'breaches' ? 'text-red-400' : ''}`}>
              Breaches
            </button>
            <button
              onClick={() => setActiveTab('victims')}
              className={`hover:text-red-400 transition-colors ${activeTab === 'victims' ? 'text-red-400' : ''}`}>
              Victims
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

      {/* Marquee disclaimer ticker */}
      <div
        id="top"
        className="overflow-hidden border-b border-red-900/30 bg-red-950/20 py-2">
        
        <div className="marquee-track text-[11px] uppercase tracking-[0.25em] text-red-400/80">
          {Array.from({
            length: 2
          }).map((_, i) =>
          <span key={i} className="px-4">
              ⚠ NORMAL HUNTERS ACTIVE // EXCLUSIVE DATABASES AVAILABLE //
              DYSPHOR1A GROUP DATA FOR SALE // ENCRYPTED PAYLOADS READY ⚠
              EXCLUSIVE ACCESS ONLY // LIMITED TIME OFFERS //
            </span>
          )}
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <p className="text-red-500/80 text-xs tracking-[0.4em] uppercase mb-4">
          // root@normal-hunters:~$
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-100">
          DATA{' '}
          <span className="text-red-500 glow-text flicker">BREACHES</span>
          <span className="cursor-blink text-red-500">_</span>
        </h1>
        <p className="mt-5 max-w-2xl text-sm sm:text-base text-zinc-400 leading-relaxed">
          Exclusive database of compromised corporate data, stolen credentials,
          and sensitive information. Access premium datasets from major breaches.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            onClick={downloadAll}
            className="flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-black font-bold text-sm uppercase tracking-wider transition-colors glow-red">
            
            <Download className="w-4 h-4" />
            Download All
          </button>
          <a
            href="#threats"
            className="flex items-center gap-2 px-5 py-3 border border-zinc-700 hover:border-red-600 text-zinc-300 hover:text-red-400 text-sm uppercase tracking-wider transition-colors">
            
            <Terminal className="w-4 h-4" />
            View Breaches
          </a>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-red-900/30 border border-red-900/30">
          {[
          {
            label: 'Breaches',
            value: ransomwareData.length
          },
          {
            label: 'Critical',
            value: ransomwareData.filter((d) => d.severity === 'Critical').
            length
          },
          {
            label: 'Active',
            value: '2025–2026'  
          },
          {
            label: 'Seller',
            value: 'Normal Hunters'
          }].
          map((s) =>
          <div key={s.label} className="bg-black/70 px-4 py-5">
              <div className="text-2xl font-bold text-red-500 glow-text">
                {s.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mt-1">
                {s.label}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 'breaches' && (
        <Breaches onCardClick={setSelectedFamily} />
      )}
      {activeTab === 'victims' && (
        <Victims />
      )}
      {activeTab === 'contact' && (
        <Contact />
      )}


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
            className="relative w-full max-w-2xl my-8 bg-zinc-950 border border-red-800/60 glow-red">
            
              <div className="flex items-start justify-between gap-4 p-6 border-b border-zinc-800">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl font-bold text-zinc-100">
                      {selectedFamily.name}
                    </h2>
                    <span
                    className={`px-2 py-0.5 text-[10px] uppercase tracking-wider border ${severityColor(selectedFamily.severity)}`}>
                    
                      {selectedFamily.severity}
                    </span>
                    <span
                    className={`px-2 py-0.5 text-[10px] uppercase tracking-wider border ${pricingColor(selectedFamily.pricing)}`}>
                    
                      {selectedFamily.pricing}
                    </span>
                    {selectedFamily.warning && (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-red-400">
                        <AlertCircle className="w-3 h-3" />
                        Warning
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mt-2">
                    Detected {selectedFamily.year} // Target: {selectedFamily.target}
                  </p>
                </div>
                <button
                onClick={() => setSelectedFamily(null)}
                aria-label="Close"
                className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-950/40 transition-colors">
                
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                <section>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-500/80 mb-2">
                    {'>'} Description
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {selectedFamily.description}
                  </p>
                </section>

                <section>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-500/80 mb-2">
                    {'>'} Infection Mechanism
                  </h3>
                  <div className="bg-black/60 border border-zinc-800 p-4 text-sm text-zinc-400 leading-relaxed">
                    {selectedFamily.mechanism}
                  </div>
                </section>

                <section>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-500/80 mb-2">
                    {'>'} Notable Attack
                  </h3>
                  <p className="text-sm text-zinc-300 italic border-l-2 border-red-700/60 pl-4 py-1">
                    {selectedFamily.notableAttack}
                  </p>
                </section>

                {selectedFamily.accountSummary && (
                  <section>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-500/80 mb-2">
                      {'>'} Account Summary
                    </h3>
                    <div className="bg-black/60 border border-zinc-800 p-4 text-sm text-zinc-400 leading-relaxed whitespace-pre">
                      {selectedFamily.accountSummary}
                    </div>
                  </section>
                )}

                {selectedFamily.imageLinks && selectedFamily.imageLinks.length > 0 && (
                  <section>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-500/80 mb-2">
                      {'>'} Evidence Images
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

              <div className="flex flex-col sm:flex-row gap-3 justify-end p-6 border-t border-zinc-800">
                <button
                onClick={() => {
                  if (selectedFamily.id === 'jobnet') {
                    downloadZipFile(
                      '/download/Free/Job Net.COM.MM ( User Account ).zip',
                      'Job Net.COM.MM (User Account).zip'
                    );
                  } else {
                    downloadText(
                      `${selectedFamily.id}_intel_root0x.txt`,
                      buildReport(selectedFamily)
                    );
                  }
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 border border-red-700/60 text-red-400 hover:bg-red-950/40 text-sm uppercase tracking-wider transition-colors">
                  <Download className="w-4 h-4" />
                  Download Report
                </button>
                <button
                onClick={() => setSelectedFamily(null)}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-black font-bold text-sm uppercase tracking-wider transition-colors">
                
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}