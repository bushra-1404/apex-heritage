import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#050505] text-[#F0F0F0] w-full relative border-t border-white/10 font-sans-precision text-base">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6 md:px-12 py-20 max-w-[1440px] mx-auto">
        {/* Brand & Manifesto Column (md:col-span-4) */}
        <div className="md:col-span-4 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGNEceLevmsMWUEhihf3gaZ6hbyCtw1vWScCb8dDOGCa4paEhQGs16bx2Vb_cUtGNsnGuQH4tdnVX_ZtoB2DehVQt4ktqN9brMOXO4h5y31D6BZffGzBdYlVTSiF5kGqVlEoqmavoh3urXj4nYHsfUpo7H1k9Y9MZQKaeDmhzI6uaXOzZDzHZL5HxhSh2Fhu2N48sZ-fWemLJhGu9-aih5PDAECMWzykVn878Ce1z8jn_UcpZcPNIx"
                alt="Apex Emblem"
                className="w-8 h-8 object-contain filter invert"
              />
              <span className="font-serif-luxury italic text-2xl md:text-3xl text-[#F0F0F0] block tracking-tight">
                Apex Heritage.
              </span>
            </div>
            <p className="text-[#F0F0F0]/60 text-sm max-w-sm mb-6 font-light leading-relaxed">
              Engineered for Excellence. Defining the future of classic performance through bespoke automotive provenance.
            </p>

            {/* Newsletter Subscription */}
            <div className="max-w-sm">
              <span className="block text-[9px] font-mono uppercase tracking-widest text-[#C1FF72] mb-2">
                [ PRIVATE CONCOURS BULLETIN ]
              </span>
              {subscribed ? (
                <div className="p-3 bg-[#0A0A0A] border border-[#C1FF72] text-xs text-[#F0F0F0] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C1FF72]" />
                  <span className="font-mono text-[11px]">Your invitation has been dispatched.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    required
                    placeholder="Enter VIP email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#0A0A0A] border border-white/15 text-xs text-[#F0F0F0] px-3 py-2.5 flex-1 font-mono focus:outline-none focus:border-[#C1FF72]"
                  />
                  <button
                    type="submit"
                    className="bg-[#C1FF72] hover:bg-[#b2f55e] text-black px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          <p className="text-[#F0F0F0]/40 text-xs font-mono">
            © {new Date().getFullYear()} APEX HERITAGE AUTOMOBILI. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Link Columns (md:col-span-8) */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8">
          {/* Column 1: Explore */}
          <div>
            <h4 className="font-mono text-[10px] text-[#C1FF72] uppercase mb-6 tracking-widest">
              [ EXPLORE ]
            </h4>
            <ul className="space-y-3.5 text-sm font-light">
              <li>
                <button
                  onClick={() => onNavigate('fleet')}
                  className="text-[#F0F0F0]/70 hover:text-[#C1FF72] transition-colors duration-200"
                >
                  The Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('studio')}
                  className="text-[#F0F0F0]/70 hover:text-[#C1FF72] transition-colors duration-200"
                >
                  3D Bespoke Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experiences')}
                  className="text-[#F0F0F0]/70 hover:text-[#C1FF72] transition-colors duration-200"
                >
                  Alpine Driving Tours
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('heritage')}
                  className="text-[#F0F0F0]/70 hover:text-[#C1FF72] transition-colors duration-200"
                >
                  Historic Provenance Archive
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Atelier Hubs */}
          <div>
            <h4 className="font-mono text-[10px] text-[#C1FF72] uppercase mb-6 tracking-widest">
              [ FLAGSHIP ATELIERS ]
            </h4>
            <ul className="space-y-3.5 text-sm text-[#F0F0F0]/60 font-light">
              <li>Monaco — Port Hercule</li>
              <li>Zurich — Airport Private FBO</li>
              <li>Geneva — Quai du Mont-Blanc</li>
              <li>London — Mayfair Berkeley Sq</li>
              <li>Milan — Via Montenapoleone</li>
            </ul>
          </div>

          {/* Column 3: Legal & Standards */}
          <div>
            <h4 className="font-mono text-[10px] text-[#C1FF72] uppercase mb-6 tracking-widest">
              [ CERTIFICATIONS ]
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="text-[#F0F0F0]/60 font-light">FIA Historic Passport</li>
              <li className="text-[#F0F0F0]/60 font-light">Apex Shield Concierge</li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-[#C1FF72] hover:underline font-mono text-xs uppercase tracking-wider flex items-center gap-1 mt-2"
                >
                  Direct Reservation <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
