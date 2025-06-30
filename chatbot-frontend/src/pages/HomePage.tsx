import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';
import { useScripts } from '../hooks/useScript';

const HomePage: React.FC = () => {
  useScripts();

  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
    </>
  );
};

export default HomePage;