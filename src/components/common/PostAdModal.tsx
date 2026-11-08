'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/context/LocationContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Megaphone, X, CheckCircle2, Phone, Sparkles, MapPin } from 'lucide-react';

interface PostAdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostAdModal: React.FC<PostAdModalProps> = ({ isOpen, onClose }) => {
  const { isTelugu } = useLanguage();
  const { villages } = useLocation();
  const { showToast } = useMarketplace();

  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [villageId, setVillageId] = useState('v_chinchinaada');
  const [tagline, setTagline] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast(
      'success',
      isTelugu ? 'ప్రకటన అభ్యర్థన అందింది!' : 'Ad Request Submitted!',
      isTelugu 
        ? `${businessName} ప్రకటన గ్రామ అడ్మిన్ పరిశీలన అనంతరం లైవ్ చేయబడుతుంది.`
        : `Your advertisement banner for ${businessName} has been submitted for verification.`
    );
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
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
              {isTelugu ? 'ధన్యవాదాలు! ప్రకటన నమోదైంది' : 'Ad Submitted Successfully!'}
            </h3>
            <p className="text-xs text-slate-500">
              {isTelugu ? 'మా గ్రామ ప్రతినిధి త్వరలోనే మీతో మాట్లాడుతారు.' : 'Our local village manager will assist in activating your banner.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {isTelugu ? 'మీ వ్యాపార ప్రకటనను పోస్ట్ చేయండి' : 'Market Your Business / Post Ad'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isTelugu ? 'వేలాది మంది గ్రామ ప్రజలకు మీ దుకాణం వివరాలు చేరవేయండి.' : 'Display your banner ad to thousands of local customers.'}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {isTelugu ? 'దుకాణం / వ్యాపారం పేరు' : 'Business / Shop Name'} *
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder={isTelugu ? 'ఉదా: శ్రీ లక్ష్మి ప్యాకర్స్ & మూవర్స్' : 'e.g. Lakshmi Packers & Movers'}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {isTelugu ? 'సంప్రదించాల్సిన ఫోన్ నంబర్' : 'Contact Mobile'} *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9848012345"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {isTelugu ? 'గ్రామం / ప్రాంతం' : 'Village Area'} *
                </label>
                <select
                  value={villageId}
                  onChange={(e) => setVillageId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800"
                >
                  {villages.map((v) => (
                    <option key={v.id} value={v.id}>
                      {isTelugu ? v.teluguName : v.name} ({v.district})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {isTelugu ? 'ప్రకటన ముఖ్యాంశం / ఆఫర్' : 'Ad Headline / Special Offer'} *
              </label>
              <textarea
                rows={3}
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder={isTelugu ? 'ఉదా: ఆంధ్రప్రదేశ్ అంతటా సురక్షిత రవాణా సేవలు...' : 'e.g. 24x7 Reliable household moving and tractor services...'}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Megaphone className="w-4 h-4 text-amber-300" />
              <span>{isTelugu ? 'ప్రకటనను సమర్పించండి' : 'Submit Ad for Review'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
