'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ArrowLeft, Trash2, AlertTriangle, ShieldAlert, Check } from 'lucide-react';

export default function DeleteAccountPage() {
  const router = useRouter();
  const { isTelugu } = useLanguage();
  const { logout } = useAuth();
  const { showToast } = useMarketplace();

  const [reason, setReason] = useState('found_other');
  const [confirmed, setConfirmed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (!confirmed) return;
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      showToast(
        'info',
        isTelugu ? 'ఖాతా తొలగించబడింది' : 'Account Deleted',
        isTelugu
          ? 'మీ ఖాతా మరియు డేటా విజయవంతంగా తొలగించబడ్డాయి.'
          : 'Your account and preferences have been permanently removed.'
      );
      logout();
      router.push('/');
    }, 1200);
  };

  const reasons = [
    { id: 'found_other', en: 'Found another local service', te: 'మరొక సేవను ఎంచుకున్నాను' },
    { id: 'moving', en: 'Moving out of Andhra Pradesh / Village', te: 'గ్రామం లేదా ఆంధ్రప్రదేశ్ నుండి వేరే చోటికి మారాను' },
    { id: 'temporary', en: 'Taking a temporary break', te: 'తాత్కాలికంగా ఖాతా ఆపాలనుకుంటున్నాను' },
    { id: 'privacy', en: 'Privacy concerns / Phone privacy', te: 'గోప్యతా కారణాల వల్ల' },
    { id: 'other', en: 'Other reason', te: 'ఇతర కారణం' },
  ];

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
        <h1 className="text-base sm:text-lg font-black text-rose-600 tracking-tight">
          {isTelugu ? 'ఖాతా తొలగింపు' : 'Delete Account'}
        </h1>
        <div className="w-9" />
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        {/* Warning Banner */}
        <div className="rounded-3xl bg-rose-50 p-5 border border-rose-200 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center mx-auto shadow-sm">
            <Trash2 className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <h2 className="text-base font-black text-rose-900 tracking-tight">
            {isTelugu ? 'మీరు ఖచ్చితంగా ఖాతాను తొలగించాలనుకుంటున్నారా?' : 'Are you sure you want to delete your account?'}
          </h2>
          <p className="text-xs text-rose-700 leading-relaxed max-w-xs mx-auto font-medium">
            {isTelugu
              ? 'ఈ చర్య శాశ్వతమైనది. మీ ప్రొఫైల్, ఇష్టపడిన ఆస్తులు మరియు గత ఆర్డర్ల రికార్డులు పూర్తిగా తొలగించబడతాయి.'
              : 'This action is irreversible. All your shortlisted properties, enquiry history, and verified status will be permanently erased.'}
          </p>
        </div>

        {/* Reason Selection */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            {isTelugu ? 'దయచేసి కారణాన్ని ఎంచుకోండి' : 'Please tell us why you are leaving'}
          </h3>

          <div className="space-y-2">
            {reasons.map((r) => (
              <label
                key={r.id}
                onClick={() => setReason(r.id)}
                className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                  reason === r.id
                    ? 'bg-rose-50/50 border-rose-300 text-slate-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    reason === r.id ? 'border-rose-500 bg-rose-500' : 'border-slate-400'
                  }`}
                >
                  {reason === r.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="text-xs font-semibold">{isTelugu ? r.te : r.en}</span>
              </label>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500 mt-0.5"
              />
              <span className="text-xs text-slate-600 font-medium leading-relaxed">
                {isTelugu
                  ? 'నేను నా డేటా తొలగింపును అర్థం చేసుకున్నాను మరియు అంగీకరిస్తున్నాను.'
                  : 'I understand that my account data cannot be recovered after deletion.'}
              </span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="button"
              disabled={!confirmed || isDeleting}
              onClick={handleDelete}
              className={`w-full h-12 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
                confirmed && !isDeleting
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md active:scale-95'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              <span>
                {isDeleting
                  ? isTelugu ? 'ఖాతా తొలగిస్తోంది...' : 'Deleting Account...'
                  : isTelugu ? 'శాశ్వతంగా ఖాతాను తొలగించండి' : 'Permanently Delete Account'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
