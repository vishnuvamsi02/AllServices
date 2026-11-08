'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import {
  ShieldCheck,
  Heart,
  Users,
  MapPin,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Building2,
  Wrench,
  Store,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react';

export default function AboutPage() {
  const { isTelugu } = useLanguage();

  return (
    <div className="bg-surface-bg min-h-screen py-8 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-accent fill-current" />
            <span>{isTelugu ? 'ఆంధ్రప్రదేశ్ గ్రామీణ వేదిక' : 'Andhra Pradesh Rural Platform'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {isTelugu ? 'గ్రామసేవ డిజిటల్ పోర్టల్' : 'About SevaSetu'}
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 mt-3 font-medium">
            {isTelugu 
              ? 'ఆంధ్రప్రదేశ్ గ్రామాల్లోని ప్రతిభావంతులైన నిపుణులు, చిన్న వ్యాపారాలు మరియు రియల్ ఎస్టేట్‌ను అనుసంధానించే విశ్వసనీయ వేదిక' 
              : 'Empowering rural citizens across Andhra Pradesh with direct, zero-commission access to verified local services and rural properties.'}
          </p>
        </div>

        {/* Impact Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-card text-center">
            <span className="text-2xl sm:text-3xl font-black text-primary block">100%</span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 block mt-1">
              {isTelugu ? 'ద్విభాషా మద్దతు' : 'Telugu & English'}
            </span>
            <span className="text-[11px] text-slate-500">{isTelugu ? 'గ్రామీణ అనుకూల భాష' : 'Village-friendly UI'}</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-card text-center">
            <span className="text-2xl sm:text-3xl font-black text-secondary block">₹0</span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 block mt-1">
              {isTelugu ? 'నో బ్రోకరేజ్ / కమిషన్' : 'Zero Brokerage'}
            </span>
            <span className="text-[11px] text-slate-500">{isTelugu ? 'నేరుగా కాల్ & వాట్సాప్' : 'Direct Call & WhatsApp'}</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-card text-center">
            <span className="text-2xl sm:text-3xl font-black text-amber-500 block">24+</span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 block mt-1">
              {isTelugu ? 'సేవా విభాగాలు' : 'Service Trades'}
            </span>
            <span className="text-[11px] text-slate-500">{isTelugu ? 'ఎలక్ట్రీషియన్ నుండి పూజల వరకు' : 'Electrician to Purohit'}</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-card text-center">
            <span className="text-2xl sm:text-3xl font-black text-indigo-600 block">AP-Wide</span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 block mt-1">
              {isTelugu ? 'గ్రామ నిర్వాహకులు' : 'Village Admin Scoped'}
            </span>
            <span className="text-[11px] text-slate-500">{isTelugu ? 'సచివాలయం గుర్తింపు' : 'Strict Village Isolation'}</span>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-card space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed mb-10">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {isTelugu ? 'మా లక్ష్యం & నేపథ్యం' : 'Our Mission & Story'}
              </h2>
              <span className="text-xs text-slate-500">
                {isTelugu ? 'గ్రామీణ ప్రాంతాలలో డిజిటల్ సాధికారత' : 'Bridging the rural digital divide'}
              </span>
            </div>
          </div>

          <p>
            {isTelugu 
              ? 'ఆంధ్రప్రదేశ్ గ్రామీణ ప్రాంతాల్లో ఎలక్ట్రీషియన్లు, ప్లంబర్లు, మోటార్ రిపేరర్లు, ట్రాక్టర్ అద్దెలు మరియు రోజువారీ అవసరమైన నిపుణులను కనుగొనడం ఇప్పటికీ నోటి మాటపైనే ఆధారపడి ఉంది. పట్టణ ప్రాంతాల్లో ఉన్నట్లుగా గ్రామాల్లో సులభమైన వేదికలు లేకపోవడంతో, సాధారణ ప్రజలు అలాగే నిపుణులు ఇద్దరూ ఇబ్బందులు ఎదుర్కొంటున్నారు.'
              : 'Finding verified technicians, agricultural equipment, and local shops in villages has historically been fragmented and reliant on word-of-mouth. SevaSetu bridges this digital gap specifically for rural citizens with clear Telugu & English options.'}
          </p>

          <p>
            {isTelugu 
              ? 'గ్రామసేవ ద్వారా ప్రతి గ్రామంలోని నైపుణ్యం కలిగిన నిపుణులు మరియు చిన్న వ్యాపారస్తులు ఎలాంటి మధ్యవర్తి రుసుము లేకుండా నేరుగా ప్రజలతో అనుసంధానం అవుతారు. ప్రతి గ్రామానికి కేటాయించిన గ్రామ నిర్వాహకులు (Village Admins) ప్రొఫైల్స్ మరియు ఆస్తులను స్వయంగా పరిశీలించి నమ్మకాన్ని పెంచుతారు.'
              : 'With SevaSetu, skilled rural workers register their trade for free and connect directly with local farmers and residents without middleman commissions. Local Village Administrators physically verify listings to establish absolute trust.'}
          </p>

          {/* 3 Core Pillars with Vibrant Colorful Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
            
            <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50/60 rounded-3xl border border-emerald-200/80 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-200 mb-3">
                <ShieldCheck className="w-7 h-7 stroke-[2.2px]" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 mb-1">
                {isTelugu ? 'గ్రామ ధృవీకరణ' : 'Village Verified'}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {isTelugu ? 'స్థానిక సచివాలయం మరియు గ్రామ అడ్మిన్ ద్వారా ప్రత్యక్ష పరిశీలన' : 'Strictly verified by assigned Village Administrators'}
              </p>
            </div>

            <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-3xl border border-blue-200/80 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-blue-200 mb-3">
                <Users className="w-7 h-7 stroke-[2.2px]" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 mb-1">
                {isTelugu ? 'నేరుగా సంప్రదించండి' : 'Direct Connect'}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {isTelugu ? 'ఫోన్ కాల్ లేదా వాట్సాప్ ద్వారా ఎలాంటి బ్రోకరేజ్ లేకుండా ఉచితం' : 'Call or WhatsApp directly with 0% brokerage or platform cuts'}
              </p>
            </div>

            <div className="p-5 bg-gradient-to-br from-rose-50 to-amber-50/60 rounded-3xl border border-rose-200/80 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-200 mb-3">
                <Heart className="w-7 h-7 stroke-[2.2px] fill-current" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 mb-1">
                {isTelugu ? 'గ్రామాల సాధికారత' : 'Rural Growth'}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {isTelugu ? 'స్థానిక యువత మరియు చేతివృత్తుల వారికి నిరంతర ఉపాధి' : 'Empowering local village youth, tradesmen, and shops'}
              </p>
            </div>

          </div>
        </div>

        {/* Quick Action Discovery Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/services"
            className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-primary/50 shadow-card hover:shadow-lift transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-primary transition-colors">
                {isTelugu ? 'సేవలను కనుగొనండి' : 'Find Local Services'}
              </h4>
              <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <span>{isTelugu ? 'కేటగిరీలు చూడండి' : 'Browse technicians'}</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>

          <Link
            href="/properties"
            className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-secondary/50 shadow-card hover:shadow-lift transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-secondary transition-colors">
                {isTelugu ? 'గ్రామ ఆస్తులు & భూములు' : 'Village Properties'}
              </h4>
              <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <span>{isTelugu ? 'ప్లాట్లు & అద్దె ఇళ్ళు' : 'Farmlands & Houses'}</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>

          <Link
            href="/businesses"
            className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-amber-500/50 shadow-card hover:shadow-lift transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-amber-600 transition-colors">
                {isTelugu ? 'స్థానిక వ్యాపారాలు' : 'Local Businesses'}
              </h4>
              <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <span>{isTelugu ? 'షాపుల డైరెక్టరీ' : 'Village shops & stores'}</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
