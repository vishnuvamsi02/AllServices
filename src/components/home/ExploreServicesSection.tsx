'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import {
  Bike,
  Car,
  Sparkles,
  Truck,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface ServiceItemData {
  id: string;
  titleEn: string;
  titleTe: string;
  image: string;
  catSlug: string;
  priceNote: string;
  badge: string;
}

export const ExploreServicesSection: React.FC = () => {
  const { isTelugu } = useLanguage();
  const [activeTab, setActiveTab] = useState<'two_wheeler' | 'four_wheeler' | 'wash_detail' | 'breakdown'>('two_wheeler');

  const tabs = [
    {
      key: 'two_wheeler',
      labelEn: 'Two-Wheeler Care',
      labelTe: 'టూ-వీలర్ సర్వీసింగ్',
      icon: Bike,
      selectedClass: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md shadow-blue-600/20',
      hoverBorder: 'hover:border-blue-300',
    },
    {
      key: 'four_wheeler',
      labelEn: 'Four-Wheeler Care',
      labelTe: 'కార్ మెయింటెనెన్స్',
      icon: Car,
      selectedClass: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20',
      hoverBorder: 'hover:border-indigo-300',
    },
    {
      key: 'wash_detail',
      labelEn: 'Washing & Spa',
      labelTe: 'వాటర్ వాష్ & స్పా',
      icon: Sparkles,
      selectedClass: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20',
      hoverBorder: 'hover:border-emerald-300',
    },
    {
      key: 'breakdown',
      labelEn: '24/7 Breakdown Rescue',
      labelTe: '24/7 ఎమర్జెన్సీ టోయింగ్',
      icon: Truck,
      selectedClass: 'bg-gradient-to-r from-rose-600 to-orange-600 text-white border-rose-600 shadow-md shadow-rose-600/20',
      hoverBorder: 'hover:border-rose-300',
    },
  ];

  const servicesData: Record<string, ServiceItemData[]> = {
    two_wheeler: [
      {
        id: 'es1',
        titleEn: 'Comprehensive Bike Periodic Service',
        titleTe: 'కంప్లీట్ బైక్ పీరియాడిక్ సర్వీసింగ్',
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600',
        catSlug: 'bike-servicing',
        priceNote: 'Starting from ₹299 • Includes 18-point check',
        badge: 'Top Booked',
      },
      {
        id: 'es2',
        titleEn: 'Genuine Engine Oil Replacement',
        titleTe: 'జెన్యూన్ ఇంజిన్ ఆయిల్ చేంజ్ (Castrol/Motul)',
        image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600',
        catSlug: 'engine-oil-change',
        priceNote: 'Sealed pack starting from ₹350',
        badge: 'Loyalty Count +1',
      },
      {
        id: 'es3',
        titleEn: 'Disc Brake Pad Replacement & Tuning',
        titleTe: 'డిస్క్ బ్రేక్ ప్యాడ్లు & లీవర్ ట్యూనింగ్',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600',
        catSlug: 'brake-services',
        priceNote: 'Front & Rear setup from ₹249',
        badge: 'Safety Critical',
      },
    ],
    four_wheeler: [
      {
        id: 'es4',
        titleEn: 'Car Periodic Maintenance & Diagnostics',
        titleTe: 'కార్ పీరియాడిక్ సర్వీస్ & ఇంజిన్ చెకప్',
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=600',
        catSlug: 'car-servicing',
        priceNote: 'Packages from ₹1,499 (Hatchback/Sedan)',
        badge: 'Best Value',
      },
      {
        id: 'es5',
        titleEn: 'Car AC Antibacterial Foam Clean & Gas',
        titleTe: 'కార్ ఏసీ ఎవాపరేటర్ ఫోమ్ క్లీనింగ్ & గ్యాస్',
        image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600',
        catSlug: 'ac-cleaning',
        priceNote: 'Deep cabin disinfection from ₹599',
        badge: 'Cooling Guarantee',
      },
      {
        id: 'es6',
        titleEn: '3D Wheel Alignment & Balancing',
        titleTe: '3D వీల్ అలైన్‌మెంట్ & టైర్ బ్యాలెన్సింగ్',
        image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80&w=600',
        catSlug: 'tyre-services',
        priceNote: 'Laser sensor computer setup @ ₹399',
        badge: 'Fuel Saver',
      },
    ],
    wash_detail: [
      {
        id: 'es7',
        titleEn: 'High-Pressure Snow Foam Wash',
        titleTe: 'హై-ప్రెజర్ స్నో ఫోమ్ బాత్ & వాటర్ వాష్',
        image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=600',
        catSlug: 'water-wash',
        priceNote: 'Two-Wheeler ₹149 • Car ₹349',
        badge: 'Popular',
      },
      {
        id: 'es8',
        titleEn: 'Teflon Coating & Paint Glaze',
        titleTe: 'టెఫ్లాన్ కోటింగ్ & స్క్రాచ్ రిమూవల్ పాలిష్',
        image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=600',
        catSlug: 'denting-painting',
        priceNote: 'UV mirror protection from ₹699',
        badge: 'Showroom Gloss',
      },
      {
        id: 'es9',
        titleEn: 'Deep Interior Vacuum & Seat Shampoo',
        titleTe: 'డీప్ ఇంటీరియర్ వాక్యూమ్ & సీట్ షాంపూ',
        image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=600',
        catSlug: 'car-servicing',
        priceNote: 'Complete dust & stain removal ₹799',
        badge: 'Hygienic',
      },
    ],
    breakdown: [
      {
        id: 'es10',
        titleEn: '24/7 Highway Flatbed Towing Assistance',
        titleTe: '24/7 హైవే ఫ్లాట్‌బెడ్ రెస్క్యూ & టోయింగ్',
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=600',
        catSlug: 'emergency-assistance',
        priceNote: 'Rapid dispatch within 15-20 mins',
        badge: '24/7 Emergency',
      },
      {
        id: 'es11',
        titleEn: 'Battery Jumpstart & Replacement at Spot',
        titleTe: 'స్పాట్ బ్యాటరీ జంప్‌స్టార్ట్ & ఎక్స్‌ఛేంజ్',
        image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600',
        catSlug: 'battery-replacement',
        priceNote: 'Exide & Amaron units delivered to spot',
        badge: 'Fast Assist',
      },
      {
        id: 'es12',
        titleEn: 'Tubeless Puncture & Tyre Replacement',
        titleTe: 'ట్యూబ్‌లెస్ పంక్చర్ రిపేర్ & ఎయిర్ ఫిల్',
        image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80&w=600',
        catSlug: 'tyre-services',
        priceNote: 'Doorstep mobile puncture fix @ ₹149',
        badge: 'At Your Location',
      },
    ],
  };

  const activeServices = servicesData[activeTab] || servicesData.two_wheeler;

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card my-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
              Verified AutoCare
            </span>
            <span className="text-xs text-slate-400">Doorstep & Workshop Available</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {isTelugu ? 'జనాదరణ పొందిన వాహన సేవలు' : 'Popular Vehicle Maintenance Services'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {isTelugu ? 'పారదర్శక ధరలు • ధృవీకరించబడిన మెకానిక్‌లు • ప్రతి సేవపై లాయల్టీ క్రెడిట్' : 'Transparent pricing, verified local mechanics, and loyalty reward credits on every job'}
          </p>
        </div>

        <Link
          href="/services"
          className="text-xs sm:text-sm font-extrabold text-primary hover:underline flex items-center gap-1 shrink-0 self-start sm:self-auto"
        >
          <span>{isTelugu ? 'అన్ని సేవలు చూడండి' : 'Explore All Services'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 Interactive Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex flex-col items-center text-center group ${
                isSelected
                  ? `${tab.selectedClass} scale-[1.02]`
                  : `bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100 ${tab.hoverBorder}`
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 ${
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-extrabold leading-snug">
                {isTelugu ? tab.labelTe : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3 Visual Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {activeServices.map((item) => (
          <Link
            key={item.id}
            href={`/services?cat=${item.catSlug}`}
            className="group rounded-3xl overflow-hidden border border-slate-200 bg-white hover:border-primary/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/90 text-white backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  <span>{item.badge}</span>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="text-base font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors leading-snug">
                  {isTelugu ? item.titleTe : item.titleEn}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {item.priceNote}
                </p>
              </div>
            </div>

            <div className="px-4 pb-4 sm:px-5 sm:pb-5">
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                <span>{isTelugu ? 'వివరాలు & బుకింగ్' : 'View Details & Book'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
};
