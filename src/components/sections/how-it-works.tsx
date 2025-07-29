import Image from "next/image";
import Link from "next/link";

export function HowItWorksSection() {
    return (
        <section className="w-full py-20 sm:py-32">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    <div className="text-white">
                        <span className="mb-4 inline-block rounded-full border border-[#9b87f5]/30 px-3 py-1 text-xs uppercase tracking-wider text-[#9b87f5]">
                          Pinpoint Weaknesses
                        </span>
                        <h3 className="mb-4 text-3xl font-light md:text-4xl">Instantly Find Contradictions in Opposing Arguments</h3>
                        <p className="mb-8 text-lg text-white/60">
                            Stop spending days manually cross-referencing hundreds of pages. Upload the opposing party's plaint, written statement, and affidavits. LegalCopilot's Contrarian Engine reads and understands the context, delivering a detailed report of every logical gap and factual inconsistency for you to exploit.
                        </p>
                         <Link
                            href="/contradiction-finder"
                            className="inline-block rounded-full px-6 py-3 text-white transition-colors bg-[#9b87f5]/20 hover:bg-[#9b87f5]/30"
                        >
                            See it in Action
                        </Link>
                    </div>
                     <div className="overflow-hidden rounded-lg shadow-[0_0_50px_rgba(155,135,245,0.2)]">
                        <Image
                            src="https://images.unsplash.com/photo-1676181739678-47d76dc38a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNnx8Q09VUlR8ZW58MHx8fHwxNzUzNzk3NDE3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="Data analysis dashboard showing charts and graphs"
                            width={1920}
                            height={1080}
                            data-ai-hint="data analysis"
                            className="h-auto w-full rounded-lg border border-white/10"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
