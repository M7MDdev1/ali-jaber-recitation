import React from "react";

interface ISurahProps {
  sura: {
    id: number;
    name: string;
    makkia: "مكية" | "مدنية";
  };
  playAudio: (id: number) => void;
}
export default function Surah({ sura, playAudio }: ISurahProps) {
  return (
    <button
      key={sura.id}
      className="flex w-full justify-center rounded-lg bg-white px-2 py-1 font-sans"
      onClick={() => playAudio(sura.id)} // Call playAudio instead
    >
      <div className="relative">
        <img src="/assets/star.png" className="mx-4 h-14 object-contain p-1" />
        <p className="absolute left-1/2 top-1/4 -translate-x-1/2 text-lg font-medium text-[#4CFFD4]">
          {sura.id}
        </p>
      </div>
      <div className="flex w-1/3 flex-col justify-center text-left text-sm">
        <span className="font-bold sm:text-lg">{sura.name}</span>
        <p>{sura.makkia ? "مكية" : "مدنية"}</p>
      </div>
    </button>
  );
}
