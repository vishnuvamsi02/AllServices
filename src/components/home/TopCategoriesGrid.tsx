'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MOCK_CATEGORIES } from '@/data/mockData';
import Link from 'next/link';
import {
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
  ArrowRight,
  ShieldCheck,
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

const categoryStyles: Record<string, { bg: string; text: string; border: string }> = {
  Bike: { bg: 'bg-blue-50 group-hover:bg-blue-600', text: 'text-blue-600 group-hover:text-white', border: 'border-blue-200/80 hover:border-blue-400' },
  Car: { bg: 'bg-indigo-50 group-hover:bg-indigo-600', text: 'text-indigo-600 group-hover:text-white', border: 'border-indigo-200/80 hover:border-indigo-400' },
  Droplets: { bg: 'bg-amber-50 group-hover:bg-amber-500', text: 'text-amber-600 group-hover:text-white', border: 'border-amber-200/80 hover:border-amber-400' },
  Sparkles: { bg: 'bg-emerald-50 group-hover:bg-emerald-600', text: 'text-emerald-600 group-hover:text-white', border: 'border-emerald-200/80 hover:border-emerald-400' },
  Snowflake: { bg: 'bg-teal-50 group-hover:bg-teal-600', text: 'text-teal-600 group-hover:text-white', border: 'border-teal-200/80 hover:border-teal-400' },
  BatteryCharging: { bg: 'bg-yellow-50 group-hover:bg-yellow-500', text: 'text-yellow-600 group-hover:text-slate-950', border: 'border-yellow-200/80 hover:border-yellow-400' },
  Disc: { bg: 'bg-rose-50 group-hover:bg-rose-600', text: 'text-rose-600 group-hover:text-white', border: 'border-rose-200/80 hover:border-rose-400' },
  AlertCircle: { bg: 'bg-orange-50 group-hover:bg-orange-600', text: 'text-orange-600 group-hover:text-white', border: 'border-orange-200/80 hover:border-orange-400' },
  Paintbrush: { bg: 'bg-pink-50 group-hover:bg-pink-600', text: 'text-pink-600 group-hover:text-white', border: 'border-pink-200/80 hover:border-pink-400' },
  Wrench: { bg: 'bg-slate-100 group-hover:bg-slate-800', text: 'text-slate-700 group-hover:text-white', border: 'border-slate-200/80 hover:border-slate-400' },
  ClipboardCheck: { bg: 'bg-cyan-50 group-hover:bg-cyan-600', text: 'text-cyan-600 group-hover:text-white', border: 'border-cyan-200/80 hover:border-cyan-400' },
  Truck: { bg: 'bg-red-50 group-hover:bg-red-600', text: 'text-red-600 group-hover:text-white', border: 'border-red-200/80 hover:border-red-400' },
};

export const TopCategoriesGrid: React.FC = () => {
  const { isTelugu } = useLanguage();

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card my-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary">
              Automotive Services
            </span>
            <span className="text-xs text-slate-400">12 Certified Categories</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {isTelugu ? 'వాహన సేవా విభాగాలు' : 'Vehicle Service Categories'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {isTelugu ? 'నైపుణ్యం కలిగిన మెకానిక్‌లు & సర్టిఫైడ్ గ్యారేజ్ సేవలు' : 'Certified mechanics, quick repairs, and doorstep maintenance'}
          </p>
        </div>

        <Link
          href="/categories"
          className="text-xs sm:text-sm font-extrabold text-primary hover:underline flex items-center gap-1"
        >
          <span>{isTelugu ? 'అన్ని కేటగిరీలు' : 'View All (12)'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4-column Grid with natural icons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {MOCK_CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon] || Wrench;
          const style = categoryStyles[cat.icon] || {
            bg: 'bg-blue-50 group-hover:bg-primary',
            text: 'text-primary group-hover:text-white',
            border: 'border-slate-200/80 hover:border-primary/40',
          };

          return (
            <Link
              key={cat.id}
              href={`/services?cat=${cat.slug}`}
              className={`p-4 rounded-2xl bg-white hover:bg-slate-50/80 border ${style.border} transition-all duration-300 flex flex-col items-center justify-center text-center group shadow-xs hover:shadow-card hover:-translate-y-1 min-h-[130px]`}
            >
              <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${style.bg} ${style.text} flex items-center justify-center mb-2.5 shadow-xs transition-all duration-300 group-hover:scale-110`}>
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2px] transition-colors" />
              </div>

              <span className="text-xs sm:text-sm font-extrabold text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
                {isTelugu ? cat.teluguName : cat.name}
              </span>

              <span className="text-[11px] text-slate-400 mt-0.5 group-hover:text-slate-600 transition-colors line-clamp-1">
                {cat.popularServices[0] || 'Fast Service'}
              </span>
            </Link>
          );
        })}
      </div>

    </section>
  );
};
