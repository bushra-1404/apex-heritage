import React, { useState } from 'react';
import { Search, Filter, Volume2, ArrowRight, Gauge, Zap, Cog, Sparkles } from 'lucide-react';
import { Car, CarCategory } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface FleetCatalogProps {
  cars: Car[];
  onSelectCar: (car: Car) => void;
  onReserveCar: (car: Car) => void;
}

export const FleetCatalog: React.FC<FleetCatalogProps> = ({
  cars,
  onSelectCar,
  onReserveCar,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CarCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'speed' | 'power'>('featured');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const categories: { id: CarCategory; label: string }[] = [
    { id: 'all', label: 'All Fleet' },
    { id: 'supercar', label: 'Supercars' },
    { id: 'grand-tourer', label: 'Grand Tourers' },
    { id: 'roadster', label: 'Roadsters' },
    { id: 'classic', label: 'Historic Classics' },
    { id: 'hypercar', label: 'Hyper-Hybrids' },
  ];

  const handleRev = (e: React.MouseEvent, car: Car) => {
    e.stopPropagation();
    setPlayingId(car.id);
    audioEngine.playRev(car.soundType, 2.2);
    setTimeout(() => setPlayingId(null), 2200);
  };

  const filteredCars = cars
    .filter((car) => {
      const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.dailyRate - b.dailyRate;
      if (sortBy === 'price-desc') return b.dailyRate - a.dailyRate;
      if (sortBy === 'power') return b.specs.horsepower - a.specs.horsepower;
      if (sortBy === 'speed') return parseInt(b.specs.topSpeed) - parseInt(a.specs.topSpeed);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <section id="fleet-catalog" className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#050505] text-[#F0F0F0]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/10 pb-8">
        <div>
          <span className="text-[#C1FF72] text-xs font-mono mb-2 block tracking-[0.25em]">
            [ COLLECTION_001 // THE APEX PORTFOLIO ]
          </span>
          <h2 className="font-serif-luxury italic text-3xl md:text-5xl text-[#F0F0F0]">
            The Complete Fleet Portfolio.
          </h2>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-[#F0F0F0]/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search V12, GT3, Manual..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/15 text-xs text-[#F0F0F0] pl-9 pr-3 py-2.5 font-mono focus:outline-none focus:border-[#C1FF72]"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#0A0A0A] border border-white/15 text-xs text-[#F0F0F0] px-3 py-2.5 font-mono focus:outline-none cursor-pointer"
          >
            <option value="featured">Sort: Featured Collection</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="power">Horsepower: Highest</option>
            <option value="speed">Top Speed: Fastest</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 text-[10px] font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#C1FF72] text-black font-bold shadow-lg shadow-[#C1FF72]/15'
                : 'bg-[#0A0A0A] text-[#F0F0F0]/60 border border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cars Grid */}
      {filteredCars.length === 0 ? (
        <div className="text-center py-20 bg-[#0A0A0A] border border-white/10 p-8">
          <p className="font-serif-luxury italic text-xl text-[#F0F0F0] mb-2">No matching vehicles found</p>
          <p className="text-xs text-[#F0F0F0]/50 font-mono">Try adjusting your search criteria or filter tags.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              onClick={() => onSelectCar(car)}
              className="group bg-[#0A0A0A] border border-white/10 hover:border-white/30 transition-all duration-300 rounded-none overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#000]">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${car.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-85" />

                {/* Tags */}
                <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
                  {car.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#050505]/90 backdrop-blur-md px-2 py-0.5 text-[9px] font-mono text-[#F0F0F0] border border-white/15 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Rev Audio Button */}
                <button
                  onClick={(e) => handleRev(e, car)}
                  className={`absolute top-3.5 right-3.5 p-2 border backdrop-blur-md transition-all z-10 ${
                    playingId === car.id
                      ? 'bg-[#C1FF72] text-black border-[#C1FF72] animate-pulse'
                      : 'bg-[#050505]/80 text-[#F0F0F0]/70 border-white/15 hover:text-white hover:border-[#C1FF72]'
                  }`}
                  title="Test Engine Sound"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-serif-luxury italic text-xl text-[#F0F0F0] group-hover:text-white transition-colors">
                      {car.name}
                    </h3>
                    <span className="font-mono text-sm font-semibold text-[#C1FF72]">
                      ${car.dailyRate.toLocaleString()}
                      <span className="text-[10px] font-normal text-[#F0F0F0]/50 font-mono">/day</span>
                    </span>
                  </div>

                  <p className="text-xs text-[#F0F0F0]/60 mb-5 line-clamp-1 font-light">
                    {car.subtitle}
                  </p>

                  {/* Quick Specs Strip */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 mb-5 text-center">
                    <div>
                      <span className="block font-serif-luxury italic text-sm text-[#F0F0F0]">
                        {car.specs.horsepower} HP
                      </span>
                      <span className="block text-[8px] font-mono text-[#F0F0F0]/50 uppercase">Power</span>
                    </div>
                    <div className="border-x border-white/10">
                      <span className="block font-serif-luxury italic text-sm text-[#F0F0F0]">
                        {car.specs.zeroToSixty}
                      </span>
                      <span className="block text-[8px] font-mono text-[#F0F0F0]/50 uppercase">0-60 MPH</span>
                    </div>
                    <div>
                      <span className="block font-serif-luxury italic text-sm text-[#F0F0F0]">
                        {car.specs.topSpeed}
                      </span>
                      <span className="block text-[8px] font-mono text-[#F0F0F0]/50 uppercase">Top Speed</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCar(car);
                    }}
                    className="flex-1 border border-white/15 hover:border-white/40 text-[#F0F0F0]/80 hover:text-white py-2 text-[10px] font-mono uppercase tracking-wider transition-colors"
                  >
                    Specs
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onReserveCar(car);
                    }}
                    className="flex-1 bg-[#C1FF72] hover:bg-[#b2f55e] text-black py-2 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
