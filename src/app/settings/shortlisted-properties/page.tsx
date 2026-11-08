'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import Link from 'next/link';
import {
  ArrowLeft,
  Heart,
  Building2,
  Phone,
  MapPin,
  Trash2,
  ExternalLink,
  PlusCircle,
} from 'lucide-react';

export default function ShortlistedPropertiesPage() {
  const router = useRouter();
  const { isTelugu } = useLanguage();
  const { properties, favorites, toggleFavorite, showToast } = useMarketplace();

  const shortlisted = properties.filter((p) => favorites.properties.includes(p.id));

  const handleRemove = (id: string, name: string) => {
    toggleFavorite('properties', id);
    showToast(
      'info',
      isTelugu ? 'తొలగించబడింది' : 'Removed',
      isTelugu ? 'ఆస్తి ఇష్టాల నుండి తొలగించబడింది.' : `${name} removed from your shortlist.`
    );
  };

  return (
    <div className="bg-surface-bg pb-10">
      {/* Mobile App Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3.5 flex items-center justify-between shadow-xs">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          title="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
          {isTelugu ? 'ఇష్టపడిన ఆస్తులు' : 'Shortlisted Properties'}
        </h1>
        <span className="text-xs font-bold text-primary px-2.5 py-1 rounded-full bg-primary/10">
          {shortlisted.length}
        </span>
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        {shortlisted.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 my-8">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto shadow-inner">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                {isTelugu ? 'ఇంకా ఏ ఆస్తిని ఎంచుకోలేదు' : 'No Shortlisted Properties Yet'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                {isTelugu
                  ? 'మీకు నచ్చిన ప్లాట్లు లేదా ఇళ్ళపై గుండె గుర్తును క్లిక్ చేసి ఇక్కడ భద్రపరుచుకోవచ్చు.'
                  : 'Tap the heart icon on any rural land, plot, or villa to save it here for quick access.'}
              </p>
            </div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-extrabold shadow-sm hover:bg-primary-hover transition-colors"
            >
              <Building2 className="w-4 h-4" />
              <span>{isTelugu ? 'ఆస్తులను పరిశీలించండి' : 'Browse Properties'}</span>
            </Link>
          </div>
        ) : (
          shortlisted.map((prop) => (
            <div
              key={prop.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-card flex flex-col group"
            >
              <div className="relative h-40 w-full bg-slate-100 overflow-hidden">
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm uppercase">
                  {prop.propertyType}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(prop.id, prop.title)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 text-rose-500 shadow-sm hover:bg-white transition-all"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{isTelugu ? prop.villageTelugu : prop.villageName}</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">
                    {isTelugu ? prop.teluguTitle : prop.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                    <span className="text-sm font-extrabold text-primary">
                      {prop.price}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {prop.size}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100">
                  <a
                    href={`tel:${prop.ownerPhone}`}
                    className="py-2.5 rounded-xl bg-secondary hover:bg-secondary-hover text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5 fill-current" />
                    <span>{isTelugu ? 'కాల్ చేయండి' : 'Call Owner'}</span>
                  </a>

                  <Link
                    href={`/properties/${prop.id}`}
                    className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold flex items-center justify-center gap-1.5"
                  >
                    <span>{isTelugu ? 'వివరాలు' : 'View Details'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
