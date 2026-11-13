'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { UserRole } from '@/data/types';
import { ShieldCheck, UserCheck, Wrench, Store, Landmark, Crown, Eye, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const RoleSwitcherBar: React.FC = () => {
  const { role, switchRole, currentUser } = useAuth();
  const { isTelugu } = useLanguage();
  const pathname = usePathname();

  const roles: { key: UserRole; labelEn: string; labelTe: string; icon: any; color: string; href: string }[] = [
    { key: 'guest', labelEn: 'Guest Visitor', labelTe: 'సందర్శకుడు', icon: Eye, color: 'text-slate-600', href: '/' },
    { key: 'customer', labelEn: 'Customer', labelTe: 'వినియోగదారుడు', icon: UserCheck, color: 'text-blue-600', href: '/dashboard/customer' },
    { key: 'provider', labelEn: 'Provider', labelTe: 'సేవా నిపుణుడు', icon: Wrench, color: 'text-emerald-600', href: '/dashboard/provider' },
    { key: 'business', labelEn: 'Business', labelTe: 'వ్యాపారస్తుడు', icon: Store, color: 'text-amber-600', href: '/dashboard/business' },
    { key: 'village_admin', labelEn: 'Village Admin', labelTe: 'గ్రామ అడ్మిన్', icon: Landmark, color: 'text-indigo-600', href: '/dashboard/village-admin' },
    { key: 'super_admin', labelEn: 'Super Admin', labelTe: 'సూపర్ అడ్మిన్', icon: Crown, color: 'text-purple-600', href: '/dashboard/super-admin' },
  ];

  const getDashboardHref = () => {
    switch (role) {
      case 'provider':
        return '/dashboard/provider';
      case 'business':
        return '/dashboard/business';
      case 'village_admin':
        return '/dashboard/village-admin';
      case 'super_admin':
        return '/dashboard/super-admin';
      case 'customer':
        return '/dashboard/customer';
      default:
        return '/';
    }
  };

  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar scrollbar-none">
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-300 text-[11px] sm:text-xs whitespace-nowrap">
            {isTelugu ? 'పాత్ర మార్పు:' : 'Role Switcher:'}
          </span>
          {currentUser?.villageName && role === 'village_admin' && (
            <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-[10px] sm:text-[11px] border border-indigo-500/30 whitespace-nowrap">
              {currentUser.villageName}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto no-scrollbar scrollbar-none">
          {roles.map((item) => {
            const Icon = item.icon;
            const isActive = role === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => switchRole(item.key)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? item.color : 'text-slate-400'}`} />
                <span>{isTelugu ? item.labelTe : item.labelEn}</span>
              </button>
            );
          })}

          {role !== 'guest' && (
            <Link
              href={getDashboardHref()}
              className="ml-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-[11px] transition-colors"
            >
              <span>{isTelugu ? 'డ్యాష్‌బోర్డ్' : 'Dashboard'}</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
