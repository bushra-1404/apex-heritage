import React, { useState } from 'react';
import { MapPin, Calendar as CalendarIcon, ArrowRight, Car as CarIcon, Sparkles } from 'lucide-react';

interface QuickReserveBarProps {
  onCheckAvailability: (searchParams: { location: string; pickupDate: string; returnDate: string; category: string }) => void;
}

export const QuickReserveBar: React.FC<QuickReserveBarProps> = ({ onCheckAvailability }) => {
  const [location, setLocation] = useState('Monaco Atelier & Port Hercule');
  const [pickupDate, setPickupDate] = useState('2026-09-15');
  const [returnDate, setReturnDate] = useState('2026-09-18');
  const [category, setCategory] = useState('all');

  const locations = [
    'Monaco Atelier & Port Hercule',
    'Zurich Kloten Private Jet Terminal',
    'Geneva Lakefront Atelier',
    'London Mayfair Heritage Hub',
    'Milan Quadrilatero della Moda',
    'Nice Côte d\'Azur Heliport',
    'Paris Place Vendôme Concierge',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      location,
      pickupDate,
      returnDate,
      category,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto bg-[#0A0A0A]/90 backdrop-blur-2xl p-3 rounded-none shadow-2xl flex flex-col lg:flex-row gap-2.5 border border-white/15"
    >
      {/* Location */}
      <div className="flex-1 relative bg-[#151515] rounded-none border border-white/10 hover:border-white/30 transition-colors">
        <MapPin className="w-4 h-4 text-[#C1FF72] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="pl-10 pr-3 py-2.5">
          <label className="block text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#C1FF72]">
            [ ATELIER LOCATION ]
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-xs md:text-sm text-[#F0F0F0] font-medium focus:outline-none cursor-pointer appearance-none truncate pt-0.5"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc} className="bg-[#151515] text-[#F0F0F0]">
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pickup Date */}
      <div className="flex-1 relative bg-[#151515] rounded-none border border-white/10 hover:border-white/30 transition-colors">
        <CalendarIcon className="w-4 h-4 text-[#C1FF72] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="pl-10 pr-3 py-2.5">
          <label className="block text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#C1FF72]">
            [ PICKUP DATE ]
          </label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full bg-transparent text-xs md:text-sm text-[#F0F0F0] font-medium focus:outline-none cursor-pointer pt-0.5 [color-scheme:dark]"
          />
        </div>
      </div>

      {/* Return Date */}
      <div className="flex-1 relative bg-[#151515] rounded-none border border-white/10 hover:border-white/30 transition-colors">
        <CalendarIcon className="w-4 h-4 text-[#C1FF72] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="pl-10 pr-3 py-2.5">
          <label className="block text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#C1FF72]">
            [ RETURN DATE ]
          </label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full bg-transparent text-xs md:text-sm text-[#F0F0F0] font-medium focus:outline-none cursor-pointer pt-0.5 [color-scheme:dark]"
          />
        </div>
      </div>

      {/* Submit CTA */}
      <button
        type="submit"
        className="bg-[#C1FF72] text-black px-7 py-3.5 md:py-auto font-bold text-[10px] tracking-widest uppercase hover:bg-[#b2f55e] transition-all duration-300 rounded-none flex items-center justify-center gap-2.5 shadow-lg shadow-[#C1FF72]/15 active:scale-98 group whitespace-nowrap"
      >
        <span>Check Availability</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
};
