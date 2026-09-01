"use client";
import Link from "next/link";
import { steps } from "@/data/steps";

type NavbarProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function Navbar({ selectedId, onSelect }: NavbarProps) {
  // pick the step, then scroll the lesson section into view.
  // #lesson always exists, so this works even as the content swaps.
  function goToStep(id: string) {
    onSelect(id);
    document.getElementById("lesson")?.scrollIntoView();
  }

  return (
    <nav className="fixed w-full z-20 top-0 bg-espresso border-b border-stone">
      <ul className="flex items-center gap-4 px-8 py-4">
        <li className="mr-auto">
          <Link href="/" className="text-white font-semibold">
            Human Digestion
          </Link>
        </li>

        <div className="flex gap-4 absolute left-1/2 -translate-x-1/2">
          {steps.map((step, i) => (
            <li key={step.id}>
              <button
                onClick={() => goToStep(step.id)}
                className={`text-sm px-4 py-2 pb-1 border-b-2 transition ${
                  selectedId === step.id
                    ? "border-bronze text-white"
                    : "border-transparent text-gray-300 hover:text-amber"
                }`}
              >
                Step {i + 1}
              </button>
            </li>
          ))}
        </div>

        <li>
          <a
            href="https://github.com/JonathanMosa/human-digestion"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm border border-stone text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
          >
            Source
          </a>
        </li>
      </ul>
    </nav>
  );
}
