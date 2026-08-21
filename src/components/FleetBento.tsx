import React, { useState } from 'react';
import { ArrowRight, Volume2, Sparkles, Eye, Shield } from 'lucide-react';
import { Car } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface FleetBentoProps {
  cars: Car[];
  onSelectCar: (car: Car) => void;
  onReserveCar: (car: Car) => void;
  onViewAllFleet: () => void;
  onOpenInteriorViewer: () => void;
}

export const FleetBento: React.FC<FleetBentoProps> = ({
  cars,
  onSelectCar,
  onReserveCar,
  onViewAllFleet,
  onOpenInteriorViewer,
}) => {
  const [playingCarId, setPlayingCarId] = useState<string | null>(null);

  const berlinetta = cars.find((c) => c.id === 'apex-v12-berlinetta') || cars[0];
  const continental = cars.find((c) => c.id === 'heritage-continental-gt') || cars[1];
  const roadster = cars.find((c) => c.id === 'apex-roadster') || cars[2];

  const handleRev = (e: React.MouseEvent, car: Car) => {
    e.stopPropagation();
    setPlayingCarId(car.id);
    audioEngine.playRev(car.soundType, 2.2);
    setTimeout(() => setPlayingCarId(null), 2200);
  };

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#050505] relative text-[#F0F0F0]">
      {/* Section Header with Artistic Flair styling */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8">
        <div className="max-w-xl">
          <span className="text-[#C1FF72] text-xs font-mono mb-3 block tracking-[0.25em]">
            [ COLLECTION_001 // THE FLEET ]
          </span>
          <h2 className="font-serif-luxury italic text-3xl md:text-5xl text-[#F0F0F0] mb-4">
            Curated Masterpieces.
          </h2>
          <p className="text-sm md:text-base text-[#F0F0F0]/70 font-light leading-relaxed">
            A meticulously maintained fleet of high-performance vehicles, blending classic aesthetics with modern racing engineering.
          </p>
        </div>

        <button
          onClick={onViewAllFleet}
          className="text-[#F0F0F0]/60 hover:text-[#C1FF72] font-mono text-[10px] tracking-[0.3em] uppercase transition-colors flex items-center gap-2 mt-6 md:mt-0 pb-1 border-b border-white/20 hover:border-[#C1FF72] group focus:outline-none"
        >
          <span>Explore Entire Catalog</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Bento Grid Fleet Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[410px]">
        {/* Featured Car 1: Apex V12 Berlinetta (Large 8-col) */}
        <div
          onClick={() => onSelectCar(berlinetta)}
          className="md:col-span-8 relative group overflow-hidden border border-white/10 rounded-none cursor-pointer bg-[#0A0A0A] hover:border-white/30 transition-all duration-300"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${berlinetta.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90" />

          {/* Background Outline Watermark (Artistic Flair) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span className="outline-text text-[110px] md:text-[160px] serif italic font-black opacity-15 select-none skew-text tracking-tighter">
              BERLINETTA
            </span>
          </div>

          {/* Top Controls Overlay */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
            <div className="flex gap-2">
              <span className="bg-[#0A0A0A]/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-widest text-[#F0F0F0] uppercase border border-white/10">
                [ V12 ]
              </span>
              <span className="bg-[#0A0A0A]/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-widest text-[#F0F0F0] uppercase border border-white/10">
                [ MANUAL 6-SPD ]
              </span>
            </div>

            <button
              onClick={(e) => handleRev(e, berlinetta)}
              className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase border transition-all flex items-center gap-1.5 ${
                playingCarId === berlinetta.id
                  ? 'bg-[#C1FF72] text-black border-[#C1FF72] font-bold animate-pulse'
                  : 'bg-[#0A0A0A]/90 text-[#F0F0F0]/80 border-white/10 hover:border-white/30'
              }`}
              title="Listen to Atmospheric V12 Engine Sound"
            >
              <Volume2 className={`w-3.5 h-3.5 ${playingCarId === berlinetta.id ? 'text-black' : 'text-[#C1FF72]'}`} />
              <span>{playingCarId === berlinetta.id ? 'Revving 9000 RPM...' : 'Acoustic Sound'}</span>
            </button>
          </div>

          {/* Sequential Chapter Marker */}
          <div className="absolute top-20 left-6 z-10">
            <span className="text-4xl font-black italic tracking-tighter text-[#F0F0F0]">01</span>
            <div className="h-0.5 w-10 bg-[#C1FF72] mt-1" />
          </div>

          {/* Bottom Panel Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-7 bg-[#0A0A0A]/90 backdrop-blur-md border-t border-white/10 z-10 transition-all duration-300 group-hover:bg-[#151515]/95">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <h3 className="font-serif-luxury italic text-2xl md:text-3xl text-[#F0F0F0] mb-1 group-hover:text-[#C1FF72] transition-colors">
                  {berlinetta.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#F0F0F0]/70 font-mono">
                  Daily Allocation: <span className="text-[#C1FF72] font-bold">${berlinetta.dailyRate.toLocaleString()}</span> / day
                </p>
              </div>

              {/* Specs & Reserve CTA */}
              <div className="flex items-center gap-6">
                <div className="hidden sm:flex gap-6 border-l border-white/10 pl-6 text-right">
                  <div>
                    <span className="block font-serif-luxury italic text-xl text-[#F0F0F0]">
                      {berlinetta.specs.zeroToSixty}
                    </span>
                    <span className="block font-mono text-[9px] text-[#F0F0F0]/40 uppercase mt-0.5 tracking-wider">
                      0-60 MPH
                    </span>
                  </div>
                  <div>
                    <span className="block font-serif-luxury italic text-xl text-[#F0F0F0]">
                      {berlinetta.specs.topSpeed}
                    </span>
                    <span className="block font-mono text-[9px] text-[#F0F0F0]/40 uppercase mt-0.5 tracking-wider">
                      TOP SPEED
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReserveCar(berlinetta);
                  }}
                  className="bg-[#C1FF72] text-black px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase hover:bg-[#b2f55e] transition-colors rounded-none flex items-center gap-1.5"
                >
                  <span>Reserve</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Car 2: Heritage Continental GT (Tall 4-col x 2-row) */}
        <div
          onClick={() => onSelectCar(continental)}
          className="md:col-span-4 md:row-span-2 relative group overflow-hidden border border-white/10 rounded-none cursor-pointer bg-[#0A0A0A] hover:border-white/30 transition-all duration-300"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${continental.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90" />

          {/* Outline Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span className="outline-text text-[90px] serif italic font-black opacity-15 select-none skew-text tracking-tighter">
              GRAND TOUR
            </span>
          </div>

          {/* Top Tag */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
            <span className="bg-[#0A0A0A]/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-widest text-[#F0F0F0] uppercase border border-white/10">
              [ GRAND TOURER ]
            </span>
            <button
              onClick={(e) => handleRev(e, continental)}
              className={`p-2 border transition-all ${
                playingCarId === continental.id
                  ? 'bg-[#C1FF72] text-black border-[#C1FF72]'
                  : 'bg-[#0A0A0A]/90 text-[#F0F0F0] border-white/10 hover:border-white/30'
              }`}
              title="W12 Twin-Turbo Exhaust Note"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sequential Chapter Marker */}
          <div className="absolute top-20 left-6 z-10">
            <span className="text-4xl font-black italic tracking-tighter text-[#F0F0F0]">02</span>
            <div className="h-0.5 w-10 bg-[#C1FF72] mt-1" />
          </div>

          {/* Content Bottom Panel */}
          <div className="absolute bottom-0 left-0 right-0 p-7 z-10 bg-[#0A0A0A]/90 backdrop-blur-md border-t border-white/10">
            <h3 className="font-serif-luxury italic text-2xl md:text-3xl text-[#F0F0F0] mb-1 group-hover:text-[#C1FF72] transition-colors">
              {continental.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#F0F0F0]/70 font-mono mb-5">
              Daily Allocation: <span className="text-[#C1FF72] font-bold">${continental.dailyRate.toLocaleString()}</span> / day
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 mb-5">
              <div>
                <span className="block font-serif-luxury italic text-xl text-[#F0F0F0]">
                  {continental.specs.zeroToSixty}
                </span>
                <span className="block font-mono text-[9px] text-[#F0F0F0]/40 uppercase mt-0.5 tracking-wider">
                  0-60 MPH
                </span>
              </div>
              <div>
                <span className="block font-serif-luxury italic text-xl text-[#F0F0F0]">
                  {continental.specs.topSpeed}
                </span>
                <span className="block font-mono text-[9px] text-[#F0F0F0]/40 uppercase mt-0.5 tracking-wider">
                  TOP SPEED
                </span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onReserveCar(continental);
              }}
              className="w-full bg-[#C1FF72] text-black py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-[#b2f55e] transition-colors rounded-none flex items-center justify-center gap-2"
            >
              <span>Reserve Continental</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Featured Car 3: Apex Roadster (Small 4-col) */}
        <div
          onClick={() => onSelectCar(roadster)}
          className="md:col-span-4 relative group overflow-hidden border border-white/10 rounded-none cursor-pointer bg-[#0A0A0A] hover:border-white/30 transition-all duration-300"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${roadster.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent opacity-90" />

          {/* Sequential Chapter Marker */}
          <div className="absolute top-5 left-5 z-10 flex items-center gap-3">
            <span className="bg-[#0A0A0A]/90 backdrop-blur-md px-2.5 py-1 text-[9px] font-mono tracking-widest text-[#F0F0F0] uppercase border border-white/10">
              [ 03 // ROADSTER ]
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 bg-[#0A0A0A]/90 backdrop-blur-md border-t border-white/10 flex justify-between items-center z-10">
            <div>
              <h3 className="font-serif-luxury italic text-xl text-[#F0F0F0] mb-0.5 group-hover:text-[#C1FF72] transition-colors">
                {roadster.name}
              </h3>
              <p className="text-xs text-[#F0F0F0]/70 font-mono">
                From <span className="text-[#C1FF72] font-bold">${roadster.dailyRate.toLocaleString()}</span> / day
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase text-[#C1FF72] flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
              View <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Featured Card 4: Bespoke Interiors Craftsmanship (Small 4-col) */}
        <div
          onClick={onOpenInteriorViewer}
          className="md:col-span-4 relative group overflow-hidden border border-white/10 rounded-none cursor-pointer bg-[#0A0A0A] hover:border-white/30 transition-all duration-300"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDHl633odkJ_XhUtuDT5xavpcJWx6OUIZ75frFlDUd18GrUvyS6TIqU4P2rem3SIcldLHkXyyitdE8-pg5zG486wi9JJQIY1NymzxYI0BNVNLwiC_E6OLC_HhlM4ztw-wPrU0dhSsVcerbyUSTkqAk0c1LMCIxZ9rDXXWImitBGV6uk0uK1MXzkfjh2FXU5edXacUrjjE5Vodpdjw61aduhhiMok--DPmSIJlXttIHuQ7tjjv0c9QEi')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent opacity-90" />

          <div className="absolute top-5 left-5 z-10">
            <span className="bg-[#C1FF72] text-black px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase font-bold">
              [ 04 // ATELIER CRAFT ]
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 bg-[#0A0A0A]/90 backdrop-blur-md border-t border-white/10 flex justify-between items-center z-10">
            <div>
              <h3 className="font-serif-luxury italic text-xl text-[#F0F0F0] mb-0.5 group-hover:text-[#C1FF72] transition-colors">
                Bespoke Interiors
              </h3>
              <p className="text-xs text-[#F0F0F0]/70 font-mono">
                Carbon weave & Connolly hides
              </p>
            </div>
            <div className="w-8 h-8 bg-white/10 flex items-center justify-center group-hover:bg-[#C1FF72] transition-colors">
              <ArrowRight className="w-4 h-4 text-[#F0F0F0] group-hover:text-black" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
