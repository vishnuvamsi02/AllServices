'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, FileCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SettingsTermsPage() {
  const router = useRouter();
  const { isTelugu } = useLanguage();

  return (
    <div className="bg-surface-bg pb-10">
      {/* Mobile App Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3.5 flex items-center justify-between shadow-xs">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          title="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
          {isTelugu ? 'నిబంధనలు & షరతులు' : 'Terms and Conditions'}
        </h1>
        <div className="w-9" />
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4 text-slate-700 text-sm leading-relaxed">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base">
                {isTelugu ? 'వినియోగదారు నిబంధనలు' : 'User Terms of Service'}
              </h2>
              <span className="text-[11px] text-slate-400">Effective November 2026</span>
            </div>
          </div>

          <p>
            {isTelugu
              ? 'గ్రామసేవ వేదికను ఉపయోగించడం ద్వారా మీరు క్రింది నిబంధనలను అంగీకరిస్తున్నారు:'
              : 'By using SevaSetu, you agree to the following rural marketplace operating guidelines:'}
          </p>

          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-xs text-slate-900 mb-1">
                {isTelugu ? '1. ధరల పారదర్శకత' : '1. Transparent Pricing'}
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                {isTelugu
                  ? 'సేవా నిపుణులు మరియు ఆస్తి యజమానులు ఖచ్చితమైన సమాచారం మరియు నిజమైన ధరలను మాత్రమే నమోదు చేయాలి.'
                  : 'Providers and sellers must state genuine rates without hidden brokerage fees.'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-xs text-slate-900 mb-1">
                {isTelugu ? '2. ప్రత్యక్ష సంప్రదింపులు' : '2. Direct Citizen Dealings'}
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                {isTelugu
                  ? 'కస్టమర్లు మరియు నిపుణులు నేరుగా సంప్రదించి సేవా ఒప్పందాలను పూర్తి చేసుకోవాలి. గ్రామసేవ మధ్యవర్తి కాదు.'
                  : 'Citizens and technicians deal directly with mutual agreement. SevaSetu does not take brokerage cuts.'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-xs text-slate-900 mb-1">
                {isTelugu ? '3. చట్టబద్ధమైన ఆస్తి పత్రాలు' : '3. Property Verification'}
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                {isTelugu
                  ? 'అనుమతి లేని లేదా వివాదాస్పద భూముల ప్రకటనలు వెంటనే తొలగించబడతాయి మరియు సంబంధిత ఖాతా రద్దు చేయబడుతుంది.'
                  : 'Disputed or fraudulent agricultural/residential property listings will be delisted immediately by the Village Admin.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
