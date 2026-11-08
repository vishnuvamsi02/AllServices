'use client';

import React, { createContext, useContext, useState } from 'react';
import { Enquiry, ServiceProvider, BusinessListing, PropertyListing } from '@/data/types';
import { MOCK_ENQUIRIES, MOCK_PROVIDERS, MOCK_BUSINESSES, MOCK_PROPERTIES, MOCK_PENDING_APPROVALS } from '@/data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

interface MarketplaceContextType {
  enquiries: Enquiry[];
  providers: ServiceProvider[];
  businesses: BusinessListing[];
  properties: PropertyListing[];
  pendingApprovals: typeof MOCK_PENDING_APPROVALS;
  favorites: {
    providers: string[];
    businesses: string[];
    properties: string[];
  };
  toasts: ToastMessage[];
  addEnquiry: (data: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => string;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => void;
  acceptBooking: (id: string) => void;
  rejectBooking: (id: string) => void;
  startBooking: (id: string) => void;
  completeBooking: (id: string, workDescription: string, amountCharged: number) => void;
  submitBookingReview: (bookingId: string, rating: number, comment: string) => boolean;
  toggleFavorite: (type: 'providers' | 'businesses' | 'properties', id: string) => void;
  approvePendingItem: (id: string) => void;
  rejectPendingItem: (id: string) => void;
  showToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(MOCK_ENQUIRIES);
  const [providers, setProviders] = useState<ServiceProvider[]>(MOCK_PROVIDERS);
  const [businesses, setBusinesses] = useState<BusinessListing[]>(MOCK_BUSINESSES);
  const [properties, setProperties] = useState<PropertyListing[]>(MOCK_PROPERTIES);
  const [pendingApprovals, setPendingApprovals] = useState(MOCK_PENDING_APPROVALS);
  
  const [favorites, setFavorites] = useState<{
    providers: string[];
    businesses: string[];
    properties: string[];
  }>({
    providers: ['p_1'],
    businesses: ['b_1'],
    properties: ['prop_1'],
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addEnquiry = (data: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): string => {
    const newId = `ENQ-${Math.floor(700 + Math.random() * 200)}`;
    const newEnquiry: Enquiry = {
      ...data,
      id: newId,
      status: 'new',
      createdAt: 'Just now',
    };

    setEnquiries((prev) => [newEnquiry, ...prev]);
    showToast(
      'success',
      'Enquiry Sent Successfully / విచారణ పంపబడింది!',
      `Enquiry #${newId} has been sent to ${data.targetName}. They will contact you shortly.`
    );
    return newId;
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    showToast('info', 'Status Updated / స్థితి మార్చబడింది', `Booking #${id} marked as ${status.replace('_', ' ').toUpperCase()}`);
  };

  const acceptBooking = (id: string) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'accepted' } : item))
    );
    showToast('success', 'Booking Accepted / బుకింగ్ ఆమోదించబడింది!', `Booking #${id} has been accepted. Customer has been notified.`);
  };

  const rejectBooking = (id: string) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'rejected' } : item))
    );
    showToast('error', 'Booking Rejected / తిరస్కరించబడింది', `Booking #${id} has been declined.`);
  };

  const startBooking = (id: string) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'in_progress' } : item))
    );
    showToast('info', 'Service In Progress / సేవ ప్రారంభమైంది', `Booking #${id} is now in progress.`);
  };

  const completeBooking = (id: string, workDescription: string, amountCharged: number) => {
    const formattedAmount = `₹${amountCharged.toLocaleString('en-IN')}`;
    const completedAt = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ' at ' +
      new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    setEnquiries((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'completed',
              workDescription,
              amountCharged,
              amount: formattedAmount,
              completedAt,
              reviewSubmitted: false,
            }
          : item
      )
    );
    showToast(
      'success',
      'Service Completed / సేవ పూర్తయింది!',
      `Booking #${id} marked as completed for ${formattedAmount}. Customer can now review your service.`
    );
  };

  const submitBookingReview = (bookingId: string, rating: number, comment: string): boolean => {
    const booking = enquiries.find((e) => e.id === bookingId);
    if (!booking) {
      showToast('error', 'Booking Not Found', 'Could not locate booking details.');
      return false;
    }

    if (booking.status !== 'completed') {
      showToast('error', 'Service Not Completed', 'Reviews can only be submitted after the service provider marks the job as completed.');
      return false;
    }

    if (booking.reviewSubmitted) {
      showToast('info', 'Review Already Submitted', 'You have already submitted a review for this completed booking.');
      return false;
    }

    // Mark review as submitted on the booking
    setEnquiries((prev) =>
      prev.map((item) =>
        item.id === bookingId
          ? {
              ...item,
              reviewSubmitted: true,
              rating,
              reviewComment: comment,
            }
          : item
      )
    );

    // If target is provider, add to provider reviewsList and re-average rating
    if (booking.targetType === 'provider') {
      setProviders((prev) =>
        prev.map((p) => {
          if (p.id === booking.targetId) {
            const newReview = {
              id: `rev_${Date.now()}`,
              author: booking.customerName || 'Verified Village Customer',
              rating,
              date: 'Just now',
              comment,
            };
            const updatedReviews = [newReview, ...p.reviewsList];
            const newCount = p.reviewCount + 1;
            const newRating = Number(((p.rating * p.reviewCount + rating) / newCount).toFixed(1));
            return {
              ...p,
              reviewsList: updatedReviews,
              reviewCount: newCount,
              rating: newRating,
            };
          }
          return p;
        })
      );
    }

    showToast(
      'success',
      'Review Submitted / సమీక్ష సమర్పించబడింది!',
      `Thank you! Your verified rating (${rating}★) has been posted for ${booking.targetName}.`
    );
    return true;
  };

  const toggleFavorite = (type: 'providers' | 'businesses' | 'properties', id: string) => {
    setFavorites((prev) => {
      const currentList = prev[type];
      const exists = currentList.includes(id);
      const updated = exists ? currentList.filter((item) => item !== id) : [...currentList, id];
      
      showToast(
        'info',
        exists ? 'Removed from Favorites' : 'Saved to Favorites',
        exists ? 'Item removed from your favorites list.' : 'Item saved! You can easily access it from your dashboard.'
      );

      return {
        ...prev,
        [type]: updated,
      };
    });
  };

  const approvePendingItem = (id: string) => {
    const item = pendingApprovals.find((p) => p.id === id);
    if (!item) return;

    setPendingApprovals((prev) => prev.filter((p) => p.id !== id));
    showToast(
      'success',
      'Application Approved / ఆమోదించబడింది!',
      `${item.name} is now verified and live in ${item.villageName} directory.`
    );
  };

  const rejectPendingItem = (id: string) => {
    const item = pendingApprovals.find((p) => p.id === id);
    if (!item) return;

    setPendingApprovals((prev) => prev.filter((p) => p.id !== id));
    showToast(
      'error',
      'Application Rejected / తిరస్కరించబడింది',
      `Application for ${item.name} has been rejected.`
    );
  };

  return (
    <MarketplaceContext.Provider
      value={{
        enquiries,
        providers,
        businesses,
        properties,
        pendingApprovals,
        favorites,
        toasts,
        addEnquiry,
        updateEnquiryStatus,
        acceptBooking,
        rejectBooking,
        startBooking,
        completeBooking,
        submitBookingReview,
        toggleFavorite,
        approvePendingItem,
        rejectPendingItem,
        showToast,
        removeToast,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
