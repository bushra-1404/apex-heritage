import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ShieldCheck, Eye, Layers } from 'lucide-react';

interface BespokeInteriorViewerProps {
  onClose: () => void;
  onSelectCarToReserve: () => void;
}

export const BespokeInteriorViewer: React.FC<BespokeInteriorViewerProps> = ({
  onClose,
  onSelectCarToReserve,
}) => {
  const [activeMaterial, setActiveMaterial] = useState<'carbon' | 'connolly' | 'alcantara' | 'titanium'>('carbon');

  const materials = [
    {
      id: 'carbon',
      name: 'Toray 3K Twill Carbon Weave',
      origin: 'Bologna Aerospace Foundry',
      desc: 'Finished with a satin anti-glare lacquer to eliminate high-speed reflections while retaining tactile carbon texture.',
    },
    {
      id: 'connolly',
      name: 'Heritage Connolly Hide',
      origin: 'Tuscan Tanning Atelier',
      desc: 'Selected from Scandinavian free-range bulls, vat-dyed with vegetable tannins, and finished with double French contrast stitching.',
    },
    {
      id: 'alcantara',
      name: 'Nero Motorsport Alcantara',
      origin: 'Milan Performance Division',
      desc: 'Provides non-slip grip on steering wheels and seat bolsters under extreme lateral G forces.',
    },
    {
      id: 'titanium',
      name: 'Billet Milled Titanium Controls',
      origin: 'Precision Watchmaker Caliber',
      desc: 'Rotary dials knurled with diamond tooth profile, offering weighted tactile feedback for every engine setting.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0A0A0A] border border-white/15 rounded-none shadow-2xl overflow-hidden my-auto text-[#F0F0F0]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-[#050505]/80 hover:bg-[#C1FF72] text-white hover:text-black rounded-none transition-colors backdrop-blur-md border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Hero Interior Photography */}
          <div className="lg:col-span-7 relative min-h-[400px] bg-[#000] overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHl633odkJ_XhUtuDT5xavpcJWx6OUIZ75frFlDUd18GrUvyS6TIqU4P2rem3SIcldLHkXyyitdE8-pg5zG486wi9JJQIY1NymzxYI0BNVNLwiC_E6OLC_HhlM4ztw-wPrU0dhSsVcerbyUSTkqAk0c1LMCIxZ9rDXXWImitBGV6uk0uK1MXzkfjh2FXU5edXacUrjjE5Vodpdjw61aduhhiMok--DPmSIJlXttIHuQ7tjjv0c9QEi"
              alt="Bespoke Luxury Sports Car Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-85" />

            <div className="absolute bottom-6 left-6 bg-[#050505]/90 backdrop-blur-md p-4 border border-white/15">
              <span className="text-[9px] font-mono uppercase text-[#C1FF72] tracking-widest block">
                [ ATELIER HANDCRAFT ]
              </span>
              <span className="font-serif-luxury italic text-xl text-[#F0F0F0]">
                Cockpit Ergonomics & Acoustic Tuning
              </span>
            </div>
          </div>

          {/* Right Material Details */}
          <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-[#0A0A0A]">
            <div>
              <span className="text-xs font-mono text-[#C1FF72] uppercase tracking-[0.25em] block mb-2">
                [ MATERIAL PHILOSOPHY ]
              </span>
              <h2 className="font-serif-luxury italic text-3xl text-[#F0F0F0] mb-2">
                Bespoke Interiors.
              </h2>
              <p className="text-xs text-[#F0F0F0]/60 leading-relaxed mb-6 font-light">
                Every stitch, toggle, and knurled switch in the Apex Heritage fleet is designed to create an intimate bond between driver and machine.
              </p>

              {/* Material Switcher */}
              <div className="space-y-2.5 mb-6">
                {materials.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setActiveMaterial(mat.id as any)}
                    className={`w-full text-left p-3 border transition-all ${
                      activeMaterial === mat.id
                        ? 'bg-[#151515] border-[#C1FF72] text-white shadow-md'
                        : 'bg-[#0F0F0F] border-white/10 text-[#F0F0F0]/70 hover:border-white/30'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-[#F0F0F0]">{mat.name}</span>
                      <span className="text-[9px] font-mono text-[#C1FF72] uppercase">{mat.origin}</span>
                    </div>
                    <p className="text-[11px] text-[#F0F0F0]/60 leading-normal font-light">{mat.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  onClose();
                  onSelectCarToReserve();
                }}
                className="w-full bg-[#C1FF72] hover:bg-[#b2f55e] text-black py-3 text-[10px] font-mono font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span>Reserve a Bespoke Vehicle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
