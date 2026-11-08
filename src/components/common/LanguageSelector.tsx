'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Check } from 'lucide-react';

export const LanguageSelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, setLanguage, isTelugu } = useLanguage();

  if (compact) {
    return (
      <div className="inline-flex items-center bg-white/95 border border-slate-200/90 rounded-full p-0.5 shadow-xs shrink-0">
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all ${
            language === 'en'
              ? 'bg-primary text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          title="English"
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLanguage('te')}
          className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all ${
            language === 'te'
              ? 'bg-primary text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          title="తెలుగు"
        >
          తె
        </button>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center bg-white/95 border border-slate-200 rounded-xl p-1 shadow-xs">
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all min-h-[36px] ${
          language === 'en'
            ? 'bg-primary text-white shadow-xs'
            : 'text-slate-600 hover:text-primary hover:bg-slate-50'
        }`}
        title="Switch to English"
      >
        <span>English</span>
        {language === 'en' && <Check className="w-3.5 h-3.5 ml-0.5" />}
      </button>

      <button
        type="button"
        onClick={() => setLanguage('te')}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all min-h-[36px] ${
          language === 'te'
            ? 'bg-primary text-white shadow-xs'
            : 'text-slate-700 hover:text-primary hover:bg-slate-50'
        }`}
        title="తెలుగులోకి మార్చండి"
      >
        <span>తెలుగు</span>
        {language === 'te' && <Check className="w-3.5 h-3.5 ml-0.5" />}
      </button>
    </div>
  );
};
