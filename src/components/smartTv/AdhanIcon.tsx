import React from "react";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { PiSunDimDuotone, PiSunDuotone } from "react-icons/pi";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaMosque } from "react-icons/fa";
import { MdWbTwilight } from "react-icons/md";
import { Box } from "@chakra-ui/react";

interface props {
  active: boolean;
  prayerEn: string;
}
function AdhanIcon({ prayerEn, active }: props) {
  const prayers = {
    Fajr: <MdWbTwilight size={active ? "3vw" : "2vw"}></MdWbTwilight>,
    Shuruq: <FiSunrise size={active ? "3vw" : "2vw"}></FiSunrise>,
    Dhuhr: <PiSunDimDuotone size={active ? "3vw" : "2vw"}></PiSunDimDuotone>,
    Asr: <PiSunDuotone size={active ? "3vw" : "2vw"}></PiSunDuotone>,
    Maghrib: <FiSunset size={active ? "3vw" : "2vw"}></FiSunset>,
    Isha: <BsMoonStarsFill size={active ? "3vw" : "2vw"}></BsMoonStarsFill>,
    Jumaa: <FaMosque size={active ? "3vw" : "2vw"}></FaMosque>,
  };

  return (
    <Box
      shadow={!active ? "0px 0px 5px 2px lightgray" : ""}
      // border={"1px solid"}
      borderRadius={"1vw"}
      padding={1.5}
    >
      {(prayers as any)[prayerEn]}
    </Box>
  );
}

export default AdhanIcon;
