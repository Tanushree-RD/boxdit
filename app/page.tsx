"use client";

import { CinematicBackground } from "@/components/CinematicBackground";
import { FeatureCards } from "@/components/FeatureCards";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { WrapShowcase } from "@/components/WrapShowcase";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#080808] text-[#EDEDED] selection:bg-[#FF8000]/25 selection:text-white">
      {/* Editorial Grain, Faint Spotlight, and Minimal Ambient Particles */}
      <CinematicBackground />

      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        <Navbar />

        <main className="flex-1">
          <Hero />
          <FeatureCards />
          <WrapShowcase />
          <HowItWorks />
        </main>

        <Footer />
      </div>
    </div>
  );
}
