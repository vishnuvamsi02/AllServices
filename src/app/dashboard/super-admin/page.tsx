'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { MOCK_VILLAGES, MOCK_CATEGORIES } from '@/data/mockData';
import { Village } from '@/data/types';
import {
  Crown,
  Landmark,
  Users,
  Wrench,
  Store,
  Building,
  MessageSquare,
  Plus,
  Search,
  CheckCircle,
  TrendingUp,
  Settings,
  Grid,
  Shield,
  Layers,
  ChevronRight,
  Filter,
  Gift,
  Award,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  Sparkles,
  PackageCheck,
  Check,
} from 'lucide-react';

export default function SuperAdminDashboardPage() {
  const { t, isTelugu } = useLanguage();
  const { villages } = useLocation();
  const {
    enquiries,
    providers,
    businesses,
    properties,
    rewardConfig,
    rewardDefinitions,
    rewardAuditLogs,
    updateRewardConfig,
    updateRewardDefinition,
    showToast,
  } = useMarketplace();

  const [selectedVillageScope, setSelectedVillageScope] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'villages' | 'categories' | 'rewards_config'>('overview');
  const [showAddVillageModal, setShowAddVillageModal] = useState(false);

  // Reward Config Form State
  const [servicesThreshold, setServicesThreshold] = useState(rewardConfig?.servicesRequiredCount || 10);
  const [resetDay, setResetDay] = useState(rewardConfig?.resetDayOfMonth || 1);
  const [loyaltyEnabled, setLoyaltyEnabled] = useState(rewardConfig?.enabled ?? true);

  // New Village form state
  const [newVillageName, setNewVillageName] = useState('');
  const [newVillageTelugu, setNewVillageTelugu] = useState('');
  const [newVillageMandal, setNewVillageMandal] = useState('');
  const [newVillageDistrict, setNewVillageDistrict] = useState('Guntur');
  const [newVillagePincode, setNewVillagePincode] = useState('');
  const [newVillageAdmin, setNewVillageAdmin] = useState('');

  // Active village list
  const [allVillagesList, setAllVillagesList] = useState<Village[]>(MOCK_VILLAGES);

  const handleAddVillage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVillageName) return;

    const newV: Village = {
      id: `v_${Date.now()}`,
      name: newVillageName,
      teluguName: newVillageTelugu || newVillageName,
      code: `AP-${newVillageDistrict.substring(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 89)}`,
      mandal: newVillageMandal,
      district: newVillageDistrict,
      pincode: newVillagePincode,
      population: 5000,
      adminName: newVillageAdmin || 'Assigned Officer',
      adminPhone: '9848099881',
      status: 'active',
      registeredCount: {
        customers: 12,
        providers: 2,
        businesses: 3,
        properties: 1,
        enquiries: 0,
      },
    };

    setAllVillagesList([newV, ...allVillagesList]);
    setShowAddVillageModal(false);
    setNewVillageName('');
    setNewVillageTelugu('');
    setNewVillageMandal('');
    setNewVillagePincode('');
  };

  // Aggregated totals
  const totalPop = allVillagesList.reduce((acc, v) => acc + v.population, 0);
  const totalCustomers = allVillagesList.reduce((acc, v) => acc + v.registeredCount.customers, 0);
  const totalProviders = allVillagesList.reduce((acc, v) => acc + v.registeredCount.providers, 0);
  const totalBusinesses = allVillagesList.reduce((acc, v) => acc + v.registeredCount.businesses, 0);
  const totalProperties = allVillagesList.reduce((acc, v) => acc + v.registeredCount.properties, 0);
  const totalEnquiries = allVillagesList.reduce((acc, v) => acc + v.registeredCount.enquiries, 0);

  return (
    <div className="bg-surface-bg pb-10 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Super Admin Master Header */}
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-card mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/30 text-purple-200 border border-purple-500/40 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isTelugu ? 'ఆంధ్రప్రదేశ్ రాష్ట్ర సమగ్ర వేదిక' : 'State-Wide Master Control Console'}</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white">
                  {allVillagesList.length} {isTelugu ? 'క్రియాశీల గ్రామాలు' : 'Active Villages'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {t('dashboards.superAdmin.title')}
              </h1>
              <p className="text-white/80 text-xs sm:text-sm mt-1">
                {t('dashboards.superAdmin.subtitle')}
              </p>
            </div>

            {/* Village Scope Dropdown */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider block px-1 mb-1">
                  {t('dashboards.superAdmin.viewingVillage')}
                </span>
                <select
                  value={selectedVillageScope}
                  onChange={(e) => setSelectedVillageScope(e.target.value)}
                  className="bg-slate-900 text-white font-bold text-xs sm:text-sm py-2 px-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="all">{t('dashboards.superAdmin.allVillagesOption')}</option>
                  {allVillagesList.map((v) => (
                    <option key={v.id} value={v.id}>
                      {isTelugu ? v.teluguName : v.name} ({v.district})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setShowAddVillageModal(true)}
                className="px-5 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{t('dashboards.superAdmin.addVillage')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 6 High-Level Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-card">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t('dashboards.superAdmin.totalVillages')}
            </span>
            <span className="text-2xl font-black text-purple-700 mt-1 block">
              {allVillagesList.length}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">100% Operational</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-card">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t('dashboards.superAdmin.totalVillageAdmins')}
            </span>
            <span className="text-2xl font-black text-indigo-700 mt-1 block">
              {allVillagesList.length}
            </span>
            <span className="text-[10px] text-slate-500">1 per village</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-card">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isTelugu ? 'మొత్తం వినియోగదారులు' : 'Total Customers'}
            </span>
            <span className="text-2xl font-black text-primary mt-1 block">
              {totalCustomers}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">+14% this month</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-card">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isTelugu ? 'సేవా నిపుణులు' : 'Providers'}
            </span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">
              {totalProviders}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">Verified</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-card">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isTelugu ? 'గ్రామ దుకాణాలు' : 'Businesses'}
            </span>
            <span className="text-2xl font-black text-amber-600 mt-1 block">
              {totalBusinesses}
            </span>
            <span className="text-[10px] text-slate-500">Local shops</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-card">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {isTelugu ? 'మొత్తం విచారణలు' : 'Total Enquiries'}
            </span>
            <span className="text-2xl font-black text-rose-600 mt-1 block">
              {totalEnquiries}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">94% Response</span>
          </div>
        </div>

        {/* Navigation Tabs for Super Admin */}
        <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200/90 shadow-sm mb-8 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'overview'
                ? 'bg-purple-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{t('dashboards.superAdmin.villageComparison')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('villages')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'villages'
                ? 'bg-purple-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>{t('dashboards.superAdmin.manageVillages')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'categories'
                ? 'bg-purple-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>{t('dashboards.superAdmin.globalCategories')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('rewards_config')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'rewards_config'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Gift className="w-4 h-4 text-amber-600" />
            <span>Loyalty Rewards & Audits</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-300 text-slate-950 font-black">
              {rewardConfig?.servicesRequiredCount || 10} Services
            </span>
          </button>
        </div>

        {/* Tab 1: Village Comparison Table */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {isTelugu ? 'గ్రామాల సమగ్ర పనితీరు పోలిక పట్టిక' : 'Multi-Village Performance Benchmark'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {isTelugu 
                    ? 'ప్రతి గ్రామం యొక్క జనాభా, నిపుణుల సంఖ్య, దుకాణాలు మరియు విచారణల విశ్లేషణ' 
                    : 'Compare population coverage, registered providers, local shops, and citizen enquiry volume'}
                </p>
              </div>

              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
                {allVillagesList.length} Villages in Andhra Pradesh
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 rounded-l-xl">Village & Code</th>
                    <th className="py-3.5 px-4">Mandal / District</th>
                    <th className="py-3.5 px-4">Village Admin</th>
                    <th className="py-3.5 px-4 text-center">Customers</th>
                    <th className="py-3.5 px-4 text-center">Providers</th>
                    <th className="py-3.5 px-4 text-center">Businesses</th>
                    <th className="py-3.5 px-4 text-center">Enquiries</th>
                    <th className="py-3.5 px-4 rounded-r-xl text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allVillagesList.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-extrabold text-slate-900">
                          {isTelugu ? v.teluguName : v.name}
                        </div>
                        <div className="font-mono text-[11px] text-slate-400">{v.code}</div>
                      </td>

                      <td className="py-4 px-4 text-slate-600">
                        <div>{v.mandal}</div>
                        <div className="text-[11px] text-slate-400">{v.district} District • {v.pincode}</div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-800">{v.adminName}</div>
                        <div className="text-[11px] text-slate-400">{v.adminPhone}</div>
                      </td>

                      <td className="py-4 px-4 text-center font-bold text-slate-800">
                        {v.registeredCount.customers}
                      </td>

                      <td className="py-4 px-4 text-center font-bold text-emerald-700">
                        {v.registeredCount.providers}
                      </td>

                      <td className="py-4 px-4 text-center font-bold text-amber-700">
                        {v.registeredCount.businesses}
                      </td>

                      <td className="py-4 px-4 text-center font-bold text-purple-700">
                        {v.registeredCount.enquiries}
                      </td>

                      <td className="py-4 px-4 text-right">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Village Management */}
        {activeTab === 'villages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {isTelugu ? 'గ్రామాల జాబితా & నిర్వాహకుల నిర్వహణ' : 'Village Management & Administrator Assignment'}
              </h2>
              <button
                type="button"
                onClick={() => setShowAddVillageModal(true)}
                className="px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>{t('dashboards.superAdmin.addVillage')}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allVillagesList.map((v) => (
                <div key={v.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-extrabold text-lg text-slate-900">
                        {isTelugu ? v.teluguName : v.name}
                        <span className="text-xs text-slate-400 font-normal ml-1">({v.name})</span>
                      </h3>
                      <p className="text-xs text-slate-500">{v.mandal}, {v.district} • {v.pincode}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {v.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1">
                    <span className="text-slate-400 font-bold uppercase">{isTelugu ? 'కేటాయించిన గ్రామ అడ్మిన్:' : 'Assigned Village Admin:'}</span>
                    <p className="font-bold text-slate-900">{v.adminName}</p>
                    <p className="text-slate-500">Phone: {v.adminPhone}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Providers</span>
                      <span className="font-bold text-slate-900">{v.registeredCount.providers}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Shops</span>
                      <span className="font-bold text-slate-900">{v.registeredCount.businesses}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Enquiries</span>
                      <span className="font-bold text-slate-900">{v.registeredCount.enquiries}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Global Categories */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mb-4">
              {t('dashboards.superAdmin.globalCategories')}
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              {isTelugu 
                ? 'ఆంధ్రప్రదేశ్ రాష్ట్రవ్యాప్తంగా వర్తించే ప్రామాణిక సేవా కేటగిరీలు' 
                : 'Master categories configured by Super Admin, available across all villages'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MOCK_CATEGORIES.map((c) => (
                <div key={c.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <h4 className="font-bold text-sm text-slate-900">
                    {isTelugu ? c.teluguName : c.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {c.description}
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-bold text-primary">
                    {c.popularServices.length} sub-services
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Loyalty Rewards Engine & Statewide Audits */}
        {activeTab === 'rewards_config' && (
          <div className="space-y-6">
            
            {/* Global Engine Configuration Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                      Master Loyalty Engine Policy
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      Statewide Active
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 mt-2">
                    Monthly 10 Services Loyalty Reward Rules
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Controls customer eligibility thresholds, monthly calendar reset schedules, and mandatory provider confirmation rules.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    updateRewardConfig({
                      servicesRequiredCount: Number(servicesThreshold),
                      resetDayOfMonth: Number(resetDay),
                      enabled: loyaltyEnabled,
                    });
                    showToast('success', 'Policy Updated', 'Master Loyalty Policy configuration updated successfully!');
                  }}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Save Engine Settings</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Services Required Count per Month
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={servicesThreshold}
                    onChange={(e) => setServicesThreshold(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Customers must complete exactly this number of verified services within a calendar month to claim.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Monthly Reset Calendar Day
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={28}
                    value={resetDay}
                    onChange={(e) => setResetDay(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Day 1 of every month resets counts back to 0 while archiving prior vouchers.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Program Status
                  </label>
                  <button
                    type="button"
                    onClick={() => setLoyaltyEnabled(!loyaltyEnabled)}
                    className={`w-full p-3 rounded-xl border text-sm font-black transition-all flex items-center justify-between ${
                      loyaltyEnabled
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-rose-50 border-rose-300 text-rose-800'
                    }`}
                  >
                    <span>{loyaltyEnabled ? 'Active & Enforcing' : 'Program Paused'}</span>
                    <span className={`w-3 h-3 rounded-full ${loyaltyEnabled ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  </button>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Strict audit enforces: Provider Confirmation checkbox = true, and actualAmount &gt; 0.
                  </p>
                </div>
              </div>
            </div>

            {/* Rewards Catalog & Allocation */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
              <h3 className="text-lg font-black text-slate-900 mb-1 flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-500" />
                <span>Rewards Catalog & Partner Workshop Fulfillment Inventory</span>
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Active loyalty catalog offerings unlocked once 10 completed automotive services are verified.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {rewardDefinitions.map((reward) => (
                  <div
                    key={reward.id}
                    className="p-5 rounded-3xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl">{reward.icon}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                          reward.active ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {reward.active ? 'Active' : 'Disabled'}
                        </span>
                      </div>
                      <h4 className="text-base font-black text-slate-900">{isTelugu ? reward.teluguName : reward.name}</h4>
                      <p className="text-xs text-slate-600 mt-1">{isTelugu ? reward.teluguDescription : reward.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 text-xs space-y-2">
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-500">Retail Value:</span>
                        <span className="text-slate-900">₹{reward.retailValue}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-500">Voucher Validity:</span>
                        <span className="text-slate-900">60 Days</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-500">Workshop Stock:</span>
                        <span className="text-emerald-700 font-black">{reward.inventoryCount} Units</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          updateRewardDefinition(reward.id, { active: !reward.active });
                          showToast('info', 'Reward Status', `Toggled "${reward.name}" ${!reward.active ? 'Active' : 'Inactive'}`);
                        }}
                        className="w-full mt-2 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 text-xs font-bold transition-colors"
                      >
                        {reward.active ? 'Disable Reward' : 'Enable Reward'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Trail Log */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-600" />
                    <span>Real-Time Statewide Loyalty Audit Trail</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Immutable event log capturing all claim creations, admin approvals, rejections, and redemptions.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {rewardAuditLogs.length} Events Logged
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider bg-slate-50/60">
                      <th className="py-2.5 px-3">Timestamp</th>
                      <th className="py-2.5 px-3">Event Action</th>
                      <th className="py-2.5 px-3">Claim ID</th>
                      <th className="py-2.5 px-3">Actor / Admin</th>
                      <th className="py-2.5 px-3">Audit Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {rewardAuditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-mono text-slate-500">{log.timestamp}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            log.action === 'CLAIM_APPROVED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : log.action === 'REWARD_REDEEMED'
                              ? 'bg-blue-100 text-blue-800'
                              : log.action === 'CLAIM_REJECTED'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {log.action.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-slate-800">{log.claimId || '—'}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">{log.actor}</td>
                        <td className="py-3 px-3 text-slate-600 max-w-xs truncate">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Add Village Modal */}
        {showAddVillageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-100 shadow-2xl">
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                {isTelugu ? 'కొత్త గ్రామాన్ని జోడించండి' : 'Add New Village to Platform'}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {isTelugu ? 'ఆంధ్రప్రదేశ్ లోని కొత్త గ్రామాన్ని మరియు అడ్మిన్‌ను నమోదు చేయండి' : 'Configure village boundaries and assign an official Village Admin'}
              </p>

              <form onSubmit={handleAddVillage} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Village Name (English) *
                  </label>
                  <input
                    type="text"
                    value={newVillageName}
                    onChange={(e) => setNewVillageName(e.target.value)}
                    placeholder="e.g. Bapatla Rural"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    గ్రామం పేరు (తెలుగు) *
                  </label>
                  <input
                    type="text"
                    value={newVillageTelugu}
                    onChange={(e) => setNewVillageTelugu(e.target.value)}
                    placeholder="ఉదా: బాపట్ల గ్రామీణ"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mandal *
                    </label>
                    <input
                      type="text"
                      value={newVillageMandal}
                      onChange={(e) => setNewVillageMandal(e.target.value)}
                      placeholder="e.g. Bapatla"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={newVillagePincode}
                      onChange={(e) => setNewVillagePincode(e.target.value)}
                      placeholder="522101"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Assign Village Admin Name *
                  </label>
                  <input
                    type="text"
                    value={newVillageAdmin}
                    onChange={(e) => setNewVillageAdmin(e.target.value)}
                    placeholder="e.g. K. Prasad Rao"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddVillageModal(false)}
                    className="flex-1 py-2.5 bg-slate-100 rounded-xl font-bold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-primary text-white rounded-xl font-bold shadow"
                  >
                    Create Village
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
