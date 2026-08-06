import { Send, MessageCircle, Lock, EyeOff, Database, Shield, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const TELEGRAM = '@normalhunters0x';
const SESSION = '@normalhunters0x';

interface Service {
  icon: LucideIcon;
  title: string;
  items: string[];
}

const SERVICES: Service[] = [
  {
    icon: Lock,
    title: 'Contact Encryption',
    items: [
      'All communications are end-to-end encrypted using Signal Protocol',
      'No logs or metadata retention - messages self-destruct after 24 hours',
      'PGP key available upon request for sensitive data transfers',
      'Secure drop zones for anonymous submissions via Tor hidden services',
    ],
  },
  {
    icon: EyeOff,
    title: 'Hiding Services',
    items: [
      'Onion routing for complete anonymity and IP obfuscation',
      'Multi-hop VPN chains with jurisdictional separation',
      'Disposable communication channels for each transaction',
      'Zero-knowledge proof authentication - no credentials stored',
    ],
  },
  {
    icon: Database,
    title: 'Selling Services',
    items: [
      'Exclusive database access with tiered pricing based on data sensitivity',
      'Custom data extraction and filtering services available',
      'Bulk dataset packages with volume discounts for resellers',
      'Escrow services for high-value transactions with trusted third parties',
    ],
  },
  {
    icon: Shield,
    title: 'Breach Services',
    items: [
      'Full breach intelligence reports with technical analysis',
      'Access to raw exfiltrated data samples for verification',
      'Custom breach notifications and ransom negotiation support',
      'Post-breach remediation and security assessment consulting',
    ],
  },
];

function ChannelCard({
  icon: Icon,
  label,
  handle,
  hint,
  href,
}: {
  icon: LucideIcon;
  label: string;
  handle: string;
  hint: string;
  href?: string;
}) {
  const inner = (
    <>
      <div className="p-3.5 border border-red-700/50 bg-red-950/40 text-red-500 group-hover:scale-110 group-hover:bg-red-950/70 transition-all shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/40 mb-1">{label}</div>
        <div className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">
          {handle}
        </div>
        <div className="text-[10px] text-red-500/80 mt-1 tracking-widest uppercase">{hint}</div>
      </div>
      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-red-500 group-hover:translate-x-1 transition-all shrink-0" />
    </>
  );

  const cls =
    'corner-brackets group flex items-center gap-5 p-6 bg-black border border-white/10 hover:border-red-600/70 transition-all duration-300 cursor-pointer';

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return <div className={cls}>{inner}</div>;
}

export function Contact() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      {/* Section header */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 bg-red-600 glow-red" />
          <div className="flex-1">
            <p className="text-[10px] sm:text-[11px] text-red-500 tracking-[0.45em] uppercase font-bold mb-1">
              {'//'} secure_channel
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
              Contact <span className="text-red-600 glow-text">The Group</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] text-white/40 tracking-[0.3em] uppercase">
            <span className="inline-block w-2 h-2 bg-red-600 animate-pulse" />
            Operators Online
          </div>
        </div>
        <div className="mt-4 h-px bg-gradient-to-r from-red-600/80 via-white/10 to-transparent" />
        <p className="mt-5 text-sm text-white/50 max-w-2xl leading-relaxed">
          Normal Hunters inquiries, exclusive database access, or secure transaction coordination
          via encrypted channels.
        </p>
      </div>

      {/* Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <ChannelCard
          icon={Send}
          label="Telegram"
          handle={TELEGRAM}
          hint="Open direct line"
          href="https://t.me/normalhunters0x"
        />
        <ChannelCard icon={MessageCircle} label="Session" handle={SESSION} hint="Session id verified" />
      </div>

      {/* Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="corner-brackets group bg-black border border-white/10 hover:border-red-600/50 transition-colors">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.03]">
                <Icon className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-white uppercase tracking-wider text-sm">
                  {service.title}
                </h3>
                <span className="ml-auto text-red-500 text-sm">//</span>
              </div>
              <ul className="p-5 space-y-3">
                {service.items.map((item) =>
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                    <span className="text-red-500 mt-1 text-xs font-bold shrink-0">▸</span>
                    {item}
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <p className="text-center text-[10px] text-white/30 uppercase tracking-[0.35em] mt-12">
        Normal Hunters // DYSPHOR1A Group // operated by root0x // exclusive access only
      </p>
    </section>
  );
}
