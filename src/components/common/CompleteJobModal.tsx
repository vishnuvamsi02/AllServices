'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CheckCircle2, X, Receipt, Wrench, IndianRupee, ShieldCheck, Car } from 'lucide-react';

interface CompleteJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  customerName: string;
  serviceRequested: string;
  vehicleDetails?: string;
}

export const CompleteJobModal: React.FC<CompleteJobModalProps> = ({
  isOpen,
  onClose,
  bookingId,
  customerName,
  serviceRequested,
  vehicleDetails,
}) => {
  const { isTelugu } = useLanguage();
  const { completeBooking, showToast } = useMarketplace();

  const [workDescription, setWorkDescription] = useState('');
  const [amountCharged, setAmountCharged] = useState('');
  const [providerConfirmed, setProviderConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!workDescription.trim()) {
      showToast(
        'error',
        isTelugu ? 'పని వివరాలు అవసరం' : 'Description Required',
        isTelugu ? 'దయచేసి పూర్తి చేసిన పని వివరాలను నమోదు చేయండి.' : 'Please describe the work performed on this vehicle.'
      );
      return;
    }

    const numAmount = parseFloat(amountCharged);
    if (isNaN(numAmount) || numAmount <= 0) {
      showToast(
        'error',
        isTelugu ? 'సరైన మొత్తం అవసరం' : 'Valid Amount Required',
        isTelugu ? 'దయచేసి వసూలు చేసిన తుది మొత్తాన్ని నమోదు చేయండి.' : 'Please enter the actual service amount charged.'
      );
      return;
    }

    if (!providerConfirmed) {
      showToast(
        'error',
        isTelugu ? 'ధృవీకరణ అవసరం' : 'Confirmation Required',
        isTelugu ? 'దయచేసి సేవ పూర్తి చేసినట్లు బాక్స్ చెక్ చేయండి.' : 'Please confirm you have successfully completed the service.'
      );
      return;
    }

    setIsSubmitting(true);
    completeBooking(bookingId, workDescription.trim(), numAmount, workDescription.trim(), true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-xl hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Booking #{bookingId}
            </span>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              {isTelugu ? 'సేవ పూర్తయినట్లు ధృవీకరించండి' : 'Confirm Vehicle Service Completion'}
            </h3>
          </div>
        </div>

        {/* Booking Details Card */}
        <div className="bg-slate-50 rounded-2xl p-3.5 mb-4 border border-slate-200/80 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-500">{isTelugu ? 'వినియోగదారుడు:' : 'Customer:'}</span>
            <span className="font-bold text-slate-900">{customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">{isTelugu ? 'వాహనం:' : 'Vehicle:'}</span>
            <span className="font-bold text-indigo-700 flex items-center gap-1">
              <Car className="w-3.5 h-3.5" />
              <span>{vehicleDetails || 'Hero Splendor Plus (AP-39-ER-2024)'}</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">{isTelugu ? 'సేవ:' : 'Service:'}</span>
            <span className="font-bold text-primary">{serviceRequested}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-primary" />
              <span>{isTelugu ? 'పూర్తి చేసిన పని వివరాలు (Work Notes)' : 'Work Notes & Parts Replaced'} *</span>
            </label>
            <textarea
              rows={3}
              value={workDescription}
              onChange={(e) => setWorkDescription(e.target.value)}
              placeholder={
                isTelugu
                  ? 'ఉదా: ఇంజిన్ ఆయిల్ ఫిల్టర్ మార్చాము, కార్బ్యురేటర్ ట్యూనింగ్ చేసాము, బ్రేక్ వైర్ సర్వీస్ చేసాము...'
                  : 'e.g. Drained old oil, fitted new OEM oil filter, calibrated front disc brake tension, pressure washed chain...'
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium bg-slate-50/50"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isTelugu ? 'వసూలు చేసిన తుది మొత్తం (Actual Service Amount)' : 'Actual Service Amount (₹)'} *</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold text-sm">₹</span>
              <input
                type="number"
                min="1"
                step="10"
                value={amountCharged}
                onChange={(e) => setAmountCharged(e.target.value)}
                placeholder="450"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-slate-50/50"
                required
              />
            </div>
          </div>

          {/* Mandatory Provider Completion Confirmation Checkbox */}
          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={providerConfirmed}
                onChange={(e) => setProviderConfirmed(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-emerald-600 rounded"
                required
              />
              <span className="text-xs font-bold text-emerald-950 leading-relaxed">
                {isTelugu
                  ? 'నేను ఈ కస్టమర్‌కి వాహన సేవను విజయవంతంగా పూర్తి చేశానని మరియు సరైన బిల్లింగ్ వివరాలను నమోదు చేశానని ధృవీకరిస్తున్నాను.'
                  : 'I confirm that I have successfully completed this vehicle service for this customer with accurate billing.'}
              </span>
            </label>
            <div className="mt-1.5 text-[11px] text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Counts toward customer’s Monthly 10-Service Loyalty Rewards counter.</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
            >
              {isTelugu ? 'రద్దు' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !providerConfirmed}
              className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold shadow-md hover:shadow transition-all flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? (isTelugu ? 'నమోదవుతోంది...' : 'Confirming...') : (isTelugu ? 'సేవను పూర్తయినట్లు నమోదు చేయండి' : 'Confirm & Complete Job')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
