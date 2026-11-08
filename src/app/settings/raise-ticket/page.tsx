'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  ArrowLeft,
  Headphones,
  AlertCircle,
  CheckCircle2,
  Clock,
  Send,
  UploadCloud,
  FileText,
} from 'lucide-react';

export default function RaiseTicketPage() {
  const router = useRouter();
  const { isTelugu } = useLanguage();
  const { showToast } = useMarketplace();

  const [category, setCategory] = useState('provider_complaint');
  const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const existingTickets = [
    {
      id: 'TCK-2026-092',
      category: isTelugu ? 'సేవా నిపుణుడి ఫిర్యాదు' : 'Service Issue',
      subject: isTelugu ? 'ఎలక్ట్రీషియన్ రాక ఆలస్యం' : 'Electrician delay inquiry',
      status: 'resolved',
      date: 'Nov 02, 2026',
    },
    {
      id: 'TCK-2026-104',
      category: isTelugu ? 'ఆస్తి సమాచార పరిశీలన' : 'Property Query',
      subject: isTelugu ? 'ప్లాట్ లొకేషన్ వివరాలు' : 'Plot LP Number verification',
      status: 'in_progress',
      date: 'Nov 06, 2026',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(
      'success',
      isTelugu ? 'టికెట్ నమోదు చేయబడింది' : 'Ticket Created',
      isTelugu
        ? 'మీ అభ్యర్థన టికెట్ సృష్టించబడింది. సహాయక బృందం 2 గంటల్లో సంప్రదిస్తుంది.'
        : 'Ticket submitted successfully. Village support desk will contact you within 2 hours.'
    );
    setTimeout(() => router.push('/settings'), 1500);
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
          {isTelugu ? 'సహాయం & మద్దతు టికెట్' : 'Raise a Ticket'}
        </h1>
        <div className="w-9" />
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-5">
        {/* Support Help Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50/80 p-5 border border-emerald-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">
              {isTelugu ? 'గ్రామ సహాయక డెస్క్' : 'Village Citizen Support Desk'}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              {isTelugu ? 'మా సహాయక బృందం మీకు త్వరితగతిన పరిష్కారం అందిస్తుంది' : 'Fast resolution directly supported by your local Village Admin'}
            </p>
          </div>
        </div>

        {/* Create Ticket Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
            {isTelugu ? 'కొత్త టికెట్‌ను సమర్పించండి' : 'Submit a Support Request'}
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'సమస్య విభాగం' : 'Issue Category'}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900 bg-white"
            >
              <option value="provider_complaint">
                {isTelugu ? 'సేవా నిపుణుడిపై ఫిర్యాదు / విచారణ' : 'Service Provider Issue / Complaint'}
              </option>
              <option value="property_dispute">
                {isTelugu ? 'ఆస్తి లిస్టింగ్ వివరాల సందేహం' : 'Property Listing Inquiry / Dispute'}
              </option>
              <option value="account_issue">
                {isTelugu ? 'ఖాతా లేదా మొబైల్ నంబర్ సమస్య' : 'Account or Phone Verification Problem'}
              </option>
              <option value="app_bug">
                {isTelugu ? 'యాప్ సాంకేతిక లోపం / సలహా' : 'App Bug or Feature Suggestion'}
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'ప్రాధాన్యత' : 'Urgency Level'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setUrgency('normal')}
                className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  urgency === 'normal'
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                {isTelugu ? 'సాధారణం (Normal)' : 'Normal Priority'}
              </button>
              <button
                type="button"
                onClick={() => setUrgency('urgent')}
                className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  urgency === 'urgent'
                    ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                {isTelugu ? 'అత్యవసరం (Urgent)' : 'High / Urgent'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'సమస్య విషయం' : 'Subject'}
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={isTelugu ? 'సమస్యను క్లుప్తంగా తెలపండి' : 'Brief summary of the issue'}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'పూర్తి వివరాలు' : 'Detailed Description'}
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={isTelugu ? 'సమస్య గురించి పూర్తి వివరాలు రాయండి...' : 'Please describe the issue in detail...'}
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-medium text-slate-900 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isTelugu ? 'ఫోటో లేదా స్క్రీన్‌షాట్ (ఐచ్ఛికం)' : 'Attachment / Screenshot (Optional)'}
            </label>
            <div className="border border-dashed border-slate-300 rounded-xl p-3 text-center bg-slate-50 hover:bg-slate-100 cursor-pointer">
              <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
              <span className="text-xs font-semibold text-slate-600">
                {isTelugu ? 'చిత్రాన్ని అప్‌లోడ్ చేయండి' : 'Upload proof or photo'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-extrabold text-sm rounded-2xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 mt-2"
          >
            <Send className="w-4 h-4" />
            <span>{isTelugu ? 'టికెట్‌ను నమోదు చేయండి' : 'Submit Ticket'}</span>
          </button>
        </form>

        {/* Past Tickets History */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {isTelugu ? 'గత టికెట్లు' : 'Recent Tickets'}
          </h3>

          <div className="space-y-2.5">
            {existingTickets.map((tck) => (
              <div
                key={tck.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-primary">
                      {tck.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tck.status === 'resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {tck.status === 'resolved'
                        ? isTelugu ? 'పరిష్కరించబడింది' : 'Resolved'
                        : isTelugu ? 'పరిశీలనలో ఉంది' : 'In Progress'}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-800 mt-1">
                    {tck.subject}
                  </h4>
                  <span className="text-[10px] text-slate-400">{tck.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
