import { useMemo, useState, useEffect } from 'react';
import {
  Search,
  Download,
  MessageCircle,
  Database,
  Shield,
  AlertCircle } from 'lucide-react';
import { ransomwareData, RansomwareFamily } from '../data/ransomware';
import { downloadText, downloadZipFile } from '../utils/download';

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

function formatCountdown(saleDateTime: string): { days: number; hours: number; seconds: number } {
  try {
    const saleDate = new Date(saleDateTime);
    const now = new Date();
    const diff = saleDate.getTime() - now.getTime();
    
    if (diff <= 0) {
      return { days: 0, hours: 0, seconds: 0 };
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, seconds };
  } catch (error) {
    return { days: 0, hours: 0, seconds: 0 };
  }
}

function useCountdown(saleDateTime: string) {
  const [countdown, setCountdown] = useState(() => formatCountdown(saleDateTime));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(formatCountdown(saleDateTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [saleDateTime]);
  
  return countdown;
}

function BreachCard({ family, onCardClick, filterType }: { family: RansomwareFamily; onCardClick: (family: RansomwareFamily) => void; filterType: string }) {
  const countdown = useCountdown(family.saleDateTime || '');
  
  return (
    <article
      key={family.id}
      onClick={() => onCardClick(family)}
      className={`group relative flex flex-col bg-gradient-to-br from-zinc-950/95 to-black/95 hover:shadow-2xl hover:shadow-red-900/30 transition-all duration-300 cursor-pointer ${filterType === 'Warning' && family.warning ? 'border-orange-500/60 hover:border-orange-400/80' : 'border-red-900/40 hover:border-red-600/60'}`}>
      
        {family.status === 'Soon' && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-red-600 text-black text-[10px] font-bold uppercase tracking-wider animate-pulse">
            SOON
          </div>
        )}
        
        {filterType === 'Warning' && family.warning && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-orange-600 text-black text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 animate-pulse">
            ⚠️ WARNING
          </div>
        )}
        
        <div className="p-6 flex-1">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 border border-red-700/60 bg-red-950/30 shadow-lg shadow-red-900/20">
              <Database className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-red-500 uppercase tracking-wider mb-1 group-hover:text-red-400 transition-colors">
                {family.name}
              </h3>
              <p className="text-[11px] text-zinc-500 uppercase tracking-widest">
                {family.target}
              </p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-zinc-300 bg-black/40 px-3 py-2 border border-zinc-800">
              <Database className="w-4 h-4 text-red-500" />
              <span className="font-mono">{family.dataSize}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-300 bg-black/40 px-3 py-2 border border-zinc-800">
              <Shield className="w-4 h-4 text-red-500" />
              <span className="font-mono">{family.buyerRestriction}</span>
            </div>
          </div>
          
          <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-2">
            {family.description}
          </p>
          
          <div className="border-t border-red-900/30 pt-4">
            {family.warning && (
              <>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">COUNTDOWN TIMER (USA TIMEZONE)</p>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-500 glow-text">{countdown.days}</p>
                    <p className="text-[10px] text-zinc-500 uppercase">Days</p>
                  </div>
                  <p className="text-red-500 font-bold">:</p>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-500 glow-text">{countdown.hours}</p>
                    <p className="text-[10px] text-zinc-500 uppercase">Hours</p>
                  </div>
                  <p className="text-red-500 font-bold">:</p>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-500 glow-text">{countdown.seconds}</p>
                    <p className="text-[10px] text-zinc-500 uppercase">Secs</p>
                  </div>
                </div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">SALE START THE</p>
              </>
            )}
            <p className="text-2xl font-bold text-red-500 uppercase tracking-wider glow-text">
              {family.saleDate}
            </p>
          </div>
        </div>
        
        <div className="p-4 border-t border-red-900/30">
          {family.status === 'Soon' ? (
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 text-zinc-400 border border-zinc-700 font-bold text-sm uppercase tracking-wider cursor-not-allowed">
              COMING SOON
            </button>
          ) : family.pricing === 'Free' ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (family.id === 'jobnet') {
                  downloadZipFile(
                    '/download/Free/Job Net.COM.MM ( User Account ).zip',
                    'Job Net.COM.MM (User Account).zip'
                  );
                } else {
                  downloadText(
                    `${family.id}_intel_root0x.txt`,
                    buildReport(family)
                  );
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black hover:bg-zinc-900 text-white border border-red-600 font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] glow-red">
              <Download className="w-4 h-4" />
              DOWNLOAD FREE
            </button>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">CATEGORY: PAID</span>
                <span className="text-lg font-bold text-red-500 glow-text">{family.price || '$$$'}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-500 text-black font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] glow-red">
                <MessageCircle className="w-4 h-4" />
                CONTACT US ON SESSION
              </button>
            </>
          )}
        </div>
      </article>
  );
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

export function Breaches({ onCardClick }: { onCardClick: (family: RansomwareFamily) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  
  const filteredData = useMemo(() => {
    return ransomwareData.filter((item) => {
      const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesFilter = true;
      if (filterType === 'Free') {
        matchesFilter = item.pricing === 'Free' && item.status !== 'Soon';
      } else if (filterType === 'Paid / Selling') {
        matchesFilter = item.pricing === 'Paid';
      } else if (filterType === 'Warning') {
        matchesFilter = item.warning === true;
      } else if (filterType === 'Coming Soon') {
        matchesFilter = item.status === 'Soon';
      }
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterType, ransomwareData]);
  
  const filterOptions = ['All', 'Free', 'Paid / Selling', 'Warning', 'Coming Soon'];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="scan breaches..."
            className="w-full bg-black/60 border border-zinc-800 focus:border-red-600 outline-none text-sm text-zinc-200 placeholder-zinc-600 pl-9 pr-3 py-3 transition-colors font-hack" />
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) =>
            <button
              key={option}
              type="button"
              onClick={() => setFilterType(option)}
              className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all cursor-pointer ${filterType === option ? 'border-red-600 bg-red-950/50 text-red-400 glow-red' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'}`}>
                {option}
              </button>
          )}
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((family) => (
              <BreachCard key={family.id} family={family} onCardClick={onCardClick} filterType={filterType} />
            ))}
          </div>
      ) : (
        <div className="text-center py-24 border border-dashed border-zinc-800 bg-black/40">
            <AlertCircle className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-zinc-300">
              No breaches found
            </h3>
            <p className="text-zinc-600 mt-1 text-sm">
              Adjust search parameters or filter configuration.
            </p>
          </div>
      )}
      </section>
  );
}
