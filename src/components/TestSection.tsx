"use client";
import { useState } from "react";
import { QuizOption } from "@/data/steps";

export default function TestSection({
  quiz,
}: {
  quiz: { question: string; options: QuizOption[] };
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="bg-[#171310] py-24">
      <div className="max-w-6xl mx-auto px-8">
        <p className="text-bronze text-xs tracking-widest uppercase font-bold">
          Test your knowledge
        </p>
        <h2 className="text-[#F5F0E8] text-xl font-medium mt-2">
          {quiz.question}
        </h2>
        <p className="text-white/50 text-sm mt-1">One quick question per step.</p>

        <div className="grid grid-cols-2 gap-3 mt-6">
          {quiz.options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`rounded-md border px-4 py-3 text-left text-sm transition
                ${
                  selected === option.id && option.correct
                    ? "border-green-500 text-green-400"
                    : selected === option.id && !option.correct
                      ? "border-red-500 text-red-400"
                      : "border-white/20 text-[#F5F0E8] hover:border-bronze hover:bg-white/5"
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
