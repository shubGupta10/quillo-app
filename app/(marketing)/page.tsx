import { Hero2 } from "@/components/hero-2-1";
import { IntegrationsSection } from "@/components/integrations-section";
import { FeaturesSection } from "@/components/features-section";
import { FAQSection } from "@/components/faq-section";
import { TestimonialsSection } from "@/components/testimonial-v2";
import { Footer7 } from "@/components/footer-7";
import { PricingSection } from "@/components/pricing-section";

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero2 />
      <IntegrationsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <Footer7 />
    </div>
  );
}
