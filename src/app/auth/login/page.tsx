'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { UserRole } from '@/data/types';
import {
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Wrench,
  Store,
  Landmark,
  Crown,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { t, isTelugu } = useLanguage();
  const { login, switchRole } = useAuth();
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError(isTelugu ? 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ ఇవ్వండి' : 'Please enter a valid 10-digit mobile number');
      return;
    }

    // Default to customer role if custom phone
    login(phone, 'customer', 'v_kaza');
    router.push('/dashboard/customer');
  };

  const handleQuickDemo = (role: UserRole, targetRoute: string) => {
    switchRole(role);
    router.push(targetRoute);
  };

  return (
    <div className="bg-surface-bg pb-10 pt-4 sm:pt-6 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        
        {/* Top Card */}
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
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {t('auth.loginTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('auth.loginSubtitle')}
            </p>
          </div>

          {error && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
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
              className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{t('auth.loginBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Test Logins */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
              {isTelugu ? 'పరీక్షించడానికి ప్రత్యక్ష లాగిన్ క్లిక్ చేయండి' : 'Quick 1-Click Role Login for Testing'}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemo('customer', '/dashboard/customer')}
                className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-900 font-bold flex items-center gap-1.5 transition-colors text-left"
              >
                <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">Customer</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('provider', '/dashboard/provider')}
                className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 font-bold flex items-center gap-1.5 transition-colors text-left"
              >
                <Wrench className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">Provider</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('village_admin', '/dashboard/village-admin')}
                className="p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-900 font-bold flex items-center gap-1.5 transition-colors text-left"
              >
                <Landmark className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="truncate">Village Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('super_admin', '/dashboard/super-admin')}
                className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100 text-purple-900 font-bold flex items-center gap-1.5 transition-colors text-left"
              >
                <Crown className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="truncate">Super Admin</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            <span>{t('auth.dontHaveAccount')} </span>
            <Link href="/auth/register" className="font-bold text-primary hover:underline">
              {t('auth.registerNow')}
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
