'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { HomeMode } from '@/data/types';
import { ModeSwitcher } from './ModeSwitcher';
import { LocationPermissionModal } from '../common/LocationPermissionModal';
import { VehicleSelectorModal } from '../common/VehicleSelectorModal';
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
  Car,
  Bike,
  Wrench,
  Gift,
} from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  mode: HomeMode;
  onModeChange: (mode: HomeMode) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ mode, onModeChange }) => {
  const { t, isTelugu } = useLanguage();
  const { selectedVillage, selectedVillageId, setSelectedVillageId, villages } = useLocation();
  const { currentUser, isLoggedIn, role } = useAuth();
  const { activeVehicle } = useMarketplace();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [showVillagePicker, setShowVillagePicker] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);

  // Dynamic automotive search placeholder
  const placeholders = [
    isTelugu ? 'బైక్ సర్వీసింగ్ & ట్యూనింగ్ వెతకండి...' : 'Search Bike Servicing & Tune-up...',
    isTelugu ? 'కార్ ఇంజిన్ ఆయిల్ చేంజ్ (కాస్ట్రాల్, మోటుల్)...' : 'Search Engine Oil Change (Castrol, Motul)...',
    isTelugu ? 'హై-ప్రెజర్ స్నో ఫోమ్ వాటర్ వాష్...' : 'Search High-Pressure Snow Foam Wash...',
    isTelugu ? 'కార్ ఏసీ ఎవాపరేటర్ క్లీనింగ్ & గ్యాస్...' : 'Search Car AC Cleaning & Gas Refill...',
    isTelugu ? 'బ్యాటరీ రీప్లేస్‌మెంట్ & జంప్‌స్టార్ట్...' : 'Search Battery Replacement & Jumpstart...',
    isTelugu ? '3D వీల్ అలైన్‌మెంట్ & టైర్ పంక్చర్...' : 'Search 3D Wheel Alignment & Tyres...',
    isTelugu ? '24/7 ఎమర్జెన్సీ బ్రేక్‌డౌన్ & టోయింగ్...' : 'Search 24/7 Highway Breakdown Towing...',
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

  const customerName = currentUser?.name || 'Ravi Teja';
  const vehicleLabel = activeVehicle
    ? `${activeVehicle.make} ${activeVehicle.model}`
    : 'Hero Splendor Plus';
  const vehicleReg = activeVehicle ? activeVehicle.regNumber : 'AP-39-ER-2024';
  const isCar = activeVehicle?.type === 'car';

  return (
    <div className="relative bg-gradient-to-b from-[#EBF3FB] via-[#F4F8FC] to-surface-bg pt-3.5 pb-6 sm:pt-5 sm:pb-8 border-b border-slate-200/60 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Bar: Brand + Location + Vehicle Selector on Left + User Auth on Right */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 mb-4">
          
          {/* Brand & Location & Vehicle Trigger on Left */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-wrap">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group shrink-0" title="SevaSetu AutoCare">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-indigo-800 flex items-center justify-center text-white font-extrabold text-base shadow-xs group-hover:scale-105 transition-transform">
                సే
              </div>
              <div className="hidden sm:block">
                <span className="font-extrabold text-base sm:text-lg text-primary tracking-tight block leading-tight">
                  {isTelugu ? 'సేవాసేతు ఆటోకేర్' : 'SevaSetu AutoCare'}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Vehicle Service Platform
                </span>
              </div>
            </Link>

            {/* Village Location Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowVillagePicker(!showVillagePicker)}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/95 hover:bg-white border border-slate-200/90 shadow-xs transition-all text-slate-800 text-xs sm:text-sm font-bold min-h-[36px] group"
              >
                <MapPin className="w-3.5 h-3.5 text-primary fill-primary/10 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate max-w-[105px] xs:max-w-[130px] sm:max-w-xs">{displayName}</span>
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

            {/* Active Vehicle Selector Button */}
            <button
              type="button"
              onClick={() => setShowVehicleModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs text-xs font-bold text-slate-800 transition-all group"
              title="Select Active Vehicle"
            >
              {isCar ? (
                <Car className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              ) : (
                <Bike className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              )}
              <span className="truncate max-w-[120px] xs:max-w-[160px]">{vehicleLabel}</span>
              <span className="hidden md:inline font-mono text-[10px] text-slate-500">({vehicleReg})</span>
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-primary shrink-0" />
            </button>
          </div>

          {/* Right Action: Rewards Shortcut + Language Selector + Auth Action */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href="/rewards"
              className="hidden xs:flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-xs transition-transform hover:scale-105"
              title="Monthly Loyalty Rewards"
            >
              <Gift className="w-3.5 h-3.5 fill-current" />
              <span>Rewards 🏆</span>
            </Link>

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

        {/* Personalized Welcome Banner */}
        <div className="mb-4 flex flex-col xs:flex-row xs:items-center justify-between gap-2 bg-white/70 backdrop-blur-xs p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary font-black text-xs flex items-center justify-center shrink-0">
              {customerName.charAt(0)}
            </div>
            <div className="truncate">
              <span className="font-extrabold text-slate-900 text-xs sm:text-sm block truncate">
                Namaskaram, {customerName} 👋
              </span>
              <span className="text-[10px] text-slate-500 hidden xs:block">
                {isTelugu ? 'మీ గ్రామ సేవా వేదిక' : 'Your Rural AP Vehicle Platform'}
              </span>
            </div>
          </div>

          <Link
            href="/rewards"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-extrabold text-[11px] shrink-0 transition-colors shadow-xs"
          >
            <Gift className="w-3.5 h-3.5 text-amber-600 fill-amber-400" />
            <span>7/10 Services (70%)</span>
            <span className="text-amber-700 font-black">🏆</span>
          </Link>
        </div>

        {/* Dynamic Animated Automotive Search Bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-5">
          <div className="flex items-center gap-2 sm:gap-3">
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

            <button
              type="button"
              onClick={() => router.push(mode === 'properties' ? '/properties' : '/categories')}
              className="h-12 sm:h-14 px-3 sm:px-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-primary text-slate-700 hover:text-primary shadow-xs hover:shadow-sm flex items-center justify-center gap-1.5 shrink-0 transition-all group"
              title={isTelugu ? 'కేటగిరీలు' : 'Categories'}
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <SlidersHorizontal className="w-4 h-4 stroke-[2.2px]" />
              </div>
              <span className="text-xs font-bold hidden md:inline">{isTelugu ? 'కేటగిరీలు' : 'Categories'}</span>
            </button>
          </div>
        </form>

        {/* Top Segmented Mode Switcher [Automotive Services] & [Workshop Properties] */}
        <div>
          <ModeSwitcher mode={mode} onChange={onModeChange} />
        </div>

      </div>

      {/* Geolocation Permission Modal */}
      <LocationPermissionModal
        isOpen={showLocationDialog}
        onClose={() => setShowLocationDialog(false)}
      />

      {/* Vehicle Selector Modal */}
      <VehicleSelectorModal
        isOpen={showVehicleModal}
        onClose={() => setShowVehicleModal(false)}
      />

    </div>
  );
};
