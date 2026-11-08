'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { WriteReviewModal } from '@/components/common/WriteReviewModal';
import { ProviderCard } from '@/components/cards/ProviderCard';
import { BusinessCard } from '@/components/cards/BusinessCard';
import { PropertyCard } from '@/components/cards/PropertyCard';
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
} from 'lucide-react';
import Link from 'next/link';

export default function CustomerDashboardPage() {
  const { t, isTelugu } = useLanguage();
  const { currentUser, isLoggedIn, role } = useAuth();
  const { enquiries, favorites, providers, businesses, properties } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'bookings' | 'favorites' | 'profile' | 'recommendations'>('bookings');
  const [bookingFilter, setBookingFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [reviewModalTarget, setReviewModalTarget] = useState<{ id: string; targetName: string } | null>(null);

  const isGuest = !isLoggedIn || role === 'guest';

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
  const favProperties = properties.filter((p) => favorites.properties.includes(p.id));

  // Recommended providers for village
  const recommendedProviders = providers.slice(0, 3);

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
                  {isTelugu ? 'మీరు సందర్శకుడిగా (Guest) ఉన్నారు' : 'Browsing in Guest Mode'}
                </h4>
                <p className="text-xs text-amber-800">
                  {isTelugu
                    ? 'మీ వ్యక్తిగత బుకింగ్‌లు మరియు సమీక్షలను ట్రాక్ చేయడానికి లాగిన్ అవ్వండి.'
                    : 'Log in to manage your real-time bookings, verified reviews, and saved favorites.'}
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
        <div className="bg-gradient-to-r from-primary to-[#18538c] text-white rounded-3xl p-6 sm:p-8 shadow-card mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white mb-2 inline-block">
                {isTelugu ? 'గ్రామ వినియోగదారుని ఖాతా' : 'Village Customer Account'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {isTelugu ? `నమస్కారం, ${currentUser?.name || 'రమణ మూర్తి'} గారు` : `Welcome, ${currentUser?.name || 'Ramana Murthy'}`}
              </h1>
              <p className="text-white/80 text-xs sm:text-sm mt-1">
                {isTelugu 
                  ? 'మీ సేవా బుకింగ్‌ల స్థితి, నిపుణుల సమీక్షలు మరియు ఇష్టమైన వివరాలు ఇక్కడ పరిశీలించండి.' 
                  : 'Track live service booking status, review completed jobs, and manage your village favorites.'}
              </p>
            </div>

            <div className="flex gap-2.5">
              <Link
                href="/services"
                className="px-4 py-2.5 bg-white text-primary font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:bg-slate-50 transition-all text-center flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{isTelugu ? 'కొత్త సేవ వెతకండి' : 'Book a Service'}</span>
              </Link>
            </div>
          </div>
        </div>

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
            <span>{isTelugu ? 'నా బుకింగ్‌లు & సేవలు' : 'My Bookings'}</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 text-white">
              {myBookings.length}
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
              {favProviders.length + favBusinesses.length + favProperties.length}
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
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                            {b.id}
                          </span>
                          {statusBadge(b.status)}
                          {b.urgent && (
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900">
                              {isTelugu ? 'అత్యవసరం' : 'Urgent'}
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

                          {b.completedAt && (
                            <span className="text-[11px] text-slate-400 block">
                              {isTelugu ? 'పూర్తయిన సమయం:' : 'Completed on:'} {b.completedAt}
                            </span>
                          )}
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

    </div>
  );
}
