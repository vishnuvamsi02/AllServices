'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { LanguageSelector } from '../common/LanguageSelector';
import { LocationSelector } from '../common/LocationSelector';
import {
  Menu,
  X,
  User,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Building2,
  Briefcase,
  Store,
  Home,
  HelpCircle,
  FileText,
  Settings,
  ArrowLeft,
  Bell,
  Gift,
  CheckCircle2,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t, isTelugu } = useLanguage();
  const { currentUser, role, isLoggedIn, logout } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useMarketplace();
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Dedicated app screens that manage their own mobile app top bars
  if (pathname === '/' || pathname?.startsWith('/settings') || pathname === '/orders') {
    return null;
  }

  const getDashboardLink = () => {
    switch (role) {
      case 'village_admin':
        return '/dashboard/village-admin';
      case 'super_admin':
        return '/dashboard/super-admin';
      case 'provider':
        return '/dashboard/provider';
      case 'business':
        return '/dashboard/business';
      case 'customer':
      default:
        return '/dashboard/customer';
    }
  };

  const navLinks = [
    { href: '/', label: t('nav.home'), icon: Home, color: 'text-blue-500 bg-blue-50' },
    { href: '/services', label: t('nav.services'), icon: Briefcase, color: 'text-amber-500 bg-amber-50' },
    { href: '/rewards', label: isTelugu ? 'నెలవారీ రివార్డులు' : 'Monthly Rewards', icon: Gift, color: 'text-amber-500 bg-amber-50' },
    { href: '/categories', label: t('nav.categories'), icon: Briefcase, color: 'text-indigo-500 bg-indigo-50' },
    { href: '/properties', label: t('nav.properties'), icon: Building2, color: 'text-emerald-500 bg-emerald-50' },
    { href: '/businesses', label: t('nav.businesses'), icon: Store, color: 'text-purple-500 bg-purple-50' },
    { href: '/how-it-works', label: t('nav.howItWorks'), icon: HelpCircle, color: 'text-rose-500 bg-rose-50' },
  ];

  const getPageTitle = () => {
    if (pathname.startsWith('/services')) return isTelugu ? 'గ్రామ సేవలు' : 'Village Services';
    if (pathname.startsWith('/properties')) return isTelugu ? 'ఆస్తులు & భూములు' : 'Properties & Lands';
    if (pathname.startsWith('/businesses')) return isTelugu ? 'గ్రామ దుకాణాలు' : 'Local Businesses';
    if (pathname.startsWith('/categories')) return isTelugu ? 'అన్ని విభాగాలు' : 'All Categories';
    if (pathname.startsWith('/how-it-works')) return isTelugu ? 'ఎలా పనిచేస్తుంది' : 'How It Works';
    if (pathname.startsWith('/dashboard/customer')) return isTelugu ? 'వినియోగదారు పోర్టల్' : 'Customer Portal';
    if (pathname.startsWith('/dashboard/provider')) return isTelugu ? 'సేవా నిపుణుడి పోర్టల్' : 'Provider Portal';
    if (pathname.startsWith('/dashboard/business')) return isTelugu ? 'వ్యాపార పోర్టల్' : 'Business Portal';
    if (pathname.startsWith('/dashboard/village-admin')) return isTelugu ? 'గ్రామ అడ్మిన్' : 'Village Admin';
    if (pathname.startsWith('/dashboard/super-admin')) return isTelugu ? 'సూపర్ అడ్మిన్' : 'Super Admin';
    if (pathname.startsWith('/auth/login')) return isTelugu ? 'లాగిన్' : 'Login';
    if (pathname.startsWith('/auth/register')) return isTelugu ? 'నమోదు' : 'Register';
    return isTelugu ? 'సేవాసేతు' : 'SevaSetu';
  };

  const isCategoriesPage = pathname === '/categories';

  return (
    <>
      {/* Mobile App Header for sub-pages (hidden on categories where categories page renders its own search header) */}
      {!isCategoriesPage && (
        <div className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between shadow-xs">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 -ml-1 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            title="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-black text-slate-900 tracking-tight truncate max-w-[200px]">
            {getPageTitle()}
          </h1>
          <div className="flex items-center gap-1.5">
            <Link
              href="/rewards"
              className="p-2 rounded-xl text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors"
              title="Rewards"
            >
              <Gift className="w-4 h-4 fill-amber-400" />
            </Link>
            <LanguageSelector compact />
          </div>
        </div>
      )}

      {/* Desktop Header for wide screens */}
      <header className="hidden lg:block sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20 gap-2">
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-[#0f3d6c] flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
                  <span className="font-extrabold text-2xl tracking-tighter">సే</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl sm:text-2xl text-primary leading-none tracking-tight">
                    {isTelugu ? 'సేవాసేతు' : 'SevaSetu'}
                  </span>
                  <span className="text-[11px] font-semibold text-secondary tracking-wide mt-0.5">
                    {isTelugu ? 'ఆంధ్రప్రదేశ్ గ్రామీణ సేవా వేదిక' : 'Rural AP & Town Marketplace'}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Controls: Location + Language + Auth */}
            <div className="flex items-center gap-2.5">
              <LocationSelector variant="header" />
              <LanguageSelector />

              {/* In-App Notifications Bell Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-primary transition-all relative"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center animate-pulse">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setNotificationsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                        <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                          Notifications ({notifications.length})
                        </span>
                        {unreadNotificationsCount > 0 && (
                          <button
                            type="button"
                            onClick={() => markAllNotificationsRead(currentUser?.id || 'cust_101')}
                            className="text-[11px] font-bold text-primary hover:underline"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>

                      <div className="max-h-64 overflow-y-auto space-y-2">
                        {notifications.length === 0 ? (
                          <p className="text-xs text-slate-400 text-center py-4">No notifications yet.</p>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              onClick={() => markNotificationRead(n.id)}
                              className={`p-2.5 rounded-xl text-xs transition-colors cursor-pointer border ${
                                !n.read
                                  ? 'bg-amber-50/70 border-amber-200/80 text-slate-900'
                                  : 'bg-slate-50 border-slate-100 text-slate-600'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1 mb-0.5">
                                <span className="font-black text-slate-900 text-xs">{n.title}</span>
                                <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                              </div>
                              <p className="text-xs text-slate-600 leading-snug">{n.message}</p>
                              {n.link && (
                                <Link
                                  href={n.link}
                                  onClick={() => setNotificationsOpen(false)}
                                  className="text-[11px] font-bold text-primary hover:underline mt-1 inline-block"
                                >
                                  View Details →
                                </Link>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <Link
                href="/settings"
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-primary transition-all"
                title={t('settings.title')}
              >
                <Settings className="w-4 h-4" />
              </Link>

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-sm font-medium transition-all min-h-[44px]"
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs">
                      {currentUser?.name?.charAt(0) || 'V'}
                    </div>
                    <div className="text-left hidden md:block max-w-[120px] truncate">
                      <div className="font-bold text-xs truncate leading-tight">{currentUser?.name}</div>
                      <div className="text-[10px] text-slate-500 font-semibold uppercase">{role.replace('_', ' ')}</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </button>

                  {userDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 py-2 border-b border-slate-100 mb-1">
                          <p className="text-xs font-bold text-slate-900 truncate">{currentUser?.name}</p>
                          <p className="text-[11px] text-slate-500">{currentUser?.phone}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase">
                            {role.replace('_', ' ')}
                          </span>
                        </div>

                        <Link
                          href={getDashboardLink()}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-primary" />
                          <span>{t('nav.dashboard')}</span>
                        </Link>

                        <Link
                          href="/settings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                        >
                          <Settings className="w-4 h-4 text-slate-500" />
                          <span>{t('settings.title')}</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4 text-red-500" />
                          <span>{t('nav.logout')}</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/auth/login"
                    className="px-3.5 py-2 text-sm font-bold text-slate-700 hover:text-primary hover:bg-slate-50 rounded-xl transition-all"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-sm hover:shadow transition-all min-h-[40px] flex items-center justify-center"
                  >
                    {t('nav.register')}
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>
    </>
  );
};
