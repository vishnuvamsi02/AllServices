'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  ArrowLeft,
  Users,
  Award,
  CheckCircle2,
  Briefcase,
  Smartphone,
  Phone,
  User,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export default function RegisterAgentPage() {
  const router = useRouter();
  const { isTelugu } = useLanguage();
  const { villages } = useLocation();
  const { showToast } = useMarketplace();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [villageId, setVillageId] = useState('v_chinchinaada');
  const [education, setEducation] = useState('Intermediate / Graduate');
  const [hasSmartphone, setHasSmartphone] = useState(true);
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(
      'success',
      isTelugu ? 'దరఖాస్తు సమర్పించబడింది' : 'Application Submitted',
      isTelugu
        ? 'గ్రామ ఏజెంట్ దరఖాస్తు విజయవంతంగా చేరింది. మీ జిల్లా మేనేజర్ 48 గంటల్లో సంప్రదిస్తారు.'
        : 'Village Agent application submitted. The district coordinator will contact you shortly.'
    );
    setTimeout(() => router.push('/settings'), 1500);
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
          {isTelugu ? 'గ్రామ ఏజెంట్‌గా చేరండి' : 'Register as Village Agent'}
        </h1>
        <div className="w-9" />
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        {/* Intro Card */}
        <div className="rounded-3xl bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-5 border border-sky-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
            <Users className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">
              {isTelugu ? 'గ్రామ సమన్వయకర్త ప్రోగ్రామ్' : 'SevaSetu Village Coordinator'}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              {isTelugu
                ? 'మీ గ్రామంలోని నిపుణులను నమోదు చేయిస్తూ గౌరవప్రదమైన ప్రోత్సాహకాలు పొందండి'
                : 'Help village technicians register on SevaSetu and earn attractive local incentives'}
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-base font-black text-secondary block">₹3,000+</span>
            <span className="text-[11px] font-bold text-slate-600">
              {isTelugu ? 'నెలవారీ ప్రోత్సాహకాలు' : 'Monthly Incentives'}
            </span>
          </div>
          <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-base font-black text-primary block">Official ID</span>
            <span className="text-[11px] font-bold text-slate-600">
              {isTelugu ? 'గ్రామ ఏజెంట్ గుర్తింపు' : 'Recognized Coordinator'}
            </span>
          </div>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
            {isTelugu ? 'ఏజెంట్ దరఖాస్తు ఫారమ్' : 'Agent Application Form'}
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'పూర్తి పేరు' : 'Full Name'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. K. Srinivas Rao"
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {isTelugu ? 'వయస్సు' : 'Age'}
              </label>
              <input
                type="number"
                required
                min={18}
                max={60}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="24"
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {isTelugu ? 'ఫోన్ నంబర్' : 'Phone'}
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9848011223"
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'గ్రామం & మండలం' : 'Village & Mandal'}
            </label>
            <select
              value={villageId}
              onChange={(e) => setVillageId(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900 bg-white"
            >
              {villages.map((v) => (
                <option key={v.id} value={v.id}>
                  {isTelugu ? v.teluguName : v.name} ({v.mandal})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'విద్యార్హత' : 'Education Qualification'}
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'మీ వద్ద స్మార్ట్‌ఫోన్ ఉందా?' : 'Do you own an Android/iOS Smartphone?'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setHasSmartphone(true)}
                className={`py-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                  hasSmartphone
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{isTelugu ? 'అవును (Yes)' : 'Yes, I have'}</span>
              </button>
              <button
                type="button"
                onClick={() => setHasSmartphone(false)}
                className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  !hasSmartphone
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <span>{isTelugu ? 'లేదు (No)' : 'No'}</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'మీరు ఎందుకు చేరాలనుకుంటున్నారు?' : 'Why do you want to join?'}
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={isTelugu ? 'మీ అనుభవం లేదా కారణం క్లుప్తంగా రాయండి...' : 'Briefly describe your interest or background...'}
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-medium text-slate-900 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-extrabold text-sm rounded-2xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 mt-2"
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>{isTelugu ? 'ఏజెంట్‌గా దరఖాస్తు చేయండి' : 'Submit Agent Application'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
