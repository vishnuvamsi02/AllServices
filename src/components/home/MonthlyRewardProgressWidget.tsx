'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  Gift,
  Award,
  Sparkles,
  Droplets,
  Snowflake,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import Link from 'next/link';

export const MonthlyRewardProgressWidget: React.FC = () => {
  const { isTelugu } = useLanguage();
  const { currentUser, isLoggedIn } = useAuth();
  const { getMonthlyRewardProgress } = useMarketplace();

  const customerId = currentUser?.id || 'cust_101';
  const progress = getMonthlyRewardProgress(customerId, 11, 2026);

  return (
    <div className="my-6 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0A192F] text-white p-5 sm:p-7 shadow-xl border border-amber-400/30 relative overflow-hidden group">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Progress Content */}
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-xs">
              <Gift className="w-3.5 h-3.5 fill-current" />
              <span>{isTelugu ? 'నెలవారీ లాయల్టీ రివార్డ్ ప్రోగ్రామ్' : 'Monthly Loyalty Rewards'}</span>
            </span>
            <span className="text-xs font-bold text-amber-300">
              {progress.monthName} 2026
            </span>
          </div>

          <div className="flex items-baseline gap-2.5">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              {progress.eligibleServiceCount} / {progress.requiredCount} {isTelugu ? 'సేవలు పూర్తయ్యాయి' : 'Services Completed'}
            </h3>
            <span className="text-sm font-extrabold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
              {progress.progressPercent}%
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            {progress.rewardUnlocked ? (
              <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                {isTelugu
                  ? 'మీరు 10 సేవలను పూర్తి చేశారు! మీ ఉచిత రివార్డును క్లెయిమ్ చేయండి!'
                  : 'Milestone reached! Claim your FREE Bike Wash, 1L Engine Oil, or AC Cleaning now!'}
              </span>
            ) : (
              <span>
                {isTelugu
                  ? `మీ ఉచిత రివార్డును అన్‌లాక్ చేయడానికి ఇంకా ${progress.remainingCount} పూర్తయిన సేవలు అవసరం!`
                  : `${progress.remainingCount} more completed services to unlock your free reward (Free Bike Wash, 1L Engine Oil, or AC Clean)!`}
              </span>
            )}
          </p>

          {/* 10-Segment Micro Bar */}
          <div className="pt-1 flex items-center gap-1 max-w-md">
            {Array.from({ length: 10 }).map((_, idx) => {
              const isFilled = idx < progress.eligibleServiceCount;
              return (
                <div
                  key={idx}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    isFilled ? 'bg-gradient-to-r from-emerald-400 to-teal-400 shadow-xs' : 'bg-white/20'
                  }`}
                  title={`Service #${idx + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* Right CTA Action */}
        <div className="shrink-0 flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-2.5">
          <Link
            href="/rewards"
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <Gift className="w-4 h-4 fill-current" />
            <span>{progress.rewardUnlocked ? 'Claim Free Reward 🏆' : 'View Reward Progress 🎁'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <span className="text-[11px] text-slate-400">
            ★ Only provider-confirmed completions count
          </span>
        </div>

      </div>
    </div>
  );
};
