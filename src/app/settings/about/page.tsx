'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, Sparkles, ShieldCheck, Users, HeartHandshake, MapPin } from 'lucide-react';

export default function SettingsAboutPage() {
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
          {isTelugu ? 'సేవాసేతు గురించి' : 'About SevaSetu'}
        </h1>
        <div className="w-9" />
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        {/* App Logo & Version Card */}
        <div className="rounded-3xl bg-white p-6 border border-slate-200/90 shadow-card text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-primary to-indigo-800 text-white flex items-center justify-center font-black text-4xl mx-auto shadow-lg shadow-primary/20 mb-3">
            సే
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            {isTelugu ? 'సేవాసేతు మొబైల్ పోర్టల్' : 'SevaSetu App'}
          </h2>
          <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
            v3.0 • Andhra Pradesh Edition
          </span>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            {isTelugu
              ? 'ఆంధ్రప్రదేశ్ గ్రామీణ ప్రాంతాల్లోని నైపుణ్యం కలిగిన నిపుణులు, వ్యాపారాలు మరియు ఆస్తులను నేరుగా అనుసంధానించే మొబైల్ వేదిక.'
              : 'Direct connection platform for verified technicians, local shops, and rural properties.'}
          </p>
        </div>

        {/* Core Promises */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-3">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
            {isTelugu ? 'మా హామీలు' : 'Core Values'}
          </h3>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">
                {isTelugu ? 'గ్రామ నిర్వాహకుల ధృవీకరణ' : 'Village Admin Verified'}
              </h4>
              <p className="text-[11px] text-slate-600">
                {isTelugu ? 'స్థానిక సచివాలయం మరియు అడ్మిన్ ద్వారా గుర్తింపు' : 'Direct verification by assigned local village coordinators'}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">
                {isTelugu ? '₹0 కమీషన్ - నేరుగా కాల్' : 'Zero Middleman Fee'}
              </h4>
              <p className="text-[11px] text-slate-600">
                {isTelugu ? 'కాల్ లేదా వాట్సాప్ ద్వారా ఉచితంగా మాట్లాడండి' : 'Direct Call and WhatsApp connect with zero commission'}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900">
                {isTelugu ? 'ద్విభాషా సౌలభ్యం' : '100% Bilingual'}
              </h4>
              <p className="text-[11px] text-slate-600">
                {isTelugu ? 'గ్రామీణ ప్రజల కోసం సులభమైన తెలుగు & ఇంగ్లీష్' : 'Conversational Telugu and simple English for all rural citizens'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
