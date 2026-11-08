'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import {
  Sparkles,
  Wrench,
  PartyPopper,
  HardHat,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

interface ServiceItemData {
  id: string;
  titleEn: string;
  titleTe: string;
  image: string;
  catSlug: string;
  priceNote: string;
}

export const ExploreServicesSection: React.FC = () => {
  const { t, isTelugu } = useLanguage();
  const [activeTab, setActiveTab] = useState<'home_service' | 'home_repairs' | 'events' | 'builders'>('home_service');

  const tabs = [
    {
      key: 'home_service',
      label: t('exploreServices.tabHomeService'),
      icon: '🪣',
      lucide: Sparkles,
      selectedClass: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20',
      hoverBorder: 'hover:border-emerald-300',
    },
    {
      key: 'home_repairs',
      label: t('exploreServices.tabHomeRepairs'),
      icon: '🛠️',
      lucide: Wrench,
      selectedClass: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white border-amber-600 shadow-md shadow-amber-600/20',
      hoverBorder: 'hover:border-amber-300',
    },
    {
      key: 'events',
      label: t('exploreServices.tabEvents'),
      icon: '🏺',
      lucide: PartyPopper,
      selectedClass: 'bg-gradient-to-r from-rose-600 to-purple-600 text-white border-rose-600 shadow-md shadow-rose-600/20',
      hoverBorder: 'hover:border-rose-300',
    },
    {
      key: 'builders',
      label: t('exploreServices.tabBuilders'),
      icon: '👷',
      lucide: HardHat,
      selectedClass: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md shadow-blue-600/20',
      hoverBorder: 'hover:border-blue-300',
    },
  ];

  const servicesData: Record<string, ServiceItemData[]> = {
    home_service: [
      {
        id: 'es1',
        titleEn: 'House Cleaning',
        titleTe: 'ఇంటి శుభ్రత',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600',
        catSlug: 'house-cleaning',
        priceNote: 'Starting from ₹499',
      },
      {
        id: 'es2',
        titleEn: 'Water Tank Cleaning',
        titleTe: 'వాటర్ ట్యాంక్ క్లీనింగ్',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
        catSlug: 'plumbers',
        priceNote: 'Starting from ₹350',
      },
      {
        id: 'es3',
        titleEn: 'Pest Control',
        titleTe: 'పురుగుల నివారణ',
        image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600',
        catSlug: 'pest-control',
        priceNote: 'Herbal & Safe from ₹599',
      },
    ],
    home_repairs: [
      {
        id: 'es4',
        titleEn: 'Electrician & Borewell',
        titleTe: 'ఎలక్ట్రీషియన్ & మోటార్లు',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600',
        catSlug: 'electricians',
        priceNote: 'Doorstep visit in 30 mins',
      },
      {
        id: 'es5',
        titleEn: 'AC Jet Repair & Gas',
        titleTe: 'ఏసీ సర్వీసింగ్ & గ్యాస్',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=600',
        catSlug: 'ac-repair',
        priceNote: 'Full foam wash from ₹449',
      },
      {
        id: 'es6',
        titleEn: 'Plumbing & PVC Lines',
        titleTe: 'ప్లంబింగ్ & కుళాయిలు',
        image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=600',
        catSlug: 'plumbers',
        priceNote: 'Leakage fixing from ₹150',
      },
    ],
    events: [
      {
        id: 'es7',
        titleEn: 'Vedic Purohithulu',
        titleTe: 'వేద పండితులు / పూజలు',
        image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&q=80&w=600',
        catSlug: 'purohith',
        priceNote: 'Vratham & Grihapravesam',
      },
      {
        id: 'es8',
        titleEn: 'Traditional Catering',
        titleTe: 'ఆంధ్రా రుచుల కేటరింగ్',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600',
        catSlug: 'catering',
        priceNote: 'Pure Ghee Function Meals',
      },
      {
        id: 'es9',
        titleEn: 'Wedding Photography',
        titleTe: 'పెళ్లి ఫోటోగ్రఫీ & డ్రోన్',
        image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=600',
        catSlug: 'photographers',
        priceNote: '4K Cinematic Coverage',
      },
    ],
    builders: [
      {
        id: 'es10',
        titleEn: 'House Painters',
        titleTe: 'ఇంటి పెయింటర్లు',
        image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=600',
        catSlug: 'painters',
        priceNote: 'Interior & Weatherproof',
      },
      {
        id: 'es11',
        titleEn: 'Wood Works & Teak',
        titleTe: 'వడ్రంగి & కలప పనులు',
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=600',
        catSlug: 'wood-works',
        priceNote: 'Custom Doors & Wardrobes',
      },
      {
        id: 'es12',
        titleEn: 'Masonry & Centering',
        titleTe: 'మేస్త్రీలు & భవన నిర్మాణం',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600',
        catSlug: 'builders-contractors',
        priceNote: 'Slab, Plastering & Tiles',
      },
    ],
  };

  const activeServices = servicesData[activeTab] || servicesData.home_service;

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card my-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 text-primary fill-current" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight uppercase">
            {t('exploreServices.title')}
          </h2>
        </div>

        <Link
          href="/services"
          className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1"
        >
          <span>{t('exploreServices.viewAll')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 Interactive Category Tabs matching Screen 10 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex flex-col items-center text-center group ${
                isSelected
                  ? `${tab.selectedClass} scale-[1.02]`
                  : `bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100 ${tab.hoverBorder}`
              }`}
            >
              <span className="text-2xl mb-1.5 transition-transform group-hover:scale-110">
                {tab.icon}
              </span>
              <span className="text-xs sm:text-sm font-extrabold leading-snug">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3 Visual Cards with Photography matching Screen 10 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeServices.map((item) => (
          <Link
            key={item.id}
            href={`/services?cat=${item.catSlug}`}
            className="group rounded-3xl overflow-hidden border border-slate-200 bg-white hover:border-primary/50 shadow-sm hover:shadow-lift transition-all duration-300 flex flex-col"
          >
            <div className="relative h-44 w-full overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-black text-slate-900 tracking-wider shadow-sm">
                {t('exploreServices.explorePill')}
              </div>
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-primary transition-colors">
                  {isTelugu ? item.titleTe : item.titleEn}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {item.priceNote}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                <span>{t('exploreServices.details')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
};
