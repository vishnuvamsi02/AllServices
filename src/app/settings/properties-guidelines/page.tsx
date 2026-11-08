'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, FileText, CheckCircle2, ShieldAlert, Award, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function PropertiesGuidelinesPage() {
  const router = useRouter();
  const { isTelugu } = useLanguage();

  const rules = [
    {
      num: '01',
      titleEn: 'Clear Title Deeds & Passbook',
      titleTe: 'స్పష్టమైన పట్టాదారు పాస్ బుక్',
      descEn: 'All agricultural lands must have clear 1B passbook, Webland adangal, and no title encumbrance.',
      descTe: 'వ్యవసాయ భూములకు సరైన 1బి పాస్ బుక్, వెబ్‌ల్యాండ్ రికార్డు మరియు వివాదాలు లేని టైటిల్ ఉండాలి.',
    },
    {
      num: '02',
      titleEn: 'Approved Layout Numbers (LP No.)',
      titleTe: 'అనుమతి పొందిన లేఅవుట్ నంబర్',
      descEn: 'Residential and commercial plots must mention genuine LP / GP approval numbers with proper road width.',
      descTe: 'రెసిడెన్షియల్ ప్లాట్లకు పంచాయతీ లేదా సంబంధిత అథారిటీ ఆమోదించిన ఎల్.పి నంబర్ స్పష్టంగా తెలపాలి.',
    },
    {
      num: '03',
      titleEn: 'Accurate Total Pricing (No Hidden Fees)',
      titleTe: 'ఖచ్చితమైన పూర్తి ధర (దాచిన ఖర్చులు లేవు)',
      descEn: 'List the total realistic transaction price or exact per-acre / per-sq.yard rate without speculative inflation.',
      descTe: 'మొత్తం ధర లేదా ఎకరం / గజం ధరను ఉన్నదున్నట్లుగా నమోదు చేయాలి. మధ్యవర్తి కమీషన్లు కలపకూడదు.',
    },
    {
      num: '04',
      titleEn: 'Village Admin Physical Verification',
      titleTe: 'గ్రామ అడ్మిన్ ప్రత్యక్ష పరిశీలన',
      descEn: 'Assigned Village Admins verify boundaries with local revenue records before granting the "Verified" badge.',
      descTe: 'గ్రామ అడ్మిన్ స్థానిక సరిహద్దులు మరియు రికార్డులను ప్రత్యక్షంగా పరిశీలించిన తర్వాతే "ధృవీకృతం" బ్యాడ్జ్ ఇస్తారు.',
    },
    {
      num: '05',
      titleEn: 'Immediate Delisting of False Claims',
      titleTe: 'తప్పుడు వివరాల తొలగింపు',
      descEn: 'Listings found with fraudulent documentation or disputed ownership will be banned permanently.',
      descTe: 'వివాదాస్పద భూములు లేదా తప్పుడు సమాచారం అందించిన ఖాతాలు వెంటనే బ్లాక్ చేయబడతాయి.',
    },
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
        <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
          {isTelugu ? 'ఆస్తి లిస్టింగ్ మార్గదర్శకాలు' : 'Properties Guidelines'}
        </h1>
        <div className="w-9" />
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        {/* Header Notice */}
        <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50/80 p-5 border border-amber-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <FileText className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">
              {isTelugu ? 'సురక్షిత గ్రామ ఆస్తుల ప్రమాణాలు' : 'Village Property Trust Standards'}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              {isTelugu ? 'ప్రజల నమ్మకం మరియు పారదర్శకత కోసం ఈ నియమాలను పాటించండి' : 'Mandatory verification rules for landowners and builders'}
            </p>
          </div>
        </div>

        {/* Guidelines List */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-4">
          {rules.map((r) => (
            <div key={r.num} className="flex items-start gap-3.5 pb-3.5 border-b border-slate-100 last:border-0 last:pb-0">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                {r.num}
              </span>
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                  {isTelugu ? r.titleTe : r.titleEn}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">
                  {isTelugu ? r.descTe : r.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <Link
            href="/properties"
            className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-extrabold text-sm rounded-2xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <span>{isTelugu ? 'ఆస్తులను పరిశీలించండి' : 'Browse Verified Properties'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
