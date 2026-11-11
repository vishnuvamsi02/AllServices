'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  MessageCircle,
  Youtube,
  Instagram,
  Facebook,
  Send,
  Sparkles,
  Gift,
  Tag,
  Bell,
  CheckCircle2,
  Share2,
  Copy,
  ExternalLink,
  Users,
  ShieldCheck,
  Award,
} from 'lucide-react';

export const SocialMediaCommunitySection: React.FC = () => {
  const { isTelugu } = useLanguage();
  const { showToast } = useMarketplace();
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);

  const channels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp Community',
      teluguName: 'వాట్సాప్ అధికారిక కమ్యూనిటీ',
      handle: '@SevaSetuAutoCare',
      members: '12,500+ Members',
      icon: MessageCircle,
      bgGradient: 'from-emerald-600 via-teal-600 to-emerald-700',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      tag: 'Fastest Updates',
      link: 'https://whatsapp.com/channel/sevaseuto-autocare',
      perk: isTelugu ? 'క్షణాల్లో హైవే సహాయం, ఫ్లాష్ ఆఫర్లు & అపాయింట్‌మెంట్ అప్‌డేట్స్' : 'Instant emergency assistance, flash offers & priority workshop updates',
    },
    {
      id: 'youtube',
      name: 'YouTube Channel',
      teluguName: 'యూట్యూబ్ ఛానల్',
      handle: '@SevaSetuAutoCareAP',
      members: '28,000+ Subscribers',
      icon: Youtube,
      bgGradient: 'from-red-600 via-rose-600 to-red-700',
      badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
      tag: 'Video Guides',
      link: 'https://youtube.com/@SevaSetuAutoCareAP',
      perk: isTelugu ? 'నిపుణుల బైక్ & కార్ మెయింటెనెన్స్ టిప్స్, ఇంజిన్ ఆయిల్ నాణ్యత పరీక్షలు' : 'DIY vehicle maintenance tutorials, engine oil tests & garage spotlights',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      teluguName: 'ఇన్‌స్టాగ్రామ్',
      handle: '@sevaseuto_autocare',
      members: '18,400+ Followers',
      icon: Instagram,
      bgGradient: 'from-fuchsia-600 via-pink-600 to-rose-500',
      badgeBg: 'bg-pink-100 text-pink-900 border-pink-300',
      tag: 'Giveaways & Reels',
      link: 'https://instagram.com/sevaseuto_autocare',
      perk: isTelugu ? 'ఉచిత రివార్డుల విజేతల జాబితా, బైక్/కార్ మేకోవర్ రీల్స్ & వారపు పోటీలు' : 'Monthly reward winner announcements, vehicle makeover reels & quizzes',
    },
    {
      id: 'facebook',
      name: 'Facebook Group',
      teluguName: 'ఫేస్‌బుక్ గ్రూప్',
      handle: 'SevaSetu AutoCare AP Club',
      members: '15,200+ Members',
      icon: Facebook,
      bgGradient: 'from-blue-600 via-indigo-600 to-blue-700',
      badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
      tag: 'Vehicle Owners Club',
      link: 'https://facebook.com/groups/sevaseuto.autocare.ap',
      perk: isTelugu ? 'ఆంధ్రప్రదేశ్ వాహనదారుల చర్చలు, మెకానిక్ సిఫార్సులు & అనుభవాలు' : 'AP vehicle owners forum, local mechanic recommendations & questions',
    },
    {
      id: 'telegram',
      name: 'Telegram Channel',
      teluguName: 'టెలిగ్రామ్ ఛానల్',
      handle: '@SevaSetuDeals',
      members: '9,800+ Members',
      icon: Send,
      bgGradient: 'from-cyan-600 via-sky-600 to-blue-600',
      badgeBg: 'bg-cyan-100 text-cyan-900 border-cyan-300',
      tag: 'Exclusive Coupons',
      link: 'https://t.me/sevaseuto_autocare_deals',
      perk: isTelugu ? 'ప్రత్యేక డిస్కౌంట్ ప్రోమో కోడ్‌లు & కొత్త సేవల ప్రకటనలు' : 'Daily discount promo coupons, festival offers & emergency hotline numbers',
    },
  ];

  const benefits = [
    {
      icon: Bell,
      titleEn: 'Latest Service Updates',
      titleTe: 'తాజా సేవా అప్‌డేట్స్',
      descEn: 'Be the first to know when new workshops, mobile tyre puncture vans, or doorstep mechanics launch in your mandal.',
      descTe: 'మీ మండలంలో కొత్త వర్క్‌షాప్‌లు, మొబైల్ పంక్చర్ వ్యాన్లు లేదా డోర్‌స్టెప్ మెకానిక్‌లు ప్రారంభమైనప్పుడు ముందుగా తెలుసుకోండి.',
    },
    {
      icon: Tag,
      titleEn: 'Exclusive Subscriber Discounts',
      titleTe: 'ప్రత్యేక తగ్గింపు ఆఫర్లు',
      descEn: 'Access secret promo codes, festival discount vouchers, and seasonal vehicle servicing deals up to 40% off.',
      descTe: 'సోషల్ మీడియా అనుచరులకు మాత్రమే వర్తించే ప్రత్యేక కూపన్లు, పండుగ ఆఫర్లు మరియు 40% వరకు తగ్గింపులు.',
    },
    {
      icon: Gift,
      titleEn: 'Exciting Monthly Giveaways',
      titleTe: 'నెలవారీ ఉచిత బహుమతులు',
      descEn: 'Participate in monthly contests to win free helmets, genuine engine oil bottles, car wash kits, and accessories.',
      descTe: 'ఉచిత హెల్మెట్లు, ఇంజిన్ ఆయిల్ క్యాన్లు, కార్ వాష్ కిట్లు మరియు విలువైన ఉపకరణాలను గెలుచుకునే పోటీలు.',
    },
    {
      icon: Sparkles,
      titleEn: 'Vehicle Care Tips & Reels',
      titleTe: 'వాహన సంరక్షణ సలహాలు',
      descEn: 'Watch quick 60-second video tips on increasing mileage, avoiding duplicate oil, and maintaining battery health.',
      descTe: 'మైలేజ్ పెంచడం, డూప్లికేట్ ఆయిల్ గుర్తించడం మరియు బ్యాటరీ జీవితకాలాన్ని పెంచే సులభమైన వీడియో సలహాలు.',
    },
  ];

  const handleCopyLink = (channel: any) => {
    navigator.clipboard.writeText(channel.link);
    setCopiedChannel(channel.id);
    showToast('info', 'Link Copied', `${channel.name} link copied to clipboard.`);
    setTimeout(() => setCopiedChannel(null), 3000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      'Join SevaSetu AutoCare official community on WhatsApp for vehicle maintenance tips, doorstep bookings & exclusive free rewards across Andhra Pradesh: https://whatsapp.com/channel/sevaseuto-autocare'
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section className="my-10 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-card relative overflow-hidden">
      
      {/* Decorative Aura */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black uppercase tracking-wider mb-3">
          <Users className="w-4 h-4 text-emerald-600" />
          <span>{isTelugu ? 'సోషల్ మీడియా కమ్యూనిటీ' : 'Connect With Us on Social Media'}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {isTelugu ? 'మా అధికారిక సోషల్ మీడియా ఖాతాలను ఫాలో అవ్వండి' : 'Join 75,000+ Vehicle Owners in Our Social Community'}
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          {isTelugu
            ? 'తాజా సేవా ప్రకటనలు, ప్రత్యేక డిస్కౌంట్లు, ఉచిత బహుమతులు మరియు వాహన సంరక్షణ సలహాలను ఎప్పటికప్పుడు పొందడానికి మాతో చేరండి.'
            : 'Stay connected for instant service announcements, secret flash promo codes, monthly giveaway contests, and daily automotive care tips.'}
        </p>
      </div>

      {/* 5 Benefits Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          return (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-slate-50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-black text-slate-900 mb-1">
                  {isTelugu ? b.titleTe : b.titleEn}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {isTelugu ? b.descTe : b.descEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5 Social Channels Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {channels.map((ch) => {
          const Icon = ch.icon;
          const isCopied = copiedChannel === ch.id;

          return (
            <div
              key={ch.id}
              className="group rounded-3xl p-5 border border-slate-200 bg-white hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Channel Icon & Followers Count */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${ch.bgGradient} text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-110`}>
                    <Icon className="w-6 h-6 stroke-[2.2px]" />
                  </div>

                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${ch.badgeBg}`}>
                    {ch.tag}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 group-hover:text-primary transition-colors">
                  {isTelugu ? ch.teluguName : ch.name}
                </h3>

                <span className="text-[11px] font-bold text-slate-400 block mt-0.5">
                  {ch.members}
                </span>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {ch.perk}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                <a
                  href={ch.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 py-2 rounded-xl text-xs font-black text-center transition-all shadow-xs flex items-center justify-center gap-1.5 bg-gradient-to-r ${ch.bgGradient} text-white hover:opacity-95`}
                >
                  <span>{isTelugu ? 'చేరండి' : 'Follow'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => handleCopyLink(ch)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Copy Channel Link"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Viral Referral Banner */}
      <div className="relative z-10 p-5 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center shrink-0">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-black text-white">
              {isTelugu ? 'స్నేహితులు & కుటుంబ సభ్యులతో వాట్సాప్‌లో షేర్ చేయండి' : 'Share SevaSetu AutoCare with Friends & Village Groups'}
            </h4>
            <p className="text-xs text-emerald-100 mt-0.5">
              {isTelugu ? 'గ్రామంలోని ప్రతి ఒక్కరికీ సరసమైన వాహన సేవలు మరియు ఉచిత రివార్డుల సమాచారం చేరవేయండి.' : 'Help vehicle owners in your village discover transparent mechanic pricing and 100% free loyalty rewards.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-transform hover:scale-105 flex items-center gap-2 shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-slate-950" />
          <span>{isTelugu ? 'వాట్సాప్‌లో షేర్ చేయండి' : 'Share on WhatsApp'}</span>
        </button>
      </div>

    </section>
  );
};
