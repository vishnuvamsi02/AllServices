'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { RewardDefinition, RewardClaim } from '@/data/types';
import {
  Gift,
  Sparkles,
  Droplets,
  Snowflake,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Check,
  Flame,
  Award,
  Zap,
  ChevronDown,
  ChevronUp,
  QrCode,
  Copy,
  Clock,
  Car,
  Bike,
  PackageCheck,
  Info,
} from 'lucide-react';
import Link from 'next/link';

interface ChooseRewardSectionProps {
  onClaimSuccess?: (claim: RewardClaim) => void;
  showTitle?: boolean;
}

export const ChooseRewardSection: React.FC<ChooseRewardSectionProps> = ({
  onClaimSuccess,
  showTitle = true,
}) => {
  const { isTelugu } = useLanguage();
  const {
    rewardDefinitions,
    getMonthlyRewardProgress,
    claimMonthlyReward,
    showToast,
  } = useMarketplace();

  const customerId = 'cust_101';
  const realProgress = getMonthlyRewardProgress(customerId, 11, 2026);

  // Interactive Demo Toggle allowing users to preview the 10/10 unlocked celebratory experience!
  const [demoUnlocked, setDemoUnlocked] = useState(false);
  const isUnlocked = demoUnlocked || realProgress.rewardUnlocked;
  const isClaimed = !demoUnlocked && realProgress.claimed;

  const [selectedRewardId, setSelectedRewardId] = useState<string>('rew_oil_change');
  const [expandedDetailsId, setExpandedDetailsId] = useState<string | null>(null);
  const [activeClaimModal, setActiveClaimModal] = useState<RewardClaim | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Detailed perk bullets for each reward
  const rewardPerksMap: Record<string, { perks: string[]; workshopText: string; highlight: string }> = {
    rew_bike_wash: {
      highlight: 'Deep Snow Foam Detailing & Mirror Polish',
      perks: [
        'High-Pressure Snow Foam Pre-Soak & Rinse',
        'Drive Chain Degreasing, Tension Check & Lubrication',
        'Anti-Static Tyre Dressing & Mirror Chrome Glaze',
        'Applicable for any Two-Wheeler (Hero, Honda, Bajaj, Yamaha, EV)',
      ],
      workshopText: 'Available at 45+ Authorized Village Water Wash Centers in AP',
    },
    rew_oil_change: {
      highlight: '100% Genuine Sealed 4T Engine Oil Pack',
      perks: [
        '1-Litre Sealed Pack from Castrol, Motul, or Servo',
        'High-Temperature Sludge Protection & Thermal Stability',
        'Complimentary Drain Plug Gasket & Sump Cleaning',
        'Compatible with all 100cc to 350cc Two-Wheelers',
      ],
      workshopText: 'Available at 60+ Registered Auto Care Workshops across Godavari & Guntur',
    },
    rew_ac_cleaning: {
      highlight: 'Evaporator Antibacterial Foam Flush & Disinfection',
      perks: [
        'Antimicrobial Foam Cleanse of AC Cooling Coil & Fins',
        'Cabin Pollen Filter Dust Extraction & Odor Treatment',
        'R134a Compressor Gas Pressure & Cooling Diagnostic Check',
        'Applicable for Hatchback, Sedan, and SUV Vehicles',
      ],
      workshopText: 'Available at 30+ Certified Car Care Garages with specialized AC rigs',
    },
  };

  const getRewardIcon = (id: string) => {
    switch (id) {
      case 'rew_bike_wash':
        return Sparkles;
      case 'rew_oil_change':
        return Droplets;
      case 'rew_ac_cleaning':
      default:
        return Snowflake;
    }
  };

  const getRewardColorThemes = (id: string, isSelected: boolean) => {
    switch (id) {
      case 'rew_bike_wash':
        return {
          gradient: 'from-blue-600/10 via-cyan-500/10 to-indigo-600/5',
          border: isSelected ? 'border-cyan-500 ring-4 ring-cyan-500/20 shadow-cyan-500/10' : 'border-slate-200 hover:border-cyan-300',
          badgeBg: 'bg-cyan-100 text-cyan-900 border-cyan-200',
          iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-blue-500/25',
          accentColor: 'text-cyan-700',
          btnBg: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white',
        };
      case 'rew_oil_change':
        return {
          gradient: 'from-amber-500/15 via-yellow-500/10 to-orange-600/5',
          border: isSelected ? 'border-amber-500 ring-4 ring-amber-500/20 shadow-amber-500/10' : 'border-slate-200 hover:border-amber-300',
          badgeBg: 'bg-amber-100 text-amber-950 border-amber-300',
          iconBg: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-amber-500/25',
          accentColor: 'text-amber-800',
          btnBg: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black',
        };
      case 'rew_ac_cleaning':
      default:
        return {
          gradient: 'from-emerald-500/15 via-teal-500/10 to-cyan-600/5',
          border: isSelected ? 'border-emerald-500 ring-4 ring-emerald-500/20 shadow-emerald-500/10' : 'border-slate-200 hover:border-emerald-300',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/25',
          accentColor: 'text-emerald-800',
          btnBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white',
        };
    }
  };

  const handleClaim = (rewardId: string) => {
    const res = claimMonthlyReward(customerId, rewardId);
    if (res.success) {
      const rewardObj = rewardDefinitions.find((r) => r.id === rewardId);
      const claimRecord: RewardClaim = {
        id: res.claimId || `claim_${Date.now()}`,
        uniqueClaimId: `CLM-202611-${Math.floor(100 + Math.random() * 899)}`,
        customerId,
        customerName: 'K. Srinivasa Rao (Ravi Teja)',
        customerPhone: '9848111222',
        month: 11,
        year: 2026,
        rewardId,
        rewardName: rewardObj?.name || 'Complimentary Reward',
        rewardTitle: rewardObj?.name || 'Complimentary Reward',
        status: 'pending_admin_approval',
        requestedAt: 'Just now',
        redemptionCode: `RW-${Math.floor(10000 + Math.random() * 89999)}`,
        voucherCode: `RW-${Math.floor(10000 + Math.random() * 89999)}`,
        contributingBookingsCount: 10,
        totalServiceAmount: 5400,
        contributingBookingIds: ['BK-101', 'BK-102', 'BK-103', 'BK-104', 'BK-105', 'BK-106', 'BK-107', 'BK-108', 'BK-109', 'BK-110'],
      };

      setActiveClaimModal(claimRecord);
      if (onClaimSuccess) onClaimSuccess(claimRecord);
      showToast('success', 'Reward Claim Submitted!', 'Village Admin has received your 10 verified services for voucher approval.');
    } else {
      showToast('error', 'Claim Request Error', res.error || 'Complete 10 verified services first.');
    }
  };

  const copyVoucherToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    showToast('info', 'Code Copied', `Voucher ${code} copied to clipboard.`);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <div className="relative my-8">
      
      {/* Decorative Aura Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-blue-500/5 to-emerald-400/5 rounded-3xl blur-2xl pointer-events-none" />

      {/* Main Container Card */}
      <div className="relative bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-card overflow-hidden">
        
        {/* Top Header & Interactive Demo Mode Switch */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-xs">
                <Gift className="w-3.5 h-3.5 fill-current" />
                <span>{isTelugu ? 'నెలవారీ లాయల్టీ రివార్డులు' : 'Monthly Loyalty Rewards'}</span>
              </span>

              {isUnlocked ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300 animate-pulse">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isTelugu ? '🎉 రివార్డ్ అన్‌లాక్ అయింది!' : '🎉 10/10 Milestone Unlocked!'}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>
                    {realProgress.eligibleServiceCount} / {realProgress.requiredCount} ({realProgress.remainingCount} {isTelugu ? 'మిగిలి ఉన్నాయి' : 'more needed'})
                  </span>
                </span>
              )}
            </div>

            {showTitle && (
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                {isTelugu ? 'మీ ఉచిత రివార్డును ఎంచుకోండి (ఏదైనా 1 ఎంపిక)' : 'Choose Your Free Reward (Select Any ONE)'}
              </h2>
            )}
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {isUnlocked
                ? (isTelugu
                    ? 'అభినందనలు! ఈ నెలలో 10 సేవలు పూర్తయ్యాయి. కింద ఉన్న 3 విలువైన రివార్డులలో ఒకదాన్ని ఉచితంగా ఎంచుకోండి.'
                    : 'Congratulations! You have verified vehicle service milestones. Pick 1 complimentary reward below to receive your workshop voucher code.')
                : (isTelugu
                    ? 'ప్రతి క్యాలెండర్ నెలలో 10 ధృవీకరించబడిన సేవలను పూర్తి చేయండి మరియు 100% ఉచితంగా ప్రీమియం సేవను పొందండి.'
                    : 'Complete 10 verified vehicle services in a single calendar month to unlock any 1 of these 3 premium rewards 100% free.')}
            </p>
          </div>

          {/* Interactive Test / Simulation Button for Demo Testing */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setDemoUnlocked(!demoUnlocked)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 border shadow-xs ${
                demoUnlocked
                  ? 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-300 animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
              }`}
              title="Toggle 10/10 milestone simulation"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
              <span>{demoUnlocked ? 'Demo: 10/10 Unlocked' : 'Test Unlock (Demo)'}</span>
            </button>
          </div>
        </div>

        {/* 3 Luxury Visual Reward Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6">
          {rewardDefinitions.map((reward) => {
            const Icon = getRewardIcon(reward.id);
            const isSelected = selectedRewardId === reward.id;
            const theme = getRewardColorThemes(reward.id, isSelected);
            const details = rewardPerksMap[reward.id];
            const isExpanded = expandedDetailsId === reward.id;

            return (
              <div
                key={reward.id}
                onClick={() => setSelectedRewardId(reward.id)}
                className={`group relative rounded-3xl p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border-2 bg-gradient-to-b ${theme.gradient} ${theme.border} hover:shadow-xl hover:-translate-y-1`}
              >
                {/* Active Selection Pin Indicator */}
                {isSelected && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md border border-white/20 z-10 animate-in fade-in zoom-in-95">
                    <Check className="w-3 h-3 text-amber-400 stroke-[3px]" />
                    <span>{isTelugu ? 'ఎంచుకున్న రివార్డ్' : 'Selected Choice'}</span>
                  </div>
                )}

                <div>
                  {/* Top Row: Icon + Value Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg`}>
                      <Icon className="w-7 h-7 stroke-[2.2px]" />
                    </div>

                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-black border shadow-2xs ${theme.badgeBg}`}>
                        ₹{reward.retailValue} {isTelugu ? 'ఉచితం' : 'FREE'}
                      </span>
                      <span className="block text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider">
                        {reward.badge || '100% Free'}
                      </span>
                    </div>
                  </div>

                  {/* Title & Telugu Name */}
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug group-hover:text-primary transition-colors">
                    {isTelugu ? reward.teluguName : reward.name}
                  </h3>

                  <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                    {isTelugu ? reward.teluguDescription : reward.description}
                  </p>

                  {/* Highlight Pill */}
                  {details && (
                    <div className="mt-3 p-2.5 rounded-xl bg-white/80 border border-slate-200/80 text-xs font-bold text-slate-800 flex items-center gap-2 shadow-2xs">
                      <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                      <span className="line-clamp-1">{details.highlight}</span>
                    </div>
                  )}

                  {/* Expandable "What's Included" Accordion */}
                  {details && (
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedDetailsId(isExpanded ? null : reward.id);
                        }}
                        className="text-[11px] font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-1 py-1"
                      >
                        <Info className="w-3 h-3 text-slate-400" />
                        <span>{isExpanded ? (isTelugu ? 'వివరాలు దాచండి' : 'Hide Included Perks') : (isTelugu ? 'ఈ సేవలో ఏమున్నాయి?' : 'View 4 Included Perks')}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-2 p-3 bg-white rounded-2xl border border-slate-200/90 text-xs space-y-1.5 animate-in fade-in duration-150">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                            Included Service Checklist:
                          </span>
                          {details.perks.map((perk, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-slate-700 text-[11px] font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{perk}</span>
                            </div>
                          ))}
                          <p className="text-[10px] font-bold text-slate-400 pt-1.5 border-t border-slate-100">
                            {details.workshopText}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Action Area */}
                <div className="mt-5 pt-4 border-t border-slate-200/70">
                  {isUnlocked && !isClaimed ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRewardId(reward.id);
                        handleClaim(reward.id);
                      }}
                      className={`w-full py-3 rounded-2xl text-xs sm:text-sm font-black shadow-md transition-all flex items-center justify-center gap-2 ${
                        isSelected
                          ? `${theme.btnBg} shadow-lg scale-[1.02] ring-2 ring-white/50`
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <Gift className="w-4 h-4 fill-current" />
                      <span>{isTelugu ? 'ఈ రివార్డ్‌ను క్లెయిమ్ చేయండి' : 'Claim This Reward (Free)'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : isClaimed ? (
                    <div className="py-2.5 px-3 bg-slate-100 rounded-2xl text-center text-xs font-bold text-slate-500 flex items-center justify-center gap-1.5">
                      <PackageCheck className="w-4 h-4 text-emerald-600" />
                      <span>{isTelugu ? 'ఈ నెల రివార్డ్ క్లెయిమ్ చేయబడింది' : 'Claimed for this month'}</span>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRewardId(reward.id);
                        }}
                        className={`w-full py-2.5 rounded-2xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                        <span>{isSelected ? 'Selected Preference' : 'Select This Reward'}</span>
                      </button>
                      <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-400">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>Complete {realProgress.remainingCount} more jobs to unlock</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {isTelugu
                ? '100% స్వచ్ఛమైన లాయల్టీ రివార్డులు • దళారులు లేరు • అధికారిక వర్క్‌షాప్‌లలో చెల్లుబాటు అవుతుంది'
                : '100% Free Loyalty Benefit • Verified by Village Admin • Redeemable at all partner garages'}
            </span>
          </div>

          <Link
            href="/rewards"
            className="text-primary font-bold hover:underline flex items-center gap-1 ml-auto text-xs"
          >
            <span>{isTelugu ? 'పూర్తి నిబంధనలు & రికార్డులు చూడండి' : 'View Full Rewards & Terms'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* CLAIM SUCCESS VOUCHER POPUP MODAL */}
      {activeClaimModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm animate-bounce">
              <Gift className="w-8 h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isTelugu ? 'రివార్డ్ క్లెయిమ్ నమోదైంది!' : 'Reward Claim Submitted!'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
              Your claim for <span className="font-bold text-slate-900">{activeClaimModal.rewardName}</span> has been logged under ID <span className="font-mono font-bold text-primary">{activeClaimModal.uniqueClaimId}</span>.
            </p>

            {/* Voucher Box */}
            <div className="my-5 p-4 rounded-2xl bg-amber-50 border-2 border-dashed border-amber-300 text-center space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">
                Your AutoCare Voucher Code
              </span>

              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-2xl font-black text-amber-950 tracking-widest">
                  {activeClaimModal.voucherCode || activeClaimModal.redemptionCode}
                </span>
                <button
                  type="button"
                  onClick={() => copyVoucherToClipboard(activeClaimModal.voucherCode || activeClaimModal.redemptionCode || '')}
                  className="p-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-900 transition-colors"
                  title="Copy Code"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {copiedCode && (
                <span className="text-[11px] font-bold text-emerald-700 block">✓ Voucher Code Copied!</span>
              )}

              <p className="text-[11px] text-amber-900/80 font-medium pt-1">
                Valid for 60 days at all partner automobile workshops in your village & district.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveClaimModal(null)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xs transition-colors"
              >
                {isTelugu ? 'ధన్యవాదాలు / పూర్తి చేయండి' : 'Done & Close'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
