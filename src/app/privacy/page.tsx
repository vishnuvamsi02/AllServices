'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPage() {
  const { isTelugu } = useLanguage();

  return (
    <div className="bg-surface-bg min-h-screen py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-card space-y-6 text-sm text-slate-700 leading-relaxed">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {isTelugu ? 'గోప్యతా విధానం (Privacy Policy)' : 'Privacy Policy'}
          </h1>
          <p className="text-xs text-slate-400">Last updated: November 2026</p>

          <p>
            {isTelugu
              ? 'గ్రామసేవ మీ వ్యక్తిగత సమాచారాన్ని భద్రంగా ఉంచడానికి కట్టుబడి ఉంది. మేము మీ మొబైల్ నంబర్ మరియు వివరాలను కేవలం మీరు కోరిన సేవా నిపుణులతో మాత్రమే పంచుకుంటాము.'
              : 'SevaSetu is committed to protecting your privacy and personal data. We only use your mobile number to connect you with the specific service provider or business you choose to contact.'}
          </p>

          <h2 className="font-bold text-base text-slate-900 pt-2">
            {isTelugu ? '1. మేము సేకరించే సమాచారం' : '1. Information We Collect'}
          </h2>
          <p>
            {isTelugu
              ? 'మీ పేరు, మొబైల్ నంబర్, గ్రామం పేరు మరియు మీరు కోరిన సేవల వివరాలు మాత్రమే మేము సేకరిస్తాము.'
              : 'We only collect your name, phone number, village selection, and inquiry details to facilitate direct communication with local providers.'}
          </p>

          <h2 className="font-bold text-base text-slate-900 pt-2">
            {isTelugu ? '2. సమాచార భద్రత' : '2. Data Protection'}
          </h2>
          <p>
            {isTelugu
              ? 'మేము మీ సమాచారాన్ని ఎలాంటి మూడవ పక్షాలకు అమ్మడం లేదా అద్దెకు ఇవ్వడం జరగదు.'
              : 'We never sell or rent your personal information to third parties or marketing brokers.'}
          </p>
        </div>
      </div>
    </div>
  );
}
