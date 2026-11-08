'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { PropertyCard } from '../cards/PropertyCard';
import Link from 'next/link';
import { ArrowRight, Building2 } from 'lucide-react';

export const FeaturedProperties: React.FC = () => {
  const { t, isTelugu } = useLanguage();
  const { selectedVillageId } = useLocation();
  const { properties } = useMarketplace();

  const filteredProperties = selectedVillageId === 'all'
    ? properties
    : properties.filter((p) => p.villageId === selectedVillageId);

  const displayProperties = filteredProperties.length > 0 ? filteredProperties : properties;

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1.5">
              <Building2 className="w-4 h-4" />
              <span>{isTelugu ? 'భూములు & ఆస్తులు' : 'Real Estate & Land'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('sections.propertiesTitle')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              {t('sections.propertiesSubtitle')}
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover transition-colors shrink-0"
          >
            <span>{t('common.viewAll')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProperties.slice(0, 3).map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>

      </div>
    </section>
  );
};
