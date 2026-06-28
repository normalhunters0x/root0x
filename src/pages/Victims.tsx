import { ransomwareData } from '../data/ransomware';

export function Victims() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="border border-red-900/40 bg-black/70 p-8 sm:p-10">
        <p className="text-red-500/80 text-xs tracking-[0.4em] uppercase mb-3">
          // victim_database
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-2">
          Victim <span className="text-red-500 glow-text">Database</span>
        </h2>
        <p className="text-sm text-zinc-500 max-w-xl mb-8">
          Complete list of compromised organizations and affected entities.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-red-900/40">
                <th className="text-left py-3 px-4 text-red-500 uppercase tracking-widest text-xs font-bold">Organization</th>
                <th className="text-left py-3 px-4 text-red-500 uppercase tracking-widest text-xs font-bold">Target Sector</th>
                <th className="text-left py-3 px-4 text-red-500 uppercase tracking-widest text-xs font-bold">Country</th>
                <th className="text-left py-3 px-4 text-red-500 uppercase tracking-widest text-xs font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {ransomwareData
                .filter((item) => 
                  item.name === 'Strategy First International College' || 
                  item.name === 'Job Net .COM.MM'
                )
                .map((item) => (
                <tr key={item.id} className="border-b border-zinc-800 hover:bg-red-950/20 transition-colors">
                  <td className="py-3 px-4 text-zinc-200 font-medium">{item.name}</td>
                  <td className="py-3 px-4 text-zinc-400">{item.target}</td>
                  <td className="py-3 px-4 text-zinc-400">{item.country}</td>
                  <td className="py-3 px-4">
                    {item.status === 'Soon' ? (
                      <span className="px-2 py-1 bg-red-600 text-black text-[10px] font-bold uppercase tracking-wider">SOON</span>
                    ) : (
                      <span className="px-2 py-1 bg-green-600 text-black text-[10px] font-bold uppercase tracking-wider">ACTIVE</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
