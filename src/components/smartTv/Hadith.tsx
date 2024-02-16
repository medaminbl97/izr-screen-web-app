import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import AnimatedPage from "./AnimatedPage";
interface props {
  txt: string;
  txt_ar: string;
  sura_en: string;
  sura_ar: string;
}
function Hadith({ txt, txt_ar, sura_en, sura_ar }: props) {
  const [seconds, setSeconds] = useState(60);
  const [current, setCurrent] = useState("de");

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
      if (seconds === 30) {
        setCurrent("ar");
      }
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [seconds]); // Empty depend
  return (
    <AnimatedPage>
      {current === "de" && (
        <AnimatedPage>
          <Text
            marginBottom={"3vw"}
            textAlign={"center"}
            width={"100%"}
            fontSize={"3vw"}
          >
            ﷽
          </Text>
          <Text
            fontSize={"2vw"}
            style={{ whiteSpace: "pre-wrap" }}
            textAlign={"center"}
            transition={"ease 2s"}
          >
            {txt}
          </Text>
          <Text
            marginTop={"2vw"}
            fontWeight={"bold"}
            fontSize={"1.5vw"}
            textAlign={"center"}
          >
            {sura_en}
          </Text>
        </AnimatedPage>
      )}
      {current === "ar" && (
        <AnimatedPage>
          <Text
            marginBottom={"3vw"}
            textAlign={"center"}
            width={"100%"}
            fontSize={"3vw"}
          >
            ﷽
          </Text>
          <Text
            fontSize={"2.5vw"}
            lineHeight={"5vw"}
            fontFamily={"Amiri"}
            textAlign={"center"}
            style={{ direction: "rtl" }}
            transition={"ease 2s"}
          >
            {txt_ar}
          </Text>
          <Text
            marginTop={"2vw"}
            fontWeight={"bold"}
            fontFamily={"Amiri"}
            fontSize={"2vw"}
            textAlign={"center"}
          >
            {sura_ar}
          </Text>
        </AnimatedPage>
      )}
    </AnimatedPage>
  );
}

export default Hadith;
