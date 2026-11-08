'use client';

import React, { useState } from 'react';
import { useLocation } from '@/context/LocationContext';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, ChevronDown, Check, Building2 } from 'lucide-react';

export const LocationSelector: React.FC<{ variant?: 'header' | 'hero' }> = ({ variant = 'header' }) => {
  const { selectedVillageId, setSelectedVillageId, villages, selectedVillage } = useLocation();
  const { isTelugu, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const displayName = selectedVillageId === 'all'
    ? (isTelugu ? 'అన్ని గ్రామాలు' : 'All Villages')
    : selectedVillage
    ? (isTelugu ? selectedVillage.teluguName : selectedVillage.name)
    : (isTelugu ? 'గ్రామాన్ని ఎంచుకోండి' : 'Select Village');

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-xl transition-all font-medium text-left min-h-[44px] ${
          variant === 'header'
            ? 'px-3 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800'
            : 'w-full px-4 py-3 bg-white border border-slate-300 text-slate-800 shadow-sm hover:border-primary'
        }`}
      >
        <MapPin className="w-4 h-4 text-primary shrink-0" />
        <div className="flex flex-col flex-1 min-w-0">
          {variant === 'hero' && (
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {t('nav.selectVillage')}
            </span>
          )}
          <span className="truncate font-semibold text-slate-900">
            {displayName}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 sm:left-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-slate-100 mb-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {isTelugu ? 'గ్రామం లేదా ప్రాంతం ఎంచుకోండి' : 'Select Village / Mandal'}
              </p>
              <p className="text-xs text-slate-500">
                {isTelugu ? 'ఆంధ్రప్రదేశ్ - గుంటూరు & కృష్ణా జిల్లాలు' : 'Andhra Pradesh - Guntur & Krishna'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedVillageId('all');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors text-left ${
                selectedVillageId === 'all'
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                <div>
                  <div className="font-semibold">{isTelugu ? 'అన్ని గ్రామాలు' : 'All Villages'}</div>
                  <div className="text-xs text-slate-400">
                    {isTelugu ? 'మొత్తం ప్రాంతంలో సేవలు చూడండి' : 'Browse across all regions'}
                  </div>
                </div>
              </div>
              {selectedVillageId === 'all' && <Check className="w-4 h-4 text-primary" />}
            </button>

            <div className="my-1 border-t border-slate-100" />

            <div className="max-h-60 overflow-y-auto space-y-1">
              {villages.map((village) => {
                const isSelected = selectedVillageId === village.id;
                return (
                  <button
                    key={village.id}
                    type="button"
                    onClick={() => {
                      setSelectedVillageId(village.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors text-left ${
                      isSelected
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-900">
                        {isTelugu ? village.teluguName : village.name}
                        <span className="ml-1 text-xs text-slate-500 font-normal">
                          ({isTelugu ? village.name : village.teluguName})
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {village.mandal}, {village.district} • {village.pincode}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
