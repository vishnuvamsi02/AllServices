'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { HomeMode } from '@/data/types';
import { LayoutGrid, Home } from 'lucide-react';

interface ModeSwitcherProps {
  mode: HomeMode;
  onChange: (mode: HomeMode) => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ mode, onChange }) => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-md mx-auto p-1.5 bg-slate-100/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => onChange('services')}
        className={`flex-1 py-3 px-4 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 transition-all duration-200 min-h-[46px] ${
          mode === 'services'
            ? 'bg-primary text-white shadow-md scale-[1.02]'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
      >
        <LayoutGrid className={`w-4 h-4 ${mode === 'services' ? 'text-white' : 'text-slate-500'}`} />
        <span>{t('mode.services')}</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('properties')}
        className={`flex-1 py-3 px-4 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 transition-all duration-200 min-h-[46px] ${
          mode === 'properties'
            ? 'bg-secondary text-white shadow-md scale-[1.02]'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
      >
        <Home className={`w-4 h-4 ${mode === 'properties' ? 'text-white' : 'text-slate-500'}`} />
        <span>{t('mode.properties')}</span>
      </button>
    </div>
  );
};
