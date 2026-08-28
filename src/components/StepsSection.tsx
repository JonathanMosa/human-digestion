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
    <section className="px-20 py-16 bg-linen">
      <p className="text-sm tracking-widest uppercase text-stone pb-8">
        Digestion Pathway
      </p>

      <div className="flex gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            onClick={() => onSelect(step.id)} // report the click up; page.tsx owns the state
            className={`rounded-xl px-6 py-8 flex flex-col gap-3 w-52 cursor-pointer transition
              ${
                selectedId === step.id
                  ? "bg-bronze border border-bronze" // active
                  : "bg-[#ecc582] border border-stone" // inactive
              }`}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#7a5c2e]">
              {step.label}
            </p>
            <p className="text-xl font-medium text-espresso">{step.organ}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
