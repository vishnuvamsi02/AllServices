'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsPage() {
  const { isTelugu } = useLanguage();

  return (
    <div className="bg-surface-bg min-h-screen py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-card space-y-6 text-sm text-slate-700 leading-relaxed">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {isTelugu ? 'నిబంధనలు & షరతులు (Terms & Conditions)' : 'Terms & Conditions'}
          </h1>
          <p className="text-xs text-slate-400">Last updated: November 2026</p>

          <p>
            {isTelugu
              ? 'గ్రామసేవ వేదికను ఉపయోగించడం ద్వారా మీరు ఈ క్రింది సాధారణ నిబంధనలను అంగీకరిస్తున్నారు.'
              : 'By accessing and using SevaSetu, you agree to these standard terms of service.'}
          </p>

          <h2 className="font-bold text-base text-slate-900 pt-2">
            {isTelugu ? '1. సేవల స్వభావం' : '1. Nature of Services'}
          </h2>
          <p>
            {isTelugu
              ? 'గ్రామసేవ అనేది గ్రామీణ ప్రజలు మరియు నిపుణుల మధ్య అనుసంధాన వేదిక మాత్రమే. సేవా రుసుములు మరియు పనుల ఒప్పందాలు నేరుగా వినియోగదారుడు మరియు నిపుణుడి మధ్య మాత్రమే జరుగుతాయి.'
              : 'SevaSetu functions purely as a discovery and communication bridge between villagers and service providers. Work agreements and remuneration are handled directly between the two parties.'}
          </p>

          <h2 className="font-bold text-base text-slate-900 pt-2">
            {isTelugu ? '2. గ్రామ నిర్వాహకుల పాత్ర' : '2. Village Administrator Role'}
          </h2>
          <p>
            {isTelugu
              ? 'గ్రామ నిర్వాహకులు స్థానిక సమాచారాన్ని ధృవీకరించడానికి మరియు గ్రామస్తులకు సహకరించడానికి బాధ్యత వహిస్తారు.'
              : 'Village Administrators monitor local listings and facilitate verified onboarding in their respective jurisdictions.'}
          </p>
        </div>
      </div>
    </div>
  );
}
