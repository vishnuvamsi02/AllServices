'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  ArrowLeft,
  Megaphone,
  TrendingUp,
  Eye,
  Users,
  Image as ImageIcon,
  CheckCircle2,
  Calendar,
  Phone,
  Store,
  UploadCloud,
} from 'lucide-react';

export default function MarketBrandPage() {
  const router = useRouter();
  const { isTelugu } = useLanguage();
  const { villages } = useLocation();
  const { showToast } = useMarketplace();

  const [businessName, setBusinessName] = useState('');
  const [headline, setHeadline] = useState('');
  const [villageId, setVillageId] = useState('all');
  const [phone, setPhone] = useState('');
  const [duration, setDuration] = useState('1m');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(
      'success',
      isTelugu ? 'ప్రకటన సమర్పించబడింది' : 'Ad Submitted',
      isTelugu
        ? 'మీ ప్రమోషన్ అభ్యర్థన విజయవంతంగా సమర్పించబడింది. గ్రామ అడ్మిన్ త్వరలో ఆమోదిస్తారు.'
        : 'Your promotional ad was submitted and is pending Village Admin verification.'
    );
    setTimeout(() => {
      router.push('/settings');
    }, 1500);
  };

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
          {isTelugu ? 'మీ వ్యాపారాన్ని ప్రచారం చేయండి' : 'Market Your Brand'}
        </h1>
        <div className="w-9" />
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-5">
        {/* Banner with 3 Benefit Badges matching Screen 08 */}
        <div className="rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100/70 p-5 border border-amber-200/90 shadow-sm text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto mb-2.5 shadow-sm">
            <Megaphone className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            {isTelugu ? 'మీ వ్యాపారానికి స్థానిక కస్టమర్లను పొందండి' : 'Reach Local Customers & Grow'}
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            {isTelugu ? 'గ్రామ ప్రజలకు మీ దుకాణం లేదా సేవను ప్రత్యక్షంగా తెలియజేయండి' : 'Get featured prominently across Andhra Pradesh rural citizen feeds'}
          </p>

          <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-amber-200/60">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <span>{isTelugu ? 'ఎక్కువ లీడ్స్' : 'More Leads'}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
              <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center">
                <Eye className="w-3.5 h-3.5" />
              </div>
              <span>{isTelugu ? 'దృశ్యమానత' : 'Visibility'}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
              <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center">
                <Users className="w-3.5 h-3.5" />
              </div>
              <span>{isTelugu ? 'గ్రామ పరిధి' : 'Village Reach'}</span>
            </div>
          </div>
        </div>

        {/* Ad Submission Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'వ్యాపారం లేదా బ్రాండ్ పేరు' : 'Business / Brand Name'}
            </label>
            <div className="relative">
              <Store className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder={isTelugu ? 'ఉదా: లక్ష్మి ప్యాకర్స్' : 'e.g. Lakshmi Traders'}
                className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'ప్రకటన ముఖ్య శీర్షిక' : 'Banner Headline / Offer'}
            </label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder={isTelugu ? 'ఉదా: 20% రాయితీతో సురక్షిత రవాణా' : 'e.g. Safe Household Shifting Across All AP'}
              className="w-full h-11 px-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'లక్ష్య గ్రామం' : 'Target Village / Mandal'}
            </label>
            <select
              value={villageId}
              onChange={(e) => setVillageId(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900 bg-white"
            >
              <option value="all">{isTelugu ? 'అన్ని గ్రామాలు (All AP)' : 'All Villages (Statewide)'}</option>
              {villages.map((v) => (
                <option key={v.id} value={v.id}>
                  {isTelugu ? v.teluguName : v.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'కస్టమర్ కాల్ నంబర్' : 'Contact Phone Number'}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9848011223"
                className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'ప్రదర్శన వ్యవధి' : 'Campaign Duration'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: '1m', en: '1 Month', te: '1 నెల' },
                { id: '3m', en: '3 Months', te: '3 నెలలు' },
                { id: '6m', en: '6 Months', te: '6 నెలలు' },
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDuration(d.id)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    duration === d.id
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isTelugu ? d.te : d.en}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'బ్యానర్ చిత్రం / ఫ్లెక్స్ డిజైన్' : 'Banner Image / Flex Photo'}
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-primary/50 transition-colors bg-slate-50 cursor-pointer">
              <UploadCloud className="w-8 h-8 text-primary mx-auto mb-1" />
              <span className="text-xs font-bold text-slate-700 block">
                {isTelugu ? 'చిత్రాన్ని ఎంచుకోండి లేదా ఇక్కడ లాగండి' : 'Click to Upload Flex Banner'}
              </span>
              <span className="text-[10px] text-slate-400">PNG, JPG up to 5MB</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-extrabold text-sm rounded-2xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 mt-2"
          >
            <Megaphone className="w-4 h-4 text-amber-300" />
            <span>{isTelugu ? 'ప్రకటనను సమర్పించండి' : 'Post Your Ad Here'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
