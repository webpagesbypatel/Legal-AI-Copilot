
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function HowItWorksSection() {
    return (
        <section className="w-full overflow-hidden bg-[#100a1f] py-20 sm:py-32">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <motion.div 
                        className="text-white"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="mb-4 inline-block rounded-full border border-[#9b87f5]/30 bg-[#9b87f5]/10 px-3 py-1 text-xs uppercase tracking-wider text-[#9b87f5]">
                          AI in Action
                        </span>
                        <h3 className="mb-4 text-3xl font-light md:text-4xl">Gain a Global Perspective on Legal Strategy</h3>
                        <p className="mb-8 text-lg text-white/60">
                            The law is global. Our AI analyzes legal frameworks and case law from multiple jurisdictions, providing you with international insights to build more robust and worldly arguments. Uncover novel strategies by seeing how similar cases are won across the globe.
                        </p>
                         <Link
                            href="/document-analysis"
                            className="inline-block rounded-full px-6 py-3 text-white transition-colors bg-[#9b87f5]/20 hover:bg-[#9b87f5]/30"
                        >
                            Go to App
                        </Link>
                    </motion.div>
                     <motion.div 
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                     >
                        <div className="absolute -inset-2 rounded-xl bg-gradient-to-br from-[#9b87f5]/50 to-transparent opacity-20 blur-2xl"></div>
                        <Image
                            src="https://image.freepik.com/free-photo/judge-gavel-lady-justice-scales-purple-background-law-concept_253401-5302.jpg"
                            alt="Global Legal Insights"
                            width={1920}
                            height={1080}
                            data-ai-hint="justice law"
                            className="relative h-auto w-full rounded-lg"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
