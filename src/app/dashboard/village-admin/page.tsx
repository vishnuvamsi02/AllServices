'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { MOCK_VILLAGES } from '@/data/mockData';
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
} from 'lucide-react';

export default function VillageAdminDashboardPage() {
  const { t, isTelugu } = useLanguage();
  const { currentUser } = useAuth();
  const { pendingApprovals, approvePendingItem, rejectPendingItem, enquiries } = useMarketplace();

  // Strict village data isolation: Derives village from logged in admin's account
  const assignedVillageId = currentUser?.villageId || 'v_kaza';
  const village = MOCK_VILLAGES.find((v) => v.id === assignedVillageId) || MOCK_VILLAGES[0];

  // Only show pending approvals strictly for this village
  const villageApprovals = pendingApprovals.filter((a) => a.villageId === village.id);

  // Only show enquiries strictly for this village
  const villageEnquiries = enquiries.filter((e) => e.villageId === village.id);

  return (
    <div className="bg-surface-bg pb-10 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Village Admin Header with Strict Data Isolation Notice */}
        <div className="bg-gradient-to-r from-indigo-900 via-primary to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-card mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>{isTelugu ? 'గ్రామ నిర్వాహక పోర్టల్' : 'Village Administration'}</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-900 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isTelugu ? 'పరిమిత ప్రాప్యత (Isolated)' : 'Strict Village Isolation'}</span>
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
            <span>{t('dashboards.villageAdmin.restrictedNotice')}</span>
          </div>
        </div>

        {/* 5 Village Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
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

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Building className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {t('dashboards.villageAdmin.totalProperties')}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 block">
              {village.registeredCount.properties}
            </span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card col-span-2 sm:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {isTelugu ? 'గ్రామ విచారణలు' : 'Enquiries'}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 block">
              {village.registeredCount.enquiries}
            </span>
          </div>
        </div>

        {/* Approvals Section & Enquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Pending Approvals Queue */}
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

          {/* Local Village Enquiries Log */}
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

            <div className="space-y-3">
              {villageEnquiries.map((enq) => (
                <div key={enq.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-500">{enq.id}</span>
                    <span className="font-bold text-primary uppercase">{enq.status}</span>
                  </div>
                  <p className="font-semibold text-slate-900">
                    {enq.customerName} → {enq.targetName}
                  </p>
                  <p className="text-slate-500 truncate">
                    {enq.serviceRequested} ({enq.createdAt})
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
