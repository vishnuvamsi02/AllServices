'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  UploadCloud,
  FileText,
  Lock,
  User,
  CreditCard,
  Building,
} from 'lucide-react';

export default function VerifyAccountPage() {
  const router = useRouter();
  const { isTelugu } = useLanguage();
  const { currentUser } = useAuth();
  const { showToast } = useMarketplace();

  const [fullName, setFullName] = useState(currentUser?.name || 'Vamsi');
  const [docType, setDocType] = useState('aadhaar');
  const [idNumber, setIdNumber] = useState('');
  const [sachiwalayam, setSachiwalayam] = useState('Chinchinaada Grama Sachiwalayam 1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsVerified(true);
      showToast(
        'success',
        isTelugu ? 'పత్రాలు సమర్పించబడ్డాయి' : 'Documents Submitted',
        isTelugu
          ? 'మీ గ్రామ సచివాలయ ధృవీకరణ పత్రాలు విజయవంతంగా అప్‌లోడ్ అయ్యాయి. అడ్మిన్ ఆమోదం కోసం వేచి ఉండండి.'
          : 'KYC documents uploaded successfully. Awaiting Village Admin approval.'
      );
    }, 1000);
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
          {isTelugu ? 'ఖాతా ధృవీకరణ' : 'Verify Your Account'}
        </h1>
        <div className="w-9" />
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        {/* Verification Status Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-teal-50 to-emerald-50/80 p-5 border border-teal-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black uppercase text-teal-800">
                {isTelugu ? 'గ్రామ సచివాలయ గుర్తింపు' : 'Village Admin Trust Badge'}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {isVerified ? (isTelugu ? 'పరిశీలనలో ఉంది' : 'In Review') : (isTelugu ? 'ధృవీకరించలేదు' : 'Not Verified')}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              {isTelugu
                ? 'ధృవీకరించిన ప్రొఫైల్స్ ప్రజలకు ఎక్కువ నమ్మకాన్ని అందిస్తాయి.'
                : 'Verified service providers and sellers receive 3x more local inquiries.'}
            </p>
          </div>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'ఆధార్ ప్రకారం పూర్తి పేరు' : 'Full Name (as per Govt ID)'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'ధృవీకరణ పత్రం రకం' : 'Identity Document Type'}
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900 bg-white"
            >
              <option value="aadhaar">{isTelugu ? 'ఆధార్ కార్డు (Aadhaar Card)' : 'Aadhaar Card'}</option>
              <option value="voter">{isTelugu ? 'ఓటరు గుర్తింపు కార్డు (Voter ID)' : 'Voter ID'}</option>
              <option value="sachiwalayam">{isTelugu ? 'గ్రామ సచివాలయ నివాస ధృవీకరణ' : 'Grama Sachiwalayam Certificate'}</option>
              <option value="trade">{isTelugu ? 'వృత్తి / వ్యాపార లైసెన్స్' : 'Trade License / Shop Act'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'కార్డు / పత్రం సంఖ్య' : 'Document ID Number'}
            </label>
            <div className="relative">
              <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="XXXX-XXXX-XXXX"
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'గ్రామ సచివాలయం పేరు' : 'Grama Sachiwalayam Unit'}
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={sachiwalayam}
                onChange={(e) => setSachiwalayam(e.target.value)}
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'పత్రం ముందు & వెనుక భాగాలు' : 'Front & Back Photo Upload'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="border border-dashed border-slate-300 rounded-2xl p-3 text-center bg-slate-50 hover:bg-slate-100 cursor-pointer">
                <UploadCloud className="w-6 h-6 text-primary mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-700 block">Front Side</span>
              </div>
              <div className="border border-dashed border-slate-300 rounded-2xl p-3 text-center bg-slate-50 hover:bg-slate-100 cursor-pointer">
                <UploadCloud className="w-6 h-6 text-primary mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-700 block">Back Side</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 font-medium">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {isTelugu
                ? 'మీ వ్యక్తిగత పత్రాలు సురక్షితంగా ఉంటాయి మరియు కేవలం స్థానిక అడ్మిన్ పరిశీలనకు మాత్రమే ఉపయోగించబడతాయి.'
                : 'Your documents are safely encrypted and accessible only to your assigned Village Admin.'}
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-extrabold text-sm rounded-2xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <span>{isTelugu ? 'సమర్పిస్తోంది...' : 'Submitting...'}</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>{isTelugu ? 'ధృవీకరణ కోసం సమర్పించండి' : 'Submit for Verification'}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
