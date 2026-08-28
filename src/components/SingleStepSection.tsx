"use client";
import Image from "next/image";

export default function SingleStepSection() {
  return (
    <section className="bg-[#FAFAF9] text-black px-20 py-20">
      <div className="flex flex-row gap-5">
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-bronze text-sm tracking-widest uppercase font-bold">
            Step 1 - Mouth
          </p>
          <h1 className="text-black text-4xl tracking-widest font-bold">
            Where digestion
            <br /> begins
          </h1>
          <p className="text-black text-base leading-relaxed">
            The moment food enters your mouth, two types of digestion begin
            simultaneously. Mechanical digestion happens through chewing — your
            teeth break food into smaller pieces, increasing surface area.
            Chemical digestion starts when salivary glands release amylase, an
            enzyme that begins breaking down complex carbohydrates into simpler
            sugars.
          </p>
          <p className="text-black text-base leading-relaxed border-l-2 border-bronze pl-4 bg-[#FDF0E0] p-4 rounded-r-md">
            The average person produces 0.5-1.5 litres of saliva per day,
            containing enzymes, antibacterial compounds, and lubricants.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-150">
          <Image
            width={300}
            height={300}
            className="rounded-lg"
            alt="throat"
            src="esophagus.svg"
          />
          <p className="text-bronze uppercase leading-relaxed text-sm">
            References
          </p>
          <p className="text-stone text-sm leading-relaxed">
            Grays Anatomy, 41st Ed. Tortora & Derrickson, 2017 NHS — How
            digestion works
          </p>
        </div>
      </div>
    </section>
  );
}
