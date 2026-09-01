"use client";
import { steps } from "@/data/steps";

type StepsSectionProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function StepsSection({
  selectedId,
  onSelect,
}: StepsSectionProps) {
  return (
    <section className="px-20 py-16 bg-[#FAF7F0]">
      <p className="text-sm tracking-widest uppercase text-stone pb-8">
        Digestion Pathway
      </p>

      <div className="grid grid-cols-5 gap-3">
        {steps.map((step) => (
          <div
            key={step.id}
            onClick={() => onSelect(step.id)} // report the click up; page.tsx owns the state
            className={`rounded-xl px-6 py-8 flex flex-col gap-3 cursor-pointer transition
              ${
                selectedId === step.id
                  ? "bg-[#2A2520] text-white" // active
                  : "bg-[#E8C99B] text-[#4A1B0C] hover:-translate-y-0.5" // inactive
              }`}
          >
            <p className="text-xs font-semibold tracking-widest uppercase opacity-70">
              {step.label}
            </p>
            <p className="text-xl font-medium">{step.organ}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
