'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CompleteJobModal } from '@/components/common/CompleteJobModal';
import {
  Wrench,
  Users,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  ShieldCheck,
  Star,
  Send,
  AlertCircle,
  Plus,
  Calendar,
  MapPin,
  IndianRupee,
  TrendingUp,
  Briefcase,
  Play,
  XCircle,
  Check,
  LogIn,
} from 'lucide-react';
import Link from 'next/link';

export default function ProviderDashboardPage() {
  const { t, isTelugu } = useLanguage();
  const { currentUser, isLoggedIn, role } = useAuth();
  const {
    enquiries,
    providers,
    acceptBooking,
    rejectBooking,
    startBooking,
  } = useMarketplace();

  const isGuest = !isLoggedIn || role === 'guest';

  // Current provider details
  const myProfile = providers.find((p) => p.id === 'p_1') || providers[0];

  // Provider's bookings
  const myBookings = enquiries.filter(
    (e) => e.targetId === myProfile.id || e.targetType === 'provider'
  );

  const [bookingTab, setBookingTab] = useState<'all' | 'new' | 'accepted' | 'in_progress' | 'completed'>('all');
  const [completeModalTarget, setCompleteModalTarget] = useState<{
    id: string;
    customerName: string;
    serviceRequested: string;
    vehicleDetails?: string;
  } | null>(null);

  const filteredBookings = myBookings.filter((b) => {
    if (bookingTab === 'all') return true;
    return b.status === bookingTab;
  });

  // Calculate earnings
  const completedJobs = myBookings.filter((b) => b.status === 'completed');
  const totalEarnings = completedJobs.reduce((sum, b) => {
    const val = typeof b.amountCharged === 'number' ? b.amountCharged : parseFloat(String(b.amount || '0').replace(/[^0-9.]/g, ''));
    return sum + (isNaN(val) ? 0 : val);
  }, 18450); // baseline base rural earnings

  const stats = [
    {
      label: isTelugu ? 'మొత్తం బుకింగ్‌లు' : 'Total Bookings',
      value: myBookings.length,
      icon: Briefcase,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: isTelugu ? 'కొత్త అభ్యర్థనలు' : 'Pending Requests',
      value: myBookings.filter((e) => e.status === 'new').length,
      icon: Clock,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: isTelugu ? 'పనిలో ఉన్నవి' : 'In Progress Jobs',
      value: myBookings.filter((e) => e.status === 'in_progress' || e.status === 'accepted').length,
      icon: Wrench,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: isTelugu ? 'పూర్తయిన పనులు' : 'Completed Jobs',
      value: completedJobs.length,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: isTelugu ? 'మొత్తం సంపాదన' : 'Total Earnings',
      value: `₹${totalEarnings.toLocaleString('en-IN')}`,
      icon: IndianRupee,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="bg-surface-bg pb-12 pt-4 sm:pt-6">
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
                  {isTelugu ? 'సర్వీస్ ప్రొవైడర్ ప్రివ్యూ మోడ్' : 'Service Provider Preview Mode'}
                </h4>
                <p className="text-xs text-amber-800">
                  {isTelugu
                    ? 'మీ స్వంత సర్వీస్ ఆర్డర్లు మరియు కస్టమర్ అభ్యర్థనలను నిర్వహించడానికి లాగిన్ అవ్వండి.'
                    : 'Log in to accept incoming booking requests, record work completion, and track earnings.'}
                </p>
              </div>
            </div>
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isTelugu ? 'లాగిన్ చేయండి' : 'Login as Provider'}</span>
            </Link>
          </div>
        )}

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#174A7E] to-[#123a63] text-white rounded-3xl p-6 sm:p-8 shadow-card mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={myProfile.avatar}
                alt={myProfile.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-md shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white">
                    {isTelugu ? myProfile.categoryTelugu : myProfile.category}
                  </span>
                  {myProfile.isVerified && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-white flex items-center gap-1 shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{isTelugu ? 'గ్రామ సచివాలయ ధృవీకృతం' : 'Village Admin Verified'}</span>
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {isTelugu ? myProfile.teluguName : myProfile.name}
                </h1>
                <p className="text-white/80 text-xs sm:text-sm mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{isTelugu ? `${myProfile.villageTelugu} గ్రామ నిపుణుడు` : `Serving ${myProfile.villageName} & nearby villages`}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 p-3 sm:p-4 rounded-2xl backdrop-blur-sm self-start md:self-center">
              <div className="text-center px-2">
                <div className="flex items-center justify-center gap-1 text-amber-300 font-black text-xl">
                  <Star className="w-5 h-5 fill-current" />
                  <span>{myProfile.rating}</span>
                </div>
                <span className="text-[11px] text-white/80 font-bold block">
                  {myProfile.reviewCount} {isTelugu ? 'సమీక్షలు' : 'Reviews'}
                </span>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center px-2">
                <span className="text-xl font-black text-emerald-300 block">
                  {myProfile.experienceYears}y+
                </span>
                <span className="text-[11px] text-white/80 font-bold block">
                  {isTelugu ? 'అనుభవం' : 'Experience'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Key Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-card flex items-center gap-3.5"
              >
                <div className={`w-11 h-11 rounded-xl ${s.bg} ${s.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5 stroke-[2.2px]" />
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-black text-slate-900 block leading-tight">
                    {s.value}
                  </span>
                  <span className="text-[11px] text-slate-500 font-bold block">
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Booking Management Hub (Core Requirement) */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                <span>{isTelugu ? 'కస్టమర్ సర్వీస్ బుకింగ్‌లు' : 'Customer Service Bookings'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {isTelugu
                  ? 'కొత్త అభ్యర్థనలను ఆమోదించండి, పని పూర్తయినట్లు నమోదు చేయండి మరియు బిల్లు మొత్తాన్ని సమర్పించండి.'
                  : 'Accept or decline new requests, track in-progress jobs, and submit completion details.'}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200/90 text-xs font-bold overflow-x-auto">
              <button
                type="button"
                onClick={() => setBookingTab('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  bookingTab === 'all' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isTelugu ? 'అన్నీ' : 'All'} ({myBookings.length})
              </button>
              <button
                type="button"
                onClick={() => setBookingTab('new')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  bookingTab === 'new' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isTelugu ? 'కొత్తవి' : 'New'} ({myBookings.filter((b) => b.status === 'new').length})
              </button>
              <button
                type="button"
                onClick={() => setBookingTab('accepted')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  bookingTab === 'accepted' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isTelugu ? 'ఆమోదించినవి' : 'Accepted'} ({myBookings.filter((b) => b.status === 'accepted').length})
              </button>
              <button
                type="button"
                onClick={() => setBookingTab('in_progress')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  bookingTab === 'in_progress' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isTelugu ? 'పనిలో ఉంది' : 'In Progress'} ({myBookings.filter((b) => b.status === 'in_progress').length})
              </button>
              <button
                type="button"
                onClick={() => setBookingTab('completed')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  bookingTab === 'completed' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isTelugu ? 'పూర్తయినవి' : 'Completed'} ({myBookings.filter((b) => b.status === 'completed').length})
              </button>
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/90 shadow-card">
              <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-bold text-sm">
                {isTelugu ? 'ఈ కేటగిరీలో ఎటువంటి బుకింగ్‌లు లేవు' : 'No service bookings in this category'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredBookings.map((b) => {
                const isNew = b.status === 'new';
                const isAccepted = b.status === 'accepted';
                const isInProgress = b.status === 'in_progress';
                const isCompleted = b.status === 'completed';

                return (
                  <div
                    key={b.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card hover:shadow-md transition-shadow space-y-4"
                  >
                    {/* Header: ID, Status, Timestamp */}
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                          {b.id}
                        </span>
                        {isNew && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 flex items-center gap-1 animate-pulse">
                            <Clock className="w-3 h-3" />
                            <span>{isTelugu ? 'కొత్త విచారణ (పెండింగ్)' : 'Pending Customer Request'}</span>
                          </span>
                        )}
                        {isAccepted && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>{isTelugu ? 'మీరు ఆమోదించారు' : 'Accepted by You'}</span>
                          </span>
                        )}
                        {isInProgress && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                            <Wrench className="w-3 h-3" />
                            <span>{isTelugu ? 'పని ప్రారంభమైంది' : 'Work in Progress'}</span>
                          </span>
                        )}
                        {isCompleted && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{isTelugu ? 'సేవ పూర్తయింది' : 'Job Completed'}</span>
                          </span>
                        )}
                        {b.urgent && (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">
                            {isTelugu ? 'అత్యవసరం' : 'Urgent'}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-medium">
                        {b.createdAt}
                      </span>
                    </div>

                    {/* Customer & Requested Service Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          {isTelugu ? 'కస్టమర్ వివరాలు' : 'Customer Contact Details'}
                        </span>
                        <h4 className="text-base font-black text-slate-900">
                          {b.customerName}
                        </h4>
                        <p className="text-slate-600 flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{b.location || `${b.villageName} Village`}</span>
                        </p>
                        <p className="text-slate-600 flex items-center gap-1 font-bold">
                          <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                          <a href={`tel:${b.customerPhone}`} className="hover:underline text-primary">
                            +91 {b.customerPhone}
                          </a>
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          {isTelugu ? 'అభ్యర్థించిన పని' : 'Requested Work & Schedule'}
                        </span>
                        <p className="font-extrabold text-primary text-sm">
                          {b.serviceRequested}
                        </p>
                        <p className="text-slate-700 italic">
                          "{b.message}"
                        </p>
                        {b.vehicleDetails && (
                          <p className="text-slate-800 text-xs font-bold flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/80">
                            <span className="text-amber-800">Vehicle:</span>
                            <span>{b.vehicleDetails}</span>
                          </p>
                        )}
                        {b.preferredTime && (
                          <p className="text-slate-500 font-medium text-xs flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{isTelugu ? 'సమయం:' : 'Preferred Time:'} {b.preferredTime}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Completed Job Details (Work Description & Amount) */}
                    {isCompleted && (
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="font-bold text-slate-900 uppercase tracking-wide">
                            {isTelugu ? 'సమర్పించిన పని వివరాలు & బిల్లు:' : 'Submitted Completion Details:'}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs">
                            {isTelugu ? 'వసూలు చేసిన మొత్తం:' : 'Charged:'} {b.amount || `₹${b.amountCharged}`}
                          </span>
                        </div>
                        <p className="text-slate-700 font-medium">
                          {b.workDescription || (isTelugu ? 'పని విజయవంతంగా పూర్తయింది.' : 'Job completed successfully.')}
                        </p>
                        {b.reviewSubmitted && (
                          <div className="mt-2 pt-2 border-t border-slate-200 flex items-center gap-2 text-amber-700 font-bold">
                            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                            <span>{isTelugu ? `కస్టమర్ రేటింగ్: ${b.rating}★ - "${b.reviewComment}"` : `Customer Rating: ${b.rating}★ - "${b.reviewComment}"`}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Workflow Action Buttons */}
                    <div className="flex items-center justify-between flex-wrap gap-2 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${b.customerPhone}`}
                          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-primary" />
                          <span>{isTelugu ? 'కాల్ చేయండి' : 'Call Customer'}</span>
                        </a>
                        <a
                          href={`https://wa.me/91${b.customerPhone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>

                      {/* Status Management Actions */}
                      <div className="flex items-center gap-2">
                        {isNew && (
                          <>
                            <button
                              type="button"
                              onClick={() => rejectBooking(b.id)}
                              className="px-3 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                            >
                              {isTelugu ? 'తిరస్కరించు' : 'Decline'}
                            </button>
                            <button
                              type="button"
                              onClick={() => acceptBooking(b.id)}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-xs transition-colors flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>{isTelugu ? 'అభ్యర్థనను ఆమోదించండి' : 'Accept Request'}</span>
                            </button>
                          </>
                        )}

                        {isAccepted && (
                          <>
                            <button
                              type="button"
                              onClick={() => startBooking(b.id)}
                              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-xs transition-colors flex items-center gap-1"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>{isTelugu ? 'పని ప్రారంభించండి' : 'Start Job'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setCompleteModalTarget({
                                  id: b.id,
                                  customerName: b.customerName,
                                  serviceRequested: b.serviceRequested,
                                  vehicleDetails: b.vehicleDetails,
                                })
                              }
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-xs transition-colors flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{isTelugu ? 'పూర్తయినట్లు నమోదు చేయండి' : 'Mark Completed'}</span>
                            </button>
                          </>
                        )}

                        {isInProgress && (
                          <button
                            type="button"
                            onClick={() =>
                              setCompleteModalTarget({
                                id: b.id,
                                customerName: b.customerName,
                                serviceRequested: b.serviceRequested,
                                vehicleDetails: b.vehicleDetails,
                              })
                            }
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-xs transition-colors flex items-center gap-1 animate-pulse"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isTelugu ? 'పూర్తయినట్లు నమోదు చేయండి & బిల్లు' : 'Mark Completed & Bill'}</span>
                          </button>
                        )}

                        {isCompleted && (
                          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/80">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{isTelugu ? 'పూర్తయింది (బిల్లు సమర్పించబడింది)' : 'Completed & Billed'}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Services Offered Manager */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6 flex-wrap gap-2">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Wrench className="w-5 h-5 text-primary" />
                <span>{isTelugu ? 'మీరు అందించే సేవా ప్యాకేజీలు & ధరలు' : 'My Services & Standard Charges'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isTelugu ? 'గ్రామస్తులకు స్పష్టమైన ధరలు అందించండి.' : 'Transparent pricing visible to village customers.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {myProfile.services.map((s) => (
              <div key={s.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    {isTelugu ? s.teluguName : s.name}
                  </h4>
                  <span className="text-xs text-emerald-700 font-black mt-1 block">
                    {s.price} {s.unit ? `/ ${s.unit}` : ''}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 mt-2 block font-semibold">
                  ✓ {isTelugu ? 'ప్రత్యక్ష బుకింగ్ అందుబాటులో ఉంది' : 'Direct booking enabled'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Received */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6 flex-wrap gap-2">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span>{isTelugu ? 'ధృవీకరించబడిన కస్టమర్ సమీక్షలు' : 'Verified Customer Reviews'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isTelugu ? 'పూర్తయిన పనుల ఆధారంగా వినియోగదారులు ఇచ్చిన రేటింగ్‌లు.' : 'Ratings submitted by villagers after job completion.'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-black text-xs">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{myProfile.rating} / 5.0 ({myProfile.reviewCount} Reviews)</span>
            </div>
          </div>

          {myProfile.reviewsList.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-500">
              {isTelugu ? 'ఇంకా సమీక్షలు నమోదు కాలేదు.' : 'No customer reviews recorded yet.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myProfile.reviewsList.map((r) => (
                <div key={r.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{r.author}</span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 italic">
                    "{r.comment}"
                  </p>
                  <span className="text-[10px] text-slate-400 block">{r.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Completion Modal for Providers to Enter Work Details & Final Amount Charged */}
      {completeModalTarget && (
        <CompleteJobModal
          isOpen={true}
          onClose={() => setCompleteModalTarget(null)}
          bookingId={completeModalTarget.id}
          customerName={completeModalTarget.customerName}
          serviceRequested={completeModalTarget.serviceRequested}
          vehicleDetails={completeModalTarget.vehicleDetails}
        />
      )}

    </div>
  );
}
