"use client";
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import SingleStepSection from "@/components/SingleStepSection";
import StepsSection from "@/components/StepsSection";
import TestSection from "@/components/TestSection";
import FooterSection from "@/components/FooterSection";
import { steps } from "@/data/steps";

export default function Home() {
  const [selectedId, setSelectedId] = useState(steps[0].id);

  // the one Step object the lesson section renders from
  const selectedStep = steps.find((s) => s.id === selectedId);
  if (!selectedStep) return null;

  return (
    <main className="pt-14">
      <HeroSection onSelect={setSelectedId}/>
      <StepsSection selectedId={selectedId} onSelect={setSelectedId} />
      <SingleStepSection step={selectedStep} />
      <TestSection />
      <FooterSection />
    </main>
  );
}
