'use client';

import React, { useState } from 'react';
import { HomeMode } from '@/data/types';
import { HeroSection } from '@/components/home/HeroSection';
import { ExploreServicesSection } from '@/components/home/ExploreServicesSection';
import { TopCategoriesGrid } from '@/components/home/TopCategoriesGrid';
import { SponsoredBannerCard } from '@/components/home/SponsoredBannerCard';
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
        
        {/* Conditional View Based on Mode: Services vs Properties */}
        {mode === 'services' ? (
          <>
            {/* Explore Services 4 Tabs matching Scazo Screen 10 */}
            <ExploreServicesSection />

            {/* Local Merchant Flex Banner Ad matching Scazo Screen 05 / 07 / 11 */}
            <SponsoredBannerCard />

            {/* Top Categories 4-Column Grid matching Scazo Screen 12 & 14 */}
            <TopCategoriesGrid />

            {/* Market Your Brand Promo Card ("Post Your Ad Here") + Connecting India matching Screen 08 */}
            <MarketBrandPromoCard onOpenPostAd={() => setShowPostAdModal(true)} />

            {/* Featured Village Providers */}
            <FeaturedProviders />

            {/* Local Village Shops */}
            <LocalBusinesses />
          </>
        ) : (
          <>
            {/* Local Merchant Flex Banner Ad */}
            <SponsoredBannerCard />

            {/* Dedicated Properties Section matching Scazo Screens 05, 07, 09 */}
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
