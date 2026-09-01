"use client";
import Image from "next/image";
import { Step } from "@/data/steps";

export default function SingleStepSection({ step }: { step: Step }) {
  return (
    <section id="lesson" className="bg-[#FAF7F0] py-12 scroll-mt-20">
      <div className="flex justify-between items-start px-80">
        <div className="flex flex-col gap-2 max-w-[640px]">
          <p className="text-bronze text-sm tracking-widest uppercase font-bold">
            {step.label} - {step.organ}
          </p>
          <h1 className="text-[#2A2520] text-4xl font-bold">{step.heading}</h1>
          {step.body.map((paragraph, i) => (
            <p key={i} className="text-[#2A2520] text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
          <p className="text-[#2A2520] text-base leading-relaxed border-l-2 border-bronze pl-4 bg-[#FDF0E0] p-4 rounded-r-md">
            {step.factCallout}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Image
            width={300}
            height={300}
            className="rounded-lg w-full max-w-[280px] h-auto"
            src={step.image.src}
            alt={step.image.alt}
          />
          <p className="text-bronze uppercase leading-relaxed text-sm border-t border-[#2A2520]/15 pt-4 mt-2">
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
