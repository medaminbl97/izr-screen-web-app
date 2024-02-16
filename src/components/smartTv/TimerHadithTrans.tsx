import React, { useEffect, useState } from "react";
import Info from "./Info";
import Hadith from "./Hadith";
import { randomInt } from "crypto";
import Timer from "./Timer";

interface props {
  counting: boolean;
  onHadith: (isHadith: boolean) => void;
}

function TimerHadithTrans({ counting, onHadith }: props) {
  const [current, setCurrent] = useState(0);
  const [info, setInfo] = useState(true);
  const Hadiths = [
    // "In Autorität von Abu Ruqayyah, Tamim Ad-Darri, Allahs Wohlgefallen auf ihm, der Prophet sagte: \n «Religion ist Aufrichtigkeit.» Wir sagten: «Gegenüber wem?» Er sagte: «Zu Allah und Seinem Buch, und Seinem Boten, und zu den Führern der Moslims und ihres Volkes.>>",
    {
      txt: "Unser Herr, vergib mir und meinen Eltern und den Gläubigen an dem Tag, da die Abrechnung stattfinden wird",
      surah: "Surah Ibrahim, Ayat 41",
    },
  ];

  const Hadiths_ar = [
    // "روى الإمام مسلم رحمه الله في  صحيحه عَنْ تَمِيمٍ الدَّارِيِّ رضي الله عنه :  أَنَّ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ : الدِّينُ النَّصِيحَةُ  قُلْنَا لِمَنْ ؟ ، قال :  لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ وَلِأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ  .",
    {
      txt: "رَبَّنَا اغۡفِرۡ لِىۡ وَلـِوَالِدَىَّ وَلِلۡمُؤۡمِنِيۡنَ يَوۡمَ يَقُوۡمُ الۡحِسَابُ",
      surah: "9 سورة ابراهيم آية ",
    },
  ];

  useEffect(() => {
    if (!counting) {
      const id = setInterval(() => {
        const i = current + 1 === Hadiths.length ? 0 : current + 1;
        setCurrent(i);

        console.log(Hadiths.length);
        setInfo(false);
        onHadith(true);
        console.log("now hadith");
        setTimeout(() => {
          setInfo(true);
          onHadith(false);
          console.log("hadith end");
        }, 60 * 1000);
      }, 10 * 60 * 1000);

      return () => clearInterval(id);
    }
  }, [current, counting]);

  return (
    <>
      {info && <Timer counting={counting} />}
      {!info && (
        <Hadith
          txt={Hadiths[current].txt}
          txt_ar={Hadiths_ar[current].txt}
          sura_en={Hadiths[current].surah}
          sura_ar={Hadiths_ar[current].surah}
        />
      )}
    </>
  );
}

export default TimerHadithTrans;
