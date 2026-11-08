'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { UserRole } from '@/data/types';
import { MOCK_CATEGORIES } from '@/data/mockData';
import {
  Phone,
  User,
  Lock,
  Building,
  Store,
  Wrench,
  UserCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

function RegisterContent() {
  const { t, isTelugu } = useLanguage();
  const { login } = useAuth();
  const { villages } = useLocation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialRole = (searchParams?.get('role') as UserRole) || 'customer';

  const [activeTab, setActiveTab] = useState<UserRole>(initialRole);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [villageId, setVillageId] = useState('v_kaza');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState(MOCK_CATEGORIES[0]?.name || '');
  const [password, setPassword] = useState('');
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(phone, activeTab, villageId);
    setIsDone(true);
    setTimeout(() => {
      if (activeTab === 'provider') router.push('/dashboard/provider');
      else if (activeTab === 'business') router.push('/dashboard/business');
      else router.push('/dashboard/customer');
    }, 1500);
  };

  const tabs: { key: UserRole; labelEn: string; labelTe: string; icon: any }[] = [
    { key: 'customer', labelEn: 'Customer', labelTe: 'వినియోగదారుడు', icon: UserCheck },
    { key: 'provider', labelEn: 'Service Provider', labelTe: 'సేవా నిపుణుడు', icon: Wrench },
    { key: 'business', labelEn: 'Local Business', labelTe: 'వ్యాపార యజమాని', icon: Store },
    { key: 'property_owner', labelEn: 'Property Owner', labelTe: 'ఆస్తి యజమాని', icon: Building },
  ];

  return (
    <div className="bg-surface-bg pb-10 pt-4 sm:pt-6 flex items-center justify-center">
      <div className="max-w-xl w-full mx-4">
        
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-indigo-800 text-white flex items-center justify-center font-extrabold text-base">
                సే
              </div>
              <span className="font-extrabold text-lg text-primary">{isTelugu ? 'సేవాసేతు' : 'SevaSetu'}</span>
            </div>
            <LanguageSelector />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('auth.registerTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('auth.registerSubtitle')}
            </p>
          </div>

          {/* Account Type Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-100 rounded-2xl mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="truncate">{isTelugu ? tab.labelTe : tab.labelEn}</span>
                </button>
              );
            })}
          </div>

          {isDone ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {isTelugu ? 'నమోదు పూర్తయింది!' : 'Registration Successful!'}
              </h3>
              <p className="text-sm text-slate-500">
                {isTelugu ? 'మీ ఖాతా సిద్ధంగా ఉంది. డాష్‌బోర్డ్‌కు రీడైరెక్ట్ చేస్తున్నాము...' : 'Redirecting to your dashboard...'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t('auth.fullName')} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isTelugu ? 'మీ పూర్తి పేరు నమోదు చేయండి' : 'Enter full name'}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t('auth.phone')} *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9848012345"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t('auth.village')} *
                </label>
                <select
                  value={villageId}
                  onChange={(e) => setVillageId(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {villages.map((v) => (
                    <option key={v.id} value={v.id}>
                      {isTelugu ? v.teluguName : v.name} ({v.mandal}, {v.district})
                    </option>
                  ))}
                </select>
              </div>

              {(activeTab === 'business' || activeTab === 'provider') && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {activeTab === 'business' ? t('auth.businessName') : t('auth.category')} *
                  </label>
                  {activeTab === 'business' ? (
                    <div className="relative">
                      <Store className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder={isTelugu ? 'ఉదా: శ్రీ లక్ష్మి కిరాణా & జనరల్ స్టోర్స్' : 'e.g. Sri Lakshmi Agro Seeds'}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        required
                      />
                    </div>
                  ) : (
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      {MOCK_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {isTelugu ? c.teluguName : c.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t('auth.password')} *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 pt-3"
              >
                <span>{t('auth.registerBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-xs text-slate-500">
            <span>{t('auth.alreadyHaveAccount')} </span>
            <Link href="/auth/login" className="font-bold text-primary hover:underline">
              {t('nav.login')}
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading form...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
