import { LegalHero } from "@/components/sections/hero-legal";
import { FeaturesSection } from "@/components/sections/features-legal";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { Footer } from "@/components/sections/footer-legal";

export default function FeaturesPage() {
  return (
    <main className="bg-[#0a0613]">
      <LegalHero />
      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </main>
  );
}
