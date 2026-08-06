import { Fragment, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  Check,
  ChevronDown,
  Copy,
  Globe,
  Link2,
  Network,
  Radio,
  Server,
} from 'lucide-react';

type MirrorStatus = 'up' | 'down';

interface Mirror {
  id: string;
  name: string;
  type: 'TOR' | 'HTTPS' | 'IPFS';
  url: string;
  uptime: string;
  latency: string;
  status: MirrorStatus;
  nodes: string;
  fingerprint: string;
  lastCheck: string;
  note: string;
}

const MIRRORS: Mirror[] = [
  {
    id: 'onion-01',
    name: 'Primary V3 Onion',
    type: 'TOR',
    url: 'http://normalhunters0x.onion',
    uptime: '99.8%',
    latency: '182ms',
    status: 'up',
    nodes: '3-hop Tor circuit',
    fingerprint: 'ED25519 · 7A1F…3B9E',
    lastCheck: '11s ago',
    note: 'Primary access point. Expect slower response due to onion routing.',
  },
  {
    id: 'onion-02',
    name: 'Backup Onion',
    type: 'TOR',
    url: 'http://nh4x7qu2a3.onion',
    uptime: '97.4%',
    latency: '241ms',
    status: 'up',
    nodes: '3-hop Tor circuit',
    fingerprint: 'ED25519 · C42D…901A',
    lastCheck: '23s ago',
    note: 'Failover mirror, re-synced every 15 minutes from the primary node.',
  },
  {
    id: 'mirror-01',
    name: 'Clearnet Edge',
    type: 'HTTPS',
    url: 'https://nh0x.example.net',
    uptime: '99.2%',
    latency: '38ms',
    status: 'up',
    nodes: 'CDN edge · EU',
    fingerprint: 'TLS · SHA-256 F1B7…88D2',
    lastCheck: '4s ago',
    note: 'Clearnet fallback. Never exchange personal data over this channel.',
  },
  {
    id: 'mirror-02',
    name: 'IPFS Mirror',
    type: 'IPFS',
    url: 'ipfs://QmNQ2U9…xR4m',
    uptime: '91.6%',
    latency: '604ms',
    status: 'down',
    nodes: 'Distributed pin set',
    fingerprint: 'CID · SHA-256',
    lastCheck: '47m ago',
    note: 'Gateway currently unreachable. Pins remain intact on the network.',
  },
];

const CHANNELS: { label: string; detail: string; status: MirrorStatus; icon: typeof Radio }[] = [
  { label: 'Onion Network', detail: '2 of 2 mirrors online', status: 'up', icon: Radio },
  { label: 'Clearnet CDN', detail: '1 of 1 mirror online', status: 'up', icon: Globe },
  { label: 'IPFS Gateway', detail: 'routing issue reported', status: 'down', icon: Network },
  { label: 'Onion Mail Relay', detail: 'maintenance window', status: 'down', icon: Server },
];

const STEPS = [
  'Install Tor Browser from the official project only.',
  'Open the primary onion address and verify the ed25519 fingerprint.',
  'Keep JavaScript disabled and never reuse clearnet credentials.',
  'Report unreachable mirrors through the secure contact channels.',
];

function StatusPill({ status }: { status: MirrorStatus }) {
  if (status === 'up') {
    return (
      <span className="inline-flex items-center gap-1.5 border border-white/25 text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest">
        <span className="inline-block w-1.5 h-1.5 bg-red-600 animate-pulse" />
        Up
      </span>
    );
  }
  return (
    <span className="clip-corner inline-flex items-center gap-1.5 bg-red-600 text-black px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest animate-pulse">
      Down
    </span>
  );
}

function PageHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <div className="h-10 w-1 bg-red-600 glow-red" />
        <div className="flex-1">
          <p className="text-[10px] sm:text-[11px] text-red-500 tracking-[0.45em] uppercase font-bold mb-1">
            {'//'} tor_mirrors
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
            Mirror / <span className="text-red-600 glow-text">Tor</span>
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[10px] text-white/40 tracking-[0.3em] uppercase">
          <span className="inline-block w-2 h-2 bg-red-600 animate-pulse" />
          Routing // Live
        </div>
      </div>
      <div className="mt-4 h-px bg-gradient-to-r from-red-600/80 via-white/10 to-transparent" />
    </div>
  );
}

function SectionTitle({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-red-600 glow-red" />
        <div>
          <p className="text-[10px] sm:text-[11px] text-red-500 tracking-[0.45em] uppercase font-bold mb-1">
            {'//'} {eyebrow}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
            {title} <span className="text-red-600 glow-text">{accent}</span>
          </h3>
        </div>
      </div>
      <div className="mt-3 h-px bg-gradient-to-r from-red-600/80 via-white/10 to-transparent" />
    </div>
  );
}

function MirrorLinkRow({ mirror }: { mirror: Mirror }) {
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(mirror.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="corner-brackets group bg-black border border-white/10 hover:border-red-600/60 transition-colors p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-red-500">{mirror.name}</span>
            <span className="clip-corner px-1.5 py-0.5 border border-white/20 text-white/60 text-[8px] uppercase tracking-widest">
              {mirror.type}
            </span>
            <StatusPill status={mirror.status} />
          </div>
          <p className="font-mono text-sm text-white/80 truncate">{mirror.url}</p>
          <p className="text-[10px] text-white/40 mt-1.5 tracking-wider">
            FP {mirror.fingerprint} · {mirror.lastCheck}
          </p>
        </div>
        <button
          onClick={copy}
          aria-label="Copy address"
          className="p-2 border border-white/15 text-white/50 hover:text-red-400 hover:border-red-600/60 transition-colors shrink-0">
          {copied ? <Check className="w-4 h-4 text-red-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

function MirrorTable() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="corner-brackets bg-black border border-white/10">
      <div className="flex items-center justify-between px-5 py-3 bg-white/[0.04] border-b border-white/10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">Mirror Status Table</span>
        <span className="text-[10px] text-red-500 tracking-[0.3em] uppercase">Live Routing</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-red-800/60 bg-red-950/30">
              <th className="text-left py-3 px-5 text-[10px] text-red-500 uppercase tracking-widest font-bold w-12">#</th>
              <th className="text-left py-3 px-4 text-[10px] text-red-500 uppercase tracking-widest font-bold">Mirror</th>
              <th className="hidden md:table-cell text-left py-3 px-4 text-[10px] text-red-500 uppercase tracking-widest font-bold">Address</th>
              <th className="text-left py-3 px-4 text-[10px] text-red-500 uppercase tracking-widest font-bold">Uptime</th>
              <th className="text-left py-3 px-4 text-[10px] text-red-500 uppercase tracking-widest font-bold">Latency</th>
              <th className="text-left py-3 px-4 text-[10px] text-red-500 uppercase tracking-widest font-bold">Status</th>
              <th className="text-right py-3 px-4 text-[10px] text-red-500 uppercase tracking-widest font-bold">View</th>
            </tr>
          </thead>
          <tbody>
            {MIRRORS.map((m, i) => (
              <Fragment key={m.id}>
                <tr
                  className="border-b border-white/5 hover:bg-red-950/20 transition-colors cursor-pointer"
                  onClick={() => setOpenId(openId === m.id ? null : m.id)}>
                  <td className="py-3.5 px-5 text-red-500 font-bold text-xs">{String(i + 1).padStart(2, '0')}</td>
                  <td className="py-3.5 px-4">
                    <div className="text-white font-bold uppercase tracking-wide text-xs">{m.name}</div>
                    <div className="text-[10px] text-white/40 mt-0.5">{m.type} · {m.nodes}</div>
                  </td>
                  <td className="hidden md:table-cell py-3.5 px-4 font-mono text-white/60 text-xs">{m.url}</td>
                  <td className="py-3.5 px-4 text-white/60 text-xs">{m.uptime}</td>
                  <td className="py-3.5 px-4 text-white/60 text-xs">{m.latency}</td>
                  <td className="py-3.5 px-4">
                    <StatusPill status={m.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[9px] text-red-500 uppercase tracking-widest font-bold">
                      Details
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openId === m.id ? 'rotate-180' : ''}`} />
                    </span>
                  </td>
                </tr>
                <AnimatePresence>
                  {openId === m.id && (
                    <tr key={`${m.id}-detail`} className="border-b border-red-900/40">
                      <td colSpan={7} className="p-0">
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden">
                          <div className="bg-red-950/20 p-5 sm:p-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                              <div className="space-y-2.5 text-xs">
                                <p className="flex items-center gap-2 text-white/70">
                                  <Network className="w-3.5 h-3.5 text-red-500 shrink-0" />
                                  Routing:
                                  <span className="text-white">{m.nodes}</span>
                                </p>
                                <p className="flex items-center gap-2 text-white/70">
                                  <Link2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                                  Fingerprint:
                                  <span className="font-mono text-white">{m.fingerprint}</span>
                                </p>
                                <p className="flex items-center gap-2 text-white/70">
                                  <Activity className="w-3.5 h-3.5 text-red-500 shrink-0" />
                                  Last check:
                                  <span className="text-white">{m.lastCheck}</span>
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-white/50 leading-relaxed">{m.note}</p>
                                <p className={`mt-3 text-[10px] font-bold uppercase tracking-[0.3em] ${m.status === 'up' ? 'text-white' : 'text-red-400'}`}>
                                  Reachability: {m.status === 'up' ? 'CONFIRMED' : 'BLOCKED'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function MirrorTor() {
  const torMirrors = MIRRORS.filter((m) => m.type === 'TOR');
  const clearMirrors = MIRRORS.filter((m) => m.type !== 'TOR');

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <PageHeader />

      {/* Connection status */}
      <SectionTitle eyebrow="network_monitor" title="Connection" accent="Status" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {CHANNELS.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="corner-brackets bg-black border border-white/10 p-5">
              <div className="flex items-center justify-between gap-2 mb-3">
                <Icon className="w-4 h-4 text-red-500" />
                <StatusPill status={c.status} />
              </div>
              <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] mb-1">{c.label}</p>
              <p className="text-[11px] text-white/50">{c.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Tor links */}
      <SectionTitle eyebrow="onion_links" title="Tor" accent="Links" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {torMirrors.map((m) => (
          <MirrorLinkRow key={m.id} mirror={m} />
        ))}
      </div>

      {/* Mirrors */}
      <SectionTitle eyebrow="fallback_nodes" title="Mirror" accent="Nodes" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {clearMirrors.map((m) => (
          <MirrorLinkRow key={m.id} mirror={m} />
        ))}
      </div>

      {/* Status table with view details */}
      <SectionTitle eyebrow="live_telemetry" title="Status" accent="Table" />
      <MirrorTable />

      {/* Access guide */}
      <div className="mt-10">
        <SectionTitle eyebrow="first_steps" title="Access" accent="Guide" />
        <div className="grid sm:grid-cols-2 gap-4">
          {STEPS.map((s, i) => (
            <div key={i} className="corner-brackets flex items-start gap-4 bg-black border border-white/10 p-5">
              <span className="text-red-500 font-bold text-lg glow-text">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-sm text-white/60 leading-relaxed">{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notice */}
      <div className="mt-8 flex items-start gap-3 border border-red-600/60 bg-red-950/30 px-5 py-4">
        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-red-300/80 leading-relaxed">
          Mirrors rotate without notice. Always re-verify the TLS / ed25519 fingerprint before
          proceeding. Never access the network from corporate or monitored infrastructure.
        </p>
      </div>
    </section>
  );
}
