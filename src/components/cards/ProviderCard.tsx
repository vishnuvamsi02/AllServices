'use client';

import React, { useState } from 'react';
import { ServiceProvider } from '@/data/types';
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
  Wrench,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

interface ProviderCardProps {
  provider: ServiceProvider;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const { t, isTelugu } = useLanguage();
  const { favorites, toggleFavorite } = useMarketplace();
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  const isFavorited = favorites.providers.includes(provider.id);

  const name = isTelugu ? provider.teluguName : provider.name;
  const village = isTelugu ? provider.villageTelugu : provider.villageName;
  const category = isTelugu ? provider.categoryTelugu : provider.category;
  const about = isTelugu ? provider.aboutTelugu : provider.about;

  return (
    <>
      <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-primary/40 shadow-card hover:shadow-lift transition-all duration-300 flex flex-col justify-between overflow-hidden group">
        
        {/* Card Header & Avatar */}
        <div className="p-5 sm:p-6 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3.5">
              <div className="relative shrink-0">
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-slate-100 shadow-sm group-hover:scale-105 transition-transform"
                />
                {provider.isVerified && (
                  <div
                    className="absolute -bottom-1 -right-1 bg-secondary text-white p-1 rounded-full shadow-md"
                    title={t('common.verified')}
                  >
                    <ShieldCheck className="w-4 h-4 fill-current text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                    <Wrench className="w-3 h-3" />
                    <span>{category}</span>
                  </span>
                  {provider.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-secondary/10 text-secondary">
                      <CheckCircle className="w-3 h-3" />
                      <span>{isTelugu ? 'ధృవీకృతం' : 'Verified'}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1.5 tracking-tight group-hover:text-primary transition-colors">
                  <Link href={`/services/${provider.id}`}>
                    {name}
                  </Link>
                </h3>

                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{village}</span>
                  </span>
                  <span>•</span>
                  <span className="font-semibold text-slate-700">
                    {provider.experienceYears} {t('common.years')} {t('common.experience')}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleFavorite('providers', provider.id)}
              className={`p-2 rounded-xl border transition-colors shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isFavorited
                  ? 'bg-rose-50 border-rose-200 text-rose-500'
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500'
              }`}
              title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Description & Rating */}
          <div className="mt-3.5">
            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {about}
            </p>
          </div>

          {/* Rating & Working hours row */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-bold">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                <span>{provider.rating}</span>
              </div>
              <span className="text-slate-500 font-medium">
                ({provider.reviewCount} {t('common.reviews')})
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{isTelugu ? provider.workingHoursTelugu : provider.workingHours}</span>
            </div>
          </div>

          {/* Sample service badges */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {provider.services.slice(0, 2).map((srv) => (
              <span
                key={srv.id}
                className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-medium flex items-center gap-1"
              >
                <span>{isTelugu ? srv.teluguName : srv.name}</span>
                <span className="font-bold text-slate-900">{srv.price}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons: Call Now, WhatsApp, Send Enquiry */}
        <div className="p-4 sm:p-5 pt-3 bg-slate-50/80 border-t border-slate-100 flex flex-wrap items-center gap-2">
          
          <a
            href={`tel:${provider.phone}`}
            className="flex-1 min-h-[46px] px-3 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Phone className="w-4 h-4 fill-current shrink-0" />
            <span>{t('common.callNow')}</span>
          </a>

          <a
            href={`https://wa.me/91${provider.whatsapp}?text=${encodeURIComponent(
              isTelugu 
                ? `నమస్కారం ${provider.teluguName} గారు, నేను గ్రామసేవ పోర్టల్ లో మీ వివరాలు చూసి సంప్రదిస్తున్నాను.` 
                : `Hello ${provider.name}, I found your contact on SevaSetu portal and need your service.`
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
          id: provider.id,
          type: 'provider',
          name: isTelugu ? provider.teluguName : provider.name,
          villageId: provider.villageId,
          villageName: isTelugu ? provider.villageTelugu : provider.villageName,
          defaultService: isTelugu ? provider.services[0]?.teluguName : provider.services[0]?.name,
        }}
      />
    </>
  );
};
