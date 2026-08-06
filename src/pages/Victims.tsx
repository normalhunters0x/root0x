import { useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { ransomwareData, RansomwareFamily } from '../data/ransomware';

function StatusBadge({ item }: { item: RansomwareFamily }) {
  if (item.status === 'Soon') {
    return (
      <span className="inline-block px-2 py-1 border border-white/40 text-white text-[9px] font-bold uppercase tracking-widest animate-pulse">
        Upcoming
      </span>
    );
  }
  if (item.pricing === 'Free') {
    return (
      <span className="clip-corner inline-block px-2 py-1 bg-red-600 text-black text-[9px] font-bold uppercase tracking-widest">
        Leaked
      </span>
    );
  }
  return (
    <span className="clip-corner inline-block px-2 py-1 border border-red-600 text-red-500 text-[9px] font-bold uppercase tracking-widest">
      For Sale
    </span>
  );
}

export function Victims() {
  const victims = useMemo(
    () =>
      ransomwareData.filter(
        (item) =>
          item.name === 'Strategy First International College' ||
          item.name === 'Job Net .COM.MM'
      ),
    []
  );

  const stats = [
    { label: 'Total Breached', value: victims.length },
    { label: 'Leaked', value: victims.filter((v) => v.status !== 'Soon' && v.pricing === 'Free').length },
    { label: 'For Sale', value: victims.filter((v) => v.pricing === 'Paid').length },
    { label: 'Upcoming', value: victims.filter((v) => v.status === 'Soon').length },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      {/* Section header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 bg-red-600 glow-red" />
          <div className="flex-1">
            <p className="text-[10px] sm:text-[11px] text-red-500 tracking-[0.45em] uppercase font-bold mb-1">
              {'//'} compromised_entities
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
              Victim <span className="text-red-600 glow-text">Database</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] text-white/40 tracking-[0.3em] uppercase">
            <span className="inline-block w-2 h-2 bg-red-600 animate-pulse" />
            Registry // Live
          </div>
        </div>
        <div className="mt-4 h-px bg-gradient-to-r from-red-600/80 via-white/10 to-transparent" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10 mb-8">
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

      {/* Registry table */}
      <div className="corner-brackets bg-black border border-white/10">
        <div className="flex items-center justify-between px-5 py-3 bg-white/[0.04] border-b border-white/10">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
            Victim Registry
          </span>
          <span className="text-[10px] text-red-500 tracking-[0.3em] uppercase">
            Ranked by Impact
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-red-800/60 bg-red-950/30">
                <th className="text-left py-3 px-5 text-[10px] text-red-500 uppercase tracking-widest font-bold w-12">#</th>
                <th className="text-left py-3 px-4 text-[10px] text-red-500 uppercase tracking-widest font-bold">Organization</th>
                <th className="text-left py-3 px-4 text-[10px] text-red-500 uppercase tracking-widest font-bold">Target Sector</th>
                <th className="text-left py-3 px-4 text-[10px] text-red-500 uppercase tracking-widest font-bold">Country</th>
                <th className="hidden lg:table-cell text-left py-3 px-4 text-[10px] text-red-500 uppercase tracking-widest font-bold">Data Size</th>
                <th className="text-left py-3 px-4 text-[10px] text-red-500 uppercase tracking-widest font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {victims.map((item, i) =>
                <tr
                  key={item.id}
                  className="group border-b border-white/5 hover:bg-red-950/20 transition-colors last:border-b-0">
                  <td className="py-4 px-5 text-red-500 font-bold text-xs">
                    {String(i + 1).padStart(2, '0')}
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-white font-bold uppercase tracking-wide group-hover:text-red-500 transition-colors">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-white/40 tracking-wider mt-0.5">
                      Detected {item.year} // {item.severity}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white/60">{item.target}</td>
                  <td className="py-4 px-4 text-white/60 uppercase">{item.country}</td>
                  <td className="hidden lg:table-cell py-4 px-4 text-white/50 text-xs">{item.dataSize}</td>
                  <td className="py-4 px-4">
                    <StatusBadge item={item} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-t border-white/10">
          <span className="text-[10px] text-white/40 uppercase tracking-[0.3em]">
            End of registry // {victims.length} entries
          </span>
          <span className="text-[10px] text-red-500 uppercase tracking-[0.3em]">
            Normal Hunters
          </span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 flex items-center gap-3 border border-white/10 bg-black px-5 py-4">
        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
        <p className="text-[11px] text-white/50 leading-relaxed">
          All entities listed are confirmed compromised. Evidence images and account summaries
          are available upon request through the operators' secure channels.
        </p>
      </div>
    </section>
  );
}
