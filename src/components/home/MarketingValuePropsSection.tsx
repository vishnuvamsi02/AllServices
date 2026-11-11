'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  IndianRupee,
  ShieldCheck,
  Zap,
  Smartphone,
  Gift,
  CheckCircle2,
  XCircle,
  Star,
  Users,
  Wrench,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Clock,
  ThumbsUp,
  Award,
} from 'lucide-react';
import Link from 'next/link';

export const MarketingValuePropsSection: React.FC = () => {
  const { isTelugu } = useLanguage();
  const [activePillar, setActivePillar] = useState<number>(0);
  const [comparisonTab, setComparisonTab] = useState<'table' | 'benefits'>('benefits');

  const pillars = [
    {
      id: 'affordable',
      titleEn: 'Affordable & Honest Pricing',
      titleTe: 'అత్యంత సరసమైన & పారదర్శక ధరలు',
      taglineEn: 'Save 30% to 40% compared to expensive city showroom service centers',
      taglineTe: 'ఖరీదైన కార్పొరేట్ షోరూమ్‌ల కంటే 30% నుండి 40% తక్కువ ఖర్చు',
      icon: IndianRupee,
      color: 'from-amber-500 to-yellow-600',
      badge: 'Maximum Savings',
      highlightBadge: 'Up to 40% Lower Cost',
      perks: [
        isTelugu ? 'ముందుగానే స్పష్టమైన ధరల అంచనా — దాగి ఉన్న ఖర్చులు లేవు' : 'Upfront job estimates with 100% price transparency — zero hidden charges',
        isTelugu ? 'కార్పొరేట్ షోరూమ్ ఫీజులు, అనవసర లేబర్ ఛార్జీలు లేవు' : 'No corporate dealership overheads or inflated spare part surcharges',
        isTelugu ? 'గ్రామీణ రైతులకు & వాహనదారులకు అనువైన బడ్జెట్ ప్యాకేజీలు' : 'Budget-friendly maintenance packages crafted for village & town vehicle owners',
        isTelugu ? 'పని పూర్తయిన తర్వాతే నేరుగా మెకానిక్‌కు చెల్లింపు' : 'Direct payment to your trusted local mechanic only upon job completion',
      ],
      stats: 'Average ₹2,400 saved per vehicle yearly',
    },
    {
      id: 'experienced',
      titleEn: 'Experienced Certified Professionals',
      titleTe: 'అనుభవజ్ఞులైన సర్టిఫైడ్ మెకానిక్‌లు',
      taglineEn: 'Skilled automotive technicians with minimum 5+ years of hands-on expertise',
      taglineTe: 'కనీసం 5+ సంవత్సరాల అనుభవం ఉన్న నైపుణ్యం కలిగిన నిపుణులు',
      icon: ShieldCheck,
      color: 'from-blue-600 to-indigo-600',
      badge: 'Verified & Vetted',
      highlightBadge: '100% Verified Mechanics',
      perks: [
        isTelugu ? 'ఆధార్ & వర్క్‌షాప్ లైసెన్స్ ధృవీకరించబడిన మెకానిక్‌లు' : 'Aadhaar, trade license & background verified mechanics',
        isTelugu ? '100% ఒరిజినల్ స్పేర్ పార్ట్స్ & నాణ్యమైన ఇంజిన్ ఆయిల్స్' : '100% genuine OEM/OES spare parts and certified lubricants',
        isTelugu ? 'మీ గ్రామంలోని నిజమైన కస్టమర్ రేటింగ్‌లు & సమీక్షలు' : 'Real verified ratings & reviews from local vehicle owners',
        isTelugu ? 'టూ-వీలర్, కార్ మరియు వ్యవసాయ ఇంజిన్లలో విశేష నైపుణ్యం' : 'Specialized troubleshooting for bikes, cars & agricultural vehicle engines',
      ],
      stats: '150+ Verified Garages across AP',
    },
    {
      id: 'quick',
      titleEn: 'Quick & Prompt Service',
      titleTe: 'త్వరిత & సౌకర్యవంతమైన సేవా స్పందన',
      taglineEn: 'Prompt doorstep assistance and fast-track booking at nearby partner garages',
      taglineTe: 'ఇంటి వద్దకే త్వరిత సేవ మరియు సమీప గ్యారేజీలలో ప్రాధాన్యత',
      icon: Zap,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Fast Dispatch',
      highlightBadge: 'Zero Waiting Queues',
      perks: [
        isTelugu ? 'గంటల కొద్దీ వేచి ఉండే అవసరం లేదు — నేరుగా ప్రాధాన్యత సర్వీసింగ్' : 'Skip the long workshop waiting lines with prioritized booking dispatch',
        isTelugu ? 'ఇంటి వద్దకే లేదా పొలాల వద్దకే వేగవంతమైన డోర్‌స్టెప్ సేవ' : 'Doorstep servicing directly at your home, farm, or workplace',
        isTelugu ? 'హైవే ఎమర్జెన్సీ బ్రేక్‌డౌన్ & పంక్చర్ సేవలకు త్వరిత స్పందన' : 'Rapid spot assistance for highway breakdowns, jumpstarts & flat tyres',
        isTelugu ? 'లైవ్ అపాయింట్‌మెంట్ కన్ఫర్మేషన్ క్షణాల్లో లభిస్తుంది' : 'Instant appointment confirmation without back-and-forth delays',
      ],
      stats: 'Rapid response across 15+ AP Mandal hubs',
    },
    {
      id: 'easy',
      titleEn: 'Easy & Simple Experience',
      titleTe: 'సులువైన & సులభతరమైన అనుభవం',
      taglineEn: 'Bilingual Telugu & English platform designed specifically for rural citizens',
      taglineTe: 'గ్రామీణ ప్రజల కోసం ప్రత్యేకంగా రూపొందించిన తెలుగు & ఇంగ్లీష్ వేదిక',
      icon: Smartphone,
      color: 'from-purple-600 to-pink-600',
      badge: 'Zero Tech Barriers',
      highlightBadge: 'Bilingual in Telugu & English',
      perks: [
        isTelugu ? 'సులువైన 3-దశల బుకింగ్ — సంక్లిష్టమైన ఫారాలు ఉండవు' : 'Effortless 3-step booking with zero complicated registration forms',
        isTelugu ? 'స్వచ్ఛమైన తెలుగు మరియు పెద్ద బటన్లతో కూడిన సులభ డిజైన్' : 'Simple village-friendly layout with large readable icons and buttons',
        isTelugu ? 'వాట్సాప్ లేదా నేరుగా కాల్ ద్వారా మెకానిక్‌తో మాట్లాడే సదుపాయం' : 'One-tap direct calling and WhatsApp connection with assigned technician',
        isTelugu ? 'మీ బైక్ లేదా కార్ నంబర్ ఒక్కసారి నమోదు చేస్తే చాలు' : 'One-click garage selector: save your vehicle plate once and book anytime',
      ],
      stats: 'Book in under 45 seconds',
    },
    {
      id: 'rewards',
      titleEn: 'Exciting Monthly Loyalty Rewards',
      titleTe: 'ఆకర్షణీయమైన నెలవారీ ఉచిత రివార్డులు',
      taglineEn: 'Complete 10 verified services in a month to unlock 1 Free Premium Reward',
      taglineTe: 'నెలకు 10 సేవలు పూర్తి చేసి 1 ఉచిత ప్రీమియం రివార్డ్‌ను పొందండి',
      icon: Gift,
      color: 'from-amber-400 to-orange-500',
      badge: '100% Free Benefit',
      highlightBadge: 'Earn Free Bike Wash or 1L Oil',
      perks: [
        isTelugu ? '10 సేవలు పూర్తయితే: ఉచిత బైక్ వాష్ (₹250 విలువ)' : 'Free Bike High-Pressure Wash & Polish (worth ₹250)',
        isTelugu ? 'లేదా 1-లీటర్ జెన్యూన్ 4T ఇంజిన్ ఆయిల్ ప్యాకెట్ (₹450 విలువ)' : 'Or 1-Litre Genuine Sealed 4T Engine Oil Pack (worth ₹450)',
        isTelugu ? 'లేదా ఉచిత వెహికల్ AC క్లీనింగ్ & శానిటైజేషన్ (₹600 విలువ)' : 'Or Free Vehicle AC Disinfection & Evaporator Clean (worth ₹600)',
        isTelugu ? 'ప్రతి నెలా రివార్డులను క్లెయిమ్ చేసుకునే అద్భుత అవకాశం' : 'Monthly renewal: keep maintaining your vehicles and keep earning rewards',
      ],
      stats: 'Over ₹1.8 Lakhs in free rewards issued',
    },
  ];

  const currentPillar = pillars[activePillar];
  const CurrentIcon = currentPillar.icon;

  const comparisonRows = [
    {
      feature: isTelugu ? 'ధరల పారదర్శకత' : 'Service Pricing',
      sevaseu: isTelugu ? 'సరసమైన ధరలు, 40% వరకు ఆదా' : '30-40% lower cost, upfront transparent rates',
      traditional: isTelugu ? 'ఖరీదైన షోరూమ్ రేట్లు, అదనపు ఛార్జీలు' : 'Inflated dealer margins & hidden overheads',
      win: true,
    },
    {
      feature: isTelugu ? 'డోర్‌స్టెప్ సేవ' : 'Doorstep Convenience',
      sevaseu: isTelugu ? 'ఇంటి వద్దకే మెకానిక్ సౌకర్యం' : 'Doorstep mechanic dispatch to your home or farm',
      traditional: isTelugu ? 'వాహనాన్ని దూరం తీసుకెళ్లాలి' : 'Must drive to distant city centers and wait',
      win: true,
    },
    {
      feature: isTelugu ? 'నెలవారీ ఉచిత రివార్డులు' : 'Monthly Rewards Program',
      sevaseu: isTelugu ? 'ప్రతి 10 సేవలపై 1 ఉచిత రివార్డ్ (ఆయిల్/వాష్)' : 'Free Bike Wash, 1L Oil, or AC Clean every 10 services',
      traditional: isTelugu ? 'ఎలాంటి లాయల్టీ ప్రయోజనాలు ఉండవు' : 'No complimentary rewards or fuel/oil perks',
      win: true,
    },
    {
      feature: isTelugu ? 'భాషా సౌలభ్యం' : 'Language Support',
      sevaseu: isTelugu ? 'స్వచ్ఛమైన తెలుగు & సులువైన మొబైల్ డిజైన్' : '100% Telugu & English mobile-first interface',
      traditional: isTelugu ? 'క్లిష్టమైన ఇంగ్లీష్ డాక్యుమెంట్లు' : 'Complex corporate English apps and paperwork',
      win: true,
    },
    {
      feature: isTelugu ? 'స్థానిక జవాబుదారీతనం' : 'Local Accountability',
      sevaseu: isTelugu ? 'గ్రామ నిర్వాహకులు & ధృవీకరించబడిన నిపుణులు' : 'Village Admin verification & local garage trust',
      traditional: isTelugu ? 'అపరిచిత సిబ్బంది, తక్కువ శ్రద్ధ' : 'Impersonal service with high turnaround disputes',
      win: true,
    },
  ];

  return (
    <section className="my-10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
      
      {/* Ambient Radial Lighting */}
      <div className="absolute top-0 right-1/4 -mt-20 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
          <Award className="w-4 h-4 fill-current text-amber-400" />
          <span>{isTelugu ? 'సేవాసేతు ఆటోకేర్ ప్రాధాన్యతలు' : 'Why Choose SevaSetu AutoCare'}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          {isTelugu ? 'ఆంధ్రప్రదేశ్ వాహనదారుల మొదటి ఎంపిక' : 'The Smartest Way to Care for Your Bike & Car in Andhra Pradesh'}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          {isTelugu
            ? 'సరసమైన ధరలు, అనుభవజ్ఞులైన నిపుణులు, వేగవంతమైన సేవ, సులభమైన అనుభవం మరియు అద్భుతమైన ఉచిత రివార్డులు — అన్నీ ఒకే వేదికపై.'
            : 'Combining budget-friendly rates, certified village mechanics, rapid doorstep attention, simple Telugu navigation, and monthly complimentary rewards.'}
        </p>

        {/* 4 Trust Metrics Counter Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-6">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center">
            <span className="text-lg sm:text-2xl font-black text-amber-400 block">5,000+</span>
            <span className="text-[11px] text-slate-400 font-medium">{isTelugu ? 'సంతృప్త కస్టమర్లు' : 'Happy Vehicle Owners'}</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center">
            <span className="text-lg sm:text-2xl font-black text-emerald-400 block">150+</span>
            <span className="text-[11px] text-slate-400 font-medium">{isTelugu ? 'ధృవీకరించిన గ్యారేజీలు' : 'Verified Garages'}</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center">
            <span className="text-lg sm:text-2xl font-black text-cyan-400 block">4.9 ★</span>
            <span className="text-[11px] text-slate-400 font-medium">{isTelugu ? 'సగటు రేటింగ్' : 'Average Rating'}</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center">
            <span className="text-lg sm:text-2xl font-black text-purple-400 block">35-40%</span>
            <span className="text-[11px] text-slate-400 font-medium">{isTelugu ? 'ఖర్చు ఆదా' : 'Average Savings'}</span>
          </div>
        </div>
      </div>

      {/* 5 Interactive Value Pillar Buttons */}
      <div className="relative z-10 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          const isSelected = activePillar === idx;

          return (
            <button
              key={pillar.id}
              type="button"
              onClick={() => setActivePillar(idx)}
              className={`px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 shrink-0 border ${
                isSelected
                  ? `bg-gradient-to-r ${pillar.color} text-white border-white/30 shadow-lg scale-105`
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{isTelugu ? pillar.titleTe.split(' ')[0] : pillar.titleEn.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Featured Display Card */}
      <div className="relative z-10 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-white/15 shadow-xl backdrop-blur-md mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Details & Tagline */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                {currentPillar.highlightBadge}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Pillar #{activePillar + 1} of 5
              </span>
            </div>

            <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              {isTelugu ? currentPillar.titleTe : currentPillar.titleEn}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {isTelugu ? currentPillar.taglineTe : currentPillar.taglineEn}
            </p>

            {/* Perk Checkmarks */}
            <div className="space-y-2.5 pt-2">
              {currentPillar.perks.map((perk, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-400/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug">{perk}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href="/services"
                className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
              >
                <span>{isTelugu ? 'సేవను బుక్ చేయండి' : 'Book a Service Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/rewards"
                className="px-4 py-3 bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/15 transition-colors flex items-center gap-1.5"
              >
                <Gift className="w-4 h-4 text-amber-400" />
                <span>{isTelugu ? 'రివార్డులను చూడండి' : 'Explore Free Rewards'}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Highlight Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-800 to-slate-950 p-6 rounded-3xl border border-white/15 text-center flex flex-col items-center justify-center space-y-4">
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${currentPillar.color} flex items-center justify-center text-white shadow-xl shadow-black/40`}>
              <CurrentIcon className="w-10 h-10 stroke-[2.2px]" />
            </div>

            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 block">
                {currentPillar.badge}
              </span>
              <h4 className="text-lg font-black text-white mt-1">
                {isTelugu ? currentPillar.titleTe : currentPillar.titleEn}
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                {currentPillar.stats}
              </p>
            </div>

            <div className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center justify-center gap-2">
              <ThumbsUp className="w-4 h-4 text-emerald-400" />
              <span>Recommended by 98% of Andhra Pradesh users</span>
            </div>
          </div>

        </div>
      </div>

      {/* Comparison Toggle & Matrix: SevaSetu vs. Distant City Showrooms */}
      <div className="relative z-10 bg-slate-900/60 rounded-3xl p-5 sm:p-7 border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>{isTelugu ? 'సేవాసేతు వర్సెస్ సంప్రదాయ నగర గ్యారేజీలు' : 'SevaSetu AutoCare vs. Traditional Distant Workshops'}</span>
            </h3>
            <p className="text-xs text-slate-400">
              Clear side-by-side comparison of local transparency and customer convenience.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 self-start sm:self-auto">
            100% Guaranteed Advantage
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] font-bold">
                <th className="py-2.5 px-3">Feature</th>
                <th className="py-2.5 px-3 text-emerald-400 font-black">SevaSetu AutoCare</th>
                <th className="py-2.5 px-3 text-slate-400">Distant Showrooms / Garages</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {comparisonRows.map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-bold text-white">{row.feature}</td>
                  <td className="py-3 px-3 text-emerald-300 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{row.sevaseu}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{row.traditional}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
};
