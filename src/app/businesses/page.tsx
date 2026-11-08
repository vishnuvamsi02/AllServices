'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { BusinessCard } from '@/components/cards/BusinessCard';
import { Search, Store, MapPin, X } from 'lucide-react';

export default function BusinessesPage() {
  const { t, isTelugu } = useLanguage();
  const { selectedVillageId, setSelectedVillageId, villages } = useLocation();
  const { businesses } = useMarketplace();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const set = new Set(businesses.map((b) => b.category));
    return ['all', ...Array.from(set)];
  }, [businesses]);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((b) => {
      if (selectedVillageId !== 'all' && b.villageId !== selectedVillageId) {
        return false;
      }
      if (selectedCategory !== 'all' && b.category !== selectedCategory) {
        return false;
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = b.name.toLowerCase().includes(q) || b.teluguName.includes(q);
        const matchesOwner = b.ownerName.toLowerCase().includes(q);
        const matchesCat = b.category.toLowerCase().includes(q) || b.categoryTelugu.includes(q);
        if (!matchesName && !matchesOwner && !matchesCat) return false;
      }
      return true;
    });
  }, [businesses, selectedVillageId, selectedCategory, searchTerm]);

  return (
    <div className="bg-surface-bg pb-10 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1.5">
            <Store className="w-4 h-4" />
            <span>{isTelugu ? 'గ్రామ వ్యాపారాలు' : 'Village Commerce'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isTelugu ? 'స్థానిక దుకాణాలు & వ్యాపారాలు' : 'Local Village Shops & Stores'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            {isTelugu 
              ? 'మీ గ్రామంలోని కిరాణా, ఎరువులు, విత్తనాలు, హార్డ్‌వేర్ మరియు పాల కేంద్రాలు' 
              : 'Agro seed stores, grocery, dairy, cement, and medical stores near you'}
          </p>
        </div>

        {/* Search & Location Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-card mb-8">
          <div className="flex flex-col md:flex-row items-stretch gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isTelugu ? 'దుకాణం లేదా వస్తువు పేరుతో వెతకండి...' : 'Search by shop name, item, or owner...'}
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

            <div className="w-full md:w-56 shrink-0">
              <select
                value={selectedVillageId}
                onChange={(e) => setSelectedVillageId(e.target.value)}
                className="w-full py-3 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="all">{isTelugu ? 'అన్ని గ్రామాలు' : 'All Villages'}</option>
                {villages.map((v) => (
                  <option key={v.id} value={v.id}>
                    {isTelugu ? v.teluguName : v.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((b) => (
            <BusinessCard key={b.id} business={b} />
          ))}
        </div>

      </div>
    </div>
  );
}
