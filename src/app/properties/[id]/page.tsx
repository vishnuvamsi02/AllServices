'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { EnquiryModal } from '@/components/common/EnquiryModal';
import {
  Building2,
  Phone,
  MessageCircle,
  MapPin,
  Heart,
  Send,
  Share2,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Maximize2,
  Home,
  Check,
  Sparkles,
  Award,
} from 'lucide-react';
import Link from 'next/link';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t, isTelugu } = useLanguage();
  const { properties, favorites, toggleFavorite, showToast } = useMarketplace();
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const propertyId = params?.id as string;
  const property = properties.find((p) => p.id === propertyId) || properties[0];

  const isFavorited = favorites.properties.includes(property.id);

  const title = isTelugu ? property.teluguTitle : property.title;
  const village = isTelugu ? property.villageTelugu : property.villageName;

  const typeLabels = {
    agricultural: isTelugu ? 'వ్యవసాయ భూమి' : 'Agricultural Land',
    residential: isTelugu ? 'నివాస ఇల్లు' : 'Residential House',
    commercial: isTelugu ? 'వాణిజ్య స్థలం' : 'Commercial Space',
    plot: isTelugu ? 'ప్లాట్' : 'Plot',
    pg: isTelugu ? 'పీజీ / హాస్టల్' : 'PG / Hostel',
    lease: isTelugu ? 'లీజు ఆస్తి' : 'Lease Property',
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: `${title} - ${village} (${property.price})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      showToast(
        'success',
        isTelugu ? 'లింక్ కాపీ అయింది' : 'Link Copied',
        isTelugu ? 'ఆస్తి లింక్ కాపీ చేయబడింది!' : 'Property link copied to clipboard!'
      );
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Similar properties from same or other villages
  const similarProperties = properties
    .filter((p) => p.id !== property.id)
    .slice(0, 2);

  return (
    <div className="bg-surface-bg min-h-screen py-6 sm:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isTelugu ? 'తిరిగి ఆస్తుల జాబితాకు' : 'Back to Properties'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-primary" />
              <span>{copiedLink ? (isTelugu ? 'కాపీ అయింది!' : 'Copied!') : (isTelugu ? 'షేర్ చేయండి' : 'Share')}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleFavorite('properties', property.id)}
              className={`p-2 rounded-xl border transition-all ${
                isFavorited
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
              title={isFavorited ? 'Remove favorite' : 'Add favorite'}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Hero Card & Image */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-card mb-8">
          <div className="relative h-72 sm:h-96 w-full bg-slate-900">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

            {/* Badges on top of image */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary text-white shadow-md flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{typeLabels[property.propertyType]}</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-secondary text-white shadow-md uppercase tracking-wider">
                  {property.listingType === 'sale' ? (isTelugu ? 'అమ్మకానికి' : 'FOR SALE') : (isTelugu ? 'అద్దెకు' : 'FOR RENT')}
                </span>
              </div>

              <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-secondary fill-current" />
                <span>{isTelugu ? 'గ్రామ నిర్ధారిత ఆస్తి' : 'Verified Village Title'}</span>
              </div>
            </div>

            {/* Price and basic specs at bottom of hero */}
            <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-emerald-300 font-semibold mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>{village}, Andhra Pradesh</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow">
                  {title}
                </h1>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-white/20 shrink-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  {t('propertySection.totalAmount')}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {property.price}
                </div>
                <div className="text-xs text-emerald-300 font-semibold mt-0.5">
                  {property.size}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Main Details + Direct Owner Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info (2 Columns on Desktop) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Specs Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>{isTelugu ? 'ఆస్తి ముఖ్య వివరాలు' : 'Property Specifications'}</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    {isTelugu ? 'విస్తీర్ణం' : 'Size / Area'}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-1">
                    <Maximize2 className="w-4 h-4 text-primary" />
                    <span>{property.size}</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    {isTelugu ? 'ఆస్తి రకం' : 'Property Type'}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-1">
                    <Home className="w-4 h-4 text-secondary" />
                    <span>{typeLabels[property.propertyType]}</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    {isTelugu ? 'అమ్మకం / అద్దె' : 'Transaction'}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-1">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>{property.listingType.toUpperCase()}</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    {isTelugu ? 'గ్రామం' : 'Village'}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900">
                    {village}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    {isTelugu ? 'కమిషన్' : 'Brokerage'}
                  </span>
                  <span className="text-sm sm:text-base font-black text-secondary">
                    {isTelugu ? '₹0 ఉచితం (నో బ్రోకరేజ్)' : '0% Direct Connect'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    {isTelugu ? 'ధృవీకరణ' : 'Verification'}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{isTelugu ? 'పరిశీలించబడింది' : 'Panchayat Clean'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
              <h2 className="text-lg font-extrabold text-slate-900 mb-3">
                {isTelugu ? 'ఆస్తి వివరణ' : 'About This Property'}
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {property.description}
              </p>
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-emerald-900 font-medium">
                  {isTelugu
                    ? 'గమనిక: ఈ ఆస్తి స్థానిక గ్రామ సచివాలయం / గ్రామ అడ్మిన్ ద్వారా ప్రాథమికంగా పరిశీలించబడింది. రిజిస్ట్రేషన్ లేదా చెల్లింపులకు ముందు అన్ని ఒరిజినల్ పత్రాలు స్వయంగా పరిశీలించండి.'
                    : 'Safe Rural Direct Guarantee: Zero brokerage application. Contact the land owner directly via Phone or WhatsApp for site visit.'}
                </p>
              </div>
            </div>

            {/* Amenities & Legal Approvals */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">
                {isTelugu ? 'సదుపాయాలు & పత్రాల వివరాలు' : 'Amenities & Approvals'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <div className="w-7 h-7 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 font-bold" />
                    </div>
                    <span className="text-sm font-bold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-extrabold text-slate-900">
                    {isTelugu ? 'ఇతర సమీప ఆస్తులు' : 'Similar Local Properties'}
                  </h2>
                  <Link
                    href="/properties"
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    {isTelugu ? 'అన్నీ చూడండి' : 'View all'}
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {similarProperties.map((sim) => (
                    <Link
                      key={sim.id}
                      href={`/properties/${sim.id}`}
                      className="group border border-slate-200 rounded-2xl overflow-hidden hover:border-primary/50 transition-all block bg-white"
                    >
                      <div className="h-32 w-full overflow-hidden bg-slate-100">
                        <img
                          src={sim.image}
                          alt={sim.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3.5">
                        <span className="text-[10px] font-bold text-secondary uppercase block mb-1">
                          {isTelugu ? sim.villageTelugu : sim.villageName} • {sim.size}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-primary">
                          {isTelugu ? sim.teluguTitle : sim.title}
                        </h4>
                        <div className="text-sm font-extrabold text-primary mt-1">
                          {sim.price}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar: Owner Contact & Actions */}
          <div className="space-y-6">
            
            {/* Owner Contact Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card sticky top-24">
              <div className="text-center pb-6 border-b border-slate-100">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-primary/10 text-primary flex items-center justify-center text-3xl font-black mb-3 shadow-inner">
                  {property.ownerName.charAt(0)}
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {isTelugu ? 'ఆస్తి యజమాని / డెవలపర్' : 'Direct Property Owner'}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {property.ownerName}
                </h3>
                <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{village}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-6">
                
                {/* Call Now Button */}
                <a
                  href={`tel:${property.ownerPhone}`}
                  className="w-full py-3.5 px-4 rounded-2xl bg-secondary hover:bg-secondary-hover text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-button hover:shadow-lg transition-all active:scale-[0.98] min-h-[48px]"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>{isTelugu ? 'యజమానికి కాల్ చేయండి' : 'Call Owner Directly'}</span>
                </a>

                {/* WhatsApp Chat */}
                <a
                  href={`https://wa.me/91${property.ownerPhone}?text=${encodeURIComponent(
                    `Namaskaram! I am interested in your property listed on Village Services: "${title}" in ${village}. Please share more details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] min-h-[48px]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{isTelugu ? 'వాట్సాప్‌లో సందేశం పంపండి' : 'Chat on WhatsApp'}</span>
                </a>

                {/* Send Enquiry */}
                <button
                  type="button"
                  onClick={() => setEnquiryModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] min-h-[48px]"
                >
                  <Send className="w-4 h-4" />
                  <span>{isTelugu ? 'ఆస్తి విచారణ నమోదు చేయండి' : 'Send Direct Enquiry'}</span>
                </button>

              </div>

              {/* Security info box */}
              <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  <span>{isTelugu ? 'సురక్షిత గ్రామ లావాదేవీలు' : 'Village Safe Connect'}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  {isTelugu
                    ? 'ఈ ప్లాట్‌ఫారమ్‌లో ఎటువంటి మధ్యవర్తి కమిషన్ లేదు. మీరు నేరుగా యజమానితో మాట్లాడవచ్చు.'
                    : '100% direct connection with rural landowners and builders. Zero commissions.'}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Direct Enquiry Modal */}
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
    </div>
  );
}
