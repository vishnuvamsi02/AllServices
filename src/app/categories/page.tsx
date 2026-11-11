'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { MOCK_CATEGORIES } from '@/data/mockData';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  X,
  Bike,
  Car,
  Droplets,
  Sparkles,
  Snowflake,
  BatteryCharging,
  Disc,
  AlertCircle,
  Paintbrush,
  Wrench,
  ClipboardCheck,
  Truck,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Bike,
  Car,
  Droplets,
  Sparkles,
  Snowflake,
  BatteryCharging,
  Disc,
  AlertCircle,
  Paintbrush,
  Wrench,
  ClipboardCheck,
  Truck,
};

const categoryIconColors: Record<string, { iconColor: string; bg: string }> = {
  Bike: { iconColor: 'text-blue-600', bg: 'bg-blue-50' },
  Car: { iconColor: 'text-indigo-600', bg: 'bg-indigo-50' },
  Droplets: { iconColor: 'text-amber-600', bg: 'bg-amber-50' },
  Sparkles: { iconColor: 'text-emerald-600', bg: 'bg-emerald-50' },
  Snowflake: { iconColor: 'text-teal-600', bg: 'bg-teal-50' },
  BatteryCharging: { iconColor: 'text-yellow-600', bg: 'bg-yellow-50' },
  Disc: { iconColor: 'text-rose-600', bg: 'bg-rose-50' },
  AlertCircle: { iconColor: 'text-orange-600', bg: 'bg-orange-50' },
  Paintbrush: { iconColor: 'text-pink-600', bg: 'bg-pink-50' },
  Wrench: { iconColor: 'text-slate-700', bg: 'bg-slate-100' },
  ClipboardCheck: { iconColor: 'text-cyan-600', bg: 'bg-cyan-50' },
  Truck: { iconColor: 'text-red-600', bg: 'bg-red-50' },
};

export default function CategoriesPage() {
  const { isTelugu } = useLanguage();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return MOCK_CATEGORIES;
    const q = search.toLowerCase();
    return MOCK_CATEGORIES.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.teluguName.includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.popularServices.some((p) => p.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div className="bg-surface-bg min-h-screen pb-16">
      
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3.5 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="p-2 -ml-1 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {isTelugu ? 'అన్ని వాహన సేవా విభాగాలు' : 'All Vehicle Service Categories'}
              </h1>
              <span className="text-[11px] text-slate-500">
                12 Certified Automotive Categories
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5">
        
        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isTelugu ? 'ఆయిల్ చేంజ్, వాటర్ వాష్, టైర్లు, బ్రేకులు వెతకండి...' : 'Search oil change, water wash, tyres, brakes...'}
            className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200/90 rounded-2xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2-Column Responsive Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {filteredCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || Wrench;
            const style = categoryIconColors[cat.icon] || {
              iconColor: 'text-primary',
              bg: 'bg-blue-50',
            };

            return (
              <Link
                key={cat.id}
                href={`/services?cat=${cat.slug}`}
                className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-primary/40 shadow-xs hover:shadow-card transition-all duration-300 flex items-start gap-4 group hover:-translate-y-0.5"
              >
                <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${style.bg} ${style.iconColor} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2px]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-primary transition-colors truncate">
                      {isTelugu ? cat.teluguName : cat.name}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-2.5">
                    {isTelugu ? cat.teluguDescription : cat.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {cat.popularServices.slice(0, 2).map((pop, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-50 text-[10px] font-bold text-slate-600 border border-slate-200/60"
                      >
                        {pop}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
