'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { MapPin, Navigation, Compass, CheckCircle } from 'lucide-react';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationPermissionModal: React.FC<LocationPermissionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isTelugu, t } = useLanguage();
  const { setSelectedVillageId } = useLocation();
  const [selectedAccuracy, setSelectedAccuracy] = useState<'precise' | 'approximate'>('precise');

  if (!isOpen) return null;

  const handleAllow = (type: 'while' | 'once') => {
    // Simulate setting to Chinchinaada / nearby village
    setSelectedVillageId('v_chinchinaada');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-800 text-center space-y-6 animate-in slide-in-from-bottom-6 duration-300">
        
        {/* Top Pin Icon */}
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto text-primary-light">
          <MapPin className="w-6 h-6 text-emerald-400" />
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            {t('locationDialog.title')}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isTelugu 
              ? 'మీ సమీపంలోని ఎలక్ట్రీషియన్లు, దుకాణాలు మరియు భూముల వివరాలను స్వయంచాలకంగా చూపించడానికి.'
              : 'Used to show trusted local technicians, shops, and properties near your exact village.'}
          </p>
        </div>

        {/* 2 Circular Radar Maps (Precise vs Approximate) matching Screen 13 */}
        <div className="grid grid-cols-2 gap-4 py-2">
          {/* Precise */}
          <button
            type="button"
            onClick={() => setSelectedAccuracy('precise')}
            className={`p-3 rounded-2xl border transition-all flex flex-col items-center text-center ${
              selectedAccuracy === 'precise'
                ? 'bg-primary/20 border-primary text-white shadow-md'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <div className="relative w-24 h-24 rounded-full bg-slate-800 border-2 border-primary/40 flex items-center justify-center overflow-hidden mb-2">
              {/* Radar grid lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
              <div className="w-16 h-16 rounded-full border border-blue-400/40 animate-ping absolute" />
              <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center relative z-10">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-400 shadow-[0_0_12px_#3b82f6]" />
              </div>
            </div>
            <span className="text-xs font-bold text-white">
              {t('locationDialog.precise')}
            </span>
          </button>

          {/* Approximate */}
          <button
            type="button"
            onClick={() => setSelectedAccuracy('approximate')}
            className={`p-3 rounded-2xl border transition-all flex flex-col items-center text-center ${
              selectedAccuracy === 'approximate'
                ? 'bg-primary/20 border-primary text-white shadow-md'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <div className="relative w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center overflow-hidden mb-2">
              {/* Street road lines simulation */}
              <div className="absolute inset-x-0 h-1 bg-amber-400/30 rotate-45" />
              <div className="absolute inset-y-0 w-1 bg-amber-400/30 -rotate-12" />
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center relative z-10">
                <Compass className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <span className="text-xs font-bold text-white">
              {t('locationDialog.approximate')}
            </span>
          </button>
        </div>

        {/* 3 Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-slate-800 text-sm font-semibold">
          <button
            type="button"
            onClick={() => handleAllow('while')}
            className="w-full py-3 text-blue-400 hover:bg-white/5 rounded-xl transition-colors font-bold"
          >
            {t('locationDialog.whileUsing')}
          </button>

          <button
            type="button"
            onClick={() => handleAllow('once')}
            className="w-full py-3 text-blue-400 hover:bg-white/5 rounded-xl transition-colors font-bold"
          >
            {t('locationDialog.onlyThisTime')}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            {t('locationDialog.dontAllow')}
          </button>
        </div>

      </div>
    </div>
  );
};
