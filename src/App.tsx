import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { DomainWizard } from './components/DomainWizard';
import { ResultsPage } from './components/ResultsPage';
import { UserDashboard } from './components/UserDashboard';
import { TrendAnalyzerSection } from './components/TrendAnalyzerSection';
import { DomainComparisonModal } from './components/DomainComparisonModal';
import { PricingSection } from './components/PricingSection';
import { AdminPanel } from './components/AdminPanel';
import { AIBrandingModal } from './components/AIBrandingModal';
import { AuthModal } from './components/AuthModal';
import { DemoModal } from './components/DemoModal';
import { StatisticsSection, TestimonialsSection, FAQSection, Footer } from './components/HomeExtras';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { view } = useApp();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {view === 'home' && (
          <>
            <HeroSection />
            <FeaturesSection />
            <StatisticsSection />
            <TestimonialsSection />
            <PricingSection />
            <FAQSection />
          </>
        )}

        {view === 'wizard' && <DomainWizard />}
        {view === 'results' && <ResultsPage />}
        {view === 'dashboard' && <UserDashboard />}
        {view === 'trends' && <TrendAnalyzerSection />}
        {view === 'compare' && <DomainComparisonModal />}
        {view === 'pricing' && <PricingSection />}
        {view === 'admin' && <AdminPanel />}
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <AIBrandingModal />
      <AuthModal />
      <DemoModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
