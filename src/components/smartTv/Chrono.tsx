import { HStack, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimatedPage from "./AnimatedPage";

interface props {
  data: string[];
  time: number[];
  prayer?: string;
  onEnd: () => void;
  onNoPhone?: () => void;
  iqama: boolean;
}

interface iqamah_data {
  Asr: number[];
  Dhuhr: number;
  Fajr: number;
  Isha: number;
  Maghrib: number;
}

function Chrono({ time, data, iqama, onEnd, onNoPhone }: props) {
  const [minutes, setMinutes] = useState(-1);
  const [seconds, setSeconds] = useState(-1);

  useEffect(() => {
    console.log(time);
    setMinutes(time[0]);
    setSeconds(time[1]);
    console.log(time);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
      if (minutes === 0 && seconds === 0) {
        console.log("on end called");
        onEnd();
      }
      onNoPhone && minutes === 0 && seconds === 25 && onNoPhone();
    }, 1000);
    return () => clearInterval(timer);
  }, [minutes, seconds]);

  useEffect(() => {
    if (time[0] === 0 && time[1] === 0) {
      console.log("on end called");
      onEnd();
    }
  }, [time]);

  return (
    <AnimatedPage>
      <Stack
        transition={"ease 1s"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontSize={"4vw"}>{data[0]}</Text>
        <HStack
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
        >
          {!iqama && (
            <Text fontSize={"7vw"}>{time[0] > 0 ? time[0] + ":" : ""}</Text>
          )}
          {iqama && (
            <Text fontSize={"7vw"}>{minutes > 0 ? minutes + ":" : ""}</Text>
          )}
          {!iqama && (
            <Text fontSize={"7vw"}>
              {time[1] >= 0 && time[1] < 10 ? "0" + time[1] : time[1]}
            </Text>
          )}
          {iqama && (
            <Text fontSize={"7vw"}>
              {seconds >= 0 && seconds < 10 ? "0" + seconds : seconds}
            </Text>
          )}
        </HStack>
        <Text fontSize={"4vw"} fontFamily={"Almarai"}>
          {data[1]}
        </Text>
      </Stack>
    </AnimatedPage>
  );
}

export default Chrono;
