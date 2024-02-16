import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import logo from "../../images/izr_logo.png";
import qrcode from "../images/qr-code.png";
import axios from "axios";
import AnimatedPage from "./AnimatedPage";
import { FaTemperatureHigh } from "react-icons/fa";

interface resp {
  hourly: { temperature_2m: number[] };
}

export default function Info() {
  const [temp, setTemp] = useState(0);
  const getTemp = () => {
    const hourN = new Date().getHours();
    // console.log(hourN);
    axios
      .get<resp>(
        "https://api.open-meteo.com/v1/forecast?latitude=49.0151&longitude=12.1016&hourly=temperature_2m&timezone=Europe%2FBerlin&forecast_days=1"
      )
      .then((response) => setTemp(response.data.hourly.temperature_2m[hourN]));
  };

  useEffect(() => {
    getTemp();
    setInterval(() => {
      getTemp();
    }, 60 * 60 * 1000);
  }, []);
  return (
    <AnimatedPage style={{ width: "100%" }}>
      <VStack
        // border={"1px solid red"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
      >
        <HStack display={"flex"} justifyContent={"space-between"}>
          <Image height={"5vw"} src={logo}></Image>
          <Image height={"5vw"} src={qrcode}></Image>
          <HStack gap={20}>
            <Text fontFamily={"Poppins"} fontSize={"1.8vw"}>
              Informationen :<strong> www.iz-regensburg.de</strong>
            </Text>
            <Text marginRight={"4vw"} fontFamily={"Poppins"} fontSize={"1.8vw"}>
              IBAN :<strong> DE30750500000026765156</strong>
            </Text>
          </HStack>
          <FaTemperatureHigh size={"2vw"} />:
          <Text fontFamily={"Poppins"} fontSize={"1.8vw"}>
            <strong> {temp} °C</strong>
          </Text>
        </HStack>
      </VStack>
    </AnimatedPage>
  );
}
