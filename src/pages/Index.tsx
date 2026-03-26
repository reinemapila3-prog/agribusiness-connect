import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PersonasSection from "@/components/PersonasSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BusinessModelSection from "@/components/BusinessModelSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <PersonasSection />
    <HowItWorksSection />
    <BusinessModelSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
