'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Megaphone, TrendingUp, Eye, Users, ArrowRight, ShieldCheck } from 'lucide-react';

interface MarketBrandPromoCardProps {
  onOpenPostAd: () => void;
}

export const MarketBrandPromoCard: React.FC<MarketBrandPromoCardProps> = ({ onOpenPostAd }) => {
  const { t, isTelugu } = useLanguage();

  return (
    <div className="space-y-6 my-8">
      
      {/* 1. Market Your Brand Banner Card matching Screen 08 */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/70 border border-amber-200/90 p-6 sm:p-8 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="space-y-4 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-900 text-xs font-black uppercase tracking-wider shadow-sm">
            <Megaphone className="w-3.5 h-3.5 fill-current" />
            <span>{isTelugu ? 'స్థానిక ప్రచారం' : 'Local Business Growth'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            {t('promoBanner.marketTitle')}
            <span className="block text-primary mt-1 font-extrabold text-xl sm:text-2xl">
              {t('promoBanner.toLocal')}
            </span>
          </h2>

          {/* 3 Circular Benefit Badges matching Screen 08 */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800">{t('promoBanner.moreLeads')}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-sm">
                <Eye className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800">{t('promoBanner.visibility')}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-sm">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800">{t('promoBanner.reachLocal')}</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onOpenPostAd}
            className="px-7 py-4 bg-primary hover:bg-primary-hover text-white text-sm sm:text-base font-black rounded-2xl shadow-xl flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95 group"
          >
            <Megaphone className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>{t('promoBanner.postAdBtn')}</span>
            <ArrowRight className="w-4 h-4 text-white/80" />
          </button>
        </div>

      </div>

      {/* 2. "Connecting INDIA" Trust Banner matching Screen 08 bottom */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-100 via-blue-50 to-indigo-50 border border-sky-200/80 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl shrink-0">
            👷
          </div>
          <div>
            <span className="text-xs font-black text-primary uppercase tracking-widest block mb-0.5">
              Connecting INDIA.
            </span>
            <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
              {t('hero.connectingIndia')}
            </p>
          </div>
        </div>

        <div className="px-4 py-2 bg-white rounded-xl border border-sky-200 text-xs font-bold text-primary flex items-center gap-1.5 shadow-sm shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{isTelugu ? 'ధరల పారదర్శకత' : 'Best Local Rates'}</span>
        </div>
      </div>

    </div>
  );
};
