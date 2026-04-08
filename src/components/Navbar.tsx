"use client";
import Link from "next/link";

const steps = [
  { label: "Step 1", href: "#step-1" },
  { label: "Step 2", href: "#step-2" },
  { label: "Step 3", href: "#step-3" },
  { label: "Step 4", href: "#step-4" },
  { label: "Step 5", href: "#step-5" },
];

export default function Navbar() {
  return (
    <nav className="fixed w-full z-20 top-0 bg-espresso border-b border-stone">
      <ul className="flex items-center gap-4 px-8 py-4">
        <li className="mr-auto">
          <Link href="/" className="text-white font-semibold">
            Human Digestion
          </Link>
        </li>

        <div className="flex gap-4 absolute left-1/2 -translate-x-1/2">
          {steps.map((step) => (
            <li key={step.href}>
              <Link
                href={step.href}
                className="text-gray-300 hover:text-white text-sm px-4 py-2 rounded"
              >
                {step.label}
              </Link>
            </li>
          ))}
        </div>

        <li>
          <Link
            href="/login"
            className="text-sm border border-stone text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
          >
            Log in
          </Link>
        </li>
      </ul>
    </nav>
  );
}
