export type Language = 'en' | 'te';

export type UserRole = 
  | 'guest' 
  | 'customer' 
  | 'provider' 
  | 'business' 
  | 'property_owner' 
  | 'village_admin' 
  | 'super_admin';

export type HomeMode = 'services' | 'properties';

export interface Village {
  id: string;
  name: string;
  teluguName: string;
  code: string;
  mandal: string;
  district: string;
  pincode: string;
  population: number;
  adminName: string;
  adminPhone: string;
  status: 'active' | 'inactive';
  registeredCount: {
    customers: number;
    providers: number;
    businesses: number;
    properties: number;
    enquiries: number;
  };
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  teluguName: string;
  icon: string;
  description: string;
  teluguDescription: string;
  providerCount: number;
  popularServices: string[];
  bgTint?: string;
  group?: 'home_service' | 'home_repairs' | 'events' | 'builders' | 'vehicles' | 'personal';
}

export interface ServiceItem {
  id: string;
  name: string;
  teluguName: string;
  price: string;
  unit?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  teluguName: string;
  villageId: string;
  villageName: string;
  villageTelugu: string;
  category: string;
  categoryTelugu: string;
  phone: string;
  whatsapp: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  avatar: string;
  about: string;
  aboutTelugu: string;
  services: ServiceItem[];
  workingHours: string;
  workingHoursTelugu: string;
  status: 'active' | 'pending' | 'rejected';
  gallery: string[];
  reviewsList: {
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

export interface BusinessListing {
  id: string;
  name: string;
  teluguName: string;
  ownerName: string;
  villageId: string;
  villageName: string;
  villageTelugu: string;
  category: string;
  categoryTelugu: string;
  phone: string;
  whatsapp: string;
  image: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  address: string;
  addressTelugu: string;
  openingHours: string;
  highlights: string[];
  status: 'active' | 'pending' | 'rejected';
}

export interface PropertyCategory {
  id: string;
  slug: string;
  titleEn: string;
  titleTe: string;
  subEn: string;
  subTe: string;
  icon: string;
  bgTint: string;
  count: number;
}

export interface PropertyListing {
  id: string;
  title: string;
  teluguTitle: string;
  villageId: string;
  villageName: string;
  villageTelugu: string;
  propertyType: 'agricultural' | 'residential' | 'commercial' | 'plot' | 'pg' | 'lease';
  listingType: 'sale' | 'rent' | 'lease';
  price: string;
  size: string;
  image: string;
  ownerName: string;
  ownerPhone: string;
  amenities: string[];
  status: 'active' | 'pending' | 'sold';
  description: string;
  isFeatured?: boolean;
}

export interface LocalAdBanner {
  id: string;
  titleEn: string;
  titleTe: string;
  subtitleEn: string;
  subtitleTe: string;
  phone: string;
  altPhone?: string;
  locationEn: string;
  locationTe: string;
  imageUrl: string;
  badge?: string;
  isSponsored: boolean;
}

export interface Enquiry {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  targetType: 'provider' | 'business' | 'property';
  targetId: string;
  targetName: string;
  villageId: string;
  villageName: string;
  serviceRequested: string;
  bookingDate?: string;
  preferredTime?: string;
  location?: string;
  message: string;
  urgent: boolean;
  status: 'new' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'rejected' | 'viewed' | 'contacted';
  createdAt: string;
  amount?: string;
  workDescription?: string;
  amountCharged?: number | string;
  completedAt?: string;
  reviewSubmitted?: boolean;
  rating?: number;
  reviewComment?: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
}

export interface AppUser {
  id: string;
  name: string;
  email?: string;
  phone: string;
  role: UserRole;
  villageId?: string;
  villageName?: string;
  languagePreference: Language;
  isVerified?: boolean;
}
