'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import {
  Home,
  FileText,
  Settings,
  Sparkles,
  Briefcase,
  Wrench,
  Store,
  Landmark,
  Crown,
  LogIn,
  CheckCircle,
  Package,
  Layers,
  Search,
  Gift,
  BarChart3,
  TrendingUp,
  HelpCircle,
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { isTelugu, t } = useLanguage();
  const { role, isLoggedIn } = useAuth();

  // Role-specific bottom navigation structure
  interface NavItem {
    id: string;
    href: string;
    labelEn: string;
    labelTe: string;
    icon: any;
    isActive: boolean;
    activeGradient: string;
  }

  let navItems: NavItem[] = [];

  if (role === 'provider') {
    navItems = [
      {
        id: 'pro_hub',
        href: '/dashboard/provider',
        labelEn: 'Pro Hub',
        labelTe: 'ప్రో హబ్',
        icon: Wrench,
        isActive: pathname === '/dashboard/provider',
        activeGradient: 'from-emerald-500 to-teal-600',
      },
      {
        id: 'pro_jobs',
        href: '/dashboard/provider?tab=requests',
        labelEn: 'Requests',
        labelTe: 'కోరికలు',
        icon: FileText,
        isActive: pathname.includes('requests') || pathname === '/orders',
        activeGradient: 'from-amber-500 to-orange-600',
      },
      {
        id: 'services',
        href: '/services',
        labelEn: 'Explore',
        labelTe: 'అన్వేషించండి',
        icon: Search,
        isActive: pathname.startsWith('/services'),
        activeGradient: 'from-blue-500 to-indigo-600',
      },
      {
        id: 'settings',
        href: '/settings',
        labelEn: 'Settings',
        labelTe: 'సెట్టింగ్స్',
        icon: Settings,
        isActive: pathname.startsWith('/settings'),
        activeGradient: 'from-purple-500 to-indigo-600',
      },
    ];
  } else if (role === 'business') {
    navItems = [
      {
        id: 'biz_hub',
        href: '/dashboard/business',
        labelEn: 'Store Hub',
        labelTe: 'స్టోర్ హబ్',
        icon: Store,
        isActive: pathname === '/dashboard/business',
        activeGradient: 'from-violet-500 to-purple-600',
      },
      {
        id: 'biz_orders',
        href: '/dashboard/business?tab=orders',
        labelEn: 'Orders',
        labelTe: 'ఆర్డర్లు',
        icon: Package,
        isActive: pathname.includes('orders') || pathname === '/orders',
        activeGradient: 'from-amber-500 to-rose-600',
      },
      {
        id: 'businesses',
        href: '/businesses',
        labelEn: 'Shops',
        labelTe: 'దుకాణాలు',
        icon: Search,
        isActive: pathname.startsWith('/businesses'),
        activeGradient: 'from-blue-500 to-indigo-600',
      },
      {
        id: 'settings',
        href: '/settings',
        labelEn: 'Settings',
        labelTe: 'సెట్టింగ్స్',
        icon: Settings,
        isActive: pathname.startsWith('/settings'),
        activeGradient: 'from-emerald-500 to-teal-600',
      },
    ];
  } else if (role === 'village_admin') {
    navItems = [
      {
        id: 'admin_hub',
        href: '/dashboard/village-admin',
        labelEn: 'Admin Hub',
        labelTe: 'గ్రామ హబ్',
        icon: Landmark,
        isActive: pathname === '/dashboard/village-admin' && !pathname.includes('tab=analytics'),
        activeGradient: 'from-indigo-600 to-blue-700',
      },
      {
        id: 'admin_analytics',
        href: '/dashboard/village-admin?tab=analytics',
        labelEn: 'Analytics',
        labelTe: 'విశ్లేషణలు',
        icon: BarChart3,
        isActive: pathname.includes('tab=analytics'),
        activeGradient: 'from-emerald-500 to-teal-600',
      },
      {
        id: 'admin_support',
        href: '/dashboard/village-admin?tab=support',
        labelEn: 'Support',
        labelTe: 'ఫిర్యాదులు',
        icon: HelpCircle,
        isActive: pathname.includes('tab=support'),
        activeGradient: 'from-rose-500 to-pink-600',
      },
      {
        id: 'settings',
        href: '/settings',
        labelEn: 'Settings',
        labelTe: 'సెట్టింగ్స్',
        icon: Settings,
        isActive: pathname.startsWith('/settings'),
        activeGradient: 'from-purple-500 to-indigo-600',
      },
    ];
  } else if (role === 'super_admin') {
    navItems = [
      {
        id: 'super_hub',
        href: '/dashboard/super-admin',
        labelEn: 'State Hub',
        labelTe: 'రాష్ట్ర హబ్',
        icon: Crown,
        isActive: pathname === '/dashboard/super-admin' && !pathname.includes('tab=analytics'),
        activeGradient: 'from-purple-600 to-pink-600',
      },
      {
        id: 'super_analytics',
        href: '/dashboard/super-admin?tab=analytics',
        labelEn: 'Analytics',
        labelTe: 'విశ్లేషణలు',
        icon: BarChart3,
        isActive: pathname.includes('tab=analytics'),
        activeGradient: 'from-emerald-500 to-teal-600',
      },
      {
        id: 'rewards_config',
        href: '/dashboard/super-admin?tab=rewards_config',
        labelEn: 'Rewards',
        labelTe: 'రివార్డులు',
        icon: Gift,
        isActive: pathname.includes('tab=rewards_config'),
        activeGradient: 'from-amber-500 to-orange-600',
      },
      {
        id: 'settings',
        href: '/settings',
        labelEn: 'Settings',
        labelTe: 'సెట్టింగ్స్',
        icon: Settings,
        isActive: pathname.startsWith('/settings'),
        activeGradient: 'from-slate-600 to-slate-800',
      },
    ];
  } else if (isLoggedIn) {
    // Standard Customer
    navItems = [
      {
        id: 'home',
        href: '/',
        labelEn: 'Home',
        labelTe: 'హోమ్',
        icon: Home,
        isActive: pathname === '/',
        activeGradient: 'from-blue-600 to-indigo-700',
      },
      {
        id: 'services',
        href: '/services',
        labelEn: 'Services',
        labelTe: 'సేవలు',
        icon: Briefcase,
        isActive: pathname.startsWith('/services'),
        activeGradient: 'from-blue-500 to-teal-600',
      },
      {
        id: 'rewards',
        href: '/rewards',
        labelEn: 'Rewards',
        labelTe: 'రివార్డులు',
        icon: Gift,
        isActive: pathname.startsWith('/rewards'),
        activeGradient: 'from-amber-400 to-amber-600',
      },
      {
        id: 'bookings',
        href: '/dashboard/customer',
        labelEn: 'Bookings',
        labelTe: 'బుకింగ్స్',
        icon: FileText,
        isActive: pathname === '/dashboard/customer' || pathname === '/orders',
        activeGradient: 'from-emerald-500 to-teal-600',
      },
      {
        id: 'settings',
        href: '/settings',
        labelEn: 'Settings',
        labelTe: 'సెట్టింగ్స్',
        icon: Settings,
        isActive: pathname.startsWith('/settings'),
        activeGradient: 'from-purple-500 to-indigo-600',
      },
    ];
  } else {
    // Guest User
    navItems = [
      {
        id: 'home',
        href: '/',
        labelEn: 'Home',
        labelTe: 'హోమ్',
        icon: Home,
        isActive: pathname === '/',
        activeGradient: 'from-blue-600 to-indigo-700',
      },
      {
        id: 'services',
        href: '/services',
        labelEn: 'Services',
        labelTe: 'సేవలు',
        icon: Briefcase,
        isActive: pathname.startsWith('/services'),
        activeGradient: 'from-emerald-500 to-teal-600',
      },
      {
        id: 'rewards',
        href: '/rewards',
        labelEn: 'Rewards',
        labelTe: 'రివార్డులు',
        icon: Gift,
        isActive: pathname.startsWith('/rewards'),
        activeGradient: 'from-amber-400 to-amber-600',
      },
      {
        id: 'login',
        href: '/auth/login',
        labelEn: 'Login',
        labelTe: 'లాగిన్',
        icon: LogIn,
        isActive: pathname.startsWith('/auth/login'),
        activeGradient: 'from-amber-500 to-orange-600',
      },
      {
        id: 'settings',
        href: '/settings',
        labelEn: 'Settings',
        labelTe: 'సెట్టింగ్స్',
        icon: Settings,
        isActive: pathname.startsWith('/settings'),
        activeGradient: 'from-purple-500 to-indigo-600',
      },
    ];
  }

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pointer-events-none flex justify-center px-3"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))' }}
    >
      <nav className="pointer-events-auto w-full max-w-md bg-slate-900/95 text-white shadow-2xl px-3 py-2 flex items-center justify-around border border-white/15 rounded-2xl backdrop-blur-xl">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.isActive) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r ${item.activeGradient} text-white font-black text-xs shadow-md transition-all scale-105`}
              >
                <Icon className="w-4 h-4 text-white stroke-[2.5px] shrink-0" />
                <span className="truncate">{isTelugu ? item.labelTe : item.labelEn}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white transition-colors gap-0.5 group"
              title={isTelugu ? item.labelTe : item.labelEn}
            >
              <Icon className="w-5 h-5 stroke-[2px] group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-medium hidden xs:inline">{isTelugu ? item.labelTe : item.labelEn}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
