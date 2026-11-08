'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, Shield, Lock, EyeOff, UserCheck, FileText } from 'lucide-react';

export default function SettingsPrivacyPolicyPage() {
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
          {isTelugu ? 'గోప్యతా విధానం' : 'Privacy Policy'}
        </h1>
        <div className="w-9" />
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4 text-slate-700 text-sm leading-relaxed">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base">
                {isTelugu ? 'గ్రామసేవ గోప్యతా విధానం' : 'SevaSetu Privacy Policy'}
              </h2>
              <span className="text-[11px] text-slate-400">Version 2.4 • Effective Nov 2026</span>
            </div>
          </div>

          <p>
            {isTelugu
              ? 'గ్రామసేవ వేదికను ఉపయోగించే ఆంధ్రప్రదేశ్ గ్రామ ప్రజల వ్యక్తిగత సమాచారం మరియు ఫోన్ నంబర్ల గోప్యతను కాపాడటానికి మేము కట్టుబడి ఉన్నాము.'
              : 'SevaSetu is committed to protecting the privacy and personal contact information of rural citizens and service providers across Andhra Pradesh.'}
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-slate-900">
                  {isTelugu ? 'సురక్షిత మొబైల్ నంబర్లు' : 'Direct Call Privacy'}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {isTelugu
                    ? 'మీ ఫోన్ నంబర్ కేవలం మీరు సంప్రదించాలనుకున్న నిపుణుడికి మాత్రమే తెలుస్తుంది. మూడవ పక్షాలకు విక్రయించబడదు.'
                    : 'Your phone number is shared only when you initiate a call or send a direct service enquiry.'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <UserCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-slate-900">
                  {isTelugu ? 'గ్రామ అడ్మిన్ పర్యవేక్షణ' : 'Village Admin Scoped Access'}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {isTelugu
                    ? 'గ్రామ అడ్మిన్లు కేవలం తమ గ్రామానికి సంబంధించిన ప్రొఫైల్స్ మాత్రమే పరిశీలించగలరు.'
                    : 'Village Administrators can only audit records within their designated Grama Panchayat jurisdiction.'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <EyeOff className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-slate-900">
                  {isTelugu ? 'జీరో స్పామ్ & యాడ్స్' : 'Zero Commercial Spam'}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {isTelugu
                    ? 'ఎలాంటి అవాంఛిత మార్కెటింగ్ సందేశాలు లేదా మోసపూరిత కాల్స్ పంపబడవు.'
                    : 'We do not sell user data to advertising aggregators or automated calling bots.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
