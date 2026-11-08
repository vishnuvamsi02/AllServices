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
  Zap,
  Droplets,
  Sparkles,
  Snowflake,
  Refrigerator,
  WashingMachine,
  Paintbrush,
  Hammer,
  Truck,
  Filter,
  Bug,
  Car,
  Key,
  Wrench,
  Sun,
  Camera,
  Utensils,
  HardHat,
  Video,
  Scissors,
  Tv,
  Flame,
  Layers,
  Grid,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Zap,
  Droplets,
  Sparkles,
  Snowflake,
  Refrigerator,
  WashingMachine,
  Paintbrush,
  Hammer,
  Truck,
  Filter,
  Bug,
  Car,
  Key,
  Wrench,
  Sun,
  Camera,
  Utensils,
  HardHat,
  Video,
  Scissors,
  Tv,
  Flame,
  Layers,
  Grid,
};

const categoryIconColors: Record<string, { iconColor: string; bg: string }> = {
  Zap: { iconColor: 'text-amber-500', bg: 'bg-amber-50' },
  Droplets: { iconColor: 'text-sky-500', bg: 'bg-sky-50' },
  Sparkles: { iconColor: 'text-emerald-500', bg: 'bg-emerald-50' },
  Snowflake: { iconColor: 'text-teal-500', bg: 'bg-teal-50' },
  Refrigerator: { iconColor: 'text-indigo-500', bg: 'bg-indigo-50' },
  WashingMachine: { iconColor: 'text-cyan-500', bg: 'bg-cyan-50' },
  Paintbrush: { iconColor: 'text-rose-500', bg: 'bg-rose-50' },
  Hammer: { iconColor: 'text-orange-600', bg: 'bg-orange-50' },
  Truck: { iconColor: 'text-blue-500', bg: 'bg-blue-50' },
  Filter: { iconColor: 'text-sky-600', bg: 'bg-sky-50' },
  Bug: { iconColor: 'text-lime-600', bg: 'bg-lime-50' },
  Car: { iconColor: 'text-amber-600', bg: 'bg-amber-50' },
  Key: { iconColor: 'text-violet-500', bg: 'bg-violet-50' },
  Sun: { iconColor: 'text-yellow-600', bg: 'bg-yellow-50' },
  Camera: { iconColor: 'text-fuchsia-500', bg: 'bg-fuchsia-50' },
  Utensils: { iconColor: 'text-red-500', bg: 'bg-red-50' },
  HardHat: { iconColor: 'text-yellow-700', bg: 'bg-yellow-50' },
  Scissors: { iconColor: 'text-pink-500', bg: 'bg-pink-50' },
  Tv: { iconColor: 'text-purple-500', bg: 'bg-purple-50' },
  Flame: { iconColor: 'text-orange-600', bg: 'bg-orange-50' },
  Layers: { iconColor: 'text-slate-600', bg: 'bg-slate-100' },
  Grid: { iconColor: 'text-stone-600', bg: 'bg-stone-100' },
};

export default function CategoriesPage() {
  const { t, isTelugu } = useLanguage();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return MOCK_CATEGORIES;
    const q = searchTerm.toLowerCase();
    return MOCK_CATEGORIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.teluguName.includes(q) || c.description.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  return (
    <div className="bg-surface-bg pb-10 pt-4 sm:pt-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Top Header with Back button and Search input matching Scazo Screen 04 */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-primary transition-colors shrink-0 shadow-sm"
            title="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isTelugu ? 'సేవలను వెతకండి (Search for services)...' : 'Search for services...'}
              className="w-full h-13 pl-4 pr-10 text-sm sm:text-base font-semibold bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isTelugu ? 'అన్ని సేవా కేటగిరీలు' : 'All Service Categories'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isTelugu ? `${filteredCategories.length} సేవా విభాగాలు అందుబాటులో ఉన్నాయి` : `${filteredCategories.length} categories available across Andhra Pradesh villages`}
          </p>
        </div>

        {/* 3-column / 4-column Pastel Cards Grid matching Screen 04 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {filteredCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || Wrench;
            const iconStyle = categoryIconColors[cat.icon] || { iconColor: 'text-primary', bg: 'bg-primary/10' };

            return (
              <Link
                key={cat.id}
                href={`/services?cat=${cat.slug}`}
                className={`p-4 sm:p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between group hover:scale-[1.03] hover:shadow-card min-h-[150px] ${cat.bgTint || 'bg-slate-50 border-slate-200 text-slate-800'}`}
              >
                {/* Colorful Rounded Icon Badge on Top Left matching Screen 04 */}
                <div className={`w-12 h-12 rounded-2xl bg-white shadow-xs border border-white/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 stroke-[2.2px] ${iconStyle.iconColor}`} />
                </div>

                <div>
                  <h3 className="font-extrabold text-sm sm:text-base tracking-tight leading-snug">
                    {isTelugu ? cat.teluguName : cat.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
