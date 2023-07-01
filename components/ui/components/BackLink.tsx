"use client";

import { ArrowUpLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackLink() {
  const { back } = useRouter();
  return (
    <button onClick={() => back()} className="flex items-center gap-1 py-3">
      <ArrowUpLeft />
      <p>Back</p>
    </button>
  );
}
