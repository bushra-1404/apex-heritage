import React, { useState } from 'react';
import { EXPERIENCES } from '../data/experiences';
import { Experience } from '../types';
import { MapPin, Clock, Navigation, Check, ArrowRight, Sparkles } from 'lucide-react';

interface ExperiencesSectionProps {
  onReserveExperience: (exp: Experience) => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  onReserveExperience,
}) => {
  const [selectedExp, setSelectedExp] = useState<Experience>(EXPERIENCES[0]);

  return (
    <section id="experiences" className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#050505] text-[#F0F0F0]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/10 pb-8">
        <div className="max-w-xl">
          <span className="text-[#C1FF72] text-xs font-mono mb-3 block tracking-[0.25em]">
            [ TOURS_001 // CURATED DRIVING EXPERIENCES ]
          </span>
          <h2 className="font-serif-luxury italic text-3xl md:text-5xl text-[#F0F0F0] mb-4">
            Legendary Road Experiences.
          </h2>
          <p className="text-sm md:text-base text-[#F0F0F0]/70 font-light leading-relaxed">
            Unrestricted throttle on Europe's most dramatic mountain switchbacks and private Grand Prix circuits with bespoke 5-star concierge support.
          </p>
        </div>

        <span className="text-[10px] font-mono uppercase text-[#C1FF72] bg-[#0A0A0A] px-4 py-2 border border-white/15">
          [ ALL-INCLUSIVE BESPOKE HOSPITALITY ]
        </span>
      </div>

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {EXPERIENCES.map((exp) => (
          <div
            key={exp.id}
            className="bg-[#0A0A0A] border border-white/10 hover:border-white/30 transition-all duration-300 rounded-none overflow-hidden flex flex-col justify-between group shadow-xl"
          >
            <div>
              {/* Image & Price Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#000]">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90" />

                <div className="absolute top-4 left-4">
                  <span className="bg-[#050505]/90 backdrop-blur-md px-2.5 py-1 text-[9px] font-mono uppercase text-[#F0F0F0] border border-white/15 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#C1FF72]" />
                    {exp.location}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-[#050505]/90 backdrop-blur-md px-3 py-1.5 border border-white/15">
                  <span className="text-[9px] font-mono uppercase text-[#F0F0F0]/60 block">From</span>
                  <span className="font-mono text-base font-bold text-[#C1FF72]">
                    ${exp.price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-7">
                <div className="flex items-center gap-4 text-xs font-mono text-[#F0F0F0]/60 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C1FF72]" /> {exp.duration}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5 text-[#C1FF72]" /> {exp.distance}
                  </span>
                </div>

                <h3 className="font-serif-luxury italic text-2xl text-[#F0F0F0] mb-1 group-hover:text-white transition-colors">
                  {exp.title}
                </h3>
                <h4 className="font-mono text-xs text-[#C1FF72] uppercase tracking-wider mb-4">
                  {exp.subtitle}
                </h4>

                <p className="text-xs text-[#F0F0F0]/70 font-light leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Included Fleet */}
                <div className="mb-6">
                  <span className="block text-[9px] font-mono uppercase tracking-widest text-[#F0F0F0]/50 mb-2">
                    [ ROTATING FLEET LINEUP ]
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.includedCars.map((carName) => (
                      <span
                        key={carName}
                        className="bg-[#151515] text-[#F0F0F0]/80 border border-white/10 px-2 py-0.5 text-[9px] font-mono"
                      >
                        {carName}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Route Highlights */}
                <div className="space-y-2 border-t border-white/10 pt-4">
                  {exp.routeHighlights.slice(0, 3).map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#F0F0F0]/70">
                      <Check className="w-3 h-3 text-[#C1FF72] flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="p-7 pt-0">
              <button
                onClick={() => onReserveExperience(exp)}
                className="w-full bg-[#C1FF72] hover:bg-[#b2f55e] text-black py-3 text-[10px] font-mono font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span>Book This Tour</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
