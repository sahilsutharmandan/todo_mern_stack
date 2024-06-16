"use client";
import { useRouter } from "next/navigation";
import React from "react";

function GoBack() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="flex items-center gap-2">
      <svg
        className="w-2.5 h-2.5 ml-2.5 rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 6 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 9 4-4-4-4"
        ></path>
      </svg>
      Back
    </button>
  );
}

export default GoBack;
