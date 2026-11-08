'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MOCK_CATEGORIES } from '@/data/mockData';
import Link from 'next/link';
import {
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
  ArrowRight,
  MoreHorizontal,
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

const categoryStyles: Record<string, { bg: string; text: string; border: string }> = {
  Zap: { bg: 'bg-amber-50 group-hover:bg-amber-500', text: 'text-amber-500 group-hover:text-white', border: 'border-amber-200/80 hover:border-amber-400' },
  Droplets: { bg: 'bg-sky-50 group-hover:bg-sky-500', text: 'text-sky-500 group-hover:text-white', border: 'border-sky-200/80 hover:border-sky-400' },
  Sparkles: { bg: 'bg-emerald-50 group-hover:bg-emerald-500', text: 'text-emerald-500 group-hover:text-white', border: 'border-emerald-200/80 hover:border-emerald-400' },
  Snowflake: { bg: 'bg-teal-50 group-hover:bg-teal-500', text: 'text-teal-500 group-hover:text-white', border: 'border-teal-200/80 hover:border-teal-400' },
  Refrigerator: { bg: 'bg-indigo-50 group-hover:bg-indigo-500', text: 'text-indigo-500 group-hover:text-white', border: 'border-indigo-200/80 hover:border-indigo-400' },
  WashingMachine: { bg: 'bg-cyan-50 group-hover:bg-cyan-500', text: 'text-cyan-500 group-hover:text-white', border: 'border-cyan-200/80 hover:border-cyan-400' },
  Paintbrush: { bg: 'bg-rose-50 group-hover:bg-rose-500', text: 'text-rose-500 group-hover:text-white', border: 'border-rose-200/80 hover:border-rose-400' },
  Hammer: { bg: 'bg-orange-50 group-hover:bg-orange-500', text: 'text-orange-600 group-hover:text-white', border: 'border-orange-200/80 hover:border-orange-400' },
  Truck: { bg: 'bg-blue-50 group-hover:bg-blue-500', text: 'text-blue-500 group-hover:text-white', border: 'border-blue-200/80 hover:border-blue-400' },
  Filter: { bg: 'bg-sky-50 group-hover:bg-sky-600', text: 'text-sky-600 group-hover:text-white', border: 'border-sky-200/80 hover:border-sky-400' },
  Bug: { bg: 'bg-lime-50 group-hover:bg-lime-600', text: 'text-lime-600 group-hover:text-white', border: 'border-lime-200/80 hover:border-lime-400' },
  Car: { bg: 'bg-amber-50 group-hover:bg-amber-600', text: 'text-amber-600 group-hover:text-white', border: 'border-amber-200/80 hover:border-amber-400' },
  Key: { bg: 'bg-violet-50 group-hover:bg-violet-500', text: 'text-violet-500 group-hover:text-white', border: 'border-violet-200/80 hover:border-violet-400' },
  Sun: { bg: 'bg-yellow-50 group-hover:bg-yellow-500', text: 'text-yellow-600 group-hover:text-white', border: 'border-yellow-200/80 hover:border-yellow-400' },
  Camera: { bg: 'bg-fuchsia-50 group-hover:bg-fuchsia-500', text: 'text-fuchsia-500 group-hover:text-white', border: 'border-fuchsia-200/80 hover:border-fuchsia-400' },
  Utensils: { bg: 'bg-red-50 group-hover:bg-red-500', text: 'text-red-500 group-hover:text-white', border: 'border-red-200/80 hover:border-red-400' },
  HardHat: { bg: 'bg-yellow-50 group-hover:bg-yellow-600', text: 'text-yellow-700 group-hover:text-white', border: 'border-yellow-200/80 hover:border-yellow-400' },
  Scissors: { bg: 'bg-pink-50 group-hover:bg-pink-500', text: 'text-pink-500 group-hover:text-white', border: 'border-pink-200/80 hover:border-pink-400' },
  Tv: { bg: 'bg-purple-50 group-hover:bg-purple-500', text: 'text-purple-500 group-hover:text-white', border: 'border-purple-200/80 hover:border-purple-400' },
  Flame: { bg: 'bg-orange-50 group-hover:bg-orange-600', text: 'text-orange-600 group-hover:text-white', border: 'border-orange-200/80 hover:border-orange-400' },
  Layers: { bg: 'bg-slate-100 group-hover:bg-slate-700', text: 'text-slate-600 group-hover:text-white', border: 'border-slate-200/80 hover:border-slate-400' },
  Grid: { bg: 'bg-stone-100 group-hover:bg-stone-700', text: 'text-stone-600 group-hover:text-white', border: 'border-stone-200/80 hover:border-stone-400' },
};

export const TopCategoriesGrid: React.FC = () => {
  const { t, isTelugu } = useLanguage();

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card my-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {t('popularCategories.topTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {isTelugu ? 'మీ గ్రామంలో లభించే అగ్రశ్రేణి సేవలు' : 'Daily village utility and repair services'}
          </p>
        </div>

        <Link
          href="/categories"
          className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1"
        >
          <span>{t('popularCategories.viewAll')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4-column Grid matching Screen 12 & 14 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
        {MOCK_CATEGORIES.slice(0, 16).map((cat) => {
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
              className={`p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-slate-50/80 border ${style.border} transition-all duration-300 flex flex-col items-center justify-center text-center group shadow-xs hover:shadow-card hover:-translate-y-0.5 min-h-[115px] sm:min-h-[125px]`}
            >
              <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${style.bg} ${style.text} flex items-center justify-center mb-2.5 shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:rotate-1`}>
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2px] transition-colors" />
              </div>

              <span className="text-xs sm:text-sm font-extrabold text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
                {isTelugu ? cat.teluguName : cat.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* "View More Categories" bottom bar */}
      <div className="mt-6 pt-4 border-t border-slate-100 text-center">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-extrabold transition-colors"
        >
          <MoreHorizontal className="w-4 h-4 text-primary" />
          <span>{isTelugu ? 'మరిన్ని సేవా కేటగిరీలు చూడండి (View All 24+ Categories)' : 'View All 24+ Categories'}</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>
      </div>

    </section>
  );
};
