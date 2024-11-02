import React from 'react'

interface ISurahProps{
    sura:{
        id:number,
        name:string,
        makkia: "مكية" | "مدنية"
    },
    playAudio:(id:number)=>void
}
export default function Surah({sura,playAudio}:ISurahProps) {
  return (
    <button
    key={sura.id}
    className=" bg-white py-1 px-2 font-sans flex justify-center w-full rounded-lg"
    onClick={() => playAudio(sura.id)} // Call playAudio instead
  >
      <div className="relative">
        <img src="/assets/star.png" className=" h-14 object-contain mx-4 p-1"/>
        <p className="absolute text-[#4CFFD4] text-lg font-medium top-1/4 left-1/2 -translate-x-1/2 ">{sura.id}</p>
      </div>
      <div className="flex flex-col justify-center text-sm text-left w-1/3">
        <span className="font-bold sm:text-lg">{sura.name}</span>
        <p>{sura.makkia ? "مكية" : "مدنية"}</p>
      </div>
  </button>
  )
}
