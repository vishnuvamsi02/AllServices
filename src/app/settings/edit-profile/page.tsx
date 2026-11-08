'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ArrowLeft, User, Mail, Phone, MapPin, Camera, Check, ShieldCheck } from 'lucide-react';

export default function EditProfilePage() {
  const router = useRouter();
  const { isTelugu } = useLanguage();
  const { currentUser } = useAuth();
  const { villages } = useLocation();
  const { showToast } = useMarketplace();

  const [name, setName] = useState(currentUser?.name || 'Vamsi');
  const [email, setEmail] = useState(currentUser?.email || 'pcpetsandkennels@gmail.com');
  const [phone, setPhone] = useState(currentUser?.phone || '9848123450');
  const [villageId, setVillageId] = useState(currentUser?.villageId || 'v_chinchinaada');
  const [address, setAddress] = useState('1-123, Main Road');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast(
        'success',
        isTelugu ? 'విజయవంతం' : 'Profile Updated',
        isTelugu ? 'మీ ప్రొఫైల్ విజయవంతంగా నవీకరించబడింది!' : 'Your profile details have been saved successfully.'
      );
      router.back();
    }, 700);
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
          {isTelugu ? 'ప్రొఫైల్ సవరించండి' : 'Edit Profile'}
        </h1>
        <div className="w-9" />
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#20295B] to-[#3B4C9B] text-white flex items-center justify-center font-black text-3xl shadow-lg border-4 border-white">
              {name.charAt(0).toUpperCase()}
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform"
              title="Change photo"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <span className="text-xs font-semibold text-slate-500 mt-2">
            {isTelugu ? 'ఫోటో మార్చండి' : 'Change Profile Photo'}
          </span>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card space-y-4">
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
                className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'ఈమెయిల్ చిరునామా' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'మొబైల్ నంబర్' : 'Mobile Number'}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'గ్రామం' : 'Village & Mandal'}
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <select
                value={villageId}
                onChange={(e) => setVillageId(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900 bg-white"
              >
                {villages.map((v) => (
                  <option key={v.id} value={v.id}>
                    {isTelugu ? v.teluguName : v.name} ({v.mandal}, {v.district})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'ఇంటి నంబర్ & వీధి చిరునామా' : 'Street Address / Door No.'}
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-extrabold text-sm rounded-2xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <span>{isTelugu ? 'భద్రపరుస్తోంది...' : 'Saving...'}</span>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[3px]" />
                  <span>{isTelugu ? 'సవరణలను భద్రపరచండి' : 'Save Changes'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
