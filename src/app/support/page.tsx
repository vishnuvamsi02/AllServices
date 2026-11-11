'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { SupportCategory, TicketPriority, SupportTicket } from '@/data/types';
import {
  HelpCircle,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Clock,
  Send,
  Paperclip,
  X,
  FileText,
  Search,
  Filter,
  ShieldCheck,
  User,
  Phone,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Gift,
  Wrench,
  ThumbsUp,
} from 'lucide-react';
import Link from 'next/link';

export default function SupportFeedbackPage() {
  const { isTelugu } = useLanguage();
  const { currentUser, isLoggedIn } = useAuth();
  const { supportTickets, createSupportTicket, enquiries, showToast } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [category, setCategory] = useState<SupportCategory>('complaint');
  const [priority, setPriority] = useState<TicketPriority>('normal');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [relatedBookingId, setRelatedBookingId] = useState('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [attachedFileSize, setAttachedFileSize] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Ravi Teja');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '9848111222');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<SupportTicket | null>(null);

  const categories = [
    {
      id: 'complaint' as SupportCategory,
      titleEn: 'Complaints',
      titleTe: 'ఫిర్యాదులు (Complaints)',
      descEn: 'Billing dispute, service quality issue, or workshop conduct concerns',
      descTe: 'బిల్లు తేడాలు, సర్వీస్ నాణ్యత లోపాలు లేదా మెకానిక్ ప్రవర్తన సమస్యలు',
      icon: AlertCircle,
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    },
    {
      id: 'query' as SupportCategory,
      titleEn: 'General Queries & Doubts',
      titleTe: 'సాధారణ ప్రశ్నలు & సందేహాలు',
      descEn: 'Service coverage, doorstep eligibility, booking assistance',
      descTe: 'సేవా పరిధి, డోర్‌స్టెప్ సదుపాయం లేదా బుకింగ్ సంబంధిత సందేహాలు',
      icon: HelpCircle,
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    },
    {
      id: 'service_issue' as SupportCategory,
      titleEn: 'Service-Related Issues',
      titleTe: 'వాహన సేవా సమస్యలు',
      descEn: 'Unresolved vehicle fault after service, spare parts inquiry',
      descTe: 'సర్వీస్ తర్వాత వాహనంలో వచ్చిన సమస్య లేదా స్పేర్ పార్ట్ విచారణ',
      icon: Wrench,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    {
      id: 'suggestion' as SupportCategory,
      titleEn: 'Suggestions for Improvement',
      titleTe: 'మెరుగుపరచడానికి సలహాలు',
      descEn: 'New service categories, app features, village garage requests',
      descTe: 'కొత్త సేవల ఆలోచనలు, యాప్ ఫీచర్లు లేదా గ్రామ గ్యారేజ్ సిఫార్సులు',
      icon: ThumbsUp,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      id: 'rewards_offers' as SupportCategory,
      titleEn: 'Rewards & Offers',
      titleTe: 'రివార్డులు & ఆఫర్లు',
      descEn: 'Monthly loyalty milestone help, voucher redemption support',
      descTe: '10 సేవల లాయల్టీ రివార్డులు లేదా వోచర్ రిడెంప్షన్ సహాయం',
      icon: Gift,
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    },
    {
      id: 'other' as SupportCategory,
      titleEn: 'Other Feedback',
      titleTe: 'ఇతర అభిప్రాయాలు',
      descEn: 'General comments, appreciation, or other inquiries',
      descTe: 'సాధారణ వ్యాఖ్యలు, ప్రశంసలు లేదా ఇతర సమాచారం',
      icon: MessageSquare,
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    },
  ];

  const handleSimulateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachedFileName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setAttachedFileSize(`${sizeMb} MB`);
      showToast('info', 'File Attached', `${file.name} (${sizeMb} MB) ready for upload.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      showToast('error', 'Incomplete Form', 'Please fill in subject and description.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const selectedCatObj = categories.find((c) => c.id === category);
      const newTicket = createSupportTicket({
        customerId: currentUser?.id || 'cust_101',
        customerName,
        customerPhone,
        villageName: currentUser?.villageName || 'Kaza',
        category,
        categoryLabel: selectedCatObj?.titleEn || 'Support',
        subject,
        description,
        priority,
        relatedBookingId: relatedBookingId || undefined,
        attachmentName: attachedFileName || undefined,
        attachmentSize: attachedFileSize || undefined,
      });

      setSubmittedTicket(newTicket);
      setIsSubmitting(false);
      setSubject('');
      setDescription('');
      setAttachedFileName(null);
      setAttachedFileSize(null);
    }, 600);
  };

  // Filtered tickets list for tracking
  const myCustomerId = currentUser?.id || 'cust_101';
  const myTickets = supportTickets.filter((t) => t.customerId === myCustomerId || !isLoggedIn);

  const filteredTickets = myTickets.filter((ticket) => {
    if (filterCategory !== 'all' && ticket.category !== filterCategory) return false;
    if (filterStatus !== 'all' && ticket.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSub = ticket.subject.toLowerCase().includes(q);
      const matchCode = ticket.ticketCode.toLowerCase().includes(q);
      const matchDesc = ticket.description.toLowerCase().includes(q);
      return matchSub || matchCode || matchDesc;
    }
    return true;
  });

  const getStatusBadge = (status: SupportTicket['status']) => {
    switch (status) {
      case 'submitted':
      case 'open':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
            <Clock className="w-3 h-3 text-blue-600" />
            <span>{isTelugu ? 'నమోదైంది (పరిశీలనలో ఉంది)' : 'Submitted • Under Review'}</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1 animate-pulse">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>{isTelugu ? 'అడ్మిన్ పరిశీలిస్తున్నారు' : 'Admin Investigating'}</span>
          </span>
        );
      case 'resolved':
      case 'closed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{isTelugu ? 'పరిష్కరించబడింది' : 'Resolved'}</span>
          </span>
        );
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="bg-surface-bg pb-16 pt-4 sm:pt-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-primary to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-card mb-6 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-white inline-flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{isTelugu ? 'కస్టమర్ కేర్ & గ్రీవెన్స్ పోర్టల్' : 'Customer Support & Grievance Redressal'}</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400 text-slate-950">
                  {isTelugu ? 'శీఘ్ర ప్రతిస్పందన' : 'Direct Village Admin Action'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                {isTelugu ? 'సహాయ కేంద్రం & అభిప్రాయాలు' : 'Customer Support, Complaints & Feedback'}
              </h1>

              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-2xl leading-relaxed">
                {isTelugu
                  ? 'మీ సందేహాలు, ఫిర్యాదులు, సేవా సమస్యలు లేదా సలహాలను ఇక్కడ సులభంగా పంచుకోండి. మా గ్రామ పరిపాలనా బృందం ప్రతి అంశాన్ని ప్రత్యక్షంగా సమీక్షించి పరిష్కరిస్తుంది.'
                  : 'Share your complaints, queries, vehicle service issues, or suggestions. Every submission is assigned a unique reference ticket and audited directly by the administration team.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
              <a
                href="tel:18004257382"
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>1800-425-SEVA</span>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('submit')}
            className={`flex-1 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'submit'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{isTelugu ? 'కొత్త ఫిర్యాదు / ప్రశ్న నమోదు చేయండి' : 'Submit Feedback / Concern'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('track')}
            className={`flex-1 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'track'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{isTelugu ? 'నా టిక్కెట్లు & పరిష్కారాలు' : 'Track My Tickets'} ({myTickets.length})</span>
          </button>
        </div>

        {/* TAB 1: SUBMIT FEEDBACK & CONCERNS */}
        {activeTab === 'submit' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
            
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {isTelugu ? '1. మీ అంశం ఏ విభాగానికి చెందినదో ఎంచుకోండి' : '1. Select Category of Your Concern'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose the relevant category so your concern is immediately routed to the right specialist.
              </p>
            </div>

            {/* 6 Category Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-sm ring-2 ring-primary/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            Selected
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-black text-slate-900">
                        {isTelugu ? cat.titleTe : cat.titleEn}
                      </h4>

                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {isTelugu ? cat.descTe : cat.descEn}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-5 border-t border-slate-100 pt-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    {isTelugu ? 'మీ పేరు *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    placeholder="e.g. K. Srinivasa Rao"
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    {isTelugu ? 'ఫోన్ నంబర్ *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    placeholder="9848XXXXXX"
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Priority & Optional Booking Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    {isTelugu ? 'ప్రాధాన్యత స్థాయి' : 'Urgency Level'}
                  </label>
                  <div className="flex gap-2">
                    {(['normal', 'high', 'urgent'] as TicketPriority[]).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-black capitalize transition-all border ${
                          priority === p
                            ? p === 'urgent'
                              ? 'bg-rose-600 text-white border-rose-600'
                              : p === 'high'
                              ? 'bg-amber-500 text-white border-amber-500'
                              : 'bg-primary text-white border-primary'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    {isTelugu ? 'లింక్ చేయబడిన బుకింగ్ ID (ఐచ్ఛికం)' : 'Link Related Service Booking (Optional)'}
                  </label>
                  <select
                    value={relatedBookingId}
                    onChange={(e) => setRelatedBookingId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                    <option value="">No specific booking / General concern</option>
                    {enquiries.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.id} • {b.serviceRequested} ({b.targetName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  {isTelugu ? 'విషయం / సంక్షిప్త శీర్షిక *' : 'Subject / Short Summary *'}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder={isTelugu ? 'ఉదా: బైక్ వాష్ పూర్తయిన తర్వాత ఆయిల్ లీక్ అవుతోంది...' : 'e.g., Question about Castrol 4T oil compatibility with Hero Splendor...'}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                    {isTelugu ? 'సమస్య లేదా సందేహం పూర్తి వివరణ *' : 'Detailed Description of Concern / Feedback *'}
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {description.length} characters
                  </span>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  placeholder={isTelugu ? 'దయచేసి మీ సమస్య, జరిగిన తేదీ, స్థానం మరియు మీకు కావలసిన పరిష్కారాన్ని స్పష్టంగా వివరించండి...' : 'Please describe what happened, workshop name, date, and how we can best assist you in resolving this...'}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              {/* File / Screenshot Attachment Uploader */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  {isTelugu ? 'స్క్రీన్‌షాట్ లేదా ఫోటోను జతచేయండి (ఐచ్ఛికం)' : 'Attach Screenshot or Bill Photo (Optional)'}
                </label>

                {!attachedFileName ? (
                  <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-300 hover:border-primary rounded-2xl cursor-pointer bg-slate-50/60 hover:bg-slate-50 transition-colors">
                    <Paperclip className="w-6 h-6 text-slate-400 mb-1" />
                    <span className="text-xs font-bold text-slate-700">
                      {isTelugu ? 'ఫోటో లేదా స్క్రీన్‌షాట్ ఎంచుకోవడానికి ఇక్కడ క్లిక్ చేయండి' : 'Click to select bill photo, vehicle part screenshot, or bill copy'}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">
                      JPG, PNG, PDF up to 10MB
                    </span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleSimulateFileUpload}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{attachedFileName}</span>
                      <span className="text-[10px] text-slate-500 font-normal">({attachedFileSize})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAttachedFileName(null);
                        setAttachedFileSize(null);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                      title="Remove Attachment"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  {isTelugu ? 'ధృవీకరించబడిన టిక్కెట్ ID తక్షణమే కేటాయించబడుతుంది.' : 'A unique tracking ticket will be generated instantly.'}
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3.5 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-transform hover:scale-105 flex items-center gap-2 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? (isTelugu ? 'నమోదవుతోంది...' : 'Submitting...') : (isTelugu ? 'ఫిర్యాదు / అభిప్రాయం సమర్పించండి' : 'Submit Ticket Now')}</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 2: TRACK TICKETS & GRIEVANCE TIMELINES */}
        {activeTab === 'track' && (
          <div className="space-y-4">
            
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ticket code (TKT-...), keyword or issue..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                >
                  <option value="all">All Statuses</option>
                  <option value="submitted">Submitted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                >
                  <option value="all">All Categories</option>
                  <option value="complaint">Complaints</option>
                  <option value="query">Queries</option>
                  <option value="service_issue">Service Issues</option>
                  <option value="suggestion">Suggestions</option>
                  <option value="rewards_offers">Rewards</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Tickets List */}
            {filteredTickets.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-card">
                <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-black text-slate-800">
                  {isTelugu ? 'ఎటువంటి పెండింగ్ ఫిర్యాదులు లేవు' : 'No tickets match this filter'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Have a question or grievance? Click the submit tab to create one.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('submit')}
                  className="mt-4 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Submit a Concern
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTickets.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card space-y-4"
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                          {t.ticketCode}
                        </span>
                        {getStatusBadge(t.status)}
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {t.categoryLabel || t.category}
                        </span>
                        {t.priority === 'urgent' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800">
                            Urgent
                          </span>
                        )}
                      </div>

                      <span className="text-xs text-slate-400 font-medium">
                        {t.createdAt}
                      </span>
                    </div>

                    {/* Subject & Description */}
                    <div>
                      <h3 className="text-base font-black text-slate-900">
                        {t.subject}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {t.description}
                      </p>

                      {t.relatedBookingId && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
                          <Wrench className="w-3.5 h-3.5 text-primary" />
                          <span>Linked Booking: {t.relatedBookingId}</span>
                        </div>
                      )}

                      {t.attachmentName && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 ml-2">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>Attachment: {t.attachmentName}</span>
                        </div>
                      )}
                    </div>

                    {/* Admin Official Response Callout */}
                    {t.adminResponse && (
                      <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1.5">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-1.5 text-emerald-900 font-extrabold uppercase tracking-wide">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span>Official Administrator Resolution Response:</span>
                          </div>
                          {t.resolvedAt && (
                            <span className="text-[11px] text-slate-500 font-medium">
                              Resolved: {t.resolvedAt}
                            </span>
                          )}
                        </div>

                        <p className="text-slate-800 font-medium leading-relaxed">
                          "{t.adminResponse}"
                        </p>

                        <div className="pt-1 text-[11px] text-emerald-800 font-bold">
                          — {t.resolvedBy || 'Village Administration Team'}
                        </div>
                      </div>
                    )}

                    {/* Contact Follow-up row */}
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
                      <span>Customer: {t.customerName} ({t.customerPhone})</span>
                      <span className="text-slate-500 font-medium">
                        Village: {t.villageName || 'Andhra Pradesh'}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>

      {/* SUBMISSION CONFIRMATION POPUP MODAL */}
      {submittedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 text-center relative">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-200 inline-block mb-2">
              Ticket Logged Successfully
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isTelugu ? 'మీ అంశం విజయవంతంగా నమోదైంది!' : 'Your Concern is Registered!'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xs mx-auto">
              Our administration and technical team will review your concern and respond directly.
            </p>

            <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Tracking Ticket Number
              </span>
              <span className="font-mono text-2xl font-black text-primary tracking-wider">
                {submittedTicket.ticketCode}
              </span>
              <span className="text-[11px] text-slate-500 block">
                Category: {submittedTicket.categoryLabel || submittedTicket.category}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setSubmittedTicket(null);
                  setActiveTab('track');
                }}
                className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-black text-xs sm:text-sm rounded-2xl shadow-xs transition-colors"
              >
                {isTelugu ? 'టిక్కెట్ స్థితిని ట్రాక్ చేయండి' : 'Track This Ticket →'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
