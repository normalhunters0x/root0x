import { useMemo, useState } from 'react';
import {
  Search,
  Download,
  MessageCircle,
  Database,
  AlertCircle,
  AlertTriangle,
  Shield,
} from 'lucide-react';
import { ransomwareData, RansomwareFamily } from '../data/ransomware';
import { downloadText, downloadFile } from '../utils/download';

function NewBadge() {
  return (
    <span className="clip-corner inline-block px-2.5 py-1 bg-green-500 text-black text-[9px] font-bold uppercase tracking-widest">
      New
    </span>
  );
}

function StatusBadge({ family }: { family: RansomwareFamily }) {
  if (family.status === 'Soon') {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="inline-block px-2 py-1 border border-white/40 text-white text-[9px] font-bold uppercase tracking-widest animate-pulse">
          Upcoming
        </span>
        {family.isNew && <NewBadge />}
      </span>
    );
  }
  if (family.pricing === 'Free') {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="clip-corner inline-block px-2.5 py-1 bg-red-600 text-black text-[9px] font-bold uppercase tracking-widest">
          Leaked
        </span>
        {family.isNew && <NewBadge />}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="clip-corner inline-block px-2.5 py-1 border border-red-600 text-red-500 text-[9px] font-bold uppercase tracking-widest">
        For Sale
      </span>
      {family.isNew && <NewBadge />}
    </span>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-white/15 bg-white/[0.03]">
      <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-red-500">{label}</span>
      <span className="text-[10px] text-white/70 uppercase tracking-wider truncate max-w-[220px]">
        {value}
      </span>
    </span>
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
        <span className="flex items-center gap-1.5">
          {family.topBadge && (
            <span className="clip-corner inline-block px-2.5 py-1 bg-red-600 text-black text-[9px] font-bold uppercase tracking-widest">
              {family.topBadge}
            </span>
          )}
          <StatusBadge family={family} />
        </span>
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
            {family.logo ? (
              <img src={family.logo} alt={family.name} className="w-5 h-5 object-contain" />
            ) : (
              <Database className="w-5 h-5" />
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          <Chip label="Sector" value={family.target} />
          <Chip label="Country" value={family.country} />
          <Chip label="Records" value={family.dataSize} />
          {family.status === 'Soon' && family.price && <Chip label="Price" value={family.price} />}
          {family.buyerRestriction && family.buyerRestriction !== 'Null' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-red-900/70 bg-red-950/30">
              <Shield className="w-3 h-3 text-red-500" />
              <span className="text-[9px] text-red-400 uppercase tracking-wider">
                {family.buyerRestriction}
              </span>
            </span>
          )}
          {family.samplePath && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-red-900/70 bg-red-950/30">
              <Download className="w-3 h-3 text-red-500" />
              <span className="text-[9px] text-red-400 uppercase tracking-wider">
                {family.sampleFileName || 'Sample Available'}
              </span>
            </span>
          )}
          {family.downloadSourceUrl && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-red-900/70 bg-red-950/30">
              <Download className="w-3 h-3 text-red-500" />
              <span className="text-[9px] text-red-400 uppercase tracking-wider">
                Download Source
              </span>
            </span>
          )}
        </div>

        <p className="text-xs text-white/50 leading-relaxed mb-5 line-clamp-3">
          {family.description}
        </p>

        {family.warnContent && (
          <div className="border border-red-600/60 bg-red-950/30 px-3 py-2 mb-5">
            <p className="text-[10px] text-red-400 uppercase tracking-[0.15em] font-bold whitespace-pre-line leading-relaxed">
              {family.warnContent}
            </p>
          </div>
        )}
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
          <>
            <div className="flex items-center justify-between mb-3 gap-3">
              <span className="text-[9px] text-white/40 uppercase tracking-[0.3em]">Upcoming</span>
              <span className="text-lg font-bold text-red-500 glow-text text-right leading-tight">
                {family.price || '$$$'}
              </span>
            </div>
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 text-white/30 border border-white/10 font-bold text-sm uppercase tracking-wider cursor-not-allowed">
              Transfer Pending
            </button>
          </>
        ) : family.pricing === 'Free' ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (family.samplePath) {
                  downloadFile(family.samplePath, family.sampleFileName || 'sample.txt');
                } else {
                  downloadText(
                    `${family.id}_sample_root0x.txt`,
                    `SAMPLE DATA // ${family.name}\n\nThis is a sample file for testing purposes only.\nContact on Session for full data access.`
                  );
                }
              }}
              className="clip-corner w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-500 text-black font-bold text-sm uppercase tracking-wider transition-all duration-200">
              <Download className="w-4 h-4" />
              Download Sample
            </button>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] text-white/40 uppercase tracking-[0.3em]">For Sale</span>
              <span className="text-lg font-bold text-red-500 glow-text">
                {family.price || '$$$'}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open('session://05f4077494f42fa2d884bab6dbcaebf58baf89b474a6dd4187dc31474e1bb9004a', '_blank');
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


export function Breaches({ onCardClick }: { onCardClick: (family: RansomwareFamily) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');

  const filteredData = useMemo(() => {
    const filtered = ransomwareData.filter((item) => {
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

    return [...filtered].sort((a, b) => {
      if (a.id === 'citizenspay') return -1;
      if (b.id === 'citizenspay') return 1;
      if (filterType !== 'All') return 0;

      const aForSale = a.pricing === 'Paid' && a.status === 'Active';
      const bForSale = b.pricing === 'Paid' && b.status === 'Active';
      const aIsNew = a.isNew === true;
      const bIsNew = b.isNew === true;

      const aPriority = aForSale ? (aIsNew ? 0 : 1) : aIsNew ? 2 : 3;
      const bPriority = bForSale ? (bIsNew ? 0 : 1) : bIsNew ? 2 : 3;

      return aPriority - bPriority;
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
