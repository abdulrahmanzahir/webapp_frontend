import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import HeroSectionIN from '../components/HeroSectionIN';
import DashboardSection from '../components/DashboardSection';
import SixStepForm from '../components/6StepForm';
import ChatSection from '../components/ChatSection';
import Footer from '../components/Footer';

export default function HomeLoggedIn({
  isMenuOpen,
  toggleMenu,
  activeSection,
  scrollToSection,
  setIsLoginMode,
  setIsLoginFormVisible,
  setIsForgotPasswordMode,
  isLoggedIn,
  setIsLoggedIn,
  username,
}) {
  // Banner visibility (disappears after 10s)
  const [showBanner, setShowBanner] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Refresh key for dashboard reloading
  const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);

  // Triggered when SixStepForm finishes and saves
  const handleNewReading = () => {
    setDashboardRefreshKey(prev => prev + 1); // Trigger re-fetch
    document.getElementById("interactiveDashboard")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <NavigationBar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        setIsLoginMode={setIsLoginMode}
        setIsLoginFormVisible={setIsLoginFormVisible}
        setIsForgotPasswordMode={setIsForgotPasswordMode}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        username={username}
      />

      {showBanner && (
        <div className="bg-blue-100 py-6 px-6 shadow-inner text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-800">
            👨‍⚕️ Welcome, Doctor {username || 'User'}!
          </h2>
          <p className="text-md text-blue-700 mt-2">
            You&apos;re now logged in. Start tracking and managing patient data below.
          </p>
        </div>
      )}

      <HeroSectionIN scrollToSection={scrollToSection} username={username} />

      {/* Dashboard auto-updates on reading */}
      <DashboardSection
        scrollToSection={scrollToSection}
        refreshKey={dashboardRefreshKey}
      />

      {/* 6-step input form triggers dashboard refresh */}
      <SixStepForm onSuccess={handleNewReading} />

      <ChatSection />
      <Footer />
    </>
  );
}