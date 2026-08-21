import React, { useState } from 'react';
import { Menu, X, Volume2, Calendar, Sparkles, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenBooking: () => void;
  reservationCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenBooking,
  reservationCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [revving, setRevving] = useState(false);

  const navItems = [
    { id: 'fleet', label: 'Fleet' },
    { id: 'heritage', label: 'Heritage' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'studio', label: '3D Studio' },
    { id: 'concierge', label: 'Concierge' },
  ];

  const handleRevTest = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRevving(true);
    audioEngine.playRev('v12-high', 2.2);
    setTimeout(() => setRevving(false), 2200);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="flex justify-between items-center px-6 md:px-12 max-w-[1440px] mx-auto h-20">
        {/* Brand */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-3.5 group text-left focus:outline-none"
        >
          <img
            alt="Apex Heritage"
            className="h-9 w-9 object-contain rounded-none transition-transform duration-500 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGNEceLevmsMWUEhihf3gaZ6hbyCtw1vWScCb8dDOGCa4paEhQGs16bx2Vb_cUtGNsnGuQH4tdnVX_ZtoB2DehVQt4ktqN9brMOXO4h5y31D6BZffGzBdYlVTSiF5kGqVlEoqmavoh3urXj4nYHsfUpo7H1k9Y9MZQKaeDmhzI6uaXOzZDzHZL5HxhSh2Fhu2N48sZ-fWemLJhGu9-aih5PDAECMWzykVn878Ce1z8jn_UcpZcPNIx"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tighter text-xl md:text-2xl text-[#F0F0F0] uppercase">
                Apex.
              </span>
              <span className="text-[#C1FF72] text-[10px] font-mono">[ 2026 // ED_01 ]</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#F0F0F0]/40 font-mono -mt-0.5">
              Automobili d'Epoca
            </span>
          </div>
        </button>

        {/* Desktop Nav with Artistic Flair tracking */}
        <div className="hidden md:flex items-center gap-9 text-[10px] uppercase tracking-[0.3em] font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`transition-colors duration-200 relative py-1.5 focus:outline-none ${
                activeSection === item.id
                  ? 'text-[#C1FF72]'
                  : 'text-[#F0F0F0]/60 hover:text-[#F0F0F0]'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C1FF72]" />
              )}
            </button>
          ))}
        </div>

        {/* Trailing Action & Audio Ignition */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleRevTest}
            title="Ignite V12 Acoustic Soundscape"
            className={`px-3 py-2 text-[10px] uppercase font-mono tracking-widest border transition-all duration-300 flex items-center gap-2 ${
              revving
                ? 'bg-[#C1FF72]/15 border-[#C1FF72] text-[#C1FF72] animate-pulse'
                : 'bg-[#0A0A0A] text-[#F0F0F0]/70 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Volume2 className={`w-3.5 h-3.5 ${revving ? 'text-[#C1FF72]' : 'text-[#F0F0F0]/50'}`} />
            <span>
              {revving ? '[ REV 9000 RPM ]' : '[ V12 SOUND ]'}
            </span>
          </button>

          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 bg-[#C1FF72] text-black text-[10px] uppercase font-bold tracking-widest hover:bg-[#b2f55e] transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#C1FF72]/10 active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserve Chassis</span>
            {reservationCount > 0 && (
              <span className="ml-1 bg-black text-[#C1FF72] text-[9px] font-mono px-1.5 py-0.5 font-bold">
                {reservationCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={handleRevTest}
            className="p-2 text-[#C1FF72]"
            title="Rev engine sound"
          >
            <Volume2 className={`w-5 h-5 ${revving ? 'text-[#C1FF72]' : ''}`} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#F0F0F0] p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2.5 text-xs tracking-[0.25em] uppercase text-[#F0F0F0]/70 hover:text-white border-b border-white/10 font-mono"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#C1FF72] text-black py-3 text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Chassis</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
