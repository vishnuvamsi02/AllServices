'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Search, UserCheck, PhoneCall, CheckCircle } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { t, isTelugu } = useLanguage();

  const steps = [
    {
      num: '1',
      title: t('sections.step1Title'),
      desc: t('sections.step1Desc'),
      icon: Search,
      bg: 'bg-primary/10 text-primary',
    },
    {
      num: '2',
      title: t('sections.step2Title'),
      desc: t('sections.step2Desc'),
      icon: UserCheck,
      bg: 'bg-secondary/10 text-secondary',
    },
    {
      num: '3',
      title: t('sections.step3Title'),
      desc: t('sections.step3Desc'),
      icon: PhoneCall,
      bg: 'bg-amber-500/10 text-amber-600',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-surface-bg to-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
          <CheckCircle className="w-4 h-4" />
          <span>{isTelugu ? 'సరళమైన ప్రక్రియ' : 'Simple 3-Step Process'}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('sections.howItWorksTitle')}
        </h2>
        
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          {t('sections.howItWorksSubtitle')}
        </p>

        {/* 3 Steps Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-20 left-1/6 right-1/6 h-0.5 bg-dashed bg-slate-200 z-0" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative z-10 bg-white rounded-3xl p-8 border border-slate-200/90 shadow-card hover:shadow-lift transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className={`w-20 h-20 rounded-3xl ${step.bg} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className="w-10 h-10" />
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center mb-3">
                  {step.num}
                </div>

                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
