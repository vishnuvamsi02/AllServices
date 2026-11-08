'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useAuth } from '@/context/AuthContext';
import { X, Send, Phone, User, Wrench, AlertCircle, CheckCircle2 } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  target: {
    id: string;
    type: 'provider' | 'business' | 'property';
    name: string;
    villageId: string;
    villageName: string;
    defaultService?: string;
  };
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, target }) => {
  const { t, isTelugu } = useLanguage();
  const { addEnquiry } = useMarketplace();
  const { currentUser } = useAuth();

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [serviceRequested, setServiceRequested] = useState(target.defaultService || '');
  const [message, setMessage] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!customerName.trim()) {
      setError(isTelugu ? 'దయచేసి మీ పేరు నమోదు చేయండి' : 'Please enter your full name');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError(isTelugu ? 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ ఇవ్వండి' : 'Please enter a valid 10-digit mobile number');
      return;
    }

    addEnquiry({
      customerId: currentUser?.id || `guest_${Date.now()}`,
      customerName,
      customerPhone: cleanPhone,
      targetType: target.type,
      targetId: target.id,
      targetName: target.name,
      villageId: target.villageId,
      villageName: target.villageName,
      serviceRequested: serviceRequested || (isTelugu ? 'జనరల్ సర్వీస్' : 'General Service'),
      message: message || (isTelugu ? 'కాల్ చేసి మాట్లాడగలరు' : 'Please call to discuss the service'),
      urgent,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-[#1d5c9c] text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white mb-2">
              {target.villageName} • {target.type.toUpperCase()}
            </span>
            <h3 className="text-xl font-bold tracking-tight">
              {t('enquiry.title')}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm mt-0.5">
              {target.name}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto text-secondary">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-slate-800">
              {isTelugu ? 'విచారణ విజయవంతంగా పంపబడింది!' : 'Enquiry Sent Successfully!'}
            </h4>
            <p className="text-sm text-slate-600">
              {isTelugu 
                ? `${target.name} త్వరలోనే మీ నంబర్ (${customerPhone}) కు సంప్రదిస్తారు.` 
                : `${target.name} has been notified and will contact you shortly.`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('enquiry.yourName')} *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={isTelugu ? 'ఉదా: వెంకటేశ్వర రావు' : 'e.g. Venkateswara Rao'}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('enquiry.yourPhone')} *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  maxLength={10}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="9848012345"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {isTelugu ? 'ఈ నంబర్‌కు సేవా నిపుణుడు నేరుగా కాల్ చేస్తారు' : 'Provider will call or WhatsApp on this number'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('enquiry.serviceNeeded')}
              </label>
              <div className="relative">
                <Wrench className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={serviceRequested}
                  onChange={(e) => setServiceRequested(e.target.value)}
                  placeholder={isTelugu ? 'ఉదా: వ్యవసాయ మోటార్ రిపేర్' : 'e.g. Submersible Motor Service'}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('enquiry.message')}
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('enquiry.messagePlaceholder')}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="urgent-check"
                checked={urgent}
                onChange={(e) => setUrgent(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
              />
              <label htmlFor="urgent-check" className="text-xs sm:text-sm font-semibold text-amber-800 cursor-pointer">
                {t('enquiry.urgentHelp')}
              </label>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                className="flex-1 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{t('enquiry.submitBtn')}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
