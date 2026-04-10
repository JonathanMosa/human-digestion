"use client";
import dynamic from "next/dynamic";

const BodyViewer = dynamic(() => import("@/components/3d/BodyViewer"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section className="flex items-center px-20 py-12 min-h-screen">
      <div className=" flex flex-col gap-6">
        <p className="text-bronze text-sm tracking-widest uppercase font-bold">
          Interactive anatomy
        </p>
        <h1 className="text-5xl font-medium text-espresso leading-tight">
          How your body
          <br /> digests food
        </h1>
        <p className="text-stone text-base max-w-sm leading-relaxed">
          Explore the journey food takes from the first bite to absorption.
          Click any organ to learn more.
        </p>
        <button className="bg-bronze text-parchment px-6 py-3 rounded-md w-fit text-sm">
          Start Exploring
        </button>
        <p className="text-stone text-xs hover:cursor-pointer">
          ↻ drag to rotate the model
        </p>
      </div>

      <div style={{ width: "100%", height: "600px " }}>
        <BodyViewer />
      </div>
    </section>
  );
}
