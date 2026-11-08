'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Home, FileText, Settings, Sparkles } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { isTelugu, t } = useLanguage();

  const isHome = pathname === '/';
  const isOrders = pathname.startsWith('/orders');
  const isSettings = pathname.startsWith('/settings');

  const navItems = [
    {
      id: 'home',
      href: '/',
      labelEn: 'Home',
      labelTe: 'హోమ్',
      icon: Home,
      isActive: isHome,
    },
    {
      id: 'orders',
      href: '/orders',
      labelEn: 'Orders',
      labelTe: 'ఆర్డర్లు',
      icon: FileText,
      isActive: isOrders,
    },
    {
      id: 'settings',
      href: '/settings',
      labelEn: 'Settings',
      labelTe: 'సెట్టింగ్స్',
      icon: Settings,
      isActive: isSettings,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none flex justify-center">
      <nav className="pointer-events-auto w-full max-w-md bg-[#28325E] text-white shadow-2xl px-4 py-2.5 flex items-center justify-around border-t sm:border border-white/15 sm:rounded-2xl sm:mb-3 backdrop-blur-lg">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.isActive) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 text-white font-black text-xs shadow-inner backdrop-blur-md transition-all scale-105"
              >
                <Icon className="w-4 h-4 text-white stroke-[2.5px]" />
                <span>{isTelugu ? item.labelTe : item.labelEn}</span>
                {item.id === 'settings' && <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
              </Link>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center justify-center p-2.5 rounded-full text-white/70 hover:text-white transition-colors"
              title={item.labelEn}
            >
              <Icon className="w-5 h-5 stroke-[2px]" />
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
