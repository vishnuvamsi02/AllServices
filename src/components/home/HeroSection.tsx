'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { useAuth } from '@/context/AuthContext';
import { HomeMode } from '@/data/types';
import { ModeSwitcher } from './ModeSwitcher';
import { LocationPermissionModal } from '../common/LocationPermissionModal';
import { LanguageSelector } from '../common/LanguageSelector';
import {
  MapPin,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  User,
  LogIn,
  X,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  mode: HomeMode;
  onModeChange: (mode: HomeMode) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ mode, onModeChange }) => {
  const { t, isTelugu } = useLanguage();
  const { selectedVillage, selectedVillageId, setSelectedVillageId, villages, getVillageName } = useLocation();
  const { currentUser, isLoggedIn, role } = useAuth();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [showVillagePicker, setShowVillagePicker] = useState(false);

  // Dynamic animated search placeholder matching Scazo screens
  const placeholders = [
    isTelugu ? 'హౌస్ క్లీనింగ్ సేవలు వెతకండి...' : 'Search House cleaning...',
    isTelugu ? 'కార్ డ్రైవర్లను వెతకండి...' : 'Search Car Drivers...',
    isTelugu ? 'ఏసీ రిపేర్ & గ్యాస్ వెతకండి...' : 'Search AC Repair...',
    isTelugu ? 'ఫోటోగ్రాఫర్లను వెతకండి...' : 'Search Photographers...',
    isTelugu ? 'ఎలక్ట్రీషియన్, మోటార్ సర్వీస్...' : 'Search Electricians...',
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'properties') {
      router.push(`/properties${searchQuery.trim() ? `?q=${encodeURIComponent(searchQuery.trim())}` : ''}`);
    } else {
      router.push(`/services${searchQuery.trim() ? `?q=${encodeURIComponent(searchQuery.trim())}` : ''}`);
    }
  };

  const displayName = selectedVillageId === 'all'
    ? (isTelugu ? 'అన్ని గ్రామాలు' : 'All Villages')
    : selectedVillage
    ? (isTelugu ? `1-123, ${selectedVillage.teluguName}` : `1-123, ${selectedVillage.name}`)
    : (isTelugu ? '1-123, చించినాడ' : '1-123, Chinchinaada');

  return (
    <div className="relative bg-gradient-to-b from-[#EBF3FB] via-[#F4F8FC] to-surface-bg pt-4 pb-8 sm:pt-6 sm:pb-12 border-b border-slate-200/60 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Bar: Brand + Location on Left + User Auth on Right */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 mb-5">
          
          {/* Brand & Location on Left */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group shrink-0" title="SevaSetu Home">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-indigo-800 flex items-center justify-center text-white font-extrabold text-base shadow-xs group-hover:scale-105 transition-transform">
                సే
              </div>
              <span className="font-extrabold text-base sm:text-lg text-primary tracking-tight hidden sm:inline">
                {isTelugu ? 'సేవాసేతు' : 'SevaSetu'}
              </span>
            </Link>

            {/* Location Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowVillagePicker(!showVillagePicker)}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/95 hover:bg-white border border-slate-200/90 shadow-xs transition-all text-slate-800 text-xs sm:text-sm font-bold min-h-[36px] group"
              >
                <MapPin className="w-3.5 h-3.5 text-primary fill-primary/10 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate max-w-[105px] xs:max-w-[140px] sm:max-w-xs">{displayName}</span>
                <ChevronDown className="w-3 h-3 text-slate-500 shrink-0" />
              </button>

              {/* Village Dropdown */}
              {showVillagePicker && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowVillagePicker(false)}
                  />
                  <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {isTelugu ? 'గ్రామం మార్చండి' : 'Change Location'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setShowVillagePicker(false);
                          setShowLocationDialog(true);
                        }}
                        className="text-[11px] font-bold text-primary hover:underline"
                      >
                        {isTelugu ? 'జియో లొకేషన్' : 'Detect GPS'}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedVillageId('all');
                        setShowVillagePicker(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-colors ${
                        selectedVillageId === 'all' ? 'bg-primary/10 text-primary' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {isTelugu ? 'అన్ని గ్రామాలు (All AP)' : 'All Villages (Consolidated)'}
                    </button>

                    <div className="max-h-56 overflow-y-auto space-y-1 mt-1">
                      {villages.map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => {
                            setSelectedVillageId(v.id);
                            setShowVillagePicker(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition-colors ${
                            selectedVillageId === v.id ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="font-bold text-slate-900">
                            {isTelugu ? v.teluguName : v.name}
                            <span className="text-[11px] font-normal text-slate-500 ml-1">({v.mandal}, {v.district})</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Action: Language Selector + Auth Action (Guest vs Logged In) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <LanguageSelector compact />

            {isLoggedIn && role !== 'guest' ? (
              <Link
                href={role === 'provider' ? '/dashboard/provider' : role === 'business' ? '/dashboard/business' : '/dashboard/customer'}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200/90 shadow-xs flex items-center justify-center text-primary font-black text-sm hover:scale-105 hover:border-primary transition-all"
                title={`${currentUser?.name || 'Account'} (${role.replace('_', ' ')})`}
              >
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs transition-all min-h-[36px]"
                title="Login / Sign Up"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">{isTelugu ? 'లాగిన్' : 'Login'}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Dynamic Animated Search Bar with Standalone Filter Outside */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input Container */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-primary">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2px]" />
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholders[placeholderIndex]}
                className="w-full h-12 sm:h-14 pl-10 sm:pl-12 pr-10 text-xs sm:text-base text-slate-900 bg-white hover:bg-slate-50/80 focus:bg-white border-2 border-slate-200 focus:border-primary rounded-2xl shadow-xs focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-semibold"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Standalone Filter / Menu Button Outside Search Bar */}
            <button
              type="button"
              onClick={() => router.push(mode === 'properties' ? '/properties' : '/categories')}
              className="h-12 sm:h-14 px-3 sm:px-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-primary text-slate-700 hover:text-primary shadow-xs hover:shadow-sm flex items-center justify-center gap-1.5 shrink-0 transition-all group"
              title={isTelugu ? 'ఫిల్టర్లు / కేటగిరీలు' : 'Filters / Categories'}
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <SlidersHorizontal className="w-4 h-4 stroke-[2.2px]" />
              </div>
              <span className="text-xs font-bold hidden md:inline">{isTelugu ? 'కేటగిరీలు' : 'Filters'}</span>
            </button>
          </div>
        </form>

        {/* Top Segmented Mode Switcher [Services] & [Properties] matching Scazo Reference */}
        <div className="mb-6">
          <ModeSwitcher mode={mode} onChange={onModeChange} />
        </div>

        {/* Top Hero Banner matching Scazo Screen 10 */}
        {mode === 'services' && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-50 via-white to-blue-50/60 border border-sky-200/80 p-5 sm:p-7 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 my-6 animate-in fade-in duration-300">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black bg-primary/10 text-primary uppercase tracking-wider">
                {t('hero.localTag')}
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {t('hero.trustedTag')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {isTelugu 
                  ? 'మీ గ్రామంలో అందుబాటులో ఉన్న నిపుణులను ఒక్క క్లిక్‌తో సంప్రదించండి.' 
                  : 'Certified electricians, plumbers, repair specialists, and agricultural helpers.'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/services"
                className="px-5 py-3 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-extrabold rounded-2xl shadow-md transition-all active:scale-95"
              >
                {isTelugu ? 'సేవలను చూడండి' : 'Browse All Services'}
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* Geolocation Permission Modal simulation matching Screen 13 */}
      <LocationPermissionModal
        isOpen={showLocationDialog}
        onClose={() => setShowLocationDialog(false)}
      />

    </div>
  );
};
