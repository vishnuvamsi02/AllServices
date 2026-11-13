'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { WriteReviewModal } from '@/components/common/WriteReviewModal';
import { VehicleSelectorModal } from '@/components/common/VehicleSelectorModal';
import { ProviderCard } from '@/components/cards/ProviderCard';
import { BusinessCard } from '@/components/cards/BusinessCard';
import { ChooseRewardSection } from '@/components/rewards/ChooseRewardSection';
import {
  MessageSquare,
  Heart,
  User,
  Star,
  Clock,
  Phone,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Calendar,
  MapPin,
  LogIn,
  Wrench,
  Receipt,
  Sparkles,
  Gift,
  Award,
  Car,
  Bike,
  Plus,
  Trash2,
  Lock,
  ArrowRight,
  Tag,
  Check,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export default function CustomerDashboardPage() {
  const { isTelugu } = useLanguage();
  const { currentUser, isLoggedIn, role } = useAuth();
  const {
    enquiries,
    favorites,
    providers,
    businesses,
    vehicles,
    activeVehicle,
    setActiveVehicleId,
    removeVehicle,
    rewardDefinitions,
    rewardClaims,
    getMonthlyRewardProgress,
    claimMonthlyReward,
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'bookings' | 'rewards' | 'vehicles' | 'favorites' | 'profile' | 'recommendations'>('bookings');
  const [bookingFilter, setBookingFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [reviewModalTarget, setReviewModalTarget] = useState<{ id: string; targetName: string } | null>(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedRewardId, setSelectedRewardId] = useState<string>('rew_oil_change');
  const [claimSuccessMessage, setClaimSuccessMessage] = useState<string | null>(null);

  const isGuest = !isLoggedIn || role === 'guest';
  const customerId = currentUser?.id || 'cust_101';

  // Real-time Loyalty progress calculation
  const progress = getMonthlyRewardProgress(customerId, 11, 2026);
  const customerClaims = rewardClaims.filter(c => c.customerId === customerId);

  // Customer's enquiries / bookings
  const myBookings = enquiries;

  const filteredBookings = myBookings.filter((b) => {
    if (bookingFilter === 'active') {
      return b.status === 'new' || b.status === 'accepted' || b.status === 'in_progress';
    }
    if (bookingFilter === 'completed') {
      return b.status === 'completed';
    }
    return true;
  });

  // Favorited items
  const favProviders = providers.filter((p) => favorites.providers.includes(p.id));
  const favBusinesses = businesses.filter((b) => favorites.businesses.includes(b.id));

  // Recommended providers for village
  const recommendedProviders = providers.slice(0, 3);

  const handleClaimReward = (rewardId: string) => {
    const res = claimMonthlyReward(customerId, rewardId);
    if (res.success) {
      const rewardObj = rewardDefinitions.find((r) => r.id === rewardId);
      const title = (isTelugu ? rewardObj?.teluguName : rewardObj?.name) || 'Loyalty Reward';
      setClaimSuccessMessage(
        isTelugu
          ? `రివార్డ్ క్లెయిమ్ (${title}) విజయవంతంగా నమోదైంది! అడ్మిన్ ఆమోదం కోసం వేచి ఉంది.`
          : `Reward claim for "${title}" submitted successfully! Awaiting Admin verification.`
      );
      setTimeout(() => setClaimSuccessMessage(null), 7000);
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{isTelugu ? 'కొత్త అభ్యర్థన' : 'Pending Request'}</span>
          </span>
        );
      case 'accepted':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>{isTelugu ? 'ఆమోదించబడింది' : 'Accepted'}</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
            <Wrench className="w-3 h-3" />
            <span>{isTelugu ? 'పనిలో ఉంది' : 'In Progress'}</span>
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
            <CheckCircle2 className="w-3 h-3" />
            <span>{isTelugu ? 'పూర్తయింది' : 'Completed'}</span>
          </span>
        );
      case 'rejected':
      case 'cancelled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>{isTelugu ? 'రద్దు చేయబడింది' : 'Declined / Cancelled'}</span>
          </span>
        );
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  return (
    <div className="bg-surface-bg pb-16 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Guest Mode Alert Banner */}
        {isGuest && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold">
                !
              </div>
              <div>
                <h4 className="text-sm font-black text-amber-950">
                  {isTelugu ? 'మీరు సందర్శకుడిగా (Guest) ఉన్నారు' : 'Browsing in Guest Mode'}
                </h4>
                <p className="text-xs text-amber-800">
                  {isTelugu
                    ? 'మీ వ్యక్తిగత వాహనాలు, నెలవారీ రివార్డులు మరియు బుకింగ్‌లను ట్రాక్ చేయడానికి లాగిన్ అవ్వండి.'
                    : 'Log in to track your vehicles, monthly 10-service loyalty rewards, and bookings.'}
                </p>
              </div>
            </div>
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isTelugu ? 'లాగిన్ చేయండి' : 'Login / Sign Up'}</span>
            </Link>
          </div>
        )}

        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-slate-900 via-primary to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-card mb-6 relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white inline-block">
                  {isTelugu ? 'ఆటోకేర్ కస్టమర్ ఖాతా' : 'AutoCare Customer Portal'}
                </span>
                {activeVehicle && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 inline-flex items-center gap-1 shadow-xs">
                    {activeVehicle.type === 'car' ? <Car className="w-3.5 h-3.5" /> : <Bike className="w-3.5 h-3.5" />}
                    <span>{activeVehicle.make} {activeVehicle.model} ({activeVehicle.regNumber})</span>
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {isTelugu ? `నమస్కారం, ${currentUser?.name || 'రవి తేజ'} గారు` : `Welcome, ${currentUser?.name || 'Ravi Teja'}`}
              </h1>
              <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-2xl">
                {isTelugu 
                  ? 'మీ వాహన సర్వీసింగ్ బుకింగ్‌లు, నెలవారీ 10 సర్వీసుల లాయల్టీ రివార్డులు మరియు గ్యారేజ్ వివరాలు ఇక్కడ పరిశీలించండి.' 
                  : 'Track your vehicle service bookings, 10-service monthly loyalty rewards, and active garage vehicles.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => setShowVehicleModal(true)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <Car className="w-4 h-4 text-amber-300" />
                <span>{isTelugu ? 'వాహనం మార్చండి' : 'Switch Vehicle'}</span>
              </button>
              <Link
                href="/services"
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isTelugu ? 'సర్వీస్ బుక్ చేయండి' : 'Book Service'}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Loyalty Progress Banner */}
        <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-slate-50 border border-amber-300/60 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-xs">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                  {progress.monthName} 2026 {isTelugu ? 'రివార్డ్ స్థితి' : 'Loyalty Status'}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {progress.progressPercent}% {isTelugu ? 'పూర్తయింది' : 'Completed'}
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 mt-0.5">
                {progress.eligibleServiceCount} / {progress.requiredCount} {isTelugu ? 'సేవలు పూర్తయ్యాయి' : 'Services Verified'} 
                <span className="text-amber-800 font-bold ml-1.5">
                  ({progress.remainingCount} {isTelugu ? 'సేవలు మిగిలి ఉన్నాయి' : 'more to unlock 1 Free Reward!'})
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-36 sm:w-44 bg-slate-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress.progressPercent}%` }}
              />
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('rewards')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>{isTelugu ? 'రివార్డులు చూడండి' : 'View Rewards'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Claim Alert Banner if just claimed */}
        {claimSuccessMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs sm:text-sm font-bold">{claimSuccessMessage}</span>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs mb-6 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'bookings'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{isTelugu ? 'నా సర్వీస్ బుకింగ్‌లు' : 'My Bookings'}</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 text-white">
              {myBookings.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('rewards')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 relative ${
              activeTab === 'rewards'
                ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Gift className="w-4 h-4 text-amber-600" />
            <span>{isTelugu ? 'నెలవారీ రివార్డులు' : 'Monthly Rewards'}</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 shadow-2xs">
              {progress.eligibleServiceCount}/10
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('vehicles')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'vehicles'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>{isTelugu ? 'నా గ్యారేజ్ / వాహనాలు' : 'My Vehicles'}</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-800">
              {vehicles.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'favorites'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>{isTelugu ? 'ఇష్టపడినవి' : 'Saved Favorites'}</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-800">
              {favProviders.length + favBusinesses.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('recommendations')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'recommendations'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isTelugu ? 'సిఫార్సులు' : 'Recommendations'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'profile'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{isTelugu ? 'ప్రొఫైల్' : 'My Profile'}</span>
          </button>
        </div>

        {/* TAB: MONTHLY REWARDS */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            
            {/* Top 10-Slot Journey Tracker */}
            <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0A192F] text-white rounded-3xl p-6 sm:p-8 shadow-card border border-amber-400/30 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                      10 Services Loyalty Reward
                    </span>
                    <span className="text-xs text-amber-300 font-bold">{progress.monthName} 2026</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black mt-2">
                    {progress.eligibleServiceCount} of {progress.requiredCount} Services Completed This Month
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Complete 10 verified automotive services in a single calendar month to claim 1 Free Reward. Progress resets on the 1st of each month.
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-3xl font-black text-amber-400">{progress.progressPercent}%</span>
                    <p className="text-[11px] text-slate-400 font-medium">Completed</p>
                  </div>
                  <Link
                    href="/rewards"
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <span>Full Reward Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* 10 Visual Step Track */}
              <div className="pt-6">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-4">
                  10-Service Milestone Track:
                </span>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-3">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const stepNum = i + 1;
                    const isDone = stepNum <= progress.eligibleServiceCount;
                    const isCurrent = stepNum === progress.eligibleServiceCount + 1;
                    const completion = progress.completions[i];

                    return (
                      <div
                        key={stepNum}
                        className={`relative rounded-2xl p-2.5 text-center flex flex-col items-center justify-between min-h-[90px] border transition-all ${
                          isDone
                            ? 'bg-emerald-500/20 border-emerald-400/80 text-emerald-200'
                            : isCurrent
                            ? 'bg-amber-400/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/50'
                            : 'bg-slate-800/60 border-slate-700 text-slate-500'
                        }`}
                      >
                        <span className="text-[11px] font-black">{stepNum}</span>
                        <div className="my-1">
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
                          ) : isCurrent ? (
                            <Clock className="w-5 h-5 text-amber-400 mx-auto animate-pulse" />
                          ) : (
                            <Lock className="w-4 h-4 text-slate-600 mx-auto" />
                          )}
                        </div>
                        <span className="text-[9px] font-bold line-clamp-1">
                          {isDone && completion ? completion.serviceName.split(' ')[0] : isCurrent ? 'Next Up' : 'Locked'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Choose Your Free Reward – Redesigned Interactive Component */}
            <ChooseRewardSection />

            {/* Contributing Services Table */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-card">
              <h3 className="text-base font-black text-slate-900 mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Contributing Services for {progress.monthName} 2026 ({progress.eligibleServiceCount}/10)</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Strict counting rule: Only bookings marked "completed", with provider confirmation and an actual billed amount are credited.
              </p>

              {progress.completions.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No completed vehicle services recorded yet this month.
                </div>
              ) : (
                <div className="overflow-x-auto no-scrollbar scrollbar-none">
                  <table className="w-full text-left text-xs min-w-[580px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                        <th className="py-2.5 px-3">#</th>
                        <th className="py-2.5 px-3">Booking ID</th>
                        <th className="py-2.5 px-3">Service</th>
                        <th className="py-2.5 px-3">Provider</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Provider Confirmed</th>
                        <th className="py-2.5 px-3">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {progress.completions.map((r, idx) => (
                        <tr key={r.bookingId} className="hover:bg-slate-50/80">
                          <td className="py-3 px-3 font-bold text-slate-900">#{idx + 1}</td>
                          <td className="py-3 px-3 font-mono font-bold text-slate-600">{r.bookingId}</td>
                          <td className="py-3 px-3 font-bold text-slate-900">{r.serviceName}</td>
                          <td className="py-3 px-3 text-slate-600">{r.providerName}</td>
                          <td className="py-3 px-3 text-slate-500">{r.completedAt}</td>
                          <td className="py-3 px-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              Provider Verified
                            </span>
                          </td>
                          <td className="py-3 px-3 font-black text-slate-900">₹{r.actualAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Reward Claims & Voucher Codes */}
            {customerClaims.length > 0 && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-card">
                <h3 className="text-base font-black text-slate-900 mb-1 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Your Reward Claims & Vouchers</span>
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Present your approved voucher code at any authorized partner workshop to redeem your free service.
                </p>

                <div className="space-y-3">
                  {customerClaims.map((claim) => (
                    <div
                      key={claim.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded border">
                            {claim.id}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-black uppercase ${
                            claim.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : claim.status === 'redeemed'
                              ? 'bg-slate-200 text-slate-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {claim.status === 'approved' ? '✓ Voucher Issued' : claim.status === 'redeemed' ? 'Redeemed' : 'Pending Verification'}
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900 mt-1">{claim.rewardTitle || claim.rewardName}</h4>
                        <p className="text-xs text-slate-500">Claimed on {claim.claimedAt || claim.requestedAt}</p>
                      </div>

                      {(claim.voucherCode || claim.redemptionCode) ? (
                        <div className="bg-white p-3 rounded-xl border border-amber-300 text-center sm:text-right">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">Voucher Code</span>
                          <span className="font-mono text-base font-black text-amber-600 tracking-wider">
                            {claim.voucherCode || claim.redemptionCode}
                          </span>
                          <span className="text-[10px] text-slate-500 block">Valid for 60 days</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500 italic">Admin reviewing 10 verified services</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB: VEHICLES (MY GARAGE) */}
        {activeTab === 'vehicles' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Car className="w-5 h-5 text-primary" />
                  <span>{isTelugu ? 'నా గ్యారేజ్ & వాహనాలు' : 'My Garage & Registered Vehicles'}</span>
                </h2>
                <p className="text-xs text-slate-500">
                  {isTelugu ? 'బుకింగ్‌లు మరియు లాయల్టీ రివార్డుల కోసం మీ వాహనాలను నిర్వహించండి' : 'Manage your bikes and cars for direct service dispatch and loyalty tracking.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowVehicleModal(true)}
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-black rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isTelugu ? 'కొత్త వాహనం చేర్చండి' : 'Add Vehicle'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicles.map((v) => {
                const isActive = activeVehicle?.id === v.id;
                const Icon = v.type === 'car' ? Car : Bike;

                return (
                  <div
                    key={v.id}
                    className={`bg-white rounded-3xl p-5 border-2 transition-all shadow-card ${
                      isActive ? 'border-primary ring-2 ring-primary/20' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          isActive ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded">
                              {v.regNumber}
                            </span>
                            {isActive && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                                Default Active
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-black text-slate-900 mt-1">
                            {v.make} {v.model}
                          </h3>
                          <p className="text-xs text-slate-500">
                            {v.year} • {v.fuelType.toUpperCase()} • {v.type === 'car' ? 'Car' : 'Two-Wheeler'}
                          </p>
                        </div>
                      </div>

                      {vehicles.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVehicle(v.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Remove Vehicle"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        Linked Services: {progress.completions.length} jobs
                      </span>
                      {!isActive ? (
                        <button
                          type="button"
                          onClick={() => setActiveVehicleId(v.id)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                        >
                          Set as Active
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Currently Selected
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 1: Bookings Management with Status Filters & Review Workflow */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            
            {/* Sub-Filter Pills */}
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2">
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setBookingFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    bookingFilter === 'all' ? 'bg-white text-primary shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isTelugu ? 'అన్నీ' : 'All'} ({myBookings.length})
                </button>
                <button
                  type="button"
                  onClick={() => setBookingFilter('active')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    bookingFilter === 'active' ? 'bg-white text-primary shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isTelugu ? 'ప్రస్తుత సేవలు' : 'Active'} ({myBookings.filter(b => b.status === 'new' || b.status === 'accepted' || b.status === 'in_progress').length})
                </button>
                <button
                  type="button"
                  onClick={() => setBookingFilter('completed')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    bookingFilter === 'completed' ? 'bg-white text-primary shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isTelugu ? 'పూర్తయినవి' : 'Completed'} ({myBookings.filter(b => b.status === 'completed').length})
                </button>
              </div>

              <span className="text-xs text-slate-500 font-medium">
                {isTelugu ? 'పూర్తయిన సేవలకే సమీక్ష రాసే అవకాశం ఉంటుంది' : 'Verified reviews available for completed services'}
              </span>
            </div>

            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/90 shadow-card">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-700 font-bold text-sm">
                  {isTelugu ? 'ఎటువంటి బుకింగ్‌లు లేవు' : 'No bookings in this filter'}
                </p>
                <Link
                  href="/services"
                  className="mt-3 inline-block px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  {isTelugu ? 'సేవలను అన్వేషించండి' : 'Explore Services'}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredBookings.map((b) => {
                  const isCompleted = b.status === 'completed';

                  return (
                    <div
                      key={b.id}
                      className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card hover:shadow-md transition-shadow space-y-4"
                    >
                      {/* Top Row: ID, Status, Timestamp */}
                      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                            {b.id}
                          </span>
                          {statusBadge(b.status)}
                          {b.urgent && (
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900">
                              {isTelugu ? 'అత్యవసరం' : 'Urgent'}
                            </span>
                          )}
                          {b.vehicleDetails && (
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800 flex items-center gap-1">
                              <Car className="w-3 h-3 text-primary" />
                              <span>{b.vehicleDetails}</span>
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400 font-medium">
                          {b.createdAt}
                        </span>
                      </div>

                      {/* Middle Row: Service Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            {isTelugu ? 'సేవను అందించేవారు' : 'Service Provider / Business'}
                          </span>
                          <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                            {b.targetName}
                          </h3>
                          <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{b.location || b.villageName}</span>
                          </p>
                        </div>

                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            {isTelugu ? 'అభ్యర్థించిన సేవ' : 'Requested Service'}
                          </span>
                          <p className="text-sm font-bold text-primary mt-0.5">
                            {b.serviceRequested}
                          </p>
                          <p className="text-xs text-slate-500 italic mt-0.5">
                            "{b.message}"
                          </p>
                        </div>
                      </div>

                      {/* Work Completion Callout (Strict Workflow Requirement) */}
                      {isCompleted && (
                        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-extrabold uppercase tracking-wide">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>{isTelugu ? 'పని పూర్తయిన వివరాలు' : 'Service Completion Confirmed by Provider'}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-xl border border-emerald-200 text-emerald-900 font-black text-xs shadow-2xs">
                              <Receipt className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{isTelugu ? 'వసూలు చేసిన మొత్తం:' : 'Final Charged:'} {b.amount || `₹${b.amountCharged}`}</span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            <span className="text-slate-500 font-normal">{isTelugu ? 'పని వివరణ:' : 'Work Performed:'} </span>
                            {b.workDescription || (isTelugu ? 'పని విజయవంతంగా పూర్తయింది.' : 'Job completed successfully.')}
                          </p>

                          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                            {b.completedAt && (
                              <span>
                                {isTelugu ? 'పూర్తయిన సమయం:' : 'Completed on:'} {b.completedAt}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              Credited to Monthly Loyalty Rewards (+1)
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Bottom Action Row: Call Provider & Verified Review Action */}
                      <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${b.customerPhone}`}
                            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-primary" />
                            <span>{isTelugu ? 'కాల్ చేయండి' : 'Call Provider'}</span>
                          </a>
                        </div>

                        {/* Review Button only available for COMPLETED services */}
                        {isCompleted ? (
                          b.reviewSubmitted ? (
                            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-xl text-xs font-bold text-amber-900">
                              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                              <span>{isTelugu ? `మీరు ${b.rating || 5}★ సమీక్ష ఇచ్చారు` : `Reviewed (${b.rating || 5}★)`}</span>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setReviewModalTarget({ id: b.id, targetName: b.targetName })}
                              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black rounded-xl shadow-xs transition-all flex items-center gap-1.5 animate-pulse"
                            >
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span>{isTelugu ? '★ సమీక్ష & రేటింగ్ రాయండి' : '★ Write Verified Review'}</span>
                            </button>
                          )
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">
                            {isTelugu
                              ? 'సేవ పూర్తయిన తర్వాత సమీక్ష ఇవ్వవచ్చు'
                              : 'Review available after service is completed'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Favorites */}
        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span>{isTelugu ? 'ఇష్టపడిన నిపుణులు & సేవకులు' : 'Saved Service Providers'} ({favProviders.length})</span>
              </h2>
              {favProviders.length === 0 ? (
                <div className="p-6 bg-white rounded-2xl border text-center text-xs text-slate-500">
                  {isTelugu ? 'ఎటువంటి నిపుణులు సేవ్ చేయబడలేదు' : 'No service providers saved yet.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favProviders.map((p) => (
                    <ProviderCard key={p.id} provider={p} />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span>{isTelugu ? 'ఇష్టపడిన వ్యాపారాలు & దుకాణాలు' : 'Saved Local Businesses'} ({favBusinesses.length})</span>
              </h2>
              {favBusinesses.length === 0 ? (
                <div className="p-6 bg-white rounded-2xl border text-center text-xs text-slate-500">
                  {isTelugu ? 'ఎటువంటి దుకాణాలు సేవ్ చేయబడలేదు' : 'No local businesses saved yet.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favBusinesses.map((b) => (
                    <BusinessCard key={b.id} business={b} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Recommendations */}
        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>{isTelugu ? 'మీ గ్రామంలో అగ్రశ్రేణి నిపుణుల సిఫార్సులు' : 'Top Recommendations in Your Village'}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedProviders.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Profile Details */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card max-w-xl mx-auto space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-2xl">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {currentUser?.name || 'Customer'}
                </h3>
                <p className="text-xs text-slate-500">
                  {currentUser?.phone || 'No phone set'}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase">
                  {role.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-500">{isTelugu ? 'గ్రామం / లొకేషన్:' : 'Village / Location:'}</span>
                <span className="font-bold text-slate-800">{currentUser?.villageName || 'Kaza, Guntur'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-500">{isTelugu ? 'భాషా ప్రాధాన్యత:' : 'Language Preference:'}</span>
                <span className="font-bold text-slate-800">{isTelugu ? 'తెలుగు' : 'English'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">{isTelugu ? 'ఖాతా స్థితి:' : 'Account Status:'}</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isTelugu ? 'యాక్టివ్' : 'Active & Verified'}
                </span>
              </div>
            </div>

            <Link
              href="/settings/edit-profile"
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center block transition-colors"
            >
              {isTelugu ? 'ప్రొఫైల్ వివరాలను సవరించండి' : 'Edit Profile Information'}
            </Link>
          </div>
        )}

      </div>

      {/* Review Modal for Verified Completed Bookings */}
      {reviewModalTarget && (
        <WriteReviewModal
          isOpen={true}
          onClose={() => setReviewModalTarget(null)}
          enquiryId={reviewModalTarget.id}
          targetName={reviewModalTarget.targetName}
        />
      )}

      {/* Vehicle Selector / Add Modal */}
      <VehicleSelectorModal
        isOpen={showVehicleModal}
        onClose={() => setShowVehicleModal(false)}
      />

    </div>
  );
}
