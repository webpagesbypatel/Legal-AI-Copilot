import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Scale, BrainCircuit, ShieldQuestion, SearchCheck, FileWarning, Milestone } from "lucide-react";

const features = [
  {
    icon: <BrainCircuit size={28} className="text-[#9b87f5]" />,
    title: "Argument Chain Reversal",
    description: "Input your desired outcome and let our AI build the most viable legal argument chains to get you there."
  },
  {
    icon: <FileWarning size={28} className="text-[#9b87f5]" />,
    title: "Contrarian Engine",
    description: "Upload opposing counsel's filings to instantly find logical contradictions and factual inconsistencies for cross-examination."
  },
  {
    icon: <Scale size={28} className="text-[#9b87f5]" />,
    title: "AI Judge Profiling",
    description: "Analyze the rulings and preferences of your assigned judge to tailor arguments for maximum persuasive impact."
  },
  {
    icon: <ShieldQuestion size={28} className="text-[#9b87f5]" />,
    title: "AI Red Team Simulator",
    description: "Stress-test your own drafts against an AI opposing counsel to identify and fix every weakness before you file."
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="w-full bg-[#100a1f] py-20 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-light text-white sm:text-4xl md:text-5xl">Your AI Litigation Toolkit</h2>
          <p className="mt-4 text-lg text-white/60">Go beyond simple automation. Gain a strategic advantage at every stage of the legal process.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="flex transform-gpu flex-col border-[#9b87f5]/20 bg-white/5 p-6 text-white transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl hover:shadow-[#9b87f5]/20">
              <CardHeader className="p-0">
                {feature.icon}
                <CardTitle className="mt-4 text-xl font-light">{feature.title}</CardTitle>
              </CardHeader>
              <CardDescription className="mt-2 text-white/60">{feature.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
