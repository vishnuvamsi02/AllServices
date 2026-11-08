'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ShieldCheck, X, CheckCircle2, Upload, FileText } from 'lucide-react';

interface VerifyAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerifyAccountModal: React.FC<VerifyAccountModalProps> = ({ isOpen, onClose }) => {
  const { isTelugu } = useLanguage();
  const { showToast } = useMarketplace();

  const [idNumber, setIdNumber] = useState('');
  const [docType, setDocType] = useState('aadhaar');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast(
      'success',
      isTelugu ? 'ధృవీకరణ పత్రాలు సమర్పించబడ్డాయి!' : 'Verification Documents Submitted!',
      isTelugu 
        ? 'గ్రామ సచివాలయ నిర్వాహకుడు మీ పత్రాలను 24 గంటల్లో పరిశీలించి బ్యాడ్జ్ కేటాయిస్తారు.'
        : 'Village Admin will review your document within 24 hours to award the verified badge.'
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
              {isTelugu ? 'పత్రాలు విజయవంతంగా అందాయి' : 'Documents Received!'}
            </h3>
            <p className="text-xs text-slate-500">
              {isTelugu ? 'ధృవీకరణ పూర్తయిన తర్వాత మీ ప్రొఫైల్‌పై గ్రీన్ బ్యాడ్జ్ కనిపిస్తుంది.' : 'The verified badge will appear on your profile once approved.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {isTelugu ? 'గ్రామ ధృవీకరణ పొందండి' : 'Verify Your Account'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isTelugu ? 'ధృవీకరణ బ్యాడ్జ్ వల్ల కస్టమర్లలో నమ్మకం 3 రెట్లు పెరుగుతుంది.' : 'Get the trusted village verification badge on your profile.'}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {isTelugu ? 'పత్రం రకం' : 'Document Type'} *
              </label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800"
              >
                <option value="aadhaar">{isTelugu ? 'ఆధార్ కార్డు (Aadhaar Card)' : 'Aadhaar Card'}</option>
                <option value="trade">{isTelugu ? 'గ్రామ పంచాయతీ ట్రేడ్ లైసెన్స్' : 'Panchayat Trade License'}</option>
                <option value="voter">{isTelugu ? 'ఓటరు గుర్తింపు కార్డు' : 'Voter ID Card'}</option>
                <option value="passbook">{isTelugu ? 'రైతు పట్టాదారు పాస్ బుక్' : 'Pattadar Passbook'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {isTelugu ? 'పత్రం సంఖ్య / ఐడీ నంబర్' : 'Document / ID Number'} *
              </label>
              <input
                type="text"
                required
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="XXXX-XXXX-XXXX"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="p-4 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50/70 text-center hover:bg-slate-50 transition-colors cursor-pointer">
              <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
              <span className="text-xs font-bold text-slate-700 block">
                {isTelugu ? 'ఫోటో లేదా పత్రం అప్‌లోడ్ చేయండి' : 'Click to Upload Document Photo'}
              </span>
              <span className="text-[10px] text-slate-400">JPG, PNG or PDF up to 5MB</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-secondary hover:bg-secondary-hover text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isTelugu ? 'ధృవీకరణకు సమర్పించండి' : 'Submit for Verification'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
