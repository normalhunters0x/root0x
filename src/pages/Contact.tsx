import { Send, MessageCircle, Shield, Lock, Database, EyeOff } from 'lucide-react';

const TELEGRAM = '@normalhunters0x';
const SESSION = '@normalhunters0x';

export function Contact() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="border border-red-900/40 bg-black/70 p-8 sm:p-10">
        <p className="text-red-500/80 text-xs tracking-[0.4em] uppercase mb-3">
          // secure_channel
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-2">
          Encrypted <span className="text-red-500 glow-text">Comms</span>
        </h2>
        <p className="text-sm text-zinc-500 max-w-xl mb-8">
          Normal Hunters inquiries, exclusive database access, or secure transaction coordination via encrypted channels.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <a
            href="https://t.me/normalhunters0x"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 p-5 border border-zinc-800 hover:border-red-700/70 hover:glow-red transition-all group">
            
            <div className="p-3 border border-red-800/50 bg-red-950/30 text-red-400 group-hover:scale-110 transition-transform">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                Telegram
              </div>
              <div className="text-zinc-200 font-bold">{TELEGRAM}</div>
            </div>
          </a>
          <div className="flex items-center gap-4 p-5 border border-zinc-800 hover:border-red-700/70 hover:glow-red transition-all group">
            <div className="p-3 border border-red-800/50 bg-red-950/30 text-red-400 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                Session
              </div>
              <div className="text-zinc-200 font-bold">{SESSION}</div>
            </div>
          </div>
        </div>

        {/* Contact Encryption */}
        <div className="border-t border-red-900/30 pt-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-bold text-zinc-100">Contact Encryption</h3>
          </div>
          <div className="space-y-3 text-sm text-zinc-400">
            <p className="flex items-start gap-2">
              <span className="text-red-500 mt-1">›</span>
              All communications are end-to-end encrypted using Signal Protocol
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-500 mt-1">›</span>
              No logs or metadata retention - messages self-destruct after 24 hours
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-500 mt-1">›</span>
              PGP key available upon request for sensitive data transfers
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-500 mt-1">›</span>
              Secure drop zones for anonymous submissions via Tor hidden services
            </p>
          </div>
        </div>

        {/* Hiding Services */}
        <div className="border-t border-red-900/30 pt-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <EyeOff className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-bold text-zinc-100">Hiding Services</h3>
          </div>
          <div className="space-y-3 text-sm text-zinc-400">
            <p className="flex items-start gap-2">
              <span className="text-red-500 mt-1">›</span>
              Onion routing for complete anonymity and IP obfuscation
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-500 mt-1">›</span>
              Multi-hop VPN chains with jurisdictional separation
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-500 mt-1">›</span>
              Disposable communication channels for each transaction
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-500 mt-1">›</span>
              Zero-knowledge proof authentication - no credentials stored
            </p>
          </div>
        </div>

        {/* Selling Services */}
        <div className="border-t border-red-900/30 pt-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-bold text-zinc-100">Selling Services</h3>
          </div>
          <div className="space-y-3 text-sm text-zinc-400">
            <p className="flex items-start gap-2">
              <span className="text-red-500 mt-1">›</span>
              Exclusive database access with tiered pricing based on data sensitivity
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-500 mt-1">›</span>
              Custom data extraction and filtering services available
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-500 mt-1">›</span>
              Bulk dataset packages with volume discounts for resellers
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-500 mt-1">›</span>
              Escrow services for high-value transactions with trusted third parties
            </p>
          </div>
        </div>

        {/* Breach Services */}
        <div className="border-t border-red-900/30 pt-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-bold text-zinc-100">Breach Services</h3>
          </div>
          <div className="space-y-3 text-sm text-zinc-400">
            <p className="flex items-start gap-2">
              <span className="text-red-500 mt-1">›</span>
              Full breach intelligence reports with technical analysis
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-500 mt-1">›</span>
              Access to raw exfiltrated data samples for verification
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-500 mt-1">›</span>
              Custom breach notifications and ransom negotiation support
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-500 mt-1">›</span>
              Post-breach remediation and security assessment consulting
            </p>
          </div>
        </div>

        <p className="text-center text-[11px] text-zinc-600 uppercase tracking-[0.3em] mt-10">
          Normal Hunters // DYSPHOR1A Group // operated by root0x // exclusive access only
        </p>
      </div>
    </section>
  );
}
