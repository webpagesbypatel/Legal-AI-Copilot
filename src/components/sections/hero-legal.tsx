"use client";
 
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
 
export function LegalHero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#0a0613] pb-10 pt-32 font-light text-white antialiased md:pb-16 md:pt-40"
      style={{
        background: "linear-gradient(135deg, #0a0613 0%, #150d27 100%)",
      }}
    >
       <div
        className="absolute right-0 top-0 h-1/2 w-1/2"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 h-1/2 w-1/2 -scale-x-100"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%)",
        }}
      />
 
      <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="mb-6 inline-block rounded-full border border-[#9b87f5]/30 px-3 py-1 text-xs uppercase tracking-wider text-[#9b87f5]">
            The Future of Legal Practice
          </span>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-light leading-tight md:text-5xl lg:text-7xl">
            Empower Your Practice,{" "}
            <span className="text-[#9b87f5]">Master Your Cases</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/60 md:text-xl">
            LegalCopilot integrates cutting-edge AI to automate drafting,
            uncover winning arguments, and predict case outcomes—all in one
            secure platform.
          </p>
 
          <div className="mb-10 sm:mb-0 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/document-analysis"
              className="neumorphic-button hover:shadow-[0_0_20px_rgba(155, 135, 245, 0.5)] relative w-full overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30 sm:w-auto"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="flex w-full items-center justify-center gap-2 text-white/70 transition-colors hover:text-white sm:w-auto"
            >
              <span>Learn more</span>
              <ChevronDown className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
        <motion.div
          className="relative mt-12 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="w-full absolute top-[-50px] md:top-[-100px] left-0 h-40 md:h-64 -z-10 overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(155,135,245,0.1)_0%,transparent_80%)]" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-lg bg-black/20 p-1 shadow-[0_0_50px_rgba(155,135,245,0.2)] ring-1 ring-white/10">
            <Image
              src="https://image.freepik.com/free-photo/judge-gavel-lady-justice-scales-purple-background-law-concept_253401-5302.jpg"
              alt="LegalCopilot App Dashboard Mockup"
              width={1920}
              height={1080}
              className="h-auto w-full rounded-md"
              priority
              data-ai-hint="legal justice"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
