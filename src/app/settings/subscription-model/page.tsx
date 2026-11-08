'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, CreditCard, Check, ShieldCheck, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';

export default function SubscriptionModelPage() {
  const router = useRouter();
  const { isTelugu } = useLanguage();

  const plans = [
    {
      id: 'citizen',
      nameEn: 'Citizen Plan',
      nameTe: 'గ్రామ పౌరుల ప్లాన్',
      priceEn: '₹0 / Forever Free',
      priceTe: '₹0 / ఎల్లప్పుడూ ఉచితం',
      tagEn: 'FOR EVERY RESIDENT',
      tagTe: 'గ్రామ ప్రజలందరికీ',
      color: 'border-emerald-200 bg-emerald-50/50',
      badgeColor: 'bg-emerald-500 text-white',
      featuresEn: [
        'Search all 24+ village categories',
        'Direct Call & WhatsApp to local technicians',
        'Real-time enquiry tracking & order log',
        'Browse verified agricultural lands & houses',
        'Zero commission on any transaction',
      ],
      featuresTe: [
        'అన్ని 24+ సేవా విభాగాల్లో ఉచిత శోధన',
        'నిపుణులకు నేరుగా కాల్ & వాట్సాప్ కనెక్ట్',
        'రియల్-టైమ్ ఆర్డర్ మరియు విచారణల ట్రాకింగ్',
        'పరిశీలించిన భూములు & ఇళ్ళ వివరాలు',
        'ఎలాంటి కమీషన్ లేదా మధ్యవర్తి రుసుము లేదు',
      ],
      btnEn: 'Current Plan (Active)',
      btnTe: 'ప్రస్తుత ప్లాన్ (యాక్టివ్)',
      disabled: true,
    },
    {
      id: 'worker',
      nameEn: 'Verified Provider Plan',
      nameTe: 'నైపుణ్య నిపుణుల ప్లాన్',
      priceEn: '₹0 / 6 Months Pilot',
      priceTe: '₹0 / మొదటి 6 నెలలు ఉచితం',
      tagEn: 'FOR LOCAL TECHNICIANS',
      tagTe: 'ఎలక్ట్రీషియన్, ప్లంబర్, మేస్త్రీలకు',
      color: 'border-primary/40 bg-primary/5',
      badgeColor: 'bg-primary text-white',
      featuresEn: [
        'Grama Sachiwalayam Verified Trust Badge',
        'Dedicated public profile with services & prices',
        'Receive direct local citizen calls & enquiries',
        'Village Admin physical verification support',
        'Free listing across your assigned village',
      ],
      featuresTe: [
        'గ్రామ సచివాలయం ధృవీకరణ బ్యాడ్జ్',
        'సేవలు మరియు ధరలతో వ్యక్తిగత ప్రొఫైల్',
        'స్థానిక ప్రజల నుండి ప్రత్యక్ష కాల్స్ మరియు ఆర్డర్లు',
        'గ్రామ అడ్మిన్ ప్రత్యక్ష సహకారం',
        'గ్రామ పరిధిలో ఉచిత లిస్టింగ్',
      ],
      btnEn: 'Register as Provider',
      btnTe: 'నిపుణుడిగా చేరండి',
      href: '/auth/register?role=provider',
    },
    {
      id: 'merchant',
      nameEn: 'Local Merchant Banner',
      nameTe: 'వ్యాపార ప్రమోషన్ ప్లాన్',
      priceEn: 'Starting at ₹499 / Month',
      priceTe: 'నెలకు కేవలం ₹499 నుండి',
      tagEn: 'FOR SHOPS & BUILDERS',
      tagTe: 'షాపులు & స్థానిక బ్రాండ్లకు',
      color: 'border-amber-300 bg-amber-50/50',
      badgeColor: 'bg-amber-500 text-white',
      featuresEn: [
        'Top carousel flex banner ad placement',
        'Dedicated Call and WhatsApp buttons on banner',
        'Reaches 10,000+ local village residents',
        'Golden star verified merchant recognition',
        'Analytics report on calls & impressions',
      ],
      featuresTe: [
        'హోమ్‌పేజీలో ప్రధాన ఫ్లెక్స్ బ్యానర్ స్థానం',
        'బ్యానర్‌పై డైరెక్ట్ కాల్ & వాట్సాప్ బటన్లు',
        '10,000+ గ్రామస్తులకు చేరే విస్తృతి',
        'గోల్డెన్ స్టార్ ధృవీకృత గుర్తింపు',
        'వచ్చిన కాల్స్ మరియు వీక్షణల వివరాల నివేదిక',
      ],
      btnEn: 'Book Flex Ad',
      btnTe: 'ఫ్లెక్స్ ప్రకటన బుక్ చేయండి',
      href: '/settings/market-brand',
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
          {isTelugu ? 'సభ్యత్వ విధానం' : 'Subscription Model'}
        </h1>
        <div className="w-9" />
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        <div className="text-center mb-2">
          <span className="text-xs font-black text-primary uppercase tracking-widest block mb-1">
            SevaSetu Transparent Pricing
          </span>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            {isTelugu ? 'గ్రామీణ పారదర్శక ప్లాన్లు' : 'Affordable Rural Plans'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isTelugu ? 'సాధారణ పౌరులకు 100% ఉచితం, వ్యాపారులకు నామమాత్రపు ధర' : 'Zero hidden charges. Built to empower Andhra Pradesh villages.'}
          </p>
        </div>

        {plans.map((p) => (
          <div
            key={p.id}
            className={`rounded-3xl p-5 border-2 shadow-card bg-white flex flex-col justify-between ${p.color}`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${p.badgeColor}`}>
                  {isTelugu ? p.tagTe : p.tagEn}
                </span>
                <span className="text-xs font-black text-slate-800">
                  {isTelugu ? p.priceTe : p.priceEn}
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                {isTelugu ? p.nameTe : p.nameEn}
              </h3>

              <div className="space-y-2 mt-4 pt-3 border-t border-slate-200/60">
                {(isTelugu ? p.featuresTe : p.featuresEn).map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3px]" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-2">
              {p.disabled ? (
                <div className="w-full py-2.5 text-center text-xs font-bold text-emerald-700 bg-emerald-100/60 rounded-xl">
                  {isTelugu ? p.btnTe : p.btnEn}
                </div>
              ) : (
                <Link
                  href={p.href!}
                  className="w-full py-3 text-center text-xs font-extrabold text-white bg-primary hover:bg-primary-hover rounded-xl block shadow-sm transition-transform active:scale-95"
                >
                  {isTelugu ? p.btnTe : p.btnEn}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
