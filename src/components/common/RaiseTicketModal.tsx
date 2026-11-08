'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Headphones, X, CheckCircle2, Send } from 'lucide-react';

interface RaiseTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RaiseTicketModal: React.FC<RaiseTicketModalProps> = ({ isOpen, onClose }) => {
  const { isTelugu } = useLanguage();
  const { showToast } = useMarketplace();

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('listing');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const ticketId = `TCK-${Math.floor(200 + Math.random() * 800)}`;
    showToast(
      'success',
      isTelugu ? `టికెట్ #${ticketId} నమోదయింది!` : `Ticket #${ticketId} Created!`,
      isTelugu 
        ? 'మా సహాయ బృందం త్వరలోనే సమస్యను పరిష్కరిస్తుంది.'
        : 'Our village support team will address your query promptly.'
    );
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-secondary mx-auto" />
            <h3 className="font-bold text-lg text-slate-900">
              {isTelugu ? 'టికెట్ సమర్పించబడింది!' : 'Support Ticket Raised!'}
            </h3>
            <p className="text-xs text-slate-500">
              {isTelugu ? 'మీ సమస్య స్థితిని నోటిఫికేషన్ ద్వారా తెలియజేస్తాము.' : 'You will be notified once our support team reviews your issue.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {isTelugu ? 'సహాయం కోసం టికెట్ రైజ్ చేయండి' : 'Raise a Support Ticket'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isTelugu ? 'ఏదైనా సమస్య లేదా సలహా ఉంటే మాకు తెలపండి.' : 'Get help with listings, verification, or service inquiries.'}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {isTelugu ? 'సమస్య విభాగం' : 'Issue Category'} *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800"
              >
                <option value="listing">{isTelugu ? 'సర్వీస్ / షాప్ లిస్టింగ్ సమస్య' : 'Service or Shop Listing Issue'}</option>
                <option value="verification">{isTelugu ? 'గ్రామ ధృవీకరణ బ్యాడ్జ్' : 'Verification Badge Help'}</option>
                <option value="telugu">{isTelugu ? 'తెలుగు అనువాదంలో సాయం' : 'Telugu Translation Assistance'}</option>
                <option value="technical">{isTelugu ? 'యాప్ సాంకేతిక సమస్య' : 'App or Phone Login Error'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {isTelugu ? 'విషయం / శీర్షిక' : 'Subject'} *
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={isTelugu ? 'ఉదా: మొబైల్ నంబర్ మార్చడం ఎలా?' : 'e.g. How to update contact number'}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {isTelugu ? 'సమస్య పూర్తి వివరాలు' : 'Description'} *
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={isTelugu ? 'మీ సమస్యను క్లుప్తంగా వివరించండి...' : 'Describe what happened in detail...'}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isTelugu ? 'టికెట్ సమర్పించండి' : 'Submit Ticket'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
