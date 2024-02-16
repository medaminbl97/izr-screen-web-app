import { HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import colors from "../styles/colors";
import styles from "../styles/bgStyles.module.css";
import AdhanIcon from "./AdhanIcon";

interface props {
  ar: string;
  en: string;
  time: string;
  iqamah: number;
  active: boolean;
  countdown: boolean;
}

function PrayerTime({ ar, en, time, active, countdown, iqamah }: props) {
  const [fontS, setFontS] = useState("");
  useEffect(() => {
    if (countdown) {
      // Create an interval to update the current time every second
      const intervalId = setInterval(() => {
        fontS === "1" ? setFontS("1.05") : setFontS("1");
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [fontS]);

  return (
    <HStack
      backgroundColor={active ? colors.primary : "white"}
      color={active ? "white" : "black"}
      fontWeight={active ? "bold" : "regular"}
      width={"100%"}
      display={"flex"}
      padding={1}
      borderRadius={"0.5vw"}
      transition={"ease 1s"}
      className={active ? styles["animatedBg"] : ""}
      style={{ scale: active ? fontS : 1 }}
    >
      <Text
        width={"100%"}
        textAlign={"left"}
        fontSize={!countdown && active ? "4vw" : "2.8vw"}
        transition={"2s ease"}
        fontFamily={"Poppins"}
        fontWeight={"bold"}
        style={{ fontSize: !active && en === "Jumaa" ? "2.8vw" : "" }}
        color={!active && en === "Jumaa" ? "#005C53" : ""}
        // border={"1px solid lightgray"}
      >
        {en === "Jumaa" ? "Juma'a" : en}
      </Text>

      <AdhanIcon prayerEn={en} active={active}></AdhanIcon>
      <HStack width={"100%"} display={"flex"} justifyContent={"space-around"}>
        <Text
          width={"100%"}
          // border={"1px solid lightgray"}
          fontSize={!countdown && active ? "4vw" : "3vw"}
          style={{ fontSize: !active && en === "Jumaa" ? "3vw" : "" }}
          transition={"2s ease"}
          fontFamily={"Noto Kufi Arabic"}
          fontWeight={"bold"}
          textAlign={"center"}
          color={!active && en === "Jumaa" ? "#005C53" : ""}
        >
          {time}
        </Text>
        <Text
          // width={"100%"}
          // border={"1px solid lightgray"}
          fontSize={!countdown && active ? "1.5vw" : "1vw"}
          transition={"2s ease"}
          fontFamily={"Poppins"}
          fontWeight={"bold"}
          textAlign={"center"}
          color={active || !iqamah ? "white" : "black"}
        >
          {iqamah ? (
            "nach " + iqamah + " min"
          ) : (
            <Text color={"rgba(0,0,0,0)"}>nach 20 min</Text>
          )}
        </Text>
        {/* <AdhanIcon prayerEn={en} active={active}></AdhanIcon> */}
      </HStack>
      <Text
        textAlign={"right"}
        fontSize={!countdown && active ? "4vw" : "3vw"}
        transition={"2s ease"}
        fontFamily={"Almarai"}
        width={"100%"}
        style={{
          fontSize: !active && en === "Jumaa" ? "3vw" : "",
        }}
        color={!active && en === "Jumaa" ? "#005C53" : ""}
        fontWeight={"black"}
        // border={"1px solid lightgray"}
      >
        {ar}
      </Text>
    </HStack>
  );
}

export default PrayerTime;
