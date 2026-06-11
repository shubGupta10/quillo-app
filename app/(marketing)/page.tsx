import { Hero2 } from "@/components/hero-2-1";
import { IntegrationsSection } from "@/components/integrations-section";
import { FeaturesSection } from "@/components/features-section";
import { BeforeAfterSection } from "@/components/before-after-section";
import { TestimonialsSection } from "@/components/testimonial-v2";
import { QuilloPricing } from "@/components/quillo-pricing";
import { Footer7 } from "@/components/footer-7";

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero2 />
      <IntegrationsSection />
      <FeaturesSection />
      <BeforeAfterSection />
      <TestimonialsSection />
      <QuilloPricing />
      <Footer7 />
    </div>
  );
}
