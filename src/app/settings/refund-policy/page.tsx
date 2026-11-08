'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, Receipt, CheckCircle2, Clock, HelpCircle, Phone } from 'lucide-react';

export default function RefundPolicyPage() {
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
          {isTelugu ? 'రీఫండ్ విధానం' : 'Refund Policy'}
        </h1>
        <div className="w-9" />
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4 text-slate-700 text-sm leading-relaxed">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base">
                {isTelugu ? 'రీఫండ్ & చెల్లింపు విధానం' : 'Refund & Cancellation Policy'}
              </h2>
              <span className="text-[11px] text-slate-400">Effective November 2026</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-emerald-900">
                {isTelugu ? 'గ్రామ ప్రజలకు 100% ఉచితం' : '100% Free for Rural Citizens'}
              </h4>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                {isTelugu
                  ? 'గ్రామసేవలో సాధారణ శోధన, ఫోన్ కాల్స్ మరియు సేవల బుకింగ్‌లకు ఎలాంటి రుసుములు లేవు. కాబట్టి వినియోగదారులకు ఎలాంటి ఛార్జీలు వర్తించవు.'
                  : 'Citizens browse, call, and contact village technicians completely free. There are zero platform booking fees.'}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-primary" />
                <h4 className="font-bold text-xs text-slate-900">
                  {isTelugu ? 'వ్యాపార ప్రకటనల రద్దు గడువు' : 'Merchant Ad Cancellation Window'}
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                {isTelugu
                  ? 'స్థానిక ప్రమోషనల్ ఫ్లెక్స్ బ్యానర్ ప్రకటనల రద్దు అభ్యర్థనలను అడ్మిన్ ఆమోదానికి ముందు 48 గంటల్లోపు సమర్పిస్తే 100% రీఫండ్ లభిస్తుంది.'
                  : 'Sponsored merchant banner bookings cancelled within 48 hours before admin deployment receive a 100% refund.'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <Receipt className="w-4 h-4 text-secondary" />
                <h4 className="font-bold text-xs text-slate-900">
                  {isTelugu ? 'రీఫండ్ ప్రాసెసింగ్ సమయం' : 'Processing SLA Timeline'}
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                {isTelugu
                  ? 'ఆమోదించబడిన రీఫండ్‌లు 3 నుండి 5 పని దినాలలోపు మీ అసలు బ్యాంక్ ఖాతా లేదా UPI నంబర్‌కు నేరుగా జమ చేయబడతాయి.'
                  : 'Approved refunds are credited within 3-5 business days directly back to the source UPI or bank account.'}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-center">
            <span className="text-xs text-slate-500 block mb-2">
              {isTelugu ? 'రీఫండ్ సహాయం కోసం సంప్రదించండి:' : 'Need refund assistance?'}
            </span>
            <a
              href="tel:18004257382"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-primary text-xs font-bold hover:bg-slate-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>1800-425-SEVA (Toll-Free)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
