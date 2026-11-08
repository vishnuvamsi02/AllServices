'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const { t, isTelugu } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-surface-bg min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isTelugu ? 'మమ్మల్ని సంప్రదించండి' : 'Contact Us'}
          </h1>
          <p className="text-base text-slate-600 mt-2">
            {isTelugu 
              ? 'గ్రామసేవ గురించి ఏదైనా సహాయం లేదా సలహాలు ఉంటే మా గ్రామ ప్రతినిధులను సంప్రదించండి.' 
              : 'Have a question, feedback, or need support? Reach out to our village support team.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
            <h2 className="text-xl font-extrabold text-slate-900">
              {isTelugu ? 'కార్యాలయ వివరాలు' : 'Help Desk & Head Office'}
            </h2>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">Toll-Free Village Helpline:</span>
                  <a href="tel:18004257382" className="text-primary font-bold hover:underline">1800-425-SEVA (7382)</a>
                  <p className="text-xs text-slate-400">Monday - Saturday (8:00 AM - 8:00 PM)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">Email Support:</span>
                  <span>support@sevasetu.in</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">Andhra Pradesh Office:</span>
                  <span>Panchayat Raj & Rural Tech Center, Mangalagiri / Amaravati, Guntur District, AP - 522503</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-secondary mx-auto" />
                <h3 className="font-bold text-lg text-slate-900">
                  {isTelugu ? 'సందేశం పంపబడింది!' : 'Message Received!'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isTelugu ? 'మా సహాయ బృందం త్వరలోనే మిమ్మల్ని సంప్రదిస్తుంది.' : 'Our rural support desk will reach out promptly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {isTelugu ? 'మీ పేరు' : 'Your Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {isTelugu ? 'మొబైల్ నంబర్' : 'Mobile Number'} *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9848012345"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {isTelugu ? 'సందేశం / ప్రశ్న' : 'Message'} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-hover flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isTelugu ? 'సందేశం పంపండి' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
