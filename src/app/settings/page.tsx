'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import Link from 'next/link';
import {
  User,
  ArrowLeft,
  Edit3,
  Megaphone,
  Heart,
  Bell,
  Briefcase,
  Headphones,
  ShieldCheck,
  Receipt,
  CreditCard,
  FileText,
  Trash2,
  Users,
  Shield,
  Info,
  FileCheck,
  LogOut,
  LogIn,
  ChevronRight,
  Store,
  X,
} from 'lucide-react';

export default function SettingsPage() {
  const { t, isTelugu } = useLanguage();
  const { currentUser, logout, isLoggedIn, role } = useAuth();
  const { favorites, showToast } = useMarketplace();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const isGuest = !isLoggedIn || role === 'guest';
  const userName = isGuest ? (isTelugu ? 'సందర్శకుడు' : 'Guest Visitor') : (currentUser?.name || 'User');
  const userSubtitle = isGuest ? (isTelugu ? 'లాగిన్ లేదా సైన్ అప్ చేయండి' : 'Login or Sign up to access account') : (currentUser?.phone || currentUser?.email || 'Logged in');

  const menuItems = [
    {
      id: 'edit_profile',
      labelEn: 'Edit Profile',
      labelTe: 'ప్రొఫైల్ సవరణ',
      href: '/settings/edit-profile',
      icon: User,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      id: 'market_brand',
      labelEn: 'Market Your Product/Brand',
      labelTe: 'వ్యాపార ప్రమోషన్ / ప్రకటనలు',
      href: '/settings/market-brand',
      icon: Megaphone,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      id: 'shortlisted_properties',
      labelEn: 'shortlisted_properties',
      labelTe: 'ఇష్టపడిన ఆస్తులు',
      href: '/settings/shortlisted-properties',
      icon: Heart,
      color: 'bg-sky-50 text-sky-600',
      badge: favorites.properties.length > 0 ? `${favorites.properties.length}` : undefined,
    },
    {
      id: 'notification_settings',
      labelEn: 'notification_settings',
      labelTe: 'నోటిఫికేషన్ సెట్టింగ్స్',
      href: '/settings/notifications',
      icon: Bell,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      id: 'publish_business',
      labelEn: 'publish_business',
      labelTe: 'వ్యాపారాన్ని ప్రచురించండి',
      href: '/settings/publish-business',
      icon: Briefcase,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      id: 'raise_ticket',
      labelEn: 'Raise a Ticket',
      labelTe: 'సహాయం కోసం టికెట్',
      href: '/settings/raise-ticket',
      icon: Headphones,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      id: 'verify_account',
      labelEn: 'Verify Your Account',
      labelTe: 'ఖాతా ధృవీకరణ (సచివాలయం)',
      href: '/settings/verify-account',
      icon: ShieldCheck,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      id: 'privacy_policy',
      labelEn: 'Privacy Policy',
      labelTe: 'గోప్యతా విధానం',
      href: '/settings/privacy-policy',
      icon: Shield,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      id: 'about_us',
      labelEn: 'About Us',
      labelTe: 'గ్రామసేవ గురించి',
      href: '/settings/about',
      icon: Info,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      id: 'terms_conditions',
      labelEn: 'Terms and Conditions',
      labelTe: 'నిబంధనలు & షరతులు',
      href: '/settings/terms',
      icon: FileCheck,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      id: 'refund_policy',
      labelEn: 'Refund Policy',
      labelTe: 'రీఫండ్ విధానం',
      href: '/settings/refund-policy',
      icon: Receipt,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      id: 'subscription_model',
      labelEn: 'Subscription Model',
      labelTe: 'సభ్యత్వ విధానం (ప్లాన్లు)',
      href: '/settings/subscription-model',
      icon: CreditCard,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      id: 'properties_guidelines',
      labelEn: 'Properties Guidelines',
      labelTe: 'ఆస్తి లిస్టింగ్ మార్గదర్శకాలు',
      href: '/settings/properties-guidelines',
      icon: FileText,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      id: 'delete_account',
      labelEn: 'Delete Account',
      labelTe: 'ఖాతా తొలగింపు',
      href: '/settings/delete-account',
      icon: Trash2,
      color: 'bg-rose-50 text-rose-500',
      isDanger: true,
    },
    {
      id: 'register_agent',
      labelEn: 'register_agent',
      labelTe: 'గ్రామ ఏజెంట్‌గా నమోదు',
      href: '/settings/register-agent',
      icon: Users,
      color: 'bg-sky-50 text-sky-600',
    },
  ];

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    showToast(
      'info',
      isTelugu ? 'లాగౌట్ విజయవంతం' : 'Logged Out',
      isTelugu ? 'మీరు విజయవంతంగా లాగౌట్ అయ్యారు.' : 'You have been logged out safely.'
    );
  };

  return (
    <div className="bg-surface-bg pb-10">
      
      {/* Mobile App Top Bar matching Scazo Screen 01 / 02 / 03 */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3.5 flex items-center justify-between shadow-xs">
        <Link
          href="/"
          className="p-2 -ml-1 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          title="Back to Home"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-black text-slate-900 tracking-tight">
          {isTelugu ? 'సెట్టింగ్స్' : 'Settings'}
        </h1>
        <LanguageSelector compact />
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        
        {/* Profile Card Header matching Scazo Screen 01, 02, 03 */}
        {isGuest ? (
          <div className="rounded-3xl bg-gradient-to-br from-[#28325E] to-[#1E2648] text-white p-5 shadow-lg border border-white/10 relative overflow-hidden">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0 border border-white/20">
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-black tracking-tight truncate">
                  {userName}
                </h2>
                <p className="text-xs text-white/70 mt-0.5">
                  {userSubtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
              <Link
                href="/auth/login"
                className="py-2.5 px-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-center text-xs font-bold shadow transition-all flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{isTelugu ? 'లాగిన్' : 'Login'}</span>
              </Link>
              <Link
                href="/auth/register"
                className="py-2.5 px-3 rounded-xl bg-white/20 hover:bg-white/30 text-white text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>{isTelugu ? 'సైన్ అప్' : 'Sign Up'}</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-[#374174] text-white p-5 shadow-lg border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-14 h-14 rounded-full bg-white text-[#374174] flex items-center justify-center font-black text-2xl shadow-md shrink-0">
                  <User className="w-7 h-7 text-[#374174]" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-black tracking-tight truncate">
                    {userName}
                  </h2>
                  <p className="text-xs text-white/80 truncate mt-0.5">
                    {userSubtitle}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-black bg-white/20 text-white uppercase tracking-wider">
                    {role.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <Link
                href="/settings/edit-profile"
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all shrink-0"
                title="Edit Profile"
              >
                <Edit3 className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}

        {/* Administrator Portal Access Card */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-5 shadow-lg border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0">
              <ShieldCheck className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="text-xs font-black block text-amber-300">
                {isTelugu ? 'అధికారిక అడ్మినిస్ట్రేటర్ పోర్టల్' : 'Administrator Command & Analytics'}
              </span>
              <p className="text-[11px] text-slate-300 leading-snug">
                {isTelugu ? 'గ్రామ పంచాయతీ & రాష్ట్ర స్థాయి సూపర్ అడ్మిన్ లాగిన్ మరియు విశ్లేషణలు' : 'Access Village Admin, Super Admin console, and real-time analytics'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/admin/analytics"
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
            >
              Analytics 📊
            </Link>
            <Link
              href="/admin/login"
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-xs transition-colors flex items-center gap-1"
            >
              <span>Admin Login</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Menu Items List matching Scazo Screen 01 / 02 / 03 */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden divide-y divide-slate-100">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const label = isTelugu ? item.labelTe : item.labelEn;

            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-2xl ${item.color} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2px]" />
                  </div>
                  <span
                    className={`text-sm font-bold truncate ${
                      item.isDanger ? 'text-rose-500' : 'text-slate-800 group-hover:text-primary'
                    }`}
                  >
                    {label}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.badge && (
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                      item.isDanger ? 'text-rose-400' : 'text-slate-400'
                    }`}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Auth Action Button */}
        <div className="pt-2">
          {isGuest ? (
            <Link
              href="/auth/login"
              className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-xs"
            >
              <LogIn className="w-4 h-4" />
              <span>{isTelugu ? 'లాగిన్ / సైన్ అప్' : 'Login / Sign Up'}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#FFF1F2] border border-rose-200/80 hover:bg-rose-100/80 text-rose-600 font-extrabold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>{isTelugu ? 'లాగౌట్ చేయండి' : 'Logout'}</span>
            </button>
          )}
        </div>

      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900">
                {isTelugu ? 'లాగౌట్ నిర్ధారణ' : 'Confirm Logout'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isTelugu ? 'మీరు ఖచ్చితంగా లాగౌట్ చేయాలనుకుంటున్నారా?' : 'Are you sure you want to log out of your account?'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                {isTelugu ? 'రద్దు' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md hover:bg-rose-700"
              >
                {isTelugu ? 'లాగౌట్' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
