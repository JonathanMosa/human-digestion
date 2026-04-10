"use client";
import Image from "next/image";

export default function StepsSection() {
  return (
    <section className="px-20 py-16 bg-parchment">
      <p className="text-sm tracking-widest uppercase text-stone pb-8 font-bold">
        Digestion Pathway
      </p>

      <div className="flex flex-row gap-16">
        <div className="border-b border-stone rounded-md px-4 py-4 flex flex-col items-start w-40 h-88 bg-[#ecc582] hover:cursor-pointer">
          <Image //Maybe upgrade or get rid of feat
            src="/mouth.png"
            alt="Mouth"
            width={40}
            height={40}
            className="mb-3"
          />
          <p className="text-xs text-stone uppercase tracking wide mb-2">
            Step 1
          </p>
          <p className="text-sm font-medium text-espresso">Mouth</p>
          <p className="text-xs text-stone mt-2 leading-relaxed">
            Couple Sentence Description
          </p>
        </div>

        <div className="border-b border-stone rounded-md px-4 py-4 flex flex-col items-start w-40 h-88 bg-[#ecc582] hover:cursor-pointer">
          <Image //Maybe upgrade or get rid of feat
            src="/esophagus.svg"
            alt="Mouth"
            width={40}
            height={40}
            className="mb-3 mix-blend-multiply"
          />
          <p className="text-xs text-stone uppercase tracking wide mb-2">
            Step 2
          </p>
          <p className="text-sm font-medium text-espresso">Esophagus</p>
          <p className="text-xs text-stone mt-2 leading-relaxed">
            Couple Sentence Description
          </p>
        </div>

        <div className="border-b border-stone rounded-md px-4 py-4 flex flex-col items-start w-40 h-88 bg-[#ecc582] hover:cursor-pointer">
          <Image //Maybe upgrade or get rid of feat
            src="/stomach.png"
            alt="Mouth"
            width={80}
            height={80}
            className="mb-3 mix-blend-multiply pr-4"
          />
          <p className="text-xs text-stone uppercase tracking wide mb-2">
            Step 3
          </p>
          <p className="text-sm font-medium text-espresso">Stomach</p>
          <p className="text-xs text-stone mt-2 leading-relaxed">
            Couple Sentence Description
          </p>
        </div>

        <div className="border-b border-stone rounded-md px-4 py-4 flex flex-col items-start w-40 h-88 bg-[#ecc582] hover:cursor-pointer">
          <Image //Maybe upgrade or get rid of feat
            src="/smallintestine.png"
            alt="Mouth"
            width={60}
            height={80}
            className="mb-3 mix-blend-multiply pr-4"
          />
          <p className="text-xs text-stone uppercase tracking wide mb-2">
            Step 4
          </p>
          <p className="text-sm font-medium text-espresso">Small Intestine</p>
          <p className="text-xs text-stone mt-2 leading-relaxed">
            Couple Sentence Description
          </p>
        </div>

        <div className="border-b border-stone rounded-md px-4 py-4 flex flex-col items-start w-40 h-88 bg-[#ecc582] hover:cursor-pointer">
          <Image //Maybe upgrade or get rid of feat
            src="/largeintestine.png"
            alt="Mouth"
            width={50}
            height={80}
            className="mb-3 mix-blend-multiply pr-4"
          />
          <p className="text-xs text-stone uppercase tracking wide mb-2">
            Step 5
          </p>
          <p className="text-sm font-medium text-espresso">Large Intestine</p>
          <p className="text-xs text-stone mt-2 leading-relaxed">
            Couple Sentence Description
          </p>
        </div>
      </div>
    </section>
  );
}
