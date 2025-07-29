import { FeaturesSection } from "@/components/sections/features-legal";
import { Footer } from "@/components/sections/footer-legal";
import { LegalHero } from "@/components/sections/hero-legal";
import { HowItWorksSection } from "@/components/sections/how-it-works";

export default function HomePage() {
  return (
    <main className="bg-[#0a0613]">
      <LegalHero />
      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </main>
  );
}
