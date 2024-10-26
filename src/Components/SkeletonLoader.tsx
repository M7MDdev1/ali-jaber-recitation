import React from 'react'; // Import React

export default function SkeletonLoader() {
  return (
    <div className="bg-gray-700 p-4 rounded-lg mb-4 animate-pulse">
      <div className="h-8  rounded w-full mb-2"></div>
    </div>
  );
}
