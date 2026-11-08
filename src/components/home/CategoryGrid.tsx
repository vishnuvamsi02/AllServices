'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MOCK_CATEGORIES } from '@/data/mockData';
import { CategoryCard } from '../cards/CategoryCard';
import Link from 'next/link';
import { ArrowRight, Grid } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { t, isTelugu } = useLanguage();

  return (
    <section className="py-14 sm:py-20 bg-surface-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1.5">
              <Grid className="w-4 h-4" />
              <span>{isTelugu ? 'సేవా విభాగాలు' : 'Service Categories'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('sections.categoriesTitle')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              {t('sections.categoriesSubtitle')}
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover transition-colors shrink-0"
          >
            <span>{t('common.viewAll')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {MOCK_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

      </div>
    </section>
  );
};
