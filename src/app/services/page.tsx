'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { MOCK_CATEGORIES } from '@/data/mockData';
import { ProviderCard } from '@/components/cards/ProviderCard';
import {
  Search,
  CheckCircle,
  Star,
  MapPin,
  X,
  SlidersHorizontal,
  Wrench,
} from 'lucide-react';

function ServicesContent() {
  const { t, isTelugu } = useLanguage();
  const { selectedVillageId, setSelectedVillageId, villages } = useLocation();
  const { providers } = useMarketplace();
  const searchParams = useSearchParams();

  const initialCat = searchParams?.get('cat') || 'all';
  const initialQuery = searchParams?.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered providers calculation
  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      // Village filter
      if (selectedVillageId !== 'all' && p.villageId !== selectedVillageId) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        const catObj = MOCK_CATEGORIES.find((c) => c.slug === selectedCategory);
        if (catObj && p.category !== catObj.name) {
          return false;
        }
      }

      // Verified filter
      if (onlyVerified && !p.isVerified) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }

      // Search term filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query) || p.teluguName.includes(query);
        const matchesCat = p.category.toLowerCase().includes(query) || p.categoryTelugu.includes(query);
        const matchesService = p.services.some(
          (s) => s.name.toLowerCase().includes(query) || s.teluguName.includes(query)
        );
        const matchesVillage = p.villageName.toLowerCase().includes(query) || p.villageTelugu.includes(query);

        if (!matchesName && !matchesCat && !matchesService && !matchesVillage) {
          return false;
        }
      }

      return true;
    });
  }, [providers, selectedVillageId, selectedCategory, onlyVerified, minRating, searchTerm]);

  return (
    <div className="bg-surface-bg pb-10 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1.5">
            <Wrench className="w-4 h-4" />
            <span>{isTelugu ? 'గ్రామ సేవలు' : 'Village Services Directory'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isTelugu ? 'సేవా నిపుణులను కనుగొనండి' : 'Find Local Service Experts'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            {isTelugu 
              ? 'మీ గ్రామంలో అందుబాటులో ఉన్న విశ్వసనీయ ఎలక్ట్రీషియన్లు, ప్లంబర్లు, మెకానిక్స్' 
              : 'Verified village technicians, repair workers, and agricultural specialists'}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-card mb-8">
          <div className="flex flex-col md:flex-row items-stretch gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isTelugu ? 'పేరు, సేవ లేదా పరికరం పేరుతో వెతకండి...' : 'Search by technician, service, or keyword...'}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Village Selector Dropdown */}
            <div className="w-full md:w-56 shrink-0">
              <select
                value={selectedVillageId}
                onChange={(e) => setSelectedVillageId(e.target.value)}
                className="w-full py-3 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="all">{isTelugu ? 'అన్ని గ్రామాలు (All AP)' : 'All Villages (Consolidated)'}</option>
                {villages.map((v) => (
                  <option key={v.id} value={v.id}>
                    {isTelugu ? v.teluguName : v.name} ({v.mandal})
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Filter Drawer Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold text-slate-700 flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{t('common.filter')}</span>
            </button>
          </div>

          {/* Category Horizontal Pills */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isTelugu ? 'అన్ని కేటగిరీలు' : 'All Categories'}
            </button>

            {MOCK_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    isSelected
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isTelugu ? cat.teluguName : cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Layout with Sidebar Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  <span>{t('common.filter')}</span>
                </h3>
                {(selectedCategory !== 'all' || minRating > 0 || onlyVerified) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setMinRating(0);
                      setOnlyVerified(false);
                    }}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    {t('common.clearAll')}
                  </button>
                )}
              </div>

              {/* Verified Filter */}
              <div>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyVerified}
                    onChange={(e) => setOnlyVerified(e.target.checked)}
                    className="w-4 h-4 text-secondary rounded border-slate-300 focus:ring-secondary"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {isTelugu ? 'గ్రామ ధృవీకరణ పొందినవారు మాత్రమే' : 'Verified Providers Only'}
                  </span>
                </label>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {t('common.rating')}
                </label>
                <div className="space-y-1.5">
                  {[4, 4.5, 3.5].map((stars) => (
                    <button
                      key={stars}
                      type="button"
                      onClick={() => setMinRating(minRating === stars ? 0 : stars)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        minRating === stars
                          ? 'bg-amber-50 text-amber-900 border border-amber-200'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-500 fill-current" />
                        <span>{stars}★ & above</span>
                      </div>
                      {minRating === stars && <CheckCircle className="w-4 h-4 text-amber-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-xs sm:text-sm font-bold text-slate-600">
                {isTelugu 
                  ? `${filteredProviders.length} మంది నిపుణులు అందుబాటులో ఉన్నారు` 
                  : `Showing ${filteredProviders.length} service experts`}
              </span>
            </div>

            {filteredProviders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-card">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  {t('common.noResults')}
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  {isTelugu 
                    ? 'దయచేసి ఫిల్టర్లను మార్చండి లేదా మరొక గ్రామాన్ని ఎంచుకోండి.' 
                    : 'Try clearing your search query or selecting "All Villages" to find more experts.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedVillageId('all');
                    setMinRating(0);
                    setOnlyVerified(false);
                  }}
                  className="mt-5 px-5 py-2.5 bg-primary text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm hover:bg-primary-hover"
                >
                  {t('common.clearAll')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading services...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
