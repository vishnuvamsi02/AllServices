'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MOCK_LOCAL_ADS } from '@/data/mockData';
import { Phone, MessageCircle, Star, Sparkles, MapPin } from 'lucide-react';

export const SponsoredBannerCard: React.FC = () => {
  const { isTelugu } = useLanguage();
  const ad = MOCK_LOCAL_ADS[0];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#990000] via-[#CC0000] to-[#002244] text-white p-5 sm:p-7 shadow-xl border-2 border-amber-400/80 my-8 group">
      
      {/* Decorative Flex Golden Border */}
      <div className="absolute inset-1 rounded-[22px] border border-amber-300/40 pointer-events-none" />

      {/* Top Star Badge matching Screen 05 / 11 */}
      <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-amber-400 text-slate-900 shadow-md flex items-center justify-center">
        <Star className="w-4 h-4 fill-current text-slate-900" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Ad Content */}
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/20 text-white text-[11px] font-bold">
            <MapPin className="w-3 h-3 text-amber-300" />
            <span>{isTelugu ? ad.locationTe : ad.locationEn}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight leading-tight drop-shadow-sm font-telugu">
            {isTelugu ? ad.titleTe : ad.titleEn}
          </h2>

          <p className="text-xs sm:text-sm text-white/95 font-medium leading-relaxed">
            {isTelugu ? ad.subtitleTe : ad.subtitleEn}
          </p>

          <div className="pt-1 flex items-center gap-3 text-xs sm:text-sm font-bold text-amber-200">
            <span>☎ {ad.phone}</span>
            {ad.altPhone && <span>• ☎ {ad.altPhone}</span>}
          </div>
        </div>

        {/* Right CTA Action Buttons */}
        <div className="flex sm:flex-col gap-2.5 shrink-0">
          <a
            href={`tel:${ad.phone}`}
            className="flex-1 sm:flex-none px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-extrabold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>{isTelugu ? 'కాల్ చేయండి' : 'Call Provider'}</span>
          </a>

          <a
            href={`https://wa.me/91${ad.phone}?text=${encodeURIComponent(
              isTelugu ? 'నమస్కారం, మీ ప్రకటన గ్రామసేవ లో చూశాను.' : 'Hello, I saw your ad on SevaSetu.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-extrabold rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 fill-current" />
            <span>{isTelugu ? 'వాట్సాప్ మెసేజ్' : 'WhatsApp'}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
