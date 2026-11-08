'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { Wrench, Store, Building2, Sparkles, ArrowRight } from 'lucide-react';

export const RegisterCTASection: React.FC = () => {
  const { t, isTelugu } = useLanguage();

  return (
    <section className="py-10 sm:py-14 my-6 sm:my-8 rounded-3xl bg-gradient-to-br from-primary to-[#0f355c] text-white relative overflow-hidden shadow-card border border-white/10">
      
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary/10 blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
          <Sparkles className="w-4 h-4 text-accent fill-current" />
          <span>{isTelugu ? 'ఉచిత గ్రామ నమోదు' : 'Free Village Registration'}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
          {t('sections.ctaTitle')}
        </h2>

        <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
          {t('sections.ctaSubtitle')}
        </p>

        {/* 3 Registration Action Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* 1. Register as Provider */}
          <Link
            href="/auth/register?role=provider"
            className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center text-center transition-all duration-300 hover:scale-105 group"
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-white mb-4 shadow-lg">
              <Wrench className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t('sections.registerAsProvider')}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mb-6 leading-relaxed">
              {isTelugu 
                ? 'ఎలక్ట్రీషియన్లు, ప్లంబర్లు, మెకానిక్‌లు, మేస్త్రీలు గ్రామ ప్రజలకు నేరుగా సేవలు అందించండి.' 
                : 'Technicians, electricians, mechanics, and skilled village workers.'}
            </p>
            <div className="w-full py-3 bg-white text-primary font-bold text-sm rounded-xl shadow group-hover:bg-primary-light transition-colors flex items-center justify-center gap-2">
              <span>{isTelugu ? 'ఇప్పుడే నమోదు చేయండి' : 'Register Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* 2. Register Business */}
          <Link
            href="/auth/register?role=business"
            className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center text-center transition-all duration-300 hover:scale-105 group"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-slate-900 mb-4 shadow-lg">
              <Store className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t('sections.registerBusiness')}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mb-6 leading-relaxed">
              {isTelugu 
                ? 'గ్రామ కిరాణా, ఎరువుల దుకాణాలు, మందుల షాపులు, వర్క్‌షాపులు సులభంగా నమోదు చేసుకోండి.' 
                : 'Local village shops, agro seed stores, fertilizer dealers, pharmacies, hardware.'}
            </p>
            <div className="w-full py-3 bg-white text-primary font-bold text-sm rounded-xl shadow group-hover:bg-primary-light transition-colors flex items-center justify-center gap-2">
              <span>{isTelugu ? 'ఇప్పుడే నమోదు చేయండి' : 'Register Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* 3. List Property */}
          <Link
            href="/auth/register?role=property_owner"
            className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center text-center transition-all duration-300 hover:scale-105 group"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-4 shadow-lg">
              <Building2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t('sections.listProperty')}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mb-6 leading-relaxed">
              {isTelugu 
                ? 'వ్యవసాయ భూములు, రెసిడెన్షియల్ ప్లాట్లు, అద్దెకు లేదా అమ్మకానికి ఉన్న గ్రామ ఇళ్ళు లిస్ట్ చేయండి.' 
                : 'Agricultural farm lands, village houses, residential plots for rent or sale.'}
            </p>
            <div className="w-full py-3 bg-white text-primary font-bold text-sm rounded-xl shadow group-hover:bg-primary-light transition-colors flex items-center justify-center gap-2">
              <span>{isTelugu ? 'ఇప్పుడే నమోదు చేయండి' : 'Register Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
};
