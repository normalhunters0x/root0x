import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Send,
  Terminal,
  X,
  Database,
  AlertTriangle,
  Skull,
  Shield } from
'lucide-react';
import { ransomwareData, RansomwareFamily } from './data/ransomware';
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

const HERO = {
  breaches: {
    label: 'root@normal-hunters:~$',
    title: ['DATA ', 'BREACHES'],
    path: 'data_breaches',
    short: 'Breaches',
    desc: 'Exclusive database of compromised corporate data, stolen credentials, and sensitive information. Access premium datasets from major breaches.',
  },
  victims: {
    label: 'root@normal-hunters:~$',
    title: ['VICTIM ', 'DATABASE'],
    path: 'victim_database',
    short: 'Victims',
    desc: 'Complete registry of compromised organizations, leaked credentials and affected entities from active operations.',
  },
  mirror: {
    label: 'root@normal-hunters:~$',
    title: ['MIRROR / ', 'TOR'],
    path: 'mirror_tor',
    short: 'Mirror/Tor',
    desc: 'Live network status for Tor onions and clearnet mirrors. Verify reachability and fingerprints before any connection.',
  },
  forums: {
    label: 'root@normal-hunters:~$',
    title: ['BREACH', 'FORUM'],
    path: 'breachforum',
    short: 'BreachForums',
    desc: 'The BreachForums network is offline. Archive records, operator statements and migration logs for the defunct platform.',
  },
  contact: {
    label: 'root@normal-hunters:~$',
    title: ['SECURE ', 'CHANNELS'],
    path: 'secure_channels',
    short: 'Contact',
    desc: 'Encrypted communication channels for Normal Hunters inquiries, exclusive database access and secure transaction coordination.',
  },
} as const;

type Tab = 'breaches' | 'victims' | 'mirror' | 'forums' | 'contact';

function ForumsHero({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const stats = [
    { label: 'Archived Listings', value: '12,408' },
    { label: 'Verified Vendors', value: '84' },
    { label: 'Days Offline', value: '39' },
    { label: 'Active Operators', value: '3' },
  ];
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
            The network is <span className="text-red-500 font-bold">down</span> // we are not //
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="clip-corner inline-flex items-center gap-2 bg-red-600 text-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest animate-pulse">
            <Skull className="w-3.5 h-3.5" />
            Status: Defunct
          </span>
          <span className="inline-flex items-center gap-2 border border-white/25 text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest">
            <span className="inline-block w-1.5 h-1.5 bg-red-600 animate-pulse" />
            Est. 2024
          </span>
          <span className="inline-flex items-center gap-2 border border-white/25 text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5 text-red-500" />
            Root0x Operator
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-10">
          <a
            href="#content"
            className="clip-corner flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-black font-bold text-sm uppercase tracking-wider transition-colors glow-red">
            <Skull className="w-4 h-4" />
            View The Archive
          </a>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="clip-corner flex items-center gap-2 px-5 py-3 border border-white/25 hover:border-red-600 text-white/70 hover:text-red-400 text-sm uppercase tracking-wider transition-colors cursor-pointer">
            <Terminal className="w-4 h-4" />
            Contact Operators
          </button>
        </div>

        <div className="corner-brackets grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {stats.map((s) =>
            <div key={s.label} className="bg-black px-4 py-5">
              <div className="text-2xl font-bold text-red-500 glow-text">
                {s.value}
              </div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-white/40 mt-1">
                {s.label}
              </div>
            </div>
          )}
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

  const downloadAll = () => {
    const all = ransomwareData.map(buildReport).join('\n\n');
    downloadText('threatintel_dataset_root0x.txt', all);
  };
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
              Breaches
            </button>
            <button
              onClick={() => setActiveTab('victims')}
              className={`hover:text-red-400 transition-colors ${activeTab === 'victims' ? 'text-red-400' : ''}`}>
              Victims
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
      {activeTab === 'forums' ? (
        <ForumsHero onNavigate={setActiveTab} />
      ) : (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <p className="text-red-500/80 text-xs tracking-[0.4em] uppercase mb-4">
            // {HERO[activeTab].label}
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
            {HERO[activeTab].title[0]}
            <span className="text-red-500 glow-text flicker">{HERO[activeTab].title[1]}</span>
            <span className="cursor-blink text-red-500">_</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm sm:text-base text-white/60 leading-relaxed">
            {HERO[activeTab].desc}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {activeTab === 'breaches' && (
              <button
                onClick={downloadAll}
                className="clip-corner flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-black font-bold text-sm uppercase tracking-wider transition-colors glow-red">

                <Download className="w-4 h-4" />
                Download All
              </button>
            )}
            <a
              href="#content"
              className="clip-corner flex items-center gap-2 px-5 py-3 border border-white/25 hover:border-red-600 text-white/70 hover:text-red-400 text-sm uppercase tracking-wider transition-colors">

              <Terminal className="w-4 h-4" />
              {HERO[activeTab].short}
            </a>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-red-900/30 border border-red-900/30">
            {[
              { label: 'Breaches', value: ransomwareData.length },
              {
                label: 'Critical',
                value: ransomwareData.filter((d) => d.severity === 'Critical').length,
              },
              { label: 'Active', value: '2025–2026' },
              { label: 'Seller', value: 'Normal Hunters' },
            ].map((s) =>
              <div key={s.label} className="bg-black/70 px-4 py-5">
                <div className="text-2xl font-bold text-red-500 glow-text">
                  {s.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">
                  {s.label}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

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
                      <Database className="w-5 h-5" />
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
                  if (selectedFamily.id === 'jobnet') {
                    downloadZipFile(
                      '/download/Free/Job Net.COM.MM ( User Account ).zip',
                      'Job Net.COM.MM (User Account).zip'
                    );
                  } else if (selectedFamily.id === 'sfic') {
                    downloadZipFile(
                      '/download/Free/SFIC Student Accounts.xlsx.zip',
                      'SFIC Student Accounts.xlsx.zip'
                    );
                  } else {
                    downloadText(
                      `${selectedFamily.id}_intel_root0x.txt`,
                      buildReport(selectedFamily)
                    );
                  }
                }}
                className="clip-corner flex items-center justify-center gap-2 px-5 py-2.5 border border-red-600/70 text-red-400 hover:bg-red-950/40 text-sm uppercase tracking-wider transition-colors">
                  <Download className="w-4 h-4" />
                  Download Report
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