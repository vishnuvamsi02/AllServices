'use client';

import React, { useState } from 'react';
import { HomeMode } from '@/data/types';
import { HeroSection } from '@/components/home/HeroSection';
import { TopPromotionsCarousel } from '@/components/home/TopPromotionsCarousel';
import { MonthlyRewardProgressWidget } from '@/components/home/MonthlyRewardProgressWidget';
import { ExploreServicesSection } from '@/components/home/ExploreServicesSection';
import { TopCategoriesGrid } from '@/components/home/TopCategoriesGrid';
import { MarketBrandPromoCard } from '@/components/home/MarketBrandPromoCard';
import { PropertiesSectionView } from '@/components/home/PropertiesSectionView';
import { FeaturedProviders } from '@/components/home/FeaturedProviders';
import { LocalBusinesses } from '@/components/home/LocalBusinesses';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { RegisterCTASection } from '@/components/home/RegisterCTASection';
import { PostAdModal } from '@/components/common/PostAdModal';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [mode, setMode] = useState<HomeMode>('services');
  const [showPostAdModal, setShowPostAdModal] = useState(false);
  const router = useRouter();

  return (
    <div>
      
      {/* Dynamic Hero with animated changing placeholder, Location, and Mode Switcher */}
      <HeroSection mode={mode} onModeChange={setMode} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Prominent Advertisement Showcase: FIRST Section Users See at Launch */}
        <TopPromotionsCarousel onOpenPostAd={() => setShowPostAdModal(true)} />

        {/* 10 Completed Services Customer Loyalty Reward Tracker Banner */}
        <MonthlyRewardProgressWidget />

        {/* Conditional View Based on Mode: Services vs Properties */}
        {mode === 'services' ? (
          <>
            {/* Explore Services 4 Tabs */}
            <ExploreServicesSection />

            {/* Top Categories Grid */}
            <TopCategoriesGrid />

            {/* Market Your Brand Promo Card ("Post Your Ad Here") */}
            <MarketBrandPromoCard onOpenPostAd={() => setShowPostAdModal(true)} />

            {/* Featured Village Providers */}
            <FeaturedProviders />

            {/* Local Village Shops */}
            <LocalBusinesses />
          </>
        ) : (
          <>
            {/* Dedicated Properties Section matching Scazo Screens */}
            <PropertiesSectionView onOpenPostProperty={() => router.push('/auth/register?role=property_owner')} />
          </>
        )}

        {/* How It Works 3-Step Process */}
        <HowItWorksSection />

        {/* Free Registration Call to Action */}
        <RegisterCTASection />

      </div>

      {/* Post Ad Modal */}
      <PostAdModal
        isOpen={showPostAdModal}
        onClose={() => setShowPostAdModal(false)}
      />

    </div>
  );
}
