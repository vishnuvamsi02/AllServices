'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { MOCK_VILLAGES } from '@/data/mockData';
import {
  ShieldCheck,
  Landmark,
  Crown,
  Lock,
  Phone,
  Mail,
  KeyRound,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  MapPin,
  Eye,
  EyeOff,
  Building2,
  FileCheck2,
  UserCheck,
  ChevronRight,
  Layers,
} from 'lucide-react';
import Link from 'next/link';

function AdminLoginContent() {
  const { isTelugu } = useLanguage();
  const { adminLogin, role, isLoggedIn, switchRole } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [adminType, setAdminType] = useState<'village_admin' | 'super_admin'>('village_admin');

  // Village Admin state
  const [selectedVillageId, setSelectedVillageId] = useState('v_kaza');
  const [villageOfficerPhone, setVillageOfficerPhone] = useState('9848011223');
  const [villagePasscode, setVillagePasscode] = useState('panchayat#2026');
  const [showVillagePass, setShowVillagePass] = useState(false);
  const [panchayatConsent, setPanchayatConsent] = useState(true);

  // Super Admin state
  const [superEmail, setSuperEmail] = useState('admin@sevasetu.ap.gov.in');
  const [superPassword, setSuperPassword] = useState('SevaSetuMaster#AP2026');
  const [showSuperPass, setShowSuperPass] = useState(false);
  const [totpCode, setTotpCode] = useState('849201');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Auto-detect role from query params
  useEffect(() => {
    const qRole = searchParams.get('role');
    if (qRole === 'super_admin') {
      setAdminType('super_admin');
    } else if (qRole === 'village_admin') {
      setAdminType('village_admin');
    }
  }, [searchParams]);

  const handleVillageAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    if (!villageOfficerPhone || villageOfficerPhone.length < 10) {
      setErrorMessage(isTelugu ? 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ ఇవ్వండి' : 'Please enter valid 10-digit registered officer mobile number');
      setIsLoading(false);
      return;
    }

    if (!villagePasscode || villagePasscode.length < 4) {
      setErrorMessage(isTelugu ? 'దయచేసి గ్రామ అడ్మిన్ పాస్‌కోడ్ నమోదు చేయండి' : 'Please enter valid security passcode');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const res = adminLogin('village_admin', {
        villageId: selectedVillageId,
        phoneOrEmail: villageOfficerPhone,
        passkeyOrPin: villagePasscode,
      });

      setIsLoading(false);
      if (res.success) {
        setSuccessMessage(isTelugu ? 'ధృవీకరణ విజయవంతమైంది! గ్రామ అడ్మిన్ డాష్‌బోర్డుకు మళ్లుతున్నారు...' : 'Authorization verified! Redirecting to Village Admin Dashboard...');
        setTimeout(() => {
          router.push('/dashboard/village-admin');
        }, 500);
      } else {
        setErrorMessage(res.error || 'Authentication failed');
      }
    }, 450);
  };

  const handleSuperAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    if (!superEmail || !superEmail.includes('@')) {
      setErrorMessage(isTelugu ? 'సరైన అధికారిక ఇమెయిల్ ఇవ్వండి' : 'Please enter valid state administration email');
      setIsLoading(false);
      return;
    }

    if (!superPassword || superPassword.length < 6) {
      setErrorMessage(isTelugu ? 'మాస్టర్ పాస్‌వర్డ్ ఇవ్వండి' : 'Please enter administrative master password');
      setIsLoading(false);
      return;
    }

    if (!totpCode || totpCode.length < 6) {
      setErrorMessage(isTelugu ? '6-అంకెల 2FA కోడ్ ఇవ్వండి' : 'Please enter 6-digit 2FA token');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const res = adminLogin('super_admin', {
        phoneOrEmail: superEmail,
        passkeyOrPin: superPassword,
        totpToken: totpCode,
      });

      setIsLoading(false);
      if (res.success) {
        setSuccessMessage(isTelugu ? 'స్టేట్ అడ్మిన్ ధృవీకరణ పూర్తయింది! డాష్‌బోర్డుకు మళ్లుతున్నారు...' : 'State Command access granted! Redirecting to Super Admin Dashboard...');
        setTimeout(() => {
          router.push('/dashboard/super-admin');
        }, 500);
      } else {
        setErrorMessage(res.error || 'Authentication failed');
      }
    }, 450);
  };

  // Quick 1-Click Demo Login helpers
  const handleQuickDemoVillageAdmin = (villageId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      adminLogin('village_admin', {
        villageId,
        phoneOrEmail: '9848011223',
        passkeyOrPin: 'panchayat#2026',
      });
      setIsLoading(false);
      router.push('/dashboard/village-admin');
    }, 300);
  };

  const handleQuickDemoSuperAdmin = () => {
    setIsLoading(true);
    setTimeout(() => {
      adminLogin('super_admin', {
        phoneOrEmail: 'admin@sevasetu.ap.gov.in',
        passkeyOrPin: 'SevaSetuMaster#AP2026',
        totpToken: '849201',
      });
      setIsLoading(false);
      router.push('/dashboard/super-admin');
    }, 300);
  };

  return (
    <div className="bg-surface-bg min-h-screen pb-16 pt-3 sm:pt-6 flex flex-col items-center">
      <div className="max-w-xl w-full mx-auto px-4">
        
        {/* Top Header Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-800 relative overflow-hidden mb-5">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-52 h-52 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-52 h-52 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                సే
              </div>
              <div>
                <span className="font-extrabold text-base sm:text-lg text-white block leading-tight">
                  {isTelugu ? 'సేవాసేతు అడ్మిన్ పోర్టల్' : 'SevaSetu Admin Command'}
                </span>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                  Andhra Pradesh Administration
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <LanguageSelector compact />
            </div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold text-amber-300 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Role-Protected Administration System</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isTelugu ? 'అధికారిక లాగిన్ ప్రవేశం' : 'Secure Administrator Authentication'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              {isTelugu
                ? 'గ్రామ పంచాయతీ అడ్మిన్ లేదా ఆంధ్రప్రదేశ్ రాష్ట్ర స్థాయి సూపర్ అడ్మిన్ లాగిన్ ఎంచుకోండి.'
                : 'Access village management controls, citizen grievance resolution, and statewide performance analytics.'}
            </p>
          </div>
        </div>

        {/* Currently Logged In Indicator if already Admin */}
        {isLoggedIn && (role === 'village_admin' || role === 'super_admin') && (
          <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black block">
                  Already Logged In as {role === 'village_admin' ? 'Village Admin' : 'Super Admin'}
                </span>
                <span className="text-[11px] text-emerald-800">
                  You have full administrative privileges active.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push(role === 'village_admin' ? '/dashboard/village-admin' : '/dashboard/super-admin')}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shrink-0 transition-colors shadow-xs"
            >
              Go to Dashboard →
            </button>
          </div>
        )}

        {/* Main Admin Login Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-card">
          
          {/* Admin Role Toggle: Village Admin vs Super Admin */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => {
                setAdminType('village_admin');
                setErrorMessage('');
              }}
              className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                adminType === 'village_admin'
                  ? 'bg-white text-indigo-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Landmark className={`w-4 h-4 ${adminType === 'village_admin' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>{isTelugu ? 'గ్రామ అడ్మిన్' : 'Village Admin'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAdminType('super_admin');
                setErrorMessage('');
              }}
              className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                adminType === 'super_admin'
                  ? 'bg-slate-900 text-amber-400 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Crown className={`w-4 h-4 ${adminType === 'super_admin' ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{isTelugu ? 'సూపర్ అడ్మిన్' : 'Super Admin'}</span>
            </button>
          </div>

          {/* Feedback messages */}
          {errorMessage && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: VILLAGE ADMIN LOGIN FORM */}
          {adminType === 'village_admin' && (
            <form onSubmit={handleVillageAdminSubmit} className="space-y-4">
              
              <div className="p-3 bg-indigo-50/60 rounded-2xl border border-indigo-100 flex items-start gap-2.5 text-xs text-indigo-950 mb-1">
                <Landmark className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <p>
                  {isTelugu
                    ? 'గ్రామ పరిధిలోని మెకానిక్స్, స్థానిక దుకాణాలు, సేవా బుకింగ్‌లు మరియు రివార్డులను ధృవీకరించే పోర్టల్.'
                    : 'Authorized portal for Grama Panchayat officers to verify local technicians, inspect reward claims, and resolve citizen grievances.'}
                </p>
              </div>

              {/* Village Jurisdiction Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{isTelugu ? 'గ్రామ పరిధిని ఎంచుకోండి (Jurisdiction)' : 'Assigned Village Jurisdiction'}</span>
                </label>
                <select
                  value={selectedVillageId}
                  onChange={(e) => setSelectedVillageId(e.target.value)}
                  className="w-full py-3 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  {MOCK_VILLAGES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {isTelugu ? v.teluguName : v.name} ({v.mandal}, {v.district}) — Code: {v.code}
                    </option>
                  ))}
                </select>
              </div>

              {/* Officer Mobile Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>{isTelugu ? 'అధికారిక మొబైల్ నంబర్' : 'Registered Officer Mobile Number'}</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-bold text-xs">
                    +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={villageOfficerPhone}
                    onChange={(e) => setVillageOfficerPhone(e.target.value)}
                    placeholder="9848011223"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Security Passcode */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  <span>{isTelugu ? 'పంచాయతీ అడ్మిన్ పాస్‌కోడ్ / ఎం-పిన్' : 'Panchayat Security Passcode / PIN'}</span>
                </label>
                <div className="relative">
                  <input
                    type={showVillagePass ? 'text' : 'password'}
                    value={villagePasscode}
                    onChange={(e) => setVillagePasscode(e.target.value)}
                    placeholder="Enter admin passcode"
                    className="w-full pl-3.5 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowVillagePass(!showVillagePass)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showVillagePass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Consent checkbox */}
              <label className="flex items-start gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={panchayatConsent}
                  onChange={(e) => setPanchayatConsent(e.target.checked)}
                  className="mt-0.5 rounded text-primary focus:ring-primary"
                />
                <span className="text-[11px] text-slate-600 leading-snug">
                  {isTelugu
                    ? 'నేను ధృవీకరించబడిన గ్రామ పంచాయతీ ప్రతినిధిని అని ధృవీకరిస్తున్నాను.'
                    : 'I certify that I am an authorized Grama Panchayat officer with jurisdiction rights.'}
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !panchayatConsent}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-primary to-indigo-800 hover:from-primary-hover hover:to-indigo-900 disabled:opacity-50 text-white font-black text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <Landmark className="w-4 h-4" />
                    <span>{isTelugu ? 'గ్రామ అడ్మిన్ పోర్టల్‌లోకి ప్రవేశించండి' : 'Enter Village Admin Dashboard'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Quick 1-Tap Demo Shortcuts for Village Admin */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2 text-center">
                  ⚡ Quick Demo 1-Tap Testing:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoVillageAdmin('v_kaza')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors"
                  >
                    <span className="font-extrabold text-xs text-slate-900 block">Kaza Admin</span>
                    <span className="text-[10px] text-slate-500 block truncate">Mangalagiri Rural (v_kaza)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoVillageAdmin('v_chinchinaada')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors"
                  >
                    <span className="font-extrabold text-xs text-slate-900 block">Chinchinaada Admin</span>
                    <span className="text-[10px] text-slate-500 block truncate">West Godavari (v_chinchinaada)</span>
                  </button>
                </div>
              </div>

            </form>
          )}

          {/* TAB 2: SUPER ADMIN LOGIN FORM */}
          {adminType === 'super_admin' && (
            <form onSubmit={handleSuperAdminSubmit} className="space-y-4">
              
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-950 mb-1">
                <Crown className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  {isTelugu
                    ? 'ఆంధ్రప్రదేశ్ రాష్ట్ర స్థాయి కేంద్ర కార్యాలయ అడ్మినిస్ట్రేషన్. అన్ని గ్రామాలు, విశ్లేషణలు మరియు సిస్టమ్ కాన్ఫిగరేషన్.'
                    : 'Andhra Pradesh State Command Center. Oversee statewide analytics, all village clusters, global loyalty policies, and platform revenue.'}
                </p>
              </div>

              {/* State Directorate Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                  <span>State Administration Directorate Email</span>
                </label>
                <input
                  type="email"
                  value={superEmail}
                  onChange={(e) => setSuperEmail(e.target.value)}
                  placeholder="admin@sevasetu.ap.gov.in"
                  className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                />
              </div>

              {/* Master Administrative Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                  <span>Master Administrative Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showSuperPass ? 'text' : 'password'}
                    value={superPassword}
                    onChange={(e) => setSuperPassword(e.target.value)}
                    placeholder="Enter master password"
                    className="w-full pl-3.5 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSuperPass(!showSuperPass)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showSuperPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 2FA TOTP Code */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Hardware 2FA Security Token (TOTP)</span>
                  </label>
                  <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                    Demo Active: 849201
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value)}
                  placeholder="849201"
                  className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-black text-slate-900 tracking-widest text-center focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all font-mono"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-amber-400 font-black text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 group border border-amber-400/30"
              >
                {isLoading ? (
                  <span>Verifying Master Credentials...</span>
                ) : (
                  <>
                    <Crown className="w-4 h-4 text-amber-400" />
                    <span>Enter AP State Command Center</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Quick 1-Tap Demo Shortcuts for Super Admin */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2 text-center">
                  ⚡ Quick Demo 1-Tap Testing:
                </span>
                <button
                  type="button"
                  onClick={handleQuickDemoSuperAdmin}
                  className="w-full p-2.5 rounded-xl bg-amber-50/70 hover:bg-amber-100 border border-amber-200/80 text-left transition-colors flex items-center justify-between"
                >
                  <div>
                    <span className="font-black text-xs text-slate-900 block">AP State Director Credentials</span>
                    <span className="text-[10px] text-slate-600">admin@sevasetu.ap.gov.in • Instant State Command</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-700" />
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Bottom Switcher: Citizen/Customer Login */}
        <div className="mt-5 text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-primary transition-colors bg-white px-4 py-2 rounded-full border border-slate-200/80 shadow-xs"
          >
            <span>Not an Administrator? Switch to Citizen & Provider Login</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface-bg flex items-center justify-center p-4 text-xs font-bold text-slate-500">
          Loading Admin Command Portal...
        </div>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}
