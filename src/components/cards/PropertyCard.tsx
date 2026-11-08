'use client';

import React, { useState } from 'react';
import { PropertyListing } from '@/data/types';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { EnquiryModal } from '../common/EnquiryModal';
import {
  Phone,
  MapPin,
  Heart,
  Send,
  Building,
  Maximize2,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

interface PropertyCardProps {
  property: PropertyListing;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { t, isTelugu } = useLanguage();
  const { favorites, toggleFavorite } = useMarketplace();
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  const isFavorited = favorites.properties.includes(property.id);

  const title = isTelugu ? property.teluguTitle : property.title;
  const village = isTelugu ? property.villageTelugu : property.villageName;

  const typeLabels = {
    agricultural: isTelugu ? 'వ్యవసాయ భూమి' : 'Agricultural Land',
    residential: isTelugu ? 'నివాస ఇల్లు' : 'Residential House',
    commercial: isTelugu ? 'వాణిజ్య స్థలం' : 'Commercial Space',
    plot: isTelugu ? 'ప్లాట్' : 'Plot',
  };

  return (
    <>
      <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-primary/40 shadow-card hover:shadow-lift transition-all duration-300 flex flex-col justify-between overflow-hidden group">
        
        {/* Card Header & Photo */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-primary text-white shadow-sm">
              <Building className="w-3.5 h-3.5" />
              <span>{typeLabels[property.propertyType]}</span>
            </span>

            <button
              type="button"
              onClick={() => toggleFavorite('properties', property.id)}
              className={`p-2 rounded-xl backdrop-blur-md transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center ${
                isFavorited
                  ? 'bg-rose-500 text-white'
                  : 'bg-black/30 hover:bg-black/50 text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Price badge */}
          <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
            <div>
              <span className="text-xs text-emerald-300 font-semibold block">
                {property.listingType.toUpperCase()}
              </span>
              <span className="text-xl font-extrabold text-white">
                {property.price}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm">
              <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{property.size}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 pb-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="font-semibold text-slate-700">{village}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            <Link href={`/properties/${property.id}`}>
              {title}
            </Link>
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {property.description}
          </p>

          {/* Amenities tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {property.amenities.slice(0, 2).map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium flex items-center gap-1"
              >
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons: Call Owner, Send Enquiry */}
        <div className="p-4 sm:p-5 pt-3 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
          <a
            href={`tel:${property.ownerPhone}`}
            className="flex-1 min-h-[46px] px-3 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Phone className="w-4 h-4 fill-current shrink-0" />
            <span>{t('common.callNow')}</span>
          </a>

          <button
            type="button"
            onClick={() => setEnquiryModalOpen(true)}
            className="flex-1 min-h-[46px] px-3 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
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
          id: property.id,
          type: 'property',
          name: title,
          villageId: property.villageId,
          villageName: village,
          defaultService: typeLabels[property.propertyType],
        }}
      />
    </>
  );
};
