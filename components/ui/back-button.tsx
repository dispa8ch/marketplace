"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Iconex from "@/components/icons/iconex";
import { ChevronLeft } from "lucide-react";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={`inline-flex items-center gap-2 text-sm text-[#757575] ${
        className || ""
      }`}
    >
      <Iconex icon={ChevronLeft} />
      Back
    </button>
  );
}
