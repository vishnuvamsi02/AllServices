'use client';

import React, { useState } from 'react';
import { BusinessListing } from '@/data/types';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { EnquiryModal } from '../common/EnquiryModal';
import {
  Phone,
  MessageCircle,
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Heart,
  Send,
  Store,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

interface BusinessCardProps {
  business: BusinessListing;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const { t, isTelugu } = useLanguage();
  const { favorites, toggleFavorite } = useMarketplace();
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  const isFavorited = favorites.businesses.includes(business.id);

  const name = isTelugu ? business.teluguName : business.name;
  const village = isTelugu ? business.villageTelugu : business.villageName;
  const category = isTelugu ? business.categoryTelugu : business.category;
  const address = isTelugu ? business.addressTelugu : business.address;

  return (
    <>
      <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-primary/40 shadow-card hover:shadow-lift transition-all duration-300 flex flex-col justify-between overflow-hidden group">
        
        {/* Card Header & Photo */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={business.image}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-800 shadow-sm backdrop-blur-sm">
              <Store className="w-3.5 h-3.5 text-primary" />
              <span>{category}</span>
            </span>

            <button
              type="button"
              onClick={() => toggleFavorite('businesses', business.id)}
              className={`p-2 rounded-xl backdrop-blur-md transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center ${
                isFavorited
                  ? 'bg-rose-500 text-white'
                  : 'bg-black/30 hover:bg-black/50 text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-1.5 mb-1">
              {business.isVerified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-secondary text-white shadow">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{isTelugu ? 'ధృవీకృతం' : 'Verified'}</span>
                </span>
              )}
              <span className="text-xs text-white/90 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>{village}</span>
              </span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
              <Link href={`/businesses/${business.id}`}>
                {name}
              </Link>
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 pb-4">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-bold">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                <span>{business.rating}</span>
              </div>
              <span className="text-slate-500 font-medium">
                ({business.reviewCount} {t('common.reviews')})
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{business.openingHours}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed mb-3">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>{address}</span>
          </p>

          {/* Highlights tags */}
          <div className="flex flex-wrap gap-1.5">
            {business.highlights.map((item, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[11px] font-semibold flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons: Call Now, WhatsApp, Send Enquiry */}
        <div className="p-4 sm:p-5 pt-3 bg-slate-50/80 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <a
            href={`tel:${business.phone}`}
            className="flex-1 min-h-[46px] px-3 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Phone className="w-4 h-4 fill-current shrink-0" />
            <span>{t('common.callNow')}</span>
          </a>

          <a
            href={`https://wa.me/91${business.whatsapp}?text=${encodeURIComponent(
              isTelugu 
                ? `నమస్కారం ${business.teluguName} గారు, నేను గ్రామసేవ లో మీ దుకాణం వివరాలు చూసి సంప్రదిస్తున్నాను.` 
                : `Hello, I found ${business.name} on SevaSetu portal.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-h-[46px] px-3 py-2.5 bg-secondary hover:bg-secondary-hover text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current shrink-0" />
            <span>{t('common.whatsapp')}</span>
          </a>

          <button
            type="button"
            onClick={() => setEnquiryModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2.5 min-h-[46px] bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5 text-primary" />
            <span>{t('common.sendEnquiry')}</span>
          </button>
        </div>
      </div>

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        target={{
          id: business.id,
          type: 'business',
          name: isTelugu ? business.teluguName : business.name,
          villageId: business.villageId,
          villageName: isTelugu ? business.villageTelugu : business.villageName,
          defaultService: isTelugu ? business.categoryTelugu : business.category,
        }}
      />
    </>
  );
};
