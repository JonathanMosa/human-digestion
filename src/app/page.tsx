"use client";
import Image from "next/image";
import dynamic from "next/dynamic";

const BodyViewer = dynamic(() => import("@/components/3d/BodyViewer"), {
  ssr: false,
});

export default function Home() {
  return (
    <main style={{ paddingTop: "60px" }}>
      <BodyViewer />
    </main>
  );
}
