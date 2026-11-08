'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Heart, Phone, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, isTelugu } = useLanguage();

  return (
    <footer className="mt-4 mb-4 sm:mb-6 px-4">
      <div className="max-w-2xl mx-auto rounded-3xl bg-slate-900 text-slate-300 p-6 sm:p-7 text-center space-y-4 shadow-xl border border-slate-800">
        
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-indigo-700 text-white flex items-center justify-center font-black text-lg shadow-sm">
            సే
          </div>
          <div className="text-left">
            <span className="font-black text-base text-white tracking-tight block leading-tight">
              {isTelugu ? 'సేవాసేతు' : 'SevaSetu'}
            </span>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
              {isTelugu ? 'ఆంధ్రప్రదేశ్ గ్రామీణ సేవా వేదిక' : 'Rural AP Marketplace'}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          {isTelugu
            ? 'ఆంధ్రప్రదేశ్ గ్రామాల్లోని నైపుణ్యం కలిగిన నిపుణులు, వ్యాపారాలు మరియు ఆస్తులను నేరుగా అనుసంధానించే 100% ఉచిత వేదిక.'
            : 'Connecting rural citizens directly with verified village technicians, merchants, and landowners. 0% Commission.'}
        </p>

        {/* Helpline Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700/80 text-xs font-bold text-emerald-400">
          <Phone className="w-3.5 h-3.5 fill-current" />
          <span>{isTelugu ? 'సహాయవాణి:' : 'Village Helpline:'} 1800-425-SEVA</span>
        </div>

        {/* Quick App Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-400 pt-2 border-t border-slate-800">
          <Link href="/about" className="hover:text-white transition-colors">
            {isTelugu ? 'మా గురించి' : 'About'}
          </Link>
          <span>•</span>
          <Link href="/how-it-works" className="hover:text-white transition-colors">
            {isTelugu ? 'ఎలా పనిచేస్తుంది?' : 'How It Works'}
          </Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-white transition-colors">
            {isTelugu ? 'గోప్యత' : 'Privacy'}
          </Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-white transition-colors">
            {isTelugu ? 'నిబంధనలు' : 'Terms'}
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-white transition-colors">
            {isTelugu ? 'సంప్రదించండి' : 'Contact'}
          </Link>
        </div>

        <div className="text-[11px] text-slate-500 pt-1">
          © {new Date().getFullYear()} SevaSetu v2.4 • Made for Andhra Pradesh Villages
        </div>

      </div>
    </footer>
  );
};
