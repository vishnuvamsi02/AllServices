'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { AnalyticsDashboardView } from '@/components/admin/AnalyticsDashboardView';
import { ShieldCheck, ArrowLeft, Crown, Landmark } from 'lucide-react';
import Link from 'next/link';

export default function AdminAnalyticsPage() {
  const { isTelugu } = useLanguage();
  const { role, isVillageAdmin, isSuperAdmin, isLoggedIn } = useAuth();

  return (
    <div className="bg-surface-bg min-h-screen pb-16 pt-3 sm:pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <Link
            href={isVillageAdmin ? '/dashboard/village-admin' : '/dashboard/super-admin'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-slate-900 text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isVillageAdmin ? 'Village Admin Scope' : 'State Executive Command'}</span>
            </span>
          </div>
        </div>

        {/* Analytics Main View */}
        <AnalyticsDashboardView
          isSuperAdmin={!isVillageAdmin}
          initialVillageScope={isVillageAdmin ? 'v_kaza' : 'all'}
        />

      </div>
    </div>
  );
}
