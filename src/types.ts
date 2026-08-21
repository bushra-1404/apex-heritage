export type CarCategory = 'all' | 'supercar' | 'grand-tourer' | 'classic' | 'roadster' | 'hypercar';

export interface CarSpec {
  engine: string;
  horsepower: number;
  torque: string;
  zeroToSixty: string;
  topSpeed: string;
  transmission: string;
  drivetrain: string;
  weight: string;
}

export interface Car {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  category: CarCategory;
  dailyRate: number;
  featured: boolean;
  image: string;
  galleryImages: string[];
  tags: string[];
  specs: CarSpec;
  description: string;
  highlights: string[];
  availableColors: { name: string; hex: string; threeHex: number }[];
  soundType: 'v12-high' | 'v8-rumble' | 'v10-screamer' | 'turbo-hybrid';
}

export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  distance: string;
  price: number;
  image: string;
  description: string;
  includedCars: string[];
  routeHighlights: string[];
}

export interface HeritageMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stat?: string;
  statLabel?: string;
}

export interface ReservationDetails {
  carId: string;
  pickupLocation: string;
  pickupDate: string;
  returnDate: string;
  deliveryOption: 'atelier' | 'private-jet' | 'hotel-concierge';
  insurancePlan: 'standard' | 'apex-shield-vip';
  addons: string[];
  totalDays: number;
  totalPrice: number;
  customColor?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}
