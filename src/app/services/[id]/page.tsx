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
  Wrench,
  CheckCircle,
  ArrowLeft,
  Calendar,
  Award,
} from 'lucide-react';
import Link from 'next/link';

export default function ProviderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t, isTelugu } = useLanguage();
  const { providers, favorites, toggleFavorite } = useMarketplace();
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  const providerId = params?.id as string;
  const provider = providers.find((p) => p.id === providerId) || providers[0];

  const isFavorited = favorites.providers.includes(provider.id);

  const name = isTelugu ? provider.teluguName : provider.name;
  const village = isTelugu ? provider.villageTelugu : provider.villageName;
  const category = isTelugu ? provider.categoryTelugu : provider.category;
  const about = isTelugu ? provider.aboutTelugu : provider.about;

  return (
    <div className="bg-surface-bg min-h-screen py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isTelugu ? 'తిరిగి సేవలకు వెళ్ళండి' : 'Back to Services'}</span>
        </button>

        {/* Provider Profile Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card mb-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <div className="relative shrink-0">
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-slate-100 shadow-md"
                />
                {provider.isVerified && (
                  <div
                    className="absolute -bottom-2 -right-2 bg-secondary text-white p-2 rounded-2xl shadow-lg flex items-center gap-1"
                    title={t('common.verified')}
                  >
                    <ShieldCheck className="w-5 h-5 fill-current" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>{category}</span>
                  </span>
                  {provider.isVerified && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{isTelugu ? 'గ్రామ ధృవీకరణ పొందింది' : 'Village Admin Verified'}</span>
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {name}
                </h1>

                <div className="flex items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm text-slate-600 mt-2 flex-wrap">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{village}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <Award className="w-4 h-4 text-accent" />
                    <span>{provider.experienceYears} {t('common.years')} {t('common.experience')}</span>
                  </span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-extrabold text-sm">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span>{provider.rating}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-500">
                    ({provider.reviewCount} {isTelugu ? 'గ్రామ ప్రజల సమీక్షలు' : 'verified village reviews'})
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleFavorite('providers', provider.id)}
              className={`p-3 rounded-2xl border transition-colors shrink-0 flex items-center gap-2 text-xs font-bold ${
                isFavorited
                  ? 'bg-rose-50 border-rose-200 text-rose-500'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              <span>{isFavorited ? 'Saved' : 'Save'}</span>
            </button>
          </div>

          {/* Action Buttons Bar */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`tel:${provider.phone}`}
              className="py-3.5 px-4 bg-primary hover:bg-primary-hover text-white text-sm sm:text-base font-bold rounded-2xl shadow-md flex items-center justify-center gap-2.5 transition-all"
            >
              <Phone className="w-5 h-5 fill-current" />
              <span>{t('common.callNow')} ({provider.phone})</span>
            </a>

            <a
              href={`https://wa.me/91${provider.whatsapp}?text=${encodeURIComponent(
                isTelugu 
                  ? `నమస్కారం ${provider.teluguName} గారు, నేను గ్రామసేవ లో మీ వివరాలు చూసి సంప్రదిస్తున్నాను.` 
                  : `Hello ${provider.name}, I found your contact on SevaSetu.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-4 bg-secondary hover:bg-secondary-hover text-white text-sm sm:text-base font-bold rounded-2xl shadow-md flex items-center justify-center gap-2.5 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>{t('common.whatsapp')}</span>
            </a>

            <button
              type="button"
              onClick={() => setEnquiryModalOpen(true)}
              className="py-3.5 px-4 bg-white hover:bg-slate-50 text-slate-900 border-2 border-primary text-sm sm:text-base font-bold rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4 text-primary" />
              <span>{t('common.sendEnquiry')}</span>
            </button>
          </div>
        </div>

        {/* 2 Column Details: Services & About + Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mb-3">
                {isTelugu ? 'పరిచయం & నైపుణ్యాలు' : 'About & Experience'}
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {about}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-semibold">{t('common.workingHours')}:</span>
                <span>{isTelugu ? provider.workingHoursTelugu : provider.workingHours}</span>
              </div>
            </div>

            {/* Services Offered with Transparent Village Pricing */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mb-4">
                {isTelugu ? 'అందించే సేవలు & ధరల వివరాలు' : 'Services Offered & Transparent Charges'}
              </h2>

              <div className="space-y-3">
                {provider.services.map((srv) => (
                  <div
                    key={srv.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        ✓
                      </div>
                      <span className="font-bold text-sm sm:text-base text-slate-900">
                        {isTelugu ? srv.teluguName : srv.name}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">{t('common.startingPrice')}</span>
                      <span className="font-extrabold text-base sm:text-lg text-emerald-700">{srv.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mb-4">
                {isTelugu ? 'గ్రామస్తుల అభిప్రాయాలు' : 'Customer Reviews'}
              </h2>

              <div className="space-y-4">
                {provider.reviewsList.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">{rev.author}</span>
                      <span className="text-xs text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Direct Contact Widget */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                {isTelugu ? 'నిపుణుడితో మాట్లాడండి' : 'Contact Directly'}
              </h3>

              <div className="space-y-3">
                <a
                  href={`tel:${provider.phone}`}
                  className="w-full py-3 bg-primary text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-primary-hover shadow-sm"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>{t('common.callNow')}</span>
                </a>

                <a
                  href={`https://wa.me/91${provider.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-secondary text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-secondary-hover shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{t('common.whatsapp')}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setEnquiryModalOpen(true)}
                  className="w-full py-3 bg-slate-100 text-slate-800 font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200"
                >
                  <Send className="w-4 h-4 text-primary" />
                  <span>{t('common.sendEnquiry')}</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                <p className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  <span>{isTelugu ? 'నేరుగా మాట్లాడండి - కమిషన్ లేదు' : 'Zero commission, direct payment'}</span>
                </p>
                <p className="flex items-center gap-2 text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>{isTelugu ? 'గ్రామ పరిధిలో త్వరిత సేవ' : 'Fast service in village vicinity'}</span>
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        target={{
          id: provider.id,
          type: 'provider',
          name: name,
          villageId: provider.villageId,
          villageName: village,
          defaultService: isTelugu ? provider.services[0]?.teluguName : provider.services[0]?.name,
        }}
      />
    </div>
  );
}
