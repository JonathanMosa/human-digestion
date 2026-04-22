"use client";
import { useState } from "react";

const options = [
  { id: "a", text: "Pepsin" },
  { id: "b", text: "Salivary amylase", correct: true },
  { id: "c", text: "Lipase" },
  { id: "d", text: "Trypsin" },
];

export default function TestSection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="bg-black flex flex-col gap-4 py-20 px-20">
      <div className="flex flex-col justify-start">
        <p className="text-white pb-2">Test your knowledge</p>
        <p className="text-stone">One quick question per step</p>
      </div>
      <div>
        <p className="text-white pt-8">
          Which enzyme in saliva begins breaking down carbohydrates?
        </p>
        <div className="grid grid-cols-2 gap-3 py-3 max-w-md">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`rounded-md px-4 py-3 text-sm border transition  
                ${
                  selected === option.id && option.correct
                    ? "border-green-500 text-green-400"
                    : selected === option.id && !option.correct
                      ? "border-red-500 text-red-400"
                      : "border-stone text-stone"
                }`}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
