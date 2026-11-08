'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Star, X, CheckCircle2, MessageSquare } from 'lucide-react';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetName: string;
  enquiryId: string;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  targetName,
  enquiryId,
}) => {
  const { isTelugu } = useLanguage();
  const { showToast, submitBookingReview } = useMarketplace();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('error', isTelugu ? 'కామెంట్ అవసరం' : 'Comment Required', isTelugu ? 'దయచేసి మీ సమీక్ష వివరాలను నమోదు చేయండి.' : 'Please enter your feedback comments.');
      return;
    }

    const ok = submitBookingReview(enquiryId, rating, comment);
    if (ok) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 1500);
    }
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
              {isTelugu ? 'ధన్యవాదాలు!' : 'Thank you for your review!'}
            </h3>
            <p className="text-xs text-slate-500">
              {isTelugu ? 'మీ అభిప్రాయం ఇతర గ్రామస్తులకు ఎంతో ఉపయోగపడుతుంది.' : 'Your rating helps other villagers choose trusted experts.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                {enquiryId}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {isTelugu ? `${targetName} గారికి సమీక్ష రాయండి` : `Write Review for ${targetName}`}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isTelugu ? 'పని నాణ్యత మరియు ప్రవర్తనపై మీ అనుభవాన్ని తెలియజేయండి.' : 'Share your service experience and rating.'}
              </p>
            </div>

            {/* 5 Stars Picker */}
            <div className="flex items-center justify-center gap-2 py-3 bg-amber-50/70 rounded-2xl border border-amber-200/60">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-400 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating ? 'fill-amber-400 text-amber-500' : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {isTelugu ? 'మీ అభిప్రాయం / కామెంట్' : 'Your Review / Comments'} *
              </label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={isTelugu ? 'ఉదా: సకాలంలో వచ్చి పని బాగా చేశారు...' : 'Describe how the service was performed...'}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl shadow-md transition-all"
            >
              {isTelugu ? 'సమీక్షను సమర్పించండి' : 'Submit Review'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
