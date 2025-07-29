import { Bot, FileScan, GitCommitVertical, GitFork, Map, ShieldCheck } from "lucide-react";

const features = [
  {
    name: "Document Analysis",
    description: "Upload your legal documents and the AI will analyze them for risky clauses, ambiguities, and provide a summary.",
    icon: FileScan,
  },
  {
    name: "Argument Chain Reversal",
    description: "Define your desired legal outcome, and the AI will work backward to construct logical argument chains.",
    icon: GitFork,
  },
  {
    name: "Thematic Evidence Mapper",
    description: "Input case evidence, and the AI will analyze, cluster the data, and build a compelling narrative.",
    icon: Map,
  },
  {
    name: "Contradiction Finder",
    description: "Perform a deep semantic analysis between two documents to find logical and factual inconsistencies.",
    icon: GitCommitVertical,
  },
  {
    name: "AI Legal Assistant",
    description: "A chatbot to answer your legal questions or translate legal documents from various Indian regional languages to English.",
    icon: Bot,
  },
  {
    name: "Automated Compliance Checker",
    description: "Check your documents for compliance against various statutes like the IT Act, DPDP Act, and SEBI Regulations.",
    icon: ShieldCheck,
  },
]

export function Features() {
  return (
    <div id="features" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Your AI Advantage</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Everything you need to win your case
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            LegalCopilot provides a suite of AI-powered tools to streamline your legal workflow, from document analysis to narrative building.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
