"use client";
 
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
 
export function LegalHero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-black pb-20 pt-32 font-light text-white antialiased md:pb-24 md:pt-40"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://wallpapers.com/images/hd/law-background-7jhb5odzgri9346l.jpg"
          alt="Legal background"
          layout="fill"
          objectFit="cover"
          className="opacity-40"
          priority
          data-ai-hint="legal justice"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0613] via-[#0a0613]/80 to-transparent" />
      </div>
 
      <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="mb-6 inline-block rounded-full border border-[#9b87f5]/30 bg-[#9b87f5]/10 px-3 py-1 text-xs uppercase tracking-wider text-[#9b87f5]">
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
 
          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
      </div>
    </section>
  );
}
