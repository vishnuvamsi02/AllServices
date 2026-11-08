'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/data/types';
import enTranslations from '@/locales/en.json';
import teTranslations from '@/locales/te.json';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (path: string, fallback?: string) => string;
  isTelugu: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'gramaseva_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 1. Check logged in user preference if available
    const storedAuth = localStorage.getItem('gramaseva_current_user');
    let userPref: Language | null = null;
    if (storedAuth) {
      try {
        const user = JSON.parse(storedAuth);
        if (user && user.languagePreference) {
          userPref = user.languagePreference;
        }
      } catch (e) {
        console.error('Failed to parse current user for language', e);
      }
    }

    // 2. Check localStorage
    const savedLang = localStorage.getItem(LOCAL_STORAGE_KEY) as Language | null;

    // Apply priority: user account preference > localStorage > 'en'
    if (userPref && (userPref === 'en' || userPref === 'te')) {
      setLanguageState(userPref);
    } else if (savedLang && (savedLang === 'en' || savedLang === 'te')) {
      setLanguageState(savedLang);
    } else {
      setLanguageState('en');
    }

    setIsInitialized(true);
  }, []);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, newLang);
      
      // Update logged in user if present
      const storedAuth = localStorage.getItem('gramaseva_current_user');
      if (storedAuth) {
        const user = JSON.parse(storedAuth);
        user.languagePreference = newLang;
        localStorage.setItem('gramaseva_current_user', JSON.stringify(user));
      }

      // Update HTML lang attribute
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLang;
        if (newLang === 'te') {
          document.body.classList.add('font-telugu');
        } else {
          document.body.classList.remove('font-telugu');
        }
      }
    } catch (e) {
      console.warn('Could not persist language to storage', e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'te' : 'en');
  };

  const t = (path: string, fallback?: string): string => {
    const dict = language === 'te' ? teTranslations : enTranslations;
    const parts = path.split('.');
    
    let current: any = dict;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        // Fallback to English if missing in Telugu
        let fallbackCurrent: any = enTranslations;
        for (const fbPart of parts) {
          if (fallbackCurrent && typeof fallbackCurrent === 'object' && fbPart in fallbackCurrent) {
            fallbackCurrent = fallbackCurrent[fbPart];
          } else {
            return fallback || path;
          }
        }
        return typeof fallbackCurrent === 'string' ? fallbackCurrent : (fallback || path);
      }
    }

    return typeof current === 'string' ? current : (fallback || path);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isTelugu: language === 'te',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
