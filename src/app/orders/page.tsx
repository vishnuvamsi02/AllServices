'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { WriteReviewModal } from '@/components/common/WriteReviewModal';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import {
  Inbox,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Star,
  Clock,
  Phone,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  Receipt,
  Wrench,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const { t, isTelugu } = useLanguage();
  const { enquiries } = useMarketplace();

  const [reviewModalTarget, setReviewModalTarget] = useState<{ name: string; id: string } | null>(null);

  // Stats calculation
  const totalEnquiries = enquiries.length;
  const todayEnquiries = enquiries.filter((e) => e.createdAt.includes('Today')).length;
  const completedJobs = enquiries.filter((e) => e.status === 'completed').length;

  return (
    <div className="bg-surface-bg pb-12">
      {/* Mobile App Top Bar matching Scazo Screen 06 */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3.5 flex items-center justify-between shadow-xs mb-4">
        <Link
          href="/"
          className="p-2 -ml-1 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          title="Back to Home"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-black text-slate-900 tracking-tight">
          {t('ordersScreen.title')}
        </h1>
        <LanguageSelector compact />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Tab Header matching Screen 06 */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            type="button"
            className="pb-2.5 px-4 text-sm font-extrabold text-primary border-b-2 border-primary"
          >
            {t('ordersScreen.enquiriesTab')}
          </button>
        </div>

        {/* Gradient Statistic Counter Cards matching Screen 06 */}
        <div className="rounded-3xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white p-5 sm:p-6 shadow-md mb-6 grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mx-auto text-white">
              <Inbox className="w-4 h-4" />
            </div>
            <span className="text-2xl sm:text-3xl font-black block">
              {totalEnquiries}
            </span>
            <span className="text-xs text-white/90 font-bold block">
              {t('ordersScreen.totalEnquiries')}
            </span>
          </div>

          <div className="space-y-1 border-l border-white/20">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mx-auto text-white">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-2xl sm:text-3xl font-black block">
              {completedJobs}
            </span>
            <span className="text-xs text-white/90 font-bold block">
              {isTelugu ? 'పూర్తయినవి' : 'Completed Services'}
            </span>
          </div>
        </div>

        {/* Bookings & Enquiries List */}
        {enquiries.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-card">
            <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-600">
              {t('ordersScreen.noEnquiries')}
            </p>
            <Link
              href="/services"
              className="mt-4 inline-block px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl"
            >
              {isTelugu ? 'సేవలను అన్వేషించండి' : 'Browse Services'}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {enquiries.map((enq) => {
              const isCompleted = enq.status === 'completed';

              return (
                <div
                  key={enq.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card space-y-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-sky-100 text-primary font-black text-lg flex items-center justify-center shrink-0">
                        {enq.targetName.charAt(0)}
                      </div>
                      <div>
                        <span className="font-mono text-[11px] font-bold text-slate-400 block">
                          {enq.id}
                        </span>
                        <h3 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                          {enq.targetName}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          {enq.serviceRequested} ({enq.villageName})
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs text-slate-400 font-medium block">
                        {enq.createdAt}
                      </span>
                    </div>
                  </div>

                  {/* Message note */}
                  <div className="p-3 bg-slate-50 rounded-2xl text-xs text-slate-600 italic">
                    "{enq.message}"
                  </div>

                  {/* Completed Job Work Description & Amount */}
                  {isCompleted && (
                    <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-extrabold text-emerald-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{isTelugu ? 'పని పూర్తయిన వివరాలు:' : 'Verified Completion Details:'}</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white font-black text-xs">
                          {isTelugu ? 'చెల్లించిన మొత్తం:' : 'Final Amount:'} {enq.amount || `₹${enq.amountCharged}`}
                        </span>
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {enq.workDescription || (isTelugu ? 'పని సంతృప్తికరంగా పూర్తయింది.' : 'Job completed successfully.')}
                      </p>
                    </div>
                  )}

                  {/* Bottom Badges & Verified Review Workflow */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{enq.status.replace('_', ' ').toUpperCase()}</span>
                    </span>

                    {/* Strict Workflow: Reviews only available if job is completed */}
                    {isCompleted ? (
                      enq.reviewSubmitted ? (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{isTelugu ? `మీరు ${enq.rating}★ సమీక్ష ఇచ్చారు` : `Reviewed (${enq.rating}★)`}</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setReviewModalTarget({ name: enq.targetName, id: enq.id })}
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold rounded-xl shadow-xs flex items-center gap-1.5 transition-all active:scale-95 animate-pulse"
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{t('ordersScreen.writeReview')}</span>
                        </button>
                      )
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">
                        {isTelugu
                          ? 'పని పూర్తయిన తర్వాత సమీక్ష రాయవచ్చు'
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

      {/* Write Review Modal */}
      {reviewModalTarget && (
        <WriteReviewModal
          isOpen={true}
          onClose={() => setReviewModalTarget(null)}
          targetName={reviewModalTarget.name}
          enquiryId={reviewModalTarget.id}
        />
      )}

    </div>
  );
}
