'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { EnquiryModal } from '@/components/common/EnquiryModal';
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
  ArrowLeft,
} from 'lucide-react';

export default function BusinessDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t, isTelugu } = useLanguage();
  const { businesses, favorites, toggleFavorite } = useMarketplace();
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  const businessId = params?.id as string;
  const business = businesses.find((b) => b.id === businessId) || businesses[0];

  const isFavorited = favorites.businesses.includes(business.id);

  const name = isTelugu ? business.teluguName : business.name;
  const village = isTelugu ? business.villageTelugu : business.villageName;
  const category = isTelugu ? business.categoryTelugu : business.category;
  const address = isTelugu ? business.addressTelugu : business.address;

  return (
    <div className="bg-surface-bg min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isTelugu ? 'తిరిగి వ్యాపారాల జాబితాకు' : 'Back to Businesses'}</span>
        </button>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-card mb-8">
          <div className="relative h-64 sm:h-80 w-full bg-slate-100">
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-slate-900 shadow">
                  {category}
                </span>
                {business.isVerified && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-secondary text-white shadow flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isTelugu ? 'ధృవీకృతం' : 'Verified'}</span>
                  </span>
                )}
                <span className="text-xs text-white/90 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{village}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {name}
              </h1>
              <p className="text-sm text-white/80 mt-1">
                {isTelugu ? `యజమాని: ${business.ownerName}` : `Owner: ${business.ownerName}`}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-extrabold text-sm">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <span>{business.rating}</span>
                </div>
                <span className="text-sm text-slate-500 font-semibold">
                  ({business.reviewCount} {t('common.reviews')})
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-semibold">{t('common.workingHours')}:</span>
                <span>{business.openingHours}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {isTelugu ? 'దుకాణం చిరునామా' : 'Shop Address'}
              </h3>
              <p className="text-sm text-slate-600 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{address}</span>
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-base font-bold text-slate-900 mb-3">
                {isTelugu ? 'ప్రత్యేకతలు & లభించే వస్తువులు' : 'Shop Highlights & Products'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {business.highlights.map((h, i) => (
                  <div key={i} className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60 text-emerald-900 text-sm font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`tel:${business.phone}`}
                className="py-3.5 px-4 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>{t('common.callNow')}</span>
              </a>

              <a
                href={`https://wa.me/91${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 bg-secondary hover:bg-secondary-hover text-white text-sm font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{t('common.whatsapp')}</span>
              </a>

              <button
                type="button"
                onClick={() => setEnquiryModalOpen(true)}
                className="py-3.5 px-4 bg-white hover:bg-slate-50 text-slate-900 border-2 border-primary text-sm font-bold rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4 text-primary" />
                <span>{t('common.sendEnquiry')}</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        target={{
          id: business.id,
          type: 'business',
          name: name,
          villageId: business.villageId,
          villageName: village,
          defaultService: category,
        }}
      />
    </div>
  );
}
