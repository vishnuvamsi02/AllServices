'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { SupportCategory } from '@/data/types';
import {
  X,
  MessageSquare,
  Send,
  AlertCircle,
  HelpCircle,
  Wrench,
  ThumbsUp,
  Gift,
  CheckCircle2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SupportFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportFeedbackModal: React.FC<SupportFeedbackModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isTelugu } = useLanguage();
  const { currentUser } = useAuth();
  const { createSupportTicket, showToast } = useMarketplace();
  const router = useRouter();

  const [category, setCategory] = useState<SupportCategory>('complaint');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticket = createSupportTicket({
        customerId: currentUser?.id || 'cust_101',
        customerName: currentUser?.name || 'Ravi Teja',
        customerPhone: currentUser?.phone || '9848111222',
        villageName: currentUser?.villageName || 'Kaza',
        category,
        subject,
        description,
        priority: 'normal',
      });

      setIsSubmitting(false);
      onClose();
      router.push('/support?tab=track');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-xl hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              {isTelugu ? 'ఫిర్యాదు లేదా అభిప్రాయం పంపండి' : 'Quick Feedback & Grievance'}
            </h3>
            <p className="text-xs text-slate-500">
              Direct connection with our village administrative team
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
              Select Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SupportCategory)}
              className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-slate-800 bg-white"
            >
              <option value="complaint">Complaint / Billing Dispute</option>
              <option value="query">General Query & Doubts</option>
              <option value="service_issue">Service-Related Issues</option>
              <option value="suggestion">Suggestions for Improvement</option>
              <option value="rewards_offers">Rewards & Offers Help</option>
              <option value="other">Other Feedback</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
              Subject *
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Short title of your concern..."
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
              Detailed Concern *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              placeholder="Describe your issue or feedback..."
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 resize-none"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 bg-primary hover:bg-primary-hover text-white font-black rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Ticket'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
