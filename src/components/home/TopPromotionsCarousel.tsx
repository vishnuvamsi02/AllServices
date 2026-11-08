'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Phone,
  MessageCircle,
  Star,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  ShieldCheck,
  Megaphone,
  CheckCircle,
} from 'lucide-react';

interface PromoAd {
  id: string;
  tagEn: string;
  tagTe: string;
  titleEn: string;
  titleTe: string;
  subtitleEn: string;
  subtitleTe: string;
  locationEn: string;
  locationTe: string;
  rating: string;
  phone: string;
  altPhone?: string;
  gradient: string;
  badgeBg: string;
  borderAccent: string;
}

const PROMO_ADS: PromoAd[] = [
  {
    id: 'ad_seeds',
    tagEn: '🌾 20% KRISHI SUBSIDY',
    tagTe: '🌾 20% వ్యవసాయ సబ్సిడీ',
    titleEn: 'Sri Vijaya Agro Seeds & Bio-Fertilizers',
    titleTe: 'శ్రీ విజయ ఆగ్రో సీడ్స్ & బయో-ఎరువుల కేంద్రం',
    subtitleEn: 'Certified BPT & RNR Paddy Seeds with Free Agronomist Soil Advice',
    subtitleTe: 'రైతులకు నమ్మకమైన వరి విత్తనాలు, యూరియా & నిపుణుల ఉచిత సలహాలు',
    locationEn: 'Chinchinaada Center',
    locationTe: 'చించినాడ మెయిన్ సెంటర్',
    rating: '4.9 ★ (340+ Farmers)',
    phone: '9848556677',
    altPhone: '9848011223',
    gradient: 'from-emerald-700 via-teal-800 to-slate-900',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    borderAccent: 'border-emerald-400/50',
  },
  {
    id: 'ad_tractor',
    tagEn: '🚜 HARVEST SPECIAL OFFER',
    tagTe: '🚜 పంట కోత పండుగ ఆఫర్',
    titleEn: 'Sri Kanaka Durga Modern Tractor & Harvester Fleet',
    titleTe: 'శ్రీ కనకదుర్గ ఆధునిక ట్రాక్టర్లు & వరి కోత మిషన్లు',
    subtitleEn: 'John Deere Tractors, Rotavator & Paddy Harvesters @ ₹850/hr',
    subtitleTe: 'రైతులకు వేగవంతమైన వరి కోత & దుక్కి సేవలు • అనుభవజ్ఞులైన డ్రైవర్లు',
    locationEn: 'Palakollu & Chinchinaada',
    locationTe: 'పాలకొల్లు & చించినాడ పరిసరాలు',
    rating: '4.8 ★ (185+ Bookings)',
    phone: '9440128956',
    gradient: 'from-amber-600 via-orange-700 to-slate-950',
    badgeBg: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
    borderAccent: 'border-amber-400/50',
  },
  {
    id: 'ad_movers',
    tagEn: '📦 ALL-INDIA RELOCATION',
    tagTe: '📦 ఆల్-ఇండియా సురక్షిత షిఫ్టింగ్',
    titleEn: 'Lakshmi Safe Packers & Movers (Bhimavaram)',
    titleTe: 'లక్ష్మి ప్యాకర్స్ & మూవర్స్ • భీమవరం బ్రాంచ్',
    subtitleEn: '100% Safe Shifting of Household Goods, Bikes & Farm Tools',
    subtitleTe: 'ఇండియాలో ఎక్కడికైనా మీ సామాన్లు పూర్తి భద్రతతో చేరవేస్తాము',
    locationEn: 'Bhimavaram & Godavari',
    locationTe: 'భీమవరం & గోదావరి గ్రామాలు',
    rating: '4.9 ★ (220+ Families)',
    phone: '7671000878',
    altPhone: '9490385500',
    gradient: 'from-rose-700 via-red-800 to-slate-950',
    badgeBg: 'bg-rose-500/20 text-rose-200 border-rose-400/40',
    borderAccent: 'border-rose-400/50',
  },
  {
    id: 'ad_solar',
    tagEn: '☀️ 60% PM-KUSUM SUBSIDY',
    tagTe: '☀️ 60% ప్రభుత్వ సబ్సిడీ సోలార్',
    titleEn: 'Surya Teja Solar Water Pumps & Submersibles',
    titleTe: 'సూర్యతేజ వ్యవసాయ సోలార్ వాటర్ పంపులు',
    subtitleEn: 'Zero Electricity Bills with 5-HP/7.5-HP Solar Motors • 5-Yr Warranty',
    subtitleTe: 'కరెంటు బిల్లు లేకుండా వ్యవసాయ బోర్ల కోసం సోలార్ పంపులు • 5 ఏళ్ళ వారంటీ',
    locationEn: 'Kaza & Guntur Rural',
    locationTe: 'కాజా & గుంటూరు రూరల్',
    rating: '5.0 ★ (98+ Installations)',
    phone: '9848234567',
    gradient: 'from-blue-700 via-indigo-800 to-slate-950',
    badgeBg: 'bg-blue-500/20 text-blue-200 border-blue-400/40',
    borderAccent: 'border-blue-400/50',
  },
  {
    id: 'ad_health',
    tagEn: '🏥 FREE VILLAGE MEDICAL CAMP',
    tagTe: '🏥 ఈ ఆదివారం ఉచిత వైద్య శిబిరం',
    titleEn: 'Mega Free Health Screening & Eye Checkup',
    titleTe: 'ఉచిత మెగా గ్రామ ఆరోగ్య & నేత్ర వైద్య శిబిరం',
    subtitleEn: 'Free BP, Diabetes Sugar Test, ECG & Medicines by District Doctors',
    subtitleTe: 'రక్తపోటు, షుగర్ పరీక్షలు & ఉచిత మందులు • ఉదయం 8 నుండి గ్రామ పంచాయతీలో',
    locationEn: 'Panchayat Hall, Chinchinaada',
    locationTe: 'గ్రామ పంచాయతీ భవనం, చించినాడ',
    rating: 'Free for All Villagers',
    phone: '08814234100',
    gradient: 'from-teal-700 via-cyan-800 to-slate-950',
    badgeBg: 'bg-teal-500/20 text-teal-200 border-teal-400/40',
    borderAccent: 'border-teal-400/50',
  },
];

interface TopPromotionsCarouselProps {
  onOpenPostAd?: () => void;
}

export const TopPromotionsCarousel: React.FC<TopPromotionsCarouselProps> = ({ onOpenPostAd }) => {
  const { isTelugu } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number>(0);

  // Auto-rotate every 4.5 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMO_ADS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROMO_ADS.length) % PROMO_ADS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROMO_ADS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  const current = PROMO_ADS[currentIndex];

  return (
    <section className="mb-6 pt-3 sm:pt-4">
      
      {/* Top Header Row for Advertisement Section */}
      <div className="flex items-center justify-between gap-3 mb-2.5 px-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center">
            <Megaphone className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700">
            {isTelugu ? 'ప్రధాన ప్రాయోజిత ప్రకటనలు & ఆఫర్లు' : 'Featured Village Ads & Offers'}
          </h2>
          <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
            <Sparkles className="w-2.5 h-2.5" />
            {isTelugu ? 'ధృవీకరించబడినవి' : 'Verified'}
          </span>
        </div>

        {onOpenPostAd && (
          <button
            type="button"
            onClick={onOpenPostAd}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-bold transition-colors"
          >
            <PlusCircle className="w-3 h-3" />
            <span>{isTelugu ? 'మీ ప్రకటన వేయండి' : 'Post Ad'}</span>
          </button>
        )}
      </div>

      {/* Main Carousel Card Container */}
      <div
        className="relative overflow-hidden rounded-3xl shadow-xl transition-all"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`relative bg-gradient-to-br ${current.gradient} text-white p-5 sm:p-7 border-2 ${current.borderAccent} rounded-3xl transition-all duration-500`}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-56 h-56 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

          {/* Top Row: Tag, Rating, Slide Counter */}
          <div className="relative z-10 flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wide border ${current.badgeBg}`}
              >
                {isTelugu ? current.tagTe : current.tagEn}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md text-[11px] font-bold text-amber-300">
                <Star className="w-3 h-3 fill-current text-amber-400" />
                <span>{current.rating}</span>
              </span>
            </div>

            <span className="text-[11px] font-extrabold text-white/70 bg-black/30 px-2 py-0.5 rounded-full">
              {currentIndex + 1} / {PROMO_ADS.length}
            </span>
          </div>

          {/* Content Row: Title, Subtitle, Location & Contact */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            
            <div className="space-y-1.5 max-w-xl">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-sm font-telugu">
                {isTelugu ? current.titleTe : current.titleEn}
              </h3>

              <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                {isTelugu ? current.subtitleTe : current.subtitleEn}
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-white/80">
                <div className="flex items-center gap-1 font-bold text-amber-200">
                  <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>{isTelugu ? current.locationTe : current.locationEn}</span>
                </div>
                <span>•</span>
                <span className="font-semibold text-white/90">
                  ☎ {current.phone} {current.altPhone ? `• ${current.altPhone}` : ''}
                </span>
              </div>
            </div>

            {/* Quick Action CTA Buttons */}
            <div className="flex items-center gap-2.5 shrink-0 pt-1 md:pt-0">
              <a
                href={`tel:${current.phone}`}
                className="flex-1 md:flex-none px-4 sm:px-5 py-2.5 sm:py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-extrabold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>{isTelugu ? 'కాల్ చేయండి' : 'Call Provider'}</span>
              </a>

              <a
                href={`https://wa.me/91${current.phone}?text=${encodeURIComponent(
                  isTelugu
                    ? `నమస్కారం, సేవాసేతు లో మీ '${current.titleTe}' ప్రకటన చూశాను. వివరాలు కావాలి.`
                    : `Hello, I saw your ad '${current.titleEn}' on SevaSetu. Please provide details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none px-4 sm:px-5 py-2.5 sm:py-3 bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-extrabold rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-current" />
                <span>{isTelugu ? 'వాట్సాప్' : 'WhatsApp'}</span>
              </a>
            </div>

          </div>

          {/* Navigation Arrows for Tablet & Desktop */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous advertisement"
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white items-center justify-center backdrop-blur-md transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next advertisement"
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white items-center justify-center backdrop-blur-md transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Carousel Indicator Dots */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center gap-1.5 pointer-events-none">
          {PROMO_ADS.map((ad, idx) => (
            <button
              key={ad.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all pointer-events-auto ${
                idx === currentIndex ? 'w-6 bg-white shadow-sm' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
};
