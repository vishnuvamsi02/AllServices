'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  ArrowLeft,
  Store,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  UploadCloud,
  FileCheck,
  Sparkles,
} from 'lucide-react';

export default function PublishBusinessPage() {
  const router = useRouter();
  const { isTelugu } = useLanguage();
  const { villages } = useLocation();
  const { showToast } = useMarketplace();

  const [businessName, setBusinessName] = useState('');
  const [teluguName, setTeluguName] = useState('');
  const [category, setCategory] = useState('Groceries & Provisions');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [villageId, setVillageId] = useState('v_chinchinaada');
  const [address, setAddress] = useState('');
  const [openingHours, setOpeningHours] = useState('7:00 AM - 9:00 PM');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(
      'success',
      isTelugu ? 'వ్యాపారం నమోదు చేయబడింది' : 'Business Registered',
      isTelugu
        ? 'మీ దుకాణ సమాచారం సమర్పించబడింది. గ్రామ అడ్మిన్ తనిఖీ చేసి 24 గంటల్లో లైవ్ చేస్తారు.'
        : 'Your business listing was submitted for Village Admin review.'
    );
    setTimeout(() => {
      router.push('/businesses');
    }, 1500);
  };

  const categories = [
    { en: 'Groceries & Kirana', te: 'కిరాణా & నిత్యావసరాలు' },
    { en: 'Fertilizers, Seeds & Agro', te: 'ఎరువులు, విత్తనాలు & పురుగుమందులు' },
    { en: 'Medical & Pharmacy', te: 'మెడికల్ షాపు & ఫార్మసీ' },
    { en: 'Hardware, Cement & Paints', te: 'హార్డ్‌వేర్, సిమెంట్ & పెయింట్స్' },
    { en: 'Electronics & Mobiles', te: 'ఎలక్ట్రానిక్స్ & మొబైల్స్' },
    { en: 'Two-Wheeler Service & Spares', te: 'బైక్ రిపేర్ & స్పేర్ పార్ట్స్' },
    { en: 'Dairy & Sweet Shop', te: 'పాల కేంద్రం & స్వీట్ షాప్' },
    { en: 'Tailoring & Textiles', te: 'టైలరింగ్ & రెడీమేడ్ బట్టలు' },
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
          {isTelugu ? 'వ్యాపారాన్ని ప్రచురించండి' : 'Publish Business'}
        </h1>
        <div className="w-9" />
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        {/* Intro Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50/80 p-5 border border-indigo-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">
              {isTelugu ? 'గ్రామ దుకాణం ఉచిత లిస్టింగ్' : 'Register Your Local Shop'}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              {isTelugu ? 'మీ గ్రామస్తులు మీ దుకాణాన్ని సులభంగా కనుగొంటారు' : 'Connect directly with village residents with zero commission'}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'వ్యాపారం / షాపు పేరు (ఇంగ్లీష్)' : 'Business Name (English)'}
            </label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Sri Balaji Fertilizers"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'దుకాణం పేరు (తెలుగు)' : 'Business Name (Telugu)'}
            </label>
            <input
              type="text"
              value={teluguName}
              onChange={(e) => setTeluguName(e.target.value)}
              placeholder="ఉదా: శ్రీ బాలాజీ ఎరువులు & క్రిమిసంహారకాలు"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'వ్యాపార విభాగం' : 'Business Category'}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900 bg-white"
            >
              {categories.map((c, i) => (
                <option key={i} value={c.en}>
                  {isTelugu ? c.te : c.en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'యజమాని పేరు' : 'Owner / Manager Name'}
            </label>
            <input
              type="text"
              required
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="e.g. Rambabu Naidu"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'మొబైల్ నంబర్ (కాల్ & వాట్సాప్)' : 'Contact Number (Phone & WhatsApp)'}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9848011223"
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'గ్రామం' : 'Village'}
            </label>
            <select
              value={villageId}
              onChange={(e) => setVillageId(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900 bg-white"
            >
              {villages.map((v) => (
                <option key={v.id} value={v.id}>
                  {isTelugu ? v.teluguName : v.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'షాపు చిరునామా / ల్యాండ్‌మార్క్' : 'Shop Address / Landmark'}
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={isTelugu ? 'ఉదా: పంచాయతీ ఆఫీస్ ఎదురుగా, మెయిన్ రోడ్డు' : 'e.g. Opp. Panchayat Office, Main Road'}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'షాపు పని వేళలు' : 'Opening Hours'}
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'షాపు ముందు భాగం ఫోటో' : 'Shop Frontage Photo'}
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-primary/50 transition-colors bg-slate-50 cursor-pointer">
              <UploadCloud className="w-7 h-7 text-primary mx-auto mb-1" />
              <span className="text-xs font-bold text-slate-700 block">
                {isTelugu ? 'ఫోటోను అప్‌లోడ్ చేయండి' : 'Click to Upload Shop Photo'}
              </span>
              <span className="text-[10px] text-slate-400">JPG, PNG up to 5MB</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-extrabold text-sm rounded-2xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 mt-2"
          >
            <Store className="w-4 h-4" />
            <span>{isTelugu ? 'ధృవీకరణ కోసం సమర్పించండి' : 'Submit Business for Verification'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
