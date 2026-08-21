import React, { useState } from 'react';
import { HERITAGE_MILESTONES } from '../data/heritage';
import { ArrowRight, Trophy, Shield, Sparkles, Award } from 'lucide-react';

export const HeritageSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeMilestone = HERITAGE_MILESTONES[activeIdx];

  return (
    <section id="heritage" className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#050505] text-[#F0F0F0]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/10 pb-8">
        <div className="max-w-xl">
          <span className="text-[#C1FF72] text-xs font-mono mb-3 block tracking-[0.25em]">
            [ HERITAGE_001 // PROVENANCE & LEGACY ]
          </span>
          <h2 className="font-serif-luxury italic text-3xl md:text-5xl text-[#F0F0F0] mb-4">
            Six Decades of Pure Speed.
          </h2>
          <p className="text-sm md:text-base text-[#F0F0F0]/70 font-light leading-relaxed">
            From the high-banked turns of historic endurance circuits to modern carbon monocoques, every Apex chassis carries an unbroken racing bloodline.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#F0F0F0]/60">
          <div className="flex items-center gap-1.5 text-[#C1FF72]">
            <Trophy className="w-4 h-4 text-[#C1FF72]" /> 14 Endurance Titles
          </div>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-1.5 text-[#F0F0F0]/80">
            <Award className="w-4 h-4 text-[#C1FF72]" /> Concours d'Elegance Winner
          </div>
        </div>
      </div>

      {/* Timeline Nav */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {HERITAGE_MILESTONES.map((m, idx) => (
          <button
            key={m.year}
            onClick={() => setActiveIdx(idx)}
            className={`p-4 rounded-none border text-left transition-all relative overflow-hidden ${
              activeIdx === idx
                ? 'bg-[#151515] border-[#C1FF72] text-white shadow-xl'
                : 'bg-[#0A0A0A] border-white/10 text-[#F0F0F0]/60 hover:border-white/30 hover:text-white'
            }`}
          >
            <div className="font-mono text-[10px] text-[#C1FF72] uppercase tracking-wider mb-1">
              [ ERA {m.year} ]
            </div>
            <div className="font-serif-luxury italic text-lg text-[#F0F0F0] leading-tight truncate">
              {m.title}
            </div>
            {activeIdx === idx && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C1FF72]" />
            )}
          </button>
        ))}
      </div>

      {/* Featured Milestone Card */}
      <div className="bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
        {/* Left Visual */}
        <div className="lg:col-span-7 relative min-h-[380px] bg-[#000] overflow-hidden group">
          <img
            src={activeMilestone.image}
            alt={activeMilestone.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />

          {activeMilestone.stat && (
            <div className="absolute bottom-6 left-6 bg-[#050505]/90 backdrop-blur-md p-4 border border-white/15">
              <span className="block font-serif-luxury italic text-3xl text-[#C1FF72] font-bold">
                {activeMilestone.stat}
              </span>
              <span className="block font-mono text-[9px] text-[#F0F0F0]/60 uppercase tracking-wider">
                {activeMilestone.statLabel}
              </span>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-[#0A0A0A]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#C1FF72] uppercase tracking-widest mb-2">
              <span>Chapter 0{activeIdx + 1} / 0{HERITAGE_MILESTONES.length}</span>
              <span>—</span>
              <span>Anno {activeMilestone.year}</span>
            </div>

            <h3 className="font-serif-luxury italic text-2xl sm:text-3xl text-[#F0F0F0] mb-2">
              {activeMilestone.title}
            </h3>

            <h4 className="font-mono text-xs text-[#F0F0F0]/50 uppercase tracking-wider mb-6">
              {activeMilestone.subtitle}
            </h4>

            <p className="text-sm sm:text-base text-[#F0F0F0]/70 font-light leading-relaxed mb-6">
              {activeMilestone.description}
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex justify-between items-center">
            <span className="text-[10px] font-mono text-[#F0F0F0]/50 uppercase">
              Certified Historic Registry
            </span>
            <div className="flex gap-2">
              <button
                disabled={activeIdx === 0}
                onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
                className="px-3.5 py-1.5 border border-white/10 hover:border-white/40 disabled:opacity-30 text-[10px] font-mono text-[#F0F0F0] transition-colors"
              >
                Prev
              </button>
              <button
                disabled={activeIdx === HERITAGE_MILESTONES.length - 1}
                onClick={() => setActiveIdx((prev) => Math.min(HERITAGE_MILESTONES.length - 1, prev + 1))}
                className="px-3.5 py-1.5 bg-[#C1FF72] hover:bg-[#b2f55e] disabled:opacity-30 text-[10px] font-mono text-black font-bold transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
