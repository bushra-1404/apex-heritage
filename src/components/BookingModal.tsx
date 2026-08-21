import React, { useState } from 'react';
import { X, Calendar, MapPin, ShieldCheck, Check, ArrowRight, ArrowLeft, Sparkles, Key, AlertCircle, Phone, Mail, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Car, ReservationDetails } from '../types';
import { CAR_COLLECTION } from '../data/cars';

interface BookingModalProps {
  initialCar?: Car | null;
  initialParams?: { location: string; pickupDate: string; returnDate: string } | null;
  onClose: () => void;
  onBookingConfirmed: (reservation: ReservationDetails) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  initialCar,
  initialParams,
  onClose,
  onBookingConfirmed,
}) => {
  const [selectedCar, setSelectedCar] = useState<Car>(initialCar || CAR_COLLECTION[0]);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [location, setLocation] = useState(initialParams?.location || 'Monaco Atelier & Port Hercule');
  const [pickupDate, setPickupDate] = useState(initialParams?.pickupDate || '2026-09-15');
  const [returnDate, setReturnDate] = useState(initialParams?.returnDate || '2026-09-18');
  const [deliveryOption, setDeliveryOption] = useState<'atelier' | 'private-jet' | 'hotel-concierge'>('atelier');
  const [insurancePlan, setInsurancePlan] = useState<'standard' | 'apex-shield-vip'>('apex-shield-vip');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['telemetry-kit']);

  // Customer info
  const [name, setName] = useState('Lord Harrison Thorne');
  const [email, setEmail] = useState('harrison.thorne@apex-heritage.luxury');
  const [phone, setPhone] = useState('+377 98 06 20 00');
  const [licenseCountry, setLicenseCountry] = useState('Monaco / UK');
  const [specialRequests, setSpecialRequests] = useState('Please ensure chilled Champagne in luggage compartment.');

  // Confirmed booking voucher state
  const [bookingCode, setBookingCode] = useState('');

  // Calculate rental duration in days
  const start = new Date(pickupDate).getTime();
  const end = new Date(returnDate).getTime();
  const diffDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 3);

  // Price calculations
  const basePrice = selectedCar.dailyRate * diffDays;
  const deliveryFee = deliveryOption === 'private-jet' ? 350 : deliveryOption === 'hotel-concierge' ? 200 : 0;
  const insuranceFee = insurancePlan === 'apex-shield-vip' ? 250 * diffDays : 0;
  const addonFees = selectedAddons.reduce((acc, addon) => {
    if (addon === 'telemetry-kit') return acc + 180;
    if (addon === 'pro-instructor') return acc + 900;
    if (addon === 'chase-photographer') return acc + 1200;
    return acc;
  }, 0);

  const totalPrice = basePrice + deliveryFee + insuranceFee + addonFees;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleFinalizeBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `APX-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingCode(code);
    setStep(4);

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C1FF72', '#F0F0F0', '#ffffff', '#222222'],
    });

    onBookingConfirmed({
      carId: selectedCar.id,
      pickupLocation: location,
      pickupDate,
      returnDate,
      deliveryOption,
      insurancePlan,
      addons: selectedAddons,
      totalDays: diffDays,
      totalPrice,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#0A0A0A] border border-white/15 rounded-none shadow-2xl overflow-hidden my-auto text-[#F0F0F0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 bg-[#050505] border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C1FF72] animate-pulse" />
            <div>
              <h3 className="font-serif-luxury italic text-xl text-[#F0F0F0]">
                Apex Heritage Reservation.
              </h3>
              <p className="text-[10px] font-mono text-[#C1FF72] uppercase tracking-wider">
                [ STEP {step} OF 4 — {step === 1 ? 'VEHICLE & ITINERARY' : step === 2 ? 'VIP CONCIERGE PERKS' : step === 3 ? 'DRIVER VERIFICATION' : 'CONFIRMED VOUCHER'} ]
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-[#0A0A0A] hover:bg-[#C1FF72] text-white hover:text-black rounded-none border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Vehicle & Dates */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[78vh] overflow-y-auto">
            {/* Selected Machine Strip */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F0F0F0]/60 mb-2">
                [ SELECT CHASSIS ]
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {CAR_COLLECTION.map((car) => (
                  <div
                    key={car.id}
                    onClick={() => setSelectedCar(car)}
                    className={`p-3 border cursor-pointer transition-all flex items-center gap-3 ${
                      selectedCar.id === car.id
                        ? 'border-[#C1FF72] bg-[#151515]'
                        : 'border-white/10 bg-[#050505]/60 hover:border-white/30'
                    }`}
                  >
                    <img src={car.image} alt={car.name} className="w-14 h-10 object-cover" />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-serif-luxury italic text-[#F0F0F0] truncate">{car.name}</h4>
                      <p className="text-[10px] font-mono text-[#C1FF72]">${car.dailyRate}/day</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F0F0F0]/60 mb-1.5">
                  Delivery Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#050505] border border-white/15 text-xs text-[#F0F0F0] p-3 font-mono focus:outline-none focus:border-[#C1FF72]"
                >
                  <option value="Monaco Atelier & Port Hercule">Monaco Atelier & Port Hercule</option>
                  <option value="Zurich Kloten Private Jet Terminal">Zurich Kloten Private Jet Terminal</option>
                  <option value="Geneva Lakefront Atelier">Geneva Lakefront Atelier</option>
                  <option value="London Mayfair Heritage Hub">London Mayfair Heritage Hub</option>
                  <option value="Milan Quadrilatero della Moda">Milan Quadrilatero della Moda</option>
                  <option value="Nice Côte d'Azur Heliport">Nice Côte d'Azur Heliport</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F0F0F0]/60 mb-1.5">
                  Pickup Date
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full bg-[#050505] border border-white/15 text-xs text-[#F0F0F0] p-3 font-mono focus:outline-none focus:border-[#C1FF72] [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F0F0F0]/60 mb-1.5">
                  Return Date
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full bg-[#050505] border border-white/15 text-xs text-[#F0F0F0] p-3 font-mono focus:outline-none focus:border-[#C1FF72] [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Delivery Method */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F0F0F0]/60 mb-2">
                Handover Protocol
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'atelier', title: 'Atelier Collection', fee: 'Complimentary', desc: 'Direct handover at our flagship lounge with vintage espresso & briefing' },
                  { id: 'private-jet', title: 'Private Aviation Tarmac', fee: '+$350', desc: 'Car staged planeside next to your private aircraft upon landing' },
                  { id: 'hotel-concierge', title: '5-Star Hotel Valet', fee: '+$200', desc: 'White-glove delivery directly to your luxury suite or villa' },
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setDeliveryOption(opt.id as any)}
                    className={`p-3.5 border cursor-pointer transition-all ${
                      deliveryOption === opt.id
                        ? 'border-[#C1FF72] bg-[#151515]'
                        : 'border-white/10 bg-[#050505]/60 hover:border-white/30'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-[#F0F0F0]">{opt.title}</span>
                      <span className="text-[10px] font-mono text-[#C1FF72] font-bold">{opt.fee}</span>
                    </div>
                    <p className="text-[11px] text-[#F0F0F0]/60 leading-tight font-light">{opt.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-mono uppercase text-[#F0F0F0]/50">Estimated {diffDays} Days Rental</span>
                <div className="font-mono text-xl font-bold text-[#C1FF72]">${basePrice.toLocaleString()}</div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="bg-[#C1FF72] hover:bg-[#b2f55e] text-black px-6 py-3 text-[10px] font-mono font-bold tracking-widest uppercase transition-all flex items-center gap-2"
              >
                <span>Continue to Add-ons</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Protection & Add-ons */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[78vh] overflow-y-auto">
            {/* Shield Protection */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F0F0F0]/60 mb-2">
                Apex Security & Damage Waiver
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setInsurancePlan('apex-shield-vip')}
                  className={`p-4 border cursor-pointer transition-all ${
                    insurancePlan === 'apex-shield-vip'
                      ? 'border-[#C1FF72] bg-[#151515]'
                      : 'border-white/10 bg-[#050505]/60'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-[#F0F0F0] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#C1FF72]" /> Apex Shield VIP (Zero Deductible)
                    </span>
                    <span className="text-xs font-mono text-[#C1FF72] font-bold">+$250/day</span>
                  </div>
                  <p className="text-[11px] text-[#F0F0F0]/60 leading-normal font-light">
                    Complete carbon fiber & track coverage, rim curb rash forgiveness, and 24/7 dedicated support car.
                  </p>
                </div>

                <div
                  onClick={() => setInsurancePlan('standard')}
                  className={`p-4 border cursor-pointer transition-all ${
                    insurancePlan === 'standard'
                      ? 'border-[#C1FF72] bg-[#151515]'
                      : 'border-white/10 bg-[#050505]/60'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-[#F0F0F0]">Standard Comprehensive</span>
                    <span className="text-xs font-mono text-[#F0F0F0]/60">Included</span>
                  </div>
                  <p className="text-[11px] text-[#F0F0F0]/60 leading-normal font-light">
                    $5,000 security hold authorization, third party liability, and standard roadside recovery.
                  </p>
                </div>
              </div>
            </div>

            {/* Bespoke Extras */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F0F0F0]/60 mb-2">
                Bespoke Experiences & Track Add-ons
              </label>
              <div className="space-y-3">
                {[
                  {
                    id: 'telemetry-kit',
                    title: 'MoTeC Live Telemetry & GoPro 4K Multi-Cam Pack',
                    price: 180,
                    desc: 'Pre-installed GPS lap timer and dual 4K cockpit cameras with telemetry data overlay USB to keep.',
                  },
                  {
                    id: 'pro-instructor',
                    title: '1-on-1 Former 24h Le Mans Driver Co-Pilot',
                    price: 900,
                    desc: 'A professional racing driver joins you for half-day coaching through technical alpine switchbacks.',
                  },
                  {
                    id: 'chase-photographer',
                    title: 'Private Cinema Drone & Photography Chase Car',
                    price: 1200,
                    desc: 'Professional automotive film crew captures 4K aerial and rolling footage of your scenic drive.',
                  },
                ].map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked ? 'border-[#C1FF72] bg-[#151515]' : 'border-white/10 bg-[#050505]/60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-1 accent-[#C1FF72] cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-[#F0F0F0]">{addon.title}</span>
                          <span className="text-xs font-mono text-[#C1FF72] font-bold">+${addon.price}</span>
                        </div>
                        <p className="text-[11px] text-[#F0F0F0]/60 leading-tight mt-0.5 font-light">{addon.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nav */}
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <button
                onClick={() => setStep(1)}
                className="border border-white/15 hover:border-white/40 text-[#F0F0F0]/70 hover:text-white px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setStep(3)}
                className="bg-[#C1FF72] hover:bg-[#b2f55e] text-black px-6 py-3 text-[10px] font-mono font-bold tracking-widest uppercase transition-all flex items-center gap-2"
              >
                <span>Driver Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Driver Details */}
        {step === 3 && (
          <form onSubmit={handleFinalizeBooking} className="p-6 sm:p-8 space-y-6 max-h-[78vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F0F0F0]/60 mb-1.5">
                  Full Name / Title
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#F0F0F0]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#050505] border border-white/15 text-xs text-[#F0F0F0] pl-9 pr-3 py-3 font-mono focus:outline-none focus:border-[#C1FF72]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F0F0F0]/60 mb-1.5">
                  Primary Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#F0F0F0]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050505] border border-white/15 text-xs text-[#F0F0F0] pl-9 pr-3 py-3 font-mono focus:outline-none focus:border-[#C1FF72]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F0F0F0]/60 mb-1.5">
                  Contact Mobile / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#F0F0F0]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#050505] border border-white/15 text-xs text-[#F0F0F0] pl-9 pr-3 py-3 font-mono focus:outline-none focus:border-[#C1FF72]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F0F0F0]/60 mb-1.5">
                  Driver's License Jurisdiction
                </label>
                <input
                  type="text"
                  required
                  value={licenseCountry}
                  onChange={(e) => setLicenseCountry(e.target.value)}
                  className="w-full bg-[#050505] border border-white/15 text-xs text-[#F0F0F0] p-3 font-mono focus:outline-none focus:border-[#C1FF72]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F0F0F0]/60 mb-1.5">
                Special Concierge Instructions
              </label>
              <textarea
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full bg-[#050505] border border-white/15 text-xs text-[#F0F0F0] p-3 font-mono focus:outline-none focus:border-[#C1FF72]"
              />
            </div>

            {/* Total Breakdown summary */}
            <div className="p-4 bg-[#050505] border border-white/10">
              <div className="flex justify-between items-center text-xs text-[#F0F0F0]/60 mb-1 font-mono">
                <span>{selectedCar.name} ({diffDays} Days × ${selectedCar.dailyRate})</span>
                <span className="font-mono text-[#F0F0F0]">${basePrice.toLocaleString()}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between items-center text-xs text-[#F0F0F0]/60 mb-1 font-mono">
                  <span>Handover Protocol Fee</span>
                  <span className="font-mono text-[#F0F0F0]">${deliveryFee}</span>
                </div>
              )}
              {insuranceFee > 0 && (
                <div className="flex justify-between items-center text-xs text-[#F0F0F0]/60 mb-1 font-mono">
                  <span>Apex VIP Shield Coverage</span>
                  <span className="font-mono text-[#F0F0F0]">${insuranceFee.toLocaleString()}</span>
                </div>
              )}
              {addonFees > 0 && (
                <div className="flex justify-between items-center text-xs text-[#F0F0F0]/60 mb-1 font-mono">
                  <span>Selected Experience Add-ons</span>
                  <span className="font-mono text-[#F0F0F0]">${addonFees.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-base font-bold text-white pt-2 border-t border-white/10 mt-2">
                <span className="font-serif-luxury italic">Total Heritage Guarantee</span>
                <span className="font-mono text-[#C1FF72] text-lg">${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="border border-white/15 hover:border-white/40 text-[#F0F0F0]/70 hover:text-white px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="bg-[#C1FF72] hover:bg-[#b2f55e] text-black px-8 py-3.5 text-[10px] font-mono font-bold tracking-widest uppercase transition-all flex items-center gap-2 shadow-lg shadow-[#C1FF72]/15"
              >
                <Key className="w-4 h-4" />
                <span>Confirm & Lock Reservation</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Confirmation Voucher */}
        {step === 4 && (
          <div className="p-8 sm:p-12 text-center space-y-6 max-h-[78vh] overflow-y-auto">
            <div className="w-16 h-16 bg-[#C1FF72]/15 border border-[#C1FF72] flex items-center justify-center mx-auto text-[#C1FF72]">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono text-[#C1FF72] uppercase tracking-widest block mb-1">
                [ RESERVATION CONCLUDED // VOUCHER DISPATCHED ]
              </span>
              <h2 className="font-serif-luxury italic text-3xl sm:text-4xl text-[#F0F0F0]">
                Your Key Awaits, {name.split(' ')[0]}.
              </h2>
            </div>

            {/* Voucher Box */}
            <div className="max-w-md mx-auto p-6 bg-[#050505] border border-[#C1FF72] text-left space-y-3 shadow-2xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-[10px] text-[#F0F0F0]/60 font-mono uppercase">Voucher Code</span>
                <span className="font-mono text-base font-bold text-[#C1FF72]">{bookingCode}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#F0F0F0]/60">Chassis:</span>
                <span className="font-serif-luxury italic text-[#F0F0F0]">{selectedCar.name}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#F0F0F0]/60">Handover Location:</span>
                <span className="text-[#F0F0F0]">{location}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#F0F0F0]/60">Dates:</span>
                <span className="text-[#F0F0F0]">{pickupDate} to {returnDate} ({diffDays} Days)</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-2 border-t border-white/10 font-mono">
                <span className="text-[#F0F0F0]/60">Total Authorized:</span>
                <span className="text-base font-bold text-[#C1FF72]">${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-[#F0F0F0]/60 max-w-md mx-auto leading-relaxed font-light">
              A private chauffeur briefing packet and telemetry access key has been transmitted to <span className="text-[#C1FF72] font-mono">{email}</span>.
            </p>

            <button
              onClick={onClose}
              className="bg-[#C1FF72] hover:bg-[#b2f55e] text-black px-8 py-3.5 text-[10px] font-mono font-bold tracking-widest uppercase transition-all shadow-lg shadow-[#C1FF72]/15"
            >
              Return to Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
