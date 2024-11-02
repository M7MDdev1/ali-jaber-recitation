import React from "react";

export default function SkeletonLoader() {
  return (
    <div className="flex w-full animate-pulse justify-center rounded-lg bg-white px-2 py-1 font-sans">
      <div className="relative">
        <div className="mx-4 h-14 w-14 rounded-full bg-gray-300" />
        <div className="absolute left-1/2 top-1/4 h-4 w-8 -translate-x-1/2 rounded bg-gray-300" />
      </div>
      <div className="flex w-1/3 flex-col justify-center text-left text-sm">
        <div className="mb-2 h-6 w-2/3 rounded bg-gray-300" />
        <div className="h-4 w-1/3 rounded bg-gray-300" />
      </div>
    </div>
  );
}
