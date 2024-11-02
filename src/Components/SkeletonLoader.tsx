import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="bg-white py-1 px-2 font-sans flex justify-center w-full rounded-lg animate-pulse">
      <div className="relative">
        <div className="h-14 w-14 bg-gray-300 rounded-full mx-4"/>
        <div className="absolute bg-gray-300 h-4 w-8 rounded top-1/4 left-1/2 -translate-x-1/2"/>
      </div>
      <div className="flex flex-col justify-center text-sm text-left w-1/3">
        <div className="bg-gray-300 h-6 w-2/3 rounded mb-2"/>
        <div className="bg-gray-300 h-4 w-1/3 rounded"/>
      </div>
    </div>

  );
}
