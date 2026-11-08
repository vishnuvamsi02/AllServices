'use client';

import React from 'react';
import { ServiceCategory } from '@/data/types';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import {
  Zap,
  Droplets,
  Tractor,
  Hammer,
  Stethoscope,
  Wrench,
  Paintbrush,
  Scissors,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Zap,
  Droplets,
  Tractor,
  Hammer,
  Stethoscope,
  Wrench,
  Paintbrush,
  Scissors,
};

export const CategoryCard: React.FC<{ category: ServiceCategory }> = ({ category }) => {
  const { isTelugu, t } = useLanguage();
  const Icon = iconMap[category.icon] || Wrench;

  const name = isTelugu ? category.teluguName : category.name;
  const desc = isTelugu ? category.teluguDescription : category.description;

  return (
    <Link
      href={`/services?cat=${category.slug}`}
      className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 hover:border-primary/50 shadow-card hover:shadow-lift transition-all duration-300 flex flex-col justify-between group cursor-pointer"
    >
      <div>
        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
          <Icon className="w-7 h-7 stroke-[2px]" />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-4 tracking-tight group-hover:text-primary transition-colors">
          {name}
        </h3>

        <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
          {category.providerCount} {isTelugu ? 'నిపుణులు' : 'Providers'}
        </span>
        <div className="text-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          <span>{isTelugu ? 'చూడండి' : 'Explore'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
};
