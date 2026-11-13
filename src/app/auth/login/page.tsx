'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { UserRole } from '@/data/types';
import { MOCK_VILLAGES } from '@/data/mockData';
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
  CheckCircle2,
  MapPin,
  Sparkles,
  KeyRound,
  FileCheck,
  Building,
  Radio,
  Clock,
  Briefcase,
  HelpCircle,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

function LoginForm() {
  const { t, isTelugu } = useLanguage();
  const { login, switchRole } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Selected role tab
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');

  // Customer state
  const [customerPhone, setCustomerPhone] = useState('9848012345');
  const [customerVillage, setCustomerVillage] = useState('v_chinchinaada');
  const [customerAuthMode, setCustomerAuthMode] = useState<'otp' | 'mpin'>('otp');
  const [customerMpin, setCustomerMpin] = useState('1234');
  const [otpSent, setOtpSent] = useState(false);
  const [customerOtp, setCustomerOtp] = useState('');

  // Provider state
  const [providerPhone, setProviderPhone] = useState('9849123456');
  const [providerTrade, setProviderTrade] = useState('Electricians');
  const [providerPin, setProviderPin] = useState('4321');
  const [isAvailableForWork, setIsAvailableForWork] = useState(true);
  const [acceptEmergency, setAcceptEmergency] = useState(true);

  // Business state
  const [businessPhone, setBusinessPhone] = useState('9849567890');
  const [businessVillage, setBusinessVillage] = useState('v_chinchinaada');
  const [businessPin, setBusinessPin] = useState('5678');
  const [storeOpenToday, setStoreOpenToday] = useState(true);
  const [tradeLicenseId, setTradeLicenseId] = useState('AP-SHOP-2026-88');

  // Village Admin state
  const [adminPhone, setAdminPhone] = useState('9848011223');
  const [villageCode, setVillageCode] = useState('AP-WG-CH01');
  const [adminPasskey, setAdminPasskey] = useState('panchayat#2026');
  const [confirmedPanchayatAuth, setConfirmedPanchayatAuth] = useState(true);

  // Super Admin state
  const [superEmail, setSuperEmail] = useState('admin@sevasetu.ap.gov.in');
  const [superPassword, setSuperPassword] = useState('SevaSetuMaster#AP2026');
  const [totpToken, setTotpToken] = useState('849201');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync role from query param on load
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam && ['customer', 'provider', 'business', 'village_admin', 'super_admin'].includes(roleParam)) {
      setSelectedRole(roleParam as UserRole);
    }
  }, [searchParams]);

  // Handle Form Submission per Role
  const handleRoleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (selectedRole === 'customer') {
        if (!customerPhone || customerPhone.length < 10) {
          setError(isTelugu ? 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ ఇవ్వండి' : 'Please enter a valid 10-digit mobile number');
          return;
        }
        login(customerPhone, 'customer', customerVillage);
        router.push('/dashboard/customer');
      } else if (selectedRole === 'provider') {
        if (!providerPhone || providerPhone.length < 10) {
          setError(isTelugu ? 'దయచేసి రిజిస్టర్డ్ నిపుణుడి మొబైల్ నంబర్ ఇవ్వండి' : 'Please enter registered provider mobile number');
          return;
        }
        login(providerPhone, 'provider', 'v_chinchinaada');
        router.push('/dashboard/provider');
      } else if (selectedRole === 'business') {
        if (!businessPhone || businessPhone.length < 10) {
          setError(isTelugu ? 'దయచేసి వ్యాపారి మొబైల్ నంబర్ ఇవ్వండి' : 'Please enter merchant mobile number');
          return;
        }
        login(businessPhone, 'business', businessVillage);
        router.push('/dashboard/business');
      } else if (selectedRole === 'village_admin') {
        if (!villageCode) {
          setError(isTelugu ? 'దయచేసి సరైన గ్రామ కోడ్ నమోదు చేయండి' : 'Please enter valid village jurisdiction code');
          return;
        }
        login(adminPhone, 'village_admin', 'v_chinchinaada');
        router.push('/dashboard/village-admin');
      } else if (selectedRole === 'super_admin') {
        if (!superEmail || !totpToken) {
          setError(isTelugu ? 'దయచేసి అడ్మిన్ ఇమెయిల్ మరియు 2FA టోకెన్ ఇవ్వండి' : 'Please enter administrator email and 2FA token');
          return;
        }
        login('9900112233', 'super_admin', 'v_chinchinaada');
        router.push('/dashboard/super-admin');
      }
    }, 400);
  };

  const handleQuickDemo = (role: UserRole, targetRoute: string) => {
    switchRole(role);
    router.push(targetRoute);
  };

  return (
    <div className="bg-surface-bg pb-12 pt-4 sm:pt-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-card mb-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-indigo-800 text-white flex items-center justify-center font-extrabold text-base shadow-xs group-hover:scale-105 transition-transform">
                సే
              </div>
              <div>
                <span className="font-extrabold text-base text-primary block leading-tight">
                  {isTelugu ? 'సేవాసేతు' : 'SevaSetu'}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {isTelugu ? 'పోర్టల్ లాగిన్' : 'Role Portal Login'}
                </span>
              </div>
            </Link>
            <LanguageSelector />
          </div>

          <div className="text-center mb-4">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isTelugu ? 'మీ ఖాతాలోకి ప్రవేశించండి' : 'Select Your Role & Sign In'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isTelugu
                ? 'మీ రకం (గ్రామవాసి, సేవా నిపుణుడు, వ్యాపారి, గ్రామ అధికారి) ఎంచుకోండి'
                : 'Each user role has a specialized portal and custom dashboard'}
            </p>
          </div>

          {/* Admin Portal Fast Link */}
          <div className="mb-4 p-3.5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl flex items-center justify-between gap-3 shadow-md border border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black block text-amber-300">
                  {isTelugu ? 'గ్రామ & రాష్ట్ర అడ్మిన్ లాగిన్' : 'Village & Super Admin Command'}
                </span>
                <span className="text-[10px] text-slate-300 block">
                  {isTelugu ? 'పంచాయతీ & రాష్ట్ర డైరెక్టరేట్ అధికారిక పోర్టల్' : 'Dedicated secure portal for Panchayat & State Directors'}
                </span>
              </div>
            </div>
            <Link
              href="/admin/login"
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black shrink-0 transition-all shadow-xs flex items-center gap-1"
            >
              <span>Admin Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Interactive Role Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1.5 bg-slate-100 rounded-2xl mb-4 text-xs font-bold">
            
            <button
              type="button"
              onClick={() => setSelectedRole('customer')}
              className={`py-2 px-2.5 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${
                selectedRole === 'customer'
                  ? 'bg-blue-600 text-white shadow-sm scale-102'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span className="truncate">{isTelugu ? 'గ్రామవాసి' : 'Customer'}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('provider')}
              className={`py-2 px-2.5 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${
                selectedRole === 'provider'
                  ? 'bg-emerald-600 text-white shadow-sm scale-102'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span className="truncate">{isTelugu ? 'నిపుణుడు' : 'Provider'}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('business')}
              className={`py-2 px-2.5 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${
                selectedRole === 'business'
                  ? 'bg-violet-600 text-white shadow-sm scale-102'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Store className="w-4 h-4" />
              <span className="truncate">{isTelugu ? 'వ్యాపారి' : 'Business'}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('village_admin')}
              className={`py-2 px-2.5 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${
                selectedRole === 'village_admin'
                  ? 'bg-indigo-700 text-white shadow-sm scale-102'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span className="truncate">{isTelugu ? 'గ్రామ అడ్మిన్' : 'Village Admin'}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('super_admin')}
              className={`py-2 px-2.5 rounded-xl transition-all flex flex-col items-center justify-center gap-1 col-span-2 sm:col-span-1 ${
                selectedRole === 'super_admin'
                  ? 'bg-slate-900 text-white shadow-sm scale-102'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Crown className="w-4 h-4 text-amber-300" />
              <span className="truncate">{isTelugu ? 'సూపర్ అడ్మిన్' : 'Super Admin'}</span>
            </button>

          </div>
        </div>

        {/* ROLE SPECIFIC LOGIN CONTAINER */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card relative overflow-hidden">
          
          {error && (
            <div className="p-3 mb-5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* ========================================================= */}
          {/* 1. CUSTOMER LOGIN EXPERIENCE                             */}
          {/* ========================================================= */}
          {selectedRole === 'customer' && (
            <div className="space-y-5">
              
              {/* Role Hero Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border border-blue-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-blue-950">
                    {isTelugu ? 'గ్రామవాసి / వినియోగదారు పోర్టల్' : 'Resident & Customer Portal'}
                  </h2>
                  <p className="text-xs text-blue-800/90 mt-0.5 leading-relaxed">
                    {isTelugu
                      ? 'ఎలక్ట్రీషియన్లు, ప్లంబర్లు, ట్రాక్టర్లు & గ్రామ సేవలను నేరుగా బుక్ చేసుకోండి. 0% కమీషన్.'
                      : 'Book local electricians, plumbers, tractors & village stores with 0% middleman commission.'}
                  </p>
                </div>
              </div>

              {/* Customer Mode: Mobile OTP vs 4-Digit MPIN */}
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <button
                  type="button"
                  onClick={() => setCustomerAuthMode('otp')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                    customerAuthMode === 'otp' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {isTelugu ? '📱 SMS / వాట్సాప్ OTP' : '📱 SMS / WhatsApp OTP'}
                </button>
                <button
                  type="button"
                  onClick={() => setCustomerAuthMode('mpin')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                    customerAuthMode === 'mpin' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {isTelugu ? '🔢 4-అంకెల MPIN' : '🔢 4-Digit MPIN'}
                </button>
              </div>

              <form onSubmit={handleRoleLogin} className="space-y-4">
                
                {/* Mobile Phone Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t('auth.phone')} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      maxLength={10}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="9848012345"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Village Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isTelugu ? 'మీ స్వగ్రామం (సమీప సేవల కోసం)' : 'Your Village (For Nearest Results)'}
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      value={customerVillage}
                      onChange={(e) => setCustomerVillage(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                    >
                      {MOCK_VILLAGES.map((v) => (
                        <option key={v.id} value={v.id}>
                          {isTelugu ? `${v.teluguName} (${v.district})` : `${v.name} (${v.district})`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Conditional MPIN vs OTP */}
                {customerAuthMode === 'mpin' ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {isTelugu ? '4-అంకెల సెక్యూరిటీ పిన్' : '4-Digit Security MPIN'} *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="password"
                        maxLength={4}
                        value={customerMpin}
                        onChange={(e) => setCustomerMpin(e.target.value)}
                        placeholder="••••"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 tracking-widest text-center transition-all"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={() => setOtpSent(true)}
                        className="w-full py-2.5 border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isTelugu ? 'OTP కోడ్ పంపండి (SMS & WhatsApp)' : 'Send 6-Digit OTP to Phone'}</span>
                      </button>
                    ) : (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                          <span>{isTelugu ? 'OTP పంపబడింది (డెమో కోడ్: 456789)' : 'OTP Sent (Demo Code: 456789)'}</span>
                          <button
                            type="button"
                            onClick={() => setOtpSent(false)}
                            className="text-[11px] text-blue-600 hover:underline"
                          >
                            {isTelugu ? 'మళ్లీ పంపండి' : 'Resend'}
                          </button>
                        </div>
                        <input
                          type="text"
                          maxLength={6}
                          value={customerOtp}
                          onChange={(e) => setCustomerOtp(e.target.value)}
                          placeholder="456789"
                          className="w-full py-2 text-center text-sm font-bold tracking-widest bg-white border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Submit Customer Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{isLoading ? 'Verifying...' : isTelugu ? 'కస్టమర్ పోర్టల్‌లోకి ప్రవేశించండి' : 'Enter Customer Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Customer Value Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-700 block">0% Commission</span>
                  <span className="text-[9px] text-slate-400">Direct village phone call</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-700 block">Verified Techs</span>
                  <span className="text-[9px] text-slate-400">Aadhaar & village check</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-700 block">Pay After Work</span>
                  <span className="text-[9px] text-slate-400">Cash or UPI to provider</span>
                </div>
              </div>

              {/* 1-Click Fast Customer Demo */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {isTelugu ? 'పరీక్షించడానికి డైరెక్ట్ లింక్:' : 'Quick Testing Demo:'}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('customer', '/dashboard/customer')}
                  className="px-3 py-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-bold transition-colors"
                >
                  {isTelugu ? 'రవి తేజ (వినియోగదారుడు)' : 'Ravi Teja (Customer)'}
                </button>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* 2. SERVICE PROVIDER LOGIN EXPERIENCE                      */}
          {/* ========================================================= */}
          {selectedRole === 'provider' && (
            <div className="space-y-5">
              
              {/* Role Hero Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border border-emerald-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-emerald-950">
                    {isTelugu ? 'సేవా నిపుణుల పోర్టల్ (Pro Partner)' : 'Technician & Service Provider Portal'}
                  </h2>
                  <p className="text-xs text-emerald-800/90 mt-0.5 leading-relaxed">
                    {isTelugu
                      ? 'మీ నైపుణ్యంతో గ్రామాల్లో ఆదాయం పెంచుకోండి. నేరుగా కస్టమర్ల నుండి ఫోన్ కాల్స్ పొందండి.'
                      : 'Accept village service requests, manage hourly rates, and keep 100% of your earnings.'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleRoleLogin} className="space-y-4">
                
                {/* Mobile Phone Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isTelugu ? 'రిజిస్టర్డ్ నిపుణుడి మొబైల్' : 'Registered Provider Mobile'} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      maxLength={10}
                      value={providerPhone}
                      onChange={(e) => setProviderPhone(e.target.value)}
                      placeholder="9849123456"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Profession / Trade Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isTelugu ? 'మీ ప్రధాన నైపుణ్యం / వృత్తి' : 'Primary Trade / Skill Category'}
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      value={providerTrade}
                      onChange={(e) => setProviderTrade(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                    >
                      <option value="Electricians">Electrician (మోటార్లు, ఇళ్ళ వైరింగ్)</option>
                      <option value="Plumbers">Plumber (బోర్లు, పైపులు, డ్రిప్)</option>
                      <option value="Tractors">Tractor & Harvester Operator</option>
                      <option value="Carpenters">Carpenter (ఫర్నిచర్, తలుపులు)</option>
                      <option value="Appliance">Home Appliance & AC Repair</option>
                      <option value="Drivers">Commercial Driver (ఆటో, బొలెరో, కార్)</option>
                      <option value="Masons">Building Mason & Construction</option>
                    </select>
                  </div>
                </div>

                {/* Provider PIN */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isTelugu ? 'నిపుణుడి సెక్యూరిటీ పిన్' : 'Provider Security PIN'} *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      maxLength={6}
                      value={providerPin}
                      onChange={(e) => setProviderPin(e.target.value)}
                      placeholder="••••"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 tracking-widest text-center transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Work Availability Toggle */}
                <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      {isTelugu ? 'లాగిన్ అవ్వగానే "పనికి సిద్ధం" గా గుర్తించు' : 'Mark "Available For Jobs" immediately'}
                    </span>
                    <input
                      type="checkbox"
                      checked={isAvailableForWork}
                      onChange={(e) => setIsAvailableForWork(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer pt-1 border-t border-emerald-200/60">
                    <span className="text-xs font-medium text-emerald-800">
                      {isTelugu ? 'వ్యవసాయ అత్యవసర మోటార్ కాల్స్ తీసుకోండి' : 'Accept Agricultural Emergency Calls'}
                    </span>
                    <input
                      type="checkbox"
                      checked={acceptEmergency}
                      onChange={(e) => setAcceptEmergency(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                  </label>
                </div>

                {/* Submit Provider Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{isLoading ? 'Verifying Provider...' : isTelugu ? 'ప్రో పోర్టల్‌లోకి ప్రవేశించండి' : 'Enter Pro Provider Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* 1-Click Fast Provider Demo */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {isTelugu ? 'పరీక్షించడానికి డైరెక్ట్ లింక్:' : 'Quick Testing Demo:'}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('provider', '/dashboard/provider')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold transition-colors"
                >
                  {isTelugu ? 'బాబు రావు (ఎలక్ట్రీషియన్)' : 'Babu Rao (Electrician)'}
                </button>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* 3. LOCAL BUSINESS LOGIN EXPERIENCE                        */}
          {/* ========================================================= */}
          {selectedRole === 'business' && (
            <div className="space-y-5">
              
              {/* Role Hero Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-50 via-purple-50 to-pink-50 border border-violet-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-violet-950">
                    {isTelugu ? 'స్థానిక వ్యాపారవేత్త / షాప్ పోర్టల్' : 'Local Business & Merchant Storefront'}
                  </h2>
                  <p className="text-xs text-violet-800/90 mt-0.5 leading-relaxed">
                    {isTelugu
                      ? 'విత్తనాలు, ఎరువులు, పశువుల దాణా మరియు కిరాణా ఆర్డర్లను గ్రామస్తుల నుండి నేరుగా అందుకోండి.'
                      : 'Showcase seeds, fertilizers, feeds, and retail goods to nearby villagers on WhatsApp & phone.'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleRoleLogin} className="space-y-4">
                
                {/* Mobile Phone Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isTelugu ? 'వ్యాపారి మొబైల్ నంబర్' : 'Merchant Mobile Number'} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      maxLength={10}
                      value={businessPhone}
                      onChange={(e) => setBusinessPhone(e.target.value)}
                      placeholder="9849567890"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Operating Village Branch */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isTelugu ? 'దుకాణం ఉన్న గ్రామం' : 'Operating Store Village'}
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      value={businessVillage}
                      onChange={(e) => setBusinessVillage(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition-all"
                    >
                      {MOCK_VILLAGES.map((v) => (
                        <option key={v.id} value={v.id}>
                          {isTelugu ? `${v.teluguName} సెంటర్` : `${v.name} Center`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Trade License or GST */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isTelugu ? 'షాప్ రిజిస్ట్రేషన్ / లైసెన్స్ ID (ఐచ్ఛికం)' : 'Shop License / GST ID (Optional)'}
                  </label>
                  <div className="relative">
                    <FileCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={tradeLicenseId}
                      onChange={(e) => setTradeLicenseId(e.target.value)}
                      placeholder="AP-SHOP-2026-88"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition-all uppercase"
                    />
                  </div>
                </div>

                {/* Merchant Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isTelugu ? 'వ్యాపారి పాస్‌వర్డ్ / పిన్' : 'Merchant PIN / Password'} *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      maxLength={6}
                      value={businessPin}
                      onChange={(e) => setBusinessPin(e.target.value)}
                      placeholder="••••"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 tracking-widest text-center transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Store Open Toggle */}
                <div className="p-3 bg-violet-50/70 border border-violet-200/80 rounded-xl">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-bold text-violet-950 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      {isTelugu ? 'ఈ రోజు దుకాణం "తెరిచి ఉంది" (ఆర్డర్లు స్వీకరించు)' : 'Mark Shop "OPEN for Orders" today'}
                    </span>
                    <input
                      type="checkbox"
                      checked={storeOpenToday}
                      onChange={(e) => setStoreOpenToday(e.target.checked)}
                      className="w-4 h-4 accent-violet-600 rounded"
                    />
                  </label>
                </div>

                {/* Submit Business Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{isLoading ? 'Verifying Merchant...' : isTelugu ? 'వ్యాపార పోర్టల్‌లోకి ప్రవేశించండి' : 'Enter Business Merchant Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* 1-Click Fast Business Demo */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {isTelugu ? 'పరీక్షించడానికి డైరెక్ట్ లింక్:' : 'Quick Testing Demo:'}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('business', '/dashboard/business')}
                  className="px-3 py-1.5 rounded-lg bg-violet-100 hover:bg-violet-200 text-violet-800 text-xs font-bold transition-colors"
                >
                  {isTelugu ? 'శ్రీ వెంకటేశ్వర ఆగ్రో (షాప్)' : 'Sri Venkateswara Agro (Store)'}
                </button>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* 4. VILLAGE ADMIN (PANCHAYAT) LOGIN EXPERIENCE             */}
          {/* ========================================================= */}
          {selectedRole === 'village_admin' && (
            <div className="space-y-5">
              
              {/* Role Hero Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 via-primary to-indigo-950 text-white border border-indigo-700/80 flex items-start gap-3.5 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center shrink-0 shadow-sm font-black text-lg">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-sm font-extrabold text-white">
                      {isTelugu ? 'గ్రామ పంచాయతీ అడ్మినిస్ట్రేషన్ గేట్‌వే' : 'Panchayat & Village Administration Hub'}
                    </h2>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-400 text-slate-900">
                      Official
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {isTelugu
                      ? 'గ్రామ నిపుణుల ధృవీకరణ, ఫిర్యాదుల పరిష్కారం మరియు స్థానిక డైరెక్టరీ నిర్వహణ.'
                      : 'Verify local provider KYC, approve business listings, and resolve village support tickets.'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleRoleLogin} className="space-y-4">
                
                {/* Jurisdiction Village Code */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isTelugu ? 'అధికారిక గ్రామ కోడ్ (Jurisdiction Code)' : 'Village Jurisdiction Code'} *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={villageCode}
                      onChange={(e) => setVillageCode(e.target.value.toUpperCase())}
                      placeholder="AP-WG-CH01"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-mono font-bold uppercase transition-all"
                      required
                    />
                  </div>
                  <span className="text-[11px] text-indigo-600 mt-1 block">
                    {isTelugu ? '✓ చించినాడ (AP-WG-CH01) లేదా కాజా (AP-GNT-KZ01)' : '✓ Chinchinaada (AP-WG-CH01) or Kaza (AP-GNT-KZ01)'}
                  </span>
                </div>

                {/* Admin Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isTelugu ? 'గ్రామ సమన్వయకర్త మొబైల్' : 'Admin Coordinator Mobile'} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      maxLength={10}
                      value={adminPhone}
                      onChange={(e) => setAdminPhone(e.target.value)}
                      placeholder="9848011223"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Admin Passkey */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isTelugu ? 'అధికారిక సెక్యూరిటీ పాస్‌కీ' : 'Official Security Passkey'} *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      value={adminPasskey}
                      onChange={(e) => setAdminPasskey(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Confirmation Checkbox */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirmedPanchayatAuth}
                      onChange={(e) => setConfirmedPanchayatAuth(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded mt-0.5"
                    />
                    <span className="text-[11px] text-slate-600 leading-snug">
                      {isTelugu
                        ? 'నేను అధికారిక గ్రామ పంచాయతీ / సేవాసేతు సమన్వయకర్తగా బాధ్యతాయుతంగా లాగిన్ అవుతున్నానని ధృవీకరిస్తున్నాను.'
                        : 'I verify that I am an authorized village coordinator logging into the localized administration console.'}
                    </span>
                  </label>
                </div>

                {/* Submit Admin Button */}
                <button
                  type="submit"
                  disabled={isLoading || !confirmedPanchayatAuth}
                  className="w-full py-3.5 bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{isLoading ? 'Verifying Clearance...' : isTelugu ? 'గ్రామ అడ్మిన్ కమాండ్ సెంటర్‌లోకి ప్రవేశించండి' : 'Enter Village Command Center'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* 1-Click Fast Admin Demo */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {isTelugu ? 'పరీక్షించడానికి డైరెక్ట్ లింక్:' : 'Quick Testing Demo:'}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('village_admin', '/dashboard/village-admin')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-900 text-xs font-bold transition-colors"
                >
                  {isTelugu ? 'వి. రాంబాబు నాయుడు (చించినాడ అడ్మిన్)' : 'V. Rambabu Naidu (Admin)'}
                </button>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* 5. SUPER ADMIN (STATE CONSOLE) LOGIN EXPERIENCE           */}
          {/* ========================================================= */}
          {selectedRole === 'super_admin' && (
            <div className="space-y-5">
              
              {/* Role Hero Banner */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-start gap-3.5 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-rose-500/20 blur-xl pointer-events-none" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shrink-0 shadow-sm font-black text-lg">
                  <Crown className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-sm font-extrabold text-white">
                      {isTelugu ? 'ఆంధ్రప్రదేశ్ స్టేట్ మాస్టర్ కంట్రోల్' : 'State Platform Master Console'}
                    </h2>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-rose-500 text-white tracking-widest uppercase">
                      Level-1
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {isTelugu
                      ? 'రాష్ట్రంలోని అన్ని జిల్లాలు, మండలాలు, గ్రామ పాలసీలు మరియు ఆదాయ అనలిటిక్స్ నిర్వహణ.'
                      : 'Multi-district governance, state-wide analytics, ad revenue approvals, and core database controls.'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleRoleLogin} className="space-y-4">
                
                {/* Admin Enterprise Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isTelugu ? 'స్టేట్ అడ్మిన్ అధికారిక ఇమెయిల్' : 'State Administrator Email'} *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={superEmail}
                      onChange={(e) => setSuperEmail(e.target.value)}
                      placeholder="admin@sevasetu.ap.gov.in"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                {/* Master Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isTelugu ? 'ఎన్‌క్రిప్టెడ్ మాస్టర్ పాస్‌వర్డ్' : 'Encrypted Master Password'} *
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      value={superPassword}
                      onChange={(e) => setSuperPassword(e.target.value)}
                      placeholder="••••••••••••••••"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                {/* TOTP Hardware 2FA Code */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {isTelugu ? '2FA హార్డ్‌వేర్ / యాప్ సెక్యూరిటీ టోకెన్ (6 అంకెలు)' : '6-Digit TOTP / Hardware Security Token'} *
                  </label>
                  <div className="relative">
                    <Radio className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      maxLength={6}
                      value={totpToken}
                      onChange={(e) => setTotpToken(e.target.value)}
                      placeholder="849201"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 tracking-widest text-center font-mono font-bold transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Security Audit Badge */}
                <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-[11px] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Audit IP Session Logging Active</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">TLS 1.3 Strict</span>
                </div>

                {/* Submit Super Admin Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-slate-950 hover:bg-black text-white text-sm font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>{isLoading ? 'Authenticating Clearance...' : isTelugu ? 'మాస్టర్ కంట్రోల్ సెంటర్‌లోకి ప్రవేశించండి' : 'Access State Master Console'}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </form>

              {/* 1-Click Fast Super Admin Demo */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {isTelugu ? 'పరీక్షించడానికి డైరెక్ట్ లింక్:' : 'Quick Testing Demo:'}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('super_admin', '/dashboard/super-admin')}
                  className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-900 text-xs font-bold transition-colors"
                >
                  {isTelugu ? 'స్టేట్ డైరెక్టర్ (మాస్టర్)' : 'State Director (Master)'}
                </button>
              </div>

            </div>
          )}

          {/* Registration link at bottom */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
            <span>{t('auth.dontHaveAccount')} </span>
            <Link
              href={`/auth/register?role=${selectedRole}`}
              className="font-bold text-primary hover:underline ml-1"
            >
              {isTelugu ? 'ఇప్పుడే కొత్తగా నమోదు చేసుకోండి' : 'Register a New Account'}
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-slate-500">Loading SevaSetu Portals...</div>}>
      <LoginForm />
    </Suspense>
  );
}
