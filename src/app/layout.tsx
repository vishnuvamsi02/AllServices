import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { LocationProvider } from '@/context/LocationContext';
import { AuthProvider } from '@/context/AuthContext';
import { MarketplaceProvider } from '@/context/MarketplaceContext';
import { RoleSwitcherBar } from '@/components/layout/RoleSwitcherBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { ToastContainer } from '@/components/common/ToastContainer';

export const metadata: Metadata = {
  title: 'SevaSetu | ఆంధ్రప్రదేశ్ గ్రామీణ సేవా వేదిక | Village Services & Marketplace',
  description: 'Find trusted electricians, plumbers, tractor rentals, local shops, and properties in Andhra Pradesh villages.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased selection:bg-primary/20 selection:text-primary">
        <LanguageProvider>
          <LocationProvider>
            <AuthProvider>
              <MarketplaceProvider>
                <RoleSwitcherBar />
                <Navbar />
                <main className="flex-1 pb-16 sm:pb-20">
                  {children}
                </main>
                <Footer />
                <BottomNav />
                <ToastContainer />
              </MarketplaceProvider>
            </AuthProvider>
          </LocationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
