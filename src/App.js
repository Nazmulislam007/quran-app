import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // const [surah, setSurah] = useState([]);
  // useEffect(() => {
  //   const getAyah = async () => {
  //     await fetch(
  //       "https://quranenc.com/api/v1/translation/sura/english_saheeh/1"
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const surah = data.result.map((res) => ({
  //           text: res.arabic_text,
  //           id: res.id,
  //         }));
  //         setSurah(surah);
  //       });
  //   };
  //   getAyah();
  // }, []);
  // return (
  //   <div className="App">
  //     {surah.map((surah) => {
  //       return <p key={surah.id}>{surah.text}</p>;
  //     })}
  //   </div>
  // );

  const [chapter_number, setChapter_number] = useState(1);
  const [first, setfirst] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await fetch(
        `https://api.quran.com/api/v4/verses/by_chapter/${chapter_number}?language=en&words=true&page=1&per_page=10`
      )
        .then((res) => res.json())
        .then((data) => {
          const surah = data.verses.map((ver) => ({
            id: ver.id,
            verse_key: ver.verse_key,
            textAr: ver.words.map((word) => word.text),
            textEg: ver.words.map((word) => word.transliteration.text),
            audio_url: ver.words.map((word) => word.audio_url),
          }));
          setfirst(surah);
        });
    };
    getData();
  }, []);

  return (
    <>
      {first.map((data) => {
        return (
          <div key={data.id}>
            <p>{data.textEg}</p>
          </div>
        );
      })}
    </>
  );
}

export default App;
