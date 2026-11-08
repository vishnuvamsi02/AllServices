'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ProviderCard } from '../cards/ProviderCard';
import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';

export const FeaturedProviders: React.FC = () => {
  const { t, isTelugu } = useLanguage();
  const { selectedVillageId } = useLocation();
  const { providers } = useMarketplace();

  // Filter by selected village if not 'all'
  const filteredProviders = selectedVillageId === 'all'
    ? providers
    : providers.filter((p) => p.villageId === selectedVillageId);

  // If none in village, fallback to all to show content gracefully
  const displayProviders = filteredProviders.length > 0 ? filteredProviders : providers;

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-wider mb-1.5">
              <Wrench className="w-4 h-4" />
              <span>{isTelugu ? 'ధృవీకరించబడిన నిపుణులు' : 'Verified Professionals'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('sections.featuredProvidersTitle')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              {t('sections.featuredProvidersSubtitle')}
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover transition-colors shrink-0"
          >
            <span>{t('common.viewAll')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Provider Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProviders.slice(0, 3).map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

      </div>
    </section>
  );
};
