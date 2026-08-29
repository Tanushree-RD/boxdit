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
    <div className="relative min-h-screen bg-[#060709] text-white selection:bg-[#FF9F1C]/30 selection:text-white">
      {/* 60fps Ambient Particle & Mouse Lighting Canvas */}
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
