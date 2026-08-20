import { useMemo, useState, useEffect } from 'react';
import {
  Search,
  Download,
  MessageCircle,
  Database,
  AlertCircle,
  AlertTriangle,
  Timer,
  Shield,
} from 'lucide-react';
import { ransomwareData, RansomwareFamily } from '../data/ransomware';
import { downloadText, downloadZipFile } from '../utils/download';

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

function isValidSaleDate(saleDateTime: string) {
  if (!saleDateTime || saleDateTime === 'Null') return false;
  return !Number.isNaN(new Date(saleDateTime).getTime());
}

function StatusBadge({ family }: { family: RansomwareFamily }) {
  if (family.status === 'Soon') {
    return (
      <span className="inline-block px-2 py-1 border border-white/40 text-white text-[9px] font-bold uppercase tracking-widest animate-pulse">
        Upcoming
      </span>
    );
  }
  if (family.pricing === 'Free') {
    return (
      <span className="clip-corner inline-block px-2.5 py-1 bg-red-600 text-black text-[9px] font-bold uppercase tracking-widest">
        Leaked
      </span>
    );
  }
  return (
    <span className="clip-corner inline-block px-2.5 py-1 border border-red-600 text-red-500 text-[9px] font-bold uppercase tracking-widest">
      For Sale
    </span>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-white/15 bg-white/[0.03]">
      <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-red-500">{label}</span>
      <span className="text-[10px] text-white/70 uppercase tracking-wider truncate max-w-[180px]">
        {value}
      </span>
    </span>
  );
}

function AuctionTimer({ saleDateTime }: { saleDateTime: string }) {
  const { days, hours, seconds } = useCountdown(saleDateTime);
  const cells = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Secs', value: seconds },
  ];
  return (
    <div className="border border-red-900/60 bg-red-950/10 p-4 mb-5">
      <div className="flex items-center gap-2 mb-3">
        <Timer className="w-3.5 h-3.5 text-red-500" />
        <p className="text-[9px] font-bold text-red-500 tracking-[0.35em] uppercase">
          Auction timer // USA timezone
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {cells.map((cell) => (
          <div key={cell.label} className="bg-black border border-white/10 py-2.5 text-center">
            <div className="text-xl font-bold text-red-500 glow-text">
              {String(cell.value).padStart(2, '0')}
            </div>
            <div className="text-[8px] text-white/40 uppercase tracking-[0.25em] mt-1">
              {cell.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BreachCard({
  family,
  onCardClick,
  filterType,
}: {
  family: RansomwareFamily;
  onCardClick: (family: RansomwareFamily) => void;
  filterType: string;
}) {
  const showTimer = isValidSaleDate(family.saleDateTime);
  const warningActive = filterType === 'Warning' && family.warning;

  return (
    <article
      key={family.id}
      onClick={() => onCardClick(family)}
      className="corner-brackets group relative flex flex-col bg-black border border-white/10 hover:border-red-600/80 transition-all duration-300 cursor-pointer">
      <div className={`h-1 w-full ${family.warning ? 'bg-red-600' : 'bg-white/10'}`} />

      <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-white/[0.04] border-b border-white/10">
        <span className="text-[9px] text-white/40 tracking-[0.3em] uppercase truncate">
          ID_{family.id.toUpperCase()}
        </span>
        <StatusBadge family={family} />
      </div>

      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white uppercase tracking-wide group-hover:text-red-500 transition-colors leading-tight">
              {family.name}
            </h3>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] mt-1.5">
              {family.target}
            </p>
          </div>
          <div className="p-2.5 border border-red-700/50 bg-red-950/40 text-red-500 shrink-0 group-hover:bg-red-950/70 transition-colors">
            <Database className="w-5 h-5" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          <Chip label="Sector" value={family.target} />
          <Chip label="Country" value={family.country} />
          <Chip label="Records" value={family.dataSize} />
          {family.buyerRestriction && family.buyerRestriction !== 'Null' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-red-900/70 bg-red-950/30">
              <Shield className="w-3 h-3 text-red-500" />
              <span className="text-[9px] text-red-400 uppercase tracking-wider">
                {family.buyerRestriction}
              </span>
            </span>
          )}
        </div>

        <p className="text-xs text-white/50 leading-relaxed mb-5 line-clamp-3">
          {family.description}
        </p>

        {family.warning && showTimer && <AuctionTimer saleDateTime={family.saleDateTime} />}
        {warningActive && (
          <div className="flex items-center gap-2 border border-red-600/60 bg-red-950/30 px-3 py-2 mb-5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="text-[9px] text-red-400 uppercase tracking-[0.3em] font-bold">
              Warning // forced leak window active
            </span>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/10 bg-white/[0.03]">
        {family.status === 'Soon' ? (
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 text-white/30 border border-white/10 font-bold text-sm uppercase tracking-wider cursor-not-allowed">
            Transfer Pending
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
              } else if (family.id === 'sfic') {
                downloadZipFile(
                  '/download/Free/SFIC Student Accounts.xlsx.zip',
                  'SFIC Student Accounts.xlsx.zip'
                );
              } else {
                downloadText(
                  `${family.id}_intel_root0x.txt`,
                  buildReport(family)
                );
              }
            }}
            className="clip-corner w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-500 text-black font-bold text-sm uppercase tracking-wider transition-all duration-200">
            <Download className="w-4 h-4" />
            Download Database
          </button>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] text-white/40 uppercase tracking-[0.3em]">Starting bid</span>
              <span className="text-lg font-bold text-red-500 glow-text">
                {family.price || '$$$'}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="clip-corner w-full flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-red-500 text-black font-bold text-sm uppercase tracking-wider transition-all duration-200">
              <MessageCircle className="w-4 h-4" />
              Contact Us On Session
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
  }, [searchQuery, filterType]);

  const filterOptions = ['All', 'Free', 'Paid / Selling', 'Warning', 'Coming Soon'];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">


      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500/70" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="scan breaches..."
            className="w-full bg-black border border-white/15 focus:border-red-600 outline-none text-sm text-white placeholder-white/30 pl-9 pr-3 py-3 transition-colors font-hack"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) =>
            <button
              key={option}
              type="button"
              onClick={() => setFilterType(option)}
              className={`clip-corner px-4 py-2 text-xs uppercase tracking-widest border transition-all cursor-pointer ${filterType === option ? 'border-red-600 bg-red-950/50 text-red-400 glow-red' : 'border-white/15 text-white/40 hover:border-red-600/60 hover:text-red-400'}`}>
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
        <div className="border border-dashed border-white/15 bg-black/60 py-24 text-center">
            <AlertCircle className="w-12 h-12 text-red-600/60 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white uppercase tracking-widest">
              No breaches found
            </h3>
            <p className="text-white/40 mt-1 text-sm">
              Adjust search parameters or filter configuration.
            </p>
          </div>
      )}
    </section>
  );
}
