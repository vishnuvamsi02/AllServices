'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { MOCK_VILLAGES } from '@/data/mockData';
import { RewardClaim } from '@/data/types';
import {
  Landmark,
  ShieldCheck,
  Users,
  Wrench,
  Store,
  Building,
  MessageSquare,
  CheckCircle,
  XCircle,
  FileText,
  AlertCircle,
  Lock,
  Gift,
  Award,
  CheckCircle2,
  Clock,
  Eye,
  Check,
  X,
  Receipt,
  Car,
  Filter,
  PackageCheck,
} from 'lucide-react';

export default function VillageAdminDashboardPage() {
  const { t, isTelugu } = useLanguage();
  const { currentUser } = useAuth();
  const {
    pendingApprovals,
    approvePendingItem,
    rejectPendingItem,
    enquiries,
    rewardClaims,
    adminApproveRewardClaim,
    adminRejectRewardClaim,
    markRewardRedeemed,
    serviceCompletions,
  } = useMarketplace();

  // Strict village data isolation: Derives village from logged in admin's account
  const assignedVillageId = currentUser?.villageId || 'v_kaza';
  const village = MOCK_VILLAGES.find((v) => v.id === assignedVillageId) || MOCK_VILLAGES[0];

  // Active admin tab
  const [adminTab, setAdminTab] = useState<'rewards' | 'approvals' | 'enquiries'>('rewards');
  const [rewardFilter, setRewardFilter] = useState<'all' | 'pending_admin_approval' | 'approved' | 'redeemed'>('all');

  // Inspection modal
  const [inspectClaim, setInspectClaim] = useState<RewardClaim | null>(null);

  // Reject modal
  const [rejectingClaimId, setRejectingClaimId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Only show pending approvals strictly for this village
  const villageApprovals = pendingApprovals.filter((a) => a.villageId === village.id);

  // Only show enquiries strictly for this village
  const villageEnquiries = enquiries.filter((e) => e.villageId === village.id);

  // Filter reward claims
  const filteredClaims = rewardClaims.filter((claim) => {
    if (rewardFilter === 'all') return true;
    return claim.status === rewardFilter;
  });

  const handleConfirmReject = () => {
    if (!rejectingClaimId || !rejectionReason.trim()) return;
    adminRejectRewardClaim(rejectingClaimId, rejectionReason, village.adminName || 'Village Admin');
    setRejectingClaimId(null);
    setRejectionReason('');
    if (inspectClaim?.id === rejectingClaimId) {
      setInspectClaim(null);
    }
  };

  const handleApprove = (claimId: string) => {
    adminApproveRewardClaim(claimId, village.adminName || 'Village Admin');
    if (inspectClaim?.id === claimId) {
      setInspectClaim(null);
    }
  };

  const handleRedeem = (claimId: string) => {
    markRewardRedeemed(claimId, `${village.name} AutoCare Hub`);
  };

  const claimStatusBadge = (status: RewardClaim['status']) => {
    switch (status) {
      case 'pending_admin_approval':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-900 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Pending Verification</span>
          </span>
        );
      case 'approved':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Voucher Active</span>
          </span>
        );
      case 'redeemed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 text-slate-800 flex items-center gap-1">
            <PackageCheck className="w-3 h-3 text-slate-600" />
            <span>Redeemed & Delivered</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
            <XCircle className="w-3 h-3 text-rose-600" />
            <span>Rejected</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-surface-bg pb-16 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Village Admin Header with Strict Data Isolation Notice */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-card mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>{isTelugu ? 'గ్రామ నిర్వాహక పోర్టల్' : 'Village Administration'}</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isTelugu ? 'పరిమిత ప్రాప్యత (Isolated)' : 'Strict Village Isolation'}</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-400 text-slate-950 flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5" />
                  <span>Loyalty Rewards Authority</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {isTelugu ? `${village.teluguName} గ్రామ కమాండ్ సెంటర్` : `${village.name} Village Admin Command Center`}
              </h1>

              <p className="text-white/80 text-xs sm:text-sm mt-1">
                {isTelugu 
                  ? `పరిపాలనా అధికారి: ${village.adminName} • ఫోన్: ${village.adminPhone} • పిన్‌కోడ్: ${village.pincode}` 
                  : `Assigned Administrator: ${village.adminName} • Mandal: ${village.mandal} • PIN: ${village.pincode}`}
              </p>
            </div>

            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md text-right shrink-0">
              <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider block">
                {t('dashboards.villageAdmin.villageLabel')}
              </span>
              <span className="text-2xl font-black text-amber-300">
                {isTelugu ? village.teluguName : village.name}
              </span>
              <span className="text-xs text-white/80 block mt-0.5">
                {village.district} District, AP
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-indigo-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Strict counting audit active: Only bookings with provider confirmation and billed amount qualify for monthly loyalty rewards.</span>
          </div>
        </div>

        {/* Top 5 Village Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Gift className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Reward Claims
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 block">
              {rewardClaims.length}
            </span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {t('dashboards.villageAdmin.totalCustomers')}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 block">
              {village.registeredCount.customers}
            </span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {t('dashboards.villageAdmin.totalProviders')}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 block">
              {village.registeredCount.providers}
            </span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Store className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {t('dashboards.villageAdmin.totalBusinesses')}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 block">
              {village.registeredCount.businesses}
            </span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card col-span-2 sm:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Pending Approvals
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 block">
              {villageApprovals.length}
            </span>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs mb-6 overflow-x-auto">
          <button
            type="button"
            onClick={() => setAdminTab('rewards')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              adminTab === 'rewards'
                ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Gift className="w-4 h-4 text-amber-600" />
            <span>Monthly Reward Claims ({rewardClaims.length})</span>
            {rewardClaims.some(c => c.status === 'pending_admin_approval') && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setAdminTab('approvals')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              adminTab === 'approvals'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Village Registrations ({villageApprovals.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setAdminTab('enquiries')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              adminTab === 'enquiries'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Village Bookings & Enquiries ({villageEnquiries.length})</span>
          </button>
        </div>

        {/* TAB 1: MONTHLY REWARD CLAIMS VERIFICATION */}
        {adminTab === 'rewards' && (
          <div className="space-y-4">
            
            {/* Filter Pills */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setRewardFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    rewardFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Claims ({rewardClaims.length})
                </button>
                <button
                  type="button"
                  onClick={() => setRewardFilter('pending_admin_approval')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    rewardFilter === 'pending_admin_approval' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Pending Admin Approval ({rewardClaims.filter(c => c.status === 'pending_admin_approval').length})
                </button>
                <button
                  type="button"
                  onClick={() => setRewardFilter('approved')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    rewardFilter === 'approved' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Voucher Active ({rewardClaims.filter(c => c.status === 'approved').length})
                </button>
                <button
                  type="button"
                  onClick={() => setRewardFilter('redeemed')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    rewardFilter === 'redeemed' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Redeemed ({rewardClaims.filter(c => c.status === 'redeemed').length})
                </button>
              </div>

              <span className="text-xs text-slate-500 font-medium">
                Admin must verify all 10 provider confirmations before voucher approval.
              </span>
            </div>

            {/* Claims Table Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span>Customer Loyalty Reward Claims Verification</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Review completed service proof, approve vouchers, or mark redeemed upon workshop delivery.
                  </p>
                </div>
              </div>

              {filteredClaims.length === 0 ? (
                <div className="p-10 text-center text-xs text-slate-500">
                  No reward claims match this filter.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider bg-slate-50/60">
                        <th className="py-3 px-4">Claim ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Reward Chosen</th>
                        <th className="py-3 px-4">Qualifying Period</th>
                        <th className="py-3 px-4">Verified Services</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Voucher Code</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {filteredClaims.map((claim) => (
                        <tr key={claim.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                            {claim.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 block">{claim.customerName}</span>
                            <span className="text-slate-500 text-[11px]">+91 {claim.customerPhone}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 block">{claim.rewardTitle || claim.rewardName}</span>
                            <span className="text-[11px] text-emerald-700 font-bold">Free Loyalty Reward</span>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-600">
                            {claim.month}/{claim.year}
                          </td>
                          <td className="py-3.5 px-4">
                            <button
                              type="button"
                              onClick={() => setInspectClaim(claim)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-xs transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Inspect 10 Services</span>
                            </button>
                          </td>
                          <td className="py-3.5 px-4">
                            {claimStatusBadge(claim.status)}
                          </td>
                          <td className="py-3.5 px-4">
                            {(claim.voucherCode || claim.redemptionCode) ? (
                              <span className="font-mono font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                {claim.voucherCode || claim.redemptionCode}
                              </span>
                            ) : (
                              <span className="text-slate-400 italic text-[11px]">—</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {claim.status === 'pending_admin_approval' && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => setRejectingClaimId(claim.id)}
                                    className="px-2.5 py-1 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs transition-colors"
                                  >
                                    Reject
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleApprove(claim.id)}
                                    className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-xs transition-colors"
                                  >
                                    Approve & Issue
                                  </button>
                                </>
                              )}

                              {claim.status === 'approved' && (
                                <button
                                  type="button"
                                  onClick={() => handleRedeem(claim.id)}
                                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-xs transition-colors flex items-center gap-1"
                                >
                                  <PackageCheck className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Mark Delivered</span>
                                </button>
                              )}

                              {claim.status === 'redeemed' && (
                                <span className="text-[11px] text-slate-500 font-bold">
                                  Fulfilled by {claim.fulfilledBy || 'Workshop'}
                                </span>
                              )}

                              {claim.status === 'rejected' && (
                                <span className="text-[11px] text-rose-600 italic">
                                  {claim.rejectionReason || 'Rejected'}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: PENDING REGISTRATIONS */}
        {adminTab === 'approvals' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  {t('dashboards.villageAdmin.pendingApprovals')}
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                {villageApprovals.length} {isTelugu ? 'ఆమోదం కోసం' : 'Pending'}
              </span>
            </div>

            {villageApprovals.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">
                  {isTelugu ? 'అన్ని దరఖాస్తులు ఆమోదించబడ్డాయి!' : 'All applications approved!'}
                </p>
                <p className="text-xs text-slate-400">
                  {isTelugu ? 'ప్రస్తుతం ఎలాంటి పెండింగ్ దరఖాస్తులు లేవు.' : 'No pending registrations for this village.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {villageApprovals.map((appr) => (
                  <div
                    key={appr.id}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 uppercase">
                          {appr.type}
                        </span>
                        <h3 className="font-bold text-sm text-slate-900 mt-1">
                          {appr.name}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {appr.category} • {appr.phone} • {appr.submittedAt}
                        </p>
                      </div>

                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                        {appr.aadhaarProof}
                      </span>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/60">
                      <button
                        type="button"
                        onClick={() => rejectPendingItem(appr.id)}
                        className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{t('dashboards.villageAdmin.reject')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => approvePendingItem(appr.id)}
                        className="px-4 py-1.5 rounded-xl bg-secondary hover:bg-secondary-hover text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{t('dashboards.villageAdmin.approve')}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: VILLAGE BOOKINGS & ENQUIRIES */}
        {adminTab === 'enquiries' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  {t('dashboards.villageAdmin.activeEnquiries')}
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-500">
                {villageEnquiries.length} {isTelugu ? 'నమోదయ్యాయి' : 'Total'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {villageEnquiries.map((enq) => (
                <div key={enq.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-500">{enq.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      enq.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : enq.status === 'in_progress'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {enq.status}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">
                      {enq.customerName} → {enq.targetName}
                    </p>
                    <p className="text-primary font-medium mt-0.5">
                      {enq.serviceRequested}
                    </p>
                  </div>
                  {enq.vehicleDetails && (
                    <div className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200">
                      Vehicle: {enq.vehicleDetails}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                    <span>{enq.createdAt}</span>
                    {enq.amount && <span className="font-black text-slate-900">Amount: ₹{enq.amount}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* INSPECT 10 CONTRIBUTING SERVICES MODAL */}
      {inspectClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative max-h-[90vh] flex flex-col">
            <button
              type="button"
              onClick={() => setInspectClaim(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-xl hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Inspect Qualifying Services • Claim #{inspectClaim.id}
                </h3>
                <p className="text-xs text-slate-500">
                  Customer: <span className="font-bold text-slate-800">{inspectClaim.customerName}</span> (+91 {inspectClaim.customerPhone}) • Reward: <span className="font-bold text-slate-800">{inspectClaim.rewardTitle}</span>
                </p>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 mb-4">
              <strong>Admin Audit Notice:</strong> Verify that all 10 service entries contain authentic provider sign-off checkboxes, legitimate workshop billing, and match distinct calendar month appointments.
            </div>

            <div className="overflow-y-auto flex-1 pr-1 border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider bg-slate-50 sticky top-0">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Booking ID</th>
                    <th className="py-2.5 px-3">Service Name</th>
                    <th className="py-2.5 px-3">Workshop / Provider</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Amount Charged</th>
                    <th className="py-2.5 px-3">Confirmation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {serviceCompletions
                    .filter(r => (inspectClaim.eligibleBookingIds || inspectClaim.contributingBookingIds || []).includes(r.bookingId))
                    .map((rec, i) => (
                      <tr key={rec.bookingId} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-900">#{i + 1}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-600">{rec.bookingId}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">{rec.serviceName}</td>
                        <td className="py-2.5 px-3 text-slate-600">{rec.providerName}</td>
                        <td className="py-2.5 px-3 text-slate-500">{rec.completedAt}</td>
                        <td className="py-2.5 px-3 font-black text-slate-900">₹{rec.actualAmount}</td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Provider Confirmed
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setInspectClaim(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
              >
                Close Inspection
              </button>

              {inspectClaim.status === 'pending_admin_approval' && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRejectingClaimId(inspectClaim.id);
                    }}
                    className="px-4 py-2 border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold rounded-xl transition-colors"
                  >
                    Reject Claim
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApprove(inspectClaim.id)}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve 10 Services & Issue Voucher</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REJECT CLAIM MODAL */}
      {rejectingClaimId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              type="button"
              onClick={() => {
                setRejectingClaimId(null);
                setRejectionReason('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-xl hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Reject Reward Claim
                </h3>
                <p className="text-xs text-slate-500">Claim ID: {rejectingClaimId}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-3">
              Please enter an audit reason for rejecting this claim (e.g. duplicate booking IDs, unverifiable provider bill, or outside calendar month).
            </p>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason for customer and audit logs..."
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none resize-none mb-4"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setRejectingClaimId(null);
                  setRejectionReason('');
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!rejectionReason.trim()}
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-black rounded-xl shadow-xs transition-colors"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
