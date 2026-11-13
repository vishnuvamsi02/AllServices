'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { MOCK_VILLAGES } from '@/data/mockData';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Smartphone,
  Monitor,
  Calendar,
  IndianRupee,
  Briefcase,
  CheckCircle2,
  Clock,
  Gift,
  Award,
  Filter,
  Download,
  Share2,
  RefreshCw,
  Search,
  MapPin,
  ChevronRight,
  Layers,
  ArrowUpRight,
  Percent,
  Activity,
  FileSpreadsheet,
  FileText,
  Star,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface AnalyticsDashboardViewProps {
  initialVillageScope?: string;
  isSuperAdmin?: boolean;
}

export const AnalyticsDashboardView: React.FC<AnalyticsDashboardViewProps> = ({
  initialVillageScope = 'all',
  isSuperAdmin = true,
}) => {
  const { isTelugu } = useLanguage();
  const { showToast, enquiries, rewardClaims } = useMarketplace();

  const [villageScope, setVillageScope] = useState<string>(initialVillageScope);
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | 'month' | 'ytd'>('30d');
  const [activeMetricTab, setActiveMetricTab] = useState<'traffic' | 'bookings' | 'categories' | 'funnel'>('traffic');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<number | null>(null);

  // Time-series mock data for 14 daily points
  const dailyTrafficData = [
    { date: 'Nov 1', day: 'Sat', visits: 2420, unique: 1850, mobile: 2150, desktop: 270, bookings: 184 },
    { date: 'Nov 2', day: 'Sun', visits: 3150, unique: 2340, mobile: 2810, desktop: 340, bookings: 236 },
    { date: 'Nov 3', day: 'Mon', visits: 2890, unique: 2110, mobile: 2540, desktop: 350, bookings: 202 },
    { date: 'Nov 4', day: 'Tue', visits: 3040, unique: 2280, mobile: 2710, desktop: 330, bookings: 215 },
    { date: 'Nov 5', day: 'Wed', visits: 3280, unique: 2490, mobile: 2920, desktop: 360, bookings: 240 },
    { date: 'Nov 6', day: 'Thu', visits: 3450, unique: 2610, mobile: 3080, desktop: 370, bookings: 258 },
    { date: 'Nov 7', day: 'Fri', visits: 3820, unique: 2890, mobile: 3410, desktop: 410, bookings: 295 },
    { date: 'Nov 8', day: 'Sat', visits: 4120, unique: 3100, mobile: 3680, desktop: 440, bookings: 320 },
    { date: 'Nov 9', day: 'Sun', visits: 4560, unique: 3450, mobile: 4080, desktop: 480, bookings: 365 },
    { date: 'Nov 10', day: 'Mon', visits: 3950, unique: 2980, mobile: 3510, desktop: 440, bookings: 280 },
    { date: 'Nov 11', day: 'Tue', visits: 4210, unique: 3190, mobile: 3750, desktop: 460, bookings: 310 },
    { date: 'Nov 12', day: 'Wed', visits: 4480, unique: 3360, mobile: 3990, desktop: 490, bookings: 342 },
    { date: 'Nov 13', day: 'Thu', visits: 4880, unique: 3680, mobile: 4350, desktop: 530, bookings: 388 },
  ];

  // Monthly comparison
  const monthlyRevenueData = [
    { month: 'Jun 2026', bookings: 1420, gmv: 680000, activePros: 82 },
    { month: 'Jul 2026', bookings: 1850, gmv: 890000, activePros: 96 },
    { month: 'Aug 2026', bookings: 2240, gmv: 1080000, activePros: 114 },
    { month: 'Sep 2026', bookings: 2710, gmv: 1290000, activePros: 135 },
    { month: 'Oct 2026', bookings: 3290, gmv: 1420000, activePros: 162 },
    { month: 'Nov 2026', bookings: 3840, gmv: 1485600, activePros: 185 },
  ];

  // Service categories distribution
  const serviceCategoriesDistribution = [
    { name: 'Two-Wheeler Servicing & Tuning', telugu: 'టూ-వీలర్ సర్వీసింగ్', share: 42, count: 1612, color: 'bg-blue-500', barBg: 'bg-blue-500/20' },
    { name: 'Four-Wheeler Care & Engine Oil', telugu: 'కార్ సర్వీసింగ్ & ఆయిల్', share: 27, count: 1037, color: 'bg-emerald-500', barBg: 'bg-emerald-500/20' },
    { name: 'Pressure Water Wash & Detailing', telugu: 'వాటర్ వాష్ & డీటైలింగ్', share: 18, count: 691, color: 'bg-cyan-500', barBg: 'bg-cyan-500/20' },
    { name: '24/7 Roadside Rescue & Tyres', telugu: '24/7 బ్రేక్‌డౌన్ & టైర్లు', share: 13, count: 500, color: 'bg-amber-500', barBg: 'bg-amber-500/20' },
  ];

  // Village rankings
  const villageRankings = [
    {
      id: 'v_kaza',
      name: 'Kaza',
      teluguName: 'కాజా',
      district: 'Guntur',
      mechanics: 48,
      monthlyBookings: 1140,
      completionRate: 84.5,
      rating: 4.9,
      revenueGmv: '₹4,82,000',
      loyaltyClaims: 142,
    },
    {
      id: 'v_chinchinaada',
      name: 'Chinchinaada',
      teluguName: 'చించినాడ',
      district: 'West Godavari',
      mechanics: 54,
      monthlyBookings: 1280,
      completionRate: 86.2,
      rating: 4.9,
      revenueGmv: '₹5,40,000',
      loyaltyClaims: 168,
    },
    {
      id: 'v_palakollu_rural',
      name: 'Palakollu Rural',
      teluguName: 'పాలకొల్లు రూరల్',
      district: 'West Godavari',
      mechanics: 44,
      monthlyBookings: 820,
      completionRate: 79.8,
      rating: 4.8,
      revenueGmv: '₹3,10,000',
      loyaltyClaims: 98,
    },
    {
      id: 'v_bhimavaram_rural',
      name: 'Bhimavaram Rural',
      teluguName: 'భీమవరం రూరల్',
      district: 'West Godavari',
      mechanics: 39,
      monthlyBookings: 600,
      completionRate: 78.4,
      rating: 4.7,
      revenueGmv: '₹1,53,600',
      loyaltyClaims: 72,
    },
  ];

  // Dynamic multipliers based on scope
  const multiplier = villageScope === 'all' ? 1 : villageScope === 'v_kaza' ? 0.32 : villageScope === 'v_chinchinaada' ? 0.36 : 0.18;

  const totalVisits = Math.round(48250 * multiplier);
  const uniqueUsers = Math.round(31480 * multiplier);
  const mobileSharePercent = 88.6;
  const desktopSharePercent = 11.4;
  const totalBookings = Math.round(3840 * multiplier);
  const completedServices = Math.round(3120 * multiplier);
  const totalGmv = Math.round(1485600 * multiplier);
  const totalLoyaltyTrackers = Math.round(1420 * multiplier);
  const unlockedMilestones = Math.round(480 * multiplier);
  const redeemedVouchers = Math.round(310 * multiplier);

  // SVG Chart Calculations
  const maxVisits = Math.max(...dailyTrafficData.map((d) => d.visits));
  const svgWidth = 600;
  const svgHeight = 180;
  const paddingX = 30;
  const paddingY = 25;

  const points = dailyTrafficData.map((d, i) => {
    const x = paddingX + (i / (dailyTrafficData.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - (d.visits / maxVisits) * (svgHeight - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  const handleExportCSV = () => {
    showToast('success', 'Exporting Analytics CSV', 'Generating comprehensive analytics spreadsheet for download.');
  };

  const handleExportPDF = () => {
    showToast('success', 'Generating Executive PDF Report', 'Packaging performance graphs, KPIs and village benchmarks.');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Filter and Controls Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
              <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>{isTelugu ? 'రియల్-టైమ్ అడ్మిన్ విశ్లేషణలు' : 'Real-Time Performance & Analytics Engine'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isTelugu ? 'అప్లికేషన్ పనితీరు & వ్యాపార నివేదికలు' : 'System Performance, Traffic & Growth Metrics'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Track visitors, mobile user engagement, job conversions, village leaderboards, and monthly loyalty rewards.
            </p>
          </div>

          {/* Action Export Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={handleExportPDF}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Executive Report</span>
            </button>
          </div>
        </div>

        {/* Filters: Village Jurisdiction & Date Range */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Scope Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>Jurisdiction:</span>
            </span>

            {isSuperAdmin ? (
              <select
                value={villageScope}
                onChange={(e) => setVillageScope(e.target.value)}
                className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-primary"
              >
                <option value="all">Consolidated (All Andhra Pradesh)</option>
                {MOCK_VILLAGES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.mandal}, {v.district})
                  </option>
                ))}
              </select>
            ) : (
              <span className="px-3 py-1 rounded-xl bg-primary/10 text-primary text-xs font-black">
                {MOCK_VILLAGES.find((v) => v.id === villageScope)?.name || 'Kaza'} Jurisdiction
              </span>
            )}
          </div>

          {/* Date Range Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold overflow-x-auto no-scrollbar scrollbar-none">
            {[
              { id: 'today', label: 'Today' },
              { id: '7d', label: '7 Days' },
              { id: '30d', label: '30 Days' },
              { id: 'month', label: 'This Month' },
              { id: 'ytd', label: 'YTD 2026' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setDateRange(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  dateRange === tab.id
                    ? 'bg-white text-slate-900 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 5 Core Executive Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        
        {/* KPI 1: Visitors & Mobile Traffic */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" />
                +28.4%
              </span>
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Visitors
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">
              {totalVisits.toLocaleString()}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <Smartphone className="w-3.5 h-3.5" />
              {mobileSharePercent}% Mobile
            </span>
            <span>{uniqueUsers.toLocaleString()} Unique</span>
          </div>
        </div>

        {/* KPI 2: Service Bookings & Jobs */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" />
                +34.2%
              </span>
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Service Bookings
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">
              {totalBookings.toLocaleString()}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
            <span className="flex items-center gap-1 text-primary font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {completedServices.toLocaleString()} Completed
            </span>
            <span className="text-emerald-700 font-bold">81.2% Conv.</span>
          </div>
        </div>

        {/* KPI 3: Gross Service GMV */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <IndianRupee className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" />
                +22.6%
              </span>
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Gross Service Value
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">
              ₹{(totalGmv / 100000).toFixed(2)}L
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
            <span>Avg Ticket: ₹476</span>
            <span className="text-slate-400">0% Commission</span>
          </div>
        </div>

        {/* KPI 4: Monthly Loyalty Reward Milestones */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                10-Job Plan
              </span>
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Loyalty Unlocks (10/10)
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">
              {unlockedMilestones.toLocaleString()}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
            <span className="text-purple-700 font-bold">{redeemedVouchers} Redeemed</span>
            <span>{totalLoyaltyTrackers} Active</span>
          </div>
        </div>

        {/* KPI 5: Customer Satisfaction & Rating */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card flex flex-col justify-between col-span-1 sm:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Satisfaction Index
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">
              4.9 ★
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
            <span>2,680+ Ratings</span>
            <span className="text-emerald-700 font-bold">98.4% Positive</span>
          </div>
        </div>

      </div>

      {/* Main Interactive Visualizations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Interactive Timeline Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Daily Traffic & Mobile Activity Trend</span>
              </h3>
              <p className="text-xs text-slate-500">
                14-day chronological curve showing unique visitors, mobile sessions, and booking volume.
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
              <span className="px-2.5 py-1 rounded-lg bg-white text-primary shadow-xs">
                Total Visits
              </span>
              <span className="px-2.5 py-1 text-slate-500">
                Mobile: 88.6%
              </span>
            </div>
          </div>

          {/* SVG Interactive Line / Area Graph */}
          <div className="relative pt-2">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-44 sm:h-52 overflow-visible"
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#174A7E" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#174A7E" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = paddingY + ratio * (svgHeight - paddingY * 2);
                return (
                  <line
                    key={i}
                    x1={paddingX}
                    y1={y}
                    x2={svgWidth - paddingX}
                    y2={y}
                    stroke="#E2E8F0"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Filled Area */}
              <path d={areaD} fill="url(#areaGradient)" />

              {/* Curve Stroke Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#174A7E"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Interactive Nodes */}
              {points.map((p, i) => (
                <g key={i}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoveredDataPoint === i ? '6' : '3.5'}
                    className={`transition-all cursor-pointer ${
                      hoveredDataPoint === i ? 'fill-amber-400 stroke-slate-900 stroke-2' : 'fill-white stroke-primary stroke-2'
                    }`}
                    onMouseEnter={() => setHoveredDataPoint(i)}
                    onTouchStart={() => setHoveredDataPoint(i)}
                  />
                </g>
              ))}
            </svg>

            {/* X-axis date labels */}
            <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-slate-400 px-2 pt-2 border-t border-slate-100">
              <span>Nov 1 (Sat)</span>
              <span>Nov 4</span>
              <span>Nov 7</span>
              <span>Nov 10</span>
              <span className="text-primary font-black">Nov 13 (Today)</span>
            </div>

            {/* Hover Tooltip display */}
            {hoveredDataPoint !== null && (
              <div className="mt-3 p-3 bg-slate-900 text-white rounded-2xl flex items-center justify-between gap-4 text-xs shadow-lg animate-in fade-in duration-150">
                <div className="flex items-center gap-2">
                  <span className="font-black text-amber-400">{dailyTrafficData[hoveredDataPoint].date} ({dailyTrafficData[hoveredDataPoint].day})</span>
                  <span>•</span>
                  <span><strong>{dailyTrafficData[hoveredDataPoint].visits.toLocaleString()}</strong> Total Visits</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-[11px]">
                  <span>📱 {dailyTrafficData[hoveredDataPoint].mobile} Mobile</span>
                  <span>🛠️ {dailyTrafficData[hoveredDataPoint].bookings} Bookings</span>
                </div>
              </div>
            )}
          </div>

          {/* Sub-Metric Cards: Device Share & Conversion Speed */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Primary Access Device
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-900">88.6% Smartphone</span>
                <Smartphone className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '88.6%' }} />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Avg Mechanic Response
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-900">18.4 Minutes</span>
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Lead-to-Booking Ratio
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-900">81.2% Success</span>
                <Percent className="w-4 h-4 text-purple-600" />
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: '81.2%' }} />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Service Breakdown & Conversion Funnel */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Categories Share Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                <span>Service Category Share</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">Monthly</span>
            </div>

            <div className="space-y-3">
              {serviceCategoriesDistribution.map((cat, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800">{cat.name}</span>
                    <span className="text-slate-900">{cat.share}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`${cat.color} h-full rounded-full transition-all`} style={{ width: `${cat.share}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span>{cat.telugu}</span>
                    <span>{cat.count} jobs</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Funnel */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Customer Conversion Funnel
              </span>
              <span className="text-[10px] text-slate-300">Live</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span>1. Total App Visitors</span>
                <strong className="text-white">48,250 (100%)</strong>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span>2. Service Browsers</span>
                <strong className="text-white">36,400 (75.4%)</strong>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span>3. Direct Calls & WhatsApp</span>
                <strong className="text-emerald-400">6,850 (14.2%)</strong>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/10 border border-white/15">
                <span>4. Bookings Fulfilled</span>
                <strong className="text-amber-400">3,120 (81.2%)</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Village Jurisdiction Comparative Benchmarks Table */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Village Jurisdiction Performance & Rankings</span>
            </h3>
            <p className="text-xs text-slate-500">
              Comparative analysis of registered mechanics, service volume, completion success, and loyalty rewards redemption.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary self-start sm:self-auto">
            4 Active Village Hubs
          </span>
        </div>

        <div className="overflow-x-auto no-scrollbar scrollbar-none">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[11px] font-extrabold bg-slate-50/80">
                <th className="py-3 px-4 rounded-l-xl">Village Jurisdiction</th>
                <th className="py-3 px-3">District</th>
                <th className="py-3 px-3">Active Mechanics</th>
                <th className="py-3 px-3">Completed Bookings</th>
                <th className="py-3 px-3">Completion Rate</th>
                <th className="py-3 px-3">Loyalty Vouchers</th>
                <th className="py-3 px-3">Satisfaction</th>
                <th className="py-3 px-4 rounded-r-xl text-right">Gross GMV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {villageRankings.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black text-xs">
                        {v.name.charAt(0)}
                      </div>
                      <div>
                        <span className="block">{v.name}</span>
                        <span className="text-[11px] font-normal text-slate-500">{v.teluguName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">{v.district}</td>
                  <td className="py-3.5 px-3 font-bold text-slate-900">{v.mechanics} Garages</td>
                  <td className="py-3.5 px-3 font-bold text-emerald-700">{v.monthlyBookings}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {v.completionRate}%
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-purple-700">{v.loyaltyClaims}</td>
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {v.rating}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-slate-900">
                    {v.revenueGmv}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
