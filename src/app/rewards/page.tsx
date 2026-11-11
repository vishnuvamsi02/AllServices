'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  Gift,
  Award,
  Sparkles,
  Droplets,
  Snowflake,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Calendar,
  Receipt,
  QrCode,
  Tag,
  Car,
  ChevronRight,
  Check,
  Lock,
} from 'lucide-react';
import Link from 'next/link';

export default function MonthlyRewardsPage() {
  const { isTelugu } = useLanguage();
  const { currentUser, role } = useAuth();
  const {
    getMonthlyRewardProgress,
    claimMonthlyReward,
    rewardDefinitions,
    rewardClaims,
    completeBooking,
    enquiries,
  } = useMarketplace();

  const customerId = currentUser?.id || 'cust_101';
  const [selectedMonth, setSelectedMonth] = useState<number>(11); // November 2026
  const [selectedRewardId, setSelectedRewardId] = useState<string>('engine_oil_packet');
  const [showClaimSuccessModal, setShowClaimSuccessModal] = useState<string | null>(null);

  const progress = getMonthlyRewardProgress(customerId, selectedMonth, 2026);

  const handleClaim = (rewardId: string) => {
    const result = claimMonthlyReward(customerId, rewardId);
    if (result.success && result.claimId) {
      setShowClaimSuccessModal(result.claimId);
    }
  };

  const getRewardIcon = (id: string) => {
    switch (id) {
      case 'free_bike_wash':
        return Sparkles;
      case 'free_ac_cleaning':
        return Snowflake;
      case 'engine_oil_packet':
      default:
        return Droplets;
    }
  };

  // Filter claims for customer
  const myClaims = rewardClaims.filter((c) => c.customerId === customerId);

  return (
    <div className="bg-surface-bg pb-16 pt-4 sm:pt-6 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link href="/dashboard/customer" className="hover:text-primary">Customer Portal</Link>
              <span>/</span>
              <span className="font-bold text-slate-900">Monthly Rewards</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>{isTelugu ? 'నెలవారీ లాయల్టీ రివార్డులు' : 'Monthly Loyalty Rewards'}</span>
              <span className="p-1 rounded-xl bg-amber-400 text-slate-950 shadow-xs">
                <Gift className="w-5 h-5 fill-current" />
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {isTelugu
                ? 'క్యాలెండర్ నెలలో 10 వాహన సేవలు పూర్తి చేసి, 1 ఉచిత రివార్డ్ క్లెయిమ్ చేయండి!'
                : 'Complete 10 verified vehicle services within a calendar month to claim ONE free reward!'}
            </p>
          </div>

          {/* Month Selector */}
          <div className="flex items-center gap-2 bg-white border border-slate-200/90 rounded-2xl p-1 shadow-xs shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setSelectedMonth(11)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedMonth === 11
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              November 2026 (Active)
            </button>
            <button
              type="button"
              onClick={() => setSelectedMonth(10)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedMonth === 10
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              October 2026
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* HERO PROGRESS CARD                                      */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-gradient-to-br from-amber-400/15 via-emerald-400/10 to-transparent blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/10 text-amber-900 border border-amber-300 mb-2">
                <Award className="w-3.5 h-3.5 text-amber-600 fill-current" />
                <span>{progress.monthName} 2026 Cycle</span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">
                  {progress.eligibleServiceCount} / {progress.requiredCount}
                </span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                  {isTelugu ? 'సేవలు పూర్తయ్యాయి' : 'Services Completed'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                {progress.rewardUnlocked ? (
                  <span className="text-emerald-600 font-extrabold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    {isTelugu
                      ? 'అభినందనలు! మీరు 10 సేవలను పూర్తి చేశారు. క్రింది నుండి మీ ఉచిత రివార్డును ఎంచుకోండి!'
                      : 'Congratulations! You reached 10 completed services. Choose your free reward below!'}
                  </span>
                ) : (
                  <span className="text-indigo-900 font-semibold">
                    {progress.remainingCount} {isTelugu ? 'మరిన్ని పూర్తయిన సేవలతో ఉచిత రివార్డ్ అన్‌లాక్ అవుతుంది!' : 'more completed services to unlock your free reward!'}
                  </span>
                )}
              </p>
            </div>

            {/* Circular / Badge Metric */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 flex flex-col items-center justify-center text-center p-2 shadow-xs">
                <span className="text-xl sm:text-2xl font-black text-primary leading-none">
                  {progress.progressPercent}%
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Progress
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar with 10 Segment Nodes */}
          <div className="pt-6">
            <div className="flex justify-between text-xs font-bold text-slate-600 mb-2">
              <span>Service Completion Journey</span>
              <span>{progress.eligibleServiceCount} of 10 Completed</span>
            </div>

            {/* Visual 10 Slots Bar */}
            <div className="grid grid-cols-10 gap-1 sm:gap-2 mb-3">
              {Array.from({ length: 10 }).map((_, idx) => {
                const isCompleted = idx < progress.eligibleServiceCount;
                return (
                  <div
                    key={idx}
                    className={`h-9 sm:h-11 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-400 border border-slate-200/80'
                    }`}
                    title={isCompleted ? `Service #${idx + 1} Verified Complete` : `Service #${idx + 1} Locked`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3px]" /> : <Lock className="w-3.5 h-3.5 opacity-60" />}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Start: Nov 1</span>
              <span className="flex items-center gap-1 font-bold text-slate-700">
                <Gift className="w-3.5 h-3.5 text-amber-500" />
                <span>10th Service Unlocks Free Reward</span>
              </span>
              <span>Month End: Nov 30</span>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* REWARD SELECTION CARDS (3 OPTIONS)                      */}
        {/* ======================================================== */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {isTelugu ? 'ఎంచుకోదగిన ఉచిత రివార్డులు (ఏదైనా ఒక్కటి మాత్రమే)' : 'Choose Your Free Reward (Select Any ONE)'}
              </h2>
              <p className="text-xs text-slate-500">
                {progress.rewardUnlocked
                  ? 'Your reward is unlocked! Pick your preferred automotive reward below and submit claim.'
                  : 'Locked. Complete 10 vehicle services this month to choose your reward.'}
              </p>
            </div>

            {progress.claimed && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                Claimed for {progress.monthName}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rewardDefinitions.map((reward) => {
              const Icon = getRewardIcon(reward.id);
              const isSelected = selectedRewardId === reward.id;

              return (
                <div
                  key={reward.id}
                  onClick={() => progress.rewardUnlocked && !progress.claimed && setSelectedRewardId(reward.id)}
                  className={`relative rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between border-2 ${
                    progress.rewardUnlocked && !progress.claimed ? 'cursor-pointer hover:shadow-lift' : 'opacity-90'
                  } ${
                    isSelected && progress.rewardUnlocked && !progress.claimed
                      ? 'border-emerald-600 bg-white ring-4 ring-emerald-500/10 shadow-lg'
                      : 'border-slate-200/90 bg-white'
                  }`}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                      {reward.badge}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Worth ₹{reward.retailValue}
                    </span>
                  </div>

                  {/* Icon & Details */}
                  <div className="space-y-2 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 text-primary flex items-center justify-center border border-indigo-100 shadow-xs">
                      <Icon className="w-6 h-6 stroke-[2.2px]" />
                    </div>

                    <h3 className="text-base font-black text-slate-900 leading-snug">
                      {isTelugu ? reward.teluguName : reward.name}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {isTelugu ? reward.teluguDescription : reward.description}
                    </p>
                  </div>

                  {/* Action / Select Button */}
                  <div>
                    {progress.rewardUnlocked && !progress.claimed ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClaim(reward.id);
                        }}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                          isSelected
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        }`}
                      >
                        <Gift className="w-4 h-4" />
                        <span>{isTelugu ? 'ఈ రివార్డ్‌ను క్లెయిమ్ చేయండి' : 'Claim This Reward'}</span>
                      </button>
                    ) : progress.claimed ? (
                      <div className="py-2 text-center text-xs font-bold text-slate-400 bg-slate-50 rounded-xl">
                        {progress.activeClaim?.rewardId === reward.id ? 'Claimed by you' : 'Other reward selected'}
                      </div>
                    ) : (
                      <div className="py-2 text-center text-xs font-bold text-slate-400 bg-slate-50 rounded-xl flex items-center justify-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                        <span>{progress.remainingCount} more jobs needed</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* CONTRIBUTING SERVICES BREAKDOWN TABLE                    */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                {progress.monthName} 2026 Contributing Services ({progress.completions.length} verified)
              </h3>
              <p className="text-xs text-slate-500">
                Every service confirmed complete by the provider with actual amount charged
              </p>
            </div>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Total Spent: ₹{progress.completions.reduce((sum, c) => sum + c.actualAmount, 0).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto">
            {progress.completions.map((comp, idx) => (
              <div key={comp.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[11px] shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-extrabold text-slate-900 block">{comp.serviceName}</span>
                    <span className="text-slate-500 text-[11px]">
                      {comp.vehicleDetails} • Provider: {comp.providerName}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-black text-slate-900 block">₹{comp.actualAmount}</span>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 justify-end">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{comp.completedAt.split(' at ')[0]}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* REWARD CLAIMS & REDEMPTION HISTORY                       */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                {isTelugu ? 'రివార్డ్ క్లెయిమ్‌ల చరిత్ర & వోచర్లు' : 'Reward Claims & Redemption Vouchers'}
              </h3>
              <p className="text-xs text-slate-500">
                Track approval status and show redemption codes at partner workshops
              </p>
            </div>
          </div>

          {myClaims.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No reward claims submitted yet.
            </div>
          ) : (
            <div className="space-y-3">
              {myClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{claim.rewardName}</span>
                      <span className="font-mono text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {claim.uniqueClaimId}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px]">
                      Month: {claim.month}/2026 • Requested: {claim.requestedAt}
                    </p>
                    {claim.redemptionCode && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-mono font-black text-xs border border-emerald-300">
                        <QrCode className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Voucher Code: {claim.redemptionCode}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    {claim.status === 'pending_admin_approval' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Pending Admin Approval</span>
                      </span>
                    )}
                    {claim.status === 'approved' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-blue-600" />
                        <span>Approved - Show Voucher to Workshop</span>
                      </span>
                    )}
                    {claim.status === 'redeemed' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Redeemed ({claim.redeemedAt?.split(' at ')[0]})</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* SUCCESS MODAL ON CLAIM */}
      {showClaimSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-slate-100">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Gift className="w-8 h-8 fill-current" />
            </div>

            <h3 className="text-xl font-black text-slate-900">
              Reward Claim Submitted!
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Your claim <span className="font-mono font-bold text-slate-900">{showClaimSuccessModal}</span> has been forwarded to the Village Admin for verification. Once approved, your redemption voucher will appear in your rewards dashboard.
            </p>

            <button
              type="button"
              onClick={() => setShowClaimSuccessModal(null)}
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
