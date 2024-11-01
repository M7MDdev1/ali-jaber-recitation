import { useEffect, useState, useRef } from "react";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import SkeletonLoader from "./Components/SkeletonLoader";
import Surah from "./Components/Surah";

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
    <div className=" min-h-screen  bg-slate-600 mb-16 font-ArefRuqaa grid grid-cols-2 sm:grid-cols-3 gap-5 px-10 justify-items-center">
      <div className="col-span-2 sm:col-span-3 flex flex-col">

      <h1 className="text-3xl p-9 text-center text-white ">
        تلاوات بصوت الشيخ علي جابر رحمه الله
      </h1>
      <input type="text" placeholder="...ابحث هنا" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="h-10 w-[80vw] rounded-3xl text-right text-xl text-gray-500 px-7 border-2 border-gray-400"/>
      </div>
      {loading         ? Array.from({ length: 124 }).map((_, index) => <SkeletonLoader key={index} />)

      :
      
      filteredSuwar.map((sura) => (
  <Surah sura={sura} playAudio={playAudio} />
      ))}
      <div className="fixed bottom-0 left-0 right-0 mt-6">
        <AudioPlayer ref={audioRef} />
      </div>

      <h1 className="h-32  text-4xl text-center p-4 col-span-2 sm:col-span-3">صدقة جارية لجدتي ليلى مهجري وجميع موتى المسملين</h1>
    </div>
  );
}

export default App;
