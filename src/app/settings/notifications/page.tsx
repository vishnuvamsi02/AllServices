'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  ArrowLeft,
  Bell,
  MessageCircle,
  Phone,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  Building2,
  Megaphone,
} from 'lucide-react';

export default function NotificationsPage() {
  const router = useRouter();
  const { isTelugu } = useLanguage();
  const { showToast } = useMarketplace();

  const [settings, setSettings] = useState({
    whatsapp: true,
    sms: true,
    serviceEnquiries: true,
    propertyAlerts: true,
    villageNews: false,
    promotions: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    showToast(
      'success',
      isTelugu ? 'భద్రపరచబడింది' : 'Preferences Saved',
      isTelugu
        ? 'మీ నోటిఫికేషన్ సెట్టింగ్‌లు విజయవంతంగా భద్రపరచబడ్డాయి.'
        : 'Your notification preferences have been updated.'
    );
    setTimeout(() => router.back(), 600);
  };

  const items = [
    {
      key: 'whatsapp' as const,
      icon: MessageCircle,
      color: 'bg-emerald-50 text-emerald-600',
      titleEn: 'WhatsApp Notifications',
      titleTe: 'వాట్సాప్ సందేశాలు',
      descEn: 'Receive technician contact details and enquiry confirmations directly on WhatsApp',
      descTe: 'సేవా నిపుణుల ఫోన్ నంబర్లు మరియు ఆర్డర్ వివరాలు నేరుగా వాట్సాప్‌లో పొందండి',
    },
    {
      key: 'sms' as const,
      icon: Phone,
      color: 'bg-blue-50 text-blue-600',
      titleEn: 'SMS Instant Alerts',
      titleTe: 'ఎస్.ఎం.ఎస్ అలర్ట్‌లు',
      descEn: 'Urgent service status, OTPs, and emergency booking updates',
      descTe: 'అత్యవసర సమాచారం మరియు OTP నోటిఫికేషన్లు',
    },
    {
      key: 'serviceEnquiries' as const,
      icon: Bell,
      color: 'bg-purple-50 text-purple-600',
      titleEn: 'Service Enquiry Updates',
      titleTe: 'సేవా విచారణ అప్‌డేట్లు',
      descEn: 'Get notified when an electrician, plumber, or shop responds to your request',
      descTe: 'మీరు అడిగిన సేవపై నిపుణులు స్పందించినప్పుడు వెంటనే తెలుసుకోండి',
    },
    {
      key: 'propertyAlerts' as const,
      icon: Building2,
      color: 'bg-teal-50 text-teal-600',
      titleEn: 'New Village Property Alerts',
      titleTe: 'కొత్త ఆస్తుల ప్రకటనలు',
      descEn: 'Alerts when agricultural land, houses, or plots are posted in your village',
      descTe: 'మీ గ్రామంలో కొత్త ప్లాట్లు లేదా ఇళ్ళు లిస్ట్ అయినప్పుడు అలర్ట్ పొందండి',
    },
    {
      key: 'villageNews' as const,
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-600',
      titleEn: 'Panchayat & Village Announcements',
      titleTe: 'గ్రామ సచివాలయ ప్రకటనలు',
      descEn: 'Official announcements from your verified Village Admin',
      descTe: 'మీ గ్రామ సచివాలయం మరియు అడ్మిన్ నుండి ముఖ్యమైన సమాచారం',
    },
    {
      key: 'promotions' as const,
      icon: Megaphone,
      color: 'bg-rose-50 text-rose-600',
      titleEn: 'Special Offers & Discounts',
      titleTe: 'ప్రత్యేక ఆఫర్లు & రాయితీలు',
      descEn: 'Occasional seasonal discounts from verified village merchants',
      descTe: 'స్థానిక వ్యాపారాలు మరియు దుకాణాల నుండి పండుగ ఆఫర్లు',
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
          {isTelugu ? 'నోటిఫికేషన్ సెట్టింగ్స్' : 'Notification Settings'}
        </h1>
        <div className="w-9" />
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card divide-y divide-slate-100">
          {items.map((item) => {
            const Icon = item.icon;
            const checked = settings[item.key];

            return (
              <div key={item.key} className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-2xl ${item.color} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon className="w-5 h-5 stroke-[2.2px]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                      {isTelugu ? item.titleTe : item.titleEn}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">
                      {isTelugu ? item.descTe : item.descEn}
                    </p>
                  </div>
                </div>

                {/* iOS-style toggle switch */}
                <button
                  type="button"
                  onClick={() => toggle(item.key)}
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                    checked ? 'bg-primary' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                      checked ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-extrabold text-sm rounded-2xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          <span>{isTelugu ? 'ప్రాధాన్యతలను భద్రపరచండి' : 'Save Preferences'}</span>
        </button>
      </div>
    </div>
  );
}
