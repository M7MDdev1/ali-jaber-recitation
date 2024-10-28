import { useEffect, useState, useRef } from "react";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import SkeletonLoader from "./Components/SkeletonLoader";
import QuranIcon from "./assets/quran.png";
import Star from "./assets/star.png";

function App() {
  const [suwar, setSuwar] = useState([]);
  const audioRef = useRef(null); // Ref for the AudioPlayer
  const suwrahAPI = "https://mp3quran.net/api/v3/suwar?language=ar";
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    axios
      .get(suwrahAPI)
      .then((res) => {
        setSuwar(res.data.suwar); // Ensure this matches the API response structure
        setLoading(false)
      })
      .catch((error) => console.error(error));
  }, [suwrahAPI]);

  const getAudioIndex = (id) => {
    if (id < 10) return `00${id}`;
    if (id < 100) return `0${id}`;
    return `${id}`;
  };

  const playAudio = (id) => {
    const index = getAudioIndex(id);

    if (audioRef.current) {
      audioRef.current.audio.current.src = `https://server11.mp3quran.net/a_jbr/${index}.mp3`;
      audioRef.current.audio.current.play();
    }
  };

  const filteredSuwar = suwar.filter(sura =>
    sura.name.includes(searchTerm)
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#4CFFD4] mb-16 font-ArefRuqaa">
      <h1 className="text-3xl p-9 text-center text-black">
        تلاوات بصوت الشيخ علي جابر رحمه الله
      </h1>
      <input type="text" placeholder="...ابحث هنا" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="h-10 rounded-3xl text-right text-xl text-gray-500 px-7 border-2 border-gray-400"/>
      {loading         ? Array.from({ length: 124 }).map((_, index) => <SkeletonLoader key={index} />) // Show 6 skeletons as an example

      :
      
      filteredSuwar.map((sura) => (
        <button
          key={sura.id}
          className="flex justify-between items-center h-16 bg-white text-xl border border-gray-400 font-sans"
          onClick={() => playAudio(sura.id)} // Call playAudio instead
        >
          <div className="flex h-full">
            <div className="relative">
              <img src={Star} className="w-17 h-full object-contain mx-4 p-1"/>
              <p className="absolute text-[#4CFFD4] text-lg font-medium top-1/4 left-1/2 -translate-x-1/2 ">{sura.id}</p>
            </div>
            <div className="flex flex-col justify-center text-sm text-left">
              <span className="font-bold text-lg">{sura.name}</span>
              <p>{sura.makkia ? "مكية" : "مدنية"}</p>
            </div>
          </div>
          <img src={QuranIcon} className="w-9 object-contain mx-5" ></img>
        </button>
      ))}
      <div className="col-span-2 sm:col-span-9 fixed bottom-0 left-0 right-0 mt-6">
        <AudioPlayer ref={audioRef} />
      </div>

      <h1 className="text-black text-4xl text-center p-4">صدقة جارية لجدتي ليلى مهجري وجميع موتى المسملين</h1>
    </div>
  );
}

export default App;
