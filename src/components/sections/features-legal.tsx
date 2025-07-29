import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileScan, GitFork, Map, GitCommitVertical, Bot, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <FileScan size={28} className="text-[#9b87f5]" />,
    title: "Document Analysis",
    description: "AI-powered analysis to flag risky clauses, ambiguities, and suggest optimal templates based on Indian law."
  },
  {
    icon: <GitFork size={28} className="text-[#9b87f5]" />,
    title: "Argument Chain Reversal",
    description: "Works backward from a desired outcome to construct viable argument chains, uncovering novel legal pathways."
  },
  {
    icon: <Map size={28} className="text-[#9b87f5]" />,
    title: "Evidence Mapper",
    description: "Automatically clusters case evidence around key themes, transforming raw data into a compelling narrative."
  },
  {
    icon: <GitCommitVertical size={28} className="text-[#9b87f5]" />,
    title: "Contradiction Finder",
    description: "Deep semantic analysis of filings to find inconsistencies, generating questions for cross-examination."
  },
  {
    icon: <Bot size={28} className="text-[#9b87f5]" />,
    title: "AI Legal Assistant",
    description: "An always-available chatbot for questions on legal procedures, documentation, and live translations."
  },
  {
    icon: <ShieldCheck size={28} className="text-[#9b87f5]" />,
    title: "Compliance Checker",
    description: "Checks documents for compliance with key Indian statutes like the IT Act, DPDP Act, and SEBI regulations."
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
