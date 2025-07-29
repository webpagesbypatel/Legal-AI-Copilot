
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function HowItWorksSection() {
    return (
        <section className="w-full overflow-hidden py-20 sm:py-32">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    <motion.div 
                        className="text-white"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="mb-4 inline-block rounded-full border border-[#9b87f5]/30 px-3 py-1 text-xs uppercase tracking-wider text-[#9b87f5]">
                          AI in Action
                        </span>
                        <h3 className="mb-4 text-3xl font-light md:text-4xl">Gain a Global Perspective on Legal Strategy</h3>
                        <p className="mb-8 text-lg text-white/60">
                            The law is global. Our AI analyzes legal frameworks and case law from multiple jurisdictions, providing you with international insights to build more robust and worldly arguments. Uncover novel strategies by seeing how similar cases are won across the globe.
                        </p>
                         <Link
                            href="/contradiction-finder"
                            className="inline-block rounded-full px-6 py-3 text-white transition-colors bg-[#9b87f5]/20 hover:bg-[#9b87f5]/30"
                        >
                            Explore Global Insights
                        </Link>
                    </motion.div>
                     <motion.div 
                        className="overflow-hidden rounded-lg bg-[#100a1f] p-4 shadow-[0_0_50px_rgba(155,135,245,0.2)]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                     >
                        <Image
                            src="https://image.freepik.com/free-photo/judge-gavel-lady-justice-scales-purple-background-law-concept_253401-5302.jpg"
                            alt="Global Legal Insights"
                            width={1920}
                            height={1080}
                            data-ai-hint="justice law"
                            className="h-auto w-full"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
