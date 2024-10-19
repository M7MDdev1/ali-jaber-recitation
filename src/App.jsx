import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function App() {
  const [suwar, setSuwar] = useState([]);
  const audioRef = useRef(null); // Create a ref for the audio element
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

    // Stop the currently playing audio if it exists
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset the audio time
    }

    // Create a new audio instance and play it
    audioRef.current = new Audio(`https://server11.mp3quran.net/a_jbr/${index}.mp3`);
    audioRef.current.play();
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-9 content-around min-h-screen p-9 gap-6 bg-[#181A1B]">
      <h1 className="text-3xl col-span-3 sm:col-span-9 text-center text-white">تلاوات بصوت الشيخ علي جابر رحمه الله</h1>
      {suwar.map((sura) => (
        <button
          key={sura.id}
          className={`bg-blue-600 p-3 rounded-lg`}
          onClick={() => playAudio(sura.id)} // Call playAudio instead
        >
          {sura.id} {sura.name}
        </button>
      ))}
    </div>
  );
}

export default App;
