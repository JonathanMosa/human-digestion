"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-20 top-0 bg-gray-900 border-b border-gray-700">
      <ul className="flex items-center gap-6 px-6 py-4">
        <li className="mr-auto">
          <Link href="/" className="text-white font-semibold">
            Human Digestion
          </Link>
        </li>
        <li className="mr-auto">
          <Link
            href="#step1"
            className="text-gray-300 hover:text-white text-sm border px-4 py-2 rounded"
          >
            Step 1
          </Link>
        </li>
        <li className="mr-auto">
          <Link
            href="#step2"
            className="text-gray-300 hover:text-white text-sm border px-4 py-2 rounded"
          >
            Step 2
          </Link>
        </li>
        <li className="mr-auto">
          <Link
            href="#step3"
            className="text-gray-300 hover:text-white text-sm border px-4 py-2 rounded"
          >
            Step 3
          </Link>
        </li>
        <li className="">
          <Link
            href="/login"
            className="text-sm border border-gray-500 text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
          >
            Log in
          </Link>
        </li>
      </ul>
    </nav>
  );
}
