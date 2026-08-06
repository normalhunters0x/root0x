import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  Archive,
  BadgeCheck,
  Check,
  ChevronDown,
  Copy,
  Crown,
  Fingerprint,
  Flag,
  History,
  KeyRound,
  Link2,
  Network,
  Radio,
  Shield,
  Skull,
  Terminal,
  UserX,
} from 'lucide-react';

const SYS_STATS = [
  { label: 'Network', value: 'DEFUNCT' },
  { label: 'Last Seen', value: '2026.08.06' },
  { label: 'Active Ops', value: '03' },
  { label: 'Mirrors', value: '00' },
];

const TIMELINE = [
  { date: '2026.06.28', title: 'Unplanned Downtime', body: 'Platform unreachable across all domains and mirrors. No broadcast issued.', level: 'warn' },
  { date: '2026.07.11', title: 'Mirrors Offline', body: 'All fallback domains stop resolving; no communication from the administration.', level: 'warn' },
  { date: '2026.07.30', title: 'Network Confirmed Dead', body: 'No heartbeat from internal relays for 48 consecutive hours.', level: 'warn' },
  { date: '2026.08.06', title: 'Status: Defunct', body: 'Operators archive existing listings and migrate to secure channels.', level: 'crit' },
];

const ARCHIVE = [
  { title: 'Marketplace Index', desc: 'Pre-outage listing snapshot', tag: 'Read Only' },
  { title: 'Staff Roster', desc: 'Verified moderators & administrators', tag: 'Archived' },
  { title: 'Rules & Escrow', desc: 'Original trading regulations', tag: 'Preserved' },
  { title: 'Escrow Disputes', desc: 'Closed case log', tag: 'Sealed' },
];

const FAQS = [
  { q: 'Will BreachForums ever come back?', a: 'We do not believe so. The infrastructure is dark and there is no contact from the original administration.' },
  { q: 'Where did the moderators go?', a: 'Active staff, including Normal Hunters, now operate through the secure channels listed under Contact.' },
  { q: 'Are legacy listings still valid?', a: 'Listings published before the outage remain archived. Confirm availability directly with the operator.' },
  { q: 'How can I verify an operator?', a: 'Every verified operator publishes a PGP fingerprint. Cross-check it before any transaction.' },
];

const THREAT_ACTOR = {
  name: 'Breach Forums',
  role: 'Moderator',
  account: 'normalhunters0x',
  network: 'Tor',
  status: 'Defunct',
  url: 'http://breachrkhwgrjq5xasdtybukh7xwfpq3wxopwulk7ghvarig2vkuq4ad.onion/User-normalhunters0x',
};

const ACTOR_READOUTS = [
  { label: 'Classification', value: 'Threat Actor' },
  { label: 'Platform', value: 'Breach Forums' },
  { label: 'Role', value: 'Moderator' },
  { label: 'Account', value: 'normalhunters0x' },
  { label: 'Network', value: 'Tor (onion)' },
  { label: 'Registry', value: 'ID_BF_001' },
  { label: 'Status', value: 'Defunct' },
  { label: 'Verification', value: 'PGP-4096' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45, delay },
});

function ReadoutRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-black px-4 py-3">
      <span className="text-[10px] uppercase tracking-widest text-white/40">{label}</span>
      <span className="font-mono text-[10px] text-red-500 font-bold">{value}</span>
    </div>
  );
}

function CardBand({ left, right, danger }: { left: string; right: string; danger?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-5 py-3 border-b border-white/10 ${danger ? 'bg-red-950/40 border-red-800/40' : 'bg-white/[0.03]'}`}>
      <span className="text-[10px] tracking-[0.3em] uppercase text-white/80 font-bold">{left}</span>
      <span className="text-[10px] text-red-500 tracking-[0.3em] uppercase">{right}</span>
    </div>
  );
}

function PageHeader() {
  return (
    <motion.div {...fadeUp(0)} className="mb-8">
      <div className="flex items-center gap-3">
        <div className="h-10 w-1 bg-red-600 glow-red" />
        <div className="flex-1">
          <p className="text-[10px] sm:text-[11px] text-red-500 tracking-[0.45em] uppercase font-bold mb-1">
            {'//'} breach_forums // docket
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide glitch-text">
            Breach <span className="text-red-600 glow-text">Forums</span>
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[10px] text-red-500 tracking-[0.3em] uppercase">
          <span className="inline-block w-2 h-2 bg-red-600 animate-pulse" />
          Live Docket
        </div>
      </div>
      <div className="mt-4 h-px bg-gradient-to-r from-red-600/80 via-white/10 to-transparent" />
    </motion.div>
  );
}

function SectionTitle({ eyebrow, title, accent, icon: Icon }: { eyebrow: string; title: string; accent: string; icon: typeof History }) {
  return (
    <motion.div {...fadeUp(0)} className="mb-6">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-red-600 glow-red" />
        <Icon className="w-5 h-5 text-red-500" />
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
    </motion.div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {FAQS.map((f, i) => (
        <motion.div key={i} {...fadeUp(i * 0.06)} className="corner-brackets bg-black border border-white/10 hover:border-red-600/50 transition-colors">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
            <span className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-wide">
              <span className="font-mono text-[10px] text-red-500">{String(i + 1).padStart(2, '0')}</span>
              {f.q}
            </span>
            <ChevronDown className={`w-4 h-4 text-red-500 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden">
                <p className="px-5 pb-5 pl-[calc(2rem+14px)] text-sm text-white/60 leading-relaxed">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      onClick={copy}
      aria-label={label}
      className="p-2 border border-white/15 text-white/50 hover:text-red-400 hover:border-red-600/60 transition-colors shrink-0">
      {copied ? <Check className="w-4 h-4 text-red-500" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function IdentityAvatar({ src, alt, badge, badgeClass }: { src: string; alt: string; badge: string; badgeClass?: string }) {
  return (
    <div className="flex lg:flex-col items-center gap-4 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/10 bg-white/[0.02]">
      <div className="relative shrink-0">
        <div className="corner-brackets p-1.5 border border-red-700/50 bg-red-950/30 glow-red">
          <img src={src} alt={alt} className="w-24 h-24 object-cover" />
        </div>
      </div>
      <div className="text-center">
        <span className={`clip-corner inline-block px-2 py-1 text-[9px] font-bold uppercase tracking-widest ${badgeClass ?? 'bg-red-600 text-black'}`}>
          {badge}
        </span>
      </div>
    </div>
  );
}

export function BreachForums() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <PageHeader />

      {/* System check strip */}
      <motion.div {...fadeUp(0.05)} className="corner-brackets bg-black border border-white/10 mb-8 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-2.5 bg-white/[0.03] border-b border-white/10">
          <span className="text-[9px] uppercase tracking-[0.35em] text-white/40">system_check</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-red-500 cursor-blink">_ scanning relays</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {SYS_STATS.map((s) => (
            <div key={s.label} className="bg-black px-4 py-4">
              <div className="text-[9px] uppercase tracking-[0.25em] text-white/40 mb-1">{s.label}</div>
              <div className="font-mono text-sm font-bold text-red-500 glow-text">{s.value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Service alert */}
      <motion.div
        {...fadeUp(0.1)}
        className="relative overflow-hidden border-2 border-red-600 bg-red-950/30 p-6 sm:p-8 mb-10">
        <div className="absolute inset-0 breach-grid opacity-40" />
        <div className="absolute inset-0 crt-static" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-red-500">Service Alert</span>
            <span className="ml-auto hidden sm:inline-block font-mono text-[10px] text-red-500/70">ALERT_ID_077</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide mb-2">
            BreachForums is currently <span className="text-red-600 glow-text flicker">Down</span>
          </h3>
          <p className="text-sm text-white/60 max-w-2xl leading-relaxed mb-5">
            The platform is offline as of this broadcast. At this point we do not expect it to
            return. All active operators have migrated to the secure channels listed under Contact.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="clip-corner inline-flex items-center gap-2 bg-red-600 text-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest animate-pulse">
              <Skull className="w-3.5 h-3.5" />
              Status: Defunct
            </span>
            <span className="clip-corner inline-flex items-center gap-2 border border-red-600/60 text-red-400 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest">
              <Activity className="w-3.5 h-3.5" />
              Last Heartbeat: NULL
            </span>
            <span className="clip-corner inline-flex items-center gap-2 border border-white/20 text-white/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest">
              <Radio className="w-3.5 h-3.5" />
              Reconnect Attempts: 00
            </span>
          </div>
        </div>
      </motion.div>

      {/* Threat Actor profile */}
      <SectionTitle eyebrow="threat_actor" title="Threat" accent="Actor" icon={UserX} />
      <motion.div {...fadeUp(0.15)} className="corner-brackets bg-black border border-white/10 mb-10 overflow-hidden">
        <CardBand left="Threat Actor Record" right="ID_BF_001 // Archived" danger />
        <div className="grid lg:grid-cols-[auto_1fr]">
          <IdentityAvatar src="/images/breachforums-logo.png" alt="Breach Forums" badge="Threat Actor" />
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide glitch-text">{THREAT_ACTOR.name}</h3>
              <BadgeCheck className="w-5 h-5 text-red-500" />
              <span className="font-mono text-[10px] text-red-500">// {THREAT_ACTOR.account}</span>
            </div>
            <p className="text-[10px] text-red-500 uppercase tracking-[0.3em] mb-3">
              Threat Actor // underground marketplace // defunct
            </p>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-2xl">
              Defunct leak forum and underground marketplace. Normal Hunters operated as a
              Moderator under the account {THREAT_ACTOR.account} until the platform went dark.
            </p>

            <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10 mb-6">
              {ACTOR_READOUTS.map((r) => <ReadoutRow key={r.label} {...r} />)}
            </div>

            <div className="flex items-center gap-2 border border-red-700/40 bg-red-950/20 px-3 py-3">
              <Link2 className="w-4 h-4 text-red-500 shrink-0" />
              <span className="text-[9px] uppercase tracking-widest text-white/40 mr-1 shrink-0">Onion Profile</span>
              <a
                href={THREAT_ACTOR.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-red-400 truncate hover:text-red-300 transition-colors">
                {THREAT_ACTOR.url}
              </a>
              <CopyButton value={THREAT_ACTOR.url} label="Copy profile address" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Moderator identity */}
      <SectionTitle eyebrow="operator_identity" title="Normal" accent="Hunters" icon={Terminal} />
      <motion.div {...fadeUp(0.2)} className="corner-brackets bg-black border border-white/10 mb-10 overflow-hidden">
        <CardBand left="Operator Identity" right="Verified // PGP Signed" />
        <div className="grid lg:grid-cols-[auto_1fr]">
          <IdentityAvatar src="/images/logo.jpg" alt="Normal Hunters" badge="Moderator" />
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">Normal Hunters</h3>
              <BadgeCheck className="w-5 h-5 text-red-500" />
              <span className="font-mono text-[10px] text-red-500">// DYSPHOR1A</span>
            </div>
            <p className="text-[10px] text-red-500 uppercase tracking-[0.3em] mb-3">
              BreachForums Moderator // root0x operator
            </p>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-2xl">
              Former staff member of the BreachForums platform, responsible for enforcement,
              vendor vetting and integrity of the marketplace until the service went offline.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-red-600/40 bg-red-950/30">
                <Skull className="w-3.5 h-3.5 text-red-500" />
                <span className="text-[10px] text-white/80 uppercase tracking-wider">Threat Actor: {THREAT_ACTOR.name}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-white/15 bg-white/[0.03]">
                <Crown className="w-3.5 h-3.5 text-red-500" />
                <span className="text-[10px] text-white/70 uppercase tracking-wider">Role: {THREAT_ACTOR.role}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-white/15 bg-white/[0.03]">
                <Shield className="w-3.5 h-3.5 text-red-500" />
                <span className="text-[10px] text-white/70 uppercase tracking-wider">Status: Verified</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-white/15 bg-white/[0.03]">
                <Flag className="w-3.5 h-3.5 text-red-500" />
                <span className="text-[10px] text-white/70 uppercase tracking-wider">Joined: 2024</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-white/15 bg-white/[0.03]">
                <Network className="w-3.5 h-3.5 text-red-500" />
                <span className="text-[10px] text-white/70 uppercase tracking-wider">Network: {THREAT_ACTOR.network}</span>
              </span>
            </div>

            <div className="space-y-2 mb-2">
              <div className="flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-2.5">
                <Fingerprint className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-[9px] uppercase tracking-widest text-white/40 mr-1 shrink-0">PGP Key</span>
                <span className="font-mono text-xs text-white/70 truncate">F1F3 9A0B 77C2 4DEE 0xFF</span>
                <CopyButton value="F1F3 9A0B 77C2 4DEE 0xFF" label="Copy PGP fingerprint" />
              </div>
              <div className="flex items-center gap-2 border border-red-700/40 bg-red-950/20 px-3 py-3">
                <Link2 className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-[9px] uppercase tracking-widest text-white/40 mr-1 shrink-0">Onion Profile</span>
                <a
                  href={THREAT_ACTOR.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-red-400 truncate hover:text-red-300 transition-colors">
                  {THREAT_ACTOR.url}
                </a>
                <CopyButton value={THREAT_ACTOR.url} label="Copy profile address" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <SectionTitle eyebrow="incident_report" title="What" accent="Happened" icon={History} />
      <div className="relative border-l border-red-900/50 ml-3 mb-10 pl-2">
        {TIMELINE.map((t, i) => (
          <motion.div key={t.date} {...fadeUp(i * 0.08)} className="relative pl-7 pb-6 font-mono">
            <span className="absolute -left-[9px] top-1 w-3.5 h-3.5 bg-red-600 border-2 border-black glow-red" />
            <p className="text-[10px] text-red-500 tracking-[0.3em] font-bold">[{t.date}]</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className={`text-[10px] font-bold ${t.level === 'crit' ? 'text-red-500' : 'text-red-400'}`}>
                {t.level === 'crit' ? '[X]' : '[!]'}
              </span>
              <h4 className="text-white font-bold uppercase tracking-wide text-sm">{t.title}</h4>
            </div>
            <p className="text-xs text-white/50 mt-1 leading-relaxed">{t.body}</p>
          </motion.div>
        ))}
      </div>

      {/* Archive */}
      <SectionTitle eyebrow="preserved_records" title="Legacy" accent="Archive" icon={Archive} />
      <motion.div {...fadeUp(0.15)} className="corner-brackets bg-black border border-white/10 mb-10 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 bg-white/[0.03] border-b border-white/10">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">// preserved_records</span>
          <span className="text-[10px] text-red-500 tracking-[0.3em] uppercase">Mount: Read Only</span>
        </div>
        <div className="divide-y divide-white/10">
          {ARCHIVE.map((a, i) => (
            <div key={a.title} className="group flex items-center gap-4 px-5 py-4 hover:bg-white/[0.03] transition-colors">
              <span className="font-mono text-[10px] text-red-500">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white uppercase tracking-wide group-hover:text-red-500 transition-colors">
                  {a.title}
                </h4>
                <p className="text-xs text-white/50 mt-0.5">{a.desc}</p>
              </div>
              <span className="clip-corner px-2 py-0.5 border border-white/20 text-white/50 text-[8px] uppercase tracking-widest shrink-0">
                {a.tag}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Statement */}
      <motion.div {...fadeUp(0.2)} className="corner-brackets bg-black border border-white/10 p-6 sm:p-8 mb-10 relative overflow-hidden">
        <div className="absolute inset-0 breach-grid opacity-30" />
        <div className="absolute inset-0 crt-static" />
        <div className="relative">
          <p className="text-[10px] text-red-500 uppercase tracking-[0.35em] font-bold mb-4">
            {'//'} operator_statement
          </p>
          <blockquote className="text-sm sm:text-base text-white/70 leading-relaxed border-l-2 border-red-600/70 pl-5 italic">
            "The forum is gone. The network we built is not. Every listing, every verified vendor
            and every working channel has been migrated. <span className="text-red-500 not-italic font-bold">Watch this space.</span>"
          </blockquote>
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-[10px] text-white/40 uppercase tracking-[0.3em]">
              Signed // Normal Hunters — DYSPHOR1A
            </p>
            <span className="hidden sm:inline font-mono text-[10px] text-red-500/70">PGP: F1F3...77C2</span>
            <span className="inline-block w-2 h-2 bg-red-600 animate-pulse sm:ml-auto" />
          </div>
        </div>
      </motion.div>

      {/* FAQ */}
      <SectionTitle eyebrow="common_questions" title="Operator" accent="FAQ" icon={KeyRound} />
      <Faq />
    </section>
  );
}
