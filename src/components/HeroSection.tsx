"use client";
import dynamic from "next/dynamic";

const BodyViewer = dynamic(() => import("@/components/3d/BodyViewer"), {
  ssr: false,
});

export default function HeroSection({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  return (
    <section className="flex items-center gap-12 px-20 min-h-[88vh]">
      <div className="flex flex-1 flex-col gap-6">
        <p className="text-bronze text-sm tracking-widest uppercase font-bold">
          Interactive anatomy
        </p>
        <h1 className="text-6xl font-bold text-espresso leading-tight whitespace-nowrap">
          How your body
          <br />
          digests food
        </h1>
        <p className="max-w-[42ch] text-base text-neutral-800 leading-relaxed">
          Explore the journey food takes from the first bite to absorption.
          Click any organ to learn more.
        </p>
        <div className="flex flex-col items-start gap-3">
          <button className="bg-black text-parchment px-6 py-3 rounded-md w-fit text-sm transition-colors hover:bg-bronze">
            Start Exploring
          </button>
          <span className="text-sm text-neutral-700">
            ↻ drag to rotate the model
          </span>
        </div>
      </div>

      <div className="flex-1 pr-32">
        <BodyViewer onSelect={onSelect} />
      </div>
    </section>
  );
}
