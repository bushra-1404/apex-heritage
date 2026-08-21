import React from 'react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { QuickReserveBar } from './QuickReserveBar';
import { ShieldCheck, Compass, Sparkles, ChevronDown, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onCheckAvailability: (params: { location: string; pickupDate: string; returnDate: string; category: string }) => void;
  onExploreFleet: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCheckAvailability,
  onExploreFleet,
}) => {
  return (
    <header className="relative w-full min-h-[95vh] flex flex-col justify-between items-center pt-24 pb-12 overflow-hidden bg-[#050505] text-[#F0F0F0]">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Hero3DCanvas primaryColorHex={0x141416} />
        {/* Soft atmospheric radial gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-transparent to-[#050505] pointer-events-none" />
        <div className="absolute inset-0 dot-grid-subtle opacity-30 pointer-events-none" />
      </div>

      {/* Skewed Limited Release Badge */}
      <div className="hidden lg:block absolute top-28 right-12 bg-white text-black px-6 py-3.5 skew-x-[-15deg] z-30 shadow-2xl pointer-events-none">
        <span className="text-[11px] font-bold uppercase tracking-tighter block skew-x-[15deg]">
          Exhibition & Reserve // 2026
        </span>
      </div>

      {/* Vertical Marginal Rail Tag */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none border-r border-white/10 pr-4">
        <span className="vertical-label uppercase text-[9px] tracking-[0.5em] text-[#F0F0F0]/40 font-mono">
          Scroll of Discovery // Apex Provenance
        </span>
      </div>

      {/* Top Tagline & Main Headline */}
      <div className="relative z-10 text-center pt-6 px-4 max-w-4xl mx-auto">
        <span className="text-[#C1FF72] text-xs font-mono mb-4 block tracking-[0.25em]">
          [ FEATURE_001 // THE APEX COLLECTION ]
        </span>

        {/* Main Serif Italic Headline */}
        <h1 className="font-serif-luxury italic text-5xl sm:text-7xl md:text-8xl lg:text-[90px] leading-[0.88] text-[#F0F0F0] tracking-tight mb-6 drop-shadow-2xl">
          The Pure<br />Velocity.
        </h1>

        <p className="text-sm sm:text-base leading-relaxed max-w-lg mx-auto text-[#F0F0F0]/70 font-light mb-6">
          An exploration of speed and sculptural form. Defining the future of classic performance through bespoke automotive provenance.
        </p>

        {/* Quick Highlights with Artistic Flair Styling */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] text-[#F0F0F0]/50 uppercase tracking-[0.25em] font-mono">
          <span className="flex items-center gap-1.5 text-[#F0F0F0]/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C1FF72]" /> 100% Verified Chassis
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="flex items-center gap-1.5 text-[#F0F0F0]/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C1FF72]" /> European Atelier Delivery
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="flex items-center gap-1.5 text-[#F0F0F0]/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C1FF72]" /> Private Track Access
          </span>
        </div>
      </div>

      {/* Quick Reserve Bar */}
      <div className="relative z-20 w-full px-5 md:px-12 mt-8">
        <QuickReserveBar onCheckAvailability={onCheckAvailability} />
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 pt-4 flex flex-col items-center">
        <button
          onClick={onExploreFleet}
          className="text-[#F0F0F0]/50 hover:text-white transition-colors duration-200 flex flex-col items-center gap-1 focus:outline-none group"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase font-mono group-hover:text-[#C1FF72] transition-colors">
            Explore Story // Chapter 01
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#C1FF72]" />
        </button>
      </div>

      {/* Ambient background glow aura */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#C1FF72] rounded-full blur-[160px] opacity-10 pointer-events-none" />
    </header>
  );
};
