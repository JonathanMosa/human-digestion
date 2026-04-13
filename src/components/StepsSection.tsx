"use client";
import { useState } from "react";

const steps = [
  { id: "step1", label: "Step 1", name: "Mouth" },
  { id: "step2", label: "Step 2", name: "Esophagus" },
  { id: "step3", label: "Step 3", name: "Stomach" },
  { id: "step4", label: "Step 4", name: "Small Intestine" },
  { id: "step5", label: "Step 5", name: "Large Intestine" },
];

export default function StepsSection() {
  const [selected, setSelected] = useState("step1"); // ← tracks which is active

  return (
    <section className="px-20 py-16 bg-linen">
      <p className="text-sm tracking-widest uppercase text-stone pb-8">
        Digestion Pathway
      </p>

      <div className="flex gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            onClick={() => setSelected(step.id)} // ← clicking sets this as selected
            className={`rounded-xl px-6 py-8 flex flex-col gap-3 w-52 cursor-pointer transition
              ${
                selected === step.id
                  ? "bg-bronze border border-bronze" // ← active style
                  : "bg-[#ecc582] border border-stone" // ← inactive style
              }`}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#7a5c2e]">
              {step.label}
            </p>
            <p className="text-xl font-medium text-espresso">{step.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
