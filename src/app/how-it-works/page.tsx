'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { ShieldCheck, PhoneCall, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
  const { t, isTelugu } = useLanguage();

  return (
    <div className="bg-surface-bg pb-10 pt-4 sm:pt-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>{isTelugu ? 'వినియోగదారుల మార్గదర్శి' : 'User Guide'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isTelugu ? 'సేవాసేతు వేదికను ఎలా ఉపయోగించాలి?' : 'How SevaSetu Works'}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            {isTelugu 
              ? 'ఆంధ్రప్రదేశ్ గ్రామీణ ప్రజలకు సులభమైన, సురక్షితమైన మరియు ఉచిత సేవల వేదిక.' 
              : 'The simplest, fastest and zero-commission way to find trusted village technicians and shops.'}
          </p>
        </div>

        <HowItWorksSection />

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-card">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-6">
            {isTelugu ? 'తరచుగా అడిగే ప్రశ్నలు (FAQ)' : 'Frequently Asked Questions'}
          </h2>

          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-5">
              <h3 className="font-bold text-base text-slate-900 mb-1.5">
                {isTelugu ? '1. ఈ సేవలకు ఏదైనా ఛార్జీలు చెల్లించాలా?' : '1. Do I need to pay any commission to use SevaSetu?'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isTelugu 
                  ? 'లేదు! గ్రామసేవ పూర్తిగా ఉచితం. మీరు నేరుగా నిపుణుడికి ఫోన్ చేసి మాట్లాడవచ్చు. మధ్యవర్తుల కమిషన్ ఏమీ ఉండదు.' 
                  : 'No! SevaSetu is 100% free for villagers. You contact providers directly via phone or WhatsApp with zero middleman fee.'}
              </p>
            </div>

            <div className="border-b border-slate-100 pb-5">
              <h3 className="font-bold text-base text-slate-900 mb-1.5">
                {isTelugu ? '2. నిపుణులు నమ్మకమైనవారేనా?' : '2. Are the service providers background checked?'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isTelugu 
                  ? 'అవును. స్థానిక గ్రామ సచివాలయ గ్రామ నిర్వాహకులు (Village Admin) వారి ఆధార్ మరియు అనుభవాన్ని పరిశీలించి ధృవీకరిస్తారు.' 
                  : 'Yes. Village Admins review the technician’s local identity and experience before approving their profile badge.'}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-900 mb-1.5">
                {isTelugu ? '3. నేను నిపుణుడిగా ఎలా నమోదు కావాలి?' : '3. How can I register my shop or service?'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isTelugu 
                  ? 'వెబ్‌సైట్ పైన ఉన్న "నమోదు" బటన్ క్లిక్ చేసి, మీ పేరు, మొబైల్ నంబర్ మరియు గ్రామాన్ని ఎంచుకొని 1 నిమిషంలో నమోదు చేసుకోవచ్చు.' 
                  : 'Click on the "Register" button in the header, select Service Provider or Business, and enter your village and mobile number.'}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
            <Link
              href="/services"
              className="px-8 py-3.5 bg-primary text-white font-bold text-sm sm:text-base rounded-2xl shadow-md hover:bg-primary-hover flex items-center gap-2"
            >
              <span>{isTelugu ? 'ఇప్పుడే సేవలను వెతకండి' : 'Start Searching Services'}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
