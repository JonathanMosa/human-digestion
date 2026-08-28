"use client";
import HeroSection from "@/components/HeroSection";
import SingleStepSection from "@/components/SingleStepSection";
import StepsSection from "@/components/StepsSection";
import TestSection from "@/components/TestSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="pt-14">
      <HeroSection />
      <StepsSection />
      <SingleStepSection />
      <TestSection />
      <FooterSection />
    </main>
  );
}
