'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Enquiry,
  ServiceProvider,
  BusinessListing,
  PropertyListing,
  CustomerVehicle,
  ServiceCompletionRecord,
  RewardDefinition,
  RewardClaim,
  RewardAuditLog,
  RewardSystemConfig,
  AppNotification,
} from '@/data/types';
import {
  MOCK_ENQUIRIES,
  MOCK_PROVIDERS,
  MOCK_BUSINESSES,
  MOCK_PROPERTIES,
  MOCK_PENDING_APPROVALS,
  MOCK_CUSTOMER_VEHICLES,
  MOCK_REWARD_DEFINITIONS,
  MOCK_REWARD_CONFIG,
  MOCK_SERVICE_COMPLETIONS,
  MOCK_REWARD_CLAIMS,
  MOCK_REWARD_AUDIT_LOGS,
  MOCK_NOTIFICATIONS,
} from '@/data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

export interface MonthlyProgressResult {
  month: number;
  year: number;
  monthName: string;
  eligibleServiceCount: number;
  requiredCount: number;
  progressPercent: number;
  remainingCount: number;
  rewardUnlocked: boolean;
  claimed: boolean;
  activeClaim?: RewardClaim;
  completions: ServiceCompletionRecord[];
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

  // Vehicles
  vehicles: CustomerVehicle[];
  activeVehicle: CustomerVehicle | null;
  setActiveVehicleId: (id: string) => void;
  addVehicle: (vehicle: Omit<CustomerVehicle, 'id'>) => void;
  removeVehicle: (id: string) => void;

  // Monthly Rewards & Completions
  rewardDefinitions: RewardDefinition[];
  rewardConfig: RewardSystemConfig;
  rewardClaims: RewardClaim[];
  serviceCompletions: ServiceCompletionRecord[];
  rewardAuditLogs: RewardAuditLog[];
  notifications: AppNotification[];

  getMonthlyRewardProgress: (customerId: string, month?: number, year?: number) => MonthlyProgressResult;
  claimMonthlyReward: (customerId: string, rewardId: string) => { success: boolean; claimId?: string; error?: string };
  adminApproveRewardClaim: (claimId: string, adminId?: string, adminName?: string) => void;
  adminRejectRewardClaim: (claimId: string, reason: string, adminId?: string, adminName?: string) => void;
  markRewardRedeemed: (claimId: string, fulfilledBy?: string) => void;
  updateRewardConfig: (newConfig: Partial<RewardSystemConfig>, actorId?: string, actorName?: string) => void;
  updateRewardDefinition: (rewardId: string, updates: Partial<RewardDefinition>) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (userId: string) => void;

  // Bookings & Lifecycle
  addEnquiry: (data: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => string;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => void;
  acceptBooking: (id: string) => void;
  rejectBooking: (id: string) => void;
  startBooking: (id: string) => void;
  completeBooking: (
    id: string,
    workDescription: string,
    amountCharged: number,
    completionNotes?: string,
    providerConfirmation?: boolean
  ) => void;
  submitBookingReview: (bookingId: string, rating: number, comment: string) => boolean;
  toggleFavorite: (type: 'providers' | 'businesses' | 'properties', id: string) => void;
  approvePendingItem: (id: string) => void;
  rejectPendingItem: (id: string) => void;
  showToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(MOCK_ENQUIRIES);
  const [providers, setProviders] = useState<ServiceProvider[]>(MOCK_PROVIDERS);
  const [businesses, setBusinesses] = useState<BusinessListing[]>(MOCK_BUSINESSES);
  const [properties, setProperties] = useState<PropertyListing[]>(MOCK_PROPERTIES);
  const [pendingApprovals, setPendingApprovals] = useState(MOCK_PENDING_APPROVALS);

  // Vehicles
  const [vehicles, setVehicles] = useState<CustomerVehicle[]>(MOCK_CUSTOMER_VEHICLES);
  const [activeVehicleId, setActiveVehicleIdState] = useState<string>(MOCK_CUSTOMER_VEHICLES[0]?.id || 'veh_splendor');

  // Rewards System
  const [rewardDefinitions, setRewardDefinitions] = useState<RewardDefinition[]>(MOCK_REWARD_DEFINITIONS);
  const [rewardConfig, setRewardConfig] = useState<RewardSystemConfig>(MOCK_REWARD_CONFIG);
  const [serviceCompletions, setServiceCompletions] = useState<ServiceCompletionRecord[]>(MOCK_SERVICE_COMPLETIONS);
  const [rewardClaims, setRewardClaims] = useState<RewardClaim[]>(MOCK_REWARD_CLAIMS);
  const [rewardAuditLogs, setRewardAuditLogs] = useState<RewardAuditLog[]>(MOCK_REWARD_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);

  const [favorites, setFavorites] = useState<{
    providers: string[];
    businesses: string[];
    properties: string[];
  }>({
    providers: ['p_1'],
    businesses: ['b_godavari_auto_spares'],
    properties: ['prop_workshop_01'],
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

  // Vehicles Management
  const activeVehicle = vehicles.find((v) => v.id === activeVehicleId) || vehicles[0] || null;

  const setActiveVehicleId = (id: string) => {
    setActiveVehicleIdState(id);
    setVehicles((prev) => prev.map((v) => ({ ...v, isDefault: v.id === id })));
  };

  const addVehicle = (vehicleData: Omit<CustomerVehicle, 'id'>) => {
    const newId = `veh_${Date.now()}`;
    const newVehicle: CustomerVehicle = { ...vehicleData, id: newId };
    setVehicles((prev) => [newVehicle, ...prev]);
    setActiveVehicleIdState(newId);
    showToast('success', 'Vehicle Added / వాహనం జోడించబడింది', `${newVehicle.make} ${newVehicle.model} (${newVehicle.regNumber}) added.`);
  };

  const removeVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    showToast('info', 'Vehicle Removed', 'Vehicle profile deleted.');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = (userId: string) => {
    setNotifications((prev) => prev.map((n) => (n.userId === userId ? { ...n, read: true } : n)));
  };

  // Server-side source of truth for Monthly Reward Progress
  const getMonthlyRewardProgress = (
    customerId: string,
    customMonth?: number,
    customYear?: number
  ): MonthlyProgressResult => {
    const targetMonth = customMonth || 11; // Default to Nov 2026 for benchmark
    const targetYear = customYear || 2026;

    // Strict filter: only unique completed services where provider confirmed & actual amount > 0
    const matchingCompletions = serviceCompletions.filter(
      (c) =>
        c.customerId === customerId &&
        c.month === targetMonth &&
        c.year === targetYear &&
        c.providerConfirmation === true &&
        c.actualAmount > 0 &&
        c.status === 'verified'
    );

    // Deduplicate by bookingId strictly
    const uniqueBookingsMap = new Map<string, ServiceCompletionRecord>();
    matchingCompletions.forEach((c) => {
      if (!uniqueBookingsMap.has(c.bookingId)) {
        uniqueBookingsMap.set(c.bookingId, c);
      }
    });

    const eligibleCount = uniqueBookingsMap.size;
    const required = rewardConfig.requiredCompletedServices || 10;
    const progressPercent = Math.min(100, Math.round((eligibleCount / required) * 100));
    const remainingCount = Math.max(0, required - eligibleCount);
    const rewardUnlocked = eligibleCount >= required;

    // Check if already claimed for this month
    const activeClaim = rewardClaims.find(
      (c) => c.customerId === customerId && c.month === targetMonth && c.year === targetYear
    );
    const claimed = Boolean(activeClaim && activeClaim.status !== 'rejected');

    return {
      month: targetMonth,
      year: targetYear,
      monthName: MONTH_NAMES[targetMonth - 1] || 'Month',
      eligibleServiceCount: eligibleCount,
      requiredCount: required,
      progressPercent,
      remainingCount,
      rewardUnlocked,
      claimed,
      activeClaim,
      completions: Array.from(uniqueBookingsMap.values()),
    };
  };

  // Customer Claims 1 of 3 Rewards
  const claimMonthlyReward = (customerId: string, rewardId: string): { success: boolean; claimId?: string; error?: string } => {
    const progress = getMonthlyRewardProgress(customerId);

    if (!progress.rewardUnlocked) {
      showToast('error', 'Eligibility Not Met', `You need 10 completed services this month to unlock a reward. Current: ${progress.eligibleServiceCount}/10.`);
      return { success: false, error: 'Ineligible' };
    }

    if (progress.claimed) {
      showToast('info', 'Reward Already Claimed', `You have already claimed your reward for ${progress.monthName} ${progress.year} (Claim ID: ${progress.activeClaim?.uniqueClaimId}).`);
      return { success: false, error: 'Already claimed' };
    }

    const rewardDef = rewardDefinitions.find((r) => r.id === rewardId);
    if (!rewardDef || !rewardDef.active) {
      showToast('error', 'Reward Unavailable', 'Selected reward is currently out of stock or inactive.');
      return { success: false, error: 'Invalid reward' };
    }

    const claimCounter = rewardClaims.length + 1;
    const uniqueClaimId = `CLM-${progress.year}${String(progress.month).padStart(2, '0')}-${String(claimCounter).padStart(3, '0')}`;
    const totalAmount = progress.completions.reduce((acc, c) => acc + c.actualAmount, 0);
    const contributingIds = progress.completions.map((c) => c.bookingId);

    const newClaim: RewardClaim = {
      id: `claim_${Date.now()}`,
      uniqueClaimId,
      customerId,
      customerName: 'K. Srinivasa Rao (Ravi Teja)',
      customerPhone: '9848111222',
      month: progress.month,
      year: progress.year,
      rewardId: rewardDef.id,
      rewardName: rewardDef.name,
      status: rewardConfig.approvalRequired ? 'pending_admin_approval' : 'approved',
      requestedAt: `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
      contributingBookingsCount: progress.eligibleServiceCount,
      totalServiceAmount: totalAmount,
      contributingBookingIds: contributingIds,
    };

    setRewardClaims((prev) => [newClaim, ...prev]);

    // Audit Log
    const audit: RewardAuditLog = {
      id: `aud_${Date.now()}`,
      actorId: customerId,
      actorName: 'Ravi Teja (Customer)',
      actorRole: 'customer',
      action: 'CLAIM_SUBMITTED',
      entityId: uniqueClaimId,
      newStatus: newClaim.status,
      notes: `Claim submitted for ${rewardDef.name}. 10/10 services verified. Total services value: ₹${totalAmount.toLocaleString('en-IN')}`,
      timestamp: newClaim.requestedAt,
    };
    setRewardAuditLogs((prev) => [audit, ...prev]);

    // Admin Notification
    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: 'v_admin_kaza',
      userRole: 'village_admin',
      title: '🎁 New Reward Claim Requires Approval',
      message: `Ravi Teja submitted claim ${uniqueClaimId} for ${rewardDef.name} with 10 completed bookings (₹${totalAmount.toLocaleString('en-IN')}).`,
      type: 'reward',
      timestamp: 'Just now',
      read: false,
      actionUrl: '/dashboard/village-admin?tab=rewards',
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast(
      'success',
      '🎉 Reward Claim Submitted / రివార్డ్ క్లెయిమ్ విజయవంతం!',
      `Claim #${uniqueClaimId} for "${rewardDef.name}" submitted! Status: Pending Admin Approval.`
    );

    return { success: true, claimId: uniqueClaimId };
  };

  // Admin Approves Claim
  const adminApproveRewardClaim = (claimId: string, adminId = 'v_admin_kaza', adminName = 'Village Admin') => {
    const code = `RW-${Math.floor(10000 + Math.random() * 90000)}`;
    const nowStr = `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    let targetClaim: RewardClaim | undefined;
    setRewardClaims((prev) =>
      prev.map((c) => {
        if (c.id === claimId || c.uniqueClaimId === claimId) {
          targetClaim = {
            ...c,
            status: 'approved',
            approvedBy: adminName,
            approvedAt: nowStr,
            redemptionCode: code,
          };
          return targetClaim;
        }
        return c;
      })
    );

    if (targetClaim) {
      // Audit log
      const audit: RewardAuditLog = {
        id: `aud_${Date.now()}`,
        actorId: adminId,
        actorName: adminName,
        actorRole: 'admin',
        action: 'APPROVE_CLAIM',
        entityId: targetClaim.uniqueClaimId,
        previousStatus: 'pending_admin_approval',
        newStatus: 'approved',
        notes: `Approved by ${adminName}. Generated voucher code ${code}.`,
        timestamp: nowStr,
      };
      setRewardAuditLogs((prev) => [audit, ...prev]);

      // Notify customer
      const notif: AppNotification = {
        id: `notif_${Date.now()}`,
        userId: targetClaim.customerId,
        userRole: 'customer',
        title: '✅ Monthly Reward Approved!',
        message: `Your reward "${targetClaim.rewardName}" is approved! Use Voucher Code: ${code} at any partner workshop.`,
        type: 'reward',
        timestamp: 'Just now',
        read: false,
        actionUrl: '/rewards',
      };
      setNotifications((prev) => [notif, ...prev]);

      showToast('success', 'Claim Approved / రివార్డ్ ఆమోదించబడింది', `Claim ${targetClaim.uniqueClaimId} approved. Voucher code: ${code}`);
    }
  };

  // Admin Rejects Claim
  const adminRejectRewardClaim = (claimId: string, reason: string, adminId = 'v_admin_kaza', adminName = 'Village Admin') => {
    const nowStr = `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

    let targetClaim: RewardClaim | undefined;
    setRewardClaims((prev) =>
      prev.map((c) => {
        if (c.id === claimId || c.uniqueClaimId === claimId) {
          targetClaim = {
            ...c,
            status: 'rejected',
            approvedBy: adminName,
            approvedAt: nowStr,
            rejectedReason: reason,
          };
          return targetClaim;
        }
        return c;
      })
    );

    if (targetClaim) {
      const audit: RewardAuditLog = {
        id: `aud_${Date.now()}`,
        actorId: adminId,
        actorName: adminName,
        actorRole: 'admin',
        action: 'REJECT_CLAIM',
        entityId: targetClaim.uniqueClaimId,
        previousStatus: 'pending_admin_approval',
        newStatus: 'rejected',
        notes: `Rejected with reason: "${reason}" by ${adminName}`,
        timestamp: nowStr,
      };
      setRewardAuditLogs((prev) => [audit, ...prev]);

      const notif: AppNotification = {
        id: `notif_${Date.now()}`,
        userId: targetClaim.customerId,
        userRole: 'customer',
        title: '❌ Reward Claim Rejected',
        message: `Your claim ${targetClaim.uniqueClaimId} was rejected. Reason: ${reason}`,
        type: 'reward',
        timestamp: 'Just now',
        read: false,
        actionUrl: '/rewards',
      };
      setNotifications((prev) => [notif, ...prev]);

      showToast('error', 'Claim Rejected', `Claim ${targetClaim.uniqueClaimId} has been rejected.`);
    }
  };

  // Fulfilment: Mark Reward as Redeemed
  const markRewardRedeemed = (claimId: string, fulfilledBy = 'Partner Auto Workshop') => {
    const nowStr = `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    setRewardClaims((prev) =>
      prev.map((c) =>
        c.id === claimId || c.uniqueClaimId === claimId
          ? {
              ...c,
              status: 'redeemed',
              redeemedAt: nowStr,
              redeemedBy: fulfilledBy,
            }
          : c
      )
    );

    const audit: RewardAuditLog = {
      id: `aud_${Date.now()}`,
      actorId: 'system',
      actorName: fulfilledBy,
      actorRole: 'provider',
      action: 'FULFILL_REWARD',
      entityId: claimId,
      previousStatus: 'approved',
      newStatus: 'redeemed',
      notes: `Voucher redeemed and service fulfilled by ${fulfilledBy}.`,
      timestamp: nowStr,
    };
    setRewardAuditLogs((prev) => [audit, ...prev]);

    showToast('success', 'Reward Redeemed / రివార్డ్ పూర్తయింది', `Claim marked as successfully redeemed by ${fulfilledBy}.`);
  };

  // Super Admin updates config
  const updateRewardConfig = (newConfig: Partial<RewardSystemConfig>, actorId = 'super_admin_ap', actorName = 'Super Admin') => {
    setRewardConfig((prev) => ({ ...prev, ...newConfig }));
    const audit: RewardAuditLog = {
      id: `aud_${Date.now()}`,
      actorId,
      actorName,
      actorRole: 'super_admin',
      action: 'UPDATE_CONFIG',
      entityId: 'SYSTEM_CONFIG',
      notes: `Updated required service threshold to ${newConfig.requiredCompletedServices ?? rewardConfig.requiredCompletedServices}`,
      timestamp: new Date().toLocaleTimeString(),
    };
    setRewardAuditLogs((prev) => [audit, ...prev]);
    showToast('success', 'Configuration Updated', 'Monthly reward program parameters updated.');
  };

  const updateRewardDefinition = (rewardId: string, updates: Partial<RewardDefinition>) => {
    setRewardDefinitions((prev) =>
      prev.map((r) => (r.id === rewardId ? { ...r, ...updates } : r))
    );
  };

  // Bookings Management
  const addEnquiry = (data: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): string => {
    const newId = `BK-${Math.floor(200 + Math.random() * 800)}`;
    const newEnquiry: Enquiry = {
      ...data,
      id: newId,
      status: 'new',
      createdAt: 'Just now',
      vehicleDetails: data.vehicleDetails || (activeVehicle ? `${activeVehicle.make} ${activeVehicle.model} (${activeVehicle.regNumber})` : 'Vehicle'),
    };

    setEnquiries((prev) => [newEnquiry, ...prev]);
    showToast(
      'success',
      'Booking Scheduled / బుకింగ్ నిర్ధారించబడింది!',
      `Booking #${newId} for "${data.serviceRequested}" has been sent to ${data.targetName}.`
    );
    return newId;
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    showToast('info', 'Status Updated', `Booking #${id} status changed to ${status.replace('_', ' ').toUpperCase()}`);
  };

  const acceptBooking = (id: string) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'accepted' } : item))
    );
    showToast('success', 'Booking Accepted / బుకింగ్ ఆమోదించబడింది!', `Booking #${id} has been accepted by provider.`);
  };

  const rejectBooking = (id: string) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'rejected' } : item))
    );
    showToast('error', 'Booking Declined / తిరస్కరించబడింది', `Booking #${id} has been declined.`);
  };

  const startBooking = (id: string) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'in_progress' } : item))
    );
    showToast('info', 'Service In Progress / సేవ ప్రారంభమైంది', `Technician has started work on #${id}.`);
  };

  // Provider explicitly completes job with notes & actual amount
  const completeBooking = (
    id: string,
    workDescription: string,
    amountCharged: number,
    completionNotes = '',
    providerConfirmation = true
  ) => {
    const formattedAmount = `₹${amountCharged.toLocaleString('en-IN')}`;
    const completedAt = `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    let completedBooking: Enquiry | undefined;

    setEnquiries((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          completedBooking = {
            ...item,
            status: 'completed',
            workDescription,
            amountCharged,
            amount: formattedAmount,
            completedAt,
            completionConfirmedByProvider: providerConfirmation,
            completionNotes,
            eligibleForReward: true,
            reviewSubmitted: false,
          };
          return completedBooking;
        }
        return item;
      })
    );

    if (completedBooking && providerConfirmation) {
      // Create new ServiceCompletionRecord
      const newCompletion: ServiceCompletionRecord = {
        id: `CMP-${Date.now()}`,
        bookingId: completedBooking.id,
        customerId: completedBooking.customerId || 'cust_101',
        customerName: completedBooking.customerName || 'K. Srinivasa Rao (Ravi Teja)',
        customerPhone: completedBooking.customerPhone || '9848111222',
        providerId: completedBooking.targetId || 'p_1',
        providerName: completedBooking.targetName || 'Automotive Provider',
        serviceId: 'srv_completed',
        serviceName: completedBooking.serviceRequested,
        vehicleDetails: completedBooking.vehicleDetails || 'Registered Vehicle',
        actualAmount: amountCharged,
        completionNotes: completionNotes || workDescription,
        providerConfirmation: true,
        completedAt,
        month: 11, // November 2026
        year: 2026,
        status: 'verified',
      };

      setServiceCompletions((prev) => [newCompletion, ...prev]);

      // Calculate new monthly progress to check if reward milestone (10) was just reached!
      const currentProgress = getMonthlyRewardProgress(completedBooking.customerId || 'cust_101');
      const newCount = currentProgress.eligibleServiceCount + 1;

      if (newCount >= rewardConfig.requiredCompletedServices) {
        // Dispatch reward milestone notification
        const milestoneNotif: AppNotification = {
          id: `notif_${Date.now()}`,
          userId: completedBooking.customerId || 'cust_101',
          userRole: 'customer',
          title: '🎉 10 Services Completed! Free Reward Unlocked!',
          message: 'Congratulations! You have completed 10 eligible vehicle services in November. Tap to choose your FREE reward!',
          type: 'reward',
          timestamp: 'Just now',
          read: false,
          actionUrl: '/rewards',
        };
        setNotifications((prev) => [milestoneNotif, ...prev]);

        showToast(
          'success',
          '🏆 Monthly 10-Service Milestone Unlocked!',
          `Customer ${completedBooking.customerName} reached 10 completed services! Free Reward unlocked.`
        );
      } else {
        showToast(
          'success',
          'Service Completed / సేవ పూర్తయింది!',
          `Booking #${id} marked as completed for ${formattedAmount}. ${rewardConfig.requiredCompletedServices - newCount} more services to unlock free reward!`
        );
      }
    }
  };

  const submitBookingReview = (bookingId: string, rating: number, comment: string): boolean => {
    const booking = enquiries.find((e) => e.id === bookingId);
    if (!booking) {
      showToast('error', 'Booking Not Found', 'Could not locate booking details.');
      return false;
    }

    if (booking.status !== 'completed') {
      showToast('error', 'Service Not Completed', 'Reviews can only be submitted after the service provider confirms job completion.');
      return false;
    }

    if (booking.reviewSubmitted) {
      showToast('info', 'Review Already Submitted', 'You have already submitted a review for this booking.');
      return false;
    }

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

    if (booking.targetType === 'provider') {
      setProviders((prev) =>
        prev.map((p) => {
          if (p.id === booking.targetId) {
            const newReview = {
              id: `rev_${Date.now()}`,
              author: booking.customerName || 'Verified Vehicle Owner',
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

    showToast('success', 'Verified Review Published / రేటింగ్ నమోదయింది!', 'Thank you for rating your automotive service experience.');
    return true;
  };

  const toggleFavorite = (type: 'providers' | 'businesses' | 'properties', id: string) => {
    setFavorites((prev) => {
      const list = prev[type];
      const exists = list.includes(id);
      const updated = exists ? list.filter((item) => item !== id) : [...list, id];
      return { ...prev, [type]: updated };
    });
  };

  const approvePendingItem = (id: string) => {
    setPendingApprovals((prev) => prev.filter((item) => item.id !== id));
    showToast('success', 'Item Approved', 'The pending listing or provider verification has been approved.');
  };

  const rejectPendingItem = (id: string) => {
    setPendingApprovals((prev) => prev.filter((item) => item.id !== id));
    showToast('info', 'Item Rejected', 'The pending item has been declined.');
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
        vehicles,
        activeVehicle,
        setActiveVehicleId,
        addVehicle,
        removeVehicle,
        rewardDefinitions,
        rewardConfig,
        rewardClaims,
        serviceCompletions,
        rewardAuditLogs,
        notifications,
        getMonthlyRewardProgress,
        claimMonthlyReward,
        adminApproveRewardClaim,
        adminRejectRewardClaim,
        markRewardRedeemed,
        updateRewardConfig,
        updateRewardDefinition,
        markNotificationRead,
        markAllNotificationsRead,
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
