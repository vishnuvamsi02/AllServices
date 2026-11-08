'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  Store,
  ShieldCheck,
  Clock,
  MapPin,
  Star,
  Phone,
  MessageCircle,
  Package,
  TrendingUp,
  Users,
  CheckCircle2,
  Calendar,
  IndianRupee,
  Plus,
  LogIn,
  ShoppingBag,
  Tag,
} from 'lucide-react';
import Link from 'next/link';

export default function BusinessDashboardPage() {
  const { t, isTelugu } = useLanguage();
  const { currentUser, isLoggedIn, role } = useAuth();
  const { businesses, enquiries, updateEnquiryStatus } = useMarketplace();

  const isGuest = !isLoggedIn || role === 'guest';
  const myBusiness = businesses[0];

  // Inquiries for this business
  const businessEnquiries = enquiries.filter(
    (e) => e.targetId === myBusiness.id || e.targetType === 'business'
  );

  const [activeTab, setActiveTab] = useState<'orders' | 'catalog' | 'profile' | 'reviews'>('orders');

  const productsList = [
    { id: 'prd_1', name: 'BPT 5204 Samba Masuri Certified Seed (30kg)', teluguName: 'బి.పి.టి 5204 సాంబా మసూరి వరి విత్తనాలు (30 కేజీ)', price: '₹1,250', stock: 'In Stock (45 bags)', category: 'Seeds' },
    { id: 'prd_2', name: 'Neem Coated Urea (45kg Bag)', teluguName: 'వేప పూత పూసిన యూరియా (45 కేజీ)', price: '₹266.50', stock: 'In Stock (80 bags)', category: 'Fertilizers' },
    { id: 'prd_3', name: 'DAP 18:46:0 Fertilizer (50kg)', teluguName: 'డి.ఎ.పి 18:46:0 ఎరువుల బస్తా (50 కేజీ)', price: '₹1,350', stock: 'In Stock (30 bags)', category: 'Fertilizers' },
    { id: 'prd_4', name: 'Bio-Organic Potassium Humate (1L)', teluguName: 'సేంద్రీయ పొటాషియం హ్యూమేట్ గ్రోత్ టానిక్', price: '₹480', stock: 'In Stock (120 bottles)', category: 'Bio-Agro' },
    { id: 'prd_5', name: 'Hybrid Cotton RCH-659 BG-II (450g)', teluguName: 'హైబ్రిడ్ పత్తి విత్తనాలు బి.జి-2', price: '₹864', stock: 'Low Stock (12 pkts)', category: 'Seeds' },
  ];

  const stats = [
    { label: isTelugu ? 'మొత్తం కస్టమర్ ఎంక్వైరీలు' : 'Total Customer Leads', value: businessEnquiries.length + 24, icon: Users, color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { label: isTelugu ? 'యాక్టివ్ ఆర్డర్లు' : 'Active Orders', value: businessEnquiries.filter(e => e.status !== 'completed').length || 2, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: isTelugu ? 'లిస్ట్ చేసిన ఉత్పత్తులు' : 'Catalog Products', value: productsList.length, icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: isTelugu ? 'ఈ నెల అమ్మకాల పరిమాణం' : 'Est. Monthly Sales', value: '₹1,42,000', icon: IndianRupee, color: 'text-purple-600', bg: 'bg-purple-50' },
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
                  {isTelugu ? 'వ్యాపార పోర్టల్ ప్రివ్యూ మోడ్' : 'Local Business Preview Mode'}
                </h4>
                <p className="text-xs text-amber-800">
                  {isTelugu
                    ? 'మీ దుకాణం ఉత్పత్తులు మరియు కస్టమర్ ఆర్డర్లను నిర్వహించడానికి లాగిన్ అవ్వండి.'
                    : 'Log in to manage your shop catalog, respond to village leads, and track customer inquiries.'}
                </p>
              </div>
            </div>
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isTelugu ? 'లాగిన్ చేయండి' : 'Login as Business'}</span>
            </Link>
          </div>
        )}

        {/* Business Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-card mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={myBusiness.image}
                alt={myBusiness.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-md shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white">
                    {isTelugu ? myBusiness.categoryTelugu : myBusiness.category}
                  </span>
                  {myBusiness.isVerified && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary text-white flex items-center gap-1 shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{isTelugu ? 'గ్రామ సచివాలయ ధృవీకృతం' : 'Verified Business'}</span>
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {isTelugu ? myBusiness.teluguName : myBusiness.name}
                </h1>
                <p className="text-white/80 text-xs sm:text-sm mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{isTelugu ? `${myBusiness.villageTelugu} గ్రామ వ్యాపారం` : `Serving ${myBusiness.villageName} & nearby mandals`}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 p-3 sm:p-4 rounded-2xl backdrop-blur-sm self-start md:self-center">
              <div className="text-center px-2">
                <div className="flex items-center justify-center gap-1 text-amber-300 font-black text-xl">
                  <Star className="w-5 h-5 fill-current" />
                  <span>{myBusiness.rating}</span>
                </div>
                <span className="text-[11px] text-white/80 font-bold block">
                  {myBusiness.reviewCount} {isTelugu ? 'సమీక్షలు' : 'Reviews'}
                </span>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center px-2">
                <span className="text-xl font-black text-emerald-300 block">
                  {productsList.length}
                </span>
                <span className="text-[11px] text-white/80 font-bold block">
                  {isTelugu ? 'ఉత్పత్తులు' : 'Items'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-card flex items-center gap-3.5">
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

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs mb-6 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'orders' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isTelugu ? 'కస్టమర్ ఆర్డర్లు & ఎంక్వైరీలు' : 'Orders & Inquiries'}</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 text-white">
              {businessEnquiries.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'catalog' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{isTelugu ? 'ఉత్పత్తుల కేటలాగ్' : 'Product Catalog'}</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-800">
              {productsList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'profile' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>{isTelugu ? 'దుకాణం వివరాలు & సమయాలు' : 'Store Details'}</span>
          </button>
        </div>

        {/* Tab 1: Orders & Enquiries Hub */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {businessEnquiries.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/90 shadow-card">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 font-bold text-sm">
                  {isTelugu ? 'ఎటువంటి కస్టమర్ ఆర్డర్లు లేవు' : 'No customer inquiries yet'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {businessEnquiries.map((enq) => {
                  const isDone = enq.status === 'completed';

                  return (
                    <div
                      key={enq.id}
                      className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card space-y-3"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                            {enq.id}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {isDone ? (isTelugu ? 'డెలివరీ పూర్తయింది' : 'Fulfilled / Delivered') : (isTelugu ? 'కొత్త ఆర్డర్' : 'Pending Order')}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">{enq.createdAt}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            {isTelugu ? 'కస్టమర్ పేరు:' : 'Customer Name:'}
                          </span>
                          <h4 className="font-black text-slate-900 text-base">{enq.customerName}</h4>
                          <p className="text-slate-600 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{enq.location || `${enq.villageName} Village`}</span>
                          </p>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            {isTelugu ? 'కోరిన వస్తువులు / విచారణ:' : 'Requested Items:'}
                          </span>
                          <p className="font-extrabold text-primary text-sm">{enq.serviceRequested}</p>
                          <p className="text-slate-600 italic mt-0.5">"{enq.message}"</p>
                        </div>
                      </div>

                      {isDone && enq.workDescription && (
                        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
                          <span className="font-bold text-emerald-900 block">
                            {isTelugu ? 'రవాణా & డెలివరీ వివరాలు:' : 'Delivery & Dispatch Details:'}
                          </span>
                          <p className="text-slate-700">{enq.workDescription}</p>
                          <span className="font-bold text-emerald-800 block">{isTelugu ? 'బిల్లు మొత్తం:' : 'Bill Amount:'} {enq.amount}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${enq.customerPhone}`}
                            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-primary" />
                            <span>{isTelugu ? 'కాల్ చేయండి' : 'Call Customer'}</span>
                          </a>
                          <a
                            href={`https://wa.me/91${enq.customerPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>

                        {!isDone && (
                          <button
                            type="button"
                            onClick={() => updateEnquiryStatus(enq.id, 'completed')}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isTelugu ? 'డెలివరీ పూర్తి అయినట్లు గుర్తించండి' : 'Mark Fulfilled / Delivered'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Product Catalog */}
        {activeTab === 'catalog' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-2">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-600" />
                  <span>{isTelugu ? 'దుకాణం ఉత్పత్తులు & నిల్వ వివరాలు' : 'Store Inventory & Prices'}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isTelugu ? 'రైతులు మరియు గ్రామస్తులు ఈ ఉత్పత్తులను నేరుగా చూడగలరు.' : 'Visible to local village farmers and buyers.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {productsList.map((prd) => (
                <div key={prd.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 inline-block mb-1">
                      {prd.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">
                      {isTelugu ? prd.teluguName : prd.name}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                    <span className="font-black text-emerald-700 text-sm">{prd.price}</span>
                    <span className="text-[11px] font-bold text-slate-500">{prd.stock}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Store Profile & Timings */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card max-w-2xl mx-auto space-y-4">
            <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Store className="w-5 h-5 text-emerald-600" />
              <span>{isTelugu ? 'దుకాణం వివరాలు & వ్యాపార సమాచారం' : 'Store Information & Working Hours'}</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">{isTelugu ? 'యజమాని పేరు:' : 'Proprietor:'}</span>
                <span className="font-bold text-slate-900">{myBusiness.ownerName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">{isTelugu ? 'ఫోన్ నంబర్:' : 'Phone Number:'}</span>
                <span className="font-bold text-slate-900">+91 {myBusiness.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">{isTelugu ? 'సమయాలు:' : 'Opening Hours:'}</span>
                <span className="font-bold text-slate-900">{myBusiness.openingHours}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">{isTelugu ? 'చిరునామా:' : 'Shop Address:'}</span>
                <span className="font-bold text-slate-900">{isTelugu ? myBusiness.addressTelugu : myBusiness.address}</span>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider mb-2">
                {isTelugu ? 'దుకాణం ప్రత్యేకతలు' : 'Highlights'}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {myBusiness.highlights.map((h, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
