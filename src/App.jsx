import { useEffect, useState, useRef } from "react";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function App() {
  const [suwar, setSuwar] = useState([]);
  const audioRef = useRef(null); // Ref for the AudioPlayer
  const suwrahAPI = "https://mp3quran.net/api/v3/suwar?language=ar";

  useEffect(() => {
    axios
      .get(suwrahAPI)
      .then((res) => {
        setSuwar(res.data.suwar); // Ensure this matches the API response structure
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-9 content-around min-h-screen p-9 gap-6 bg-[#181A1B] mb-16 font-ArefRuqaa">
      <h1 className="text-3xl col-span-2 sm:col-span-9 text-center text-white">
        تلاوات بصوت الشيخ علي جابر رحمه الله
      </h1>
      {suwar.map((sura) => (
        <button
          key={sura.id}
          className="bg-blue-600 p-3 rounded-lg text-xl font-sans"
          onClick={() => playAudio(sura.id)} // Call playAudio instead
        >
          {sura.name}
        </button>
      ))}
      <div className="col-span-2 sm:col-span-9 fixed bottom-0 left-0 right-0 mt-6">
        <AudioPlayer ref={audioRef} />
      </div>

      <h1 className="col-span-2 sm:col-span-9 text-white text-4xl text-center">صدقة جارية لجدتي ليلى مهجري وجميع موتى المسملين</h1>
    </div>
  );
}

export default App;
