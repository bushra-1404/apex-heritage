import React, { useState } from 'react';
import { X, Volume2, ArrowRight, ShieldCheck, Check, Calendar, Gauge, Cog, Zap } from 'lucide-react';
import { Car } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface CarDetailModalProps {
  car: Car | null;
  onClose: () => void;
  onReserve: (car: Car, selectedColor?: string) => void;
  onOpenStudio: (car: Car) => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  onClose,
  onReserve,
  onOpenStudio,
}) => {
  if (!car) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(car.availableColors[0]?.name || 'Factory Standard');
  const [isRevving, setIsRevving] = useState(false);

  const images = car.galleryImages?.length > 0 ? car.galleryImages : [car.image];

  const handleRev = () => {
    setIsRevving(true);
    audioEngine.playRev(car.soundType, 2.5);
    setTimeout(() => setIsRevving(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-[#0A0A0A] border border-white/15 rounded-none shadow-2xl overflow-hidden my-auto text-[#F0F0F0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-[#050505]/80 hover:bg-[#C1FF72] text-white hover:text-black transition-colors backdrop-blur-md border border-white/10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Gallery & Audio */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-[#050505] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            <div>
              {/* Main Image Stage */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#000] border border-white/15 mb-4 group">
                <img
                  src={images[activeImageIndex] || car.image}
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Rev Engine Overlay Button */}
                <button
                  onClick={handleRev}
                  className={`absolute bottom-4 left-4 px-4 py-2 font-mono text-[10px] uppercase tracking-wider backdrop-blur-md border transition-all flex items-center gap-2 ${
                    isRevving
                      ? 'bg-[#C1FF72] text-black border-[#C1FF72] animate-pulse'
                      : 'bg-[#050505]/80 text-[#F0F0F0]/80 border-white/15 hover:text-white hover:border-[#C1FF72]'
                  }`}
                >
                  <Volume2 className="w-4 h-4 text-[#C1FF72]" />
                  <span>{isRevving ? 'Exhaust Screaming (9000 RPM)' : 'Rev Engine Symphony'}</span>
                </button>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImageIndex === idx ? 'border-[#C1FF72] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Atelier Highlights */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="font-mono text-[10px] text-[#C1FF72] uppercase tracking-widest mb-3">
                [ ATELIER SPECIFICATION HIGHLIGHTS ]
              </h4>
              <ul className="space-y-2.5">
                {car.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#F0F0F0]/70 font-light leading-relaxed">
                    <Check className="w-3.5 h-3.5 text-[#C1FF72] flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Specs & Reservation Action */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#0A0A0A]">
            <div>
              {/* Header Info */}
              <div className="flex flex-wrap gap-2 mb-3">
                {car.tags.map((t) => (
                  <span
                    key={t}
                    className="bg-[#151515] text-[#F0F0F0]/80 border border-white/10 px-2.5 py-0.5 text-[9px] font-mono tracking-wider uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <h2 className="font-serif-luxury italic text-3xl sm:text-4xl text-[#F0F0F0] mb-1">
                {car.name}
              </h2>
              <p className="text-xs text-[#F0F0F0]/60 mb-4 font-light">
                {car.subtitle}
              </p>

              {/* Price Banner */}
              <div className="p-4 bg-[#050505] border border-white/10 mb-6 flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-mono uppercase text-[#F0F0F0]/50 block">Daily Heritage Rate</span>
                  <span className="font-mono text-2xl font-bold text-[#C1FF72]">
                    ${car.dailyRate.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#F0F0F0]/60 font-mono"> / 24 hrs</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#F0F0F0]/80 bg-[#151515] border border-white/10 px-2.5 py-1">
                    <ShieldCheck className="w-3 h-3 text-[#C1FF72]" /> Full Apex Shield
                  </span>
                </div>
              </div>

              {/* Color Customizer Selection */}
              <div className="mb-6">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F0F0F0]/60 mb-2.5">
                  Bespoke Livery: <span className="text-[#C1FF72] font-semibold font-sans">{selectedColor}</span>
                </label>
                <div className="flex gap-2.5">
                  {car.availableColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? 'border-[#C1FF72] scale-110 ring-2 ring-[#C1FF72]/40'
                          : 'border-white/20 opacity-75 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="mb-6">
                <h4 className="font-mono text-[10px] text-[#C1FF72] uppercase tracking-widest mb-3">
                  [ TECHNICAL SPECIFICATIONS ]
                </h4>
                <div className="space-y-2 text-xs border border-white/10 p-3.5 bg-[#050505]/70 font-mono">
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-[#F0F0F0]/50 font-sans text-xs">Powertrain</span>
                    <span className="text-[#F0F0F0] text-xs font-sans">{car.specs.engine}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-[#F0F0F0]/50 font-sans text-xs">Peak Power</span>
                    <span className="text-[#F0F0F0] font-bold text-xs">{car.specs.horsepower} BHP</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-[#F0F0F0]/50 font-sans text-xs">0-60 MPH Acceleration</span>
                    <span className="text-[#C1FF72] font-bold text-xs">{car.specs.zeroToSixty}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-[#F0F0F0]/50 font-sans text-xs">Maximum Velocity</span>
                    <span className="text-[#F0F0F0] font-bold text-xs">{car.specs.topSpeed}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-[#F0F0F0]/50 font-sans text-xs">Transmission</span>
                    <span className="text-[#F0F0F0] text-xs font-sans">{car.specs.transmission}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#F0F0F0]/50 font-sans text-xs">Dry Chassis Weight</span>
                    <span className="text-[#F0F0F0] text-xs font-sans">{car.specs.weight}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2.5 pt-4">
              <button
                onClick={() => onReserve(car, selectedColor)}
                className="w-full bg-[#C1FF72] hover:bg-[#b2f55e] text-black py-3.5 text-[10px] font-mono font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C1FF72]/15"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve {car.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenStudio(car);
                }}
                className="w-full border border-white/15 hover:border-white/40 text-[#F0F0F0]/80 hover:text-white py-2.5 text-[10px] font-mono uppercase tracking-widest transition-colors"
              >
                Configure in 3D Bespoke Studio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
