'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CheckCircle2, X, Receipt, Wrench, IndianRupee } from 'lucide-react';

interface CompleteJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  customerName: string;
  serviceRequested: string;
}

export const CompleteJobModal: React.FC<CompleteJobModalProps> = ({
  isOpen,
  onClose,
  bookingId,
  customerName,
  serviceRequested,
}) => {
  const { isTelugu } = useLanguage();
  const { completeBooking, showToast } = useMarketplace();

  const [workDescription, setWorkDescription] = useState('');
  const [amountCharged, setAmountCharged] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!workDescription.trim()) {
      showToast(
        'error',
        isTelugu ? 'పని వివరాలు అవసరం' : 'Description Required',
        isTelugu ? 'దయచేసి పూర్తి చేసిన పని వివరాలను నమోదు చేయండి.' : 'Please describe the work performed.'
      );
      return;
    }

    const numAmount = parseFloat(amountCharged);
    if (isNaN(numAmount) || numAmount < 0) {
      showToast(
        'error',
        isTelugu ? 'సరైన మొత్తం అవసరం' : 'Valid Amount Required',
        isTelugu ? 'దయచేసి వసూలు చేసిన తుది మొత్తాన్ని నమోదు చేయండి.' : 'Please enter the final amount charged.'
      );
      return;
    }

    setIsSubmitting(true);
    completeBooking(bookingId, workDescription.trim(), numAmount);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 600);
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
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {bookingId}
            </span>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              {isTelugu ? 'సేవ పూర్తయినట్లు నమోదు చేయండి' : 'Confirm Service Completion'}
            </h3>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-3.5 mb-5 border border-slate-200/80 text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-500">{isTelugu ? 'వినియోగదారుడు:' : 'Customer:'}</span>
            <span className="font-bold text-slate-900">{customerName}</span>
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
              <span>{isTelugu ? 'పూర్తి చేసిన పని వివరాలు' : 'Description of Work Performed'} *</span>
            </label>
            <textarea
              rows={3}
              value={workDescription}
              onChange={(e) => setWorkDescription(e.target.value)}
              placeholder={
                isTelugu
                  ? 'ఉదా: బోర్ మోటార్ స్టార్టర్ కాయిల్ మార్చాము, ఫ్యాన్ బేరింగ్లు సర్వీస్ చేసాము...'
                  : 'e.g. Replaced capacitor, cleaned contacts, calibrated motor starter panel...'
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium bg-slate-50/50"
              required
            />
            <p className="text-[11px] text-slate-500 mt-1">
              {isTelugu
                ? 'ఈ వివరాలు వినియోగదారునికి మరియు వారి రసీదులో కనిపిస్తాయి.'
                : 'This description will be visible to the customer on their completed booking receipt.'}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isTelugu ? 'వసూలు చేసిన తుది మొత్తం (₹)' : 'Final Amount Charged (₹)'} *</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold text-sm">₹</span>
              <input
                type="number"
                min="0"
                step="10"
                value={amountCharged}
                onChange={(e) => setAmountCharged(e.target.value)}
                placeholder="450"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-slate-50/50"
                required
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {isTelugu
                ? 'సేవ పూర్తయిన తర్వాత మాత్రమే వినియోగదారుడు రేటింగ్ మరియు సమీక్ష ఇవ్వగలరు.'
                : 'Customer review and rating will only be unlocked after you submit completion.'}
            </p>
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
              disabled={isSubmitting}
              className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:shadow transition-all flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? (isTelugu ? 'సమర్పిస్తోంది...' : 'Submitting...') : (isTelugu ? 'పూర్తయినట్లు నమోదు చేయండి' : 'Confirm & Complete')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
