'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Heart, Phone, HelpCircle, Sparkles, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, isTelugu } = useLanguage();

  return (
    <footer
      className="w-full mt-8 sm:mt-12 px-4 pb-28 sm:pb-12"
      style={{ paddingBottom: 'calc(6.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="max-w-3xl mx-auto rounded-3xl bg-slate-900 text-slate-300 p-6 sm:p-8 text-center space-y-5 shadow-2xl border border-slate-800/90 relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-primary/20 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary via-indigo-600 to-indigo-800 text-white flex items-center justify-center font-black text-xl shadow-md border border-white/20">
            సే
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-black text-lg text-white tracking-tight">
                {isTelugu ? 'సేవాసేతు' : 'SevaSetu'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                v2.5
              </span>
            </div>
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
              {isTelugu ? 'ఆంధ్రప్రదేశ్ గ్రామీణ సేవా & వ్యాపార వేదిక' : 'Rural AP Marketplace & Services Platform'}
            </span>
          </div>
        </div>

        <p className="relative z-10 text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          {isTelugu
            ? 'ఆంధ్రప్రదేశ్ గ్రామాల్లోని నైపుణ్యం కలిగిన నిపుణులు, చిన్న వ్యాపారాలు మరియు వ్యవసాయ సేవలను నేరుగా అనుసంధానించే 100% ఉచిత వేదిక. దళారులు లేరు • కమీషన్ లేదు.'
            : 'Connecting rural citizens directly with verified village technicians, farm equipment, merchants, and local lands. Zero Middlemen • 0% Commission.'}
        </p>

        {/* Helpline Pill & Verified Trust Badge & Support Pill */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <a
            href="tel:18004257382"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-xs font-bold text-emerald-300 shadow-sm transition-colors"
          >
            <Phone className="w-3.5 h-3.5 fill-current text-emerald-400" />
            <span>{isTelugu ? 'ఉచిత టోల్‌ఫ్రీ సహాయవాణి:' : 'Toll-Free Helpline:'} 1800-425-SEVA</span>
          </a>

          <Link
            href="/support"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-xs font-bold text-rose-300 shadow-sm transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>{isTelugu ? 'ఫిర్యాదులు & సహాయ కేంద్రం' : 'Customer Grievances & Help'}</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>{isTelugu ? '100% ధృవీకరించబడిన ప్రొఫైల్స్' : '100% Verified Profiles'}</span>
          </div>
        </div>

        {/* Official Social Channels Pills */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-bold">
          <a
            href="https://chat.whatsapp.com/sample-sevasetu-ap"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
          >
            💬 WhatsApp Community
          </a>
          <a
            href="https://youtube.com/@sevasetu_ap"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-colors"
          >
            ▶️ YouTube Channel
          </a>
          <a
            href="https://instagram.com/sevasetu_ap"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 hover:bg-pink-500/20 transition-colors"
          >
            📸 Instagram
          </a>
          <a
            href="https://facebook.com/groups/sevasetu"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
          >
            👥 Facebook Group
          </a>
        </div>

        {/* Quick App Links */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-400 pt-3 border-t border-slate-800">
          <Link href="/about" className="hover:text-white transition-colors">
            {isTelugu ? 'మా గురించి' : 'About Us'}
          </Link>
          <span className="text-slate-600">•</span>
          <Link href="/how-it-works" className="hover:text-white transition-colors">
            {isTelugu ? 'ఎలా పనిచేస్తుంది?' : 'How It Works'}
          </Link>
          <span className="text-slate-600">•</span>
          <Link href="/rewards" className="hover:text-amber-400 text-amber-300 transition-colors font-bold">
            {isTelugu ? 'ఉచిత రివార్డులు (10 సర్వీసులు)' : 'Free Rewards (10 Services)'}
          </Link>
          <span className="text-slate-600">•</span>
          <Link href="/support" className="hover:text-white transition-colors">
            {isTelugu ? 'ఫిర్యాదులు & సహాయం' : 'Complaints & Support'}
          </Link>
          <span className="text-slate-600">•</span>
          <Link href="/services" className="hover:text-white transition-colors">
            {isTelugu ? 'సేవలు' : 'Services'}
          </Link>
          <span className="text-slate-600">•</span>
          <Link href="/businesses" className="hover:text-white transition-colors">
            {isTelugu ? 'దుకాణాలు' : 'Businesses'}
          </Link>
          <span className="text-slate-600">•</span>
          <Link href="/properties" className="hover:text-white transition-colors">
            {isTelugu ? 'ఆస్తులు' : 'Properties'}
          </Link>
          <span className="text-slate-600">•</span>
          <Link href="/privacy" className="hover:text-white transition-colors">
            {isTelugu ? 'గోప్యత' : 'Privacy'}
          </Link>
          <span className="text-slate-600">•</span>
          <Link href="/terms" className="hover:text-white transition-colors">
            {isTelugu ? 'నిబంధనలు' : 'Terms'}
          </Link>
          <span className="text-slate-600">•</span>
          <Link href="/contact" className="hover:text-white transition-colors">
            {isTelugu ? 'సంప్రదించండి' : 'Contact'}
          </Link>
        </div>

        <div className="relative z-10 text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
          © {new Date().getFullYear()} SevaSetu • Made with ❤️ for Andhra Pradesh Villages • చించినాడ, కాజా, పాలకొల్లు & భీమవరం
        </div>

      </div>
    </footer>
  );
};
