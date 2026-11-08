'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MOCK_PROPERTY_CATEGORIES, MOCK_FEATURED_PROPERTIES } from '@/data/mockData';
import Link from 'next/link';
import {
  Home,
  Bed,
  FileText,
  Mountain,
  Building2,
  Landmark,
  ArrowRight,
  PlusCircle,
  Key,
  ShieldCheck,
  Star,
  MapPin,
  Maximize2,
} from 'lucide-react';

const propIconMap: Record<string, any> = {
  Home,
  Bed,
  FileText,
  Mountain,
  Building2,
  Landmark,
};

export const PropertiesSectionView: React.FC<{ onOpenPostProperty: () => void }> = ({
  onOpenPostProperty,
}) => {
  const { t, isTelugu } = useLanguage();

  return (
    <div className="space-y-10 my-8">
      
      {/* 1. Featured Properties Horizontal Cards matching Screen 05 */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-current" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {t('propertySection.featuredTitle')}
            </h2>
          </div>

          <Link
            href="/properties"
            className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>{t('propertySection.viewAll')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_FEATURED_PROPERTIES.slice(0, 3).map((prop) => (
            <Link
              key={prop.id}
              href={`/properties/${prop.id}`}
              className="rounded-3xl border border-slate-200 bg-white hover:border-secondary/50 shadow-sm hover:shadow-lift transition-all duration-300 overflow-hidden flex flex-col justify-between group block"
            >
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-secondary text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                  {prop.propertyType.toUpperCase()}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{isTelugu ? prop.villageTelugu : prop.villageName}</span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                    {isTelugu ? prop.teluguTitle : prop.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {prop.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      {t('propertySection.totalAmount')}
                    </span>
                    <span className="text-base font-extrabold text-primary">
                      {prop.price}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {prop.size}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 2. "List your rented local property here ★" matching Screen 07 & 09 */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/60 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-card">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {t('propertySection.listBannerTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: View Available Properties */}
          <Link
            href="/properties"
            className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200/80 hover:border-emerald-500 shadow-sm hover:shadow-lift transition-all duration-300 flex items-center gap-5 group"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
              🤝
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {t('propertySection.viewAvailableTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {t('propertySection.viewAvailableSubtitle')}
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                <span>{isTelugu ? 'ఇప్పుడే పరిశీలించండి' : 'Browse Listings'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>

          {/* Card 2: Post your Properties here */}
          <button
            type="button"
            onClick={onOpenPostProperty}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200/80 hover:border-secondary shadow-sm hover:shadow-lift transition-all duration-300 flex items-center gap-5 group text-left"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
              🏡
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-secondary transition-colors">
                {t('propertySection.postPropertyTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {t('propertySection.postPropertySubtitle')}
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-secondary">
                <span>{isTelugu ? 'ఉచితంగా లిస్ట్ చేయండి' : 'Post for Free'}</span>
                <PlusCircle className="w-3.5 h-3.5" />
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* 3. "Browse by categories" (6 Cards) matching Screen 09 */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-6">
          {t('propertySection.browseCategories')}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {MOCK_PROPERTY_CATEGORIES.map((cat) => {
            const Icon = propIconMap[cat.icon] || Home;
            const propIconColorMap: Record<string, string> = {
              Home: 'text-emerald-600',
              Bed: 'text-sky-600',
              FileText: 'text-amber-600',
              Mountain: 'text-teal-600',
              Building2: 'text-purple-600',
              Landmark: 'text-rose-600',
            };
            const iconColor = propIconColorMap[cat.icon] || 'text-primary';

            return (
              <Link
                key={cat.id}
                href={`/properties?type=${cat.slug}`}
                className={`p-4 rounded-3xl border transition-all duration-300 flex flex-col items-center text-center group hover:shadow-card hover:-translate-y-1 ${cat.bgTint}`}
              >
                <div className="w-13 h-13 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-2 transition-transform">
                  <Icon className={`w-7 h-7 stroke-[2.2px] ${iconColor}`} />
                </div>
                <h4 className="font-extrabold text-xs sm:text-sm line-clamp-1">
                  {isTelugu ? cat.titleTe : cat.titleEn}
                </h4>
                <p className="text-[11px] opacity-75 mt-0.5 line-clamp-1 font-medium">
                  {isTelugu ? cat.subTe : cat.subEn}
                </p>
                <span className="mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-slate-800 shadow-xs">
                  {cat.count} {isTelugu ? 'ఆస్తులు' : 'Listings'}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

    </div>
  );
};
