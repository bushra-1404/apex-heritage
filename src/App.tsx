import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FleetBento } from './components/FleetBento';
import { FleetCatalog } from './components/FleetCatalog';
import { CarDetailModal } from './components/CarDetailModal';
import { Studio3DConfigurator } from './components/Studio3DConfigurator';
import { HeritageSection } from './components/HeritageSection';
import { ExperiencesSection } from './components/ExperiencesSection';
import { BespokeInteriorViewer } from './components/BespokeInteriorViewer';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { CAR_COLLECTION } from './data/cars';
import { Car, Experience, ReservationDetails } from './types';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCarForDetail, setSelectedCarForDetail] = useState<Car | null>(null);
  const [selectedCarForStudio, setSelectedCarForStudio] = useState<Car>(CAR_COLLECTION[0]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isInteriorViewerOpen, setIsInteriorViewerOpen] = useState(false);

  // Reservation State
  const [bookingCar, setBookingCar] = useState<Car | null>(null);
  const [bookingParams, setBookingParams] = useState<{ location: string; pickupDate: string; returnDate: string } | null>(null);
  const [confirmedReservations, setConfirmedReservations] = useState<ReservationDetails[]>([]);
  const [showConfirmationToast, setShowConfirmationToast] = useState(false);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId) || document.getElementById(`${sectionId}-section`) || document.getElementById(`bespoke-${sectionId}`) || document.getElementById(`fleet-catalog`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCheckAvailability = (params: { location: string; pickupDate: string; returnDate: string; category: string }) => {
    setBookingParams({
      location: params.location,
      pickupDate: params.pickupDate,
      returnDate: params.returnDate,
    });
    setBookingCar(CAR_COLLECTION[0]);
    setIsBookingOpen(true);
  };

  const handleReserveCar = (car: Car) => {
    setBookingCar(car);
    setIsBookingOpen(true);
  };

  const handleReserveExperience = (exp: Experience) => {
    const matchingCar = CAR_COLLECTION.find((c) => exp.includedCars.some((ic) => c.name.includes(ic))) || CAR_COLLECTION[0];
    setBookingCar(matchingCar);
    setIsBookingOpen(true);
  };

  const handleOpenStudioForCar = (car: Car) => {
    setSelectedCarForStudio(car);
    setActiveSection('studio');
    const studioEl = document.getElementById('bespoke-studio');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReserveConfigured = (car: Car, configSummary: string, adjustedPrice: number) => {
    setBookingCar({
      ...car,
      dailyRate: adjustedPrice,
      subtitle: `${car.subtitle} · Custom: ${configSummary}`,
    });
    setIsBookingOpen(true);
  };

  const handleBookingConfirmed = (res: ReservationDetails) => {
    setConfirmedReservations((prev) => [res, ...prev]);
    setShowConfirmationToast(true);
    setTimeout(() => setShowConfirmationToast(false), 6000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] flex flex-col font-sans-precision selection:bg-[#C1FF72] selection:text-black">
      {/* Fixed Luxury Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={() => {
          setBookingCar(CAR_COLLECTION[0]);
          setIsBookingOpen(true);
        }}
        reservationCount={confirmedReservations.length}
      />

      {/* Confirmation Toast */}
      {showConfirmationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A0A0A] border border-[#C1FF72] text-[#F0F0F0] p-4 rounded-none shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#C1FF72]" />
          <div>
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#C1FF72]">[ CHASSIS RESERVED ]</div>
            <div className="text-[11px] text-[#F0F0F0]/80">Your voucher has been generated & concierge alerted.</div>
          </div>
        </div>
      )}

      {/* Hero Section with Interactive 3D Three.js Car and Quick Reserve Bar */}
      <HeroSection
        onCheckAvailability={handleCheckAvailability}
        onExploreFleet={() => handleNavigate('fleet')}
      />

      {/* Curated Fleet Bento Gallery (Matches Prompt HTML) */}
      <div id="fleet">
        <FleetBento
          cars={CAR_COLLECTION}
          onSelectCar={(car) => setSelectedCarForDetail(car)}
          onReserveCar={handleReserveCar}
          onViewAllFleet={() => {
            const catalogEl = document.getElementById('fleet-catalog');
            if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenInteriorViewer={() => setIsInteriorViewerOpen(true)}
        />
      </div>

      {/* Complete Filterable Fleet Portfolio */}
      <FleetCatalog
        cars={CAR_COLLECTION}
        onSelectCar={(car) => setSelectedCarForDetail(car)}
        onReserveCar={handleReserveCar}
      />

      {/* Interactive 3D Bespoke Configurator Studio */}
      <div id="studio">
        <Studio3DConfigurator
          initialCar={selectedCarForStudio}
          onReserveConfigured={handleReserveConfigured}
        />
      </div>

      {/* Alpine Driving Tours & Road Experiences */}
      <div id="experiences">
        <ExperiencesSection onReserveExperience={handleReserveExperience} />
      </div>

      {/* Historic Provenance & Racing Legacy Timeline */}
      <div id="heritage">
        <HeritageSection />
      </div>

      {/* Concierge & Atelier Guarantee Banner */}
      <section id="concierge" className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
        <div className="bg-[#0A0A0A] border border-white/10 p-8 md:p-12 rounded-none flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#C1FF72]/10 to-transparent pointer-events-none" />
          <div className="max-w-2xl relative z-10">
            <span className="text-[#C1FF72] text-xs font-mono mb-2 block tracking-[0.25em]">
              [ CONCIERGE_001 // PRIVATE VIP ATELIER ]
            </span>
            <h3 className="font-serif-luxury italic text-2xl md:text-3xl text-[#F0F0F0] mb-2">
              Bespoke Cross-Border European Delivery.
            </h3>
            <p className="text-xs md:text-sm text-[#F0F0F0]/70 font-light leading-relaxed">
              Whether meeting your private jet at Zurich Airport or delivering directly to a villa in Cap d'Antibes, our team orchestrates every detail with white-glove precision.
            </p>
          </div>
          <button
            onClick={() => {
              setBookingCar(CAR_COLLECTION[0]);
              setIsBookingOpen(true);
            }}
            className="bg-[#C1FF72] hover:bg-[#b2f55e] text-black px-8 py-3.5 text-xs font-bold tracking-widest uppercase transition-all shadow-lg shadow-[#C1FF72]/15 whitespace-nowrap relative z-10 font-mono"
          >
            Inquire with Concierge
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => {
          setBookingCar(CAR_COLLECTION[0]);
          setIsBookingOpen(true);
        }}
      />

      {/* Modals */}
      {selectedCarForDetail && (
        <CarDetailModal
          car={selectedCarForDetail}
          onClose={() => setSelectedCarForDetail(null)}
          onReserve={(car) => {
            setSelectedCarForDetail(null);
            handleReserveCar(car);
          }}
          onOpenStudio={(car) => {
            setSelectedCarForDetail(null);
            handleOpenStudioForCar(car);
          }}
        />
      )}

      {isInteriorViewerOpen && (
        <BespokeInteriorViewer
          onClose={() => setIsInteriorViewerOpen(false)}
          onSelectCarToReserve={() => {
            setIsInteriorViewerOpen(false);
            setBookingCar(CAR_COLLECTION[0]);
            setIsBookingOpen(true);
          }}
        />
      )}

      {isBookingOpen && (
        <BookingModal
          initialCar={bookingCar}
          initialParams={bookingParams}
          onClose={() => setIsBookingOpen(false)}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}
    </div>
  );
}
