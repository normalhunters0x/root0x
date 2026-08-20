import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BadgeCheck,
  Check,
  Copy,
  Crown,
  Fingerprint,
  Flag,
  Link2,
  Network,
  Shield,
  Skull,
  Terminal,
  UserX,
} from 'lucide-react';

const THREAT_ACTOR = {
  name: 'Breach Forums',
  role: 'Moderator',
  account: 'normalhunters0x',
  network: 'Tor',
  status: 'Active',
  url: 'http://breachrkhwgrjq5xasdtybukh7xwfpq3wxopwulk7ghvarig2vkuq4ad.onion/User-normalhunters0x',
  domain: 'bf.sf',
};

const ACTOR_READOUTS = [
  { label: 'Classification', value: 'Threat Actor' },
  { label: 'Platform', value: 'Breach Forums' },
  { label: 'Role', value: 'Moderator' },
  { label: 'Account', value: 'normalhunters0x' },
  { label: 'Network', value: 'Tor (onion)' },
  { label: 'Registry', value: 'ID_BF_001' },
  { label: 'Status', value: 'Active' },
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

      {/* Threat Actor profile */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-red-600 glow-red" />
          <UserX className="w-5 h-5 text-red-500" />
          <div>
            <p className="text-[10px] sm:text-[11px] text-red-500 tracking-[0.45em] uppercase font-bold mb-1">
              {'//'} threat_actor
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
              Threat <span className="text-red-600 glow-text">Actor</span>
            </h3>
          </div>
        </div>
        <div className="mt-3 h-px bg-gradient-to-r from-red-600/80 via-white/10 to-transparent" />
      </div>
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
              Threat Actor // underground marketplace // active
            </p>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-2xl">
              Underground marketplace. Normal Hunters operates as a
              Moderator under the account {THREAT_ACTOR.account} at {THREAT_ACTOR.domain}.
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
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-red-600 glow-red" />
          <Terminal className="w-5 h-5 text-red-500" />
          <div>
            <p className="text-[10px] sm:text-[11px] text-red-500 tracking-[0.45em] uppercase font-bold mb-1">
              {'//'} operator_identity
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
              Normal <span className="text-red-600 glow-text">Hunters</span>
            </h3>
          </div>
        </div>
        <div className="mt-3 h-px bg-gradient-to-r from-red-600/80 via-white/10 to-transparent" />
      </div>
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
              BreachForums Moderator // root0x operator // {THREAT_ACTOR.domain}
            </p>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-2xl">
              Staff member of the BreachForums platform, responsible for enforcement,
              vendor vetting and integrity of the marketplace at {THREAT_ACTOR.domain}.
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
    </section>
  );
}
