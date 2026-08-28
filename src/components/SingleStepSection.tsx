"use client";
import Image from "next/image";
import { Step } from "@/data/steps";

export default function SingleStepSection({ step }: { step: Step }) {
  return (
    <section className="bg-[#FAFAF9] text-black px-20 py-20">
      <div className="flex flex-row gap-5">
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-bronze text-sm tracking-widest uppercase font-bold">
            {step.label} - {step.organ}
          </p>
          <h1 className="text-black text-4xl tracking-widest font-bold">
            {step.heading}
          </h1>
          {step.body.map((paragraph, i) => (
            <p key={i} className="text-black text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
          <p className="text-black text-base leading-relaxed border-l-2 border-bronze pl-4 bg-[#FDF0E0] p-4 rounded-r-md">
            {step.factCallout}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-150">
          <Image
            width={300}
            height={300}
            className="rounded-lg"
            src={step.image.src}
            alt={step.image.alt}
          />
          <p className="text-bronze uppercase leading-relaxed text-sm">
            References
          </p>
          {step.references.map((reference) => (
            <p key={reference} className="text-stone text-sm leading-relaxed">
              {reference}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
