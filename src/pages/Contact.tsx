import { Send, MessageCircle, ChevronRight, DollarSign } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const TELEGRAM = '@normalhunters0x';
const SESSION = '@normalhunters0x';

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

      {/* Selling DB */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-6 w-1 bg-red-600 glow-red" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">
            Selling DB
          </h3>
        </div>
        <div className="corner-brackets bg-black border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 border border-red-700/50 bg-red-950/40 text-red-500">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">Accepted Payments</span>
          </div>
          <div className="flex flex-wrap gap-3 mb-5">
            <span className="clip-corner px-3 py-1.5 border border-red-600/60 text-red-400 text-[10px] font-bold uppercase tracking-widest">ETH</span>
            <span className="clip-corner px-3 py-1.5 border border-red-600/60 text-red-400 text-[10px] font-bold uppercase tracking-widest">BTC</span>
            <span className="clip-corner px-3 py-1.5 border border-red-600/60 text-red-400 text-[10px] font-bold uppercase tracking-widest">XMR</span>
          </div>
          <div className="border-t border-white/10 pt-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 mb-2">Contact for DB Sales</p>
            <a
              href="https://t.me/suicid_ed"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-red-400 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span className="font-bold">@suicid_ed</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-[10px] text-white/30 uppercase tracking-[0.35em] mt-12">
        Normal Hunters // DYSPHOR1A Group // operated by root0x // exclusive access only
      </p>
    </section>
  );
}
