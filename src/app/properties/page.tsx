'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { PropertyCard } from '@/components/cards/PropertyCard';
import { Building2, Search, X } from 'lucide-react';

export default function PropertiesPage() {
  const { t, isTelugu } = useLanguage();
  const { selectedVillageId, setSelectedVillageId, villages } = useLocation();
  const { properties } = useMarketplace();

  const [propertyType, setPropertyType] = useState<string>('all');
  const [listingType, setListingType] = useState<string>('all');

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (selectedVillageId !== 'all' && p.villageId !== selectedVillageId) {
        return false;
      }
      if (propertyType !== 'all' && p.propertyType !== propertyType) {
        return false;
      }
      if (listingType !== 'all' && p.listingType !== listingType) {
        return false;
      }
      return true;
    });
  }, [properties, selectedVillageId, propertyType, listingType]);

  return (
    <div className="bg-surface-bg pb-10 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1.5">
            <Building2 className="w-4 h-4" />
            <span>{isTelugu ? 'గ్రామ రియల్ ఎస్టేట్' : 'Rural Real Estate'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isTelugu ? 'వ్యవసాయ భూములు & గ్రామ ఇళ్ళు' : 'Agricultural Lands & Village Properties'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            {isTelugu 
              ? 'ఆంధ్రప్రదేశ్ గ్రామాల్లో అమ్మకానికి మరియు అద్దెకు ఉన్న సారవంతమైన భూములు, ఇళ్ళు' 
              : 'Direct from owners: fertile farm lands, commercial plots, and independent village villas'}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-card mb-8">
          <div className="flex flex-wrap items-center gap-3">
            
            <div className="w-full sm:w-60">
              <select
                value={selectedVillageId}
                onChange={(e) => setSelectedVillageId(e.target.value)}
                className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="all">{isTelugu ? 'అన్ని గ్రామాలు' : 'All Villages'}</option>
                {villages.map((v) => (
                  <option key={v.id} value={v.id}>
                    {isTelugu ? v.teluguName : v.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { key: 'all', en: 'All Types', te: 'అన్నీ' },
                { key: 'agricultural', en: 'Farm Land', te: 'వ్యవసాయ భూమి' },
                { key: 'residential', en: 'Houses', te: 'ఇళ్ళు' },
                { key: 'plot', en: 'Plots', te: 'ప్లాట్లు' },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setPropertyType(item.key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    propertyType === item.key
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isTelugu ? item.te : item.en}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

      </div>
    </div>
  );
}
